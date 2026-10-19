export interface SkillItem {
  name: string;
  level: string;
  note?: string;
  practicalApplication?: string;
}

export interface SkillCategory {
  title: string;
  category: 'Programming' | 'Web' | 'Data' | 'Tools' | 'AI';
  description: string;
  items: SkillItem[];
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'AI & Machine Learning' | 'Data Engineering' | 'Web Development' | 'Systems & Algorithms';
  badge: string;
  description: string;
  problemSolved: string;
  architecture: string[];
  metrics: string[];
  technologies: string[];
  githubUrl: string;
  liveDemoUrl?: string;
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
    name: 'Manoj',
    wordmark: 'MANOJ',
    role: 'AI & Data Science Engineering Student',
    expectedGraduation: '2029',
    bioHeadline: 'Curiosity into code. Ideas into impact.',
    bioSubtitle:
      "I'm Manoj, an AI & Data Science engineering student passionate about building useful software, exploring intelligent systems, and solving problems through technology.",
    aboutParagraphs: [
      "I'm an Artificial Intelligence and Data Science engineering student interested in the intersection of software engineering, data, and intelligent systems.",
      'I enjoy learning how technology works, developing my programming skills, and turning ideas into practical projects.',
      'My goal is to build strong engineering fundamentals through consistent learning, experimentation, and hands-on development.',
    ],
    editorialStatement:
      'Engineering intelligent systems from first principles — combining mathematical rigor, clean software design, and verifiable data pipelines.',
    email: 'manojps60281@gmail.com',
    github: 'https://github.com/manoj-dev-ai',
    linkedin: 'https://linkedin.com/in/manoj-aids',
    location: 'India',
  },

  principles: [
    {
      title: 'First-Principles Understanding',
      tag: '01 // RIGOR',
      description:
        'Deconstructing computing systems to their mathematical and architectural fundamentals rather than relying on black-box abstractions.',
    },
    {
      title: 'Pragmatic Engineering',
      tag: '02 // CRAFT',
      description:
        'Writing maintainable, well-structured, readable code with strict separation of concerns that solves concrete, real-world problems.',
    },
    {
      title: 'Continuous Experimentation',
      tag: '03 // DISCOVERY',
      description:
        'Validating machine learning theory through empirical experimentation, measurable benchmarks, and reproducible pipelines.',
    },
  ],

  skillCategories: [
    {
      title: 'Programming Languages',
      category: 'Programming',
      description: 'Foundational languages used for algorithm development, computational pipelines, and systems design.',
      items: [
        {
          name: 'Python',
          level: 'Primary',
          note: 'Data analysis, ML scripts, automation',
          practicalApplication:
            'Data wrangling with Pandas/NumPy, building reproducible statistical models, developing automation workflows, and scripting data validation pipelines.',
        },
        {
          name: 'JavaScript / TypeScript',
          level: 'Intermediate',
          note: 'Modern web interfaces & typed tooling',
          practicalApplication:
            'Strictly typed interfaces, component-driven client architecture, state modeling, and API integration with zero runtime overhead.',
        },
        {
          name: 'C++',
          level: 'Foundational',
          note: 'Data structures & algorithm optimization',
          practicalApplication:
            'Low-level memory management, pointer manipulation, cache-friendly vector structures, and asymptotic algorithmic micro-benchmarks.',
        },
      ],
    },
    {
      title: 'Web Technologies',
      category: 'Web',
      description: 'Building clean, accessible interfaces and responsive computational dashboards.',
      items: [
        {
          name: 'React',
          level: 'Intermediate',
          note: 'Component architecture & state patterns',
          practicalApplication:
            'Custom hooks, optimistic UI state updates, modular design systems, and fast client-side rendering with minimal re-render footprints.',
        },
        {
          name: 'HTML5 & CSS3',
          level: 'Proficient',
          note: 'Semantic markup & responsive layouts',
          practicalApplication:
            'Accessible DOM hierarchy (ARIA), CSS Grid & Flexbox, micro-animations, and fluid responsive viewports.',
        },
        {
          name: 'Tailwind CSS',
          level: 'Proficient',
          note: 'Utility-first minimalist styling',
          practicalApplication:
            'Design token management, Apple-inspired editorial styling, dark/light contrast calibration, and ultra-lean production CSS builds.',
        },
      ],
    },
    {
      title: 'Data & Databases',
      category: 'Data',
      description: 'Structuring schemas, querying relational engines, and extracting statistical intelligence.',
      items: [
        {
          name: 'SQL',
          level: 'Intermediate',
          note: 'Complex queries & schema normalization',
          practicalApplication:
            'Multi-table joins, subqueries, grouping aggregations, window functions, and indexing strategies for analytical retrieval.',
        },
        {
          name: 'Database Fundamentals',
          level: 'Foundational',
          note: 'Relational design & ACID concepts',
          practicalApplication:
            'Entity-relationship modeling, 3NF normalization, constraint enforcement, and transactional integrity guarantees.',
        },
        {
          name: 'Data Analysis',
          level: 'Intermediate',
          note: 'Data cleaning, EDA, aggregation',
          practicalApplication:
            'Exploratory data analysis, distribution outlier detection, correlation analysis, and structured summary reporting.',
        },
      ],
    },
    {
      title: 'Engineering Tools',
      category: 'Tools',
      description: 'Version control, developer environments, and collaboration workflows.',
      items: [
        {
          name: 'Git',
          level: 'Proficient',
          note: 'Branching, commit hygiene, rebasing',
          practicalApplication:
            'Conventional commit messages, feature branching, clean rebase workflows, and conflict resolution.',
        },
        {
          name: 'GitHub',
          level: 'Proficient',
          note: 'Repositories & open collaboration',
          practicalApplication:
            'Documented pull requests, project tracking, release tagging, and automated continuous integration checks.',
        },
        {
          name: 'VS Code',
          level: 'Proficient',
          note: 'Configured environment & debugging',
          practicalApplication:
            'Integrated breakpoint debugging, linting with ESLint/Prettier, extension configurations, and terminal integration.',
        },
      ],
    },
    {
      title: 'Artificial Intelligence',
      category: 'AI',
      description: 'Applied machine learning pipelines, model evaluation, and modern AI application prototyping.',
      items: [
        {
          name: 'Machine Learning Fundamentals',
          level: 'Active Study',
          note: 'Supervised/unsupervised models & regression',
          practicalApplication:
            'Mathematical intuition for cost functions, gradient descent, classification boundaries, bias-variance trade-offs, and regularization.',
        },
        {
          name: 'AI Application Development',
          level: 'Active Study',
          note: 'API integrations & retrieval structuring',
          practicalApplication:
            'Integrating modern LLM APIs, structured JSON output extraction, context chunking, and embedding similarity workflows.',
        },
        {
          name: 'Data Modeling & Metrics',
          level: 'Foundational',
          note: 'Loss metrics & validation methodology',
          practicalApplication:
            'Stratified K-fold cross-validation, precision-recall curve analysis, confusion matrix auditing, and zero-leakage test splits.',
        },
      ],
    },
  ] as SkillCategory[],

  projects: [
    {
      id: 'datapulse',
      title: 'DataPulse',
      tagline: 'AI-Powered Data Analytics Platform',
      category: 'Data Engineering',
      badge: 'FULL-STACK // DATA & AI',
      description:
        'A full-stack data analytics platform that transforms sales data into business insights through interactive dashboards, sales trend analysis, regional analytics, and an AI-assisted question interface.',
      problemSolved:
        'Replaces fragmented spreadsheets and manual sales reporting with an automated data pipeline, star-schema warehouse, and interactive analytical dashboards with AI query assistance.',
      architecture: [
        'Automated Python and Pandas ETL pipeline for schema validation, cleansing, and record quarantining',
        'Relational star-schema warehouse design (fact_sales, dim_customers, dim_products) with SQLAlchemy',
        'Asynchronous FastAPI backend providing REST endpoints for KPI metrics and regional performance',
        'Interactive React 19 and Vite frontend dashboard with interactive charts and an AI-assisted query interface',
      ],
      metrics: ['38 Automated Tests Passed', 'Star Schema Warehouse', 'Sub-second API Latency'],
      technologies: [
        'React',
        'Vite',
        'Python',
        'FastAPI',
        'Pandas',
        'SQLAlchemy',
        'SQLite',
        'PostgreSQL',
      ],
      githubUrl: 'https://github.com/Manoj-git17/DataPulse',
      liveDemoUrl: 'https://data-pulse-phi-six.vercel.app',
      status: 'Completed',
      highlights: [
        'End-to-end automated ETL and schema validation pipeline',
        'Relational star-schema data warehouse modeling',
        'FastAPI asynchronous REST service with interactive Swagger docs',
        'Interactive analytics dashboard with AI-assisted natural queries',
      ],
    },
    {
      id: 'data-analytics-engine',
      title: 'Exploratory Data Intelligence Pipeline',
      tagline: 'Automated data ingestion, sanitization, and statistical summary engine',
      category: 'Data Engineering',
      badge: 'PIPELINE // MODULAR',
      description:
        'A modular Python pipeline designed to ingest heterogeneous tabular datasets, handle missing values systematically, compute descriptive distributions, and export structured statistical reports.',
      problemSolved:
        'Reduces the boilerplate required during initial exploratory data analysis by producing automated distribution profiles, outlier warnings, and correlation matrices.',
      architecture: [
        'Streamlined ingestion parser supporting streaming CSV and JSON formats',
        'Configurable data validation pipeline with type-safety checks',
        'Outlier detection using Interquartile Range (IQR) and Z-score metrics',
        'Automated metric generation with clean Markdown and HTML exports',
      ],
      metrics: ['Memory-efficient chunk processing', 'Zero data leakage', 'Deterministic transforms'],
      technologies: ['Python', 'SQL', 'Pandas', 'NumPy', 'Data Analysis'],
      githubUrl: 'https://github.com/manoj-dev-ai/data-pipeline-insights',
      status: 'Completed',
      highlights: [
        'Deterministic data transformation pipelines',
        'Reproducible statistical summary generation',
        'Memory-conscious tabular chunk processing',
      ],
    },
    {
      id: 'ml-classification-benchmarks',
      title: 'Predictive Classifier & Evaluation Lab',
      tagline: 'Comparative machine learning classification experiments with transparent metrics',
      category: 'AI & Machine Learning',
      badge: 'ML BENCHMARK // RIGOROUS',
      description:
        'An experimental machine learning workbench comparing baseline classification algorithms (logistic regression, decision trees, k-NN) against feature engineering variations with rigorous cross-validation.',
      problemSolved:
        'Clarifies the exact trade-offs between model complexity, inference latency, and precision-recall trade-offs across balanced and unbalanced synthetic datasets.',
      architecture: [
        'Standardized feature scaling (StandardScaler, RobustScaler) and categorical encoding',
        'Stratified K-Fold cross-validation benchmark runner',
        'Detailed confusion matrix, ROC-AUC curve, and F1-score evaluation',
        'Plain-text model interpretability and feature importance rankings',
      ],
      metrics: ['Stratified 5-Fold validation', 'Sub-millisecond inference', 'Transparent logs'],
      technologies: ['Python', 'Scikit-Learn', 'Matplotlib', 'Machine Learning'],
      githubUrl: 'https://github.com/manoj-dev-ai/ml-classifier-lab',
      status: 'Completed',
      highlights: [
        'Zero data leakage preprocessing isolation',
        'Granular hyperparameter exploration logging',
        'Plain-text interpretability report exports',
      ],
    },
    {
      id: 'interactive-metrics-ui',
      title: 'Minimalist Engineering Metrics Dashboard',
      tagline: 'High-performance React interface visualizing computational benchmarks',
      category: 'Web Development',
      badge: 'FRONTEND // 100% TYPE-SAFE',
      description:
        'A clean, responsive single-page web application inspired by Apple aesthetics for visualizing computational benchmarks, execution latencies, and algorithmic performance metrics.',
      problemSolved:
        'Provides a distraction-free, accessible interface for inspecting experiment runs without overwhelming dashboard clutter.',
      architecture: [
        'Modular component architecture with strict TypeScript types and zero `any` usage',
        'Client-side state caching with zero layout shifts (CLS < 0.01)',
        'Tailwind utility styling optimized for readability and high contrast',
        'Lightweight SVG vector charts with smooth micro-interactions',
      ],
      metrics: ['Lighthouse: 100 Performance', 'Sub-second initial paint', 'Accessible ARIA markup'],
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
      githubUrl: 'https://github.com/manoj-dev-ai/metrics-dashboard',
      status: 'Completed',
      highlights: [
        '100% Lighthouse performance and accessibility',
        'Sub-second page rendering with optimized bundle splitting',
        'Responsive layout scaling effortlessly to mobile viewports',
      ],
    },
    {
      id: 'algo-structures-lab',
      title: 'Algorithms & Computational Graph Explorer',
      tagline: 'Clean C++ implementations of foundational data structures and graph algorithms',
      category: 'Systems & Algorithms',
      badge: 'SYSTEMS // ASYMPTOTIC OPTIMAL',
      description:
        'A disciplined collection of well-documented C++ implementations covering balanced search trees, graph traversal algorithms (BFS, DFS, Dijkstra), dynamic programming patterns, and empirical runtime benchmarks.',
      problemSolved:
        'Solidifies deep mechanical sympathy for memory locality, pointer manipulation, and asymptotic computational complexity.',
      architecture: [
        'Header-only generic template structures following modern C++ conventions',
        'Automated test suites verifying edge case behavior and memory safety',
        'Micro-benchmarking harness measuring CPU cycles and allocations',
        'Empirical validation against theoretical Big-O curves',
      ],
      metrics: ['Zero memory leaks (Valgrind verified)', 'O(V + E) traversals', 'Modern C++17'],
      technologies: ['C++', 'Algorithms', 'Data Structures', 'Git'],
      githubUrl: 'https://github.com/manoj-dev-ai/algorithmic-systems',
      status: 'Completed',
      highlights: [
        'Strict memory safety and leak-free verification',
        'Comprehensive asymptotic analysis notes for every structure',
        'Modern C++17 paradigms with clear separation of concerns',
      ],
    },
  ] as Project[],

  education: {
    degree: 'Bachelor of Engineering / B.Tech in Artificial Intelligence & Data Science',
    status: 'Undergraduate Engineering Student',
    expectedGraduation: '2029',
    timeline: '2025 – 2029',
    overview:
      'Pursuing a comprehensive curriculum combining core computer science foundations, discrete mathematics, statistical modeling, and modern computational data architectures.',
    coursework: [
      {
        category: 'Foundational Computing',
        description: 'Core principles of software systems, low-level execution, and efficient algorithmic logic.',
        courses: ['Data Structures & Algorithms', 'Object-Oriented Programming', 'Computer Architecture', 'Operating System Concepts'],
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
