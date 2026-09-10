export type RewriteTone = 'datadriven' | 'executive' | 'concise' | 'creative';

export async function rewriteBulletPointAI(
  originalBullet: string,
  tone: RewriteTone = 'datadriven',
  apiKey?: string
): Promise<string> {
  const activeKey = apiKey || localStorage.getItem('RESUMATE_GEMINI_KEY') || '';

  if (activeKey.trim()) {
    try {
      const toneInstructions = {
        datadriven: 'Focus heavily on quantified metrics, %, $, efficiency gains, and the Google XYZ formula.',
        executive: 'Adopt authoritative leadership tone: strategic alignment, cross-functional orchestration, business impact.',
        concise: 'Keep it ultra-concise, high density, ATS keyword rich, under 18 words.',
        creative: 'Dynamic, persuasive narrative that highlights innovation, problem solving, and initiative.'
      };

      const prompt = `You are a world-class executive resume writer. 
Rewrite this resume bullet point in high-impact ATS style. 
Tone instruction: ${toneInstructions[tone]}

Original bullet point: "${originalBullet}"

Respond with ONLY the single rewritten bullet point starting with a strong past-tense action verb. No explanations, no quotes, no markdown prefixes.`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${activeKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      if (response.ok) {
        const data = await response.json();
        const generated = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        if (generated) return generated.replace(/^[-•*]\s*/, '');
      }
    } catch (e) {
      console.warn('Gemini API call failed, falling back to smart template engine', e);
    }
  }

  // Fallback heuristic smart generator if no API key or offline
  const cleaned = originalBullet.replace(/^[-•*0-9.]+\s*/, '').trim();
  
  if (tone === 'datadriven') {
    return `Spearheaded ${cleaned.toLowerCase().replace(/^(worked on|helped with|assisted in)\s*/i, '')}, elevating throughput by 32% and reducing operational friction across cross-functional workflows.`;
  } else if (tone === 'executive') {
    return `Orchestrated strategic initiative to ${cleaned.toLowerCase().replace(/^(worked on|helped with|assisted in)\s*/i, '')}, aligning technical delivery with core business OKRs and scaling stakeholder adoption.`;
  } else if (tone === 'concise') {
    return `Architected and deployed ${cleaned.toLowerCase().replace(/^(worked on|helped with|assisted in)\s*/i, '')}, accelerating delivery velocity and eliminating technical debt.`;
  } else {
    return `Pioneered innovative solution for ${cleaned.toLowerCase().replace(/^(worked on|helped with|assisted in)\s*/i, '')}, unlocking measurable team performance and customer satisfaction.`;
  }
}

export async function generateCustomCoachingAI(
  resumeText: string,
  targetRole: string,
  apiKey?: string
): Promise<string> {
  const activeKey = apiKey || localStorage.getItem('RESUMATE_GEMINI_KEY') || '';

  if (activeKey.trim()) {
    try {
      const prompt = `You are a veteran Silicon Valley tech recruiter.
Analyze this resume for the role "${targetRole}".
Provide 3 concise, candid "Secret Recruiter Insights" that would make this candidate stand out in a 6-second scan.
Resume snippet:
${resumeText.slice(0, 1500)}

Format as 3 distinct numbered bullet points.`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${activeKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      if (response.ok) {
        const data = await response.json();
        return data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
      }
    } catch (e) {
      console.warn('Gemini API custom coaching call failed', e);
    }
  }

  return `1. Front-load your accomplishments: Hiring managers spend 6.8 seconds on initial scans—ensure your top 3 bullet points feature bold quantifiable outcomes.
2. Mirror role-specific terminology: Embed modern industry tokens like CI/CD, cloud architecture, or A/B experimentation directly into your project descriptions.
3. Quantify scale: Specify team size, daily active users, or database throughput to instantly communicate senior technical depth.`;
}
