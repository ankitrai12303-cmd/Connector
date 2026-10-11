import React, { useState } from 'react';
import { ShieldCheck, Info, X, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function DisclaimerBanner() {
  const { lang } = useLanguage();
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  return (
    <aside aria-label="Official guidance disclaimer" className="bg-blue-950 text-blue-100 text-xs sm:text-sm border-b border-blue-800">
      <div className="max-w-7xl mx-auto px-4 py-2 sm:py-2.5 flex items-start sm:items-center justify-between gap-3">
        <div className="flex items-start sm:items-center gap-2.5 flex-1">
          <div className="p-1 bg-amber-500/20 text-amber-400 rounded mt-0.5 sm:mt-0 shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <p className="leading-snug">
            <strong className="text-white font-medium">
              {lang === 'hi' ? 'नागरिक विश्वास सूचना: ' : 'Citizen Trust Notice: '}
            </strong>
            {lang === 'hi' 
              ? 'CONNECTOR एक स्वतंत्र नागरिक मार्गदर्शन मंच है। हम कभी ओटीपी, पासवर्ड या कोई शुल्क नहीं मांगते। सभी योजनाएं आधिकारिक सरकारी पोर्टल्स (.gov.in) द्वारा संचालित हैं।' 
              : 'CONNECTOR is an independent guidance platform. We never ask for OTPs, passwords, or fees. All final applications are verified on official government portals (.gov.in / .nic.in).'}
          </p>
        </div>
        <button 
          onClick={() => setClosed(true)}
          className="text-blue-300 hover:text-white p-1 rounded-full hover:bg-blue-900 transition-colors"
          title="Dismiss banner"
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
