export type ExamId = '101' | '102' | 'SAA' | 'SAP';

export interface Question {
  domain: string;
  scenario?: string;
  q: string;
  opts: [string, string, string, string];
  a: 0 | 1 | 2 | 3;
  exp: string;
}

export interface ExamDomain {
  name: string;
  weight: number; // percent
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
  description: string;
  note?: string;
  // provider info
  provider: string;
  registrationUrl: string;
  price: string;
  prerequisites?: string;
  examDomains: ExamDomain[];
  about: string; // longer description for landing page
}

export type AppScreen = 'selector' | 'landing' | 'exam' | 'results';

export interface ExamResult {
  examId: ExamId;
  questions: Question[];
  answers: Record<number, number>;
  timeUsed: number; // seconds
}
