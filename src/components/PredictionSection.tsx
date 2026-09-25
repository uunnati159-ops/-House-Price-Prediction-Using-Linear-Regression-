import React, { useState } from 'react';
import {
  ModelMetrics,
  FeatureKey,
  predictPrice,
  formatINR,
  formatINRLakhCrore,
} from '../ml/linearRegression';
import {
  Calculator,
  Home,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  RotateCcw,
  Sliders,
  DollarSign,
  ArrowRight,
} from 'lucide-react';

interface PredictionSectionProps {
  model: ModelMetrics;
}

export const PredictionSection: React.FC<PredictionSectionProps> = ({ model }) => {
  // Input state
  const [inputs, setInputs] = useState<{ [key in FeatureKey]: number }>({
    Area_sqft: 1850,
    Bedrooms: 3,
    Bathrooms: 2,
    Floors: 2,
    Parking: 1,
    Age: 5,
    Location_Score: 7.5,
    Distance_to_City_km: 8.5,
  });

  const [predictedResult, setPredictedResult] = useState<{
    price: number;
    breakdown: { feature: string; value: number; unitRate: number; contribution: number }[];
  } | null>(null);

  const [isCalculated, setIsCalculated] = useState(false);

  // Preset Configurations
  const presets = [
    {
      label: 'Suburban 1 BHK',
      icon: '🏡',
      values: {
        Area_sqft: 750,
        Bedrooms: 1,
        Bathrooms: 1,
        Floors: 1,
        Parking: 1,
        Age: 10,
        Location_Score: 5.5,
        Distance_to_City_km: 18.0,
      },
    },
    {
      label: 'Standard 3 BHK Flat',
      icon: '🏢',
      values: {
        Area_sqft: 1750,
        Bedrooms: 3,
        Bathrooms: 2,
        Floors: 2,
        Parking: 1,
        Age: 4,
        Location_Score: 7.8,
        Distance_to_City_km: 7.5,
      },
    },
    {
      label: 'Prime 4 BHK Duplex',
      icon: '✨',
      values: {
        Area_sqft: 2600,
        Bedrooms: 4,
        Bathrooms: 3,
        Floors: 2,
        Parking: 2,
        Age: 2,
        Location_Score: 8.9,
        Distance_to_City_km: 4.2,
      },
    },
    {
      label: 'Luxury 5 BHK Villa',
      icon: '🏰',
      values: {
        Area_sqft: 3800,
        Bedrooms: 5,
        Bathrooms: 4,
        Floors: 3,
        Parking: 3,
        Age: 1,
        Location_Score: 9.6,
        Distance_to_City_km: 2.0,
      },
    },
  ];

  const handleInputChange = (key: FeatureKey, val: number) => {
    setInputs((prev) => ({ ...prev, [key]: val }));
    setIsCalculated(false);
  };

  const handlePredict = () => {
    const res = predictPrice(inputs, model);
    setPredictedResult({
      price: res.predictedPrice,
      breakdown: res.breakdown,
    });
    setIsCalculated(true);
  };

  const applyPreset = (presetValues: { [key in FeatureKey]: number }) => {
    setInputs(presetValues);
    setIsCalculated(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-5">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <Calculator className="w-6 h-6 text-amber-400" />
            House Price Valuation Interface
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Input custom property attributes to compute estimated market price via Linear Regression
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 mr-1">Presets:</span>
          {presets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => applyPreset(p.values)}
              className="px-2.5 py-1.5 bg-slate-800/80 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>{p.icon}</span>
              <span>{p.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Input Form (7 cols) */}
        <div className="lg:col-span-7 space-y-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-blue-400" />
              Property Specifications Form
            </h3>
            <button
              onClick={() => {
                setInputs({
                  Area_sqft: 1850,
                  Bedrooms: 3,
                  Bathrooms: 2,
                  Floors: 2,
                  Parking: 1,
                  Age: 5,
                  Location_Score: 7.5,
                  Distance_to_City_km: 8.5,
                });
                setIsCalculated(false);
              }}
              className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Reset Defaults
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Area */}
            <div className="space-y-2 bg-slate-800/40 p-3.5 rounded-xl border border-slate-800">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-slate-200">Built-Up Area (sqft)</label>
                <span className="font-mono text-blue-400 font-bold">{inputs.Area_sqft} sqft</span>
              </div>
              <input
                type="range"
                min={500}
                max={5000}
                step={25}
                value={inputs.Area_sqft}
                onChange={(e) => handleInputChange('Area_sqft', Number(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>500 sqft</span>
                <span>2,750 sqft</span>
                <span>5,000 sqft</span>
              </div>
            </div>

            {/* Bedrooms */}
            <div className="space-y-2 bg-slate-800/40 p-3.5 rounded-xl border border-slate-800">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-slate-200">Bedrooms (BHK)</label>
                <span className="font-mono text-blue-400 font-bold">{inputs.Bedrooms} Bedrooms</span>
              </div>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleInputChange('Bedrooms', num)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                      inputs.Bedrooms === num
                        ? 'bg-blue-600 text-white shadow'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
              <div className="text-[10px] text-slate-500 text-center">Selected: {inputs.Bedrooms} BHK</div>
            </div>

            {/* Bathrooms */}
            <div className="space-y-2 bg-slate-800/40 p-3.5 rounded-xl border border-slate-800">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-slate-200">Bathrooms</label>
                <span className="font-mono text-blue-400 font-bold">{inputs.Bathrooms} Bathrooms</span>
              </div>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleInputChange('Bathrooms', num)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                      inputs.Bathrooms === num
                        ? 'bg-blue-600 text-white shadow'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
              <div className="text-[10px] text-slate-500 text-center">Standard fully equipped</div>
            </div>

            {/* Floors */}
            <div className="space-y-2 bg-slate-800/40 p-3.5 rounded-xl border border-slate-800">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-slate-200">Stories / Floors</label>
                <span className="font-mono text-blue-400 font-bold">{inputs.Floors} Floors</span>
              </div>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleInputChange('Floors', num)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                      inputs.Floors === num
                        ? 'bg-blue-600 text-white shadow'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
              <div className="text-[10px] text-slate-500 text-center">Structure height</div>
            </div>

            {/* Parking */}
            <div className="space-y-2 bg-slate-800/40 p-3.5 rounded-xl border border-slate-800">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-slate-200">Parking Spaces</label>
                <span className="font-mono text-blue-400 font-bold">{inputs.Parking} Slot{inputs.Parking !== 1 ? 's' : ''}</span>
              </div>
              <div className="flex gap-1.5">
                {[0, 1, 2, 3].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleInputChange('Parking', num)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                      inputs.Parking === num
                        ? 'bg-blue-600 text-white shadow'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
              <div className="text-[10px] text-slate-500 text-center">Dedicated vehicle parking</div>
            </div>

            {/* Age */}
            <div className="space-y-2 bg-slate-800/40 p-3.5 rounded-xl border border-slate-800">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-slate-200">Property Age (Years)</label>
                <span className="font-mono text-amber-400 font-bold">{inputs.Age} Years Old</span>
              </div>
              <input
                type="range"
                min={0}
                max={40}
                step={1}
                value={inputs.Age}
                onChange={(e) => handleInputChange('Age', Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>0 (Brand New)</span>
                <span>20 Years</span>
                <span>40 Years</span>
              </div>
            </div>

            {/* Location Score */}
            <div className="space-y-2 bg-slate-800/40 p-3.5 rounded-xl border border-slate-800">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-slate-200">Location Score (1.0 to 10.0)</label>
                <span className="font-mono text-emerald-400 font-bold">{inputs.Location_Score.toFixed(1)} / 10</span>
              </div>
              <input
                type="range"
                min={1.0}
                max={10.0}
                step={0.1}
                value={inputs.Location_Score}
                onChange={(e) => handleInputChange('Location_Score', Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>1.0 (Basic)</span>
                <span>5.5 (Average)</span>
                <span>10.0 (Prime)</span>
              </div>
            </div>

            {/* Distance to City Center */}
            <div className="space-y-2 bg-slate-800/40 p-3.5 rounded-xl border border-slate-800">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-slate-200">Distance to City Center (km)</label>
                <span className="font-mono text-cyan-400 font-bold">{inputs.Distance_to_City_km.toFixed(1)} km</span>
              </div>
              <input
                type="range"
                min={1.0}
                max={35.0}
                step={0.5}
                value={inputs.Distance_to_City_km}
                onChange={(e) => handleInputChange('Distance_to_City_km', Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>1 km (Central)</span>
                <span>18 km</span>
                <span>35 km (Suburban)</span>
              </div>
            </div>
          </div>

          {/* Action Prediction Button */}
          <button
            onClick={handlePredict}
            className="w-full py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-extrabold text-base tracking-wide rounded-xl shadow-xl shadow-blue-900/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-3 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span>PREDICT HOUSE PRICE</span>
          </button>
        </div>

        {/* Right Output Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {predictedResult && isCalculated ? (
            <div className="bg-gradient-to-b from-slate-900 via-blue-950/40 to-slate-900 border border-emerald-500/50 rounded-2xl p-6 shadow-2xl space-y-6 animate-fadeIn">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                <CheckCircle className="w-4 h-4" />
                Prediction Computed Successfully
              </div>

              {/* Major Display Requirement */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-6 text-center space-y-2">
                <span className="text-xs text-slate-400 font-medium">Estimated House Price</span>
                <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 font-mono tracking-tight">
                  {formatINR(predictedResult.price)}
                </div>
                <div className="flex justify-center items-center gap-2 pt-1">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono">
                    {formatINRLakhCrore(predictedResult.price)}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    (± {formatINR(model.rmse)} RMSE)
                  </span>
                </div>
              </div>

              {/* Feature Contribution Breakdown */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Calculator className="w-3.5 h-3.5 text-blue-400" />
                  Itemized Valuation Breakdown
                </h4>
                <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 text-xs space-y-2 max-h-60 overflow-y-auto font-mono">
                  <div className="flex justify-between items-center pb-1.5 border-b border-slate-800 text-slate-400">
                    <span>Base Intercept (β₀)</span>
                    <span className="text-slate-300 font-semibold">{formatINR(model.unscaledIntercept)}</span>
                  </div>
                  {predictedResult.breakdown.map((item) => {
                    const isPos = item.contribution >= 0;
                    return (
                      <div key={item.feature} className="flex justify-between items-center text-slate-300 text-[11px]">
                        <span className="truncate max-w-[170px]" title={item.feature}>
                          {item.feature} ({item.value})
                        </span>
                        <span className={`font-semibold ${isPos ? 'text-emerald-400' : 'text-red-400'}`}>
                          {isPos ? '+' : ''}{formatINR(item.contribution)}
                        </span>
                      </div>
                    );
                  })}
                  <div className="flex justify-between items-center pt-2 border-t border-slate-800 font-bold text-white text-xs">
                    <span>Total Predicted Value</span>
                    <span className="text-emerald-400">{formatINR(predictedResult.price)}</span>
                  </div>
                </div>
              </div>

              {/* Project Disclaimer Requirement */}
              <div className="p-3.5 bg-amber-950/20 border border-amber-900/40 rounded-xl flex items-start gap-2.5 text-xs text-amber-300/90 leading-relaxed">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong>Academic Project Disclaimer:</strong> This valuation is an algorithmic estimate calculated by an Ordinary Least Squares (OLS) Linear Regression model. Actual market sale prices are influenced by physical condition, deed status, negotiable terms, and prevailing micro-market trends.
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[380px] bg-slate-900 border border-dashed border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Home className="w-8 h-8" />
              </div>
              <div className="max-w-xs">
                <h4 className="text-base font-semibold text-white">Ready to Predict</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Adjust property specifications on the left or select a preset, then click <strong>“PREDICT HOUSE PRICE”</strong>.
                </p>
              </div>
              <button
                onClick={handlePredict}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow transition-colors cursor-pointer"
              >
                Compute Valuation Now ➔
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
