export interface StudentInfo {
  name: string;
  registrationNo?: string;
  roll?: string; // backwards compatibility
  batch?: string;
  examMode?: 'timed' | 'practice';
}

export interface ExamResult {
  student: StudentInfo;
  date: string;
  timeSpentSeconds: number;
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  unattemptedCount: number;
  negativeMarks: number;
  finalScore: number;
  percentage: number;
  userAnswers: Record<number, number>; // questionId -> optionIndex (0-3)
  markedForReview: number[]; // array of questionIds
}

export type ViewState = 'register' | 'exam' | 'result';
