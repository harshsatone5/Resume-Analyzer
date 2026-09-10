export interface DemoResume {
  id: string;
  name: string;
  role: string;
  expectedScore: number;
  description: string;
  targetRoleDefault: string;
  rawText: string;
}

export interface JobDescriptionPreset {
  id: string;
  title: string;
  category: string;
  text: string;
  requiredSkills: string[];
}

export const DEMO_RESUMES: DemoResume[] = [
  {
    id: 'alex-chen',
    name: 'Alex Chen',
    role: 'Junior Full Stack Developer',
    expectedScore: 64,
    description: 'Tech stack is decent, but lacks quantified metrics (XYZ formula), uses passive verbs, and missing cloud/DevOps keywords.',
    targetRoleDefault: 'fullstack',
    rawText: `Alex Chen
San Francisco, CA | alex.chen@example.com | (555) 234-5678 | linkedin.com/in/alexchen-dev | github.com/alexchen

SUMMARY
Passionate Full Stack Web Developer with 2+ years of experience building web applications. Looking for a challenging position in a fast-paced software company to utilize my skills in React, Node, and JavaScript.

SKILLS
Frontend: React, JavaScript, HTML5, CSS3, Redux, Tailwind CSS
Backend: Node.js, Express, MongoDB, REST APIs
Tools: Git, VS Code, Postman, npm

WORK EXPERIENCE
Junior Web Developer | PixelCraft Solutions
June 2023 - Present | San Francisco, CA
- Worked on developing customer-facing dashboards using React and Express.
- Helped the team fix front-end bugs and improved page load times.
- Assisted in building REST API endpoints for user authentication and profiles.
- Participated in daily standups and sprint planning meetings.
- Responsible for maintaining the company website and updating marketing content.

Web Developer Intern | Horizon Tech Labs
Jan 2023 - May 2023 | San Jose, CA
- Wrote unit tests for internal tools using Jest.
- Collaborated with senior engineers on database queries in MongoDB.
- Created reusable UI components for the design system library.

PROJECTS
DevBoard - Task Management App
- Built a Kanban board application using React, Tailwind CSS, and Node.js.
- Implemented drag-and-drop task movement and user authentication with JWT.
- Deployed the application to Netlify and Render.

CryptoWatch - Crypto Tracking Dashboard
- Created a cryptocurrency price tracking application using the CoinGecko API.
- Integrated interactive charts with Chart.js and state management with Redux.

EDUCATION
Bachelor of Science in Computer Science
San Jose State University, 2023
`
  },
  {
    id: 'sarah-jenkins',
    name: 'Sarah Jenkins',
    role: 'Senior Product Manager',
    expectedScore: 91,
    description: 'High ATS benchmark with strong quantified impact, business metrics, power verbs, and clear executive leadership structure.',
    targetRoleDefault: 'pm',
    rawText: `Sarah Jenkins
New York, NY | sarah.jenkins@example.com | (555) 987-6543 | linkedin.com/in/sarahjenkins-pm

SUMMARY
Data-driven Senior Product Manager with 7+ years of experience leading cross-functional teams to scale B2B SaaS and consumer tech products. Championed initiatives that grew ARR from $12M to $34M, improved user retention by 28%, and launched 4 zero-to-one enterprise features.

CORE COMPETENCIES
Product Strategy, Roadmapping, Agile/Scrum, User Research, OKRs, A/B Testing, Data Analytics, Go-To-Market (GTM), Jira, Mixpanel, SQL, Figma, Amplitude, Customer Journey Mapping

EXPERIENCE
Senior Product Manager | CloudScale Technologies
March 2021 - Present | New York, NY
- Spearheaded the end-to-end redesign of the enterprise onboarding flow, reducing customer time-to-value from 18 days to 4.2 days and increasing Day-30 retention by 34%.
- Orchestrated product discovery and roadmap execution for a 14-person engineering and design team, delivering 9 on-time quarterly releases with a 98% sprint completion rate.
- Launched an automated self-serve billing portal that generated $4.6M in incremental annual recurring revenue (ARR) in fiscal year 2023.
- Conducted 60+ in-depth user interviews and analyzed telemetry via Mixpanel to define product requirements documents (PRDs) for next-gen collaboration features.
- Established data-informed culture by implementing automated KPI dashboards in SQL and Amplitude, adopted by 120+ stakeholders company-wide.

Product Manager | FinEdge Solutions
August 2018 - February 2021 | Boston, MA
- Managed the flagship mobile payment app with 850,000+ monthly active users (MAU), improving App Store rating from 3.8 to 4.7 stars.
- Executed 45+ multi-variate A/B tests on checkout conversion funnels, generating a 21% uplift in checkout completions ($3.2M GMV increase).
- Partnered with compliance, engineering, and legal teams to implement SOC 2 and GDPR standards across all transaction workflows.

EDUCATION & CERTIFICATIONS
Master of Business Administration (MBA) - Columbia Business School, 2018
Bachelor of Science in Industrial Engineering - Cornell University, 2016
Certified Scrum Product Owner (CSPO) | Pragmatic Certified Product Leader (PMC-III)
`
  },
  {
    id: 'devon-vance',
    name: 'Devon Vance',
    role: 'Data Scientist & ML Engineer',
    expectedScore: 74,
    description: 'Deep technical stack (PyTorch, TensorFlow, Python), but lacks business ROI translation and missing deployment/MLOps context.',
    targetRoleDefault: 'aiml',
    rawText: `Devon Vance
Austin, TX | devon.vance@example.com | (555) 432-8765 | linkedin.com/in/devon-vance | github.com/dvance-ai

PROFESSIONAL SUMMARY
Data Scientist with 3 years of hands-on experience in machine learning, statistical modeling, and deep neural networks. Skilled in building predictive models and processing large datasets with Python, PyTorch, and SQL.

SKILLS
Programming: Python, SQL, R, Bash
Machine Learning: PyTorch, TensorFlow, Scikit-learn, XGBoost, Hugging Face, NLP, Computer Vision
Data Engineering: Pandas, NumPy, Spark, Airflow, PostgreSQL
Developer Tools: Docker, Git, Linux, Jupyter

EXPERIENCE
Machine Learning Engineer | Apex Analytics
July 2022 - Present | Austin, TX
- Developed churn prediction models using XGBoost and Random Forest algorithms on a dataset of 2M customer records.
- Built automated data preprocessing pipelines using Apache Airflow and PySpark, reducing pipeline processing latency by 35%.
- Fine-tuned transformer models (BERT) for customer sentiment classification, achieving an F1-score of 0.89.
- Researched and experimented with anomaly detection algorithms to identify fraudulent financial transactions.
- Collaborated with backend engineers to integrate model endpoints into production APIs using FastAPI.

Junior Data Analyst | DataWave Systems
June 2021 - June 2022 | Austin, TX
- Extracted and transformed data from relational databases using complex SQL queries and window functions.
- Designed interactive executive dashboards in Tableau to visualize monthly user acquisition and churn.
- Cleaned and normalized messy telemetry data across 5 internal database clusters.

PROJECTS
LLM-Document-Query: Retrieval-Augmented Generation (RAG) System
- Architected a question-answering pipeline using LangChain, ChromaDB, and open-source LLaMA models.
- Processed over 10,000 PDF financial reports with semantic chunking and cosine similarity search.

EDUCATION
Bachelor of Science in Statistics and Data Science
University of Texas at Austin, 2021
`
  }
];

