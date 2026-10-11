import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  Mic, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  Building,
  HelpCircle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Hero({ onSearchSubmit, onFindSchemesClick, onVoiceAssistantClick, onExploreClick }) {
  const { lang, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit(searchTerm);
  };

  const sampleTags = [
    { label: "PM-KISAN ₹6,000", q: "kisan" },
    { label: "Ayushman 5 Lakh Card", q: "ayushman" },
    { label: "PM Vishwakarma ₹15,000", q: "vishwakarma" },
    { label: "Post-Matric Scholarship", q: "scholarship" },
    { label: "Pucca Makaan (PMAY)", q: "awas" },
    { label: "Sukanya Samriddhi (SSY)", q: "sukanya" },
    { label: "Mudra Loan ₹50k-₹20L", q: "mudra" }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-950 via-blue-900 to-slate-900 text-white pt-12 pb-20 px-4 sm:px-6">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-800/80 border border-blue-600/60 text-blue-200 text-xs sm:text-sm font-medium mb-6 backdrop-blur-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>{t('heroBadge')}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          <span className="text-amber-300">National Welfare Catalog</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-5 text-white">
          {lang === 'hi' ? (
            <>
              हर सरकारी योजना। <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-emerald-400">
                एक सरल डिजिटल मंच।
              </span>
            </>
          ) : (
            <>
              Every Government Scheme. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-emerald-400">
                One Simple Platform.
              </span>
            </>
          )}
        </h1>

        {/* Hero Description */}
        <p className="text-base sm:text-xl text-blue-100/90 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
          {lang === 'hi' 
            ? 'अपनी पात्र कल्याणकारी योजनाएं खोजें, उनके लाभों को सरल भाषा में समझें और एआई मार्गदर्शन के साथ चरण-दर-चरण आवेदन करें।'
            : 'Discover eligible government schemes, understand their benefits, and apply with step-by-step AI assistance.'}
        </p>

        {/* Prominent Search Bar */}
        <form onSubmit={handleFormSubmit} className="max-w-3xl mx-auto mb-6">
          <div className="relative flex items-center bg-white rounded-2xl p-2 shadow-2xl border-2 border-amber-400/80 focus-within:ring-4 focus-within:ring-amber-400/30 transition-all">
            <div className="pl-3.5 pr-2 text-slate-400">
              <Search className="w-6 h-6 text-blue-900" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={lang === 'hi' 
                ? 'योजना का नाम, समस्या या लाभ खोजें (जैसे: किसान, छात्रवृत्ति, 5 लाख इलाज)...' 
                : 'Search schemes by name, problem, or benefit (e.g., kisan, scholarship, free hospital)...'}
              className="w-full py-3.5 px-2 text-slate-900 placeholder-slate-400 text-sm sm:text-base focus:outline-hidden font-medium bg-transparent"
            />
            {searchTerm && (
              <button 
                type="button" 
                onClick={() => setSearchTerm('')} 
                className="text-slate-400 hover:text-slate-600 px-2 text-xs"
              >
                Clear
              </button>
            )}
            <button
              type="submit"
              className="shrink-0 bg-blue-950 hover:bg-blue-900 text-white px-5 sm:px-7 py-3 rounded-xl font-semibold text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <span>{lang === 'hi' ? 'खोजें' : 'Search'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Sample Trending Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto mb-10 text-xs">
          <span className="text-blue-300 font-medium mr-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
            {lang === 'hi' ? 'लोकप्रिय खोज:' : 'Popular:'}
          </span>
          {sampleTags.map((tag, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setSearchTerm(tag.q);
                onSearchSubmit(tag.q);
              }}
              className="px-3 py-1 rounded-full bg-blue-900/80 hover:bg-amber-500 hover:text-blue-950 border border-blue-700/60 text-blue-200 transition-colors cursor-pointer"
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* 3 Prominent Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-xl mx-auto">
          {/* Button 1: Find My Schemes */}
          <button
            onClick={onFindSchemesClick}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
          >
            <Sparkles className="w-5 h-5 text-slate-950" />
            <span>{t('findMySchemes')}</span>
          </button>

          {/* Button 2: AI Voice Assistant */}
          <button
            onClick={onVoiceAssistantClick}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-blue-800 hover:bg-blue-700 text-white font-bold text-sm sm:text-base border border-blue-600 shadow-md transition-transform hover:-translate-y-0.5"
          >
            <Mic className="w-5 h-5 text-emerald-400 animate-pulse" />
            <span>{t('aiVoiceAssistant')}</span>
          </button>

          {/* Button 3: Explore Schemes */}
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-white font-bold text-sm sm:text-base border border-slate-600 shadow-sm transition-transform hover:-translate-y-0.5"
          >
            <span>{t('exploreSchemes')}</span>
          </button>
        </div>

      </div>

      {/* Live Statistics Ticker */}
      <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-blue-800/60 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div className="p-3">
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">500+</div>
          <div className="text-xs sm:text-sm text-blue-200 mt-1">Government Schemes Cataloged</div>
        </div>
        <div className="p-3">
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">1.2M+</div>
          <div className="text-xs sm:text-sm text-blue-200 mt-1">Indian Citizens Guided</div>
        </div>
        <div className="p-3">
          <div className="text-2xl sm:text-3xl font-extrabold text-blue-300">₹15,000+ Cr</div>
          <div className="text-xs sm:text-sm text-blue-200 mt-1">Direct Benefit Transfer (DBT) Tracked</div>
        </div>
        <div className="p-3">
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-300">28 States & UTs</div>
          <div className="text-xs sm:text-sm text-blue-200 mt-1">Official Portals Integrated</div>
        </div>
      </div>

    </section>
  );
}
