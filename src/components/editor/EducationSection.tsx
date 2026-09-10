import React from 'react';
import { GraduationCap, Plus, Trash2, Calendar, Award, ChevronUp, ChevronDown } from 'lucide-react';
import type { EducationItem } from '../../types/resume';

interface EducationSectionProps {
  education: EducationItem[];
  onChange: (updated: EducationItem[]) => void;
}

export const EducationSection: React.FC<EducationSectionProps> = ({ education, onChange }) => {
  const handleAddEducation = () => {
    const newItem: EducationItem = {
      id: `edu-${Date.now()}`,
      institution: '',
      degree: '',
      fieldOfStudy: '',
      location: '',
      endDate: '',
      gpa: '',
      honors: ''
    };
    onChange([...education, newItem]);
  };

  const handleRemove = (id: string) => {
    onChange(education.filter((item) => item.id !== id));
  };

  const handleMoveUp = (index: number) => {
    if (index <= 0) return;
    const next = [...education];
    const [moved] = next.splice(index, 1);
    next.splice(index - 1, 0, moved);
    onChange(next);
  };

  const handleMoveDown = (index: number) => {
    if (index >= education.length - 1) return;
    const next = [...education];
    const [moved] = next.splice(index, 1);
    next.splice(index + 1, 0, moved);
    onChange(next);
  };

  const handleUpdate = (id: string, field: keyof EducationItem, value: string) => {
    onChange(
      education.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: value };
        }
        return item;
      })
    );
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-xs text-zinc-400">
          List your university degrees, colleges, relevant academic coursework, or honors.
        </p>
        <button
          onClick={handleAddEducation}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-sm transition-all flex-shrink-0 active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Education
        </button>
      </div>

      {education.length === 0 ? (
        <div className="text-center py-7 border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/30">
          <GraduationCap className="w-7 h-7 text-zinc-600 mx-auto mb-1.5" />
          <p className="text-xs font-medium text-zinc-400">No education entries added</p>
          <button
            onClick={handleAddEducation}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 underline mt-1"
          >
            + Add Education Entry
          </button>
        </div>
      ) : (
        <div className="space-y-3.5">
          {education.map((item, index) => (
            <div
              key={item.id}
              className="p-4 bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700/80 rounded-2xl transition-all space-y-3 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-zinc-800 text-[11px] font-mono font-semibold text-zinc-400 flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-xs font-semibold text-zinc-200">
                    {item.institution || 'University / Institution'}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => handleMoveUp(index)}
                    className="p-1 text-zinc-500 hover:text-zinc-200 disabled:opacity-20 rounded transition-colors"
                    title="Move Up"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    disabled={index === education.length - 1}
                    onClick={() => handleMoveDown(index)}
                    className="p-1 text-zinc-500 hover:text-zinc-200 disabled:opacity-20 rounded transition-colors"
                    title="Move Down"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="p-1 text-zinc-500 hover:text-rose-400 rounded-lg hover:bg-zinc-800 transition-colors"
                    title="Remove education"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-zinc-400 mb-1">
                    School / University
                  </label>
                  <input
                    type="text"
                    value={item.institution}
                    onChange={(e) => handleUpdate(item.id, 'institution', e.target.value)}
                    placeholder="e.g. UC Berkeley or Stanford University"
                    className="w-full px-3 py-1.5 text-xs bg-zinc-950 border border-zinc-700/70 rounded-xl text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-zinc-400 mb-1">
                    Degree & Major
                  </label>
                  <input
                    type="text"
                    value={item.degree}
                    onChange={(e) => handleUpdate(item.id, 'degree', e.target.value)}
                    placeholder="e.g. B.S. in Computer Science"
                    className="w-full px-3 py-1.5 text-xs bg-zinc-950 border border-zinc-700/70 rounded-xl text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-zinc-400 mb-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-indigo-400" />
                    Graduation Year / Date
                  </label>
                  <input
                    type="text"
                    value={item.endDate}
                    onChange={(e) => handleUpdate(item.id, 'endDate', e.target.value)}
                    placeholder="e.g. 2023 or May 2023"
                    className="w-full px-3 py-1.5 text-xs bg-zinc-950 border border-zinc-700/70 rounded-xl text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-zinc-400 mb-1">
                    GPA (Optional)
                  </label>
                  <input
                    type="text"
                    value={item.gpa || ''}
                    onChange={(e) => handleUpdate(item.id, 'gpa', e.target.value)}
                    placeholder="e.g. 3.85 / 4.0"
                    className="w-full px-3 py-1.5 text-xs bg-zinc-950 border border-zinc-700/70 rounded-xl text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-zinc-400 mb-1 flex items-center gap-1">
                    <Award className="w-3 h-3 text-indigo-400" />
                    Honors / Minor
                  </label>
                  <input
                    type="text"
                    value={item.honors || ''}
                    onChange={(e) => handleUpdate(item.id, 'honors', e.target.value)}
                    placeholder="e.g. Magna Cum Laude"
                    className="w-full px-3 py-1.5 text-xs bg-zinc-950 border border-zinc-700/70 rounded-xl text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
