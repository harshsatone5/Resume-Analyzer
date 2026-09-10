export interface PersonalInfo {
  fullName: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  summary: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  location?: string;
  startDate?: string;
  endDate: string;
  gpa?: string;
  honors?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle?: string;
  link?: string;
  technologies: string[];
  bullets: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
}

export type TemplateType = 'modern' | 'executive' | 'minimalist' | 'creative';
export type FontFamilyType = 'sans' | 'serif' | 'mono';
export type FontSizeDensity = 'compact' | 'normal' | 'spacious';

export interface ResumeTheme {
  template: TemplateType;
  primaryColor: string;
  fontFamily: FontFamilyType;
  fontSize: FontSizeDensity;
}

export interface AtsMatchResult {
  jobTitle: string;
  matchScore: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  totalKeywords: number;
  recommendations: string[];
}
