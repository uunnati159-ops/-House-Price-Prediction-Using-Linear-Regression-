import React, { useState, useMemo } from 'react';
import { HouseRecord, FEATURE_NAMES, calculateStats, formatINR } from '../ml/linearRegression';
import { RAW_CSV_DATA } from '../data/dataset';
import { Download, Search, Table, Info, FileSpreadsheet, Check } from 'lucide-react';

interface DatasetSectionProps {
  data: HouseRecord[];
}

export const DatasetSection: React.FC<DatasetSectionProps> = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [copiedCSV, setCopiedCSV] = useState(false);

  // Compute statistics for all features + target
  const statsList = useMemo(() => {
    const allFeatures: (keyof HouseRecord)[] = [...FEATURE_NAMES, 'House_Price'];
    return allFeatures.map((f) => {
      const vals = data.map((d) => d[f]);
      return calculateStats(vals, f);
    });
  }, [data]);

  // Filtering
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    const term = searchTerm.toLowerCase();
    return data.filter((row) =>
      row.Area_sqft.toString().includes(term) ||
      row.Bedrooms.toString().includes(term) ||
      row.Location_Score.toString().includes(term) ||
      row.House_Price.toString().includes(term)
    );
  }, [data, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const handleDownloadCSV = () => {
    const blob = new Blob([RAW_CSV_DATA], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'house_prices.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyCSV = () => {
    navigator.clipboard.writeText(RAW_CSV_DATA);
    setCopiedCSV(true);
    setTimeout(() => setCopiedCSV(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header & Quick Stats */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-5">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <FileSpreadsheet className="w-6 h-6 text-blue-400" />
            Dataset Exploration & Preprocessing
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Inspecting the residential property dataset (<code className="text-blue-300 font-mono">house_prices.csv</code>)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyCSV}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copiedCSV ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Table className="w-3.5 h-3.5" />}
            <span>{copiedCSV ? 'Copied CSV!' : 'Copy Raw CSV'}</span>
          </button>
          <button
            onClick={handleDownloadCSV}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download house_prices.csv</span>
          </button>
        </div>
      </div>

      {/* Dataset Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <span className="text-xs text-slate-400">Total Observations</span>
          <div className="text-2xl font-bold font-mono text-white mt-1">{data.length} Rows</div>
          <span className="text-[11px] text-emerald-400 mt-1 inline-block">100% Complete</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <span className="text-xs text-slate-400">Total Columns</span>
          <div className="text-2xl font-bold font-mono text-white mt-1">9 Attributes</div>
          <span className="text-[11px] text-blue-400 mt-1 inline-block">8 Input + 1 Target</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <span className="text-xs text-slate-400">Missing Values</span>
          <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">0 Nulls</div>
          <span className="text-[11px] text-slate-400 mt-1 inline-block">Clean & Preprocessed</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <span className="text-xs text-slate-400">Target Variable</span>
          <div className="text-lg font-bold font-mono text-amber-400 mt-1 truncate">House_Price</div>
          <span className="text-[11px] text-slate-400 mt-1 inline-block">Continuous in INR (₹)</span>
        </div>
      </div>

      {/* Demonstration Notice */}
      <div className="bg-blue-950/40 border border-blue-900/60 rounded-xl p-4 flex items-start gap-3 text-xs text-blue-200">
        <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-white">Demonstration Dataset Note:</strong> This dataset comprises 650 realistic residential records engineered specifically for training and evaluating Multiple Linear Regression in an academic college project setting. In production, real estate registry datasets or MLS data can be substituted seamlessly.
        </div>
      </div>

      {/* Feature Descriptions Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow">
        <div className="p-4 border-b border-slate-800">
          <h3 className="text-sm font-semibold text-white">Feature Dictionary & Metadata</h3>
          <p className="text-xs text-slate-400">Overview of independent predictor variables and the target variable</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-800/60 text-slate-300 font-semibold border-b border-slate-800">
              <tr>
                <th className="p-3">Feature Name</th>
                <th className="p-3">Data Type</th>
                <th className="p-3">Variable Role</th>
                <th className="p-3">Range / Units</th>
                <th className="p-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-mono text-slate-300">
              {[
                { name: 'Area_sqft', type: 'Float / Int', role: 'Independent Feature', range: '550 – 5,000 sqft', desc: 'Total built-up and carpet area of the residential unit' },
                { name: 'Bedrooms', type: 'Integer', role: 'Independent Feature', range: '1 – 6 Rooms', desc: 'Total number of standard bedrooms in the property' },
                { name: 'Bathrooms', type: 'Integer', role: 'Independent Feature', range: '1 – 5 Rooms', desc: 'Total number of equipped bathrooms' },
                { name: 'Floors', type: 'Integer', role: 'Independent Feature', range: '1 – 4 Stories', desc: 'Number of vertical levels / stories of the home' },
                { name: 'Parking', type: 'Integer', role: 'Independent Feature', range: '0 – 3 Slots', desc: 'Designated covered or driveway vehicle parking slots' },
                { name: 'Age', type: 'Integer', role: 'Independent Feature', range: '0 – 35 Years', desc: 'Age since initial construction date' },
                { name: 'Location_Score', type: 'Float', role: 'Independent Feature', range: '1.0 – 10.0 Rating', desc: 'Locality infrastructure, schools, safety and amenity rating' },
                { name: 'Distance_to_City_km', type: 'Float', role: 'Independent Feature', range: '1.0 – 35.0 km', desc: 'Road travel distance to central business district hub' },
                { name: 'House_Price', type: 'Float', role: 'Target (Dependent)', range: '₹14L – ₹1.85Cr', desc: 'Market valuation of the property in Indian Rupees (₹)' },
              ].map((f, i) => (
                <tr key={i} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-bold text-blue-400">{f.name}</td>
                  <td className="p-3 text-slate-400">{f.type}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] ${f.role.includes('Target') ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-slate-800 text-slate-300'}`}>
                      {f.role}
                    </span>
                  </td>
                  <td className="p-3 text-slate-300">{f.range}</td>
                  <td className="p-3 font-sans text-slate-300">{f.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dataset Statistics (Pandas .describe()) */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center">
          <div>
            <h3 className="text-sm font-semibold text-white">Statistical Summary (Pandas .describe())</h3>
            <p className="text-xs text-slate-400">Mean, standard deviation, and quartile distribution</p>
          </div>
          <span className="text-xs font-mono bg-slate-800 text-slate-300 px-2 py-1 rounded">
            df.describe().T
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-800/60 text-slate-300 font-semibold border-b border-slate-800">
              <tr>
                <th className="p-3 text-left">Statistic</th>
                <th className="p-3">Count</th>
                <th className="p-3">Mean (μ)</th>
                <th className="p-3">Std Dev (σ)</th>
                <th className="p-3">Min</th>
                <th className="p-3">25% (Q1)</th>
                <th className="p-3">50% (Median)</th>
                <th className="p-3">75% (Q3)</th>
                <th className="p-3">Max</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-mono text-slate-300">
              {statsList.map((s) => (
                <tr key={s.feature} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 text-left font-bold text-blue-400">{s.feature}</td>
                  <td className="p-3 text-slate-400">{s.count}</td>
                  <td className="p-3">{s.feature === 'House_Price' ? formatINR(s.mean) : s.mean.toFixed(2)}</td>
                  <td className="p-3">{s.feature === 'House_Price' ? formatINR(s.std) : s.std.toFixed(2)}</td>
                  <td className="p-3">{s.feature === 'House_Price' ? formatINR(s.min) : s.min.toFixed(1)}</td>
                  <td className="p-3">{s.feature === 'House_Price' ? formatINR(s.q25) : s.q25.toFixed(1)}</td>
                  <td className="p-3 text-emerald-400 font-bold">{s.feature === 'House_Price' ? formatINR(s.median) : s.median.toFixed(1)}</td>
                  <td className="p-3">{s.feature === 'House_Price' ? formatINR(s.q75) : s.q75.toFixed(1)}</td>
                  <td className="p-3">{s.feature === 'House_Price' ? formatINR(s.max) : s.max.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Records Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow">
        <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h3 className="text-sm font-semibold text-white">Dataset Records Explorer</h3>
            <p className="text-xs text-slate-400">
              Showing {paginatedData.length} of {filteredData.length} records
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search area, beds, price..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-8 pr-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
              />
            </div>

            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-200 px-2.5 py-1.5 focus:outline-none"
            >
              <option value={10}>10 rows</option>
              <option value={20}>20 rows</option>
              <option value={50}>50 rows</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-800/60 text-slate-300 font-semibold border-b border-slate-800">
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3">Area (sqft)</th>
                <th className="p-3">Beds</th>
                <th className="p-3">Baths</th>
                <th className="p-3">Floors</th>
                <th className="p-3">Parking</th>
                <th className="p-3">Age (yrs)</th>
                <th className="p-3">Loc. Score</th>
                <th className="p-3">Dist. City (km)</th>
                <th className="p-3 text-amber-400">House Price (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-mono text-slate-300">
              {paginatedData.map((row, idx) => {
                const globalIndex = (currentPage - 1) * pageSize + idx + 1;
                return (
                  <tr key={idx} className="hover:bg-slate-800/50 transition-colors">
                    <td className="p-3 text-left text-slate-500">{globalIndex}</td>
                    <td className="p-3 font-semibold text-slate-200">{row.Area_sqft}</td>
                    <td className="p-3">{row.Bedrooms}</td>
                    <td className="p-3">{row.Bathrooms}</td>
                    <td className="p-3">{row.Floors}</td>
                    <td className="p-3">{row.Parking}</td>
                    <td className="p-3">{row.Age}</td>
                    <td className="p-3">{row.Location_Score.toFixed(1)}</td>
                    <td className="p-3">{row.Distance_to_City_km.toFixed(1)}</td>
                    <td className="p-3 font-bold text-amber-400">{formatINR(row.House_Price)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        <div className="p-3 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
          <span>Page {currentPage} of {totalPages}</span>
          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 rounded border border-slate-700 cursor-pointer disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 rounded border border-slate-700 cursor-pointer disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
