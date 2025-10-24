import { generateQuestionPrompt } from "./constants";
import { Question } from "./interfaces";
import fallbackQuestions from "../assets/fallback.json";

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY


const MODEL = "gpt-4o-mini";

export async function fetchQuestions(todayKey: string): Promise<Question[]> {
  console.log(OPENAI_API_KEY)
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: "user", content: generateQuestionPrompt(todayKey) }],
      temperature: 0.8,
    }),
  });

  const data = await response.json();
  if (!data.choices?.[0]?.message?.content) {
    console.error("Unexpected OpenAI response:", data);
    return fallbackQuestions;
  }
  const text = data.choices[0]?.message?.content?.trim() ?? "";

  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error("Invalid AI response format");

  return JSON.parse(jsonMatch[0]);
}


export async function loadTodayQuestions() {
  const today = new Date().toISOString().split("T")[0];
  const cached = localStorage.getItem(today);

  if (cached) {
    console.log("Loaded questions from cache");
    return JSON.parse(cached);
  }

  const questions = await fetchQuestions(today);
  localStorage.setItem(today, JSON.stringify(questions));

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextKey = tomorrow.toISOString().split("T")[0];
  if (!localStorage.getItem(nextKey)) {
    fetchQuestions(nextKey).then((q) => {
      localStorage.setItem(nextKey, JSON.stringify(q));
    });
  }

  return questions;
}