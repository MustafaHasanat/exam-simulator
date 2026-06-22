/**
 * Expands question banks so each exam has bank >= 2× session question count.
 * Run: node scripts/expand-banks.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import {
  makeQuestion,
  formatQuestionBlock,
  extractDomainsFromBank,
  countQuestionsInBank,
} from './question-generator.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '../src/data');
const cfg = readFileSync(join(DATA_DIR, 'examConfigs.ts'), 'utf8');

const bankKeyToFile = {};
for (const m of cfg.matchAll(/import \{ (BANK_\w+) \} from "\.\/(bank\w+)"/g)) {
  bankKeyToFile[m[1]] = m[2];
}

const blocks = cfg.split(/\n    \{/).slice(1);
const exams = [];
for (const block of blocks) {
  const id = block.match(/id:\s*"([^"]+)"/)?.[1];
  const label = block.match(/label:\s*"([^"]+)"/)?.[1];
  const fullName = block.match(/fullName:\s*"([^"]+)"/)?.[1];
  const session = +block.match(/questions:\s*(\d+)/)?.[1];
  const bankKey = block.match(/bankKey:\s*"([^"]+)"/)?.[1];
  const domainsBlock = block.match(/examDomains:\s*\[([\s\S]*?)\],/)?.[1] ?? '';
  const configDomains = [...domainsBlock.matchAll(/name:\s*"([^"]+)"/g)].map((m) => m[1]);
  if (id && session && bankKey) {
    exams.push({
      id,
      label,
      topic: fullName ?? label,
      session,
      bankKey,
      configDomains,
      file: bankKeyToFile[bankKey],
    });
  }
}

let expanded = 0;
let skipped = 0;
let totalAdded = 0;

for (const exam of exams) {
  if (!exam.file) {
    console.warn(`Skip ${exam.id}: no bank file for ${exam.bankKey}`);
    continue;
  }

  const path = join(DATA_DIR, `${exam.file}.ts`);
  let content = readFileSync(path, 'utf8');
  const current = countQuestionsInBank(content);
  const minNeeded = exam.session * 2;

  if (current >= minNeeded) {
    skipped++;
    continue;
  }

  const toAdd = minNeeded - current;
  const domains =
    extractDomainsFromBank(content).length > 0
      ? extractDomainsFromBank(content)
      : exam.configDomains;

  if (domains.length === 0) {
    console.warn(`Skip ${exam.id}: no domains found`);
    continue;
  }

  const existingTexts = new Set();
  for (const m of content.matchAll(/q:\s*(['"])(.*?)\1/g)) {
    existingTexts.add(m[2]);
  }

  const newQuestions = [];
  let idx = current;
  while (newQuestions.length < toAdd) {
    const domain = domains[newQuestions.length % domains.length];
    newQuestions.push(makeQuestion(domain, exam.topic, idx, existingTexts));
    idx++;
  }

  const insertLines = [
    '',
    `  // ── Additional ${exam.label} practice questions (${newQuestions.length} added) ──`,
  ];
  let lastDomain = '';
  for (const q of newQuestions) {
    if (q.domain !== lastDomain) {
      lastDomain = q.domain;
      insertLines.push('');
      insertLines.push(`  // ── ${lastDomain} ──`);
    }
    insertLines.push(formatQuestionBlock(q));
  }

  content = content.replace(/\n];\s*\n?$/, `\n${insertLines.join('\n')}\n];\n`);
  writeFileSync(path, content);

  expanded++;
  totalAdded += toAdd;
  console.log(
    `${exam.id} (${exam.label}): ${current} → ${current + toAdd} (+${toAdd}, session=${exam.session})`,
  );
}

console.log(`\nDone: ${expanded} banks expanded, ${skipped} already OK, ${totalAdded} questions added.`);
