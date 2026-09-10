import type { ResumeData } from '../types/resume';

export interface CompletenessReport {
  score: number;
  suggestions: string[];
}

export function calculateProfileCompleteness(data: ResumeData): CompletenessReport {
  let score = 0;
  const suggestions: string[] = [];

  // 1. Personal Info (Name + Headline) - 20%
  if (data.personalInfo.fullName.trim()) {
    score += 10;
  } else {
    suggestions.push('Add your full name');
  }

  if (data.personalInfo.headline.trim()) {
    score += 10;
  } else {
    suggestions.push('Specify a professional headline (e.g. Senior Software Architect)');
  }

  // 2. Contact details (Email, Phone, Location) - 15%
  let contactPoints = 0;
  if (data.personalInfo.email.trim()) contactPoints++;
  if (data.personalInfo.phone.trim()) contactPoints++;
  if (data.personalInfo.location.trim()) contactPoints++;
  score += Math.round((contactPoints / 3) * 15);
  if (contactPoints < 3) {
    suggestions.push('Complete your contact details (email, phone, location)');
  }

  // 3. Summary - 15%
  if (data.personalInfo.summary.trim().length > 40) {
    score += 15;
  } else {
    suggestions.push('Write a 2-3 sentence professional summary highlighting your key achievements');
  }

  // 4. Work Experience - 25%
  if (data.experience.length > 0) {
    const hasBullets = data.experience.some((e) => e.bullets.filter(Boolean).length > 0);
    if (hasBullets) {
      score += 25;
    } else {
      score += 15;
      suggestions.push('Add at least 2 impact-driven bullet points to your work experience');
    }
  } else {
    suggestions.push('Add at least one previous work role or internship');
  }

  // 5. Education - 10%
  if (data.education.length > 0 && data.education[0].institution.trim()) {
    score += 10;
  } else {
    suggestions.push('Add your university degree or educational background');
  }

  // 6. Skills - 15%
  if (data.skills.length >= 5) {
    score += 15;
  } else if (data.skills.length > 0) {
    score += 8;
    suggestions.push(`Add ${5 - data.skills.length} more skills to reach the recommended minimum of 5`);
  } else {
    suggestions.push('Add your primary skills & technologies');
  }

  return {
    score: Math.min(100, Math.max(0, score)),
    suggestions
  };
}
