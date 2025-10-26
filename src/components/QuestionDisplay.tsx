import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { IQuestionDisplay } from "../utils/interfaces";
import { getBadgeStyle, getOptionStyle } from "../utils/helper";
import { labels } from "../utils/constants";

const QuestionDisplay = ({
  question,
  onSelect,
  currentIndex,
  total,
  selectedAnswer = null,
  showExplanation = false,
}: IQuestionDisplay) => {
  return (
    <div className="w-full max-w-3xl mx-auto">
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

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
            {question.code ? "📝 Code Analysis" : "💡 Conceptual"}
          </span>
        </div>

        <h2 className="text-xl font-semibold text-slate-800 mb-6 leading-relaxed">
          <ReactMarkdown
            components={{
              code: ({ children }) => (
                <code className="bg-slate-100 px-1.5 py-0.5 rounded text-blue-700 font-mono text-sm">
                  {children}
                </code>
              ),
              p: ({ children }) => <>{children}</>,
            }}
          >
            {question.question}
          </ReactMarkdown>
        </h2>

        {question.code && (
          <div className="mb-6 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
            <div className="bg-slate-50 px-4 py-2 border-b border-slate-200">
              <span className="text-xs font-medium text-slate-600">
                Java Code
              </span>
            </div>
            <SyntaxHighlighter
              language="java"
              style={dracula}
              customStyle={{
                margin: 0,
                borderRadius: "0 0 0.75rem 0.75rem",
                fontSize: "0.9rem",
                lineHeight: "1.5",
                background: "#0f172a",
              }}
            >
              {question.code}
            </SyntaxHighlighter>
          </div>
        )}

        <div className="space-y-3">
          {question.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => !showExplanation && onSelect(labels[idx])}
              disabled={showExplanation}
              className={getOptionStyle(
                labels[idx],
                showExplanation,
                selectedAnswer,
                question.correctAnswer
              )}
            >
              <div className="flex items-start gap-3">
                <span
                  className={getBadgeStyle(
                    labels[idx],
                    showExplanation,
                    selectedAnswer,
                    question.correctAnswer
                  )}
                >
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
