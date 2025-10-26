import { generateQuestionPrompt } from "./prompts";
import { Question } from "./interfaces";
import fallbackQuestions from "../assets/fallback.json";
import { getDateKey } from "./helper";

const OPENAI_CHAT_URI = import.meta.env.VITE_OPENAI_CHAT_URI;
const GROQ_CHAT_URI =  import.meta.env.VITE_GROQ_CHAT_URI;
const OPENAI_MODEL = import.meta.env.VITE_OPENAI_MODEL;
const GROQ_MODEL = import.meta.env.VITE_GROQ_MODEL;
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;


export async function fetchQuestions(questionDate: string): Promise<Question[]> {
  try {
    const openaiData = await fetchAI("openai", questionDate);
    return openaiData;
  } catch (err: any) {
    try {
      const groqData = await fetchAI("groq", questionDate);
      return groqData;
    } catch (fallbackErr) {
      return fallbackQuestions;
    }
  }
}

async function fetchAI(provider: "openai" | "groq", questionDate: string) {
  const isGroq = provider === "groq";

  const response = await fetch(isGroq ? GROQ_CHAT_URI : OPENAI_CHAT_URI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${isGroq ? GROQ_API_KEY : OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: isGroq ? GROQ_MODEL : OPENAI_MODEL,
      messages: [
        { role: "user", content: generateQuestionPrompt(questionDate) },
      ],
      temperature: 0.8,
    }),
  });

  if (response.status === 429) {
    throw new Error("Rate limit hit");
  }

  const data = await response.json();

  const text = data.choices?.[0]?.message?.content?.trim() ?? "";
  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error("Invalid AI response format");

  const parsed = JSON.parse(jsonMatch[0]);
  return parsed;
}

async function prefetchTomorrow(tomorrowKey: string) {
  const cachedTomorrow = localStorage.getItem(`quiz_${tomorrowKey}`);
  if (!cachedTomorrow) {
    try {
      const tomorrowQuestions = await fetchQuestions(tomorrowKey);
      localStorage.setItem(
        `quiz_${tomorrowKey}`,
        JSON.stringify(tomorrowQuestions)
      );
    } catch (e) {}
  }
}

export async function loadTodayQuestions() {
  const todayKey = getDateKey(0);
  const tomorrowKey = getDateKey(1);

  const cachedToday = localStorage.getItem(`quiz_${todayKey}`);
  if (cachedToday) {
    prefetchTomorrow(tomorrowKey);
    return JSON.parse(cachedToday);
  }

  const todayQuestions = await fetchQuestions(todayKey);
  localStorage.setItem(`quiz_${todayKey}`, JSON.stringify(todayQuestions));

  prefetchTomorrow(tomorrowKey);

  return todayQuestions;
}

export function getCurrentStreak(): number {
  const data = JSON.parse(localStorage.getItem("quiz_streak") || "{}");
  return data?.streak || 0;
}

export function updateStreak(): number {
  const key = "quiz_streak";
  const today = new Date().toISOString().split("T")[0];

  const saved = localStorage.getItem(key);
  const data = saved ? JSON.parse(saved) : { lastCompleted: "", streak: 0 };

  const lastDate = data.lastCompleted ? new Date(data.lastCompleted) : null;
  const diffDays = lastDate
    ? Math.floor((+new Date(today) - +lastDate) / (1000 * 60 * 60 * 24))
    : Infinity;

  let streak = data.streak;

  if (diffDays === 1) streak += 1; // next consecutive day
  else if (diffDays > 1) streak = 1; // missed day or first quiz
  // same day => keep streak as-is

  localStorage.setItem(
    key,
    JSON.stringify({ lastCompleted: today, streak })
  );

  return streak;
}

export function resetStreak() {
  localStorage.removeItem("quiz_streak");
}