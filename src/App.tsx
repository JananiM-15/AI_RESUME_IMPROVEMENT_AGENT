import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { NotebookViewer } from './components/NotebookViewer';
import { LiveAgentSimulator } from './components/LiveAgentSimulator';
import { ColabGuideModal } from './components/ColabGuideModal';
import { GitHubModal } from './components/GitHubModal';
import { 
  Terminal, 
  ExternalLink, 
  Download, 
  FileText, 
  CheckCircle2, 
  Copy, 
  Check, 
  ShieldCheck, 
  Sparkles,
  Layers,
  ArrowRight,
  Code2,
  Github
} from 'lucide-react';
import { 
  GROQ_API_KEY_DEFAULT, 
  TAVILY_API_KEY_DEFAULT, 
  generateColabNotebookJson 
} from './data/colabCode';
import { generateSampleResumePdf } from './utils/pdfGenerator';

export default function App() {
  const [activeView, setActiveView] = useState<'notebook' | 'simulator'>('notebook');
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isGitHubOpen, setIsGitHubOpen] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopyText = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(type);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDownloadIpynb = () => {
    const jsonStr = generateColabNotebookJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'AI_Resume_Improvement_Agent.ipynb';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        onOpenGuide={() => setIsGuideOpen(true)} 
        onOpenGitHub={() => setIsGitHubOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 rounded-3xl p-6 sm:p-8 lg:p-10 text-white shadow-xl relative overflow-hidden border border-indigo-950">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-4 border border-indigo-400/30">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Custom Built For Google Colab
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              AI RESUME IMPROVEMENT AGENT
            </h1>
            
            <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
              Complete, end-to-end Google Colab notebook architecture matching your exact requirements:
              LangChain PyPDF loading, recursive text chunking, HuggingFace embeddings, FAISS vector indexing, Groq Llama-3.3 70B reasoning, custom RAG Tool, Career & Upskilling Budget Tool, and an interactive Gradio web UI.
            </p>

            {/* Quick Flow Badges */}
            <div className="flex flex-wrap gap-2 mt-5 text-xs text-slate-300">
              <span className="px-2.5 py-1 bg-white/10 rounded-lg backdrop-blur-xs font-mono">1. Auto PDF Gen</span>
              <span>&rarr;</span>
              <span className="px-2.5 py-1 bg-white/10 rounded-lg backdrop-blur-xs font-mono">2. PyPDFLoader</span>
              <span>&rarr;</span>
              <span className="px-2.5 py-1 bg-white/10 rounded-lg backdrop-blur-xs font-mono">3. RecursiveSplitter</span>
              <span>&rarr;</span>
              <span className="px-2.5 py-1 bg-white/10 rounded-lg backdrop-blur-xs font-mono">4. all-MiniLM-L6-v2</span>
              <span>&rarr;</span>
              <span className="px-2.5 py-1 bg-white/10 rounded-lg backdrop-blur-xs font-mono">5. FAISS RAG</span>
              <span>&rarr;</span>
              <span className="px-2.5 py-1 bg-white/10 rounded-lg backdrop-blur-xs font-mono">6. Groq Chat</span>
              <span>&rarr;</span>
              <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg backdrop-blur-xs font-mono font-semibold">7. Gradio Web UI</span>
            </div>

            {/* CTAs */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                onClick={handleDownloadIpynb}
                className="px-5 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Download Ready-to-Run .ipynb
              </button>

              <button
                onClick={generateSampleResumePdf}
                className="px-5 py-3 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm rounded-xl border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-emerald-400" />
                Download sample_resume.pdf
              </button>

              <a
                href="https://colab.research.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs sm:text-sm rounded-xl border border-slate-700 transition-all flex items-center gap-2 cursor-pointer"
              >
                Open Google Colab <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setIsGuideOpen(true)}
                className="px-4 py-3 text-amber-300 hover:text-amber-200 font-semibold text-xs sm:text-sm transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                View Step-by-Step Run Guide &rarr;
              </button>
            </div>
          </div>

          {/* Decorative Background Blob */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-indigo-500/10 via-purple-500/5 to-transparent pointer-events-none" />
        </div>

        {/* API Keys & Environment Config Strip */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Your API Keys Pre-Configured in the Code</h3>
                <p className="text-xs text-slate-500">
                  Ready in cell Step 5. No manual substitution needed in Google Colab.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-700">
                <span className="text-slate-400">Groq:</span>
                <span>{GROQ_API_KEY_DEFAULT.slice(0, 10)}...{GROQ_API_KEY_DEFAULT.slice(-4)}</span>
                <button
                  onClick={() => handleCopyText(GROQ_API_KEY_DEFAULT, 'groq')}
                  className="text-slate-500 hover:text-indigo-600 cursor-pointer"
                  title="Copy Groq Key"
                >
                  {copiedKey === 'groq' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-700">
                <span className="text-slate-400">Tavily:</span>
                <span>{TAVILY_API_KEY_DEFAULT.slice(0, 10)}...{TAVILY_API_KEY_DEFAULT.slice(-4)}</span>
                <button
                  onClick={() => handleCopyText(TAVILY_API_KEY_DEFAULT, 'tavily')}
                  className="text-slate-500 hover:text-indigo-600 cursor-pointer"
                  title="Copy Tavily Key"
                >
                  {copiedKey === 'tavily' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* View Selection: Notebook Code Viewer vs Live In-Browser Simulator */}
        {activeView === 'notebook' ? (
          <NotebookViewer onOpenColabGuide={() => setIsGuideOpen(true)} />
        ) : (
          <LiveAgentSimulator />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 bg-white border-t border-slate-200 py-6 text-xs text-slate-500 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <strong>AI RESUME IMPROVEMENT AGENT</strong> — Built for Google Colab with Groq, LangChain & Gradio.
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsGuideOpen(true)}
              className="hover:text-indigo-600 transition-colors cursor-pointer"
            >
              How to view & run in Google Colab
            </button>
            <button
              onClick={handleDownloadIpynb}
              className="hover:text-indigo-600 transition-colors cursor-pointer"
            >
              Download .ipynb
            </button>
          </div>
        </div>
      </footer>

      {/* Colab Run Guide Modal */}
      <ColabGuideModal 
        isOpen={isGuideOpen} 
        onClose={() => setIsGuideOpen(false)} 
      />

      {/* GitHub Push Modal */}
      <GitHubModal
        isOpen={isGitHubOpen}
        onClose={() => setIsGitHubOpen(false)}
      />
    </div>
  );
}
