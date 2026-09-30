import React, { useState } from 'react';
import { 
  X, 
  Github, 
  Copy, 
  Check, 
  ExternalLink, 
  Terminal, 
  ShieldCheck, 
  ArrowRight,
  GitBranch,
  FolderGit2
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [repoUrl, setRepoUrl] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const sampleUrl = repoUrl.trim() || 'https://github.com/YOUR_USERNAME/ai-resume-agent.git';

  const commands = [
    `git remote add origin ${sampleUrl}`,
    `git branch -M main`,
    `git push -u origin main`
  ];

  const fullBash = `# 1. Link your remote repository\ngit remote add origin ${sampleUrl}\n\n# 2. Set main branch\ngit branch -M main\n\n# 3. Push all code, notebook (.ipynb) and README\ngit push -u origin main`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8 border border-slate-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
            <Github className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Push to GitHub
            </h2>
            <p className="text-xs text-slate-500">
              Your local Git repository is already initialized and committed on branch <code>main</code>!
            </p>
          </div>
        </div>

        {/* Status Pill */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-center gap-2.5 text-xs text-emerald-900 mb-5">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>
            <strong>Git commit ready:</strong> Includes <code>AI_Resume_Improvement_Agent.ipynb</code>, <code>ai_resume_agent.py</code>, <code>README.md</code>, and all source files.
          </span>
        </div>

        {/* Step by step */}
        <div className="space-y-4 text-xs text-slate-700">
          <div>
            <label className="block font-semibold text-slate-900 mb-1">
              1. Create a new repository on GitHub:
            </label>
            <a
              href="https://github.com/new"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium rounded-lg transition-colors"
            >
              Open github.com/new <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>
            <span className="text-slate-500 ml-2">(leave README and .gitignore unchecked)</span>
          </div>

          <div>
            <label className="block font-semibold text-slate-900 mb-1">
              2. Paste your GitHub repository URL here to generate exact commands:
            </label>
            <input
              type="text"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="https://github.com/YOUR_USERNAME/ai-resume-agent.git"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-slate-900">
                3. Run these commands to push:
              </label>
              <button
                onClick={() => handleCopy(fullBash, 99)}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 cursor-pointer"
              >
                {copiedIndex === 99 ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedIndex === 99 ? 'Copied script!' : 'Copy All Commands'}
              </button>
            </div>

            <div className="bg-slate-950 rounded-xl p-3.5 space-y-2 font-mono text-slate-200">
              {commands.map((cmd, i) => (
                <div key={i} className="flex items-center justify-between gap-2 group">
                  <span className="text-slate-300 select-all">$ {cmd}</span>
                  <button
                    onClick={() => handleCopy(cmd, i)}
                    className="opacity-60 hover:opacity-100 text-slate-400 hover:text-white p-1 rounded transition-opacity cursor-pointer"
                    title="Copy command"
                  >
                    {copiedIndex === i ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Or reply with your repository URL to push directly from here.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-medium transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
