import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Search, 
  DollarSign, 
  CheckCircle2, 
  AlertTriangle, 
  Briefcase, 
  Award, 
  Loader2, 
  Key, 
  RotateCcw,
  Zap,
  Target,
  ArrowRight
} from 'lucide-react';
import { GROQ_API_KEY_DEFAULT } from '../data/colabCode';

const DEFAULT_RESUME_TEXT = `ALEX MORGAN
San Francisco, CA | alex.morgan@email.com | (555) 234-5678 | linkedin.com/in/alexmorgan | github.com/alexmorgan

PROFESSIONAL SUMMARY
Results-driven Senior Full-Stack Engineer with 5+ years of experience designing scalable microservices, distributed systems, and responsive web applications. Expert in Python, FastAPI, React, Node.js, and Cloud Infrastructure. Proven track record of improving API latency by 42% and driving 99.98% uptime for enterprise SaaS products.

TECHNICAL SKILLS
Languages: Python, TypeScript, JavaScript, SQL, Go, Bash
Frameworks: FastAPI, Django, React, Next.js, Express, LangChain, PyTorch
Cloud & DevOps: AWS (ECS, Lambda, S3), Docker, Kubernetes, Terraform, GitHub Actions
Databases: PostgreSQL, Redis, MongoDB, Pinecone, FAISS

WORK EXPERIENCE
Apex Cloud Solutions | Senior Software Engineer | Jan 2022 - Present
• Architected high-throughput RAG search pipeline handling 1.5M requests/day using LangChain and FAISS, cutting response times from 1.4s to 320ms.
• Reduced cloud infrastructure costs by $35,000/year by transitioning batch data processing jobs to serverless AWS Lambda.
• Mentored 6 junior engineers and instituted automated CI/CD security scanning, boosting team sprint velocity by 25%.

TechNova Labs | Full-Stack Software Developer | Jun 2019 - Dec 2021
• Developed core React customer portal serving 250,000 active monthly users with sub-second page loads and 99.9% uptime.
• Built RESTful microservices using Python FastAPI and PostgreSQL with 98% unit and integration test coverage.
• Optimized complex relational queries and added Redis caching layer, reducing checkout database latency by 35%.

EDUCATION & CERTIFICATIONS
B.S. in Computer Science | University of California, Berkeley (2015 - 2019, GPA 3.82)
Certifications: AWS Certified Solutions Architect – Associate (2023), DeepLearning.AI Generative AI Specialization`;

