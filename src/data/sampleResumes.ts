import type { ResumeData } from '../types/resume';

export const sampleResume: ResumeData = {
  personalInfo: {
    fullName: 'Alex Vance',
    headline: 'Senior Full-Stack & Cloud Systems Architect',
    email: 'alex.vance@example.com',
    phone: '+1 (415) 890-2341',
    location: 'San Francisco, CA (Open to Remote)',
    website: 'https://alexvance.dev',
    linkedin: 'linkedin.com/in/alexvance',
    github: 'github.com/alexvance',
    summary:
      'High-impact software engineer and distributed systems architect with 7+ years of experience building mission-critical web applications, microservices, and AI-powered data pipelines. Proven track record reducing cloud infrastructure costs by 38% while scaling APIs to 45,000+ RPS with 99.99% uptime.'
  },
  experience: [
    {
      id: 'exp-1',
      company: 'Apex Cloud Solutions',
      position: 'Staff Software Engineer & Tech Lead',
      location: 'San Francisco, CA',
      startDate: '2022-03',
      endDate: 'Present',
      current: true,
      bullets: [
        'Architected and led the migration of a monolithic Rails application to an event-driven Go and React micro-frontend architecture, cutting p99 latency from 420ms to 48ms.',
        'Spearheaded a distributed caching layer utilizing Redis and Apache Kafka, handling 2.5B+ requests/month with 99.99% SLA adherence.',
        'Mentored 11 junior and mid-level engineers, introduced CI/CD trunk-based best practices, and accelerated sprint deployment cadence by 3.5x.'
      ]
    },
    {
      id: 'exp-2',
      company: 'DataPulse Technologies',
      position: 'Senior Backend Engineer',
      location: 'San Jose, CA',
      startDate: '2019-06',
      endDate: '2022-02',
      current: false,
      bullets: [
        'Engineered high-throughput streaming data ingestion pipelines in Python, PostgreSQL, and AWS Lambda processing over 45TB of financial analytics daily.',
        'Implemented rigorous automated testing and static analysis suites, reducing production incident reports by 62% over 18 months.',
        'Partnered with product managers and enterprise clients to define and deliver custom multi-tenant compliance protocols (SOC 2 & GDPR).'
      ]
    },
    {
      id: 'exp-3',
      company: 'HyperScale Labs',
      position: 'Full Stack Software Engineer',
      location: 'Palo Alto, CA',
      startDate: '2017-08',
      endDate: '2019-05',
      current: false,
      bullets: [
        'Built modern, accessible user interfaces using TypeScript, React, and Tailwind CSS for an analytics dashboard serving 120,000 active DAUs.',
        'Optimized bundle size and asset caching, improving Google Lighthouse web vitals score from 64 to 98.'
      ]
    }
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'University of California, Berkeley',
      degree: 'B.S. in Computer Science',
      fieldOfStudy: 'Distributed Systems & Machine Learning',
      location: 'Berkeley, CA',
      startDate: '2013',
      endDate: '2017',
      gpa: '3.86 / 4.0',
      honors: 'Dean’s Honor List, Magna Cum Laude'
    }
  ],
  skills: [
    'TypeScript',
    'React',
    'Node.js',
    'Go (Golang)',
    'Python',
    'Next.js',
    'GraphQL',
    'PostgreSQL',
    'Redis',
    'Docker',
    'Kubernetes',
    'AWS (ECS, Lambda, S3)',
    'Apache Kafka',
    'Microservices',
    'CI/CD Pipelines',
    'Tailwind CSS',
    'System Architecture',
    'REST APIs'
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'KubeSentinel — Autonomous Cluster Cost Optimizer',
      subtitle: 'Open Source Infrastructure Tool',
      link: 'github.com/alexvance/kubesentinel',
      technologies: ['Go', 'Kubernetes Operator SDK', 'Prometheus', 'Grafana'],
      bullets: [
        'Created a lightweight Kubernetes daemon that intelligently bins idle pods and scales nodes, reducing dev cluster cloud bills by 34%.',
        'Gained 2,400+ GitHub stars and adopted by 15+ engineering organizations.'
      ]
    },
    {
      id: 'proj-2',
      title: 'FluxDB — In-Memory Key-Value Time Series Engine',
      subtitle: 'High Performance Database Engine',
      link: 'github.com/alexvance/fluxdb',
      technologies: ['Rust', 'WebAssembly', 'C++'],
      bullets: [
        'Implemented an LSM-tree based persistent storage engine with SIMD-vectorized querying, supporting 1.2M writes/second.'
      ]
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect – Professional',
      issuer: 'Amazon Web Services',
      date: '2023',
      url: 'aws.amazon.com'
    },
    {
      id: 'cert-2',
      name: 'Certified Kubernetes Administrator (CKA)',
      issuer: 'Linux Foundation / CNCF',
      date: '2022',
      url: 'cncf.io'
    }
  ]
};

export const emptyResume: ResumeData = {
  personalInfo: {
    fullName: '',
    headline: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    summary: ''
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: []
};
