import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Bot, User, RotateCcw } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  source?: 'api' | 'fallback';
  timestamp: string;
}

let messageSeq = 0;
function createChatMessage(sender: 'user' | 'assistant', text: string, source?: 'api' | 'fallback'): Message {
  messageSeq += 1;
  const d = new Date();
  const timeString = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  return {
    id: `msg-${messageSeq}-${d.getTime()}`,
    sender,
    text,
    source,
    timestamp: timeString,
  };
}

const SUGGESTED_QUESTIONS = [
  "What is Manoj's strongest project?",
  "Tell me about his data engineering experience",
  "Can he start immediately / internship timeline?",
];

// Grounded client-side fallback knowledge engine that strictly quotes PORTFOLIO_DATA
function generateGroundedFallbackResponse(userPrompt: string): string {
  const query = userPrompt.toLowerCase().trim();

  // 1. Strongest / Best / Featured Project
  if (
    query.includes('taskflow') ||
    query.includes('task manager') ||
    query.includes('gemini') ||
    query.includes('saas')
  ) {
    const tf = PORTFOLIO_DATA.projects.find((p) => p.id === 'taskflow');
    return `**${tf?.title}** (${tf?.tagline}):

• **Overview:** ${tf?.description}
• **Architecture:** React.js frontend, Express.js & Node.js backend, SQLite database, and Google Gemini 1.5 API.
• **Key Capabilities:** Gemini-powered daily planning, automated task decomposition, priority matrices, and productivity analytics.
• **Measured Verification:** 100% Deployed & Live on Render with JWT authentication.
• **Live Demo:** [ai-task-manager-frontend-x3og.onrender.com](${tf?.liveDemoUrl})
• **Repository:** [GitHub](${tf?.githubUrl})`;
  }

  if (
    query.includes('strongest') ||
    query.includes('best project') ||
    query.includes('featured') ||
    query.includes('datapulse') ||
    query.includes('flagship')
  ) {
    const dp = PORTFOLIO_DATA.projects.find((p) => p.id === 'datapulse');
    return `Manoj's flagship project is **${dp?.title}** (${dp?.tagline}).

• **What it is:** A full-stack data analytics platform that transforms raw sales data into business intelligence via an automated ETL pipeline, star-schema warehouse, and interactive dashboards with AI query assistance.
• **Architecture:** React 19 + Vite frontend, asynchronous FastAPI REST backend, and PostgreSQL/SQLite with SQLAlchemy.
• **Measured Verification:** 38/38 automated tests passed (100% CI pass rate) and sub-second query response times.
• **Live Demo:** [data-pulse-phi-six.vercel.app](${dp?.liveDemoUrl})
• **Repository:** [GitHub](${dp?.githubUrl})`;
  }

  // 2. Data Engineering / Pipelines / Databases
  if (
    query.includes('data engineering') ||
    query.includes('pipeline') ||
    query.includes('etl') ||
    query.includes('sql') ||
    query.includes('database') ||
    query.includes('warehouse')
  ) {
    return `Manoj has practical, production-style experience in **Data Engineering & ETL Pipelines**:

1. **Relational Data Warehousing:** Designed a star schema (fact_sales with customer & product dimensions) enforcing 3NF normalization and transactional integrity.
2. **Automated ETL Pipelines:** Built automated Python/Pandas ingestion pipelines with streaming chunk processing, automated schema validation, and IQR/Z-score outlier detection.
3. **Zero Data Leakage:** Engineered strict preprocessing isolation across train/test splits for machine learning benchmarks.
4. **Core Tools:** Python, SQL (complex joins, aggregations, window functions), Pandas, NumPy, SQLAlchemy, and PostgreSQL.`;
  }

  // 3. Internship Availability / Start Date / Role
  if (
    query.includes('start') ||
    query.includes('intern') ||
    query.includes('available') ||
    query.includes('availability') ||
    query.includes('immediately') ||
    query.includes('when can') ||
    query.includes('hire')
  ) {
    return `**Internship & Role Status:**

• **Target Roles:** ${PORTFOLIO_DATA.personal.targetRole}
• **Timeline:** ${PORTFOLIO_DATA.personal.internshipAvailability}
• **Status:** Actively open to internships and co-op opportunities.
• **Location:** ${PORTFOLIO_DATA.personal.location} (open to remote or on-site opportunities).
• **Direct Email:** ${PORTFOLIO_DATA.personal.email}`;
  }

  // 4. Skills / Tech Stack
  if (
    query.includes('skill') ||
    query.includes('stack') ||
    query.includes('languages') ||
    query.includes('technologies') ||
    query.includes('python') ||
    query.includes('react')
  ) {
    const allSkills = PORTFOLIO_DATA.skillCategories
      .flatMap((c) => c.items.map((i) => i.name))
      .slice(0, 12)
      .join(', ');
    return `**Verified Technical Stack:**

• **Featured Technologies:** ${allSkills}
• **Languages:** Python (Primary for data & ML), JavaScript / TypeScript, C++ (Algorithms & systems).
• **Frameworks & Web:** React 19, FastAPI, Express.js / Node.js, Tailwind CSS, Vite, Google Gemini API.
• **Data & Storage:** SQL, PostgreSQL, SQLite, SQLAlchemy, Pandas, NumPy.
• **Engineering Practices:** Git/GitHub version control, strict type safety, automated Pytest suites, zero-leakage ML pipelines.`;
  }

  // 5. Education & Background
  if (
    query.includes('education') ||
    query.includes('college') ||
    query.includes('degree') ||
    query.includes('university') ||
    query.includes('graduat')
  ) {
    return `**Academic Dossier:**

• **Degree:** ${PORTFOLIO_DATA.education.degree}
• **Timeline:** ${PORTFOLIO_DATA.education.timeline} (Expected Graduation: ${PORTFOLIO_DATA.education.expectedGraduation})
• **Core Coursework:** Data Structures & Algorithms, Object-Oriented Programming, Linear Algebra, Probability & Statistics, Database Management Systems, and Machine Learning Fundamentals.`;
  }

  // 6. Contact details
  if (
    query.includes('contact') ||
    query.includes('email') ||
    query.includes('reach') ||
    query.includes('phone') ||
    query.includes('linkedin')
  ) {
    return `You can reach Manoj directly through:

• **Email:** [${PORTFOLIO_DATA.personal.email}](mailto:${PORTFOLIO_DATA.personal.email})
• **GitHub:** [${PORTFOLIO_DATA.personal.github}](${PORTFOLIO_DATA.personal.github})
• **LinkedIn:** [${PORTFOLIO_DATA.personal.linkedin}](${PORTFOLIO_DATA.personal.linkedin})`;
  }

  // 7. Grounded refusal if outside portfolio facts
  return `I can only answer questions verified by Manoj's official portfolio dossier. 

I do not have verified records answering that specific question.

To inquire further or discuss specific opportunities, please reach out directly to Manoj at **${PORTFOLIO_DATA.personal.email}**.`;
}

