import React, { useEffect, useState } from "react";
import QuizCard from "./components/QuizCard";
import { loadTodayQuestions } from "./utils/openai";
import { Question } from "./utils/interfaces";

const App: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const todayKey = new Date().toISOString().split("T")[0];
    const cached = localStorage.getItem(todayKey);

    if (cached) {
      setQuestions(JSON.parse(cached));
      setLoading(false);
    } else {
      (async () => {
        const data = await loadTodayQuestions();
        setQuestions(data);
        setLoading(false);
      })();
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-lg mb-4">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-slate-600 font-medium">Preparing your AI powered quiz...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12">
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

        <QuizCard questions={questions} />
      </div>
    </div>
  );
};

export default App;
