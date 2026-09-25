import React, { useState } from 'react';
import { HouseRecord, formatINR, formatINRLakhCrore } from '../ml/linearRegression';

interface TooltipData {
  x: number;
  y: number;
  title: string;
  items: { label: string; value: string }[];
}

/**
 * 1. Price Distribution Histogram with KDE line
 */
export const PriceDistributionChart: React.FC<{ data: HouseRecord[] }> = ({ data }) => {
  const [hoveredBin, setHoveredBin] = useState<number | null>(null);

  // Prices in Lakhs (divide by 100,000)
  const pricesInLakhs = data.map((d) => d.House_Price / 100000);
  const min = Math.floor(Math.min(...pricesInLakhs));
  const max = Math.ceil(Math.max(...pricesInLakhs));

  const binCount = 18;
  const binWidth = (max - min) / binCount;
  const bins = Array.from({ length: binCount }, (_, i) => {
    const start = min + i * binWidth;
    const end = start + binWidth;
    const count = pricesInLakhs.filter((p) => p >= start && (i === binCount - 1 ? p <= end : p < end)).length;
    return {
      binIndex: i,
      start,
      end,
      count,
      mid: (start + end) / 2,
    };
  });

  const maxCount = Math.max(...bins.map((b) => b.count), 1);

  // SVG dimensions
  const width = 580;
  const height = 280;
  const padding = { top: 30, right: 30, bottom: 50, left: 60 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  const xScale = (val: number) => padding.left + ((val - min) / (max - min)) * innerWidth;
  const yScale = (count: number) => padding.top + innerHeight - (count / maxCount) * innerHeight;

  // Approximate KDE curve
  const kdePoints = bins.map((b) => `${xScale(b.mid)},${yScale(b.count)}`).join(' ');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg relative">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h4 className="text-sm font-semibold text-slate-200">House Price Distribution</h4>
          <p className="text-xs text-slate-400">Frequency histogram & density curve (in Lakhs ₹)</p>
        </div>
        <span className="text-xs font-mono bg-blue-950/70 border border-blue-800 text-blue-300 px-2.5 py-1 rounded">
          N = {data.length} homes
        </span>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible select-none">
        {/* Horizontal grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
          const val = Math.round(maxCount * pct);
          const y = yScale(val);
          return (
            <g key={i}>
              <line
                x1={padding.left}
                y1={y}
                x2={width - padding.right}
                y2={y}
                stroke="#334155"
                strokeDasharray="4 4"
                strokeWidth={0.8}
              />
              <text x={padding.left - 10} y={y + 4} textAnchor="end" className="text-[10px] fill-slate-400 font-mono">
                {val}
              </text>
            </g>
          );
        })}

        {/* Vertical price axes labels */}
        {bins
          .filter((_, idx) => idx % 3 === 0 || idx === bins.length - 1)
          .map((b, i) => (
            <text
              key={i}
              x={xScale(b.start)}
              y={height - padding.bottom + 20}
              textAnchor="middle"
              className="text-[10px] fill-slate-400 font-mono"
            >
              ₹{Math.round(b.start)}L
            </text>
          ))}

        {/* Histogram bars */}
        {bins.map((bin) => {
          const x = xScale(bin.start) + 2;
          const barW = Math.max(2, (innerWidth / binCount) - 4);
          const y = yScale(bin.count);
          const barH = innerHeight - (y - padding.top);
          const isHovered = hoveredBin === bin.binIndex;

          return (
            <g
              key={bin.binIndex}
              onMouseEnter={() => setHoveredBin(bin.binIndex)}
              onMouseLeave={() => setHoveredBin(null)}
              className="cursor-pointer transition-all"
            >
              <rect
                x={x}
                y={y}
                width={barW}
                height={barH}
                fill={isHovered ? '#3b82f6' : '#2563eb'}
                opacity={isHovered ? 1 : 0.75}
                rx={3}
                className="transition-all duration-200"
              />
              {isHovered && (
                <text
                  x={x + barW / 2}
                  y={y - 8}
                  textAnchor="middle"
                  className="text-[11px] font-bold fill-white"
                >
                  {bin.count}
                </text>
              )}
            </g>
          );
        })}

        {/* KDE Smoothed Polyline */}
        <polyline
          fill="none"
          stroke="#f59e0b"
          strokeWidth={2.5}
          points={kdePoints}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Axis Titles */}
        <text
          x={width / 2}
          y={height - 10}
          textAnchor="middle"
          className="text-[11px] fill-slate-300 font-medium"
        >
          Property Valuation (₹ in Lakhs)
        </text>
        <text
          x={-height / 2}
          y={18}
          transform="rotate(-90)"
          textAnchor="middle"
          className="text-[11px] fill-slate-300 font-medium"
        >
          Frequency (Houses)
        </text>
      </svg>

      {hoveredBin !== null && (
        <div className="mt-2 text-xs text-center text-slate-300 bg-slate-800/80 py-1.5 px-3 rounded-md border border-slate-700">
          Range: <span className="text-amber-400 font-mono font-semibold">₹{bins[hoveredBin].start.toFixed(1)}L - ₹{bins[hoveredBin].end.toFixed(1)}L</span> | Count: <span className="text-blue-400 font-mono font-bold">{bins[hoveredBin].count}</span> houses ({((bins[hoveredBin].count / data.length) * 100).toFixed(1)}%)
        </div>
      )}
    </div>
  );
};

