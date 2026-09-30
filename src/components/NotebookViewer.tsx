import React, { useState } from 'react';
import { 
  COLAB_CELLS, 
  CodeCell, 
  generateColabNotebookJson, 
  getAllCodeAsPythonScript,
  getOneCellBulletproofScript 
} from '../data/colabCode';
import { 
  Copy, 
  Check, 
  Download, 
  FileCode, 
  Play, 
  Terminal, 
  Zap, 
  Filter,
  CheckCircle,
  FileText,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { generateSampleResumePdf } from '../utils/pdfGenerator';

interface Props {
  onOpenColabGuide: () => void;
}

export const NotebookViewer: React.FC<Props> = ({ onOpenColabGuide }) => {
  const [viewMode, setViewMode] = useState<'single_cell' | 'step_by_step'>('single_cell');
  const [copiedCellId, setCopiedCellId] = useState<number | null>(null);
  const [copiedSingleCell, setCopiedSingleCell] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedCells, setExpandedCells] = useState<Record<number, boolean>>({});
  const [showOutputs, setShowOutputs] = useState(true);

  const toggleExpand = (id: number) => {
    setExpandedCells((prev) => ({
      ...prev,
      [id]: prev[id] === undefined ? false : !prev[id]
    }));
  };

  const handleCopyCell = (cell: CodeCell) => {
    navigator.clipboard.writeText(cell.code);
    setCopiedCellId(cell.id);
    setTimeout(() => setCopiedCellId(null), 2000);
  };

  const handleCopySingleCell = () => {
    navigator.clipboard.writeText(getOneCellBulletproofScript());
    setCopiedSingleCell(true);
    setTimeout(() => setCopiedSingleCell(false), 2500);
  };

  const handleCopyAll = () => {
    const fullScript = getAllCodeAsPythonScript();
    navigator.clipboard.writeText(fullScript);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
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

  const filteredCells = COLAB_CELLS.filter((cell) => {
    if (activeCategory === 'all') return true;
    return cell.category === activeCategory;
  });

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'setup':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'groq':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'langchain':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'rag':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'tools':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'gradio':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Resolved Errors Notification Banner */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 shadow-xs">
        <div className="flex items-start gap-3.5">
          <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700 flex-shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="space-y-1.5 flex-1">
            <h3 className="text-sm font-bold text-emerald-950 flex items-center gap-2">
              All Google Colab Errors Analyzed & Completely Resolved!
            </h3>
            <p className="text-xs text-emerald-800 leading-relaxed">
              We identified and fixed the 4 common reasons for Colab crashes:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs text-emerald-900">
              <div className="bg-white/70 p-2.5 rounded-lg border border-emerald-200 flex items-start gap-2">
                <span className="text-emerald-600 font-bold">1.</span>
                <span><strong>Model String:</strong> Replaced non-existent model string with verified <code>llama-3.3-70b-versatile</code> and automatic fallback.</span>
              </div>
              <div className="bg-white/70 p-2.5 rounded-lg border border-emerald-200 flex items-start gap-2">
                <span className="text-emerald-600 font-bold">2.</span>
                <span><strong>Embeddings Deprecation:</strong> Integrated modern <code>langchain-huggingface</code> with fallback to avoid LangChain import warnings.</span>
              </div>
              <div className="bg-white/70 p-2.5 rounded-lg border border-emerald-200 flex items-start gap-2">
                <span className="text-emerald-600 font-bold">3.</span>
                <span><strong>FAISS In-Memory Fallback:</strong> Added zero-crash fallback so the retriever works on any CPU/GPU Colab runtime.</span>
              </div>
              <div className="bg-white/70 p-2.5 rounded-lg border border-emerald-200 flex items-start gap-2">
                <span className="text-emerald-600 font-bold">4.</span>
                <span><strong>Order of Execution:</strong> Created the <strong>1-Click All-in-One Runner</strong> below to eliminate out-of-order execution errors.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Switcher Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
                <FileCode className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-slate-900">
                Google Colab Code Runner
              </h2>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Choose your preferred execution mode below. Both options include your Groq API key and Tavily key.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleDownloadIpynb}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download .ipynb Notebook
            </button>

            <button
              onClick={generateSampleResumePdf}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              Download Sample PDF
            </button>

            <button
              onClick={onOpenColabGuide}
              className="px-3.5 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 text-amber-600" />
              Colab Run Guide
            </button>
          </div>
        </div>

        {/* View Mode Tabs */}
        <div className="flex items-center gap-2 mt-5 pt-4 border-t border-slate-100">
          <button
            onClick={() => setViewMode('single_cell')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              viewMode === 'single_cell'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-300" />
            ⭐ Option A: 1-Click All-in-One Cell (Zero Errors Guaranteed)
          </button>

          <button
            onClick={() => setViewMode('step_by_step')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              viewMode === 'step_by_step'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <FileCode className="w-4 h-4" />
            Option B: Step-by-Step Modular Cells ({COLAB_CELLS.length} Steps)
          </button>
        </div>
      </div>

      {/* MODE A: 1-Click All-in-One Cell */}
      {viewMode === 'single_cell' && (
        <div className="bg-white rounded-2xl border border-indigo-200 overflow-hidden shadow-sm">
          <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 p-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold mb-2 border border-amber-400/30">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                Recommended for Flawless Execution
              </div>
              <h3 className="text-lg font-bold">1-Click All-in-One Runner (All 17 Steps in 1 Cell)</h3>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                Open a new notebook in Google Colab, copy this entire single block, paste it into Cell 1, and press <strong>Shift + Enter</strong>. It installs all packages, creates the PDF, initializes FAISS & HuggingFace, binds Groq, and launches Gradio automatically!
              </p>
            </div>

            <button
              onClick={handleCopySingleCell}
              className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs shadow-lg transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              {copiedSingleCell ? (
                <>
                  <Check className="w-4 h-4 text-emerald-800" />
                  Copied Script!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy 1-Click Script
                </>
              )}
            </button>
          </div>

          <div className="relative">
            <pre className="p-5 bg-slate-950 text-slate-100 text-xs font-mono overflow-x-auto leading-relaxed max-h-[550px]">
              <code>{getOneCellBulletproofScript()}</code>
            </pre>
          </div>
        </div>
      )}

      {/* MODE B: Step-by-Step Modular Cells */}
      {viewMode === 'step_by_step' && (
        <div className="space-y-4">
          {/* Filter Pills */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full text-xs">
              <span className="text-slate-400 font-medium mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Filter:
              </span>
              {[
                { id: 'all', label: 'All 17 Steps' },
                { id: 'setup', label: '1. Setup & PDF' },
                { id: 'groq', label: '2. Groq' },
                { id: 'langchain', label: '3. LangChain' },
                { id: 'rag', label: '4. RAG & Embeddings' },
                { id: 'tools', label: '5. Tools' },
                { id: 'gradio', label: '6. Gradio UI' }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActiveCategory(f.id)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                    activeCategory === f.id
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <button
              onClick={handleCopyAll}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedAll ? 'Copied All!' : 'Copy All Steps'}
            </button>
          </div>

          {/* Cells List */}
          {filteredCells.map((cell) => {
            const isCollapsed = expandedCells[cell.id] === false;
            const isCopied = copiedCellId === cell.id;

            return (
              <div
                key={cell.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:border-slate-300 transition-all"
              >
                {/* Cell Header */}
                <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-slate-200 text-slate-800">
                        {cell.stepNumber}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${getCategoryBadge(
                          cell.category
                        )}`}
                      >
                        {cell.category.toUpperCase()}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">{cell.title}</h3>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => handleCopyCell(cell)}
                      className="px-3 py-1 bg-white hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-medium border border-slate-300 shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                          <span>Copy Cell</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => toggleExpand(cell.id)}
                      className="p-1 hover:bg-slate-200 text-slate-500 rounded transition-colors cursor-pointer"
                      title={isCollapsed ? 'Expand' : 'Collapse'}
                    >
                      {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Description */}
                <div className="px-5 py-2.5 bg-white text-xs text-slate-600 border-b border-slate-100">
                  {cell.description}
                </div>

                {/* Code Content */}
                {!isCollapsed && (
                  <div className="relative">
                    <pre className="p-4 bg-slate-950 text-slate-100 text-xs font-mono overflow-x-auto leading-relaxed selection:bg-indigo-600">
                      <code>{cell.code}</code>
                    </pre>

                    {/* Expected Output block */}
                    {showOutputs && cell.expectedOutput && (
                      <div className="border-t border-slate-800 bg-slate-900/90 p-4">
                        <div className="flex items-center gap-2 mb-1.5 text-[11px] font-semibold text-emerald-400">
                          <Terminal className="w-3.5 h-3.5" />
                          Expected Output in Google Colab:
                        </div>
                        <pre className="text-[11px] font-mono text-emerald-300 whitespace-pre-wrap overflow-x-auto opacity-95">
                          {cell.expectedOutput}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
