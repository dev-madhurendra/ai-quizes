import React from "react";
import { IQuestionDisplay } from "../utils/interfaces";

const QuestionDisplay = ({
  question,
  onSelect,
  currentIndex,
  total,
  selectedAnswer = null,
  showExplanation = false,
}: IQuestionDisplay) => {
  const labels = ["A", "B", "C", "D"];

  const getOptionStyle = (label: string) => {
    if (!showExplanation) {
      return "group w-full text-left bg-slate-50 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 border-2 border-slate-200 hover:border-blue-400 p-4 rounded-xl transition-all duration-200 hover:shadow-md hover:scale-[1.01]";
    }

    if (label === question.correctAnswer) {
      return "w-full text-left bg-emerald-50 border-2 border-emerald-500 p-4 rounded-xl";
    }

    if (label === selectedAnswer && label !== question.correctAnswer) {
      return "w-full text-left bg-red-50 border-2 border-red-500 p-4 rounded-xl";
    }

    return "w-full text-left bg-slate-50 border-2 border-slate-200 p-4 rounded-xl opacity-60";
  };

  const getBadgeStyle = (label: string) => {
    if (!showExplanation) {
      return "flex-shrink-0 w-7 h-7 rounded-lg bg-white border-2 border-slate-300 group-hover:border-blue-500 group-hover:bg-blue-500 group-hover:text-white flex items-center justify-center font-semibold text-sm transition-all";
    }

    if (label === question.correctAnswer) {
      return "flex-shrink-0 w-7 h-7 rounded-lg bg-emerald-500 text-white border-2 border-emerald-600 flex items-center justify-center font-semibold text-sm";
    }

    if (label === selectedAnswer && label !== question.correctAnswer) {
      return "flex-shrink-0 w-7 h-7 rounded-lg bg-red-500 text-white border-2 border-red-600 flex items-center justify-center font-semibold text-sm";
    }

    return "flex-shrink-0 w-7 h-7 rounded-lg bg-white border-2 border-slate-300 flex items-center justify-center font-semibold text-sm";
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-slate-600">
            Question {currentIndex + 1} of {total}
          </span>
          <span className="text-sm font-medium text-slate-600">
            {Math.round(((currentIndex + 1) / total) * 100)}%
          </span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500 ease-out"
            style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
            {question.code ? "📝 Code Analysis" : "💡 Conceptual"}
          </span>
        </div>

        <h2 className="text-xl font-semibold text-slate-800 mb-6 leading-relaxed">
          {question.question}
        </h2>

        {question.code && (
          <div className="mb-6 rounded-xl overflow-hidden border border-slate-200">
            <div className="bg-slate-50 px-4 py-2 border-b border-slate-200">
              <span className="text-xs font-medium text-slate-600">Java</span>
            </div>
            <pre className="bg-gradient-to-br from-slate-900 to-slate-800 text-emerald-300 p-6 overflow-x-auto">
              <code className="text-sm leading-relaxed">{question.code}</code>
            </pre>
          </div>
        )}

        <div className="space-y-3">
          {question.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => !showExplanation && onSelect(labels[idx])}
              disabled={showExplanation}
              className={getOptionStyle(labels[idx])}
            >
              <div className="flex items-start gap-3">
                <span className={getBadgeStyle(labels[idx])}>
                  {labels[idx]}
                </span>
                <div className="flex-1 pt-0.5">
                  <span
                    className={`${
                      showExplanation && labels[idx] === question.correctAnswer
                        ? "text-emerald-900 font-medium"
                        : showExplanation && labels[idx] === selectedAnswer
                        ? "text-red-900 font-medium"
                        : "text-slate-700"
                    }`}
                  >
                    {opt}
                  </span>
                  {showExplanation &&
                    labels[idx] === question.correctAnswer && (
                      <span className="ml-2 text-emerald-600 text-sm">
                        ✓ Correct Answer
                      </span>
                    )}
                  {showExplanation &&
                    labels[idx] === selectedAnswer &&
                    labels[idx] !== question.correctAnswer && (
                      <span className="ml-2 text-red-600 text-sm">
                        ✗ Your Answer
                      </span>
                    )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {showExplanation && (
          <div className="mt-6 p-5 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
            <div className="flex items-start gap-2">
              <span className="text-xl">💡</span>
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">
                  Explanation
                </h3>
                <p className="text-blue-800 text-sm leading-relaxed">
                  {question.explanation}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionDisplay;
