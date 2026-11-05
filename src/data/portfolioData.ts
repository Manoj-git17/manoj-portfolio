export interface SkillItem {
  name: string;
  level?: string;
  note?: string;
  practicalApplication?: string;
}

export interface SkillCategory {
  title: string;
  category: string;
  description: string;
  items: SkillItem[];
}

export interface Project {
  id: string;
  title: string;
  shortTitle: string;
  tagline: string;
  category: string;
  badge: string;
  description: string;
  problemSolved: string;
  keyContribution: string;
  verifiedResults: string;
  architecture: string[];
  metrics: string[];
  technologies: string[];
  githubUrl: string;
  liveDemoUrl?: string;
  videoPreviewPath: string;
  diagramSteps: string[];
  status: 'Completed' | 'In Progress' | 'Active Exploration';
  highlights: string[];
}

export interface CourseworkCategory {
  category: string;
  description: string;
  courses: string[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: 'MANOJ P.S.',
    wordmark: 'MANOJ P.S.',
    role: 'AI & Data Science Engineer | Aspiring AI/ML Engineer',
    academicDegree: 'B.Tech — Artificial Intelligence & Data Science',
    currentAcademicStatus: '3rd Semester',
    expectedGraduation: '2029',
    timeline: '2025 – 2029',
    bioHeadline: 'Building intelligent applications and data-driven solutions using Python, machine learning, and modern software engineering.',
    bioSubtitle:
      'Building intelligent applications and data-driven solutions using Python, machine learning, and modern software engineering.',
    description:
      'Building intelligent applications and data-driven solutions using Python, machine learning, and modern software engineering.',
    email: 'manojps60281@gmail.com',
    github: 'https://github.com/Manoj-git17',
    linkedin: 'https://linkedin.com/in/manoj-aids',
    location: 'Bengaluru, India',
    targetRole: 'AI/ML, Data Science & Software Engineering Intern',
    interestedRoles: 'AI/ML Intern | Data Science Intern | Python Developer Intern | Data Engineering Intern',
    workPreferences: 'Remote | Hybrid | On-site',
    internshipAvailability: 'Open to AI/ML, Data Science, and Software Engineering Internships',
    isOpenToWork: true,
    codingProfiles: {
      leetcode: '',
      hackerrank: '',
    },
  },

  // 6 Clean Recruiter-Targeted Skill Categories
  skillCategories: [
    {
      title: 'Programming',
      category: 'Programming',
      description: 'Core languages for algorithms, data structures, and production applications.',
      items: [
        { name: 'Python' },
        { name: 'C++' },
        { name: 'JavaScript' },
        { name: 'TypeScript' },
        { name: 'SQL' },
      ],
    },
    {
      title: 'AI & Data Science',
      category: 'AI & Data Science',
      description: 'Machine learning workflows, exploratory data analysis, and model evaluation.',
      items: [
        { name: 'Machine Learning' },
        { name: 'Pandas' },
        { name: 'NumPy' },
        { name: 'Data Analysis' },
        { name: 'Feature Engineering' },
        { name: 'Model Evaluation' },
      ],
    },
    {
      title: 'Data Engineering',
      category: 'Data Engineering',
      description: 'Data ingestion, schema modeling, transformation, and automated warehousing.',
      items: [
        { name: 'ETL Pipelines' },
        { name: 'Data Cleaning' },
        { name: 'Data Warehousing' },
        { name: 'Data Modeling' },
      ],
    },
    {
      title: 'Backend',
      category: 'Backend',
      description: 'Service architectures, RESTful APIs, and asynchronous execution.',
      items: [
        { name: 'FastAPI' },
        { name: 'Flask' },
        { name: 'Node.js' },
        { name: 'REST APIs' },
      ],
    },
    {
      title: 'Databases',
      category: 'Databases',
      description: 'Relational data modeling, schema normalization, and ACID compliance.',
      items: [
        { name: 'PostgreSQL' },
        { name: 'SQLite' },
      ],
    },
    {
      title: 'Tools',
      category: 'Tools',
      description: 'Developer environments, version control, and collaboration workflows.',
      items: [
        { name: 'Git' },
        { name: 'GitHub' },
        { name: 'VS Code' },
      ],
    },
  ] as SkillCategory[],

