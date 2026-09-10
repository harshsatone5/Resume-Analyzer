import React from 'react';
import { User, Mail, Phone, MapPin, Globe, FileText } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../icons/SocialIcons';
import type { PersonalInfo } from '../../types/resume';

interface PersonalInfoSectionProps {
  data: PersonalInfo;
  onChange: (updated: PersonalInfo) => void;
}

export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({ data, onChange }) => {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Full Name */}
        <div>
          <label className="block text-[11px] font-medium text-zinc-400 mb-1 flex items-center gap-1.5">
            <User className="w-3 h-3 text-zinc-500" />
            Full Name <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            value={data.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="Alex Vance"
            className="w-full px-3 py-2 text-xs bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/30 transition-all"
          />
        </div>

        {/* Professional Title */}
        <div>
          <label className="block text-[11px] font-medium text-zinc-400 mb-1 flex items-center gap-1.5">
            <FileText className="w-3 h-3 text-zinc-500" />
            Professional Title
          </label>
          <input
            type="text"
            value={data.headline}
            onChange={(e) => handleChange('headline', e.target.value)}
            placeholder="Senior Software Architect"
            className="w-full px-3 py-2 text-xs bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/30 transition-all"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-[11px] font-medium text-zinc-400 mb-1 flex items-center gap-1.5">
            <Mail className="w-3 h-3 text-zinc-500" />
            Email <span className="text-rose-400">*</span>
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="alex@example.com"
            className="w-full px-3 py-2 text-xs bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/30 transition-all"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-[11px] font-medium text-zinc-400 mb-1 flex items-center gap-1.5">
            <Phone className="w-3 h-3 text-zinc-500" />
            Phone
          </label>
          <input
            type="text"
            value={data.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+1 (555) 000-0000"
            className="w-full px-3 py-2 text-xs bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/30 transition-all"
          />
        </div>

        {/* Location */}
        <div className="sm:col-span-2">
          <label className="block text-[11px] font-medium text-zinc-400 mb-1 flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-zinc-500" />
            Location
          </label>
          <input
            type="text"
            value={data.location}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="San Francisco, CA (Open to Remote)"
            className="w-full px-3 py-2 text-xs bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/30 transition-all"
          />
        </div>

        {/* Website / Portfolio */}
        <div>
          <label className="block text-[11px] font-medium text-zinc-400 mb-1 flex items-center gap-1.5">
            <Globe className="w-3 h-3 text-zinc-500" />
            Website / Portfolio
          </label>
          <input
            type="text"
            value={data.website || ''}
            onChange={(e) => handleChange('website', e.target.value)}
            placeholder="https://alexvance.dev"
            className="w-full px-3 py-2 text-xs bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/30 transition-all"
          />
        </div>

        {/* LinkedIn */}
        <div>
          <label className="block text-[11px] font-medium text-zinc-400 mb-1 flex items-center gap-1.5">
            <LinkedinIcon className="w-3 h-3 text-zinc-500" />
            LinkedIn
          </label>
          <input
            type="text"
            value={data.linkedin || ''}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            placeholder="linkedin.com/in/alexvance"
            className="w-full px-3 py-2 text-xs bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/30 transition-all"
          />
        </div>

        {/* GitHub */}
        <div className="sm:col-span-2">
          <label className="block text-[11px] font-medium text-zinc-400 mb-1 flex items-center gap-1.5">
            <GithubIcon className="w-3 h-3 text-zinc-500" />
            GitHub
          </label>
          <input
            type="text"
            value={data.github || ''}
            onChange={(e) => handleChange('github', e.target.value)}
            placeholder="github.com/alexvance"
            className="w-full px-3 py-2 text-xs bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/30 transition-all"
          />
        </div>
      </div>

      {/* Professional Summary */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-1">
          <label className="text-[11px] font-medium text-zinc-400 flex items-center gap-1.5">
            <FileText className="w-3 h-3 text-zinc-500" />
            Professional Summary
          </label>
          <span className="text-[10px] text-zinc-500 font-mono">
            {data.summary.length} chars
          </span>
        </div>
        <textarea
          rows={3}
          value={data.summary}
          onChange={(e) => handleChange('summary', e.target.value)}
          placeholder="Concise overview of your experience, key achievements, and domain expertise..."
          className="w-full px-3 py-2 text-xs bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/30 transition-all leading-relaxed resize-y"
        />
      </div>
    </div>
  );
};
