import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  ShieldCheck, 
  Building, 
  IndianRupee, 
  CheckCircle2, 
  FileText, 
  Clock, 
  Phone, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Bookmark,
  Share2,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';

export default function SchemeDetailsModal({ scheme, onClose, onPrepareApplication, onOpenAssistantWithPrompt }) {
  const { lang, t } = useLanguage();
  const { isBookmarked, toggleBookmark } = useUser();
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // overview, eligibility, documents, steps, faqs
  const [checkedCriteria, setCheckedCriteria] = useState({});

  if (!scheme) return null;

  const bookmarked = isBookmarked(scheme.id);

  const toggleCriterion = (idx) => {
    setCheckedCriteria(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const shareScheme = () => {
    if (navigator.share) {
      navigator.share({
        title: scheme.name,
        text: scheme.tagline,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${scheme.name} - Official Portal: ${scheme.officialUrl}`);
      alert(lang === 'hi' ? 'लिंक कॉपी कर लिया गया है!' : 'Scheme details copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Top Header */}
        <div className="bg-blue-950 text-white p-6 sm:p-8 relative shrink-0">
          <div className="flex items-start justify-between gap-4 mb-4">
            
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-blue-800 text-blue-200 border border-blue-700">
                <Building className="w-3.5 h-3.5" />
                {scheme.sponsor}
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                {scheme.verifiedDate || (lang === 'hi' ? 'सरकारी गजट से सत्यापित' : 'Verified Official Data')}
              </span>
            </div>

            {/* Close & Share */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleBookmark(scheme.id)}
                className={`p-2 rounded-xl transition-colors ${
                  bookmarked ? 'bg-amber-500 text-slate-950' : 'bg-blue-900/80 hover:bg-blue-800 text-white'
                }`}
                title={bookmarked ? "Bookmarked" : "Bookmark"}
              >
                <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={shareScheme}
                className="p-2 rounded-xl bg-blue-900/80 hover:bg-blue-800 text-white transition-colors"
                title="Share Scheme"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-blue-900/80 hover:bg-red-600 text-white transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-blue-300 font-medium mb-1">
            {scheme.ministry}
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-white leading-tight">
            {scheme.name}
          </h2>
          {scheme.hindiName && (
            <div className="text-sm sm:text-base text-amber-300/90 font-medium mt-1">
              {scheme.hindiName}
            </div>
          )}
          <p className="text-xs sm:text-sm text-blue-200/90 mt-2 line-clamp-2">
            {scheme.tagline}
          </p>

          {/* Quick Tabs Bar */}
          <div className="flex items-center gap-1 sm:gap-2 mt-6 overflow-x-auto pb-1 text-xs sm:text-sm border-t border-blue-900/80 pt-4">
            {[
              { id: 'overview', label: lang === 'hi' ? 'विवरण एवं लाभ' : 'Overview & Benefits' },
              { id: 'eligibility', label: lang === 'hi' ? 'पात्रता जांचें' : 'Eligibility Checklist' },
              { id: 'documents', label: lang === 'hi' ? 'दस्तावेज' : 'Required Documents' },
              { id: 'steps', label: lang === 'hi' ? 'आवेदन प्रक्रिया' : 'Application Process' },
              { id: 'faqs', label: lang === 'hi' ? 'प्रश्नोत्तरी (FAQ)' : 'FAQs' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-blue-200 hover:text-white hover:bg-blue-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-800">
          
          {/* TAB 1: OVERVIEW & BENEFITS */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Financial Assistance Card */}
              {scheme.financialBenefit && (
                <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0">
                    <IndianRupee className="w-6 h-6 font-bold" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-amber-800">
                      {lang === 'hi' ? 'प्रत्यक्ष वित्तीय सहायता (DBT)' : 'Direct Financial Benefit'}
                    </div>
                    <div className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">
                      {scheme.financialBenefit}
                    </div>
                    <div className="text-xs text-slate-600 mt-1">
                      {lang === 'hi' ? 'सीधे आधार से जुड़े बैंक खाते में अंतरित' : 'Credited directly to Aadhaar-seeded bank account'}
                    </div>
                  </div>
                </div>
              )}

              {/* Scheme Brief */}
              <div>
                <h3 className="text-base sm:text-lg font-bold text-blue-950 mb-2">
                  {lang === 'hi' ? 'योजना का उद्देश्य एवं विवरण' : 'Scheme Overview & Objectives'}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {scheme.brief}
                </p>
              </div>

              {/* Key Benefits List */}
              <div>
                <h3 className="text-base sm:text-lg font-bold text-blue-950 mb-3">
                  {lang === 'hi' ? 'प्रमुख लाभ एवं विशेषताएं' : 'Key Scheme Benefits'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {scheme.benefits.map((benefit, idx) => (
                    <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700 leading-snug">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ask AI Helper Banner */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-900 text-white flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-blue-950">
                      {lang === 'hi' ? 'क्या इस योजना के बारे में कोई सवाल है?' : 'Have specific questions about this scheme?'}
                    </h4>
                    <p className="text-xs text-slate-600">
                      {lang === 'hi' ? 'हमारे AI सहायक से अपनी भाषा में सीधे पूछें।' : 'Ask our voice-enabled AI companion in plain Hindi or English.'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onOpenAssistantWithPrompt(`Tell me everything about ${scheme.name} and how I can qualify.`);
                  }}
                  className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded-xl text-xs flex items-center gap-1.5 shrink-0 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>{lang === 'hi' ? 'AI सहायक से पूछें' : 'Ask AI Assistant'}</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: ELIGIBILITY CHECKLIST */}
          {activeTab === 'eligibility' && (
            <div className="space-y-6">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
                <h3 className="text-sm font-bold text-emerald-950 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  {lang === 'hi' ? 'पात्रता सारांश' : 'Eligibility Summary'}
                </h3>
                <p className="text-xs sm:text-sm text-emerald-900 mt-1">
                  {scheme.eligibilityCriteria.summary}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-blue-950 mb-3">
                  {lang === 'hi' ? 'स्व-मूल्यांकन चेकलिस्ट (टिक करें)' : 'Interactive Eligibility Checklist (Click to verify)'}
                </h4>
                <div className="space-y-2.5">
                  {[
                    `Age must be between ${scheme.eligibilityCriteria.minAge || 0} and ${scheme.eligibilityCriteria.maxAge || 100} years`,
                    scheme.eligibilityCriteria.maxIncome 
                      ? `Annual family income must be ≤ ₹${scheme.eligibilityCriteria.maxIncome.toLocaleString('en-IN')}` 
                      : `Open across income slabs (subject to non-income-tax payer rules)`,
                    scheme.eligibilityCriteria.landRequired 
                      ? `Must own cultivable agricultural land in applicant's name` 
                      : `No agricultural landholding condition required`,
                    `Valid Indian Resident citizenship with active Aadhaar card`
                  ].map((criterion, idx) => (
                    <div
                      key={idx}
                      onClick={() => toggleCriterion(idx)}
                      className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                        checkedCriteria[idx]
                          ? 'bg-blue-50 border-blue-400 text-blue-950'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded flex items-center justify-center border ${
                          checkedCriteria[idx] ? 'bg-blue-900 border-blue-900 text-white' : 'border-slate-300'
                        }`}>
                          {checkedCriteria[idx] && <CheckCircle2 className="w-4 h-4" />}
                        </div>
                        <span className="text-xs sm:text-sm font-medium">{criterion}</span>
                      </div>
                      <span className="text-[11px] font-bold uppercase text-slate-400">
                        {checkedCriteria[idx] ? 'Verified' : 'Click to Check'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exclusions */}
              {scheme.eligibilityCriteria.exclusions && scheme.eligibilityCriteria.exclusions.length > 0 && (
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl">
                  <h4 className="text-xs sm:text-sm font-bold text-rose-950 flex items-center gap-1.5 mb-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    {lang === 'hi' ? 'अपात्रता / बहिष्करण शर्तें (ये नागरिक पात्र नहीं हैं):' : 'Exclusion Criteria (Who is NOT eligible):'}
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-xs text-rose-900">
                    {scheme.eligibilityCriteria.exclusions.map((ex, exIdx) => (
                      <li key={exIdx}>{ex}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: REQUIRED DOCUMENTS */}
          {activeTab === 'documents' && (
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-slate-600">
                {lang === 'hi' 
                  ? 'आवेदन से पूर्व निम्नलिखित दस्तावेजों की मूल एवं स्व-हस्ताक्षरित छायाप्रति तैयार रखें:' 
                  : 'Ensure you have valid original and self-attested copies of the following documents before applying:'}
              </p>

              <div className="space-y-3">
                {scheme.documentsRequired.map((doc, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-900 flex items-center justify-center shrink-0 mt-0.5">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900">{doc.name}</h4>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            doc.mandatory ? 'bg-rose-100 text-rose-800' : 'bg-slate-200 text-slate-700'
                          }`}>
                            {doc.mandatory ? (lang === 'hi' ? 'अनिवार्य' : 'Mandatory') : 'Optional'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          {doc.detail}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-blue-800 bg-white px-2.5 py-1 rounded-md border border-slate-200 shrink-0">
                      {doc.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: APPLICATION PROCESS */}
          {activeTab === 'steps' && (
            <div className="space-y-6">
              <p className="text-xs sm:text-sm text-slate-600">
                {lang === 'hi' 
                  ? 'सफल आवेदन के लिए नीचे दिए गए क्रम का पालन करें:' 
                  : 'Follow this sequential roadmap to successfully complete your application:'}
              </p>

              <div className="relative border-l-2 border-blue-200 ml-4 pl-6 space-y-6">
                {scheme.applicationSteps.map((step, idx) => (
                  <div key={idx} className="relative group">
                    <div className="absolute -left-[35px] top-0 w-7 h-7 rounded-full bg-blue-900 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-blue-950">
                        {step.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: FAQS */}
          {activeTab === 'faqs' && (
            <div className="space-y-3">
              {scheme.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden transition-all">
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-4 text-left font-bold text-xs sm:text-sm text-blue-950 bg-slate-50 hover:bg-slate-100 flex items-center justify-between gap-3"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 shrink-0 text-slate-400" /> : <ChevronDown className="w-4 h-4 shrink-0 text-slate-400" />}
                    </button>
                    {isOpen && (
                      <div className="p-4 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Phone className="w-4 h-4 text-slate-400" />
            <span>{lang === 'hi' ? 'टोल-फ्री हेल्पलाइन:' : 'Official Helpline:'}</span>
            <strong className="text-slate-800">{scheme.helplineNumber || '1800-11-0001'}</strong>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onPrepareApplication(scheme);
              }}
              className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <FileText className="w-4 h-4" />
              <span>{lang === 'hi' ? 'आवेदन तैयार करें' : 'Prepare Application'}</span>
            </button>

            <a
              href={scheme.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-transform hover:scale-105 flex items-center justify-center gap-2 shadow-md"
            >
              <span>{lang === 'hi' ? 'सरकारी पोर्टल पर जाएं' : 'Go to Official Portal'}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