  // 5 Prioritized Projects with Consistent, Concise Formatting
  projects: [
    {
      id: 'datapulse',
      title: 'DataPulse — AI-Powered Business Analytics Platform',
      shortTitle: 'DataPulse',
      tagline: 'Full-stack analytics platform that automates sales ETL processing, warehouses data in a star schema, and delivers interactive analytics with an AI query assistant.',
      category: 'Data Engineering',
      badge: 'FULL-STACK // DATA & AI',
      description:
        'Full-stack analytics platform that automates sales ETL processing, warehouses data in a star schema, and delivers interactive analytics with an AI query assistant.',
      problemSolved:
        'Replaces fragmented spreadsheets and error-prone manual calculations with an automated ETL pipeline, structured warehouse, and real-time analytical dashboards.',
      keyContribution:
        'Engineered an automated Python validation and quarantine pipeline, modeled a 3NF star-schema warehouse with SQLAlchemy, and exposed KPI endpoints via async FastAPI to a React 19 dashboard.',
      verifiedResults:
        '38/38 automated Pytest test suite covering ETL validation, schema integrity, and API endpoints.',
      architecture: [
        'Automated Python and Pandas ETL pipeline with quarantine logic for corrupted rows',
        'Relational star-schema data warehouse modeled with SQLAlchemy and PostgreSQL',
        'Asynchronous FastAPI REST API service delivering sub-second KPI queries',
        'Interactive React 19 client with real-time charts and natural language query assistance',
      ],
      diagramSteps: ['Raw Sales CSV', 'FastAPI / Pandas ETL', 'Star Schema Warehouse', 'React 19 + AI Dashboard'],
      metrics: ['38/38 Tests Passed (100%)', 'Star Schema Warehouse', 'Sub-second API Latency'],
      technologies: ['Python', 'FastAPI', 'React 19', 'PostgreSQL', 'SQLAlchemy', 'Pandas', 'Vite'],
      githubUrl: 'https://github.com/Manoj-git17/DataPulse',
      liveDemoUrl: 'https://data-pulse-phi-six.vercel.app',
      videoPreviewPath: '/videos/datapulse-demo.mp4',
      status: 'Completed',
      highlights: [
        'Automated ETL with systematic quarantining of corrupted rows',
        'Star-schema warehouse optimizing analytical aggregation',
        'Interactive analytics dashboard with natural language query support',
      ],
    },
    {
      id: 'taskflow',
      title: 'TaskFlow — AI-Powered Task Management',
      shortTitle: 'TaskFlow',
      tagline: 'AI-driven task management application using Google Gemini to break down complex goals into actionable daily schedules with productivity tracking.',
      category: 'Applied AI & SaaS',
      badge: 'AI SAAS // GEMINI 1.5',
      description:
        'AI-driven task management application using Google Gemini to break down complex goals into actionable daily schedules with productivity tracking.',
      problemSolved:
        'Eliminates task paralysis and manual planning overhead by automating schedule synthesis and goal decomposition through structured LLM prompt workflows.',
      keyContribution:
        'Integrated Google Gemini API with structured prompt templates for deterministic schedule generation, built Express.js auth & CRUD services, and integrated SQLite persistence.',
      verifiedResults:
        '100% Deployed & live on Render cloud with verified JWT session auth and sub-second task synthesis.',
      architecture: [
        'Modular React.js & Vite client with responsive task boards and JWT state storage',
        'Node.js & Express.js REST API with authenticated endpoints and input validation',
        'Google Gemini 1.5 prompt pipeline for goal decomposition and priority matrices',
        'Relational SQLite database storing tasks, completion timestamps, and user profiles',
      ],
      diagramSteps: ['React.js + Vite Client', 'Express & JWT Auth', 'Google Gemini 1.5 Engine', 'SQLite Store'],
      metrics: ['100% Deployed & Live on Render', 'JWT Authentication Lifecycle', 'Sub-second Task Breakdown Engine'],
      technologies: ['React.js', 'Vite', 'Node.js', 'Express.js', 'SQLite', 'Google Gemini API', 'JWT'],
      githubUrl: 'https://github.com/Manoj-git17/ai-task-manager',
      liveDemoUrl: 'https://ai-task-manager-frontend-x3og.onrender.com',
      videoPreviewPath: '/projects/taskflow.png',
      status: 'Completed',
      highlights: [
        'Gemini-powered daily schedule generation and task prioritization',
        'Decomposes multi-hour goals into manageable sub-tasks',
        'Secure token authentication with persistent SQLite storage',
      ],
    },
    {
      id: 'ml-classification-benchmarks',
      title: 'Machine Learning Classification Project',
      shortTitle: 'ML Classification Benchmarks',
      tagline: 'Comparative machine learning classification testbed evaluating baseline algorithms with rigorous cross-validation.',
      category: 'Machine Learning',
      badge: 'APPLIED ML // BENCHMARK',
      description:
        'Comparative machine learning classification testbed evaluating baseline algorithms with rigorous cross-validation.',
      problemSolved:
        'Addresses unstandardized evaluation and data leakage in baseline model comparisons by enforcing strict split isolation and stratified benchmarking.',
      keyContribution:
        'Built stratified 5-fold cross-validation runners, isolated feature scaling to guarantee zero leakage, and generated detailed ROC-AUC curves and confusion matrices.',
      verifiedResults:
        'Empirically evaluated precision-recall trade-offs and inference timing benchmarks across baseline classifiers with zero data leakage.',
      architecture: [
        'RobustScaler and StandardScaler feature transformation pipelines',
        'Stratified K-Fold cross-validation execution harness',
        'Precision-recall, ROC-AUC, and confusion matrix evaluation modules',
        'Model interpretability rankings and transparent evaluation logs',
      ],
      diagramSteps: ['Raw Tabular Data', 'Standard / Robust Scaler', 'Stratified 5-Fold Cross-Val', 'ROC-AUC & Precision Metrics'],
      metrics: ['Stratified 5-Fold Validation', 'Zero Leakage Isolation', 'Sub-millisecond Inference'],
      technologies: ['Python', 'Scikit-Learn', 'Pandas', 'NumPy', 'Matplotlib'],
      githubUrl: 'https://github.com/manoj-dev-ai/ml-classifier-lab',
      liveDemoUrl: 'https://github.com/manoj-dev-ai/ml-classifier-lab#readme',
      videoPreviewPath: '/videos/mllab-demo.mp4',
      status: 'Completed',
      highlights: [
        'Strict isolation between training and evaluation splits',
        'Transparent metric comparisons across classification baselines',
        'Sub-millisecond per-sample inference latency benchmarked',
      ],
    },
    {
      id: 'data-analytics-engine',
      title: 'Automated Data Pipeline',
      shortTitle: 'Automated Data Pipeline',
      tagline: 'Modular Python data engineering pipeline for automated ingestion, schema validation, outlier detection, and statistical summary reporting.',
      category: 'Data Engineering',
      badge: 'DATA SYSTEMS // ETL',
      description:
        'Modular Python data engineering pipeline for automated ingestion, schema validation, outlier detection, and statistical summary reporting.',
      problemSolved:
        'Eliminates manual boilerplate during exploratory data analysis through automated distribution profiling, type sanitization, and outlier detection.',
      keyContribution:
        'Constructed chunk-based tabular stream parsers, integrated IQR and Z-score outlier isolation algorithms, and produced automated HTML/Markdown summary reports.',
      verifiedResults:
        'Deterministic preprocessing with isolated transformation states and automated HTML/Markdown profiling dossiers.',
      architecture: [
        'Streaming chunk parser supporting heterogeneous CSV and JSON files',
        'Configurable schema validator enforcing strict type assertions',
        'IQR and Z-score statistical outlier detection algorithms',
        'Automated report generator outputting structured markdown dossiers',
      ],
      diagramSteps: ['Streaming CSV / JSON', 'Type Validation Engine', 'IQR / Z-Score Outlier Filter', 'Markdown / HTML Dossier'],
      metrics: ['Chunk-based Memory Efficiency', 'Deterministic Assertions', 'Automated Dossier Generation'],
      technologies: ['Python', 'Pandas', 'NumPy', 'SQL'],
      githubUrl: 'https://github.com/manoj-dev-ai/data-pipeline-insights',
      liveDemoUrl: 'https://github.com/manoj-dev-ai/data-pipeline-insights#readme',
      videoPreviewPath: '/videos/pipeline-demo.mp4',
      status: 'Completed',
      highlights: [
        'Chunk-based ingestion prevents memory bloat on large datasets',
        'Deterministic assertions ensure reproducible transformation states',
        'Automated generation of profiling dossiers and outlier flags',
      ],
    },
    {
      id: 'algo-structures-lab',
      title: 'Algorithmic Systems in C++',
      shortTitle: 'Algorithmic Systems in C++',
      tagline: 'High-performance C++ implementation of fundamental data structures, graph traversals, and computational complexity benchmarks.',
      category: 'Systems & Algorithms',
      badge: 'SYSTEMS // C++17',
      description:
        'High-performance C++ implementation of fundamental data structures, graph traversals, and computational complexity benchmarks.',
      problemSolved:
        'Solidifies deep mechanical sympathy for computer memory hierarchy, pointer safety, cache locality, and asymptotic algorithm efficiency.',
      keyContribution:
        'Developed generic template-based graph structures (BFS, DFS, Dijkstra), verified memory integrity with Valgrind (zero leaks), and benchmarked CPU cycle performance.',
      verifiedResults:
        'Valgrind-verified zero memory leaks and cache-friendly memory locality across extensive test suites.',
      architecture: [
        'Modern C++17 template-based header implementations',
        'Graph representations supporting shortest-path algorithms',
        'Automated unit test suite validating edge cases and pointer boundaries',
        'Valgrind memory auditing harness ensuring leak-free allocation',
      ],
      diagramSteps: ['C++17 Template Classes', 'Graph Data Structures', 'BFS / DFS / Dijkstra Traversals', 'Valgrind Leak Audit (0 Leaks)'],
      metrics: ['Zero Memory Leaks (Valgrind)', 'O(V + E) Traversals', 'Modern C++17 Standard'],
      technologies: ['C++', 'STL', 'CMake', 'Valgrind'],
      githubUrl: 'https://github.com/manoj-dev-ai/algorithmic-systems',
      liveDemoUrl: 'https://github.com/manoj-dev-ai/algorithmic-systems#readme',
      videoPreviewPath: '/videos/pipeline-demo.mp4',
      status: 'Completed',
      highlights: [
        'Verified zero memory leaks using Valgrind analysis',
        'Clean separation of concerns with modern C++17 idioms',
        'Empirical validation against theoretical Big-O curves',
      ],
    },
  ] as Project[],

