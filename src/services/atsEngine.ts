export interface ContactInfo {
  name: string;
  email: string | null;
  phone: string | null;
  linkedin: string | null;
  github: string | null;
  location: string | null;
}

export interface SectionAnalysis {
  name: string;
  found: boolean;
  lineCount: number;
  feedback: string;
}

export interface HeatmapLine {
  lineIndex: number;
  text: string;
  type: 'positive' | 'warning' | 'danger' | 'skill' | 'neutral' | 'header';
  tag?: string;
  coachingTip?: string;
  rewriteSuggestion?: string;
}

export interface SkillMatchResult {
  matched: string[];
  missing: string[];
  extra: string[];
  matchRate: number; // 0 to 100
}

export interface AuditMetric {
  name: string;
  score: number;
  maxScore: number;
  status: 'excellent' | 'good' | 'warning' | 'poor';
  summary: string;
  tips: string[];
}

export interface ActionableFix {
  id: string;
  category: 'Impact' | 'Verbs' | 'Keywords' | 'Formatting';
  severity: 'high' | 'medium' | 'low';
  title: string;
  originalText?: string;
  suggestedText?: string;
  explanation: string;
}

export interface InterviewQuestion {
  category: 'Behavioral' | 'Technical' | 'Leadership';
  question: string;
  whyAsked: string;
  suggestedStarStrategy: string;
}

export interface ATSAnalysisResult {
  overallScore: number;
  grade: 'Elite (Top 5%)' | 'Strong Pass' | 'Needs Optimization' | 'High Risk';
  gradeColor: string;
  contact: ContactInfo;
  sections: SectionAnalysis[];
  metrics: {
    formatAndAts: AuditMetric;
    quantification: AuditMetric;
    powerVerbs: AuditMetric;
    skillAlignment: AuditMetric;
  };
  skills: SkillMatchResult;
  heatmapLines: HeatmapLine[];
  actionableFixes: ActionableFix[];
  interviewQuestions: InterviewQuestion[];
  stats: {
    wordCount: number;
    bulletCount: number;
    quantifiedBulletCount: number;
    powerVerbCount: number;
    weakVerbCount: number;
  };
}

// Regex collections for deep heuristic analysis
const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
const PHONE_REGEX = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
const LINKEDIN_REGEX = /linkedin\.com\/in\/[a-zA-Z0-9_-]+/i;
const GITHUB_REGEX = /github\.com\/[a-zA-Z0-9_-]+/i;
const METRICS_REGEX = /(\$\s?\d+([.,]\d+)?(\s?[kKmMbB])?|\d+([.,]\d+)?%|\b\d{1,3}(,\d{3})+\b|\b\d+\+?\s?(users|clients|customers|requests|transactions|stakeholders|members|releases|engineers|teams|days|months|years|hours|projects|tests|features|endpoints)\b)/i;

const POWER_VERBS = [
  'accelerated', 'achieved', 'administered', 'analyzed', 'architected', 'automated',
  'budgeted', 'built', 'championed', 'coached', 'collaborated', 'consolidated',
  'decreased', 'delivered', 'designed', 'developed', 'devised', 'doubled',
  'eliminated', 'engineered', 'enhanced', 'established', 'executed', 'expanded',
  'expedited', 'formulated', 'founded', 'generated', 'grew', 'guided',
  'headed', 'implemented', 'improved', 'increased', 'initiated', 'innovated',
  'instituted', 'integrated', 'introduced', 'invented', 'launched', 'led',
  'maximized', 'mentored', 'minimized', 'modernized', 'negotiated', 'optimized',
  'orchestrated', 'overhauled', 'partnered', 'pioneered', 'produced', 'quadrupled',
  'reduced', 'refactored', 'resolved', 'restructured', 'revitalized', 'saved',
  'scaled', 'secured', 'simplified', 'spearheaded', 'standardized', 'streamlined',
  'strengthened', 'surpassed', 'tripled', 'upgraded', 'yielded'
];

const WEAK_PASSIVE_PHRASES = [
  'responsible for', 'helped with', 'helped to', 'assisted in', 'assisted with',
  'worked on', 'duties included', 'tasked with', 'handled', 'participated in',
  'involved in', 'familiar with', 'did', 'tried to', 'contributed to'
];

