import React, { useState, type KeyboardEvent } from 'react';
import { Tag, Plus, X, Sparkles, Check } from 'lucide-react';

interface SkillsSectionProps {
  skills: string[];
  onChange: (updated: string[]) => void;
}

const POPULAR_SUGGESTIONS = [
  'TypeScript', 'React', 'Node.js', 'Python', 'Go', 'AWS', 'Docker',
  'Kubernetes', 'PostgreSQL', 'GraphQL', 'Next.js', 'Tailwind CSS',
  'Redis', 'CI/CD', 'Git', 'System Design', 'Microservices', 'REST APIs'
];

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills, onChange }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAddSkill = (skillName: string) => {
    const trimmed = skillName.trim();
    if (trimmed && !skills.some((s) => s.toLowerCase() === trimmed.toLowerCase())) {
      onChange([...skills, trimmed]);
    }
    setInputValue('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddSkill(inputValue);
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    onChange(skills.filter((s) => s !== skillToRemove));
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all skills?')) {
      onChange([]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-zinc-400">
          Type a skill and press <kbd className="px-1.5 py-0.5 text-[10px] bg-zinc-800 border border-zinc-700 rounded text-zinc-300">Enter</kbd> or <kbd className="px-1.5 py-0.5 text-[10px] bg-zinc-800 border border-zinc-700 rounded text-zinc-300">,</kbd> to add.
        </p>
        {skills.length > 0 && (
          <button
            onClick={handleClearAll}
            className="text-[11px] text-zinc-500 hover:text-rose-400 transition-colors"
          >
            Clear all ({skills.length})
          </button>
        )}
      </div>

      {/* Input Field with Add Button */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Tag className="w-4 h-4 text-indigo-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add skill (e.g. React, Docker, System Architecture)..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-zinc-900 border border-zinc-700/80 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <button
          onClick={() => handleAddSkill(inputValue)}
          disabled={!inputValue.trim()}
          className="px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl transition-all flex items-center gap-1.5 flex-shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          Add
        </button>
      </div>

      {/* Active Skills Tags Container */}
      <div className="p-3.5 bg-zinc-950/70 border border-zinc-800 rounded-2xl min-h-[90px] flex flex-wrap gap-2 content-start">
        {skills.length === 0 ? (
          <div className="w-full text-center py-4 text-xs text-zinc-600">
            No skills added yet. Type above or choose from the suggested skills below.
          </div>
        ) : (
          skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-zinc-900 text-zinc-200 border border-zinc-700/80 hover:border-indigo-500/60 rounded-lg group transition-all"
            >
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                className="text-zinc-500 group-hover:text-rose-400 transition-colors p-0.5 rounded hover:bg-zinc-800"
                title="Remove tag"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))
        )}
      </div>

      {/* Quick Suggestions */}
      <div className="pt-1">
        <div className="text-[11px] font-medium text-zinc-400 flex items-center gap-1.5 mb-2">
          <Sparkles className="w-3 h-3 text-indigo-400" />
          Suggested Skills (Click to add):
        </div>
        <div className="flex flex-wrap gap-1.5">
          {POPULAR_SUGGESTIONS.map((sug) => {
            const isAlreadyAdded = skills.some((s) => s.toLowerCase() === sug.toLowerCase());
            return (
              <button
                key={sug}
                type="button"
                disabled={isAlreadyAdded}
                onClick={() => handleAddSkill(sug)}
                className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all inline-flex items-center gap-1 ${
                  isAlreadyAdded
                    ? 'bg-zinc-900/40 text-zinc-600 border-zinc-800/60 cursor-default'
                    : 'bg-zinc-900 hover:bg-indigo-950/50 text-zinc-400 hover:text-indigo-300 border-zinc-800 hover:border-indigo-500/50'
                }`}
              >
                {isAlreadyAdded ? <Check className="w-2.5 h-2.5 text-zinc-600" /> : <Plus className="w-2.5 h-2.5" />}
                {sug}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
