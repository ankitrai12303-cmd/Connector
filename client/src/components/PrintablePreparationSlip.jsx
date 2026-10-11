import React from 'react';
import { 
  Printer, 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink, 
  FileText, 
  QrCode,
  Building
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';

export default function PrintablePreparationSlip({ scheme, onClose }) {
  const { lang } = useLanguage();
  const { profile } = useUser();

  if (!scheme) return null;

  const handlePrint = () => {
    window.print();
  };

  const slipId = `CONN-${scheme.id.toUpperCase().slice(0, 4)}-${Math.floor(100000 + Math.random() * 900000)}`;
  const dateStr = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      
      <div className="bg-white rounded-3xl w-full max-w-3xl flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Controls Bar */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between no-print shrink-0">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-sm">Citizen Scheme Preparation Slip</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Slip / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Slip Body */}
        <div className="p-8 sm:p-12 overflow-y-auto space-y-6 text-slate-900 font-sans printable-area">
          
          {/* Slip Header */}
          <div className="border-b-2 border-slate-900 pb-5 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg bg-blue-950 text-amber-400 font-black flex items-center justify-center text-sm">
                  C
                </div>
                <span className="text-xl font-black text-blue-950 tracking-tight">CONNECTOR</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold border border-slate-300">
                  Citizen Guidance Portal
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Independent Digital Public Infrastructure Guidance Service • Government of India Welfare Catalog
              </p>
            </div>

            <div className="text-right text-xs">
              <div className="font-mono font-bold text-slate-900">{slipId}</div>
              <div className="text-slate-500 mt-0.5">Date: {dateStr}</div>
              <div className="text-emerald-700 font-bold mt-0.5">✓ Pre-Verification Ready</div>
            </div>
          </div>

          {/* Citizen Demographics Box */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
              Citizen Demographics
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-slate-500 block">Applicant Name:</span>
                <strong className="text-slate-900 font-bold">{profile.fullName}</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Registered Mobile:</span>
                <strong className="text-slate-900 font-bold">{profile.phone}</strong>
              </div>
              <div>
                <span className="text-slate-500 block">State & District:</span>
                <strong className="text-slate-900 font-bold">{profile.state}, {profile.district}</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Social Category:</span>
                <strong className="text-slate-900 font-bold">{profile.socialCategory}</strong>
              </div>
            </div>
          </div>

          {/* Target Welfare Scheme Box */}
          <div className="border-2 border-blue-900 rounded-2xl p-5 bg-blue-50/40 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-blue-800">{scheme.ministry}</span>
                <h3 className="text-lg font-black text-blue-950 mt-0.5">{scheme.name}</h3>
                <div className="text-xs text-slate-600 mt-1">{scheme.tagline}</div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[11px] uppercase tracking-wider font-bold text-amber-800 block">Entitlement</span>
                <span className="text-sm font-black text-slate-900 bg-amber-100 px-3 py-1 rounded-lg border border-amber-300 inline-block mt-0.5">
                  {scheme.financialBenefit}
                </span>
              </div>
            </div>
          </div>

          {/* Mandatory Documents Checklist for Verification */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-blue-900" />
              <span>Mandatory Documents Required at CSC / Portal:</span>
            </h4>

            <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden text-xs">
              {scheme.documentsRequired.map((doc, idx) => (
                <div key={idx} className="p-3 flex items-center justify-between bg-white">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <span className="font-bold text-slate-900">{doc.name}</span>
                      <span className="text-slate-500 text-[11px] block">{doc.detail}</span>
                    </div>
                  </div>
                  <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                    {doc.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Official Submission Gate / QR Code Representation */}
          <div className="bg-slate-100 rounded-2xl p-5 border border-slate-200 flex items-center justify-between gap-4">
            <div className="space-y-1 text-xs">
              <strong className="text-blue-950 block text-sm">Designated Official Portal for Submission:</strong>
              <div className="font-mono text-blue-900 font-bold">{scheme.officialUrl}</div>
              <div className="text-slate-500">Helpline: {scheme.helplineNumber || '1800-11-0001'}</div>
            </div>

            {/* Visual QR Code Mock */}
            <div className="w-20 h-20 bg-white p-2 rounded-xl border border-slate-300 flex flex-col items-center justify-center shrink-0">
              <QrCode className="w-12 h-12 text-slate-900" />
              <span className="text-[8px] font-bold text-slate-500 mt-1 uppercase">Official URL</span>
            </div>
          </div>

          {/* Footer Statutory Notice */}
          <div className="pt-4 border-t border-slate-200 text-[10px] text-slate-500 leading-relaxed text-center">
            *NOTICE: CONNECTOR is an independent citizen preparation platform and does not guarantee benefit sanction. Final verification and disbursement are executed solely by designated Central/State Government Authorities upon official submission on {scheme.officialUrl}.
          </div>

        </div>

      </div>

    </div>
  );
}
