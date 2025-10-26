import React, { useEffect, useState } from "react";
import QuizCard from "./components/QuizCard";
import {
  getCurrentStreak,
  loadTodayQuestions,
  updateStreak,
} from "./utils/openai";
import { Question } from "./utils/interfaces";
import { getDateKey } from "./utils/helper";

const App: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [streak, setStreak] = useState<number>(getCurrentStreak());
  const [completed, setCompleted] = useState<boolean>(false);
  const todayKey = getDateKey(0);

  useEffect(() => {
    const completedFlag =
      localStorage.getItem(`quiz_completed_${todayKey}`) === "true";
    setCompleted(completedFlag);

    (async () => {
      const data = await loadTodayQuestions();
      setQuestions(data);
      setLoading(false);
    })();
  }, []);

  const handleQuizCompleted = () => {
    const newStreak = updateStreak();
    setStreak(newStreak);
    localStorage.setItem(`quiz_completed_${todayKey}`, "true");
    setCompleted(true);
  };

  const handleRetake = () => {
    localStorage.removeItem(`quiz_completed_${todayKey}`)
    setCompleted(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-lg mb-4">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-slate-600 font-medium">
            Preparing your AI powered quiz...
          </p>
        </div>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-2xl font-semibold mb-2">
            You’ve already completed today’s quiz!
          </h1>
          <p className="text-slate-600 mb-6">
            Come back tomorrow for new questions — or try again for fun!
          </p>
          <button
            onClick={handleRetake}
            className="px-6 py-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition"
          >
            Retake Quiz
          </button>
        </div>

        <div className="mt-10 text-lg text-orange-600 font-medium">
          🔥 {streak} Day{streak !== 1 && "s"} Streak
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-6">
          <div className="inline-flex items-center bg-white shadow-md rounded-full px-4 py-2 text-lg font-semibold text-orange-600">
            🔥 {streak} Day{streak !== 1 && "s"} Streak
          </div>
        </div>

        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-3xl mb-4 shadow-lg">
            ☕
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Java Daily Quiz
          </h1>
          <p className="text-slate-600">
            Test your Java knowledge with AI powered questions
          </p>
        </div>

        <QuizCard questions={questions} onQuizCompleted={handleQuizCompleted} />
      </div>
    </div>
  );
};

export default App;
