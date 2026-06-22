/** Certification category (provider) colour tokens used across the app. */
export interface CategoryTheme {
  slug: string;
  label: string;
  primary: string;
  secondary: string;
  /** rgba glow for radial backgrounds */
  glow: string;
  /** border / badge tint */
  tint: string;
}

export const CATEGORY_THEMES: Record<string, CategoryTheme> = {
  'AWS': {
    slug: 'aws',
    label: 'AWS',
    primary: '#ff9900',
    secondary: '#ffca28',
    glow: 'rgba(255,153,0,0.13)',
    tint: 'rgba(255,153,0,0.12)',
  },
  'Microsoft Azure': {
    slug: 'azure',
    label: 'Microsoft Azure',
    primary: '#0078d4',
    secondary: '#50a0ff',
    glow: 'rgba(0,120,212,0.13)',
    tint: 'rgba(0,120,212,0.12)',
  },
  'Google Cloud': {
    slug: 'gcp',
    label: 'Google Cloud',
    primary: '#4285f4',
    secondary: '#34a853',
    glow: 'rgba(66,133,244,0.13)',
    tint: 'rgba(66,133,244,0.12)',
  },
  'CompTIA': {
    slug: 'comptia',
    label: 'CompTIA',
    primary: '#c8102e',
    secondary: '#e8324a',
    glow: 'rgba(200,16,46,0.13)',
    tint: 'rgba(200,16,46,0.12)',
  },
  'Cybersecurity': {
    slug: 'cybersec',
    label: 'Cybersecurity',
    primary: '#00c896',
    secondary: '#00ffaa',
    glow: 'rgba(0,200,150,0.13)',
    tint: 'rgba(0,200,150,0.12)',
  },
  'Cisco': {
    slug: 'cisco',
    label: 'Cisco',
    primary: '#049fd9',
    secondary: '#00bce4',
    glow: 'rgba(4,159,217,0.13)',
    tint: 'rgba(4,159,217,0.12)',
  },
  'Project Management': {
    slug: 'pm',
    label: 'Project Management',
    primary: '#9333ea',
    secondary: '#c084fc',
    glow: 'rgba(147,51,234,0.13)',
    tint: 'rgba(147,51,234,0.12)',
  },
  'Enterprise Architecture': {
    slug: 'ea',
    label: 'Enterprise Architecture',
    primary: '#7c5cbf',
    secondary: '#00d4ff',
    glow: 'rgba(124,92,191,0.14)',
    tint: 'rgba(124,92,191,0.12)',
  },
  'ITIL': {
    slug: 'itil',
    label: 'ITIL',
    primary: '#e20074',
    secondary: '#ff4da6',
    glow: 'rgba(226,0,116,0.13)',
    tint: 'rgba(226,0,116,0.12)',
  },
  'Kubernetes & DevOps': {
    slug: 'k8s',
    label: 'Kubernetes & DevOps',
    primary: '#326ce5',
    secondary: '#00d4ff',
    glow: 'rgba(50,108,229,0.13)',
    tint: 'rgba(50,108,229,0.12)',
  },
  'Salesforce': {
    slug: 'salesforce',
    label: 'Salesforce',
    primary: '#00a1e0',
    secondary: '#1798c1',
    glow: 'rgba(0,161,224,0.13)',
    tint: 'rgba(0,161,224,0.12)',
  },
  'Data & Analytics': {
    slug: 'data',
    label: 'Data & Analytics',
    primary: '#f59e0b',
    secondary: '#fbbf24',
    glow: 'rgba(245,158,11,0.13)',
    tint: 'rgba(245,158,11,0.12)',
  },
  'Linux': {
    slug: 'linux',
    label: 'Linux',
    primary: '#fcc624',
    secondary: '#ffe066',
    glow: 'rgba(252,198,36,0.13)',
    tint: 'rgba(252,198,36,0.12)',
  },
  'ISTQB': {
    slug: 'istqb',
    label: 'ISTQB',
    primary: '#00629b',
    secondary: '#0095d9',
    glow: 'rgba(0,98,155,0.13)',
    tint: 'rgba(0,98,155,0.12)',
  },
};

/** Ordered list for selector screen grouping */
export const CATEGORY_ORDER = [
  'AWS',
  'Microsoft Azure',
  'Google Cloud',
  'CompTIA',
  'Cybersecurity',
  'Cisco',
  'Project Management',
  'Enterprise Architecture',
  'ITIL',
  'Kubernetes & DevOps',
  'Salesforce',
  'Data & Analytics',
  'Linux',
  'ISTQB',
] as const;

export function getCategoryTheme(provider: string): CategoryTheme {
  return CATEGORY_THEMES[provider] ?? CATEGORY_THEMES['Enterprise Architecture'];
}

export function getCategorySlug(provider: string): string {
  return getCategoryTheme(provider).slug;
}

export function getCategoryBySlug(slug: string): string | null {
  const match = Object.entries(CATEGORY_THEMES).find(([, theme]) => theme.slug === slug);
  return match ? match[0] : null;
}

/** Inline CSS custom properties for a category wrapper element */
export function categoryStyle(provider: string): Record<string, string> {
  const t = getCategoryTheme(provider);
  return {
    '--cat-primary': t.primary,
    '--cat-secondary': t.secondary,
    '--cat-glow': t.glow,
    '--cat-tint': t.tint,
  };
}
