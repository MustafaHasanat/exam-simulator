import type { ExamConfig } from '../types';
import { BANK_101 } from './bank101';
import { BANK_102 } from './bank102';

export const EXAM_CONFIGS: Record<string, ExamConfig> = {
  '101': {
    id: '101',
    label: 'OGEA-101',
    fullName: 'TOGAF® Enterprise Architecture Foundation',
    level: 'Foundation Level',
    questions: 40,
    minutes: 60,
    pass: 55,
    bank: BANK_101,
  },
  '102': {
    id: '102',
    label: 'OGEA-102',
    fullName: 'TOGAF® Enterprise Architecture Practitioner',
    level: 'Practitioner Level',
    questions: 40,
    minutes: 90,
    pass: 60,
    bank: BANK_102,
  },
};

export { BANK_101, BANK_102 };
