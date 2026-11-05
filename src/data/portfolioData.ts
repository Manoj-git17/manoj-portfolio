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
  whatIBuilt: string;
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
    role: 'AI & Data Science Undergraduate | Aspiring AI Engineer & Data Scientist',
    academicDegree: 'B.Tech — Artificial Intelligence & Data Science',
    currentAcademicStatus: '3rd Semester Undergraduate',
    expectedGraduation: '2029',
    timeline: '2025 – 2029',
    bioHeadline: 'Undergraduate student in Artificial Intelligence & Data Science with hands-on focus in Machine Learning, Data Science, and Data Engineering.',
    bioSubtitle:
      'Building intelligent applications, scalable ETL pipelines, and data-driven systems using Python and modern engineering practices.',
    description:
      'AI & Data Science undergraduate and aspiring AI engineer. Passionate about machine learning systems, data engineering pipelines, and building reliable software applications.',
    email: 'manojps60281@gmail.com',
    github: 'https://github.com/Manoj-git17',
    linkedin: 'https://linkedin.com/in/manoj-aids',
    location: 'Bengaluru, India',
    targetRole: 'AI/ML, Data Science & Software Engineering Intern',
    interestedRoles: 'AI/ML Intern | Data Science Intern | Data Engineering Intern | Software Engineering Intern',
    workPreferences: 'Remote | Hybrid | On-site',
    internshipAvailability: 'Currently open to AI/ML, Data Science, and Software Engineering internships.',
    isOpenToWork: true,
    codingProfiles: {
      leetcode: '',
      hackerrank: '',
    },
  },

  // 7 Clean Recruiter-Targeted Skill Categories
  skillCategories: [
    {
      title: 'Programming Languages',
      category: 'Programming Languages',
      description: 'Core languages for algorithms, data structures, and production applications.',
      items: [
        { name: 'Python' },
        { name: 'C++' },
        { name: 'SQL' },
        { name: 'JavaScript' },
        { name: 'TypeScript' },
      ],
    },
    {
      title: 'AI & Machine Learning',
      category: 'AI & Machine Learning',
      description: 'Applied machine learning models, cross-validation, and LLM prompt engineering.',
      items: [
        { name: 'Machine Learning' },
        { name: 'Scikit-Learn' },
        { name: 'Feature Engineering' },
        { name: 'Model Evaluation' },
        { name: 'Gemini API' },
      ],
    },
    {
      title: 'Data Science & Analytics',
      category: 'Data Science & Analytics',
      description: 'Statistical distribution analysis, data transformation, and visualization.',
      items: [
        { name: 'Exploratory Data Analysis' },
        { name: 'Pandas' },
        { name: 'NumPy' },
        { name: 'Data Cleaning' },
        { name: 'Statistical Analysis' },
      ],
    },
    {
      title: 'Data Engineering',
      category: 'Data Engineering',
      description: 'Data ingestion, schema modeling, transformation, and automated warehousing.',
      items: [
        { name: 'ETL Pipelines' },
        { name: 'Star Schema Modeling' },
        { name: 'Data Ingestion' },
        { name: 'Data Warehousing Concepts' },
      ],
    },
    {
      title: 'Backend Development',
      category: 'Backend Development',
      description: 'RESTful API design, asynchronous services, and server architecture.',
      items: [
        { name: 'FastAPI' },
        { name: 'Flask' },
        { name: 'Node.js' },
        { name: 'Express' },
        { name: 'REST APIs' },
      ],
    },
    {
      title: 'Databases',
      category: 'Databases',
      description: 'Relational data modeling, schema normalization, and ORM abstractions.',
      items: [
        { name: 'PostgreSQL' },
        { name: 'SQLite' },
        { name: 'SQLAlchemy' },
      ],
    },
    {
      title: 'Developer Tools',
      category: 'Developer Tools',
      description: 'Version control, developer environments, and deployment workflows.',
      items: [
        { name: 'Git' },
        { name: 'GitHub' },
        { name: 'VS Code' },
        { name: 'Linux CLI' },
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
      category: 'Data Engineering & AI',
      badge: 'FULL-STACK // DATA & AI',
      description:
        'Full-stack analytics platform that automates sales ETL processing, warehouses data in a star schema, and delivers interactive analytics with an AI query assistant.',
      problemSolved:
        'Replaces fragmented spreadsheets and manual calculations with an automated ETL pipeline, structured warehouse, and real-time analytical dashboards.',
      whatIBuilt:
        'Engineered an end-to-end data analytics system with automated Python ingestion, a 3NF star-schema PostgreSQL warehouse using SQLAlchemy, asynchronous FastAPI endpoints, and an interactive React 19 dashboard.',
      keyContribution:
        'Engineered an automated data cleaning and quarantine pipeline for invalid records, designed fact/dimension star schema tables, and built REST API query endpoints.',
      verifiedResults:
        '38/38 automated Pytests passed covering ETL transformations, database schema integrity, and API endpoint contracts.',
      architecture: [
        'Automated Python/Pandas ETL pipeline with quarantine logic for corrupted records',
        'Relational star-schema data warehouse modeled with SQLAlchemy and PostgreSQL',
        'Asynchronous FastAPI REST API service delivering structured KPI query responses',
        'Interactive React 19 client with analytical charts and AI query assistance',
      ],
      diagramSteps: ['Raw Sales CSV', 'FastAPI / Pandas ETL', 'Star Schema Warehouse', 'React 19 Dashboard'],
      metrics: ['38/38 Pytests Passed', 'Star Schema Warehouse', 'FastAPI Concurrency'],
      technologies: ['Python', 'FastAPI', 'React 19', 'PostgreSQL', 'SQLAlchemy', 'Pandas', 'TypeScript', 'Tailwind CSS'],
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
      badge: 'AI SAAS // GEMINI',
      description:
        'AI-driven task management application using Google Gemini to break down complex goals into actionable daily schedules with productivity tracking.',
      problemSolved:
        'Reduces manual scheduling overhead by converting broad goals into structured daily tasks with automated priority decomposition.',
      whatIBuilt:
        'Built a full-stack SaaS task application with a React.js client, an Express.js backend, SQLite database persistence, and Google Gemini 1.5 prompt automation.',
      keyContribution:
        'Constructed structured prompt workflows for deterministic task breakdown, implemented JWT authentication for user sessions, and built RESTful CRUD endpoints.',
      verifiedResults:
        'Deployed live on Render cloud platform with persistent SQLite database state and authenticated user workflows.',
      architecture: [
        'Modular React.js & Vite client with responsive task boards and JWT state storage',
        'Node.js & Express.js REST API with authenticated endpoints and input validation',
        'Google Gemini prompt pipeline for goal decomposition and priority matrices',
        'Relational SQLite database storing tasks, completion timestamps, and user profiles',
      ],
      diagramSteps: ['React Client', 'Express & JWT Auth', 'Google Gemini Engine', 'SQLite Store'],
      metrics: ['Deployed on Render', 'JWT Auth Sessions', 'Gemini Goal Decomposition'],
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
      id: 'ml-classification-workbench',
      title: 'Machine Learning Classification Project',
      shortTitle: 'ML Classification',
      tagline: 'Comparative machine learning classification testbed evaluating baseline algorithms with rigorous cross-validation.',
      category: 'Machine Learning',
      badge: 'APPLIED ML // BENCHMARK',
      description:
        'Comparative machine learning classification testbed evaluating baseline algorithms with rigorous cross-validation.',
      problemSolved:
        'Evaluates baseline classification models against standardized tabular datasets to compare predictive metrics with clean train/test isolation.',
      whatIBuilt:
        'Engineered a Python evaluation workbench implementing logistic regression, decision trees, and k-NN with stratified 5-fold cross-validation.',
      keyContribution:
        'Enforced strict isolation during feature scaling using Scikit-Learn transformers fitted only on training splits, generating confusion matrices and ROC-AUC curves.',
      verifiedResults:
        'Benchmarked precision, recall, and ROC-AUC metrics across algorithms using stratified 5-fold cross-validation.',
      architecture: [
        'StandardScaler and RobustScaler feature transformation pipelines',
        'Stratified 5-Fold cross-validation execution harness',
        'Precision-recall, ROC-AUC, and confusion matrix evaluation modules',
        'Model comparison reports and metric visualization charts',
      ],
      diagramSteps: ['Raw Tabular Data', 'Isolated Feature Scaler', 'Stratified 5-Fold CV', 'ROC-AUC & Precision Metrics'],
      metrics: ['Stratified 5-Fold CV', 'Train/Test Split Isolation', 'Confusion Matrix Analysis'],
      technologies: ['Python', 'Scikit-Learn', 'Pandas', 'NumPy', 'Matplotlib'],
      githubUrl: 'https://github.com/Manoj-git17/ML-Classification-Workbench',
      liveDemoUrl: 'https://github.com/Manoj-git17/ML-Classification-Workbench#readme',
      videoPreviewPath: '/videos/mllab-demo.mp4',
      status: 'Completed',
      highlights: [
        'Strict isolation between training and evaluation splits',
        'Transparent metric comparisons across classification baselines',
        'Systematic hyperparameter evaluation across models',
      ],
    },
    {
      id: 'automated-data-pipeline',
      title: 'Automated Data Pipeline',
      shortTitle: 'Data Pipeline',
      tagline: 'Modular Python data engineering pipeline for automated ingestion, schema validation, outlier detection, and statistical summary reporting.',
      category: 'Data Engineering',
      badge: 'DATA SYSTEMS // ETL',
      description:
        'Modular Python data engineering pipeline for automated ingestion, schema validation, outlier detection, and statistical summary reporting.',
      problemSolved:
        'Standardizes ingestion of heterogeneous tabular datasets to detect corrupted records and anomalies before warehouse insertion.',
      whatIBuilt:
        'Constructed a Python ETL pipeline supporting streaming chunk processing, schema validation, IQR outlier detection, and formatted Markdown profiling reports.',
      keyContribution:
        'Implemented chunk-based streaming to process datasets efficiently, built type-assertion routines, and generated automated audit summaries.',
      verifiedResults:
        'Tested transformation logic and statistical anomaly detection on sample CSV datasets with reproducible execution.',
      architecture: [
        'Streaming chunk parser supporting heterogeneous CSV datasets',
        'Configurable schema validator enforcing strict type assertions',
        'IQR and Z-score statistical outlier detection algorithms',
        'Automated report generator outputting structured markdown logs',
      ],
      diagramSteps: ['Streaming CSV Ingestion', 'Schema Type Validator', 'IQR Outlier Filter', 'Structured Markdown Report'],
      metrics: ['Chunk Streaming Ingestion', 'Type-Safe Validation', 'Automated Audit Reports'],
      technologies: ['Python', 'Pandas', 'NumPy', 'SQL', 'SQLite'],
      githubUrl: 'https://github.com/Manoj-git17/data-pipeline-insights',
      liveDemoUrl: 'https://github.com/Manoj-git17/data-pipeline-insights#readme',
      videoPreviewPath: '/videos/pipeline-demo.mp4',
      status: 'Completed',
      highlights: [
        'Chunk-based ingestion prevents memory bloat on large datasets',
        'Deterministic assertions ensure reproducible transformation states',
        'Automated generation of profiling dossiers and outlier flags',
      ],
    },
    {
      id: 'cpp-algorithmic-systems',
      title: 'Algorithmic Systems in C++',
      shortTitle: 'C++ Systems',
      tagline: 'High-performance C++ implementation of fundamental data structures, graph traversals, and computational complexity benchmarks.',
      category: 'Systems & Algorithms',
      badge: 'SYSTEMS // C++17',
      description:
        'High-performance C++ implementation of fundamental data structures, graph traversals, and computational complexity benchmarks.',
      problemSolved:
        'Deepens understanding of memory management, pointer safety, and asymptotic computational efficiency in low-level systems.',
      whatIBuilt:
        'Developed a modern C++17 library of fundamental data structures, adjacency-list graph representations, and pathfinding algorithms (BFS, DFS, Dijkstra).',
      keyContribution:
        'Utilized RAII resource management for memory safety, designed modular graph classes, and authored empirical timing benchmarks for asymptotic complexity.',
      verifiedResults:
        'Unit-tested pathfinding and traversal algorithms confirming asymptotic correctness across various graph topologies.',
      architecture: [
        'Modern C++17 template-based header implementations',
        'Adjacency-list graph representation for shortest-path algorithms',
        'Automated unit test suite validating edge cases and pointer boundaries',
        'Benchmarking harness measuring execution time across varying input sizes',
      ],
      diagramSteps: ['C++17 Template Classes', 'Graph Data Structures', 'BFS / DFS / Dijkstra', 'Traversal Test Suite'],
      metrics: ['Modern C++17 RAII', 'O(V + E) Traversals', 'Unit Tested Graph Engine'],
      technologies: ['C++', 'STL', 'CMake'],
      githubUrl: 'https://github.com/Manoj-git17/cpp-algorithmic-systems',
      liveDemoUrl: 'https://github.com/Manoj-git17/cpp-algorithmic-systems#readme',
      videoPreviewPath: '/videos/pipeline-demo.mp4',
      status: 'Completed',
      highlights: [
        'Memory-safe RAII implementations of fundamental structures',
        'Clean separation of concerns with modern C++17 idioms',
        'Empirical verification of graph traversal runtimes',
      ],
    },
  ] as Project[],

  achievements: [
    {
      title: '38/38 Automated Pytest Suite Passing',
      category: 'TEST AUTOMATION',
      metric: '38/38 PASSED',
      description:
        'Automated test suite verifying ETL validation, relational star schema queries, and FastAPI REST endpoints on the DataPulse repository.',
      date: '2026',
    },
    {
      title: 'Production Deployments on Render & Vercel',
      category: 'CLOUD DEPLOYMENT',
      metric: 'DEPLOYED LIVE',
      description:
        'Configured full-stack microservices with automated GitHub CI/CD integration, persistent database schemas, and CORS security hardening.',
      date: '2026',
    },
    {
      title: 'Isolated ML Preprocessing Pipeline',
      category: 'DATA SCIENCE',
      metric: 'SPLIT INTEGRITY',
      description:
        'Implemented strict train/test data separation using Scikit-Learn transformers fitted exclusively on training splits with stratified cross-validation.',
      date: '2026',
    },
    {
      title: 'RAII Memory Management in C++17',
      category: 'SYSTEMS RIGOR',
      metric: 'STRUCTURED MEMORY',
      description:
        'Implemented graph traversals and tree structures in modern C++17 with RAII pointers and comprehensive edge-case test harnesses.',
      date: '2025 – 2026',
    },
  ],

  education: {
    degree: 'B.Tech — Artificial Intelligence & Data Science',
    status: 'Undergraduate Engineering Student (3rd Semester)',
    currentStatus: '3rd Semester Undergraduate',
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
