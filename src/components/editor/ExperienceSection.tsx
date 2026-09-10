import React, { useState } from 'react';
import {
  Briefcase,
  Plus,
  Trash2,
  Sparkles,
  Calendar,
  MapPin,
  Building2,
  ChevronUp,
  ChevronDown,
  Copy
} from 'lucide-react';
import type { ExperienceItem } from '../../types/resume';
import { enhanceBulletPoint } from '../../services/aiBulletEnhancer';
import type { BulletEnhancementResult } from '../../services/aiBulletEnhancer';
import { AiRewriteModal } from './AiRewriteModal';

interface ExperienceSectionProps {
  experience: ExperienceItem[];
  onChange: (updated: ExperienceItem[]) => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experience, onChange }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeEnhancement, setActiveEnhancement] = useState<BulletEnhancementResult | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [activeTarget, setActiveTarget] = useState<{ expId: string; bulletIdx: number } | null>(null);

  const handleAddExperience = () => {
    const newExp: ExperienceItem = {
      id: `exp-${Date.now()}`,
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: 'Present',
      current: true,
      bullets: ['']
    };
    onChange([newExp, ...experience]);
  };

  const handleRemoveExperience = (id: string) => {
    onChange(experience.filter((item) => item.id !== id));
  };

  const handleDuplicate = (item: ExperienceItem, index: number) => {
    const duplicated: ExperienceItem = {
      ...item,
      id: `exp-${Date.now()}`,
      position: `${item.position || 'Role'} (Copy)`
    };
    const next = [...experience];
    next.splice(index + 1, 0, duplicated);
    onChange(next);
  };

  const handleMoveUp = (index: number) => {
    if (index <= 0) return;
    const next = [...experience];
    const [moved] = next.splice(index, 1);
    next.splice(index - 1, 0, moved);
    onChange(next);
  };

  const handleMoveDown = (index: number) => {
    if (index >= experience.length - 1) return;
    const next = [...experience];
    const [moved] = next.splice(index, 1);
    next.splice(index + 1, 0, moved);
    onChange(next);
  };

  const handleUpdateItem = (id: string, field: keyof ExperienceItem, value: any) => {
    onChange(
      experience.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: value };
        }
        return item;
      })
    );
  };

  const handleAddBullet = (expId: string) => {
    onChange(
      experience.map((item) => {
        if (item.id === expId) {
          return { ...item, bullets: [...item.bullets, ''] };
        }
        return item;
      })
    );
  };

  const handleUpdateBullet = (expId: string, bulletIdx: number, text: string) => {
    onChange(
      experience.map((item) => {
        if (item.id === expId) {
          const newBullets = [...item.bullets];
          newBullets[bulletIdx] = text;
          return { ...item, bullets: newBullets };
        }
        return item;
      })
    );
  };

  const handleRemoveBullet = (expId: string, bulletIdx: number) => {
    onChange(
      experience.map((item) => {
        if (item.id === expId) {
          const newBullets = item.bullets.filter((_, idx) => idx !== bulletIdx);
          return { ...item, bullets: newBullets.length ? newBullets : [''] };
        }
        return item;
      })
    );
  };

  const handleTriggerAiEnhance = async (expId: string, bulletIdx: number, bulletText: string, role: string) => {
    if (!bulletText.trim()) return;
    setActiveTarget({ expId, bulletIdx });
    setModalOpen(true);
    setIsLoadingAi(true);

    try {
      const result = await enhanceBulletPoint(bulletText, role);
      setActiveEnhancement(result);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingAi(false);
    }
  };

  const handleApplyAiRewrite = (newText: string) => {
    if (!activeTarget) return;
    handleUpdateBullet(activeTarget.expId, activeTarget.bulletIdx, newText);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-xs text-zinc-400">
          Highlight your professional roles, quantifiable accomplishments, and technology impact.
        </p>
        <button
          onClick={handleAddExperience}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-sm transition-all flex-shrink-0 active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Experience
        </button>
      </div>

      {experience.length === 0 ? (
        <div className="text-center py-8 border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/30">
          <Briefcase className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
          <p className="text-sm font-medium text-zinc-400">No work experience added yet</p>
          <p className="text-xs text-zinc-600 mt-0.5 mb-3">Add your previous roles to populate your resume</p>
          <button
            onClick={handleAddExperience}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 underline"
          >
            + Add First Experience
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {experience.map((item, index) => (
            <div
              key={item.id}
              className="p-4 bg-zinc-900/80 border border-zinc-800/90 hover:border-zinc-700/90 rounded-2xl transition-all space-y-3.5 shadow-sm"
            >
              {/* Header bar of the card with Move Up / Move Down / Duplicate / Delete */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-zinc-800 text-[11px] font-mono font-semibold text-zinc-400 flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-sm font-semibold text-zinc-200">
                    {item.position || item.company ? `${item.position || 'Role'} ${item.company ? `at ${item.company}` : ''}` : 'New Position'}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => handleMoveUp(index)}
                    className="p-1 text-zinc-500 hover:text-zinc-200 disabled:opacity-20 disabled:hover:text-zinc-500 rounded transition-colors"
                    title="Move Up"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    disabled={index === experience.length - 1}
                    onClick={() => handleMoveDown(index)}
                    className="p-1 text-zinc-500 hover:text-zinc-200 disabled:opacity-20 disabled:hover:text-zinc-500 rounded transition-colors"
                    title="Move Down"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDuplicate(item, index)}
                    className="p-1 text-zinc-500 hover:text-indigo-300 rounded transition-colors"
                    title="Duplicate Role"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveExperience(item.id)}
                    className="p-1 text-zinc-500 hover:text-rose-400 rounded transition-colors"
                    title="Remove experience"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Company & Position Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-zinc-400 mb-1 flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-indigo-400" />
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={item.company}
                    onChange={(e) => handleUpdateItem(item.id, 'company', e.target.value)}
                    placeholder="e.g. Google or Stripe"
                    className="w-full px-3 py-1.5 text-xs bg-zinc-950 border border-zinc-700/70 rounded-xl text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-zinc-400 mb-1 flex items-center gap-1">
                    <Briefcase className="w-3 h-3 text-indigo-400" />
                    Job Title / Position
                  </label>
                  <input
                    type="text"
                    value={item.position}
                    onChange={(e) => handleUpdateItem(item.id, 'position', e.target.value)}
                    placeholder="e.g. Senior Software Engineer"
                    className="w-full px-3 py-1.5 text-xs bg-zinc-950 border border-zinc-700/70 rounded-xl text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Dates and Location */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-zinc-400 mb-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-indigo-400" />
                    Start Date
                  </label>
                  <input
                    type="text"
                    value={item.startDate}
                    onChange={(e) => handleUpdateItem(item.id, 'startDate', e.target.value)}
                    placeholder="e.g. 2021-03 or Mar 2021"
                    className="w-full px-3 py-1.5 text-xs bg-zinc-950 border border-zinc-700/70 rounded-xl text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-zinc-400 mb-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-indigo-400" />
                    End Date
                  </label>
                  <input
                    type="text"
                    disabled={item.current}
                    value={item.current ? 'Present' : item.endDate}
                    onChange={(e) => handleUpdateItem(item.id, 'endDate', e.target.value)}
                    placeholder="e.g. Present"
                    className="w-full px-3 py-1.5 text-xs bg-zinc-950 border border-zinc-700/70 rounded-xl text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 disabled:opacity-60"
                  />
                  <div className="mt-1 flex items-center gap-1.5">
                    <input
                      type="checkbox"
                      id={`curr-${item.id}`}
                      checked={item.current}
                      onChange={(e) => {
                        handleUpdateItem(item.id, 'current', e.target.checked);
                        if (e.target.checked) handleUpdateItem(item.id, 'endDate', 'Present');
                      }}
                      className="rounded border-zinc-700 text-indigo-600 focus:ring-0 w-3 h-3 bg-zinc-950"
                    />
                    <label htmlFor={`curr-${item.id}`} className="text-[11px] text-zinc-400 cursor-pointer">
                      Currently working here
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-zinc-400 mb-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-indigo-400" />
                    Location
                  </label>
                  <input
                    type="text"
                    value={item.location || ''}
                    onChange={(e) => handleUpdateItem(item.id, 'location', e.target.value)}
                    placeholder="e.g. San Francisco, CA"
                    className="w-full px-3 py-1.5 text-xs bg-zinc-950 border border-zinc-700/70 rounded-xl text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Bullet Points Section */}
              <div className="pt-2 border-t border-zinc-800/80">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-medium text-zinc-300">
                    Key Responsibilities & Quantified Achievements
                  </span>
                  <button
                    onClick={() => handleAddBullet(item.id)}
                    className="text-[11px] font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add Bullet Point
                  </button>
                </div>

                <div className="space-y-2">
                  {item.bullets.map((bullet, bulletIdx) => (
                    <div key={bulletIdx} className="group relative flex items-start gap-2">
                      <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-zinc-500 group-focus-within:bg-indigo-400 flex-shrink-0" />
                      <div className="flex-1 relative">
                        <textarea
                          rows={2}
                          value={bullet}
                          onChange={(e) => handleUpdateBullet(item.id, bulletIdx, e.target.value)}
                          placeholder="e.g. Spearheaded microservice architecture migration, cutting p99 response times by 38%..."
                          className="w-full pl-2.5 pr-28 py-1.5 text-xs bg-zinc-950 border border-zinc-700/70 rounded-xl text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors leading-relaxed"
                        />
                        {/* AI Enhance Button Floating inside textarea corner */}
                        <div className="absolute right-2 top-1.5 flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() =>
                              handleTriggerAiEnhance(item.id, bulletIdx, bullet, item.position)
                            }
                            disabled={!bullet.trim()}
                            title="Enhance with AI using impact metrics and action verbs"
                            className="inline-flex items-center gap-1 px-2 py-1 text-[10px] font-semibold text-indigo-300 bg-indigo-950/70 hover:bg-indigo-900/90 border border-indigo-500/40 rounded-lg shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed group/btn"
                          >
                            <Sparkles className="w-3 h-3 text-indigo-400 group-hover/btn:animate-spin" />
                            <span>Enhance AI</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveBullet(item.id, bulletIdx)}
                            className="p-1 text-zinc-500 hover:text-rose-400 rounded transition-colors"
                            title="Delete bullet"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* AI Rewrite Modal */}
      <AiRewriteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        result={activeEnhancement}
        isLoading={isLoadingAi}
        onApply={handleApplyAiRewrite}
      />
    </div>
  );
};
