const CONTACT_EMAIL = 'mustafa.hasanat99@gmail.com';

export function isExamAvailable(config: { bank: unknown[] }): boolean {
  return config.bank.length > 0;
}

export function buildContributeMailto(examLabel?: string): string {
  const subject = examLabel
    ? `Help build the ${examLabel} question bank — Oscar`
    : 'Help build a question bank — Oscar';

  const body = examLabel
    ? `Hi Oscar team,

I'd like to help build the practice question bank for ${examLabel}.

I can contribute:
- [ ] Official study materials or practice questions I have access to
- [ ] Domain expertise to review and validate questions
- [ ] Time to help write or curate new questions

A bit about me and what I can offer:


Looking forward to helping make this exam available on Oscar!

Best regards,
[Your name]`
    : `Hi Oscar team,

I'd like to help build a practice question bank for one of your certification exams.

Exam I'm interested in:
[e.g. AWS SAA-C03, PMP, AZ-104, etc.]

I can contribute:
- [ ] Official study materials or practice questions I have access to
- [ ] Domain expertise to review and validate questions
- [ ] Time to help write or curate new questions

A bit about me and what I can offer:


Looking forward to helping grow Oscar!

Best regards,
[Your name]`;

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
