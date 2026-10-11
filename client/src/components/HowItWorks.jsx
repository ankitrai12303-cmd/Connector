import React from 'react';
import { Search, Sparkles, Send, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function HowItWorks({ onStartFinderClick }) {
  const { lang, t } = useLanguage();

  const steps = [
    {
      num: "01",
      icon: Search,
      badge: lang === 'hi' ? 'चरण 1: खोज' : 'Step 1: Discover',
      title: lang === 'hi' ? 'खोजें और समझें' : 'Discover Welfare Schemes',
      desc: lang === 'hi' 
        ? 'शिक्षा, स्वास्थ्य, खेती, आवास और व्यापार से जुड़ी सभी सरकारी योजनाओं को सरल भाषा में खोजें।' 
        : 'Search 500+ verified Central & State initiatives across health, farming, education, housing, and enterprise.',
      points: [
        lang === 'hi' ? 'मंत्रालय और विभाग के अनुसार वर्गीकरण' : 'Filtered by Ministry and Department',
        lang === 'hi' ? 'सीधे मिलने वाले वित्तीय लाभों का विवरण' : 'Clear breakdown of direct monetary DBT benefits',
        lang === 'hi' ? 'नवीनतम सरकारी गजट से सत्यापित जानकारी' : 'Cross-checked with official Gazette notices'
      ]
    },
    {
      num: "02",
      icon: Sparkles,
      badge: lang === 'hi' ? 'चरण 2: पात्रता' : 'Step 2: Check Eligibility',
      title: lang === 'hi' ? 'पात्रता की तुरंत जांच' : 'Check Eligibility in 2 Mins',
      desc: lang === 'hi' 
        ? 'आयु, पेशा, आय और राज्य दर्ज करें। हमारा AI इंजन तुरंत बताएगा कि आप किन योजनाओं के हकदार हैं।' 
        : 'Input your age, occupation, income slab, and state. Our rules engine calculates your exact percentage match.',
      points: [
        lang === 'hi' ? 'बिना किसी बिचौलिए या कमीशन के सटीक गणना' : 'Transparent scoring with zero intermediaries',
        lang === 'hi' ? 'किन नियमों को पूरा किया और क्या बाकी है' : 'Clear list of criteria met vs missing documents',
        lang === 'hi' ? 'निजी डेटा पूरी तरह सुरक्षित व गोपनीय' : 'Private & encrypted; zero personal data shared'
      ]
    },
    {
      num: "03",
      icon: Send,
      badge: lang === 'hi' ? 'चरण 3: आवेदन' : 'Step 3: Apply with Guidance',
      title: lang === 'hi' ? 'मार्गदर्शन के साथ आवेदन' : 'Apply with Step-by-Step Guidance',
      desc: lang === 'hi' 
        ? 'आवश्यक दस्तावेजों की चेकलिस्ट तैयार करें, फॉर्म भरना सीखें और सुरक्षित आधिकारिक पोर्टल पर जाएं।' 
        : 'Generate your customized document checklist, review field-by-field instructions, and submit safely on .gov.in.',
      points: [
        lang === 'hi' ? 'आधार e-KYC और बैंक DBT लिंकेज में सहायता' : 'Aadhaar e-KYC and NPCI-DBT linkage help',
        lang === 'hi' ? 'कठिन सरकारी शर्तों का सरल हिंदी/अंग्रेजी में अर्थ' : 'Plain language tooltips for complex forms',
        lang === 'hi' ? 'आधिकारिक .gov.in / .nic.in लिंक पर सुरक्षित अग्रेषण' : 'Safe handoff to designated official portals'
      ]
    }
  ];

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-semibold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-4 h-4 text-blue-700" />
            {lang === 'hi' ? 'सरल नागरिक प्रक्रिया' : 'Simple 3-Step Process'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-950 tracking-tight">
            {lang === 'hi' ? 'CONNECTOR कैसे काम करता है?' : 'How CONNECTOR Works'}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            {lang === 'hi' 
              ? 'सरकारी योजनाओं का लाभ लेने में अब किसी दलाल या बिचौलिए की जरूरत नहीं। तीन सरल चरणों में आत्मनिर्भर बनें।' 
              : 'Accessing public welfare should never depend on middlemen. Discover, verify, and prepare with complete digital confidence.'}
          </p>
        </div>

        {/* 3 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 relative"
              >
                {/* Step Pill */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-900 group-hover:bg-blue-900 group-hover:text-white transition-colors flex items-center justify-center font-bold text-lg shadow-xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-black text-slate-200 group-hover:text-blue-100 transition-colors">
                    {step.num}
                  </span>
                </div>

                <div className="mb-6 flex-1">
                  <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
                    {step.badge}
                  </span>
                  <h3 className="text-xl font-bold text-blue-950 mt-1 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {step.desc}
                  </p>

                  {/* Bullet points */}
                  <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                    {step.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-14 bg-gradient-to-r from-blue-950 to-blue-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="text-center sm:text-left">
            <h4 className="text-xl font-bold text-white">
              {lang === 'hi' ? 'क्या आप जानना चाहते हैं कि आप किन योजनाओं के पात्र हैं?' : 'Ready to discover all welfare schemes you qualify for?'}
            </h4>
            <p className="text-sm text-blue-200 mt-1">
              {lang === 'hi' ? 'मुफ्त पात्रता कैलकुलेटर शुरू करें। मात्र 2 मिनट का समय लगेगा।' : 'Launch our intelligent eligibility calculator. Takes less than 2 minutes.'}
            </p>
          </div>
          <button
            onClick={onStartFinderClick}
            className="shrink-0 px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm transition-transform hover:scale-105 flex items-center gap-2 shadow-lg"
          >
            <Sparkles className="w-4 h-4" />
            <span>{lang === 'hi' ? 'पात्रता की जांच करें' : 'Check Eligibility Now'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
