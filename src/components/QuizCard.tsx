import React, { useState } from "react";
import QuestionDisplay from "./QuestionDisplay";
import ResultCard from "./ResultCard";
import { IQuizCard, SelectedAnswer } from "../utils/interfaces";

const QuizCard: React.FC<IQuizCard> = ({ questions }) => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSelect = (selected: string) => {
    const correct = questions[current].correctAnswer;
    const isCorrect = selected === correct;

    setSelectedAnswer(selected);
    setShowExplanation(true);

    setSelectedAnswers([
      ...selectedAnswers,
      {
        question: questions[current].question,
        selected,
        correct,
        isCorrect,
      },
    ]);

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    setCurrent((prev) => prev + 1);
  };

  const getImprovements = (): string[] => {
    const improvements: string[] = [];
    const wrongAnswers = selectedAnswers.filter((a) => !a.isCorrect);

    if (wrongAnswers.length > 0) {
      improvements.push(
        `You missed ${wrongAnswers.length} question${
          wrongAnswers.length > 1 ? "s" : ""
        } - review them carefully`
      );

      const codeQuestions = wrongAnswers.filter(
        (a) => questions.find((q) => q.question === a.question)?.code !== null
      );

      if (codeQuestions.length > 0) {
        improvements.push(
          "Practice more code-based problems and syntax understanding"
        );
      }

      if (score < questions.length * 0.6) {
        improvements.push("Study Java fundamentals more thoroughly");
        improvements.push(
          "Focus on core concepts like OOP, data types, and control structures"
        );
      }

      if (wrongAnswers.length >= questions.length / 2) {
        improvements.push(
          "Consider reviewing Java documentation and tutorials"
        );
      }
    }

    return improvements;
  };

  if (current >= questions.length) {
    return (
      <ResultCard
        score={score}
        total={questions.length}
        onRetry={() => window.location.reload()}
        improvements={getImprovements()}
      />
    );
  }

  return (
    <div>
      <QuestionDisplay
        question={questions[current]}
        onSelect={handleSelect}
        currentIndex={current}
        total={questions.length}
        selectedAnswer={selectedAnswer}
        showExplanation={showExplanation}
      />

      {showExplanation && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleNext}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            {current < questions.length - 1
              ? "Next Question →"
              : "View Results →"}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizCard;
