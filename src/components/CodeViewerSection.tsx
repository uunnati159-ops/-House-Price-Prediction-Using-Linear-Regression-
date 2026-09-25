import React, { useState } from 'react';
import {
  APP_PY_CODE,
  REQUIREMENTS_TXT_CODE,
  README_MD_CODE,
  PROJECT_DOC_CODE,
  VIVA_QUESTIONS_CODE,
} from '../data/projectFiles';
import { RAW_CSV_DATA } from '../data/dataset';
import { Code2, Copy, Download, Check, FileCode, FileText, Database } from 'lucide-react';

export const CodeViewerSection: React.FC = () => {
  const [activeFile, setActiveFile] = useState<string>('app.py');
  const [copied, setCopied] = useState(false);

  const filesMap: { [key: string]: { code: string; ext: string; desc: string; icon: any } } = {
    'app.py': {
      code: APP_PY_CODE,
      ext: 'python',
      desc: 'Complete Streamlit Web Application & Machine Learning Pipeline',
      icon: FileCode,
    },
    'house_prices.csv': {
      code: RAW_CSV_DATA,
      ext: 'csv',
      desc: '650-Row Residential Real Estate Dataset with 8 Features & Target',
      icon: Database,
    },
    'requirements.txt': {
      code: REQUIREMENTS_TXT_CODE,
      ext: 'text',
      desc: 'Python Dependencies (streamlit, scikit-learn, pandas, numpy, matplotlib, seaborn)',
      icon: FileText,
    },
    'README.md': {
      code: README_MD_CODE,
      ext: 'markdown',
      desc: 'Installation and Execution Guide for Local Terminal Setup',
      icon: FileText,
    },
    'project_documentation.md': {
      code: PROJECT_DOC_CODE,
      ext: 'markdown',
      desc: 'Complete 29-Section College Major Project Report',
      icon: FileText,
    },
    'viva_questions.md': {
      code: VIVA_QUESTIONS_CODE,
      ext: 'markdown',
      desc: '25+ Viva Voce Questions & Model Answers for Project Defense',
      icon: FileText,
    },
  };

  const currentFile = filesMap[activeFile];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const mimeTypes: { [key: string]: string } = {
      python: 'text/x-python',
      csv: 'text/csv',
      text: 'text/plain',
      markdown: 'text/markdown',
    };
    const blob = new Blob([currentFile.code], { type: `${mimeTypes[currentFile.ext] || 'text/plain'};charset=utf-8;` });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', activeFile);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-5">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <Code2 className="w-6 h-6 text-cyan-400" />
            Project Source Code & Files Exporter
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Download or copy complete runnable Python and dataset files for local execution and submission
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied File!' : 'Copy Code'}</span>
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download {activeFile}</span>
          </button>
        </div>
      </div>

      {/* File Tabs */}
      <div className="flex flex-wrap gap-2">
        {Object.keys(filesMap).map((fileName) => {
          const ItemIcon = filesMap[fileName].icon;
          const isActive = activeFile === fileName;
          return (
            <button
              key={fileName}
              onClick={() => setActiveFile(fileName)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 border border-blue-500'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800 hover:bg-slate-800'
              }`}
            >
              <ItemIcon className="w-3.5 h-3.5" />
              <span>{fileName}</span>
            </button>
          );
        })}
      </div>

      {/* File Description Banner */}
      <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl text-xs text-slate-300 flex items-center justify-between">
        <div>
          <span className="text-slate-500 font-mono mr-2">File Info:</span>
          <strong className="text-white font-mono">{activeFile}</strong> — {currentFile.desc}
        </div>
        <span className="text-slate-400 font-mono text-[11px]">
          {currentFile.code.split('\n').length} lines • {(currentFile.code.length / 1024).toFixed(1)} KB
        </span>
      </div>

      {/* Code Display Area */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="bg-slate-900/80 px-4 py-2.5 border-b border-slate-800 flex justify-between items-center text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block"></span>
            <span className="ml-2 font-mono text-slate-400">{activeFile}</span>
          </div>
          <span className="text-[11px] text-slate-500 font-mono uppercase">{currentFile.ext}</span>
        </div>

        <div className="p-5 max-h-[550px] overflow-y-auto">
          <pre className="text-xs font-mono text-slate-200 leading-relaxed overflow-x-auto whitespace-pre">
            {currentFile.code}
          </pre>
        </div>
      </div>
    </div>
  );
};