  // Academic Milestones & Verified Recognition
  achievements: [
    {
      title: 'DataPulse Pytest Test Suite Integrity',
      category: 'Software Engineering',
      metric: '38/38 Tests (100%)',
      description: 'Comprehensive automated test coverage for ETL data validation, schema integrity assertions, and asynchronous FastAPI REST endpoints in continuous integration.',
      date: '2026',
    },
    {
      title: 'TaskFlow Production Cloud Deployment',
      category: 'Applied AI & Cloud',
      metric: 'Render SaaS Deployed',
      description: 'Production full-stack SaaS with Google Gemini 1.5 API prompt pipelines, secure JWT token lifecycle, and persistent relational SQLite database.',
      date: '2026',
    },
    {
      title: 'Deterministic Pipeline Transformation & Zero Leakage Validation',
      category: 'Data Science & ML',
      metric: 'Verified Isolation',
      description: 'Engineered preprocessing pipelines with isolated evaluation splits ensuring zero data leakage, verified across Stratified K-Fold cross-validation runs.',
      date: '2026',
    },
    {
      title: 'Valgrind Memory Audit Verification',
      category: 'Systems & Algorithms',
      metric: '0 Memory Leaks',
      description: 'Engineered modern C++17 data structures and graph algorithms verified with Valgrind dynamic analysis for leak-free memory safety and cache locality.',
      date: '2025 – 2026',
    },
  ],