const COMMON_SKILLS_DICTIONARY = [
  'React', 'TypeScript', 'JavaScript', 'Node.js', 'Next.js', 'Vue.js', 'Angular',
  'Python', 'Java', 'C++', 'C#', 'Go', 'Rust', 'Ruby', 'PHP', 'Swift', 'Kotlin',
  'HTML5', 'CSS3', 'Tailwind CSS', 'Sass', 'Redux', 'GraphQL', 'REST APIs', 'REST',
  'SQL', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Cassandra', 'Snowflake',
  'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'Terraform', 'CI/CD', 'GitHub Actions',
  'Jenkins', 'Git', 'Linux', 'Bash', 'Prometheus', 'Grafana', 'Datadog',
  'PyTorch', 'TensorFlow', 'Scikit-learn', 'Machine Learning', 'Deep Learning',
  'NLP', 'LLMs', 'LangChain', 'RAG', 'Vector Databases', 'Transformers', 'Hugging Face',
  'Pandas', 'NumPy', 'Airflow', 'Spark', 'FastAPI', 'Flask', 'Django',
  'Figma', 'UI/UX', 'Wireframing', 'Prototyping', 'Design Systems', 'User Research',
  'Agile', 'Scrum', 'Jira', 'Product Strategy', 'Roadmapping', 'A/B Testing', 'OKRs',
  'Mixpanel', 'Amplitude', 'Tableau', 'Power BI', 'ETL', 'System Architecture',
  'Unit Testing', 'Jest', 'Cypress', 'Playwright', 'SOC 2', 'GDPR', 'Security',
  'Cross-Functional Leadership', 'Go-To-Market', 'PRDs', 'Stakeholder Management'
];

