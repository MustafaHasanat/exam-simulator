import type { Question } from '../types';

export function pickRandom(bank: Question[], count: number): Question[] {
  const shuffled = [...bank].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'] as const;
