import { Question, SelectedAnswer } from "./interfaces";

export function getDateKey(offsetDays = 0): string {
  const date = new Date();
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().split("T")[0];
}

export const getCachedQuiz = (key: string) => {
  const data = localStorage.getItem(`quiz_${key}`);
  return data ? JSON.parse(data) : null;
};

export const saveQuiz = (key: string, questions: Question[]) => {
  localStorage.setItem(`quiz_${key}`, JSON.stringify(questions));
};

export const getOptionStyle = (
  label: string,
  showExplanation: boolean,
  selectedAnswer: string | null,
  correctAnswer: string
) => {
  if (!showExplanation) {
    return "group w-full text-left bg-slate-50 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 border-2 border-slate-200 hover:border-blue-400 p-4 rounded-xl transition-all duration-200 hover:shadow-md hover:scale-[1.01]";
  }

  if (label === correctAnswer) {
    return "w-full text-left bg-emerald-50 border-2 border-emerald-500 p-4 rounded-xl";
  }

  if (label === selectedAnswer && label !== correctAnswer) {
    return "w-full text-left bg-red-50 border-2 border-red-500 p-4 rounded-xl";
  }

  return "w-full text-left bg-slate-50 border-2 border-slate-200 p-4 rounded-xl opacity-60";
};

export const getBadgeStyle = (
  label: string,
  showExplanation: boolean,
  selectedAnswer: string | null,
  correctAnswer: string
) => {
  if (!showExplanation) {
    return "flex-shrink-0 w-7 h-7 rounded-lg bg-white border-2 border-slate-300 group-hover:border-blue-500 group-hover:bg-blue-500 group-hover:text-white flex items-center justify-center font-semibold text-sm transition-all";
  }

  if (label === correctAnswer) {
    return "flex-shrink-0 w-7 h-7 rounded-lg bg-emerald-500 text-white border-2 border-emerald-600 flex items-center justify-center font-semibold text-sm";
  }

  if (label === selectedAnswer && label !== correctAnswer) {
    return "flex-shrink-0 w-7 h-7 rounded-lg bg-red-500 text-white border-2 border-red-600 flex items-center justify-center font-semibold text-sm";
  }

  return "flex-shrink-0 w-7 h-7 rounded-lg bg-white border-2 border-slate-300 flex items-center justify-center font-semibold text-sm";
};

export const getImprovements = (
  selectedAnswers: SelectedAnswer[],
  questions: Question[],
  score: number
): string[] => {
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
      improvements.push("Consider reviewing Java documentation and tutorials");
    }
  }

  return improvements;
};
