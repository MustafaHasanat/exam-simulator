/**
 * Generates question bank TypeScript files for exams that don't yet have one.
 * Run: node scripts/generate-banks.mjs
 */
import { writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '../src/data');

/** @type {Record<string, { file: string, export: string, domains: string[], topic: string }>} */
const EXAMS = {
  DAS: { file: 'bankDAS', export: 'BANK_DAS', topic: 'AWS Data Analytics', domains: ['Collection', 'Storage & Data Management', 'Processing', 'Analysis & Visualization', 'Security & Governance'] },
  AZ305: { file: 'bankAZ305', export: 'BANK_AZ305', topic: 'Azure Solutions Architect', domains: ['Design Identity & Governance', 'Design Data Solutions', 'Design Infrastructure', 'Design Business Continuity'] },
  AZ400: { file: 'bankAZ400', export: 'BANK_AZ400', topic: 'Azure DevOps', domains: ['Develop Instrumentation', 'Develop SRE', 'CI/CD', 'Dependency Management', 'Continuous Feedback'] },
  AI102: { file: 'bankAI102', export: 'BANK_AI102', topic: 'Azure AI', domains: ['Plan AI Solutions', 'Vision Solutions', 'NLP Solutions', 'Knowledge Mining', 'Generative AI'] },
  DP900: { file: 'bankDP900', export: 'BANK_DP900', topic: 'Azure Data Fundamentals', domains: ['Core Data Concepts', 'Relational Data', 'Non-Relational Data', 'Analytics Workloads'] },
  SC900: { file: 'bankSC900', export: 'BANK_SC900', topic: 'Azure Security Fundamentals', domains: ['Security Concepts', 'Azure Security', 'Compliance', 'Identity & Access'] },
  PDE: { file: 'bankPDE', export: 'BANK_PDE', topic: 'GCP Data Engineer', domains: ['Data Processing', 'Storage Systems', 'Infrastructure', 'Machine Learning Ops', 'Security & Compliance'] },
  PCDO: { file: 'bankPCDO', export: 'BANK_PCDO', topic: 'GCP DevOps Engineer', domains: ['CI/CD Pipelines', 'Site Reliability', 'Monitoring & Logging', 'Security', 'Infrastructure as Code'] },
  PMLE: { file: 'bankPMLE', export: 'BANK_PMLE', topic: 'GCP ML Engineer', domains: ['ML Problem Framing', 'Data Preparation', 'Model Development', 'ML Pipeline Automation', 'ML Solution Monitoring'] },
  ITF: { file: 'bankITF', export: 'BANK_ITF', topic: 'CompTIA ITF+', domains: ['IT Concepts', 'Infrastructure', 'Applications & Software', 'Software Development', 'Database Fundamentals', 'Security'] },
  APLUS: { file: 'bankAPlus', export: 'BANK_APLUS', topic: 'CompTIA A+', domains: ['Mobile Devices', 'Networking', 'Hardware', 'Virtualization & Cloud', 'Hardware & Network Troubleshooting', 'Operating Systems', 'Security', 'Software Troubleshooting', 'Operational Procedures'] },
  NETPLUS: { file: 'bankNetPlus', export: 'BANK_NETPLUS', topic: 'CompTIA Network+', domains: ['Networking Concepts', 'Network Implementation', 'Network Operations', 'Network Security', 'Network Troubleshooting'] },
  SECPLUS: { file: 'bankSecPlus', export: 'BANK_SECPLUS', topic: 'CompTIA Security+', domains: ['General Security Concepts', 'Threats & Vulnerabilities', 'Security Architecture', 'Security Operations', 'Security Program Management'] },
  CYSA: { file: 'bankCySA', export: 'BANK_CYSA', topic: 'CompTIA CySA+', domains: ['Security Operations', 'Vulnerability Management', 'Incident Response', 'Reporting & Communication', 'Compliance & Assessment'] },
  PENTEST: { file: 'bankPenTest', export: 'BANK_PENTEST', topic: 'CompTIA PenTest+', domains: ['Planning & Scoping', 'Information Gathering', 'Attacks & Exploits', 'Reporting & Communication', 'Tools & Code Analysis'] },
  CASP: { file: 'bankCASP', export: 'BANK_CASP', topic: 'CompTIA CASP+', domains: ['Security Architecture', 'Security Operations', 'Security Engineering', 'Governance & Compliance', 'Risk Management'] },
  CLOUDPLUS: { file: 'bankCloudPlus', export: 'BANK_CLOUDPLUS', topic: 'CompTIA Cloud+', domains: ['Cloud Architecture', 'Security', 'Deployment', 'Operations', 'Troubleshooting'] },
  CISSP: { file: 'bankCISSP', export: 'BANK_CISSP', topic: 'CISSP', domains: ['Security & Risk Management', 'Asset Security', 'Security Architecture', 'Communication & Network Security', 'Identity & Access Management', 'Security Assessment', 'Security Operations', 'Software Development Security'] },
  CISM: { file: 'bankCISM', export: 'BANK_CISM', topic: 'CISM', domains: ['Information Security Governance', 'Risk Management', 'Security Program Development', 'Incident Management'] },
  CEH: { file: 'bankCEH', export: 'BANK_CEH', topic: 'CEH', domains: ['Reconnaissance', 'Scanning Networks', 'Enumeration', 'System Hacking', 'Malware Threats', 'Sniffing', 'Social Engineering', 'Web Application Hacking'] },
  OSCP: { file: 'bankOSCP', export: 'BANK_OSCP', topic: 'OSCP', domains: ['Information Gathering', 'Vulnerability Scanning', 'Exploitation', 'Privilege Escalation', 'Buffer Overflows', 'Active Directory', 'Reporting'] },
  EJPT: { file: 'bankEJPT', export: 'BANK_EJPT', topic: 'eJPT', domains: ['Assessment Methodology', 'Host & Network Auditing', 'Host & Network Pen Testing', 'Web Application Pen Testing'] },
  CCSP: { file: 'bankCCSP', export: 'BANK_CCSP', topic: 'CCSP', domains: ['Cloud Concepts & Architecture', 'Cloud Data Security', 'Cloud Platform Security', 'Cloud Application Security', 'Cloud Security Operations', 'Legal & Compliance'] },
  CCNA: { file: 'bankCCNA', export: 'BANK_CCNA', topic: 'CCNA', domains: ['Network Fundamentals', 'Network Access', 'IP Connectivity', 'IP Services', 'Security Fundamentals', 'Automation & Programmability'] },
  CCNPENT: { file: 'bankCCNPEnt', export: 'BANK_CCNPENT', topic: 'CCNP Enterprise', domains: ['Architecture', 'Virtualization', 'Infrastructure', 'Network Assurance', 'Security', 'Automation'] },
  CCNPSEC: { file: 'bankCCNPSec', export: 'BANK_CCNPSEC', topic: 'CCNP Security', domains: ['Security Concepts', 'Network Security', 'Content Security', 'Endpoint Protection', 'Secure Network Access', 'Visibility & Enforcement'] },
  CCIE: { file: 'bankCCIE', export: 'BANK_CCIE', topic: 'CCIE Enterprise', domains: ['Network Infrastructure', 'Software-Defined Infrastructure', 'Transport Technologies', 'Infrastructure Security', 'Infrastructure Automation'] },
  CYBEROPS: { file: 'bankCyberOps', export: 'BANK_CYBEROPS', topic: 'Cisco CyberOps', domains: ['Security Concepts', 'Security Monitoring', 'Host-Based Analysis', 'Network Intrusion Analysis', 'Security Policies & Procedures'] },
  PMP: { file: 'bankPMP', export: 'BANK_PMP', topic: 'PMP', domains: ['People', 'Process', 'Business Environment'] },
  CAPM: { file: 'bankCAPM', export: 'BANK_CAPM', topic: 'CAPM', domains: ['Project Management Fundamentals', 'Predictive Methodologies', 'Agile Frameworks', 'Business Analysis'] },
  PMIACP: { file: 'bankPMIACP', export: 'BANK_PMIACP', topic: 'PMI-ACP', domains: ['Agile Principles', 'Value-Driven Delivery', 'Stakeholder Engagement', 'Team Performance', 'Adaptive Planning', 'Problem Detection & Resolution', 'Continuous Improvement'] },
  PRINCE2: { file: 'bankPRINCE2', export: 'BANK_PRINCE2', topic: 'PRINCE2', domains: ['Principles', 'Themes', 'Processes', 'Tailoring', 'Business Case'] },
  SCRUM: { file: 'bankScrum', export: 'BANK_SCRUM', topic: 'Scrum Master', domains: ['Scrum Theory', 'Scrum Roles', 'Scrum Events', 'Scrum Artifacts', 'Servant Leadership'] },
  SAFE: { file: 'bankSAFe', export: 'BANK_SAFE', topic: 'SAFe Agilist', domains: ['SAFe Principles', 'Lean-Agile Mindset', 'SAFe Framework', 'Program Increment Planning', 'Agile Release Trains'] },
  ZACHMAN: { file: 'bankZachman', export: 'BANK_ZACHMAN', topic: 'Zachman Framework', domains: ['Framework Overview', 'Perspectives (What/How/Where/Who/When/Why)', 'Cell Intersections', 'Enterprise Modeling', 'Architecture Governance'] },
  FEAF: { file: 'bankFEAF', export: 'BANK_FEAF', topic: 'FEAF', domains: ['Architecture Framework', 'Performance Reference Model', 'Business Reference Model', 'Data Reference Model', 'Application Reference Model', 'Technical Reference Model'] },
  ITILF: { file: 'bankITILF', export: 'BANK_ITILF', topic: 'ITIL 4 Foundation', domains: ['Key Concepts of Service Management', 'Four Dimensions', 'Service Value System', 'Guiding Principles', 'Service Value Chain', 'Practices'] },
  ITILP: { file: 'bankITILP', export: 'BANK_ITILP', topic: 'ITIL 4 Practitioner', domains: ['Continual Improvement', 'Change Enablement', 'Incident Management', 'Problem Management', 'Service Request Management', 'Service Desk'] },
  ITILMP: { file: 'bankITILMP', export: 'BANK_ITILMP', topic: 'ITIL 4 Managing Professional', domains: ['Create Deliver & Support', 'Drive Stakeholder Value', 'High Velocity IT', 'Direct Plan & Improve'] },
  ITILSL: { file: 'bankITILSL', export: 'BANK_ITILSL', topic: 'ITIL 4 Strategic Leader', domains: ['Digital & IT Strategy', 'Direct Plan & Improve', 'Governance', 'Risk Management', 'Organizational Change'] },
  CKA: { file: 'bankCKA', export: 'BANK_CKA', topic: 'CKA', domains: ['Cluster Architecture', 'Workloads & Scheduling', 'Services & Networking', 'Storage', 'Troubleshooting'] },
  CKAD: { file: 'bankCKAD', export: 'BANK_CKAD', topic: 'CKAD', domains: ['Core Concepts', 'Configuration', 'Multi-Container Pods', 'Observability', 'Pod Design', 'Services & Networking', 'State Persistence'] },
  CKS: { file: 'bankCKS', export: 'BANK_CKS', topic: 'CKS', domains: ['Cluster Setup', 'Cluster Hardening', 'System Hardening', 'Minimize Microservice Vulnerabilities', 'Supply Chain Security', 'Monitoring & Runtime Security'] },
  DOCKER: { file: 'bankDocker', export: 'BANK_DOCKER', topic: 'Docker Certified Associate', domains: ['Orchestration', 'Image Creation & Management', 'Installation & Configuration', 'Networking', 'Security', 'Storage & Volumes'] },
  TERRAFORM: { file: 'bankTerraform', export: 'BANK_TERRAFORM', topic: 'Terraform Associate', domains: ['Infrastructure as Code', 'Terraform Workflow', 'State Management', 'Modules', 'Terraform Cloud'] },
  GHCICD: { file: 'bankGHCICD', export: 'BANK_GHCICD', topic: 'GitHub Actions CI/CD', domains: ['Workflow Syntax', 'Actions & Runners', 'Secrets & Security', 'Deployment Strategies', 'Reusable Workflows', 'Monitoring & Debugging'] },
  ADM201: { file: 'bankADM201', export: 'BANK_ADM201', topic: 'Salesforce Administrator', domains: ['Configuration & Setup', 'Object Manager', 'Sales & Marketing', 'Service & Support', 'Productivity & Collaboration', 'Data & Analytics Management', 'Workflow & Automation'] },
  PD1: { file: 'bankPD1', export: 'BANK_PD1', topic: 'Salesforce Platform Developer I', domains: ['Developer Fundamentals', 'Process Automation & Logic', 'User Interface', 'Data Modeling', 'Testing & Debugging', 'Debug & Deployment Tools'] },
  PD2: { file: 'bankPD2', export: 'BANK_PD2', topic: 'Salesforce Platform Developer II', domains: ['Advanced Apex', 'Integration Patterns', 'Lightning Components', 'Testing Strategies', 'Performance Optimization', 'Security & Sharing'] },
  SALESC: { file: 'bankSalesC', export: 'BANK_SALESC', topic: 'Salesforce Sales Cloud', domains: ['Sales Cloud Overview', 'Lead & Opportunity Management', 'Account & Contact Management', 'Forecasting & Analytics', 'Sales Automation', 'Integration & Customization'] },
  SERVC: { file: 'bankServC', export: 'BANK_SERVC', topic: 'Salesforce Service Cloud', domains: ['Case Management', 'Knowledge Management', 'Omni-Channel Routing', 'Service Console', 'Entitlements & SLAs', 'Field Service'] },
  DATABRICKS: { file: 'bankDatabricks', export: 'BANK_DATABRICKS', topic: 'Databricks Associate', domains: ['Databricks Lakehouse', 'Delta Lake', 'Spark SQL & DataFrames', 'ETL Pipelines', 'Unity Catalog & Security'] },
  SNOWFLAKE: { file: 'bankSnowflake', export: 'BANK_SNOWFLAKE', topic: 'Snowflake SnowPro Core', domains: ['Snowflake Architecture', 'Account Access & Security', 'Data Loading & Unloading', 'Performance Optimization', 'Data Sharing & Marketplace'] },
  DP203: { file: 'bankDP203', export: 'BANK_DP203', topic: 'Azure Data Engineer', domains: ['Data Storage', 'Data Processing', 'Data Security & Compliance', 'Monitoring & Optimization'] },
  LPIC1: { file: 'bankLPIC1', export: 'BANK_LPIC1', topic: 'LPIC-1', domains: ['System Architecture', 'Linux Installation', 'GNU & Unix Commands', 'Devices & Filesystems', 'Shells & Scripting', 'Networking Fundamentals', 'Security Administration'] },
  LPIC2: { file: 'bankLPIC2', export: 'BANK_LPIC2', topic: 'LPIC-2', domains: ['Kernel & System Startup', 'Filesystem & Devices', 'Advanced Storage', 'Network Configuration', 'System Maintenance', 'Domain Name Server', 'Web Services', 'File Sharing', 'Network Client Management', 'Email Services', 'System Security'] },
  RHCSA: { file: 'bankRHCSA', export: 'BANK_RHCSA', topic: 'RHCSA', domains: ['Understand & Use Essential Tools', 'Operate Running Systems', 'Configure Local Storage', 'Create & Configure File Systems', 'Deploy & Configure Systems', 'Manage Users & Groups', 'Manage Security'] },
  RHCE: { file: 'bankRHCE', export: 'BANK_RHCE', topic: 'RHCE', domains: ['Ansible Basics', 'Ansible Playbooks', 'Ansible Roles', 'Ansible Vault', 'Managing Systems with Ansible', 'Automation Best Practices'] },
  LINUXPLUS: { file: 'bankLinuxPlus', export: 'BANK_LINUXPLUS', topic: 'CompTIA Linux+', domains: ['System Management', 'Security', 'Scripting & Automation', 'Troubleshooting', 'Hardware & System Configuration'] },
};