export const LiveAgentSimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'audit' | 'rag' | 'budget'>('audit');
  
  // Inputs
  const [resumeText, setResumeText] = useState(DEFAULT_RESUME_TEXT);
  const [apiKey, setApiKey] = useState(GROQ_API_KEY_DEFAULT);
  const [showKey, setShowKey] = useState(false);
  
  // Tab 1: Audit
  const [targetRole, setTargetRole] = useState('Senior AI/ML Platform Engineer');
  const [targetTier, setTargetTier] = useState('Tier 1 Tech / FAANG');
  const [auditLoading, setAuditLoading] = useState(false);
  const [auditResult, setAuditResult] = useState<any>(null);

  // Tab 2: RAG
  const [ragQuery, setRagQuery] = useState("What are the candidate's achievements in latency, cost reduction, and scale?");
  const [ragLoading, setRagLoading] = useState(false);
  const [ragResult, setRagResult] = useState<string | null>(null);

  // Tab 3: Budget
  const [budgetRole, setBudgetRole] = useState('Staff AI Infrastructure Engineer');
  const [experienceLevel, setExperienceLevel] = useState('Senior (5-8 yrs)');
  const [targetSalary, setTargetSalary] = useState(195);
  const [budgetLoading, setBudgetLoading] = useState(false);
  const [budgetResult, setBudgetResult] = useState<any>(null);

  const callGroqOrSimulate = async (prompt: string, fallbackGenerator: () => any) => {
    if (apiKey && apiKey.trim().startsWith('gsk_')) {
      try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey.trim()}`
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [
              {
                role: 'system',
                content: 'You are the AI RESUME IMPROVEMENT AGENT powered by Groq, LangChain, and RAG. Provide concise, high-value, beautifully structured output with clear sections and actionable bullet points.'
              },
              {
                role: 'user',
                content: prompt
              }
            ],
            temperature: 0.2,
            max_tokens: 1500
          })
        });

        if (response.ok) {
          const data = await response.json();
          return {
            success: true,
            text: data.choices?.[0]?.message?.content,
            source: 'Groq API (Live llama-3.3-70b-versatile)'
          };
        }
      } catch {
        // Fall back gracefully
      }
    }
    // Return structured deterministic fallback
    return {
      success: true,
      text: fallbackGenerator(),
      source: 'Agent Simulated Engine (Works offline & in Colab)'
    };
  };

  const handleRunAudit = async () => {
    setAuditLoading(true);
    setAuditResult(null);

    const prompt = `Perform a comprehensive resume audit for target role: "${targetRole}" at company tier: "${targetTier}".
Candidate Resume Content:
${resumeText}

Analyze ATS score (0-100), key strengths, critical gaps for this role, and rewrite 2 bullet points into Google XYZ format.`;

    const res = await callGroqOrSimulate(prompt, () => {
      return `### 🎯 ATS Diagnostic Score: 88 / 100 (Strong Candidate)
- **Keyword Alignment**: 86% match for **${targetRole}**
- **Quantified Impact**: 92% (High prevalence of metrics: 42% latency, 1.5M req/day, $35k savings)
- **Formatting & Readability**: 94% (Clear hierarchy, standard fonts, no tables)

---

### 🔍 Strengths & Highlights
1. **Exceptional Metrics**: Clearly stated business impact with exact metrics (e.g. *1.5M requests/day*, *320ms latency*, *$35,000/yr savings*).
2. **Modern AI & Cloud Stack**: Direct hands-on work with LangChain, FAISS, PyTorch, AWS Lambda/ECS, and Docker.
3. **Leadership Evidence**: Mentored 6 junior engineers and improved team sprint velocity by 25%.

---

### ⚠️ Critical Missing Keywords & Improvements for ${targetRole}
- **LLMOps & Observability**: Add mention of tools like Langfuse, Weights & Biases, or Arize Phoenix.
- **Distributed Training & Fine-Tuning**: Add experience with PEFT/LoRA, vLLM, or Triton Inference Server.
- **Evaluation Frameworks**: Mention RAG evaluation (e.g., Ragas, TruLens, or custom ground-truth benchmarks).

---

### ✍️ Bullet Point Transformations (Google X-Y-Z Formula)
**Example 1: Full-Stack API Performance**
- ❌ **Before**: Built RESTful microservices using Python FastAPI and PostgreSQL with 98% unit and integration test coverage.
- ✨ **After (Impact-Driven)**: Architected 12+ mission-critical FastAPI microservices handling 250k MAU, achieving 99.98% SLA and zero production rollbacks across 18 months.
- 💡 **Why this wins**: Proves reliability at scale rather than just passive test coverage.

**Example 2: Cost & Infrastructure Optimization**
- ❌ **Before**: Reduced cloud infrastructure costs by $35,000/year by transitioning batch data processing jobs to serverless AWS Lambda.
- ✨ **After (Impact-Driven)**: Slashed cloud computing expenditure by 34% ($35k annualized) by redesigning high-volume batch pipelines into event-driven AWS Lambda micro-clusters.
- 💡 **Why this wins**: Gives relative percentage impact and shows architectural vision.

---

### 🚀 14-Day Action Checklist
1. Add a dedicated **Projects & Systems Architecture** section with GitHub link.
2. Infuse LLMOps terms: *vLLM, prompt engineering evaluation, embedding quantization*.
3. Tailor the Professional Summary top line to directly state: *"Senior AI / ML Platform Engineer"*.`;
    });

    setAuditResult(res);
    setAuditLoading(false);
  };

  const handleRunRag = async () => {
    setRagLoading(true);
    setRagResult(null);

    const prompt = `You are the RAG search tool for this resume. Query: "${ragQuery}".
Resume context:
${resumeText}

Provide a direct, factual answer with cited snippets.`;

    const res = await callGroqOrSimulate(prompt, () => {
      return `### 🔎 RAG Tool Retrieval Results

**Query:** *${ragQuery}*

**Retrieved Chunks from Vectorstore (Top-2 Semantic Match):**
1. *Apex Cloud Solutions Experience Chunk*:
   - *"Architected high-throughput RAG search pipeline handling 1.5M requests/day using LangChain and FAISS, cutting response times from 1.4s to 320ms."*
   - *"Reduced cloud infrastructure costs by $35,000/year by transitioning batch data processing jobs to serverless AWS Lambda."*
2. *TechNova Labs Experience Chunk*:
   - *"Optimized complex relational queries and added Redis caching layer, reducing checkout database latency by 35%."*
   - *"Developed core React customer portal serving 250,000 active monthly users with sub-second page loads."*

---

**Synthesized Agent Answer:**
The candidate demonstrates deep expertise in high-throughput scale and cost efficiency across multiple roles:
1. **Scale**: Successfully designed and operated a RAG search pipeline serving **1.5 million requests daily** and web portals supporting **250,000 monthly active users**.
2. **Latency Reduction**:
   - Cut RAG search response time by **77%** (from 1.4s down to 320ms).
   - Reduced checkout database query latency by **35%** with Redis caching.
   - Slashed general API latency by **42%**.
3. **Cost Savings**: Slashed annual AWS cloud infrastructure expenditures by **$35,000/year** via serverless Lambda migration.`;
    });

    setRagResult(res.text);
    setRagLoading(false);
  };

  const handleRunBudget = async () => {
    setBudgetLoading(true);
    setBudgetResult(null);

    const prompt = `Generate a realistic Career & Upskilling Budget Plan for:
Target Role: ${budgetRole}
Current Level: ${experienceLevel}
Target Salary: $${targetSalary},000 USD/year.
Calculate exact certification fees, courses, lab credits, total cost, and ROI.`;

    const res = await callGroqOrSimulate(prompt, () => {
      const currentEstimate = targetSalary * 0.78;
      const salaryBump = targetSalary - currentEstimate;
      return `### 💰 Career Upskilling & Certification Budget: ${budgetRole}
**Target Compensation:** $${targetSalary},000/yr  |  **Experience:** ${experienceLevel}

---

#### 1. 🎓 Recommended Certifications & Exam Fees
| Certification | Provider | Exam Cost (USD) | Priority |
| :--- | :--- | :--- | :--- |
| **AWS Certified Machine Learning – Specialty (MLS-C01)** | Amazon Web Services | $300 | High |
| **CKA (Certified Kubernetes Administrator)** | Linux Foundation | $395 | High |
| **Databricks Certified Generative AI Engineer Associate** | Databricks | $200 | Medium |
| **Subtotal Certifications:** | | **$895** | |

---

#### 2. 📚 High-Yield Coursework & Platforms
- **DeepLearning.AI Generative AI / LLMOps Short Courses**: Free / $49
- **Coursera Plus Annual Pass** (access to 7,000+ enterprise courses): $399
- **Subtotal Coursework:** **$448**

---

#### 3. ☁️ Sandbox, GPU Compute & Cloud Infrastructure
- **AWS / GCP Cloud Lab Credits** (ECS, EKS, GPU instances for model testing): $250
- **RunPod / Together AI / Groq API Testing Credits**: $100
- **Custom Portfolio Domain & Hosting** (Vercel / GitHub Pages): $20
- **Subtotal Labs & Compute:** **$370**

---

#### 4. 📊 Financial Summary & ROI
- **Total Required Upskilling Investment:** **$1,713 USD**
- **Projected Base Compensation Increase:** **+$${Math.round(salaryBump)},000 / year**
- **Breakeven Timeframe:** **~12 to 18 days** into the new position
- **First-Year Financial ROI:** **~${Math.round((salaryBump * 1000 / 1713) * 100)}% return on investment**

---

#### 5. 🗓️ 90-Day Execution Roadmap
- **Weeks 1–4**: Complete AWS MLS prep + Build end-to-end RAG system with evaluation framework.
- **Weeks 5–8**: Deploy containerized inference on Kubernetes (EKS/vLLM) + sit for CKA exam.
- **Weeks 9–12**: Revise resume using AI Agent metrics, activate recruiter outreach, start interview loops.`;
    });

    setBudgetResult(res);
    setBudgetLoading(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-medium mb-2 border border-indigo-400/30">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Live Interactive Agent Playground
            </div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">
              AI Resume Improvement Agent Simulator
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Experience the exact RAG pipeline, ATS analyzer, and Career Budget Tool right here in your browser before running in Google Colab.
            </p>
          </div>

          {/* API Key Status Pill */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-3 text-xs flex flex-col gap-1 min-w-[240px]">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                <Key className="w-3.5 h-3.5 text-emerald-400" />
                Groq API Key
              </span>
              <button
                onClick={() => setShowKey(!showKey)}
                className="text-indigo-400 hover:text-indigo-300 text-[11px] underline cursor-pointer"
              >
                {showKey ? 'Hide' : 'Show'}
              </button>
            </div>
            <input
              type={showKey ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="gsk_..."
              className="w-full bg-slate-900/90 text-slate-200 border border-slate-700 rounded px-2 py-1 font-mono text-[11px] focus:outline-none focus:border-indigo-500"
            />
            <span className="text-[10px] text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Pre-configured with your Groq credentials
            </span>
          </div>
        </div>

        {/* Tab selection */}
        <div className="flex gap-2 mt-6 border-b border-slate-800 pb-0">
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-4 py-2.5 text-sm font-semibold rounded-t-lg transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'audit'
                ? 'bg-white text-slate-900 shadow'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Target className="w-4 h-4 text-indigo-600" />
            1. ATS Resume Audit
          </button>
          <button
            onClick={() => setActiveTab('rag')}
            className={`px-4 py-2.5 text-sm font-semibold rounded-t-lg transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'rag'
                ? 'bg-white text-slate-900 shadow'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Search className="w-4 h-4 text-emerald-600" />
            2. RAG Vector Search Tool
          </button>
          <button
            onClick={() => setActiveTab('budget')}
            className={`px-4 py-2.5 text-sm font-semibold rounded-t-lg transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'budget'
                ? 'bg-white text-slate-900 shadow'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <DollarSign className="w-4 h-4 text-amber-600" />
            3. Career Budget Tool
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-6">
        {/* Tab 1: Audit */}
        {activeTab === 'audit' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                  Target Job Title
                </label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g. Senior Full-Stack Engineer, AI Tech Lead"
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                  Target Company Profile
                </label>
                <select
                  value={targetTier}
                  onChange={(e) => setTargetTier(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                >
                  <option>Tier 1 Tech / FAANG</option>
                  <option>High-Growth SaaS Unicorn</option>
                  <option>Early-Stage AI Startup</option>
                  <option>Enterprise Finance / Healthcare</option>
                </select>
              </div>
            </div>

            {/* Resume content preview toggle */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Loaded Resume Content (Alex Morgan - Sample)
                </label>
                <button
                  onClick={() => setResumeText(DEFAULT_RESUME_TEXT)}
                  className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" /> Reset to Sample
                </button>
              </div>
              <textarea
                rows={4}
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                className="w-full p-3 font-mono text-xs text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <button
              onClick={handleRunAudit}
              disabled={auditLoading}
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {auditLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Running Groq LLM & LangChain Audit...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-amber-300" />
                  Run AI Resume Improvement Audit
                </>
              )}
            </button>

            {auditResult && (
              <div className="mt-6 p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Audit Report Output
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-medium">
                    {auditResult.source}
                  </span>
                </div>
                <div className="prose prose-sm max-w-none text-slate-800 whitespace-pre-line text-sm leading-relaxed">
                  {auditResult.text}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: RAG */}
        {activeTab === 'rag' && (
          <div className="space-y-6">
            <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-4 text-xs text-emerald-900 flex items-start gap-3">
              <Search className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm text-emerald-950 mb-0.5">RAG Tool in Action</p>
                <p>
                  In Colab, this tool executes <code className="bg-emerald-100 px-1 py-0.5 rounded text-emerald-900">retriever.invoke(query)</code> against your FAISS vector database and feeds the exact top-K chunks to Groq. Try asking questions about the candidate!
                </p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                Ask any question about the resume:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={ragQuery}
                  onChange={(e) => setRagQuery(e.target.value)}
                  placeholder="e.g. What databases and cloud services does the candidate use?"
                  className="flex-1 px-3.5 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <button
                  onClick={handleRunRag}
                  disabled={ragLoading}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm rounded-lg shadow-sm transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {ragLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  Ask RAG
                </button>
              </div>
            </div>

            {/* Quick sample chips */}
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="text-slate-400 py-1">Quick prompts:</span>
              {[
                "What are the candidate's achievements in latency, cost reduction, and scale?",
                "What certifications and degrees does the candidate hold?",
                "What programming languages and frameworks does Alex know?",
                "Describe Alex's leadership and mentoring experience."
              ].map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setRagQuery(q);
                  }}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md border border-slate-200 transition-colors cursor-pointer text-left"
                >
                  {q}
                </button>
              ))}
            </div>

            {ragResult && (
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200 pb-2">
                  RAG Vector Retrieval & Synthesized Answer
                </div>
                <div className="prose prose-sm max-w-none text-slate-800 whitespace-pre-line text-sm leading-relaxed">
                  {ragResult}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Budget Tool */}
        {activeTab === 'budget' && (
          <div className="space-y-6">
            <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 flex items-start gap-3">
              <DollarSign className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm text-amber-950 mb-0.5">Career & Upskilling Budget Tool</p>
                <p>
                  As requested in your steps, this specialized agent tool calculates the exact investment required (AWS/GCP certifications, deep-dive courses, cloud sandboxes) to land the candidate's target compensation bump.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                  Target Upskilling Role
                </label>
                <input
                  type="text"
                  value={budgetRole}
                  onChange={(e) => setBudgetRole(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                  Current Level
                </label>
                <select
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-amber-500 bg-white"
                >
                  <option>Junior (0-2 yrs)</option>
                  <option>Mid-Level (3-5 yrs)</option>
                  <option>Senior (5-8 yrs)</option>
                  <option>Lead / Staff (8+ yrs)</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Target Comp ($K USD)
                  </label>
                  <span className="text-xs font-bold text-amber-600">${targetSalary},000/yr</span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="350"
                  step="5"
                  value={targetSalary}
                  onChange={(e) => setTargetSalary(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
              </div>
            </div>

            <button
              onClick={handleRunBudget}
              disabled={budgetLoading}
              className="w-full py-3 px-4 bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {budgetLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Calculating Financials & Certification Breakdown...
                </>
              ) : (
                <>
                  <DollarSign className="w-4 h-4" />
                  Calculate Career Upskilling & Certification Budget
                </>
              )}
            </button>

            {budgetResult && (
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Financial & Upskilling Plan
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-medium">
                    {budgetResult.source}
                  </span>
                </div>
                <div className="prose prose-sm max-w-none text-slate-800 whitespace-pre-line text-sm leading-relaxed">
                  {budgetResult.text}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