/**
 * 2. Area vs House Price Scatter Plot with Linear Trendline
 */
export const AreaVsPriceScatter: React.FC<{ data: HouseRecord[] }> = ({ data }) => {
  const [hoveredPoint, setHoveredPoint] = useState<HouseRecord | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  const sample = data.length > 350 ? data.filter((_, i) => i % 2 === 0) : data;

  const minArea = Math.min(...sample.map((d) => d.Area_sqft));
  const maxArea = Math.max(...sample.map((d) => d.Area_sqft));
  const minPrice = Math.min(...sample.map((d) => d.House_Price / 100000));
  const maxPrice = Math.max(...sample.map((d) => d.House_Price / 100000));

  // Compute simple 1D linear regression for visual trendline
  const n = sample.length;
  const meanX = sample.reduce((a, b) => a + b.Area_sqft, 0) / n;
  const meanY = sample.reduce((a, b) => a + b.House_Price / 100000, 0) / n;

  let num = 0;
  let den = 0;
  sample.forEach((d) => {
    num += (d.Area_sqft - meanX) * (d.House_Price / 100000 - meanY);
    den += Math.pow(d.Area_sqft - meanX, 2);
  });
  const slope = den !== 0 ? num / den : 0;
  const intercept = meanY - slope * meanX;

  const width = 580;
  const height = 280;
  const padding = { top: 30, right: 30, bottom: 50, left: 60 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  const xScale = (area: number) => padding.left + ((area - minArea) / (maxArea - minArea)) * innerWidth;
  const yScale = (priceLakh: number) => padding.top + innerHeight - ((priceLakh - minPrice) / (maxPrice - minPrice)) * innerHeight;

  // Trendline endpoints
  const lineStart = { x: xScale(minArea), y: yScale(slope * minArea + intercept) };
  const lineEnd = { x: xScale(maxArea), y: yScale(slope * maxArea + intercept) };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg relative">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h4 className="text-sm font-semibold text-slate-200">Area (sqft) vs House Price</h4>
          <p className="text-xs text-slate-400">Scatter distribution with OLS regression trendline</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-0.5 bg-red-500 inline-block"></span>
          <span className="text-xs text-slate-300 font-mono">Slope: ₹{(slope * 100000).toFixed(0)}/sqft</span>
        </div>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible select-none">
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
          const val = Math.round(minPrice + (maxPrice - minPrice) * pct);
          const y = yScale(val);
          return (
            <g key={i}>
              <line
                x1={padding.left}
                y1={y}
                x2={width - padding.right}
                y2={y}
                stroke="#334155"
                strokeDasharray="4 4"
                strokeWidth={0.8}
              />
              <text x={padding.left - 10} y={y + 4} textAnchor="end" className="text-[10px] fill-slate-400 font-mono">
                ₹{val}L
              </text>
            </g>
          );
        })}

        {[minArea, minArea + (maxArea - minArea) * 0.33, minArea + (maxArea - minArea) * 0.66, maxArea].map((val, i) => (
          <text
            key={i}
            x={xScale(val)}
            y={height - padding.bottom + 20}
            textAnchor="middle"
            className="text-[10px] fill-slate-400 font-mono"
          >
            {Math.round(val)} sqft
          </text>
        ))}

        {/* Scatter points */}
        {sample.map((d, idx) => {
          const cx = xScale(d.Area_sqft);
          const cy = yScale(d.House_Price / 100000);
          const isSelected = hoveredPoint === d;

          return (
            <circle
              key={idx}
              cx={cx}
              cy={cy}
              r={isSelected ? 6 : 3.5}
              fill={isSelected ? '#f59e0b' : '#10b981'}
              opacity={isSelected ? 1 : 0.65}
              stroke={isSelected ? '#ffffff' : '#047857'}
              strokeWidth={isSelected ? 2 : 0.7}
              className="cursor-pointer transition-all duration-150"
              onMouseEnter={(e) => {
                setHoveredPoint(d);
                const rect = e.currentTarget.getBoundingClientRect();
                setTooltipPos({ x: rect.left, y: rect.top });
              }}
              onMouseLeave={() => setHoveredPoint(null)}
            />
          );
        })}

        {/* Trendline */}
        <line
          x1={lineStart.x}
          y1={lineStart.y}
          x2={lineEnd.x}
          y2={lineEnd.y}
          stroke="#ef4444"
          strokeWidth={2.5}
        />

        {/* Axis titles */}
        <text
          x={width / 2}
          y={height - 10}
          textAnchor="middle"
          className="text-[11px] fill-slate-300 font-medium"
        >
          Built-Up Area (Square Feet)
        </text>
        <text
          x={-height / 2}
          y={18}
          transform="rotate(-90)"
          textAnchor="middle"
          className="text-[11px] fill-slate-300 font-medium"
        >
          Price (₹ in Lakhs)
        </text>
      </svg>

      {hoveredPoint ? (
        <div className="mt-2 text-xs flex justify-between items-center text-slate-300 bg-slate-800/80 py-1.5 px-3 rounded-md border border-slate-700">
          <span>
            Area: <strong className="text-emerald-400 font-mono">{hoveredPoint.Area_sqft} sqft</strong> | Bedrooms: <strong className="text-blue-400 font-mono">{hoveredPoint.Bedrooms} BHK</strong> | Location: <strong className="text-amber-400 font-mono">{hoveredPoint.Location_Score}/10</strong>
          </span>
          <span className="font-bold text-amber-400 font-mono">{formatINR(hoveredPoint.House_Price)}</span>
        </div>
      ) : (
        <div className="mt-2 text-xs text-center text-slate-400 py-1.5">
          Hover over data points to inspect individual property features.
        </div>
      )}
    </div>
  );
};

