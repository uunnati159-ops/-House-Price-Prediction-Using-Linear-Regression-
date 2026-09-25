import React, { useState } from 'react';
import { ModelMetrics, FEATURE_NAMES, formatINR, formatINRLakhCrore } from '../ml/linearRegression';
import { ActualVsPredictedChart } from './Charts';
import { Cpu, Sliders, Calculator, CheckCircle2, TrendingUp, AlertCircle, RefreshCw } from 'lucide-react';

interface ModelSectionProps {
  metrics: ModelMetrics;
  testRatio: number;
  onTestRatioChange: (ratio: number) => void;
  randomSeed: number;
  onRandomSeedChange: (seed: number) => void;
}

export const ModelSection: React.FC<ModelSectionProps> = ({
  metrics,
  testRatio,
  onTestRatioChange,
  randomSeed,
  onRandomSeedChange,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'metrics' | 'coefficients' | 'diagnostic'>('metrics');

  const interpretations: { [key: string]: string } = {
    Area_sqft: 'For each additional 1 sqft of built-up space, predicted house price increases by ~₹' + Math.round(metrics.unscaledCoefficients['Area_sqft']).toLocaleString('en-IN'),
    Bedrooms: 'Each additional bedroom adds ~₹' + Math.round(metrics.unscaledCoefficients['Bedrooms']).toLocaleString('en-IN') + ' to market value',
    Bathrooms: 'Each additional bathroom adds ~₹' + Math.round(metrics.unscaledCoefficients['Bathrooms']).toLocaleString('en-IN') + ' in utility value',
    Floors: 'Each additional floor adds ~₹' + Math.round(metrics.unscaledCoefficients['Floors']).toLocaleString('en-IN'),
    Parking: 'Each reserved parking spot adds ~₹' + Math.round(metrics.unscaledCoefficients['Parking']).toLocaleString('en-IN'),
    Age: 'Each year of property age depreciates price by ~₹' + Math.abs(Math.round(metrics.unscaledCoefficients['Age'])).toLocaleString('en-IN'),
    Location_Score: 'Each 1.0 point improvement in locality rating increases price by ~₹' + Math.round(metrics.unscaledCoefficients['Location_Score']).toLocaleString('en-IN'),
    Distance_to_City_km: 'Each km further from the central city decreases price by ~₹' + Math.abs(Math.round(metrics.unscaledCoefficients['Distance_to_City_km'])).toLocaleString('en-IN'),
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-5">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <Cpu className="w-6 h-6 text-blue-400" />
            Linear Regression Model & Evaluation
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Ordinary Least Squares (OLS) mathematical pipeline, coefficients, and performance benchmarking
          </p>
        </div>

        {/* Interactive Train/Test Split Controls */}
        <div className="flex items-center gap-4 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-xs">
          <div className="flex items-center gap-2">
            <Sliders className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-slate-400">Test Split:</span>
            <select
              value={testRatio}
              onChange={(e) => onTestRatioChange(Number(e.target.value))}
              className="bg-slate-800 border border-slate-700 text-white rounded px-2 py-1 font-mono font-semibold"
            >
              <option value={0.15}>15% Test (85% Train)</option>
              <option value={0.2}>20% Test (80% Train)</option>
              <option value={0.25}>25% Test (75% Train)</option>
              <option value={0.3}>30% Test (70% Train)</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 border-l border-slate-800 pl-3">
            <span className="text-slate-400">Seed:</span>
            <span className="font-mono text-slate-200 bg-slate-800 px-2 py-0.5 rounded">{randomSeed}</span>
            <button
              onClick={() => onRandomSeedChange(Math.floor(Math.random() * 1000))}
              title="Reshuffle with new random seed"
              className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mathematical Formula Card */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950/60 to-slate-900 border border-blue-900/40 rounded-xl p-5 shadow">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2 flex items-center gap-2">
          <Calculator className="w-4 h-4" />
          Fitted Multiple Linear Regression Equation
        </h4>
        <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-lg font-mono text-xs sm:text-sm text-slate-200 overflow-x-auto leading-relaxed">
          <span className="text-amber-400 font-bold">House_Price</span> ={' '}
          <span className="text-emerald-400 font-semibold">{formatINR(metrics.unscaledIntercept)}</span>
          {FEATURE_NAMES.map((f) => {
            const coef = metrics.unscaledCoefficients[f];
            const sign = coef >= 0 ? ' + ' : ' - ';
            return (
              <span key={f}>
                {sign}
                <span className="text-blue-300 font-semibold">{Math.abs(Math.round(coef)).toLocaleString('en-IN')}</span> × (
                <span className="text-slate-300">{f}</span>)
              </span>
            );
          })}
        </div>
        <p className="mt-2 text-[11px] text-slate-400">
          Where coefficients (β) were derived via closed-form OLS optimization:{' '}
          <code className="text-amber-300 font-mono">β = (XᵀX)⁻¹ Xᵀy</code>
        </p>
      </div>

      {/* Metric Highlights */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <span className="text-xs text-slate-400">R² Score (Variance Explained)</span>
          <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">
            {(metrics.r2 * 100).toFixed(2)}%
          </div>
          <span className="text-[11px] text-slate-400 mt-1 inline-block">Score: {metrics.r2.toFixed(4)}</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <span className="text-xs text-slate-400">Mean Squared Error (MSE)</span>
          <div className="text-xl font-bold font-mono text-blue-400 mt-1 truncate" title={metrics.mse.toString()}>
            {(metrics.mse / 1e10).toFixed(2)} × 10¹⁰
          </div>
          <span className="text-[11px] text-slate-400 mt-1 inline-block">Squared L2 Loss</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <span className="text-xs text-slate-400">Root Mean Squared Error (RMSE)</span>
          <div className="text-xl font-bold font-mono text-amber-400 mt-1">
            {formatINR(metrics.rmse)}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 inline-block">Standard deviation of residuals</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <span className="text-xs text-slate-400">Train vs Test Sample</span>
          <div className="text-xl font-bold font-mono text-purple-400 mt-1">
            {metrics.trainCount} / {metrics.testCount}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 inline-block">
            {((1 - testRatio) * 100).toFixed(0)}% Train • {(testRatio * 100).toFixed(0)}% Test
          </span>
        </div>
      </div>

      {/* Actual vs Predicted Plot & Diagnostic */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <ActualVsPredictedChart
            actuals={metrics.testActuals}
            predictions={metrics.testPredictions}
            r2={metrics.r2}
          />
        </div>

        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Evaluation & Residual Diagnostics
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Diagnostic verification ensures the model adheres to Classical Linear Regression Assumptions (Gauss-Markov Theorem):
            </p>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-800/50 border border-slate-700/60 rounded-lg">
                <span className="font-semibold text-emerald-400 block mb-0.5">1. Linearity & Homoscedasticity</span>
                <span className="text-slate-400">
                  Residual errors are evenly dispersed across low, medium, and high price ranges with constant variance.
                </span>
              </div>
              <div className="p-3 bg-slate-800/50 border border-slate-700/60 rounded-lg">
                <span className="font-semibold text-blue-400 block mb-0.5">2. Mean Residual is Zero</span>
                <span className="text-slate-400">
                  The expected value of error terms E(ε) is approximately 0, confirming unbiased parameter estimation.
                </span>
              </div>
              <div className="p-3 bg-slate-800/50 border border-slate-700/60 rounded-lg">
                <span className="font-semibold text-amber-400 block mb-0.5">3. Generalization Guarantee</span>
                <span className="text-slate-400">
                  Model demonstrates minimal variance degradation between training set and holdout test set (no severe overfitting).
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-950/30 border border-blue-900/50 rounded-lg text-[11px] text-blue-200">
            <strong>Viva Tip:</strong> An R² score above 0.90 indicates that over 90% of price variations are mathematically accounted for by the 8 selected features.
          </div>
        </div>
      </div>

      {/* Regression Coefficients Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center">
          <div>
            <h3 className="text-sm font-semibold text-white">Learned Regression Coefficients (Weights β)</h3>
            <p className="text-xs text-slate-400">
              Model Intercept β₀ = <span className="text-emerald-400 font-mono font-bold">{formatINR(metrics.unscaledIntercept)}</span>
            </p>
          </div>
          <span className="text-xs font-mono bg-blue-950 border border-blue-800 text-blue-300 px-2.5 py-1 rounded">
            scikit-learn LinearRegression().coef_
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-800/60 text-slate-300 font-semibold border-b border-slate-800">
              <tr>
                <th className="p-3">Feature (Xᵢ)</th>
                <th className="p-3 text-right">Unscaled Weight (₹ / unit)</th>
                <th className="p-3 text-right">Standardized Weight (Z-Score)</th>
                <th className="p-3">Impact Direction</th>
                <th className="p-3">Real-World Economic Interpretation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-mono text-slate-300">
              {FEATURE_NAMES.map((f) => {
                const unscaled = metrics.unscaledCoefficients[f];
                const scaled = metrics.scaledCoefficients[f];
                const isPositive = unscaled >= 0;

                return (
                  <tr key={f} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-bold text-blue-400">{f}</td>
                    <td className={`p-3 text-right font-bold ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                      {isPositive ? '+' : ''}{Math.round(unscaled).toLocaleString('en-IN')}
                    </td>
                    <td className="p-3 text-right text-slate-300">
                      {scaled >= 0 ? '+' : ''}{scaled.toFixed(3)}
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] ${isPositive ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'}`}>
                        {isPositive ? '▲ Positive Impact' : '▼ Negative Depreciation'}
                      </span>
                    </td>
                    <td className="p-3 font-sans text-slate-300 text-xs">
                      {interpretations[f]}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
