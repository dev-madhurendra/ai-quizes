export interface Question {
  question: string;
  code?: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface IResult {
  score: number;
  total: number;
  onRetry: () => void;
  improvements: string[];
}

export interface IQuestionDisplay {
  question: Question;
  onSelect: (answer: string) => void;
  currentIndex: number;
  total: number;
  selectedAnswer?: string | null;
  showExplanation?: boolean;
}

export interface IQuizCard {
  questions: Question[];
  onQuizCompleted: () => void
}

export interface SelectedAnswer {
  question: string;
  selected: string;
  correct: string;
  isCorrect: boolean;
}
