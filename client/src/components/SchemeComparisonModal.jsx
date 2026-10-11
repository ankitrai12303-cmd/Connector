import React from 'react';
import { 
  X, 
  Check, 
  ArrowRight, 
  ExternalLink, 
  IndianRupee, 
  Building, 
  FileText, 
  ShieldCheck, 
  Users 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function SchemeComparisonModal({ schemes = [], onClose, onPrepareApplication, onRemoveScheme }) {
  const { lang } = useLanguage();

  if (!schemes || schemes.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      <div className="bg-white rounded-3xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-blue-950 text-white p-5 sm:p-6 flex items-center justify-between border-b border-blue-800 shrink-0">
          <div>
            <h3 className="font-extrabold text-lg sm:text-xl text-white">
              {lang === 'hi' ? 'योजना तुलना मैट्रिक्स' : 'Side-by-Side Scheme Comparison Matrix'}
            </h3>
            <p className="text-xs text-blue-200 mt-0.5">
              Comparing {schemes.length} schemes across eligibility, financial assistance, and required documents.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-blue-900/80 hover:bg-red-600 text-white transition-colors"
            title="Close Comparison"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Matrix Scrollable Body */}
        <div className="p-6 overflow-x-auto overflow-y-auto flex-1">
          
          <table className="w-full border-collapse text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="p-3 bg-slate-50 font-bold text-slate-700 w-44 uppercase text-[11px] tracking-wider">
                  Comparison Metric
                </th>
                {schemes.map(s => (
                  <th key={s.id} className="p-4 bg-blue-50/60 border-l border-slate-200 min-w-[240px] align-top">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase text-blue-900 px-2 py-0.5 rounded-full bg-blue-100">
                          {s.sponsor}
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-blue-950 mt-1.5 leading-snug">
                          {s.name}
                        </h4>
                        <div className="text-[11px] text-slate-500 line-clamp-1">{s.ministry}</div>
                      </div>
                      <button
                        onClick={() => onRemoveScheme(s.id)}
                        className="p-1 text-slate-400 hover:text-red-600 rounded"
                        title="Remove from comparison"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {/* Financial Benefit */}
              <tr>
                <td className="p-3 bg-slate-50 font-bold text-slate-700 flex items-center gap-1.5">
                  <IndianRupee className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Financial Assistance</span>
                </td>
                {schemes.map(s => (
                  <td key={s.id} className="p-4 border-l border-slate-200 font-extrabold text-blue-950 text-xs sm:text-sm bg-amber-50/30">
                    {s.financialBenefit || "Subsidized Grant"}
                  </td>
                ))}
              </tr>

              {/* Tagline */}
              <tr>
                <td className="p-3 bg-slate-50 font-bold text-slate-700">
                  <span>Objective</span>
                </td>
                {schemes.map(s => (
                  <td key={s.id} className="p-4 border-l border-slate-200 text-slate-700 text-xs leading-relaxed">
                    {s.tagline}
                  </td>
                ))}
              </tr>

              {/* Eligibility Criteria */}
              <tr>
                <td className="p-3 bg-slate-50 font-bold text-slate-700 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-blue-700 shrink-0" />
                  <span>Eligibility Target</span>
                </td>
                {schemes.map(s => (
                  <td key={s.id} className="p-4 border-l border-slate-200 text-xs space-y-1">
                    <div><strong>Target:</strong> {s.eligibilityCriteria.summary}</div>
                    <div className="text-slate-500">
                      Age: {s.eligibilityCriteria.minAge || 0} - {s.eligibilityCriteria.maxAge || 100} yrs
                    </div>
                    {s.eligibilityCriteria.maxIncome && (
                      <div className="text-slate-500">
                        Max Income: ≤ ₹{s.eligibilityCriteria.maxIncome.toLocaleString('en-IN')}
                      </div>
                    )}
                  </td>
                ))}
              </tr>

              {/* Documents Required */}
              <tr>
                <td className="p-3 bg-slate-50 font-bold text-slate-700 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Required Documents</span>
                </td>
                {schemes.map(s => (
                  <td key={s.id} className="p-4 border-l border-slate-200 text-xs">
                    <ul className="space-y-1">
                      {s.documentsRequired.map((doc, dIdx) => (
                        <li key={dIdx} className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{doc.name}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Actions Row */}
              <tr>
                <td className="p-3 bg-slate-50 font-bold text-slate-700">
                  <span>Action</span>
                </td>
                {schemes.map(s => (
                  <td key={s.id} className="p-4 border-l border-slate-200">
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => {
                          onClose();
                          onPrepareApplication(s);
                        }}
                        className="w-full py-2 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-xl text-xs transition-colors shadow-xs"
                      >
                        Prepare Application
                      </button>
                      <a
                        href={s.officialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-center py-1 text-xs text-blue-700 hover:underline flex items-center justify-center gap-1 font-mono"
                      >
                        <span>Official Portal</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </td>
                ))}
              </tr>

            </tbody>
          </table>

        </div>

      </div>

    </div>
  );
}
