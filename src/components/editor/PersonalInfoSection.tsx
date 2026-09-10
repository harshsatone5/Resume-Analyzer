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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-medium text-zinc-300 mb-1.5 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-indigo-400" />
            Full Name <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            value={data.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="e.g. Alex Vance"
            className="w-full px-3 py-2 text-sm bg-zinc-900 border border-zinc-700/80 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
          />
        </div>

        {/* Professional Title */}
        <div>
          <label className="block text-xs font-medium text-zinc-300 mb-1.5 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            Professional Headline
          </label>
          <input
            type="text"
            value={data.headline}
            onChange={(e) => handleChange('headline', e.target.value)}
            placeholder="e.g. Senior Software Architect"
            className="w-full px-3 py-2 text-sm bg-zinc-900 border border-zinc-700/80 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-medium text-zinc-300 mb-1.5 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-indigo-400" />
            Email Address <span className="text-rose-400">*</span>
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="alex@example.com"
            className="w-full px-3 py-2 text-sm bg-zinc-900 border border-zinc-700/80 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-medium text-zinc-300 mb-1.5 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-indigo-400" />
            Phone Number
          </label>
          <input
            type="text"
            value={data.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+1 (555) 000-0000"
            className="w-full px-3 py-2 text-sm bg-zinc-900 border border-zinc-700/80 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
          />
        </div>

        {/* Location */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-zinc-300 mb-1.5 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-indigo-400" />
            Location / Remote Preference
          </label>
          <input
            type="text"
            value={data.location}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="San Francisco, CA (Open to Remote)"
            className="w-full px-3 py-2 text-sm bg-zinc-900 border border-zinc-700/80 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
          />
        </div>

        {/* Website / Portfolio */}
        <div>
          <label className="block text-xs font-medium text-zinc-300 mb-1.5 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-indigo-400" />
            Portfolio / Website
          </label>
          <input
            type="text"
            value={data.website || ''}
            onChange={(e) => handleChange('website', e.target.value)}
            placeholder="https://yourportfolio.dev"
            className="w-full px-3 py-2 text-sm bg-zinc-900 border border-zinc-700/80 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
          />
        </div>

        {/* LinkedIn */}
        <div>
          <label className="block text-xs font-medium text-zinc-300 mb-1.5 flex items-center gap-1.5">
            <LinkedinIcon className="w-3.5 h-3.5 text-indigo-400" />
            LinkedIn Profile
          </label>
          <input
            type="text"
            value={data.linkedin || ''}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            placeholder="linkedin.com/in/username"
            className="w-full px-3 py-2 text-sm bg-zinc-900 border border-zinc-700/80 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
          />
        </div>

        {/* GitHub */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-zinc-300 mb-1.5 flex items-center gap-1.5">
            <GithubIcon className="w-3.5 h-3.5 text-indigo-400" />
            GitHub Profile
          </label>
          <input
            type="text"
            value={data.github || ''}
            onChange={(e) => handleChange('github', e.target.value)}
            placeholder="github.com/username"
            className="w-full px-3 py-2 text-sm bg-zinc-900 border border-zinc-700/80 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
          />
        </div>
      </div>

      {/* Professional Summary */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-medium text-zinc-300 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            Professional Summary
          </label>
          <span className="text-[11px] text-zinc-500">
            {data.summary.length} characters
          </span>
        </div>
        <textarea
          rows={3}
          value={data.summary}
          onChange={(e) => handleChange('summary', e.target.value)}
          placeholder="Brief 2-3 sentence overview of your key expertise, years of experience, and primary accomplishments..."
          className="w-full px-3 py-2 text-sm bg-zinc-900 border border-zinc-700/80 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors leading-relaxed resize-y"
        />
      </div>
    </div>
  );
};
