export interface Question {
  domain: string;
  scenario?: string;
  q: string;
  opts: string[];
  a: number;
  exp: string;
}

export interface ExamDomain {
  name: string;
  weight: number; // percent
}

export interface ExamConfig {
  id: string;
  label: string;
  fullName: string;
  level: string;
  questions: number;
  minutes: number;
  pass: number; // percent
  bank: Question[];
  description: string;
  note?: string;
  provider: string;
  registrationUrl: string;
  price: string;
  prerequisites?: string;
  examDomains: ExamDomain[];
  about: string;
}

export interface ExamResult {
  examId: string;
  questions: Question[];
  answers: Record<number, number>;
  timeUsed: number; // seconds
}
