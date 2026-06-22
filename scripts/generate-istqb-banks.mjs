/**
 * Generate ISTQB question banks. Run: node scripts/generate-istqb-banks.mjs
 */
import { writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { makeQuestion, formatQuestionBlock } from './question-generator.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '../src/data');

const EXAMS = {
  CTFL: {
    file: 'bankCTFL',
    export: 'BANK_CTFL',
    topic: 'ISTQB CTFL Foundation',
    perDomain: 15,
    domains: [
      'Fundamentals of Testing',
      'Testing Throughout the SDLC',
      'Static Testing',
      'Test Analysis & Design',
      'Managing Test Activities',
      'Test Tools',
    ],
  },
  CTALTM: {
    file: 'bankCTALTM',
    export: 'BANK_CTALTM',
    topic: 'ISTQB CTAL Test Manager',
    perDomain: 22,
    domains: [
      'Manage Testing Activities',
      'Risk-Based Testing',
      'Defect Management',
      'Improving the Test Process',
      'Test Tools & Automation Strategy',
      'Managing the Test Team',
    ],
  },
  CTALTA: {
    file: 'bankCTALTA',
    export: 'BANK_CTALTA',
    topic: 'ISTQB CTAL Technical Test Analyst',
    perDomain: 22,
    domains: [
      'Risk-Based Testing',
      'Structure-Based Testing',
      'Analytical Testing',
      'Testing Software Quality Characteristics',
      'Reviews',
      'Test Tools & Automation',
    ],
  },
  CTALTTA: {
    file: 'bankCTALTTA',
    export: 'BANK_CTALTTA',
    topic: 'ISTQB CTAL Test Analyst',
    perDomain: 22,
    domains: [
      'Testing Process',
      'Test Management',
      'Test Techniques',
      'Testing Software Quality Characteristics',
      'Defect Management',
      'Test Tools',
    ],
  },
  CTALTAE: {
    file: 'bankCTALTAE',
    export: 'BANK_CTALTAE',
    topic: 'ISTQB CTAL Test Automation Engineer',
    perDomain: 15,
    domains: [
      'Introduction & Objectives for Test Automation',
      'Preparing for Test Automation',
      'Analysis & Design for Test Automation',
      'Implementation of Test Automation',
      'Deployment & Reporting',
      'Verification & Validation',
    ],
  },
  CTMAT: {
    file: 'bankCTMAT',
    export: 'BANK_CTMAT',
    topic: 'ISTQB Agile Tester',
    perDomain: 15,
    domains: [
      'Agile Software Development Fundamentals',
      'Testing in Agile Projects',
      'Agile Testing Methods & Techniques',
      'Tools in Agile Projects',
    ],
  },
};

function generateBank(meta) {
  const existingTexts = new Set();
  const questions = [];
  let idx = 0;
  for (const domain of meta.domains) {
    for (let i = 0; i < meta.perDomain; i++) {
      questions.push(makeQuestion(domain, meta.topic, idx++, existingTexts));
    }
  }

  const lines = [
    "import type { Question } from '../types';",
    '',
    `export const ${meta.export}: Question[] = [`,
  ];

  let currentDomain = '';
  for (const q of questions) {
    if (q.domain !== currentDomain) {
      currentDomain = q.domain;
      lines.push('');
      lines.push(`  // ── ${currentDomain} ──`);
    }
    lines.push(formatQuestionBlock(q));
  }
  lines.push('];');
  lines.push('');
  return lines.join('\n');
}

for (const [id, meta] of Object.entries(EXAMS)) {
  const path = join(DATA_DIR, `${meta.file}.ts`);
  if (existsSync(path)) {
    console.log(`Skip ${meta.file}.ts (exists)`);
    continue;
  }
  writeFileSync(path, generateBank(meta));
  console.log(`Created ${meta.file}.ts (${meta.domains.length * meta.perDomain} questions)`);
}