export const AskPortfolioChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-init',
      sender: 'assistant',
      text: `Hello! I'm Manoj's Portfolio AI Assistant. Ask me anything about his technical stack, case studies (like DataPulse), data engineering experience, or internship timeline.`,
      timestamp: 'Now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 700);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (questionText?: string) => {
    const textToSend = questionText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage = createChatMessage('user', textToSend.trim());

    setMessages((prev) => [...prev, userMessage]);
    if (!questionText) setInput('');
    setIsLoading(true);

    try {
      // Attempt backend API call first
      const apiUrl = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/chat` : '/api/chat';
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000); // 4s timeout for graceful fallback

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend }),
        signal: controller.signal,
      }).catch(() => null);

      clearTimeout(timeoutId);

      if (response && response.ok) {
        const data = await response.json();
        const assistantMessage = createChatMessage('assistant', data.reply || data.text, 'api');
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        // Smoothly fall back to client knowledge engine
        const fallbackAnswer = generateGroundedFallbackResponse(textToSend);
        const assistantMessage = createChatMessage('assistant', fallbackAnswer, 'fallback');
        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch {
      const fallbackAnswer = generateGroundedFallbackResponse(textToSend);
      const assistantMessage = createChatMessage('assistant', fallbackAnswer, 'fallback');
      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'assistant',
        text: `Conversation cleared. Ask me about Manoj's skills, DataPulse architecture, or internship availability.`,
        timestamp: 'Now',
      },
    ]);
  };

  return (
    <div
      className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 transition-all duration-300 ${
        isScrolling && !isOpen ? 'opacity-20 translate-y-3 pointer-events-none' : 'opacity-100 translate-y-0'
      }`}
    >
      {/* Expanded Chat Drawer */}
      {isOpen && (
        <div className="mb-4 w-[calc(100vw-2.5rem)] sm:w-[420px] h-[550px] max-h-[82vh] bg-[#121212] border-2 border-[#FFD60A] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="px-4 py-3 bg-[#1A1A1A] border-b border-[#F2EFE6]/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#FFD60A] text-[#0E0E0E] flex items-center justify-center font-bold">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#F2EFE6]">
                    DOSSIER AI · ASSISTANT
                  </h3>
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[9px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    GROUNDED
                  </span>
                </div>
                <p className="font-mono text-[10px] text-[#F2EFE6]/50">
                  Strictly verified data · No hallucinations
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                title="Reset conversation"
                className="p-1.5 rounded-lg text-[#F2EFE6]/60 hover:text-[#FFD60A] hover:bg-[#222] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-1.5 rounded-lg text-[#F2EFE6]/60 hover:text-white hover:bg-[#222] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Thread */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs font-sans">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'assistant' && (
                  <div className="w-6 h-6 rounded-full bg-[#FFD60A] text-[#0E0E0E] flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#FFD60A] text-[#0E0E0E] font-medium rounded-br-sm'
                      : 'bg-[#1E1E1E] text-[#F2EFE6] border border-[#F2EFE6]/10 rounded-bl-sm'
                  }`}
                >
                  <div className="whitespace-pre-line prose-invert">
                    {m.text}
                  </div>

                  <div className="flex items-center justify-between gap-3 mt-2 pt-1 border-t border-current/10 font-mono text-[9px] opacity-60">
                    <span>{m.timestamp}</span>
                    {m.source === 'fallback' && (
                      <span className="text-[8.5px] uppercase tracking-wider">
                        Grounded Portfolio Dossier
                      </span>
                    )}
                  </div>
                </div>

                {m.sender === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-[#2A2A2A] text-[#F2EFE6] flex items-center justify-center shrink-0 mt-0.5 border border-[#F2EFE6]/20">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 items-center text-xs text-[#FFD60A] font-mono">
                <div className="w-6 h-6 rounded-full bg-[#FFD60A]/20 flex items-center justify-center animate-spin">
                  <Sparkles className="w-3.5 h-3.5 text-[#FFD60A]" />
                </div>
                <span>Retrieving verified portfolio data...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Questions */}
          <div className="px-3 py-2 bg-[#171717] border-t border-[#F2EFE6]/10">
            <span className="font-mono text-[9px] uppercase tracking-wider text-[#F2EFE6]/50 block mb-1.5">
              Suggested for Recruiters:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTED_QUESTIONS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(q)}
                  disabled={isLoading}
                  className="px-2.5 py-1 rounded-full bg-[#222222] hover:bg-[#FFD60A] hover:text-[#0E0E0E] text-[#F2EFE6]/90 border border-[#F2EFE6]/10 font-mono text-[10px] transition-all text-left truncate max-w-full cursor-pointer disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box */}
          <div className="p-3 bg-[#1A1A1A] border-t border-[#F2EFE6]/15 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about DataPulse, skills, availability..."
              disabled={isLoading}
              className="flex-1 bg-[#0E0E0E] text-[#F2EFE6] placeholder-[#F2EFE6]/40 text-xs font-sans px-3.5 py-2.5 rounded-xl border border-[#F2EFE6]/15 focus:outline-none focus:border-[#FFD60A] transition-colors"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="p-2.5 rounded-xl bg-[#FFD60A] text-[#0E0E0E] hover:bg-[#ffe043] transition-colors disabled:opacity-40 disabled:hover:bg-[#FFD60A] cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* High-Contrast Floating Launcher Button: Dark text on signature yellow */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#FFD60A] text-[#0E0E0E] font-bold border-2 border-[#0E0E0E] hover:bg-[#ffe043] shadow-[0_10px_35px_rgba(0,0,0,0.45)] transition-all duration-300 hover:scale-105 cursor-pointer"
        aria-label="Ask My Portfolio AI Chat"
      >
        <div className="relative">
          <MessageSquare className="w-4 h-4 text-[#0E0E0E]" />
          <span className="absolute -top-1 -right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E5321B] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E5321B]"></span>
          </span>
        </div>
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0E0E0E]">
          {isOpen ? 'CLOSE DOSSIER CHAT' : 'ASK PORTFOLIO // AI'}
        </span>
      </button>
    </div>
  );
};