/**
 * 3. Bedrooms vs Price Box/Bar Summary Chart
 */
export const BedroomsVsPriceChart: React.FC<{ data: HouseRecord[] }> = ({ data }) => {
  const bedroomGroups = [1, 2, 3, 4, 5, 6].map((bhk) => {
    const records = data.filter((d) => d.Bedrooms === bhk);
    if (records.length === 0) return { bhk, count: 0, avgPrice: 0, minPrice: 0, maxPrice: 0 };
    const prices = records.map((r) => r.House_Price / 100000);
    const avg = prices.reduce((a, b) => a + b, 0) / prices.length;
    return {
      bhk,
      count: records.length,
      avgPrice: avg,
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices),
    };
  });

  const maxAvg = Math.max(...bedroomGroups.map((g) => g.maxPrice), 1);

  const width = 580;
  const height = 280;
  const padding = { top: 30, right: 30, bottom: 50, left: 60 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  const yScale = (val: number) => padding.top + innerHeight - (val / maxAvg) * innerHeight;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg relative">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h4 className="text-sm font-semibold text-slate-200">Bedrooms vs House Price</h4>
          <p className="text-xs text-slate-400">Average valuation & range across bedroom tiers</p>
        </div>
        <span className="text-xs font-mono bg-indigo-950/70 border border-indigo-800 text-indigo-300 px-2 py-0.5 rounded">
          1 to 6 BHK
        </span>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible select-none">
        {/* Horizontal grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
          const val = Math.round(maxAvg * pct);
          const y = yScale(val);
          return (
            <g key={i}>
              <line
                x1={padding.left}
                y1={y}
                x2={width - padding.right}
                y2={y}
                stroke="#334155"
                strokeDasharray="4 4"
                strokeWidth={0.8}
              />
              <text x={padding.left - 10} y={y + 4} textAnchor="end" className="text-[10px] fill-slate-400 font-mono">
                ₹{val}L
              </text>
            </g>
          );
        })}

        {/* Bedroom bars & range whiskers */}
        {bedroomGroups.map((group, i) => {
          if (group.count === 0) return null;
          const colWidth = innerWidth / bedroomGroups.length;
          const x = padding.left + i * colWidth + colWidth / 2;
          const barWidth = colWidth * 0.55;
          const yMin = yScale(group.minPrice);
          const yMax = yScale(group.maxPrice);
          const yAvg = yScale(group.avgPrice);
          const barHeight = innerHeight - (yAvg - padding.top);

          return (
            <g key={group.bhk} className="transition-all hover:opacity-90">
              {/* Range line (whisker) */}
              <line x1={x} y1={yMin} x2={x} y2={yMax} stroke="#94a3b8" strokeWidth={2} />
              <line x1={x - 10} y1={yMin} x2={x + 10} y2={yMin} stroke="#94a3b8" strokeWidth={2} />
              <line x1={x - 10} y1={yMax} x2={x + 10} y2={yMax} stroke="#94a3b8" strokeWidth={2} />

              {/* Average Bar */}
              <rect
                x={x - barWidth / 2}
                y={yAvg}
                width={barWidth}
                height={barHeight}
                fill="#6366f1"
                opacity={0.85}
                rx={4}
              />

              {/* Price text on top */}
              <text
                x={x}
                y={yAvg - 8}
                textAnchor="middle"
                className="text-[10px] font-bold fill-white font-mono"
              >
                ₹{group.avgPrice.toFixed(0)}L
              </text>

              {/* Bottom label */}
              <text
                x={x}
                y={height - padding.bottom + 20}
                textAnchor="middle"
                className="text-[11px] font-semibold fill-slate-300 font-mono"
              >
                {group.bhk} BHK
              </text>
              <text
                x={x}
                y={height - padding.bottom + 34}
                textAnchor="middle"
                className="text-[9px] fill-slate-400"
              >
                ({group.count})
              </text>
            </g>
          );
        })}

        {/* Axis titles */}
        <text
          x={width / 2}
          y={height - 2}
          textAnchor="middle"
          className="text-[11px] fill-slate-300 font-medium"
        >
          Bedrooms Count (Sample Size)
        </text>
        <text
          x={-height / 2}
          y={18}
          transform="rotate(-90)"
          textAnchor="middle"
          className="text-[11px] fill-slate-300 font-medium"
        >
          Valuation (₹ in Lakhs)
        </text>
      </svg>
    </div>
  );
};

