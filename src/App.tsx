/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { INITIAL_DATASET } from './data/dataset';
import { trainLinearRegression } from './ml/linearRegression';
import { HomeSection } from './components/HomeSection';
import { DatasetSection } from './components/DatasetSection';
import { AnalysisSection } from './components/AnalysisSection';
import { ModelSection } from './components/ModelSection';
import { PredictionSection } from './components/PredictionSection';
import { AboutSection } from './components/AboutSection';
import { DocumentationSection } from './components/DocumentationSection';
import { VivaSection } from './components/VivaSection';
import { CodeViewerSection } from './components/CodeViewerSection';
import {
  Home,
  Database,
  LineChart,
  Cpu,
  Calculator,
  Info,
  BookOpen,
  GraduationCap,
  Code2,
  Menu,
  X,
  Building,
  TrendingUp,
  Sparkles,
} from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [testRatio, setTestRatio] = useState(0.2);
  const [randomSeed, setRandomSeed] = useState(42);

  // Train Linear Regression Model via OLS Normal Equations
  const modelMetrics = useMemo(() => {
    return trainLinearRegression(INITIAL_DATASET, testRatio, randomSeed);
  }, [testRatio, randomSeed]);

  const navItems = [
    { id: 'home', label: '1. 🏠 HOME', icon: Home, badge: 'Overview' },
    { id: 'dataset', label: '2. 📊 DATASET', icon: Database, badge: '650 Rows' },
    { id: 'analysis', label: '3. 📈 DATA ANALYSIS', icon: LineChart, badge: 'EDA Charts' },
    { id: 'model', label: '4. 🧠 MODEL', icon: Cpu, badge: `R²: ${(modelMetrics.r2 * 100).toFixed(1)}%` },
    { id: 'prediction', label: '5. 💰 PRICE PREDICTION', icon: Calculator, badge: 'Live Valuation' },
    { id: 'about', label: '6. ℹ️ ABOUT PROJECT', icon: Info, badge: 'Specifications' },
    { id: 'documentation', label: '📑 PROJECT REPORT', icon: BookOpen, badge: '29 Sections' },
    { id: 'viva', label: '🎓 VIVA VOCE', icon: GraduationCap, badge: '25+ Q&A' },
    { id: 'code', label: '💻 PYTHON CODE (app.py)', icon: Code2, badge: 'Streamlit' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row antialiased selection:bg-blue-600 selection:text-white">
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow">
            <Building className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-sm text-white block leading-tight">House Price Prediction</span>
            <span className="text-[10px] text-blue-400 font-mono">Linear Regression ML</span>
          </div>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-slate-900/95 backdrop-blur-md border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 md:static md:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-5 overflow-y-auto">
          {/* Logo & Project Tag */}
          <div className="flex items-center gap-3 pb-5 border-b border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-sm text-white leading-snug">
                HOUSE PRICE <br />
                <span className="text-blue-400 font-mono text-xs">PREDICTION</span>
              </h1>
              <p className="text-[10px] text-slate-400 font-mono">BCA Major Project</p>
            </div>
          </div>

          {/* Model Status Pill */}
          <div className="mt-4 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-slate-300 font-mono text-[11px]">Model Trained (OLS)</span>
            </div>
            <span className="font-bold font-mono text-emerald-400 text-xs">
              {(modelMetrics.r2 * 100).toFixed(1)}% R²
            </span>
          </div>

          {/* Navigation Items */}
          <nav className="mt-6 space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-3 pb-2 block">
              Project Sections
            </span>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                        isActive
                          ? 'bg-blue-700/60 text-blue-100'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/40 text-[11px] text-slate-400 space-y-1">
          <div className="flex justify-between items-center text-slate-300 font-mono">
            <span>Algorithm:</span>
            <span className="text-blue-400 font-bold">Linear Regression</span>
          </div>
          <div className="flex justify-between items-center text-slate-400 font-mono">
            <span>Dataset:</span>
            <span>650 Records (CSV)</span>
          </div>
          <div className="flex justify-between items-center text-slate-400 font-mono">
            <span>Target:</span>
            <span>House_Price (INR)</span>
          </div>
          <div className="pt-2 text-[10px] text-slate-400 text-center border-t border-slate-800/60">
            Suitable for BCA Major Project & Viva
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Navbar */}
        <header className="hidden md:flex justify-between items-center px-8 py-4 bg-slate-900/60 backdrop-blur-md border-b border-slate-800/80 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-medium">
              ML Pipeline: scikit-learn
            </span>
            <span className="text-slate-400 text-xs">/</span>
            <span className="text-slate-200 text-xs font-semibold capitalize font-mono">
              {activeSection.replace('-', ' ')}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Mean Squared Error:</span>
              <span className="text-slate-200 font-bold">{(modelMetrics.mse / 1e10).toFixed(2)} × 10¹⁰</span>
            </div>
            <div className="w-px h-4 bg-slate-800"></div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400">R² Score:</span>
              <span className="text-emerald-400 font-bold">{(modelMetrics.r2 * 100).toFixed(2)}%</span>
            </div>
          </div>
        </header>

        {/* Section View Container */}
        <div className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full">
          {activeSection === 'home' && (
            <HomeSection
              metrics={modelMetrics}
              totalRecords={INITIAL_DATASET.length}
              onNavigate={(s) => setActiveSection(s)}
            />
          )}

          {activeSection === 'dataset' && (
            <DatasetSection data={INITIAL_DATASET} />
          )}

          {activeSection === 'analysis' && (
            <AnalysisSection data={INITIAL_DATASET} />
          )}

          {activeSection === 'model' && (
            <ModelSection
              metrics={modelMetrics}
              testRatio={testRatio}
              onTestRatioChange={setTestRatio}
              randomSeed={randomSeed}
              onRandomSeedChange={setRandomSeed}
            />
          )}

          {activeSection === 'prediction' && (
            <PredictionSection model={modelMetrics} />
          )}

          {activeSection === 'about' && (
            <AboutSection />
          )}

          {activeSection === 'documentation' && (
            <DocumentationSection />
          )}

          {activeSection === 'viva' && (
            <VivaSection />
          )}

          {activeSection === 'code' && (
            <CodeViewerSection />
          )}
        </div>

        {/* Footer */}
        <footer className="mt-auto border-t border-slate-800/80 bg-slate-900/40 p-6 text-center text-xs text-slate-400">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
            <p>
              College Major Project: <strong>HOUSE PRICE PREDICTION USING LINEAR REGRESSION</strong>
            </p>
            <p className="text-[11px] text-slate-400 font-mono">
              Pure Supervised Machine Learning • Scikit-Learn • Streamlit • Python
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