const QUESTIONS_PER_DOMAIN = 10;

function pickCorrect(seed) {
  return seed % 4;
}

function makeQuestion(domain, topic, index) {
  const correct = pickCorrect(index + domain.length);
  const wrongOpts = [
    `An approach that ignores ${domain.toLowerCase()} best practices for ${topic}`,
    `A legacy method that does not scale for modern ${topic} workloads`,
    `A configuration that increases risk and violates ${domain.toLowerCase()} standards`,
    `A shortcut that bypasses proper ${domain.toLowerCase()} controls`,
  ];
  const correctOpt = `The recommended ${domain.toLowerCase()} practice aligned with ${topic} certification objectives`;
  const opts = [...wrongOpts];
  opts[correct] = correctOpt;

  const scenarios = [
    `An organization is preparing for ${topic} and must address ${domain}. Which option is BEST?`,
    `During a ${topic} assessment, which ${domain} approach meets industry standards?`,
    `A team implementing ${topic} needs guidance on ${domain}. What should they choose?`,
    `Which ${domain} solution is MOST appropriate for a ${topic} environment?`,
    `When designing ${domain} controls for ${topic}, which practice is CORRECT?`,
  ];

  return {
    domain,
    q: scenarios[index % scenarios.length],
    opts,
    a: correct,
    exp: `${correctOpt.charAt(0).toUpperCase() + correctOpt.slice(1)}. This aligns with ${topic} exam objectives for the ${domain} domain and reflects current industry best practices.`,
  };
}

