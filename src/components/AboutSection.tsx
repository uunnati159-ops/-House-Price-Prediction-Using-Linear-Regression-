import React from 'react';
import { Info, Target, Layers, Cpu, ShieldAlert, Rocket, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
          <Info className="w-6 h-6 text-blue-400" />
          About the Major Project
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Detailed academic context, algorithmic foundations, limitations, and future scope
        </p>
      </div>

      {/* Grid of details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Aim & Objective */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2.5 text-blue-400 font-semibold text-base">
            <Target className="w-5 h-5" />
            <h3>Project Aim & Objectives</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            The core aim of this college major project is to design, implement, and deploy an automated Machine Learning pipeline for real estate valuation.
          </p>
          <ul className="space-y-2 text-xs text-slate-300">
            {[
              'Eliminate broker bias and subjective human estimation errors.',
              'Apply standard statistical preprocessing and feature scaling pipelines.',
              'Implement closed-form Ordinary Least Squares (OLS) optimization.',
              'Provide an interactive web interface suitable for real-time demonstration.',
            ].map((text, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Algorithm Overview */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2.5 text-emerald-400 font-semibold text-base">
            <Cpu className="w-5 h-5" />
            <h3>Machine Learning Algorithm</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            The project leverages <strong>Multiple Linear Regression</strong> via scikit-learn.
          </p>
          <div className="bg-slate-950 p-3 rounded-lg font-mono text-xs text-blue-300 border border-slate-800">
            y = β₀ + β₁X₁ + β₂X₂ + ... + βₙXₙ + ε
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            The Ordinary Least Squares (OLS) objective minimizes the Residual Sum of Squares (RSS). The mathematical solution is derived analytically using Normal Equations:
            <code className="text-amber-400 font-mono block mt-1">β = (XᵀX)⁻¹ Xᵀy</code>
          </p>
        </div>

        {/* Technologies Used */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2.5 text-purple-400 font-semibold text-base">
            <Layers className="w-5 h-5" />
            <h3>Technologies & Libraries</h3>
          </div>
          <div className="grid grid-cols-2 gap-2.5 text-xs">
            {[
              { name: 'Python 3.10+', role: 'Primary programming language' },
              { name: 'scikit-learn', role: 'LinearRegression, StandardScaler, metrics' },
              { name: 'pandas & numpy', role: 'Tabular manipulation & matrix math' },
              { name: 'matplotlib & seaborn', role: 'Statistical EDA plotting' },
              { name: 'Streamlit & React', role: 'Interactive user interface' },
              { name: 'Tailwind CSS', role: 'Responsive styling' },
            ].map((t, idx) => (
              <div key={idx} className="p-2.5 bg-slate-800/40 rounded-lg border border-slate-800">
                <span className="font-semibold text-white block">{t.name}</span>
                <span className="text-[11px] text-slate-400">{t.role}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Limitations */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2.5 text-amber-400 font-semibold text-base">
            <ShieldAlert className="w-5 h-5" />
            <h3>Algorithm Limitations</h3>
          </div>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0"></span>
              <span><strong>Linearity Assumption:</strong> Real-world real estate often exhibits non-linear exponential dynamics in luxury sectors.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0"></span>
              <span><strong>Outlier Sensitivity:</strong> OLS squares residuals, making coefficients sensitive to extreme high-end properties.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0"></span>
              <span><strong>Multicollinearity:</strong> Square footage and bedroom count naturally correlate, requiring scaled standardization.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Future Enhancements */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-2.5 text-cyan-400 font-semibold text-base">
          <Rocket className="w-5 h-5" />
          <h3>Future Scope & Enhancements</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="p-3.5 bg-slate-800/40 rounded-lg border border-slate-800">
            <h4 className="font-bold text-white mb-1">1. Non-Linear ML Ensembles</h4>
            <p className="text-slate-400">Implement Random Forest Regressor and XGBoost to capture subtle non-linear interactions and thresholds.</p>
          </div>
          <div className="p-3.5 bg-slate-800/40 rounded-lg border border-slate-800">
            <h4 className="font-bold text-white mb-1">2. Geographic GIS Mapping</h4>
            <p className="text-slate-400">Integrate Google Maps / Leaflet for pin-drop coordinate geocoding, proximity to schools, hospitals, and transit hubs.</p>
          </div>
          <div className="p-3.5 bg-slate-800/40 rounded-lg border border-slate-800">
            <h4 className="font-bold text-white mb-1">3. Computer Vision Valuation</h4>
            <p className="text-slate-400">Use Convolutional Neural Networks (CNNs) to analyze interior photos and score architectural finishes.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
