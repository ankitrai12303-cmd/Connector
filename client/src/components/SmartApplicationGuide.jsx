import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  ArrowRight, 
  ArrowLeft, 
  Save, 
  HelpCircle, 
  UploadCloud, 
  ShieldCheck, 
  Lock,
  Building,
  Info
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';

export default function SmartApplicationGuide({ preselectedScheme, allSchemes = [], onSelectScheme }) {
  const { lang, t } = useLanguage();
  const { profile, addOrUpdateApplication } = useUser();

  const [activeScheme, setActiveScheme] = useState(preselectedScheme || allSchemes[0] || null);
  const [guideStep, setGuideStep] = useState(1); // 1: Documents Checklist, 2: Field-by-Field Form, 3: Pre-submission Review & Official Portal Redirection
  
  // Document check statuses
  const [docStatuses, setDocStatuses] = useState({});

  // Form Fields simulator
  const [formData, setFormData] = useState({
    aadhaarNumber: "XXXX-XXXX-4812",
    fullName: profile.fullName || "Anil Kumar",
    fatherOrHusbandName: "Ram Prasad",
    mobileNumber: profile.phone || "+91 98765 12345",
    bankName: "State Bank of India",
    accountNumber: "32981002341",
    ifscCode: "SBIN0001234",
    aadhaarLinkedDBT: true,
    state: profile.state || "Uttar Pradesh",
    district: profile.district || "Varanasi",
    villageOrWard: "Kashi Nagar",
    subDistrict: "Sadar",
    landSurveyNumber: "142/A-2",
    annualIncome: profile.annualIncome || 95000,
    category: profile.socialCategory || "OBC"
  });

  const [saveSuccess, setSaveSuccess] = useState(false);
  const [fieldTooltips, setFieldTooltips] = useState({});

  useEffect(() => {
    if (preselectedScheme) {
      setActiveScheme(preselectedScheme);
    } else if (!activeScheme && allSchemes.length > 0) {
      setActiveScheme(allSchemes[0]);
    }
  }, [preselectedScheme, allSchemes]);

  // Initialize doc statuses when activeScheme changes
  useEffect(() => {
    if (activeScheme && activeScheme.documentsRequired) {
      const initial = {};
      activeScheme.documentsRequired.forEach((d, idx) => {
        initial[idx] = true; // default to checked for convenience in demo
      });
      setDocStatuses(initial);
    }
  }, [activeScheme]);

  const toggleDoc = (idx) => {
    setDocStatuses(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleSaveDraft = () => {
    if (!activeScheme) return;
    addOrUpdateApplication({
      schemeId: activeScheme.id,
      schemeName: activeScheme.name,
      status: "Draft Saved Locally",
      progress: guideStep === 1 ? 40 : guideStep === 2 ? 80 : 100
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  if (!activeScheme) {
    return (
      <div className="py-20 text-center text-slate-500">
        No scheme selected for preparation. Please choose a scheme first.
      </div>
    );
  }

  const allMandatoryDocsChecked = activeScheme.documentsRequired
    ? activeScheme.documentsRequired.every((d, idx) => !d.mandatory || docStatuses[idx])
    : true;

  return (
    <section className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-2">
              <FileText className="w-3.5 h-3.5" />
              {lang === 'hi' ? 'स्मार्ट आवेदन मार्गदर्शिका' : 'Smart Application Guide'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-950">
              {lang === 'hi' ? 'आवेदन की तैयारी व सहायता' : 'Step-by-Step Application Preparation'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {lang === 'hi' 
                ? 'सरकारी फॉर्म भरने से पहले सभी विवरण और दस्तावेज यहां तैयार करें ताकि फॉर्म अस्वीकार न हो।' 
                : 'Prepare your details and verify document readiness prior to final submission on the official portal.'}
            </p>
          </div>

          {/* Scheme Selector Dropdown */}
          <div className="shrink-0">
            <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
              {lang === 'hi' ? 'योजना बदलें:' : 'Active Scheme:'}
            </label>
            <select
              value={activeScheme.id}
              onChange={(e) => {
                const s = allSchemes.find(item => item.id === e.target.value);
                if (s) setActiveScheme(s);
              }}
              className="p-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-semibold text-blue-950 max-w-xs focus:outline-hidden"
            >
              {allSchemes.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Selected Scheme Banner */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-blue-950 text-amber-400 flex items-center justify-center font-bold text-lg shrink-0">
              <Building className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                {activeScheme.ministry}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-blue-950">
                {activeScheme.name}
              </h3>
              <div className="text-xs font-semibold text-emerald-700 mt-0.5">
                {activeScheme.financialBenefit}
              </div>
            </div>
          </div>

          <button
            onClick={handleSaveDraft}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all ${
              saveSuccess 
                ? 'bg-emerald-600 text-white border-emerald-600' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
            }`}
          >
            <Save className="w-4 h-4" />
            <span>{saveSuccess ? (lang === 'hi' ? 'प्रगति सहेजी गई!' : 'Draft Saved!') : (lang === 'hi' ? 'ड्राफ्ट सहेजें' : 'Save Draft')}</span>
          </button>
        </div>

        {/* Stepper Progress */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-8">
          {[
            { s: 1, label: lang === 'hi' ? '1. दस्तावेज सत्यापन' : '1. Document Checklist' },
            { s: 2, label: lang === 'hi' ? '2. फॉर्म विवरण सहायक' : '2. Form Guidance' },
            { s: 3, label: lang === 'hi' ? '3. सरकारी पोर्टल सबमिशन' : '3. Official Portal Gate' }
          ].map(st => (
            <div 
              key={st.s}
              onClick={() => setGuideStep(st.s)}
              className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                guideStep === st.s
                  ? 'bg-blue-950 text-white border-blue-950 shadow-xs'
                  : guideStep > st.s
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                    : 'bg-white text-slate-500 border-slate-200'
              }`}
            >
              <div className="text-xs font-extrabold">{st.label}</div>
            </div>
          ))}
        </div>

        {/* STEP 1: DOCUMENTS READINESS CHECK */}
        {guideStep === 1 && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-blue-950">
                  {lang === 'hi' ? 'अनिवार्य दस्तावेजों की जांच' : 'Document Readiness Checklist'}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {lang === 'hi' 
                    ? 'प्रत्येक दस्तावेज की जांच करें। सरकारी पोर्टल पर आवेदन के समय इनकी आवश्यकता होगी।' 
                    : 'Verify you possess each required document to avoid application rejection.'}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                allMandatoryDocsChecked ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {allMandatoryDocsChecked ? 'Documents Ready (100%)' : 'Action Required'}
              </span>
            </div>

            <div className="space-y-3">
              {activeScheme.documentsRequired.map((doc, idx) => (
                <div 
                  key={idx}
                  onClick={() => toggleDoc(idx)}
                  className={`p-4 rounded-2xl border flex items-start justify-between gap-4 cursor-pointer transition-colors ${
                    docStatuses[idx]
                      ? 'bg-emerald-50/50 border-emerald-300 text-slate-900'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border ${
                      docStatuses[idx] ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300'
                    }`}>
                      {docStatuses[idx] && <CheckCircle2 className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-blue-950">{doc.name}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          doc.mandatory ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {doc.mandatory ? 'Mandatory' : 'Optional'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">{doc.detail}</p>
                    </div>
                  </div>

                  <span className="text-xs font-semibold text-blue-800 bg-white px-2.5 py-1 rounded-md border border-slate-200 shrink-0">
                    {doc.type}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Tip: Scanned copies should be in PDF/JPEG format under 200 KB.
              </span>

              <button
                onClick={() => setGuideStep(2)}
                className="px-6 py-3.5 bg-blue-950 hover:bg-blue-900 text-white font-bold rounded-xl text-sm flex items-center gap-2 shadow-md transition-transform hover:scale-105"
              >
                <span>{lang === 'hi' ? 'आगे बढ़ें: फॉर्म भरें' : 'Next: Form Assistant'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: FIELD-BY-FIELD GUIDANCE FORM */}
        {guideStep === 2 && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6">
            <div className="pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-blue-950">
                {lang === 'hi' ? 'फॉर्म सहायक (फील्ड-दर-फील्ड मार्गदर्शन)' : 'Guided Field-by-Field Preparation'}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {lang === 'hi' 
                  ? 'अक्सर सरकारी फॉर्म में होने वाली गलतियों से बचें। किसी भी फील्ड के प्रश्न चिह्न (?) पर क्लिक कर उसका अर्थ समझें।' 
                  : 'Avoid common form rejections. Click the (?) tooltip icon beside any field for plain-language explanation.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Full Name */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold uppercase text-slate-700">Full Name (as on Aadhaar)</label>
                  <button 
                    type="button" 
                    onClick={() => alert("Must match character-by-character with your Aadhaar Card. Even spelling variations like 'Kumar' vs 'K.' will cause automated DBT rejection.")}
                    className="text-blue-700 hover:text-blue-900"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                  </button>
                </div>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm font-medium focus:border-blue-950"
                />
              </div>

              {/* Mobile Number */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold uppercase text-slate-700">Aadhaar Linked Mobile</label>
                  <button 
                    type="button" 
                    onClick={() => alert("Must be the mobile number registered with UIDAI. You will receive an OTP during final government portal submission.")}
                    className="text-blue-700 hover:text-blue-900"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                  </button>
                </div>
                <input
                  type="text"
                  value={formData.mobileNumber}
                  onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm font-medium focus:border-blue-950"
                />
              </div>

              {/* Bank Account */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold uppercase text-slate-700">Bank Account Number</label>
                  <button 
                    type="button" 
                    onClick={() => alert("Provide an individual savings account. Joint accounts where applicant is second holder may delay DBT subsidy credits.")}
                    className="text-blue-700 hover:text-blue-900"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                  </button>
                </div>
                <input
                  type="text"
                  value={formData.accountNumber}
                  onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm font-medium focus:border-blue-950"
                />
              </div>

              {/* Bank IFSC */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold uppercase text-slate-700">Bank IFSC Code</label>
                  <button 
                    type="button" 
                    onClick={() => alert("Found on front page of your bank passbook or cheque book (11 characters, 5th character is always zero).")}
                    className="text-blue-700 hover:text-blue-900"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                  </button>
                </div>
                <input
                  type="text"
                  value={formData.ifscCode}
                  onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm font-medium focus:border-blue-950"
                />
              </div>

              {/* DBT Linkage Status Alert */}
              <div className="sm:col-span-2 p-4 bg-blue-50 border border-blue-200 rounded-2xl flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-800 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <div className="font-bold text-blue-950">Aadhaar NPCI / DBT Seeding Confirmed</div>
                  <div className="text-slate-600 mt-0.5">
                    Your bank account is marked as NPCI-mapped for direct benefit transfers. Government subsidies will credit directly without intermediate clearing.
                  </div>
                </div>
              </div>

            </div>

            {/* Nav Buttons */}
            <div className="pt-4 flex items-center justify-between">
              <button
                onClick={() => setGuideStep(1)}
                className="px-4 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-sm flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{lang === 'hi' ? 'पीछे' : 'Back'}</span>
              </button>

              <button
                onClick={() => setGuideStep(3)}
                className="px-6 py-3.5 bg-blue-950 hover:bg-blue-900 text-white font-bold rounded-xl text-sm flex items-center gap-2 shadow-md transition-transform hover:scale-105"
              >
                <span>{lang === 'hi' ? 'अगला: सरकारी पोर्टल पर जाएं' : 'Next: Official Submission Gate'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: OFFICIAL PORTAL REDIRECTION GATE */}
        {guideStep === 3 && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6">
            
            {/* Caution & Trust Notice */}
            <div className="p-5 bg-amber-50 border-2 border-amber-300 rounded-2xl flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-amber-950">
                <div className="font-extrabold text-base mb-1">
                  {lang === 'hi' ? 'अंतिम आधिकारिक पोर्टल अग्रेषण सूचना' : 'Official Government Submission Gate'}
                </div>
                <p className="leading-relaxed">
                  {lang === 'hi'
                    ? 'CONNECTOR एक स्वतंत्र नागरिक तैयारी मंच है। यह कभी किसी सरकारी विभाग का प्रतिरूपण नहीं करता। अंतिम आवेदन केवल आधिकारिक सरकारी वेबसाइट पर ही जमा होता है। हम आवेदन तब तक जमा नहीं मानते जब तक कि सरकारी पोर्टल पुष्टि न कर दे।'
                    : 'CONNECTOR is an independent guidance and preparation platform. We never impersonate government departments. Your final application will be submitted directly on the official Government of India portal below.'}
                </p>
              </div>
            </div>

            {/* Summary of Prepared Details */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
              <h4 className="text-sm font-bold text-blue-950">
                {lang === 'hi' ? 'तैयार किया गया आवेदन सारांश (कॉपी करने के लिए तैयार):' : 'Application Summary Prepared for Official Portal:'}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                  <div className="text-slate-400">Applicant:</div>
                  <div className="font-bold text-slate-900">{formData.fullName}</div>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                  <div className="text-slate-400">Category:</div>
                  <div className="font-bold text-slate-900">{formData.category}</div>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                  <div className="text-slate-400">Bank IFSC:</div>
                  <div className="font-bold text-slate-900">{formData.ifscCode}</div>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                  <div className="text-slate-400">Documents:</div>
                  <div className="font-bold text-emerald-700">Verified Ready</div>
                </div>
              </div>
            </div>

            {/* Big Official Link Redirection Button */}
            <div className="p-6 bg-gradient-to-r from-blue-950 to-blue-900 text-white rounded-2xl text-center space-y-4">
              <div className="text-xs uppercase tracking-wider text-amber-400 font-bold">
                Designated Official Government URL
              </div>
              <div className="text-xl sm:text-2xl font-black text-white font-mono break-all">
                {activeScheme.officialUrl}
              </div>
              <p className="text-xs text-blue-200 max-w-lg mx-auto">
                Click below to open the official Ministry portal in a new secure window. You will be redirected to the verified government domain.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={activeScheme.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    addOrUpdateApplication({
                      schemeId: activeScheme.id,
                      schemeName: activeScheme.name,
                      status: "Redirected to Official Portal",
                      progress: 100
                    });
                  }}
                  className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-sm transition-transform hover:scale-105 flex items-center gap-2 shadow-xl"
                >
                  <span>{lang === 'hi' ? 'आधिकारिक सरकारी पोर्टल पर जाएं' : 'Proceed to Official Portal'}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Back Button */}
            <div className="pt-2 flex justify-start">
              <button
                onClick={() => setGuideStep(2)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-xs flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{lang === 'hi' ? 'फॉर्म पर वापस जाएं' : 'Back to Form Guidance'}</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