function generateBank(id, meta) {
  const questions = [];
  meta.domains.forEach((domain, di) => {
    for (let i = 0; i < QUESTIONS_PER_DOMAIN; i++) {
      questions.push(makeQuestion(domain, meta.topic, di * QUESTIONS_PER_DOMAIN + i));
    }
  });

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
    lines.push('  {');
    lines.push(`    domain: ${JSON.stringify(q.domain)},`);
    lines.push(`    q: ${JSON.stringify(q.q)},`);
    lines.push(`    opts: [`);
    q.opts.forEach((o) => lines.push(`      ${JSON.stringify(o)},`));
    lines.push('    ],');
    lines.push(`    a: ${q.a},`);
    lines.push(`    exp: ${JSON.stringify(q.exp)},`);
    lines.push('  },');
  }

  lines.push('];');
  lines.push('');
  return lines.join('\n');
}

let created = 0;
let skipped = 0;

for (const [id, meta] of Object.entries(EXAMS)) {
  const path = join(DATA_DIR, `${meta.file}.ts`);
  if (existsSync(path)) {
    skipped++;
    continue;
  }
  writeFileSync(path, generateBank(id, meta));
  created++;
  console.log(`Created ${meta.file}.ts (${meta.domains.length * QUESTIONS_PER_DOMAIN} questions)`);
}

console.log(`\nDone: ${created} created, ${skipped} skipped.`);
