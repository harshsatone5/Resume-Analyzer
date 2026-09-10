import React, { useState } from 'react';
import { FolderGit2, Award, Plus, Trash2 } from 'lucide-react';
import type { ProjectItem, CertificationItem } from '../../types/resume';

interface ProjectsSectionProps {
  projects: ProjectItem[];
  certifications: CertificationItem[];
  onProjectsChange: (projects: ProjectItem[]) => void;
  onCertificationsChange: (certs: CertificationItem[]) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  certifications,
  onProjectsChange,
  onCertificationsChange
}) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'certifications'>('projects');

  // Project handlers
  const handleAddProject = () => {
    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: '',
      subtitle: '',
      link: '',
      technologies: [],
      bullets: ['']
    };
    onProjectsChange([...projects, newProj]);
  };

  const handleRemoveProject = (id: string) => {
    onProjectsChange(projects.filter((p) => p.id !== id));
  };

  const handleUpdateProject = (id: string, field: keyof ProjectItem, value: any) => {
    onProjectsChange(
      projects.map((p) => {
        if (p.id === id) {
          return { ...p, [field]: value };
        }
        return p;
      })
    );
  };

  const handleAddProjectBullet = (projId: string) => {
    onProjectsChange(
      projects.map((p) => {
        if (p.id === projId) {
          return { ...p, bullets: [...p.bullets, ''] };
        }
        return p;
      })
    );
  };

  const handleUpdateProjectBullet = (projId: string, idx: number, text: string) => {
    onProjectsChange(
      projects.map((p) => {
        if (p.id === projId) {
          const newBullets = [...p.bullets];
          newBullets[idx] = text;
          return { ...p, bullets: newBullets };
        }
        return p;
      })
    );
  };

  const handleRemoveProjectBullet = (projId: string, idx: number) => {
    onProjectsChange(
      projects.map((p) => {
        if (p.id === projId) {
          const newBullets = p.bullets.filter((_, i) => i !== idx);
          return { ...p, bullets: newBullets.length ? newBullets : [''] };
        }
        return p;
      })
    );
  };

  // Certification handlers
  const handleAddCert = () => {
    const newCert: CertificationItem = {
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      date: '',
      url: ''
    };
    onCertificationsChange([...certifications, newCert]);
  };

  const handleRemoveCert = (id: string) => {
    onCertificationsChange(certifications.filter((c) => c.id !== id));
  };

  const handleUpdateCert = (id: string, field: keyof CertificationItem, value: string) => {
    onCertificationsChange(
      certifications.map((c) => {
        if (c.id === id) {
          return { ...c, [field]: value };
        }
        return c;
      })
    );
  };

  return (
    <div className="space-y-4">
      {/* Sub-Tabs: Projects vs Certifications */}
      <div className="flex items-center gap-2 p-1 bg-zinc-950/80 border border-zinc-800 rounded-xl">
        <button
          type="button"
          onClick={() => setActiveTab('projects')}
          className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'projects'
              ? 'bg-zinc-800 text-white shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <FolderGit2 className="w-3.5 h-3.5 text-indigo-400" />
          Projects ({projects.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('certifications')}
          className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'certifications'
              ? 'bg-zinc-800 text-white shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Award className="w-3.5 h-3.5 text-indigo-400" />
          Certifications ({certifications.length})
        </button>
      </div>

      {activeTab === 'projects' ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-zinc-400">
              Highlight key engineering projects, open-source work, or portfolio items.
            </p>
            <button
              onClick={handleAddProject}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-sm transition-all flex-shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Project
            </button>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-7 border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/30">
              <FolderGit2 className="w-7 h-7 text-zinc-600 mx-auto mb-1.5" />
              <p className="text-xs font-medium text-zinc-400">No projects added yet</p>
              <button
                onClick={handleAddProject}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 underline mt-1"
              >
                + Add First Project
              </button>
            </div>
          ) : (
            <div className="space-y-3.5">
              {projects.map((proj, idx) => (
                <div
                  key={proj.id}
                  className="p-4 bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700/80 rounded-2xl transition-all space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-zinc-800 text-[11px] font-semibold text-zinc-400 flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="text-xs font-semibold text-zinc-200">
                        {proj.title || 'Project Title'}
                      </span>
                    </div>
                    <button
                      onClick={() => handleRemoveProject(proj.id)}
                      className="p-1.5 text-zinc-500 hover:text-rose-400 rounded-lg hover:bg-zinc-800 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-zinc-400 mb-1">
                        Project Name
                      </label>
                      <input
                        type="text"
                        value={proj.title}
                        onChange={(e) => handleUpdateProject(proj.id, 'title', e.target.value)}
                        placeholder="e.g. KubeSentinel Autonomous Optimizer"
                        className="w-full px-3 py-1.5 text-xs bg-zinc-950 border border-zinc-700/70 rounded-xl text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-zinc-400 mb-1">
                        Subtitle / Role
                      </label>
                      <input
                        type="text"
                        value={proj.subtitle || ''}
                        onChange={(e) => handleUpdateProject(proj.id, 'subtitle', e.target.value)}
                        placeholder="e.g. Open Source Cloud Tool"
                        className="w-full px-3 py-1.5 text-xs bg-zinc-950 border border-zinc-700/70 rounded-xl text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-zinc-400 mb-1">
                        Project Link / GitHub URL
                      </label>
                      <input
                        type="text"
                        value={proj.link || ''}
                        onChange={(e) => handleUpdateProject(proj.id, 'link', e.target.value)}
                        placeholder="e.g. github.com/username/project"
                        className="w-full px-3 py-1.5 text-xs bg-zinc-950 border border-zinc-700/70 rounded-xl text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-zinc-400 mb-1">
                        Technologies (comma separated)
                      </label>
                      <input
                        type="text"
                        value={proj.technologies.join(', ')}
                        onChange={(e) =>
                          handleUpdateProject(
                            proj.id,
                            'technologies',
                            e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
                          )
                        }
                        placeholder="Go, Kubernetes, Prometheus"
                        className="w-full px-3 py-1.5 text-xs bg-zinc-950 border border-zinc-700/70 rounded-xl text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  {/* Bullets */}
                  <div className="pt-2 border-t border-zinc-800/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-medium text-zinc-400">
                        Description & Impact
                      </span>
                      <button
                        onClick={() => handleAddProjectBullet(proj.id)}
                        className="text-[11px] font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" /> Add Bullet
                      </button>
                    </div>
                    {proj.bullets.map((b, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={b}
                          onChange={(e) => handleUpdateProjectBullet(proj.id, bIdx, e.target.value)}
                          placeholder="e.g. Scaled database throughput by 4x using SIMD vectorization..."
                          className="flex-1 px-3 py-1.5 text-xs bg-zinc-950 border border-zinc-700/70 rounded-xl text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveProjectBullet(proj.id, bIdx)}
                          className="p-1 text-zinc-500 hover:text-rose-400 rounded transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Certifications Tab */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-zinc-400">
              Add professional certifications, credentials, or licenses.
            </p>
            <button
              onClick={handleAddCert}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-sm transition-all flex-shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Certification
            </button>
          </div>

          {certifications.length === 0 ? (
            <div className="text-center py-7 border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/30">
              <Award className="w-7 h-7 text-zinc-600 mx-auto mb-1.5" />
              <p className="text-xs font-medium text-zinc-400">No certifications added</p>
              <button
                onClick={handleAddCert}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 underline mt-1"
              >
                + Add First Certification
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="p-3.5 bg-zinc-900/80 border border-zinc-800 rounded-2xl space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-zinc-200">
                      {cert.name || 'Certification Name'}
                    </span>
                    <button
                      onClick={() => handleRemoveCert(cert.id)}
                      className="p-1 text-zinc-500 hover:text-rose-400 rounded-lg hover:bg-zinc-800 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <div>
                      <input
                        type="text"
                        value={cert.name}
                        onChange={(e) => handleUpdateCert(cert.id, 'name', e.target.value)}
                        placeholder="Certificate Title (e.g. AWS CKA)"
                        className="w-full px-2.5 py-1.5 text-xs bg-zinc-950 border border-zinc-700/70 rounded-xl text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        value={cert.issuer}
                        onChange={(e) => handleUpdateCert(cert.id, 'issuer', e.target.value)}
                        placeholder="Issuer (e.g. AWS, Linux Foundation)"
                        className="w-full px-2.5 py-1.5 text-xs bg-zinc-950 border border-zinc-700/70 rounded-xl text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        value={cert.date}
                        onChange={(e) => handleUpdateCert(cert.id, 'date', e.target.value)}
                        placeholder="Year / Date (e.g. 2023)"
                        className="w-full px-2.5 py-1.5 text-xs bg-zinc-950 border border-zinc-700/70 rounded-xl text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