export const JOB_DESCRIPTIONS: JobDescriptionPreset[] = [
  {
    id: 'fullstack',
    title: 'Senior Full Stack Engineer',
    category: 'Engineering',
    requiredSkills: [
      'React', 'TypeScript', 'Node.js', 'Next.js', 'PostgreSQL', 'Docker',
      'AWS', 'REST APIs', 'GraphQL', 'CI/CD', 'Microservices', 'Git',
      'System Architecture', 'Unit Testing', 'Tailwind CSS'
    ],
    text: `Role: Senior Full Stack Engineer
We are seeking an experienced Full Stack Engineer proficient in modern web technologies. You will design, develop, and scale high-throughput cloud applications and intuitive client experiences.

Key Responsibilities:
- Architect, build, and maintain scalable web applications using React, TypeScript, Node.js, and PostgreSQL.
- Lead system architecture decisions, CI/CD pipeline automation, and containerized deployments via Docker and AWS.
- Implement robust RESTful APIs and GraphQL endpoints with comprehensive unit and integration testing.
- Partner with product managers and designers to deliver clean, accessible, and high-performance UI components.
- Mentor junior engineers, conduct code reviews, and drive engineering best practices.

Requirements:
- 4+ years of professional full-stack development experience.
- Strong proficiency in React, TypeScript, Node.js, and relational databases.
- Hands-on experience with cloud infrastructure (AWS/GCP), Docker, and CI/CD pipelines.
- Proven track record of delivering high-impact, measurable software solutions.`
  },
  {
    id: 'aiml',
    title: 'AI / Machine Learning Engineer',
    category: 'Artificial Intelligence',
    requiredSkills: [
      'Python', 'PyTorch', 'TensorFlow', 'LLMs', 'RAG', 'LangChain',
      'Hugging Face', 'Transformers', 'MLOps', 'Docker', 'FastAPI',
      'Vector Databases', 'Fine-Tuning', 'SQL', 'AWS'
    ],
    text: `Role: AI / Machine Learning Engineer
Join our frontier AI team to develop, deploy, and optimize Large Language Model (LLM) workflows, Retrieval-Augmented Generation (RAG) pipelines, and production machine learning models.

Key Responsibilities:
- Build and fine-tune transformer models, NLP pipelines, and generative AI agents using PyTorch and Hugging Face.
- Develop enterprise RAG systems with vector databases (Chroma, Pinecone, Milvus) and LangChain/LlamaIndex.
- Package and deploy models as low-latency microservices with FastAPI, Docker, and Kubernetes.
- Implement MLOps pipelines for automated model evaluation, tracking, and continuous retraining.
- Measure business ROI, inference cost optimization, and model latency benchmarks.

Requirements:
- 3+ years experience in applied machine learning or data science.
- Deep expertise in Python, PyTorch/TensorFlow, and state-of-the-art Generative AI techniques.
- Proven experience deploying models into production environments with quantifiable impact.`
  },
  {
    id: 'pm',
    title: 'Senior Product Manager',
    category: 'Product & Design',
    requiredSkills: [
      'Product Strategy', 'Roadmapping', 'Agile', 'A/B Testing', 'User Research',
      'OKRs', 'Data Analytics', 'Mixpanel', 'SQL', 'Figma', 'PRDs',
      'Go-To-Market', 'Cross-Functional Leadership', 'Sprint Planning'
    ],
    text: `Role: Senior Product Manager
We are looking for a customer-obsessed, metrics-driven Senior Product Manager to own product strategy, roadmap execution, and revenue growth for our enterprise platform.

Key Responsibilities:
- Define product vision, 12-month roadmaps, and quantifiable quarterly OKRs aligned with business strategy.
- Lead discovery through user interviews, customer feedback loops, and quantitative behavioral analytics (Mixpanel/Amplitude/SQL).
- Collaborate closely with engineering, UX design, sales, and marketing to bring features from zero-to-one and scale.
- Run continuous A/B testing and experimentation to optimize activation funnels, retention, and customer lifetime value.

Requirements:
- 5+ years of product management experience in B2B SaaS or consumer software.
- Demonstrated success driving measurable revenue growth and customer retention.
- Strong analytical chops (SQL, data visualization) and excellent written PRDs.`
  },
  {
    id: 'devops',
    title: 'DevOps & Cloud Platform Engineer',
    category: 'Infrastructure',
    requiredSkills: [
      'Kubernetes', 'Docker', 'Terraform', 'AWS', 'CI/CD', 'GitHub Actions',
      'Linux', 'Prometheus', 'Grafana', 'Helm', 'Bash', 'Security', 'Python'
    ],
    text: `Role: DevOps & Cloud Platform Engineer
Help us build rock-solid, secure, and auto-scaling cloud infrastructure across multi-region environments.

Key Responsibilities:
- Manage and scale Kubernetes clusters, Helm charts, and service meshes in AWS.
- Codify infrastructure with Terraform and automate end-to-end CI/CD pipelines with GitHub Actions.
- Implement comprehensive monitoring, alerting, and observability using Prometheus, Grafana, and Datadog.
- Ensure compliance, zero-trust security postures, and disaster recovery architectures.

Requirements:
- 3+ years of specialized DevOps, SRE, or Cloud Infrastructure experience.
- Deep expertise in Kubernetes, Docker, Terraform, and AWS.`
  },
  {
    id: 'data',
    title: 'Senior Data Analyst / BI Specialist',
    category: 'Data & Analytics',
    requiredSkills: [
      'SQL', 'Python', 'Tableau', 'Power BI', 'ETL', 'Data Warehousing',
      'Snowflake', 'Statistical Modeling', 'Excel', 'Data Storytelling'
    ],
    text: `Role: Senior Data Analyst & BI Specialist
Transform complex operational data into actionable strategic insights, executive dashboards, and forecasting models.

Key Responsibilities:
- Write optimized SQL queries, transformations, and ETL pipelines in Snowflake.
- Build interactive business intelligence dashboards in Tableau or Power BI.
- Partner with executive leadership to forecast revenue, customer churn, and marketing ROI.`
  }
];