  education: {
    degree: 'B.Tech — Artificial Intelligence & Data Science',
    status: 'Undergraduate Engineering Student (3rd Semester)',
    currentStatus: '3rd Semester',
    expectedGraduation: '2029',
    timeline: '2025 – 2029',
    keyFocus: 'Data Structures, Algorithms, Mathematics, Database Systems, Machine Learning Foundations',
    overview:
      'Pursuing a rigorous undergraduate engineering curriculum combining computer science foundations, discrete mathematics, statistical modeling, and modern computational data architectures.',
    coursework: [
      {
        category: 'Foundational Computing',
        description: 'Core principles of software systems, low-level execution, and efficient algorithmic logic.',
        courses: ['Data Structures & Algorithms', 'Object-Oriented Programming in C++', 'Computer Architecture', 'Operating System Concepts'],
      },
      {
        category: 'Mathematics & Analytics',
        description: 'Mathematical intuition required for machine learning and probabilistic reasoning.',
        courses: ['Linear Algebra & Matrices', 'Calculus & Optimization', 'Probability & Statistics', 'Discrete Mathematics'],
      },
      {
        category: 'Data & Intelligence',
        description: 'Database design, computational pipelines, and modern intelligent model architectures.',
        courses: ['Database Management Systems', 'Foundations of Machine Learning', 'Data Analysis & Exploration', 'Algorithm Design'],
      },
    ] as CourseworkCategory[],
    approach: [
      'Focusing on mathematical rigor alongside practical programming implementation.',
      'Maintaining reproducible Git version control for all lab work and projects.',
      'Active peer collaboration and open-source exploratory development.',
    ],
  },
};

export const TOTAL_PROJECTS_COUNT = PORTFOLIO_DATA.projects.length;
export const FLAGSHIP_PROJECTS_COUNT = 5;
