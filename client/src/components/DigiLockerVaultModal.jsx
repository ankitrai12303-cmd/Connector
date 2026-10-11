import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  RefreshCw, 
  FileText, 
  ExternalLink, 
  AlertCircle,
  Download
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function DigiLockerVaultModal({ isOpen, onClose }) {
  const { lang } = useLanguage();
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);

  const [documents, setDocuments] = useState([
    { id: 'aadhaar', name: 'Aadhaar Card', issuer: 'UIDAI', status: 'verified', docNo: 'XXXX-XXXX-4812', date: 'Active e-KYC' },
    { id: 'ration', name: 'Ration Card (NFSA BPL)', issuer: 'Food & Civil Supplies', status: 'verified', docNo: 'RC-981249120', date: 'Valid 2026' },
    { id: 'income', name: 'Income Certificate (≤ ₹1L)', issuer: 'Revenue Dept / Tehsildar', status: 'verified', docNo: 'INC-2026-8812', date: 'Current FY' },
    { id: 'caste', name: 'Caste Certificate (OBC)', issuer: 'District Magistrate Office', status: 'verified', docNo: 'CST-49128', date: 'Digitally Signed' },
    { id: 'marksheet', name: 'Class 10th / 12th Certificate', issuer: 'State Education Board', status: 'verified', docNo: 'ED-771291', date: 'Verified' },
    { id: 'land', name: 'Land Record (Khatauni / RoR)', issuer: 'Revenue Council (Bhulekh)', status: 'pending', docNo: 'Khasra 142/A-2', date: 'Awaiting Update' }
  ]);

  if (!isOpen) return null;

  const handleSyncDigiLocker = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncSuccess(true);
      // Mark all as verified
      setDocuments(prev => prev.map(d => ({ ...d, status: 'verified' })));
      setTimeout(() => setSyncSuccess(false), 3000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      <div className="bg-white rounded-3xl w-full max-w-2xl flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-950 to-blue-900 text-white p-6 flex items-center justify-between border-b border-blue-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-md">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg text-white">
                  DigiLocker Citizen Document Vault
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  GovTech Sandbox
                </span>
              </div>
              <p className="text-xs text-blue-200">
                Verify and manage certificates for zero-hassle welfare applications
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-blue-900/80 hover:bg-red-600 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* DigiLocker Sync CTA */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-blue-900 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-blue-950">
                  DigiLocker Digital Document Verification
                </h4>
                <p className="text-xs text-slate-600">
                  Digitally fetch your verified certificates directly from UIDAI, CBSE, and State Portals.
                </p>
              </div>
            </div>

            <button
              onClick={handleSyncDigiLocker}
              disabled={isSyncing}
              className="shrink-0 px-4 py-2.5 bg-blue-950 hover:bg-blue-900 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition-transform hover:scale-105 shadow-md cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : 'Sync with DigiLocker'}</span>
            </button>
          </div>

          {syncSuccess && (
            <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>All 6 essential documents successfully verified and synced!</span>
            </div>
          )}

          {/* Documents Table */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Verified Digital Documents Checklist:
            </h4>

            <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden text-xs">
              {documents.map((doc) => (
                <div key={doc.id} className="p-3.5 bg-white flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      doc.status === 'verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{doc.name}</div>
                      <div className="text-[11px] text-slate-500">{doc.issuer} • {doc.docNo}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] flex items-center gap-1 ${
                      doc.status === 'verified' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      <CheckCircle2 className="w-3 h-3" />
                      {doc.status === 'verified' ? 'DigiLocker Verified' : 'Pending Upload'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-500 leading-relaxed">
            <strong>Security Notice:</strong> In accordance with Digital India data protection standards, CONNECTOR stores credentials only in your private browser sandbox session. No Aadhaar biometric or banking passwords are ever retained or transmitted.
          </div>

        </div>

      </div>

    </div>
  );
}
