/**
 * Shared question generator for bank expansion.
 */

const CONTEXTS = [
  'a multinational enterprise',
  'a regulated financial institution',
  'a healthcare organization',
  'a high-traffic e-commerce platform',
  'a government agency',
  'a SaaS startup scaling rapidly',
  'a manufacturing company modernizing IT',
  'a media company with global users',
];

const STEMS = [
  (domain, topic, ctx) =>
    `${ctx.charAt(0).toUpperCase() + ctx.slice(1)} is preparing for ${topic} and must strengthen ${domain}. Which option is BEST?`,
  (domain, topic, ctx) =>
    `During a ${topic} readiness review at ${ctx}, which ${domain} approach meets certification objectives?`,
  (domain, topic, ctx) =>
    `A consultant advising ${ctx} on ${topic} recommends improvements to ${domain}. What should they implement?`,
  (domain, topic, ctx) =>
    `Which ${domain} strategy is MOST appropriate when ${ctx} adopts ${topic} standards?`,
  (domain, topic, ctx) =>
    `An audit of ${ctx} reveals gaps in ${domain} for ${topic}. Which remediation is CORRECT?`,
  (domain, topic, ctx) =>
    `${ctx.charAt(0).toUpperCase() + ctx.slice(1)} is designing a ${topic} study plan focused on ${domain}. Which resource topic is essential?`,
  (domain, topic, ctx) =>
    `When ${ctx} implements ${topic} controls for ${domain}, which practice reduces operational risk?`,
  (domain, topic, ctx) =>
    `A ${topic} practice exam scenario covers ${domain} for ${ctx}. Which answer demonstrates mastery?`,
  (domain, topic, ctx) =>
    `Which ${domain} principle is emphasized in ${topic} when supporting ${ctx}?`,
  (domain, topic, ctx) =>
    `${ctx.charAt(0).toUpperCase() + ctx.slice(1)} failed a mock ${topic} question on ${domain}. What concept should they review?`,
  (domain, topic, ctx) =>
    `For ${topic} certification, ${domain} knowledge is tested through scenarios like ${ctx}. Which solution fits?`,
  (domain, topic, ctx) =>
    `A team at ${ctx} debates ${domain} options while studying ${topic}. Which choice aligns with the exam guide?`,
  (domain, topic, ctx) =>
    `Which ${domain} capability is validated by ${topic} for organizations such as ${ctx}?`,
  (domain, topic, ctx) =>
    `When evaluating ${domain} tools for ${topic}, ${ctx} should prioritize which criterion?`,
  (domain, topic, ctx) =>
    `${ctx.charAt(0).toUpperCase() + ctx.slice(1)} must document ${domain} procedures for ${topic} compliance. Which standard applies?`,
  (domain, topic, ctx) =>
    `A ${topic} instructor asks about ${domain} in the context of ${ctx}. What is the accurate response?`,
  (domain, topic, ctx) =>
    `Which ${domain} metric best indicates ${topic} readiness for ${ctx}?`,
  (domain, topic, ctx) =>
    `${ctx.charAt(0).toUpperCase() + ctx.slice(1)} is troubleshooting a ${domain} issue while preparing for ${topic}. What is the first step?`,
  (domain, topic, ctx) =>
    `In ${topic}, how should ${ctx} handle a trade-off involving ${domain}?`,
  (domain, topic, ctx) =>
    `Which ${domain} pattern is commonly tested on ${topic} for scenarios involving ${ctx}?`,
];

const CORRECT_TEMPLATES = [
  (domain, topic) =>
    `Apply the ${topic}-aligned ${domain.toLowerCase()} approach recommended in official exam objectives`,
  (domain, topic) =>
    `Follow industry best practices for ${domain.toLowerCase()} as defined in the ${topic} body of knowledge`,
  (domain, topic) =>
    `Implement the standard ${domain.toLowerCase()} solution that satisfies ${topic} domain requirements`,
  (domain, topic) =>
    `Use the certified ${domain.toLowerCase()} methodology specified for ${topic} candidates`,
  (domain, topic) =>
    `Adopt the ${domain.toLowerCase()} control framework referenced in ${topic} study materials`,
  (domain, topic) =>
    `Configure ${domain.toLowerCase()} according to ${topic} exam blueprint recommendations`,
  (domain, topic) =>
    `Select the ${domain.toLowerCase()} option that meets ${topic} security and governance standards`,
  (domain, topic) =>
    `Design ${domain.toLowerCase()} using patterns validated in ${topic} practice assessments`,
];

