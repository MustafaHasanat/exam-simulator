export type ExamId = '101' | '102';

export interface Question {
  domain: string;
  scenario?: string;
  q: string;
  opts: [string, string, string, string];
  a: 0 | 1 | 2 | 3;
  exp: string;
}

export interface ExamConfig {
  id: ExamId;
  label: string;
  fullName: string;
  level: string;
  questions: number;
  minutes: number;
  pass: number; // percent
  bank: Question[];
}

export type AppScreen = 'selector' | 'landing' | 'exam' | 'results';

export interface ExamResult {
  examId: ExamId;
  questions: Question[];
  answers: Record<number, number>;
  timeUsed: number; // seconds
}