export function analyzeResumeATS(resumeText: string, jobDescriptionText: string = ''): ATSAnalysisResult {
  const lines = resumeText.split('\n');

  // 1. Contact Extraction
  const contact: ContactInfo = {
    name: lines.find(l => l.trim().length > 2 && !l.includes('@') && !l.includes('http'))?.trim() || 'Candidate',
    email: resumeText.match(EMAIL_REGEX)?.[0] || null,
    phone: resumeText.match(PHONE_REGEX)?.[0] || null,
    linkedin: resumeText.match(LINKEDIN_REGEX)?.[0] || null,
    github: resumeText.match(GITHUB_REGEX)?.[0] || null,
    location: null
  };

  // Location heuristic
  for (const line of lines.slice(0, 6)) {
    if (line.match(/[A-Za-z\s]+,\s?[A-Z]{2}/) || line.toLowerCase().includes('remote')) {
      const match = line.match(/[A-Za-z\s]+,\s?[A-Z]{2}/);
      if (match) {
        contact.location = match[0].trim();
        break;
      }
    }
  }

  // 2. Sections Detection
  const sectionKeywords = [
    { name: 'Summary / Profile', keys: ['summary', 'objective', 'about me', 'profile', 'professional summary'] },
    { name: 'Experience / Work History', keys: ['experience', 'work experience', 'employment', 'work history', 'professional experience'] },
    { name: 'Skills & Technologies', keys: ['skills', 'technical skills', 'core competencies', 'technologies', 'tools'] },
    { name: 'Education', keys: ['education', 'academic background', 'degrees', 'university'] },
    { name: 'Projects', keys: ['projects', 'personal projects', 'key projects', 'notable projects'] },
    { name: 'Certifications', keys: ['certifications', 'licenses', 'certificates', 'accreditations'] }
  ];

  const sections: SectionAnalysis[] = sectionKeywords.map(s => {
    const found = s.keys.some(k => new RegExp(`(^|\\n|#|\\*)\\s*${k}\\b`, 'i').test(resumeText));
    return {
      name: s.name,
      found,
      lineCount: found ? 5 : 0,
      feedback: found ? `Standard ${s.name} detected.` : `Missing clear heading for ${s.name}. ATS may struggle to parse this section.`
    };
  });

  // 3. Stats calculation
  const words = resumeText.split(/\s+/).filter(w => w.trim().length > 0);
  const wordCount = words.length;

  const bulletPoints: { text: string; index: number }[] = [];
  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('-') || trimmed.startsWith('•') || trimmed.startsWith('*') || /^\d+\./.test(trimmed)) {
      bulletPoints.push({ text: trimmed, index: idx });
    }
  });

  let quantifiedBulletCount = 0;
  let powerVerbCount = 0;
  let weakVerbCount = 0;

  const actionableFixes: ActionableFix[] = [];
  const heatmapLines: HeatmapLine[] = [];

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) {
      heatmapLines.push({ lineIndex: index, text: line, type: 'neutral' });
      return;
    }

    const isHeader = sectionKeywords.some(s => s.keys.some(k => trimmed.toLowerCase() === k || trimmed.toLowerCase().startsWith(k + ':')));
    if (isHeader) {
      heatmapLines.push({ lineIndex: index, text: line, type: 'header', tag: 'Section Header' });
      return;
    }

    const hasMetric = METRICS_REGEX.test(trimmed);
    const firstWord = trimmed.replace(/^[-•*0-9.]+\s*/, '').split(/\s+/)[0]?.toLowerCase() || '';
    const hasPowerVerb = POWER_VERBS.includes(firstWord);
    const weakPhraseFound = WEAK_PASSIVE_PHRASES.find(phrase => trimmed.toLowerCase().includes(phrase));

    if (hasMetric) quantifiedBulletCount++;
    if (hasPowerVerb) powerVerbCount++;
    if (weakPhraseFound) weakVerbCount++;

    if (weakPhraseFound) {
      const suggestedVerb = ['Orchestrated', 'Spearheaded', 'Architected', 'Streamlined', 'Engineered'][Math.floor(Math.random() * 5)];
      const rewritten = trimmed.replace(new RegExp(weakPhraseFound, 'i'), suggestedVerb);
      actionableFixes.push({
        id: `verb-${index}`,
        category: 'Verbs',
        severity: 'high',
        title: `Replace passive phrase "${weakPhraseFound}"`,
        originalText: trimmed,
        suggestedText: rewritten,
        explanation: `Passive phrases like "${weakPhraseFound}" diminish your ownership. Lead with authoritative action verbs like "${suggestedVerb}".`
      });

      heatmapLines.push({
        lineIndex: index,
        text: line,
        type: 'warning',
        tag: `Passive: "${weakPhraseFound}"`,
        coachingTip: `Weak passive voice detected. Start with an action verb such as ${suggestedVerb}.`,
        rewriteSuggestion: rewritten
      });
    } else if (hasMetric && hasPowerVerb) {
      heatmapLines.push({
        lineIndex: index,
        text: line,
        type: 'positive',
        tag: 'Elite Impact (XYZ Metric)',
        coachingTip: 'Excellent bullet point! Features strong action verb combined with measurable outcome.'
      });
    } else if (hasMetric) {
      heatmapLines.push({
        lineIndex: index,
        text: line,
        type: 'positive',
        tag: 'Quantified Result',
        coachingTip: 'Great quantifiable metric included. Ensure the beginning of this line uses a strong power verb.'
      });
    } else if (bulletPoints.some(b => b.index === index)) {
      // Bullet with neither metric nor passive, but could be stronger
      if (trimmed.length > 30 && !hasMetric && actionableFixes.length < 5) {
        actionableFixes.push({
          id: `quant-${index}`,
          category: 'Impact',
          severity: 'medium',
          title: 'Add measurable metric to bullet point',
          originalText: trimmed,
          suggestedText: `${trimmed} — resulting in 25% increased throughput and saving 10+ engineering hours weekly.`,
          explanation: 'Recruiters and ATS favor the Google XYZ formula: "Accomplished [X] as measured by [Y], by doing [Z]".'
        });
      }
      heatmapLines.push({
        lineIndex: index,
        text: line,
        type: 'neutral',
        tag: 'Standard Bullet',
        coachingTip: 'Consider quantifying the result (e.g. % saved, latency reduction, user count, or $ revenue).'
      });
    } else {
      heatmapLines.push({
        lineIndex: index,
        text: line,
        type: 'neutral'
      });
    }
  });

  // 4. Skills extraction and Job Description matching
  const resumeSkillsFound = new Set<string>();
  COMMON_SKILLS_DICTIONARY.forEach(skill => {
    const escaped = skill.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, 'i');
    if (regex.test(resumeText)) {
      resumeSkillsFound.add(skill);
    }
  });

  const targetJobSkills = new Set<string>();
  if (jobDescriptionText.trim()) {
    COMMON_SKILLS_DICTIONARY.forEach(skill => {
      const escaped = skill.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
      const regex = new RegExp(`\\b${escaped}\\b`, 'i');
      if (regex.test(jobDescriptionText)) {
        targetJobSkills.add(skill);
      }
    });
  } else {
    // If no JD provided, benchmark against standard full-stack / tech set
    ['React', 'TypeScript', 'Node.js', 'Docker', 'AWS', 'SQL', 'Git', 'CI/CD', 'REST APIs'].forEach(s => targetJobSkills.add(s));
  }

  const matchedSkills: string[] = [];
  const missingSkills: string[] = [];
  const extraSkills: string[] = [];

  targetJobSkills.forEach(skill => {
    if (resumeSkillsFound.has(skill)) {
      matchedSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  });

  resumeSkillsFound.forEach(skill => {
    if (!targetJobSkills.has(skill)) {
      extraSkills.push(skill);
    }
  });

  const skillMatchRate = targetJobSkills.size > 0
    ? Math.round((matchedSkills.length / targetJobSkills.size) * 100)
    : 75;

  if (missingSkills.length > 0) {
    actionableFixes.unshift({
      id: 'fix-missing-skills',
      category: 'Keywords',
      severity: 'high',
      title: `Incorporate high-priority keywords: ${missingSkills.slice(0, 3).join(', ')}`,
      explanation: `The target job specifically mentions ${missingSkills.slice(0, 4).join(', ')}. Without these exact tokens, ATS keyword filters may deprioritize your application.`
    });
  }

  // 5. Dimensional Scoring Calculation
  // A. Format & ATS Parseability (25 pts)
  let formatScore = 0;
  if (contact.email) formatScore += 5;
  if (contact.phone) formatScore += 4;
  if (contact.linkedin || contact.github) formatScore += 5;
  if (contact.location) formatScore += 3;
  const standardSectionsFound = sections.filter(s => s.found).length;
  formatScore += Math.min(8, standardSectionsFound * 1.6);
  formatScore = Math.min(25, Math.round(formatScore));

  // B. Quantification & Impact (25 pts)
  const totalBullets = Math.max(1, bulletPoints.length);
  const quantRatio = quantifiedBulletCount / totalBullets;
  let quantScore = Math.round(quantRatio * 30);
  if (quantifiedBulletCount >= 3) quantScore = Math.max(quantScore, 18);
  if (quantifiedBulletCount >= 5) quantScore = Math.max(quantScore, 23);
  quantScore = Math.min(25, quantScore);

  // C. Power Verbs & Tone (20 pts)
  let verbScore = 12;
  verbScore += Math.min(8, powerVerbCount * 1.5);
  verbScore -= Math.min(8, weakVerbCount * 2.5);
  verbScore = Math.max(5, Math.min(20, Math.round(verbScore)));

  // D. Keyword & Skill Alignment (30 pts)
  let skillScore = Math.round((skillMatchRate / 100) * 30);
  skillScore = Math.max(8, Math.min(30, skillScore));

  const totalScore = formatScore + quantScore + verbScore + skillScore;

  let grade: ATSAnalysisResult['grade'] = 'Needs Optimization';
  let gradeColor = '#f59e0b';
  if (totalScore >= 88) {
    grade = 'Elite (Top 5%)';
    gradeColor = '#10b981';
  } else if (totalScore >= 75) {
    grade = 'Strong Pass';
    gradeColor = '#38bdf8';
  } else if (totalScore < 60) {
    grade = 'High Risk';
    gradeColor = '#f43f5e';
  }

  // 6. Generate Tailored Interview Questions
  const interviewQuestions: InterviewQuestion[] = [
    {
      category: 'Technical',
      question: missingSkills.length > 0
        ? `I noticed ${missingSkills[0]} is required for this role but not prominent in your background. How do you plan to get up to speed?`
        : `Walk me through the system architecture of your most complex project. What trade-offs did you make?`,
      whyAsked: missingSkills.length > 0
        ? 'Assesses candidate self-awareness and learning agility when bridging specific skill gaps.'
        : 'Tests technical depth, scalability intuition, and engineering rigor.',
      suggestedStarStrategy: `Acknowledge the gap with confidence: cite an adjacent technology you mastered quickly, mention active hands-on labs or certifications, and frame it as an exciting challenge.`
    },
    {
      category: 'Behavioral',
      question: quantifiedBulletCount > 0
        ? `You mentioned delivering measurable results in your recent role. Can you break down the STAR steps behind your biggest quantified win?`
        : `Describe a time when you had to prioritize project deliverables under tight deadlines without complete requirements.`,
      whyAsked: 'Verifies whether the metrics on the resume are authentic and reflects genuine personal ownership.',
      suggestedStarStrategy: `Use the STAR method: Situation (Context & bottleneck), Task (Your exact accountability), Action (Tactical steps you took), and Result (The metric uplift and team impact).`
    },
    {
      category: 'Leadership',
      question: `How do you approach disagreements with colleagues or stakeholders regarding architectural or product trade-offs?`,
      whyAsked: 'Measures emotional intelligence, conflict resolution, and collaborative problem-solving.',
      suggestedStarStrategy: `Focus on objective data: "I decouple the argument from egos by creating an evaluation matrix with latency, cost, and developer velocity benchmarks, then test a prototype to let data guide the consensus."`
    }
  ];

  return {
    overallScore: totalScore,
    grade,
    gradeColor,
    contact,
    sections,
    metrics: {
      formatAndAts: {
        name: 'ATS Parseability & Format',
        score: formatScore,
        maxScore: 25,
        status: formatScore >= 21 ? 'excellent' : formatScore >= 16 ? 'good' : 'warning',
        summary: formatScore >= 20 ? 'Standard ATS headers and contact details are properly placed.' : 'Some ATS standard sections or contact info are difficult to parse.',
        tips: [
          contact.linkedin ? '✓ LinkedIn profile detected' : '⚠️ Add your LinkedIn URL to top contact block',
          contact.github ? '✓ GitHub / Portfolio link found' : 'ℹ️ Add a link to GitHub or live portfolio',
          standardSectionsFound >= 4 ? '✓ Standard ATS headers present' : '⚠️ Use clear headings like "Experience", "Skills", "Education"'
        ]
      },
      quantification: {
        name: 'Quantification & Impact',
        score: quantScore,
        maxScore: 25,
        status: quantScore >= 20 ? 'excellent' : quantScore >= 14 ? 'good' : 'poor',
        summary: `${quantifiedBulletCount} of ${totalBullets} bullet points contain quantified metrics (percentages, numbers, dollars).`,
        tips: [
          'Aim for at least 60% of your experience bullets to include quantified numbers ($ saved, % increased, team sizes).',
          'Use the formula: "Accomplished [X] as measured by [Y], by doing [Z]".'
        ]
      },
      powerVerbs: {
        name: 'Power Verbs & Tone',
        score: verbScore,
        maxScore: 20,
        status: verbScore >= 16 ? 'excellent' : verbScore >= 12 ? 'good' : 'warning',
        summary: `Found ${powerVerbCount} high-impact action verbs and ${weakVerbCount} weak/passive phrases.`,
        tips: [
          weakVerbCount > 0 ? `Eliminate passive phrases like "responsible for" or "helped with".` : '✓ Strong proactive tone with active verbs.',
          'Start each bullet with powerful past-tense verbs: Orchestrated, Accelerated, Engineered, Spearheaded.'
        ]
      },
      skillAlignment: {
        name: 'Keyword & Role Match',
        score: skillScore,
        maxScore: 30,
        status: skillScore >= 24 ? 'excellent' : skillScore >= 17 ? 'good' : 'poor',
        summary: `Matched ${matchedSkills.length} out of ${targetJobSkills.size} target role competencies (${skillMatchRate}% match).`,
        tips: [
          missingSkills.length > 0 ? `Missing keywords: ${missingSkills.slice(0, 4).join(', ')}` : '✓ Outstanding keyword coverage for target role.',
          'Always mirror the exact phrasing found in the Job Description.'
        ]
      }
    },
    skills: {
      matched: matchedSkills,
      missing: missingSkills,
      extra: extraSkills,
      matchRate: skillMatchRate
    },
    heatmapLines,
    actionableFixes,
    interviewQuestions,
    stats: {
      wordCount,
      bulletCount: totalBullets,
      quantifiedBulletCount,
      powerVerbCount,
      weakVerbCount
    }
  };
}