const WRONG_TEMPLATES = [
  (domain) => `Deprecate ${domain.toLowerCase()} controls entirely to reduce complexity`,
  (domain) => `Use an undocumented workaround that bypasses ${domain.toLowerCase()} policies`,
  (domain) => `Disable monitoring for ${domain.toLowerCase()} to improve performance`,
  (domain) => `Grant excessive privileges that violate ${domain.toLowerCase()} least-privilege principles`,
  (domain) => `Rely solely on manual processes with no ${domain.toLowerCase()} automation`,
  (domain) => `Ignore ${domain.toLowerCase()} compliance requirements for faster deployment`,
  (domain) => `Mix production and test ${domain.toLowerCase()} configurations in one environment`,
  (domain) => `Store sensitive ${domain.toLowerCase()} credentials in plain text configuration files`,
  (domain) => `Skip ${domain.toLowerCase()} testing before production rollout`,
  (domain) => `Implement ${domain.toLowerCase()} without change management or rollback plans`,
  (domain) => `Use default ${domain.toLowerCase()} settings without hardening`,
  (domain) => `Centralize all ${domain.toLowerCase()} decisions without stakeholder review`,
];

export function makeQuestion(domain, topic, index, existingTexts = new Set()) {
  let attempt = index;
  let q;
  for (let tries = 0; tries < 50; tries++) {
    const ctx = CONTEXTS[attempt % CONTEXTS.length];
    const stemFn = STEMS[attempt % STEMS.length];
    q = stemFn(domain, topic, ctx);
    if (!existingTexts.has(q)) break;
    attempt++;
  }
  if (existingTexts.has(q)) {
    q = `${q} (Review item ${attempt + 1})`;
  }
  existingTexts.add(q);

  const correctIdx = attempt % 4;
  const correctOpt = CORRECT_TEMPLATES[attempt % CORRECT_TEMPLATES.length](domain, topic);

  const finalOpts = [];
  let wrongIdx = attempt;
  for (let i = 0; i < 4; i++) {
    if (i === correctIdx) {
      finalOpts.push(correctOpt);
    } else {
      finalOpts.push(WRONG_TEMPLATES[wrongIdx % WRONG_TEMPLATES.length](domain));
      wrongIdx++;
    }
  }

  const exp =
    `${correctOpt.charAt(0).toUpperCase() + correctOpt.slice(1)}. ` +
    `This is the recommended approach for the ${domain} domain on the ${topic} exam and reflects current certification objectives.`;

  return { domain, q, opts: finalOpts, a: correctIdx, exp };
}

export function formatQuestionBlock(q) {
  const lines = ['  {'];
  lines.push(`    domain: ${JSON.stringify(q.domain)},`);
  lines.push(`    q: ${JSON.stringify(q.q)},`);
  lines.push('    opts: [');
  for (const o of q.opts) lines.push(`      ${JSON.stringify(o)},`);
  lines.push('    ],');
  lines.push(`    a: ${q.a},`);
  lines.push(`    exp: ${JSON.stringify(q.exp)},`);
  lines.push('  },');
  return lines.join('\n');
}

export function extractDomainsFromBank(content) {
  const domains = [];
  const seen = new Set();
  for (const m of content.matchAll(/domain:\s*(['"])(.*?)\1/g)) {
    if (!seen.has(m[2])) {
      seen.add(m[2]);
      domains.push(m[2]);
    }
  }
  return domains;
}

export function countQuestionsInBank(content) {
  return (content.match(/\n\s+q:\s/g) || []).length;
}
