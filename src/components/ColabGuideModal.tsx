import React from 'react';
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  Play, 
  Download, 
  Upload, 
  Globe, 
  Terminal, 
  Key, 
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { generateColabNotebookJson } from '../data/colabCode';
import { generateSampleResumePdf } from '../utils/pdfGenerator';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ColabGuideModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleDownload = () => {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-6 md:p-8 shadow-2xl relative my-8 border border-slate-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-lg">
            CO
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              How to Run in Google Colab & View Output
            </h2>
            <p className="text-xs text-slate-500">
              Follow these simple steps to run the complete AI Resume Improvement Agent with your API keys.
            </p>
          </div>
        </div>

        {/* Quick Action Bar */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="text-xs text-slate-700">
            <span className="font-semibold text-slate-900">Fastest method:</span> Download the <code className="bg-slate-200 px-1 py-0.5 rounded text-indigo-700 font-mono">.ipynb</code> file and upload it to Colab.
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleDownload}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              1. Download .ipynb
            </button>
            <a
              href="https://colab.research.google.com/#create=true"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              2. Open Colab <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Steps Walkthrough */}
        <div className="space-y-5 text-sm">
          {/* Step 1 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
              1
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Open Google Colab</h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Go to <a href="https://colab.research.google.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline font-medium">colab.research.google.com</a>. Sign in with your Google account.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
              2
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Upload the Notebook (.ipynb)</h3>
              <p className="text-xs text-slate-600 mt-0.5">
                In the Colab popup modal, click on the <strong className="text-slate-800">"Upload"</strong> tab and choose the downloaded <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-indigo-600">AI_Resume_Improvement_Agent.ipynb</code> file.
              </p>
              <div className="mt-2 text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                💡 <em>Alternative:</em> Click <strong>"New Notebook"</strong> in Colab, then copy-paste the code cells from the code viewer one-by-one.
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
              3
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Verify Your Pre-Configured API Keys</h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Your Groq API key <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-emerald-700">gsk_BOcf...cr3C</code> and Tavily key are already integrated into Step 5 in the code.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
              4
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Run All Cells in Google Colab</h3>
              <p className="text-xs text-slate-600 mt-0.5">
                From the top menu in Google Colab, click:
              </p>
              <div className="mt-1.5 inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-md text-xs font-mono font-semibold text-slate-800 border border-slate-300">
                <Play className="w-3.5 h-3.5 text-emerald-600" />
                Runtime &rarr; Run all (or press Ctrl + F9 / Cmd + F9)
              </div>
              <p className="text-xs text-slate-500 mt-1.5">
                Colab will automatically create the sample resume PDF, install the packages, build the FAISS index, create the RAG and budget tools, and launch Gradio.
              </p>
            </div>
          </div>

          {/* Step 5 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-xs">
              5
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">View Output & Open Interactive Gradio Web UI</h3>
              <p className="text-xs text-slate-600 mt-0.5">
                At the bottom of Step 17, Gradio will print:
              </p>
              <pre className="bg-slate-900 text-emerald-300 p-2.5 rounded-lg text-xs font-mono mt-1.5">
Running on local URL:  http://127.0.0.1:7860&#10;Running on public URL: https://d98a1c92a95c4e8b.gradio.live
              </pre>
              <p className="text-xs text-slate-600 mt-2">
                Click on the <strong className="text-indigo-600 font-mono">*.gradio.live</strong> link, or interact with the Gradio interface directly embedded inside your Colab notebook!
              </p>
            </div>
          </div>
        </div>

        {/* Tip footer */}
        <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Zero manual configuration required — ready to run immediately.
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            Got it, close
          </button>
        </div>
      </div>
    </div>
  );
};
