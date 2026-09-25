import React, { useState } from 'react';
import { VIVA_QUESTIONS, VivaItem } from '../data/vivaList';
import { VIVA_QUESTIONS_CODE } from '../data/projectFiles';
import {
  GraduationCap,
  Search,
  ChevronDown,
  ChevronUp,
  Download,
  Copy,
  Check,
  HelpCircle,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
} from 'lucide-react';

export const VivaSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<number | null>(1);
  const [quizMode, setQuizMode] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [revealQuizAnswer, setRevealQuizAnswer] = useState(false);
  const [copied, setCopied] = useState(false);

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(VIVA_QUESTIONS.map((q) => q.category)))];

  const filteredQuestions = VIVA_QUESTIONS.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(VIVA_QUESTIONS_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([VIVA_QUESTIONS_CODE], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'viva_questions.md');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const currentQuizItem = filteredQuestions[quizIndex] || VIVA_QUESTIONS[0];

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-5">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <GraduationCap className="w-6 h-6 text-emerald-400" />
            Viva Voce Examination Preparation (25+ Q&A)
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Carefully curated examination questions with model answers for college project defense
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setQuizMode(!quizMode)}
            className={`px-3.5 py-2 border rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              quizMode
                ? 'bg-amber-600 border-amber-500 text-white'
                : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{quizMode ? 'Exit Flashcards' : 'Practice Flashcard Mode'}</span>
          </button>
          <button
            onClick={handleCopy}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Q&A'}</span>
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .md</span>
          </button>
        </div>
      </div>

      {quizMode ? (
        /* Flashcard Quiz Practice Mode */
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-2xl mx-auto shadow-2xl space-y-6">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span className="font-mono bg-blue-950/70 border border-blue-800 text-blue-300 px-2.5 py-1 rounded">
              Card {quizIndex + 1} of {filteredQuestions.length}
            </span>
            <span className="text-emerald-400 font-semibold">{currentQuizItem.category}</span>
          </div>

          <div className="min-h-[140px] flex items-center justify-center p-6 bg-slate-950/80 rounded-xl border border-slate-800 text-center">
            <h3 className="text-lg font-bold text-white leading-relaxed">
              Q{currentQuizItem.id}: {currentQuizItem.question}
            </h3>
          </div>

          {revealQuizAnswer ? (
            <div className="p-5 bg-emerald-950/30 border border-emerald-800/40 rounded-xl text-xs sm:text-sm text-slate-200 leading-relaxed animate-fadeIn">
              <strong className="text-emerald-400 block mb-2">Model Answer:</strong>
              {currentQuizItem.answer}
            </div>
          ) : (
            <button
              onClick={() => setRevealQuizAnswer(true)}
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-colors cursor-pointer border border-slate-700"
            >
              Reveal Model Answer ➔
            </button>
          )}

          <div className="flex justify-between items-center pt-4 border-t border-slate-800">
            <button
              disabled={quizIndex === 0}
              onClick={() => {
                setQuizIndex((prev) => Math.max(0, prev - 1));
                setRevealQuizAnswer(false);
              }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-xs font-semibold text-slate-300 rounded-lg flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous Question</span>
            </button>

            <button
              onClick={() => {
                setQuizIndex(0);
                setRevealQuizAnswer(false);
              }}
              className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Restart
            </button>

            <button
              disabled={quizIndex === filteredQuestions.length - 1}
              onClick={() => {
                setQuizIndex((prev) => Math.min(filteredQuestions.length - 1, prev + 1));
                setRevealQuizAnswer(false);
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-30 text-xs font-semibold text-white rounded-lg flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
            >
              <span>Next Question</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        /* Full Question & Answer Accordion List */
        <div className="space-y-6">
          {/* Controls bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search viva questions (e.g. MSE, R2, OLS, scaling, overfitting)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {categories.slice(0, 6).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs text-slate-400 flex justify-between items-center">
            <span>Showing {filteredQuestions.length} of {VIVA_QUESTIONS.length} Questions</span>
            <div className="flex gap-2">
              <button
                onClick={() => setExpandedId(-1)}
                className="text-slate-400 hover:text-slate-200 underline cursor-pointer"
              >
                Collapse All
              </button>
            </div>
          </div>

          {/* Accordion Items */}
          <div className="space-y-3">
            {filteredQuestions.map((item) => {
              const isExpanded = expandedId === item.id;
              return (
                <div
                  key={item.id}
                  className={`border rounded-xl transition-all duration-200 ${
                    isExpanded
                      ? 'bg-slate-900 border-emerald-500/50 shadow-lg'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    className="w-full p-4.5 flex justify-between items-center text-left gap-4 cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 font-mono">
                        {item.id}
                      </span>
                      <div>
                        <h4 className="text-sm font-semibold text-white">{item.question}</h4>
                        <span className="text-[10px] text-emerald-400 font-mono mt-0.5 inline-block">
                          Category: {item.category}
                        </span>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 border-t border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans bg-slate-950/40 rounded-b-xl animate-fadeIn">
                      <div className="p-3.5 bg-emerald-950/20 border border-emerald-900/30 rounded-lg">
                        <strong className="text-emerald-300 block mb-1 font-semibold">Model Answer:</strong>
                        <p className="whitespace-pre-line text-slate-200">{item.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
