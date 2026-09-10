import type { AtsMatchResult, ResumeData } from '../types/resume';

const KNOWN_KEYWORDS = [
  // Languages & Core
  'typescript', 'javascript', 'python', 'java', 'golang', 'c++', 'c#', 'rust', 'ruby', 'php', 'swift', 'kotlin', 'sql', 'html', 'css',
  // Frameworks & Libraries
  'react', 'next.js', 'vue', 'angular', 'node.js', 'express', 'django', 'fastapi', 'flask', 'spring boot', 'graphql', 'rest api', 'tailwind css',
  // Cloud & DevOps
  'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'terraform', 'ci/cd', 'github actions', 'jenkins', 'microservices', 'serverless', 'lambda', 'linux',
  // Data & Storage
  'postgresql', 'mysql', 'mongodb', 'redis', 'elasticsearch', 'kafka', 'rabbitmq', 'snowflake', 'bigquery', 'pandas', 'spark',
  // Methodologies & Principles
  'agile', 'scrum', 'system design', 'distributed systems', 'unit testing', 'test driven development', 'object oriented design', 'performance optimization',
  'soc 2', 'gdpr', 'leadership', 'cross-functional', 'mentorship', 'stakeholder management', 'problem solving'
];

export function analyzeAtsMatch(resume: ResumeData, jobDescription: string): AtsMatchResult {
  if (!jobDescription || jobDescription.trim().length < 10) {
    return {
      jobTitle: 'Target Role',
      matchScore: 0,
      matchedKeywords: [],
      missingKeywords: [],
      totalKeywords: 0,
      recommendations: ['Paste a job description to calculate keyword match and ATS score.']
    };
  }

  // Compile entire resume text for search
  const resumeText = [
    resume.personalInfo.fullName,
    resume.personalInfo.headline,
    resume.personalInfo.summary,
    ...resume.skills,
    ...resume.experience.flatMap((e) => [e.company, e.position, ...(e.bullets || [])]),
    ...resume.education.flatMap((ed) => [ed.institution, ed.degree, ed.fieldOfStudy || '']),
    ...resume.projects.flatMap((p) => [p.title, ...(p.technologies || []), ...(p.bullets || [])]),
    ...resume.certifications.flatMap((c) => [c.name, c.issuer])
  ].join(' ').toLowerCase();

  const jdLower = jobDescription.toLowerCase();

  // Detect job title
  const titleMatch = jobDescription.match(/(?:title|role|position|looking for a|hiring a)\s*[:\-]?\s*([A-Za-z0-9\s\/\-]{3,40})/i);
  const detectedTitle = titleMatch ? titleMatch[1].trim() : 'Target Role';

  // Identify keywords mentioned in the job description
  const jdKeywords: string[] = [];
  for (const kw of KNOWN_KEYWORDS) {
    // Regex word boundary matching
    const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, 'i');
    if (regex.test(jdLower)) {
      jdKeywords.push(kw);
    }
  }

  // Also extract custom capitalized or frequent technical tokens in JD
  const customWords = jobDescription.match(/\b[A-Z][a-zA-Z0-9\+\#]{2,15}\b/g) || [];
  for (const word of customWords) {
    const lower = word.toLowerCase();
    if (!['the', 'and', 'for', 'with', 'you', 'our', 'will', 'this', 'that', 'have', 'from', 'team', 'work', 'role'].includes(lower)) {
      if (!jdKeywords.includes(lower) && lower.length > 2) {
        jdKeywords.push(lower);
      }
    }
  }

  // Deduplicate
  const uniqueJdKeywords = Array.from(new Set(jdKeywords));

  if (uniqueJdKeywords.length === 0) {
    return {
      jobTitle: detectedTitle,
      matchScore: 60,
      matchedKeywords: [],
      missingKeywords: [],
      totalKeywords: 0,
      recommendations: ['No specialized technical keywords identified. Ensure the full job description is included.']
    };
  }

  const matchedKeywords: string[] = [];
  const missingKeywords: string[] = [];

  for (const kw of uniqueJdKeywords) {
    const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, 'i');
    if (regex.test(resumeText)) {
      matchedKeywords.push(kw);
    } else {
      missingKeywords.push(kw);
    }
  }

  const score = Math.round((matchedKeywords.length / uniqueJdKeywords.length) * 100);

  const recommendations: string[] = [];
  if (missingKeywords.length > 0) {
    recommendations.push(
      `Consider incorporating high-priority missing terms like "${missingKeywords.slice(0, 3).join('", "')}" into your Skills or Experience bullets.`
    );
  }
  if (!resume.personalInfo.summary || resume.personalInfo.summary.length < 50) {
    recommendations.push('Strengthen your Professional Summary with targeted industry keywords aligned with this job post.');
  }
  if (score >= 80) {
    recommendations.push('Excellent match! Your resume shows strong ATS keyword alignment for this position.');
  } else if (score >= 50) {
    recommendations.push('Moderate alignment. Adding a few targeted skills will significantly increase applicant screening odds.');
  } else {
    recommendations.push('Low keyword density. Adapt experience descriptions to directly reflect the requirements outlined.');
  }

  return {
    jobTitle: detectedTitle,
    matchScore: score,
    matchedKeywords,
    missingKeywords,
    totalKeywords: uniqueJdKeywords.length,
    recommendations
  };
}
