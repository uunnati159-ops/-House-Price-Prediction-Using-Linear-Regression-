import React, { useState } from 'react';
import { PROJECT_DOC_CODE } from '../data/projectFiles';
import { BookOpen, Copy, Download, Check, Search, ListFilter } from 'lucide-react';

export const DocumentationSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [searchDoc, setSearchDoc] = useState('');

  const handleCopy = () => {
    navigator.clipboard.writeText(PROJECT_DOC_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([PROJECT_DOC_CODE], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'project_documentation.md');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const sections = [
    '1. Project Title', '2. Abstract', '3. Introduction', '4. Problem Statement', '5. Aim',
    '6. Objectives', '7. Existing System', '8. Proposed System', '9. Scope of the Project',
    '10. Literature / Background', '11. Technologies Used', '12. Hardware Requirements',
    '13. Software Requirements', '14. Dataset Description', '15. Data Preprocessing',
    '16. Exploratory Data Analysis', '17. Feature Selection', '18. Linear Regression Algorithm',
    '19. Model Training', '20. Model Evaluation', '21. System Architecture', '22. Modules Description',
    '23. Working Methodology', '24. Step-by-Step Algorithm', '25. Advantages', '26. Limitations',
    '27. Future Enhancements', '28. Expected Results', '29. Conclusion'
  ];

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-5">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <BookOpen className="w-6 h-6 text-purple-400" />
            College Major Project Documentation
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Complete 29-section academic project report prepared for major project submission
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Full Report!' : 'Copy Markdown'}</span>
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .md</span>
          </button>
        </div>
      </div>

      {/* Index Badges */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <ListFilter className="w-3.5 h-3.5" />
          Quick Sections Index (29 Academic Report Sections)
        </h4>
        <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto">
          {sections.map((s, idx) => (
            <span
              key={idx}
              className="text-[11px] font-mono bg-slate-800/80 border border-slate-700 text-slate-300 px-2 py-1 rounded"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Full Document Viewer */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl">
        <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">
              MAJOR PROJECT REPORT: HOUSE PRICE PREDICTION USING LINEAR REGRESSION
            </h1>
            <p className="text-xs font-mono text-purple-400">
              Department of Computer Science & Applications • BCA Major Project
            </p>
          </div>

          <pre className="whitespace-pre-wrap font-sans text-xs sm:text-sm text-slate-300 bg-transparent p-0 overflow-visible leading-relaxed">
            {PROJECT_DOC_CODE}
          </pre>
        </div>
      </div>
    </div>
  );
};
