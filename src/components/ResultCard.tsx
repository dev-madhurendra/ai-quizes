import React from "react";
import { IResult } from "../utils/interfaces";

const ResultCard = ({ score, total, onRetry, improvements }: IResult) => {
  const percentage = (score / total) * 100;

  const getGrade = () => {
    if (percentage === 100)
      return {
        grade: "A+",
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        message: "Perfect Score! 🎉",
      };
    if (percentage >= 80)
      return {
        grade: "A",
        color: "text-blue-600",
        bg: "bg-blue-50",
        message: "Excellent Work! 🌟",
      };
    if (percentage >= 60)
      return {
        grade: "B",
        color: "text-indigo-600",
        bg: "bg-indigo-50",
        message: "Good Effort! 💪",
      };
    return {
      grade: "C",
      color: "text-amber-600",
      bg: "bg-amber-50",
      message: "Keep Learning! 📚",
    };
  };

  const gradeInfo = getGrade();

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
        <div
          className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${gradeInfo.bg} mb-4`}
        >
          <span className={`text-3xl font-bold ${gradeInfo.color}`}>
            {gradeInfo.grade}
          </span>
        </div>

        <h2 className="text-3xl font-bold text-slate-800 mb-2">
          {gradeInfo.message}
        </h2>

        <div className="my-6">
          <div className="text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {score} / {total}
          </div>
          <p className="text-slate-600 mt-2">
            You scored {percentage.toFixed(0)}%
          </p>
        </div>

        {improvements.length > 0 && (
          <div className="mt-8 p-6 bg-slate-50 rounded-xl text-left border border-slate-200">
            <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <span>📊</span> Areas for Improvement
            </h3>
            <ul className="space-y-2">
              {improvements.map((area, idx) => (
                <li
                  key={idx}
                  className="text-sm text-slate-600 flex items-start gap-2"
                >
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex gap-3 mt-8">
          <button
            onClick={onRetry}
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Try Again
          </button>
          <button className="flex-1 bg-slate-100 text-slate-700 px-6 py-3 rounded-xl font-medium hover:bg-slate-200 transition-all duration-200">
            Review Answers
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
