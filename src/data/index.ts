import type { ExamConfig } from '../types';
import { BANK_101 } from './bank101';
import { BANK_102 } from './bank102';
import { BANK_SAA } from './bankSAA';
import { BANK_SAP } from './bankSAP';

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
    provider: 'TOGAF',
    registrationUrl: 'https://www.opengroup.org/certifications/togaf-certification-program',
    price: '$550 – $715',
    prerequisites: 'None required',
    description: 'Tests knowledge of TOGAF terminology, the ADM lifecycle, core concepts, and the Architecture Content Framework. Closed book.',
    about:
      'The TOGAF Enterprise Architecture Foundation exam (OGEA-101) validates your understanding of the TOGAF Standard — including all ADM phases, key concepts, governance structures, and the Architecture Content Framework. It is the entry-level certification for enterprise architects and is recognized worldwide by leading organizations. The real exam is closed-book, 40 multiple-choice questions in 60 minutes, with a 55% pass mark.',
    examDomains: [
      { name: 'TOGAF Fundamental Concepts', weight: 15 },
      { name: 'ADM Phases & Outputs', weight: 30 },
      { name: 'ADM Guidelines & Techniques', weight: 20 },
      { name: 'Architecture Content Framework', weight: 20 },
      { name: 'Enterprise Continuum & Tools', weight: 15 },
    ],
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
    provider: 'TOGAF',
    registrationUrl: 'https://www.opengroup.org/certifications/togaf-certification-program',
    price: '$550 – $715',
    prerequisites: 'OGEA-101 (Foundation) recommended',
    description: 'Tests ability to apply TOGAF in real-world scenarios via scenario-based questions requiring analysis and judgment. Open book in the real exam.',
    about:
      'The TOGAF Enterprise Architecture Practitioner exam (OGEA-102) tests your ability to apply TOGAF principles to realistic enterprise architecture scenarios. Unlike the Foundation exam, it is open-book in the real test — you may reference the TOGAF Standard. Questions are scenario-based and require analysis, interpretation, and professional judgment rather than simple recall. It is recommended to hold OGEA-101 before attempting OGEA-102.',
    note: 'Open Book Exam: In the real OGEA-102, you may reference the TOGAF standard. This simulator is closed-book to help you study — practise recalling principles under pressure for maximum retention.',
    examDomains: [
      { name: 'Architecture Vision & Stakeholders', weight: 15 },
      { name: 'Business & IS Architecture', weight: 30 },
      { name: 'Technology Architecture', weight: 20 },
      { name: 'Migration Planning & Governance', weight: 20 },
      { name: 'Architecture Change Management', weight: 15 },
    ],
  },
  'SAA': {
    id: 'SAA',
    label: 'SAA-C03',
    fullName: 'AWS Certified Solutions Architect – Associate',
    level: 'Associate Level',
    questions: 65,
    minutes: 130,
    pass: 72,
    bank: BANK_SAA,
    provider: 'AWS',
    registrationUrl: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/',
    price: '$300 USD',
    prerequisites: 'None required (1+ year AWS experience recommended)',
    description: 'Tests ability to design resilient, performant, secure, and cost-optimized architectures on AWS, covering compute, storage, networking, databases, and more.',
    about:
      'The AWS Certified Solutions Architect – Associate (SAA-C03) is one of the most sought-after cloud certifications globally. It validates your ability to design and deploy well-architected solutions on AWS across a wide range of services. The exam consists of 65 questions (multiple-choice and multiple-response) in 130 minutes, with a scaled score of 720/1000 required to pass. Register through AWS Certification and schedule at a Pearson VUE test center or online proctored exam.',
    examDomains: [
      { name: 'Design Secure Architectures', weight: 30 },
      { name: 'Design Resilient Architectures', weight: 26 },
      { name: 'Design High-Performing Architectures', weight: 24 },
      { name: 'Design Cost-Optimized Architectures', weight: 20 },
    ],
  },
  'SAP': {
    id: 'SAP',
    label: 'SAP-C02',
    fullName: 'AWS Certified Solutions Architect – Professional',
    level: 'Professional Level',
    questions: 75,
    minutes: 180,
    pass: 75,
    bank: BANK_SAP,
    provider: 'AWS',
    registrationUrl: 'https://aws.amazon.com/certification/certified-solutions-architect-professional/',
    price: '$300 USD',
    prerequisites: 'AWS Solutions Architect – Associate or equivalent experience recommended',
    description: 'Advanced exam for designing complex AWS solutions covering organizational complexity, new solutions, migrations, cost control, and continuous improvement.',
    about:
      'The AWS Certified Solutions Architect – Professional (SAP-C02) is one of the most advanced AWS certifications, demonstrating deep expertise in designing and deploying dynamically scalable, highly available, fault-tolerant, and reliable applications on AWS. The exam has 75 questions in 180 minutes and features complex, multi-service scenario questions. A scaled score of 750/1000 is required to pass. It is strongly recommended to have at least 2 years of hands-on AWS experience and ideally the Associate certification before attempting.',
    examDomains: [
      { name: 'Design for Organizational Complexity', weight: 26 },
      { name: 'Design for New Solutions', weight: 29 },
      { name: 'Migration Planning', weight: 15 },
      { name: 'Cost Control', weight: 12 },
      { name: 'Continuous Improvement', weight: 18 },
    ],
  },
};

export { BANK_101, BANK_102, BANK_SAA, BANK_SAP };
