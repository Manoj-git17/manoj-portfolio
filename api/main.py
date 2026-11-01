"""
FastAPI Backend for Manoj's "Ask My Portfolio" AI Chat
Stateless, rate-limited endpoint grounded strictly in Manoj's verified portfolio dossier.
"""

import os
import time
from typing import Optional, List, Dict
from fastapi import FastAPI, HTTPException, Request, Response, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(
    title="Manoj Portfolio AI API",
    description="Stateless query engine answering questions strictly from verified portfolio dossier.",
    version="1.0.0",
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rate limiting storage (IP -> list of request timestamps)
# In-memory sliding window: max 15 requests per minute per IP
RATE_LIMIT_REQUESTS = 15
RATE_LIMIT_WINDOW_SECONDS = 60
request_history: Dict[str, List[float]] = {}

# Verified Dossier Context
PORTFOLIO_SYSTEM_DOSSIER = """
VERIFIED CANDIDATE DOSSIER: MANOJ
Role: AI & Data Science Engineering Student
Degree: Bachelor of Engineering / B.Tech in Artificial Intelligence & Data Science (2025 - 2029)
Location: Bengaluru, Karnataka
Open to Work: True
Target Roles: AI & Data Engineering / Software Engineering Intern
Internship Timeline: Available for internships from Summer 2027
Direct Contact Email: manojps60281@gmail.com
GitHub: https://github.com/manoj-dev-ai (also https://github.com/Manoj-git17)
LinkedIn: https://linkedin.com/in/manoj-aids

PRIMARY PROJECTS:
1. DataPulse (AI-Powered Data Analytics Platform)
   - Status: Completed & Deployed
   - Live URL: https://data-pulse-phi-six.vercel.app
   - Repository: https://github.com/Manoj-git17/DataPulse
   - Problem: Replaces fragmented spreadsheets and manual reporting with automated ETL, relational warehousing, and interactive analytics.
   - Stack: React 19, Vite, Python, FastAPI, Pandas, SQLAlchemy, PostgreSQL, SQLite.
   - Architecture: Automated Python/Pandas ETL pipeline with record quarantining; relational star-schema warehouse (fact_sales, dim_customers, dim_products); async FastAPI backend with sub-second response times; React 19 interactive dashboard with AI-assisted natural queries.
   - Measured Proof: 38/38 automated unit/integration tests passing (100% CI pass rate).

2. TaskFlow (AI-Powered Task Manager SaaS)
   - Status: Completed & Deployed Live
   - Live URL: https://ai-task-manager-frontend-x3og.onrender.com
   - Repository: https://github.com/Manoj-git17/ai-task-manager
   - Problem: Eliminates cognitive overload and task paralysis with Gemini AI-driven daily planning and task decomposition.
   - Stack: React.js, Vite, Node.js, Express.js, SQLite, Google Gemini 1.5 API, JWT Authentication, Tailwind CSS.
   - Highlights: Gemini-powered task decomposition, automated priority matrices, daily schedule planning, and productivity diagnostics.

3. Exploratory Data Intelligence Pipeline
   - Status: Completed
   - Repository: https://github.com/manoj-dev-ai/data-pipeline-insights
   - Stack: Python, SQL, Pandas, NumPy
   - Highlights: Deterministic data transforms, memory-efficient chunk processing, IQR/Z-score outlier detection, zero data leakage.

4. Predictive Classifier & Evaluation Lab
   - Status: Completed
   - Repository: https://github.com/manoj-dev-ai/ml-classifier-lab
   - Stack: Python, Scikit-Learn, Matplotlib
   - Highlights: Stratified 5-Fold cross-validation, sub-millisecond inference (<0.8ms), precision-recall curves, zero data leakage.

5. Minimalist Engineering Metrics Dashboard
   - Status: Completed
   - Stack: React 19, TypeScript, Tailwind CSS, Vite
   - Highlights: 100/100 Lighthouse performance, sub-second initial paint, fully accessible ARIA markup.

6. Algorithms & Computational Graph Explorer
   - Status: Completed
   - Stack: C++17, Algorithms, Data Structures
   - Highlights: Zero memory leaks (Valgrind verified), O(V + E) BFS/DFS/Dijkstra graph traversals.

TECHNICAL SKILLS:
- Languages: Python (Primary for data/ML), SQL, JavaScript/TypeScript, C++17
- Web: React 19, FastAPI, Tailwind CSS, Vite, HTML5/CSS3
- Data & Storage: PostgreSQL, SQLite, SQLAlchemy, Pandas, NumPy, Star Schema Modeling, 3NF Normalization
- Engineering Practices: Git/GitHub, Automated Testing (Pytest), Type Safety, CI/CD

STRICT INSTRUCTIONS:
- You are Manoj's AI Portfolio Assistant.
- Answer questions concisely and professionally based ONLY on the verified facts above.
- NEVER invent, hallucinate, or assume metrics, companies, grades, or projects not in this dossier.
- If asked about something not in this dossier, reply: "That information is not documented in Manoj's portfolio dossier. You can reach Manoj directly at manojps60281@gmail.com."
- Keep answers to 2-4 clear bullet points or a concise paragraph.
"""


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=500)


class ChatResponse(BaseModel):
    reply: str
    source: str = "api"


@app.get("/api/health")
def health_check():
    api_key_set = bool(os.getenv("AI_API_KEY") or os.getenv("GEMINI_API_KEY") or os.getenv("OPENAI_API_KEY"))
    return {
        "status": "healthy",
        "api_key_configured": api_key_set,
        "service": "manoj-portfolio-ai",
    }


@app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(payload: ChatRequest, request: Request):
    client_ip = request.client.host if request.client else "anonymous"
    now = time.time()

    # Rate limiting check
    history = request_history.setdefault(client_ip, [])
    # Prune timestamps older than window
    request_history[client_ip] = [t for t in history if now - t < RATE_LIMIT_WINDOW_SECONDS]
    if len(request_history[client_ip]) >= RATE_LIMIT_REQUESTS:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Rate limit reached (15 queries per minute). Please wait a moment.",
        )
    request_history[client_ip].append(now)

    query = payload.message.strip()
    api_key = os.getenv("AI_API_KEY") or os.getenv("GEMINI_API_KEY") or os.getenv("OPENAI_API_KEY")

    if not api_key:
        # Graceful fallback indicator so client uses verified local knowledge engine
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="AI API key not configured on host. Please use the client knowledge fallback.",
        )

    # If Gemini API Key is provided
    if os.getenv("GEMINI_API_KEY") or os.getenv("AI_API_KEY"):
        key = os.getenv("GEMINI_API_KEY") or os.getenv("AI_API_KEY")
        try:
            import urllib.request
            import json

            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={key}"
            req_data = {
                "system_instruction": {"parts": [{"text": PORTFOLIO_SYSTEM_DOSSIER}]},
                "contents": [{"parts": [{"text": query}]}],
                "generationConfig": {"temperature": 0.2, "maxOutputTokens": 400},
            }
            req = urllib.request.Request(
                url,
                data=json.dumps(req_data).encode("utf-8"),
                headers={"Content-Type": "application/json"},
                method="POST",
            )
            with urllib.request.urlopen(req, timeout=10) as resp:
                result = json.loads(resp.read().decode("utf-8"))
                reply_text = result["candidates"][0]["content"]["parts"][0]["text"].strip()
                return ChatResponse(reply=reply_text, source="gemini-api")
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Upstream AI generation failed: {str(e)}",
            )

    raise HTTPException(
        status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
        detail="No supported AI provider configured.",
    )


# Vercel serverless entry point
app_handler = app
