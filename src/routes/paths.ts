import { EXAM_CONFIGS } from '../data';
import type { ExamConfig } from '../types';

/** Resolve an exam config from a URL segment (exam id). */
export function getExamByCode(examCode: string | undefined): ExamConfig | undefined {
  if (!examCode) return undefined;
  return EXAM_CONFIGS[examCode];
}

export function examPath(examCode: string): string {
  return `/exams/${encodeURIComponent(examCode)}`;
}

export function simulatorPath(examCode: string): string {
  return `/exams/simulator/${encodeURIComponent(examCode)}`;
}

export function resultPath(examCode: string): string {
  return `/exams/simulator/${encodeURIComponent(examCode)}/result`;
}
