import React from 'react';
import { 
  Bot, 
  Download, 
  FileText, 
  Play, 
  ExternalLink, 
  Copy, 
  Check, 
  HelpCircle,
  Sparkles,
  Github
} from 'lucide-react';
import { generateColabNotebookJson, getAllCodeAsPythonScript } from '../data/colabCode';
import { generateSampleResumePdf } from '../utils/pdfGenerator';

interface Props {
  activeView: 'notebook' | 'simulator';
  setActiveView: (view: 'notebook' | 'simulator') => void;
  onOpenGuide: () => void;
  onOpenGitHub: () => void;
}

export const Navbar: React.FC<Props> = ({ activeView, setActiveView, onOpenGuide, onOpenGitHub }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(getAllCodeAsPythonScript());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Agent Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-black tracking-tight text-slate-900">
                  AI RESUME IMPROVEMENT AGENT
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Google Colab Ready
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden md:block">
                LangChain • Groq Llama-3.3 70B • HuggingFace Embeddings • FAISS RAG • Gradio
              </p>
            </div>
          </div>

          {/* Navigation View Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveView('notebook')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeView === 'notebook'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Colab Notebook
            </button>
            <button
              onClick={() => setActiveView('simulator')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeView === 'simulator'
                  ? 'bg-white text-indigo-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              Live Simulator
            </button>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadIpynb}
              title="Download .ipynb for Google Colab"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-2xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-indigo-600" />
              Download .ipynb
            </button>

            <button
              onClick={generateSampleResumePdf}
              title="Download sample resume PDF"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-2xs transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-600" />
              Sample PDF
            </button>

            <button
              onClick={onOpenGitHub}
              className="px-3 py-1.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Github className="w-3.5 h-3.5" />
              Push to GitHub
            </button>

            <button
              onClick={onOpenGuide}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 text-amber-400" />
              Colab Run Guide
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
