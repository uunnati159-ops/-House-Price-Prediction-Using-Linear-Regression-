import React from 'react';
import { ModelMetrics, formatINR, formatINRLakhCrore } from '../ml/linearRegression';
import { CheckCircle2, TrendingUp, Layers, Cpu, ArrowRight, ShieldCheck, Database, Award } from 'lucide-react';

interface HomeSectionProps {
  metrics: ModelMetrics;
  totalRecords: number;
  onNavigate: (section: string) => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({ metrics, totalRecords, onNavigate }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 border border-blue-900/50 p-8 shadow-2xl">
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-16 -bottom-16 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold mb-4">
            <Award className="w-3.5 h-3.5" />
            BCA / B.Tech Computer Science Major Project
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            HOUSE PRICE PREDICTION <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">
              USING LINEAR REGRESSION
            </span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            An end-to-end Machine Learning web application implementing the <strong>Ordinary Least Squares (OLS) Multiple Linear Regression</strong> algorithm to accurately value residential real estate based on structural and spatial features.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate('prediction')}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-blue-600/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Predict House Price</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('model')}
              className="inline-flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 font-semibold px-6 py-3 rounded-xl transition-all cursor-pointer"
            >
              <Cpu className="w-4 h-4 text-blue-400" />
              <span>Inspect ML Model</span>
            </button>
            <button
              onClick={() => onNavigate('viva')}
              className="inline-flex items-center gap-2 bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-800/50 text-emerald-300 font-semibold px-6 py-3 rounded-xl transition-all cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Viva Preparation (25+ Q&A)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-sm hover:border-slate-700 transition-colors">
          <div className="flex justify-between items-start">
            <span className="text-xs font-medium text-slate-400">Model Accuracy (R² Score)</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl font-bold font-mono text-emerald-400">
            {(metrics.r2 * 100).toFixed(2)}%
          </div>
          <p className="mt-1 text-xs text-slate-400">Variance in price explained by features</p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-sm hover:border-slate-700 transition-colors">
          <div className="flex justify-between items-start">
            <span className="text-xs font-medium text-slate-400">Root Mean Sq. Error (RMSE)</span>
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
              <Cpu className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl font-bold font-mono text-blue-400">
            {formatINR(metrics.rmse)}
          </div>
          <p className="mt-1 text-xs text-slate-400">Average valuation deviation</p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-sm hover:border-slate-700 transition-colors">
          <div className="flex justify-between items-start">
            <span className="text-xs font-medium text-slate-400">Mean Absolute Error (MAE)</span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl font-bold font-mono text-amber-400">
            {formatINR(metrics.mae)}
          </div>
          <p className="mt-1 text-xs text-slate-400">L1 average absolute difference</p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-sm hover:border-slate-700 transition-colors">
          <div className="flex justify-between items-start">
            <span className="text-xs font-medium text-slate-400">Dataset Records</span>
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <Database className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl font-bold font-mono text-purple-400">
            {totalRecords} Rows
          </div>
          <p className="mt-1 text-xs text-slate-400">8 features + 1 target (House_Price)</p>
        </div>
      </div>

      {/* Project Objective & Workflow */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
            Project Objective & Significance
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed mb-4">
            In residential real estate, property values are conventionally estimated through subjective appraisals or speculative broker quotes. This project creates an automated, deterministic machine learning model using <strong>Multiple Linear Regression</strong> to establish a scientific valuation benchmark.
          </p>
          <div className="space-y-3">
            {[
              {
                title: 'Data Preprocessing & Standardization',
                desc: 'Cleaning missing values, removing duplicates, and applying Z-score StandardScaler scaling.',
              },
              {
                title: 'Exploratory Data Analysis (EDA)',
                desc: 'Investigating feature distributions, multicollinearity, and pairwise Pearson correlations.',
              },
              {
                title: 'Mathematical Rigor with OLS',
                desc: 'Minimizing residual sum of squares via closed-form Normal Equations β = (XᵀX)⁻¹Xᵀy.',
              },
              {
                title: 'Transparent Interpretability',
                desc: 'Unpacking learned regression weights so users understand the exact monetary worth of each square foot.',
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-slate-200">{item.title}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
              Major Project Architecture Flow
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Step-by-step pipeline executed from raw dataset ingestion to final house valuation:
            </p>

            <div className="space-y-2 relative">
              <div className="absolute left-3.5 top-3 bottom-3 w-0.5 bg-slate-700"></div>

              {[
                { step: '1', title: 'Data Ingestion', desc: 'Load house_prices.csv (650 records)' },
                { step: '2', title: 'Data Preprocessing', desc: 'Median imputation & StandardScaler' },
                { step: '3', title: 'Train/Test Split', desc: '80% Training (520) / 20% Testing (130)' },
                { step: '4', title: 'Linear Regression (OLS)', desc: 'Fit weights β with Normal Equations' },
                { step: '5', title: 'Model Evaluation', desc: 'Calculate MSE, RMSE, and R² Score' },
                { step: '6', title: 'Price Prediction', desc: 'Input property features ➔ Price in ₹' },
              ].map((s) => (
                <div key={s.step} className="flex items-center gap-3 relative z-10 pl-1">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0 shadow">
                    {s.step}
                  </div>
                  <div className="bg-slate-800/60 border border-slate-700/60 px-3 py-1.5 rounded-md flex-1 flex justify-between items-center">
                    <span className="text-xs font-medium text-slate-200">{s.title}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{s.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigate('prediction')}
            className="mt-6 w-full py-2.5 px-4 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 text-xs font-semibold rounded-xl text-center transition-colors cursor-pointer"
          >
            Launch Interactive Valuation Form ➔
          </button>
        </div>
      </div>
    </div>
  );
};