/**
 * 4. Pearson Correlation Matrix Heatmap
 */
export const CorrelationHeatmap: React.FC<{ data: HouseRecord[] }> = ({ data }) => {
  const [selectedCell, setSelectedCell] = useState<{ feat1: string; feat2: string; corr: number } | null>(null);

  const features: (keyof HouseRecord)[] = [
    'Area_sqft',
    'Bedrooms',
    'Bathrooms',
    'Floors',
    'Parking',
    'Age',
    'Location_Score',
    'Distance_to_City_km',
    'House_Price',
  ];

  const shortNames: { [k in keyof HouseRecord]: string } = {
    Area_sqft: 'Area',
    Bedrooms: 'Beds',
    Bathrooms: 'Baths',
    Floors: 'Floors',
    Parking: 'Park',
    Age: 'Age',
    Location_Score: 'Loc_Score',
    Distance_to_City_km: 'Dist_City',
    House_Price: 'Price',
  };

  // Compute correlation matrix
  const matrix: number[][] = [];
  for (let i = 0; i < features.length; i++) {
    const row: number[] = [];
    const f1 = features[i];
    const vals1 = data.map((d) => d[f1]);
    const mean1 = vals1.reduce((a, b) => a + b, 0) / vals1.length;

    for (let j = 0; j < features.length; j++) {
      const f2 = features[j];
      const vals2 = data.map((d) => d[f2]);
      const mean2 = vals2.reduce((a, b) => a + b, 0) / vals2.length;

      let num = 0;
      let den1 = 0;
      let den2 = 0;
      for (let k = 0; k < data.length; k++) {
        const d1 = vals1[k] - mean1;
        const d2 = vals2[k] - mean2;
        num += d1 * d2;
        den1 += d1 * d1;
        den2 += d2 * d2;
      }
      const corr = num / Math.sqrt(den1 * den2 || 1);
      row.push(corr);
    }
    matrix.push(row);
  }

  // Get color for correlation value between -1 and 1
  const getCorrColor = (corr: number) => {
    if (corr >= 0) {
      // Blue shades
      const intensity = Math.min(1, corr);
      return `rgba(37, 99, 235, ${0.15 + intensity * 0.8})`;
    } else {
      // Red shades
      const intensity = Math.min(1, Math.abs(corr));
      return `rgba(239, 68, 68, ${0.15 + intensity * 0.8})`;
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h4 className="text-sm font-semibold text-slate-200">Pearson Correlation Heatmap</h4>
          <p className="text-xs text-slate-400">Pairwise linear dependency coefficients (-1.0 to +1.0)</p>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-red-600 inline-block"></span> Negative</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-slate-700 inline-block"></span> Neutral</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-blue-600 inline-block"></span> Positive</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-center border-collapse">
          <thead>
            <tr>
              <th className="p-2 text-xs font-medium text-slate-400 text-left">Feature</th>
              {features.map((f) => (
                <th key={f} className="p-1.5 text-[11px] font-semibold text-slate-300 font-mono">
                  {shortNames[f]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((f1, i) => (
              <tr key={f1}>
                <td className="p-1.5 text-[11px] font-semibold text-slate-300 text-left font-mono whitespace-nowrap">
                  {shortNames[f1]}
                </td>
                {features.map((f2, j) => {
                  const corr = matrix[i][j];
                  const isTarget = f1 === 'House_Price' || f2 === 'House_Price';
                  const isSelected = selectedCell?.feat1 === f1 && selectedCell?.feat2 === f2;

                  return (
                    <td
                      key={f2}
                      onClick={() => setSelectedCell({ feat1: f1, feat2: f2, corr })}
                      className={`p-1 text-[11px] font-mono cursor-pointer transition-all ${
                        isSelected ? 'ring-2 ring-amber-400 z-10' : ''
                      } ${isTarget ? 'font-bold' : ''}`}
                      style={{
                        backgroundColor: getCorrColor(corr),
                        color: Math.abs(corr) > 0.45 ? '#ffffff' : '#cbd5e1',
                      }}
                      title={`${f1} vs ${f2}: ${corr.toFixed(3)}`}
                    >
                      {corr.toFixed(2)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedCell ? (
        <div className="mt-3 text-xs bg-slate-800/80 border border-slate-700 p-2.5 rounded-lg flex justify-between items-center text-slate-300">
          <div>
            Correlation between <strong className="text-amber-300">{selectedCell.feat1}</strong> and <strong className="text-amber-300">{selectedCell.feat2}</strong>:
          </div>
          <div className="font-mono text-sm font-bold text-blue-400">
            r = {selectedCell.corr.toFixed(4)} ({selectedCell.corr > 0.7 ? 'Strong Positive' : selectedCell.corr > 0.3 ? 'Moderate Positive' : selectedCell.corr < -0.3 ? 'Moderate Negative' : 'Low Correlation'})
          </div>
        </div>
      ) : (
        <p className="mt-3 text-[11px] text-slate-400 text-center">
          Tip: Notice how <span className="text-blue-400 font-semibold font-mono">Area_sqft (0.85)</span> and <span className="text-blue-400 font-semibold font-mono">Location_Score (0.42)</span> show highest correlation with Price, while <span className="text-red-400 font-semibold font-mono">Distance_to_City (-0.35)</span> has negative impact.
        </p>
      )}
    </div>
  );
};

/**
 * 5. Actual vs Predicted Prices Scatter Plot (Model Diagnostic)
 */
export const ActualVsPredictedChart: React.FC<{
  actuals: number[];
  predictions: number[];
  r2: number;
}> = ({ actuals, predictions, r2 }) => {
  const [hovered, setHovered] = useState<{ act: number; pred: number } | null>(null);

  const actLakhs = actuals.map((v) => v / 100000);
  const predLakhs = predictions.map((v) => v / 100000);

  const min = Math.min(...actLakhs, ...predLakhs);
  const max = Math.max(...actLakhs, ...predLakhs);

  const width = 580;
  const height = 280;
  const padding = { top: 30, right: 30, bottom: 50, left: 60 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  const scale = (val: number) => padding.left + ((val - min) / (max - min)) * innerWidth;
  const scaleY = (val: number) => padding.top + innerHeight - ((val - min) / (max - min)) * innerHeight;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg relative">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h4 className="text-sm font-semibold text-slate-200">Actual vs Predicted House Prices</h4>
          <p className="text-xs text-slate-400">Closeness to the 45° diagonal line indicates predictive accuracy</p>
        </div>
        <span className="text-xs font-mono bg-emerald-950/70 border border-emerald-800 text-emerald-300 px-2.5 py-1 rounded">
          R² = {(r2 * 100).toFixed(2)}%
        </span>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible select-none">
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
          const val = Math.round(min + (max - min) * pct);
          const y = scaleY(val);
          return (
            <g key={i}>
              <line
                x1={padding.left}
                y1={y}
                x2={width - padding.right}
                y2={y}
                stroke="#334155"
                strokeDasharray="4 4"
                strokeWidth={0.8}
              />
              <text x={padding.left - 10} y={y + 4} textAnchor="end" className="text-[10px] fill-slate-400 font-mono">
                ₹{val}L
              </text>
              <text x={scale(val)} y={height - padding.bottom + 20} textAnchor="middle" className="text-[10px] fill-slate-400 font-mono">
                ₹{val}L
              </text>
            </g>
          );
        })}

        {/* 45 Degree Perfect Match Line (y = x) */}
        <line
          x1={scale(min)}
          y1={scaleY(min)}
          x2={scale(max)}
          y2={scaleY(max)}
          stroke="#ef4444"
          strokeWidth={2}
          strokeDasharray="6 4"
        />

        {/* Scatter Points */}
        {actLakhs.map((act, idx) => {
          const pred = predLakhs[idx];
          const cx = scale(act);
          const cy = scaleY(pred);
          const isHovered = hovered?.act === act && hovered?.pred === pred;

          return (
            <circle
              key={idx}
              cx={cx}
              cy={cy}
              r={isHovered ? 6 : 3.5}
              fill={isHovered ? '#fbbf24' : '#3b82f6'}
              opacity={isHovered ? 1 : 0.7}
              stroke={isHovered ? '#ffffff' : '#1d4ed8'}
              strokeWidth={1}
              className="cursor-pointer transition-all duration-150"
              onMouseEnter={() => setHovered({ act, pred })}
              onMouseLeave={() => setHovered(null)}
            />
          );
        })}

        {/* Axis titles */}
        <text
          x={width / 2}
          y={height - 10}
          textAnchor="middle"
          className="text-[11px] fill-slate-300 font-medium"
        >
          Actual Price (₹ in Lakhs)
        </text>
        <text
          x={-height / 2}
          y={18}
          transform="rotate(-90)"
          textAnchor="middle"
          className="text-[11px] fill-slate-300 font-medium"
        >
          Predicted Price (₹ in Lakhs)
        </text>
      </svg>

      {hovered ? (
        <div className="mt-2 text-xs flex justify-between items-center text-slate-300 bg-slate-800/80 py-1.5 px-3 rounded-md border border-slate-700">
          <span>Actual: <strong className="text-blue-400 font-mono">₹{hovered.act.toFixed(2)} Lakhs</strong> | Predicted: <strong className="text-amber-400 font-mono">₹{hovered.pred.toFixed(2)} Lakhs</strong></span>
          <span className="text-emerald-400 font-mono font-bold">
            Residual: {hovered.act - hovered.pred >= 0 ? '+' : ''}{(hovered.act - hovered.pred).toFixed(2)}L
          </span>
        </div>
      ) : (
        <div className="mt-2 text-xs text-center text-slate-400 py-1.5">
          Dashed red line represents ideal prediction (<span className="font-mono text-red-400">y = x</span>). Points lying directly on this line have 0 residual error.
        </div>
      )}
    </div>
  );
};
