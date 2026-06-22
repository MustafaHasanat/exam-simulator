/**
 * Audit: bank size must be >= 2× session question count.
 * Run: node scripts/audit-banks.mjs
 */
import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '../src/data');

const cfg = readFileSync(join(DATA_DIR, 'examConfigs.ts'), 'utf8');
const blocks = cfg.split(/\n    \{/).slice(1);
const exams = [];

for (const block of blocks) {
  const id = block.match(/id:\s*"([^"]+)"/)?.[1];
  const questions = block.match(/questions:\s*(\d+)/)?.[1];
  const bankKey = block.match(/bankKey:\s*"([^"]+)"/)?.[1];
  const label = block.match(/label:\s*"([^"]+)"/)?.[1];
  const domainsBlock = block.match(/examDomains:\s*\[([\s\S]*?)\],/)?.[1] ?? '';
  const domains = [...domainsBlock.matchAll(/name:\s*"([^"]+)"/g)].map((m) => m[1]);
  if (id && questions && bankKey) {
    exams.push({ id, label, session: +questions, bankKey, domains });
  }
}

const bankKeyToFile = {};
for (const line of cfg.matchAll(/import \{ (BANK_\w+) \} from "\.\/(bank\w+)"/g)) {
  bankKeyToFile[line[1]] = line[2];
}

function countQuestions(file) {
  const content = readFileSync(join(DATA_DIR, `${file}.ts`), 'utf8');
  return (content.match(/\n\s+q:\s/g) || []).length;
}

const violations = [];
for (const e of exams) {
  const file = bankKeyToFile[e.bankKey];
  const bank = file ? countQuestions(file) : 0;
  const minNeeded = e.session * 2;
  if (bank < minNeeded) {
    violations.push({ ...e, file, bank, minNeeded, need: minNeeded - bank });
  }
}

console.log(`Exams: ${exams.length}`);
console.log(`Violations (< 2×): ${violations.length}`);
console.log(`Critical (bank < session): ${violations.filter((v) => v.bank < v.session).length}\n`);
violations.sort((a, b) => b.need - a.need);
for (const v of violations) {
  console.log(`${v.id} (${v.label}): session=${v.session}, bank=${v.bank}, need=${v.minNeeded}, add=${v.need}`);
}
