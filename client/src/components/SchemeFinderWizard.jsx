import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  Filter, 
  User, 
  Briefcase, 
  IndianRupee, 
  CheckSquare, 
  AlertCircle,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import SchemeCard from './SchemeCard';

export default function SchemeFinderWizard({ onViewScheme, onPrepareApplication }) {
  const { lang, t } = useLanguage();
  const { profile, updateProfile } = useUser();

  const [step, setStep] = useState(1); // 1: Demographics, 2: Occupation, 3: Household & Needs, 4: Results
  const [formData, setFormData] = useState({
    age: profile.age || 32,
    gender: profile.gender || 'male',
    state: profile.state || 'Uttar Pradesh',
    district: profile.district || 'Varanasi',
    occupation: profile.occupation || 'farmer',
    socialCategory: profile.socialCategory || 'OBC',
    education: profile.education || '10th Pass',
    income: profile.annualIncome || 95000,
    hasLand: profile.hasLand !== undefined ? profile.hasLand : true,
    hasPuccaHouse: profile.hasPuccaHouse !== undefined ? profile.hasPuccaHouse : false,
    isDisability: profile.isDisability !== undefined ? profile.isDisability : false,
    isPregnant: profile.isPregnant !== undefined ? profile.isPregnant : false,
    hasGirlChildUnder10: profile.hasGirlChildUnder10 !== undefined ? profile.hasGirlChildUnder10 : true
  });

  const [isLoading, setIsLoading] = useState(false);
  const [matches, setMatches] = useState([]);
  const [activeResultsTab, setActiveResultsTab] = useState('eligible'); // 'eligible' or 'partial'

  const indianStates = [
    "All India",
    "Andhra Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Delhi",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Tamil Nadu",
    "Telangana",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal"
  ];

  const occupationsList = [
    { id: "farmer", label: lang === 'hi' ? 'किसान / कृषि श्रमिक' : 'Farmer / Agricultural Laborer', icon: "🌾" },
    { id: "student", label: lang === 'hi' ? 'छात्र / विद्यार्थी' : 'Student (School / College)', icon: "🎓" },
    { id: "street_vendor", label: lang === 'hi' ? 'रेहड़ी-पटरी / छोटा दुकानदार' : 'Street Vendor / Hawker', icon: "🛒" },
    { id: "artisan", label: lang === 'hi' ? 'पारंपरिक कारीगर / हस्तशिल्पी (बढ़ई, लोहार, दर्जी)' : 'Artisan / Traditional Craftsperson', icon: "🔨" },
    { id: "shg_member", label: lang === 'hi' ? 'महिला स्वयं सहायता समूह (SHG) सदस्य' : 'Women SHG Member', icon: "🤝" },
    { id: "self_employed", label: lang === 'hi' ? 'स्वरोजगार / छोटा उद्यमी' : 'Self-Employed / MSME', icon: "💼" },
    { id: "unemployed", label: lang === 'hi' ? 'बेरोजगार / नौकरी की तलाश में' : 'Unemployed Youth / Job Seeker', icon: "🔍" },
    { id: "daily_wage", label: lang === 'hi' ? 'दैनिक मजदूरी / अकुशल श्रमिक' : 'Daily Wage Worker', icon: "🧱" },
    { id: "other", label: lang === 'hi' ? 'अन्य नागरिक' : 'Other Citizen', icon: "👤" }
  ];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
      window.scrollTo({ top: 300, behavior: 'smooth' });
    } else {
      runEvaluation();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const runEvaluation = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/eligibility/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setMatches(data.matches || []);
        setStep(4);
        // Save to user profile context
        updateProfile({
          age: formData.age,
          gender: formData.gender,
          state: formData.state,
          district: formData.district,
          occupation: formData.occupation,
          socialCategory: formData.socialCategory,
          annualIncome: formData.income,
          hasLand: formData.hasLand,
          hasPuccaHouse: formData.hasPuccaHouse,
          isDisability: formData.isDisability,
          isPregnant: formData.isPregnant,
          hasGirlChildUnder10: formData.hasGirlChildUnder10
        });

        // Trigger celebratory confetti if eligible schemes exist
        if (data.eligibleCount > 0) {
          try {
            confetti({
              particleCount: 75,
              spread: 60,
              origin: { y: 0.6 }
            });
          } catch (e) {}
        }
      }
    } catch (err) {
      console.error("Evaluation error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const eligibleMatches = matches.filter(m => m.matchStatus === 'eligible');
  const partialMatches = matches.filter(m => m.matchStatus === 'partially_eligible');

  return (
    <section className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Wizard Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            {lang === 'hi' ? 'इंटेलिजेंट पात्रता इंजन' : 'Rule-Based Match Engine'}
          </div>
          <h2 className="text-3xl font-extrabold text-blue-950">
            {t('finderTitle')}
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            {t('finderSubtitle')}
          </p>
        </div>

        {/* Progress Stepper Bar (if not in results) */}
        {step < 4 && (
          <div className="max-w-2xl mx-auto mb-10">
            <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
              {[
                { s: 1, label: lang === 'hi' ? '1. व्यक्तिगत' : '1. Demographics' },
                { s: 2, label: lang === 'hi' ? '2. पेशा' : '2. Occupation' },
                { s: 3, label: lang === 'hi' ? '3. आर्थिक स्थिति' : '3. Household' }
              ].map(item => (
                <div key={item.s} className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs mb-1.5 transition-colors ${
                    step === item.s 
                      ? 'bg-blue-950 text-white ring-4 ring-blue-100' 
                      : step > item.s 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-slate-200 text-slate-500'
                  }`}>
                    {step > item.s ? <CheckCircle2 className="w-4 h-4" /> : item.s}
                  </div>
                  <span className={`text-[11px] sm:text-xs font-semibold ${
                    step === item.s ? 'text-blue-950' : 'text-slate-400'
                  }`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
            {/* Horizontal Track */}
            <div className="w-full bg-slate-200 h-1 rounded-full mt-3 overflow-hidden">
              <div 
                className="bg-blue-950 h-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* STEP 1: DEMOGRAPHICS */}
        {step === 1 && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs max-w-2xl mx-auto space-y-6">
            <h3 className="text-xl font-bold text-blue-950 pb-3 border-b border-slate-100 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-800" />
              <span>{lang === 'hi' ? 'बुनियादी व्यक्तिगत विवरण' : 'Basic Demographic Details'}</span>
            </h3>

            {/* Age */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                {t('ageLabel')} (18 - 80)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="1"
                  max="90"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value, 10) })}
                  className="flex-1 accent-blue-950 cursor-pointer"
                />
                <span className="w-16 text-center py-2 bg-slate-100 border border-slate-200 rounded-xl font-extrabold text-blue-950 text-lg">
                  {formData.age} <span className="text-xs text-slate-500 font-normal">yrs</span>
                </span>
              </div>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                {t('genderLabel')}
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'male', label: t('male') },
                  { id: 'female', label: t('female') },
                  { id: 'transgender', label: t('transgender') }
                ].map(g => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, gender: g.id })}
                    className={`p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      formData.gender === g.id
                        ? 'bg-blue-950 text-white border-blue-950 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            {/* State & District */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  {t('stateLabel')}
                </label>
                <select
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-800 focus:outline-hidden focus:border-blue-950"
                >
                  {indianStates.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  {lang === 'hi' ? 'जिला' : 'District'}
                </label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  placeholder="e.g. Varanasi, Lucknow, Patna..."
                  className="w-full p-3 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-800 focus:outline-hidden focus:border-blue-950"
                />
              </div>
            </div>

            {/* Social Category */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                {t('socialCategoryLabel')}
              </label>
              <div className="grid grid-cols-5 gap-2">
                {['General', 'OBC', 'SC', 'ST', 'EWS'].map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFormData({ ...formData, socialCategory: cat })}
                    className={`py-2 px-1 rounded-xl border text-xs font-bold transition-all ${
                      formData.socialCategory === cat
                        ? 'bg-blue-950 text-white border-blue-950'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Next Button */}
            <div className="pt-4 flex justify-end">
              <button
                onClick={handleNext}
                className="px-6 py-3.5 bg-blue-950 hover:bg-blue-900 text-white font-bold rounded-xl text-sm transition-transform hover:scale-105 flex items-center gap-2 shadow-md"
              >
                <span>{lang === 'hi' ? 'अगला: व्यवसाय' : 'Next: Occupation'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: OCCUPATION & EDUCATION */}
        {step === 2 && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs max-w-2xl mx-auto space-y-6">
            <h3 className="text-xl font-bold text-blue-950 pb-3 border-b border-slate-100 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-800" />
              <span>{lang === 'hi' ? 'व्यवसाय एवं शिक्षा स्तर' : 'Occupation & Education Level'}</span>
            </h3>

            {/* Occupations Grid */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
                {t('occupationLabel')}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {occupationsList.map(occ => (
                  <button
                    key={occ.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, occupation: occ.id })}
                    className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                      formData.occupation === occ.id
                        ? 'bg-blue-950 text-white border-blue-950 shadow-xs'
                        : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-xl">{occ.icon}</span>
                    <span className="text-xs sm:text-sm font-semibold">{occ.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Education Level */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                {lang === 'hi' ? 'उच्चतम शैक्षणिक योग्यता' : 'Highest Education Level'}
              </label>
              <select
                value={formData.education}
                onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-800 focus:outline-hidden focus:border-blue-950"
              >
                {['Below 10th', '10th Pass', '12th Pass', 'Diploma / ITI', 'Undergraduate / College', 'Postgraduate'].map(ed => (
                  <option key={ed} value={ed}>{ed}</option>
                ))}
              </select>
            </div>

            {/* Nav Buttons */}
            <div className="pt-4 flex items-center justify-between">
              <button
                onClick={handleBack}
                className="px-4 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-sm flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{lang === 'hi' ? 'पीछे' : 'Back'}</span>
              </button>

              <button
                onClick={handleNext}
                className="px-6 py-3.5 bg-blue-950 hover:bg-blue-900 text-white font-bold rounded-xl text-sm transition-transform hover:scale-105 flex items-center gap-2 shadow-md"
              >
                <span>{lang === 'hi' ? 'अगला: आर्थिक स्थिति' : 'Next: Economic Profile'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: HOUSEHOLD & SPECIFIC NEEDS */}
        {step === 3 && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs max-w-2xl mx-auto space-y-6">
            <h3 className="text-xl font-bold text-blue-950 pb-3 border-b border-slate-100 flex items-center gap-2">
              <IndianRupee className="w-5 h-5 text-blue-800" />
              <span>{lang === 'hi' ? 'पारिवारिक आय एवं विशेष आवश्यकताएं' : 'Economic Status & Specific Needs'}</span>
            </h3>

            {/* Annual Income */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                {t('incomeLabel')}
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="30000"
                  max="1200000"
                  step="10000"
                  value={formData.income}
                  onChange={(e) => setFormData({ ...formData, income: parseInt(e.target.value, 10) })}
                  className="flex-1 accent-blue-950 cursor-pointer"
                />
                <span className="w-32 text-center py-2 bg-slate-100 border border-slate-200 rounded-xl font-extrabold text-blue-950 text-base">
                  ₹{formData.income.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                {formData.income <= 100000 
                  ? 'BPL / Antyodaya Category (Highest welfare priority)' 
                  : formData.income <= 300000 
                    ? 'EWS (Economically Weaker Section)' 
                    : formData.income <= 600000 
                      ? 'LIG (Low Income Group)' 
                      : 'MIG / Standard Income Group'}
              </p>
            </div>

            {/* Specific Condition Toggles */}
            <div className="space-y-3 pt-2">
              {[
                { key: 'hasLand', label: t('landLabel'), sub: 'Required for PM-KISAN & PMFBY' },
                { key: 'hasPuccaHouse', label: t('puccaHouseLabel'), sub: 'Affects PMAY housing eligibility' },
                { key: 'isDisability', label: t('disabilityLabel'), sub: 'Qualifies for ADIP & special concessions' },
                { key: 'isPregnant', label: t('pregnantLabel'), sub: 'Qualifies for PM Matru Vandana Yojana' },
                { key: 'hasGirlChildUnder10', label: t('girlChildLabel'), sub: 'Qualifies for Sukanya Samriddhi Yojana' }
              ].map(item => (
                <div 
                  key={item.key}
                  className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-800">{item.label}</div>
                    <div className="text-[10px] text-slate-500">{item.sub}</div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, [item.key]: true })}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                        formData[item.key] === true
                          ? 'bg-blue-950 text-white'
                          : 'bg-white border border-slate-300 text-slate-600'
                      }`}
                    >
                      {t('yes')}
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, [item.key]: false })}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                        formData[item.key] === false
                          ? 'bg-blue-950 text-white'
                          : 'bg-white border border-slate-300 text-slate-600'
                      }`}
                    >
                      {t('no')}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Nav Buttons */}
            <div className="pt-4 flex items-center justify-between">
              <button
                onClick={handleBack}
                className="px-4 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-sm flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{lang === 'hi' ? 'पीछे' : 'Back'}</span>
              </button>

              <button
                onClick={runEvaluation}
                disabled={isLoading}
                className="px-7 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black rounded-xl text-sm transition-transform hover:scale-105 flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isLoading ? (lang === 'hi' ? 'गणना जारी है...' : 'Evaluating...') : t('calculateMatches')}</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: RESULTS VIEW */}
        {step === 4 && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Results Summary Box */}
            <div className="bg-gradient-to-r from-blue-950 to-blue-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Evaluation Completed</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {lang === 'hi' 
                    ? `आपके लिए ${eligibleMatches.length} योजनाएं पूरी तरह पात्र पाई गईं!` 
                    : `We matched ${eligibleMatches.length} schemes with High Eligibility!`}
                </h3>
                <p className="text-xs sm:text-sm text-blue-200 mt-1 max-w-xl">
                  {lang === 'hi'
                    ? `प्रोफ़ाइल: ${formData.age} वर्ष • ${formData.occupation} • आय: ₹${formData.income.toLocaleString('en-IN')}/वर्ष • ${formData.state}`
                    : `Evaluated Profile: Age ${formData.age} • ${formData.occupation} • Income: ₹${formData.income.toLocaleString('en-IN')}/yr • ${formData.state}`}
                </p>
              </div>

              <button
                onClick={() => setStep(1)}
                className="px-4 py-2.5 bg-blue-800/80 hover:bg-blue-700 text-blue-200 hover:text-white rounded-xl text-xs font-semibold border border-blue-700 flex items-center gap-2 shrink-0 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{lang === 'hi' ? 'विवरण बदलें' : 'Recalculate'}</span>
              </button>
            </div>

            {/* Results Tab Switcher */}
            <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
              <button
                onClick={() => setActiveResultsTab('eligible')}
                className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors ${
                  activeResultsTab === 'eligible'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{t('eligibleSchemes')} ({eligibleMatches.length})</span>
              </button>

              <button
                onClick={() => setActiveResultsTab('partial')}
                className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors ${
                  activeResultsTab === 'partial'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                <AlertCircle className="w-4 h-4" />
                <span>{t('partialSchemes')} ({partialMatches.length})</span>
              </button>
            </div>

            {/* Display Matching Schemes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(activeResultsTab === 'eligible' ? eligibleMatches : partialMatches).map((item) => (
                <div key={item.scheme.id} className="relative flex flex-col">
                  {/* Match Score Banner on top */}
                  <div className={`p-2 rounded-t-2xl text-xs font-bold flex items-center justify-between ${
                    item.matchScore >= 90 
                      ? 'bg-emerald-700 text-white' 
                      : item.matchScore >= 70 
                        ? 'bg-blue-800 text-white' 
                        : 'bg-amber-700 text-white'
                  }`}>
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      {item.matchScore}% Match
                    </span>
                    <span className="text-[10px] uppercase font-semibold">
                      {item.matchStatus.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Scheme Card */}
                  <SchemeCard
                    scheme={item.scheme}
                    onViewDetails={onViewScheme}
                    onPrepareApplication={onPrepareApplication}
                  />

                  {/* Why You're Eligible Breakdown */}
                  <div className="bg-white p-3 rounded-b-2xl border-x border-b border-slate-200 text-xs space-y-1">
                    {item.reasons.map((r, rIdx) => (
                      <div key={rIdx} className="text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 shrink-0" />
                        <span className="line-clamp-1">{r}</span>
                      </div>
                    ))}
                    {item.missing.map((m, mIdx) => (
                      <div key={mIdx} className="text-amber-700 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span className="line-clamp-1">{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
