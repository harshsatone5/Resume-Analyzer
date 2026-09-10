export interface BulletEnhancementResult {
  original: string;
  options: {
    title: string;
    description: string;
    text: string;
    category: 'metrics' | 'leadership' | 'technical';
  }[];
}


export async function enhanceBulletPoint(
  originalText: string,
  contextRole?: string
): Promise<BulletEnhancementResult> {
  const clean = originalText.trim().replace(/^[-*•\s]+/, '');
  if (!clean) {
    return {
      original: originalText,
      options: []
    };
  }

  // Artificial short delay to give satisfying realistic AI processing feedback
  await new Promise((resolve) => setTimeout(resolve, 350));

  // Extract core verbs or nouns
  const words = clean.split(/\s+/);
  const firstWord = words[0] || '';
  const rest = words.slice(1).join(' ');

  // Heuristic generation based on Google XYZ format and top-tier ATS resume standards
  const options: BulletEnhancementResult['options'] = [
    {
      title: 'Impact & Metric-Driven',
      category: 'metrics',
      description: 'Quantifies outcomes with concrete operational metrics & efficiency gains',
      text: transformToMetrics(clean, firstWord, rest)
    },
    {
      title: 'Executive Leadership',
      category: 'leadership',
      description: 'Emphasizes strategic ownership, cross-functional alignment & team leadership',
      text: transformToLeadership(clean, firstWord, rest, contextRole)
    },
    {
      title: 'Technical Precision',
      category: 'technical',
      description: 'Highlights technical architecture, scalability, robustness & modern tooling',
      text: transformToTechnical(clean, firstWord, rest)
    }
  ];

  return {
    original: clean,
    options
  };
}

function transformToMetrics(text: string, firstWord: string, rest: string): string {
  // If already contains numbers or %
  const hasNumbers = /\d+[%kKmMbB]?/.test(text);

  let leadVerb = 'Spearheaded';
  if (/worked|helped|did|assisted|responsible for/i.test(firstWord)) {
    leadVerb = 'Engineered and scaled';
  } else if (/built|developed|created|made/i.test(firstWord)) {
    leadVerb = 'Designed and deployed';
  } else if (/managed|led|handled/i.test(firstWord)) {
    leadVerb = 'Orchestrated';
  } else {
    leadVerb = firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
  }

  if (hasNumbers) {
    return `${leadVerb} ${rest.replace(/^for\s+|^to\s+/i, '')}, driving measurable productivity increases and reducing operational overhead by 35%.`;
  }

  return `${leadVerb} ${rest.replace(/^for\s+|^to\s+/i, '')}, resulting in a 42% decrease in turnaround time and delivering 99.9% reliability across critical workflows.`;
}

function transformToLeadership(_text: string, _firstWord: string, rest: string, role?: string): string {
  const roleContext = role ? `as ${role}` : '';
  const leadVerb = 'Championed and directed';

  const sanitized = rest.replace(/^the\s+|^a\s+/i, '');
  return `${leadVerb} end-to-end execution of ${sanitized} ${roleContext}, aligning cross-functional stakeholders and elevating delivery velocity by 30%.`;
}

function transformToTechnical(text: string, _firstWord: string, rest: string): string {
  const techVerbs = ['Architected and implemented', 'Engineered resilient', 'Automated and optimized'];
  const chosenVerb = techVerbs[Math.abs(text.length) % techVerbs.length];

  const sanitized = rest.replace(/^the\s+|^a\s+/i, '');
  return `${chosenVerb} ${sanitized}, establishing automated monitoring, robust error handling, and standardized production deployment pipelines.`;
}
