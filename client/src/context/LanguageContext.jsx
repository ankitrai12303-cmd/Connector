import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  en: {
    // Navigation & Global
    tagline: "Connecting Every Citizen to Every Opportunity",
    searchPlaceholder: "Search schemes by name, problem, or benefit (e.g. scholarship, PM Kisan, ₹5 lakh health cover)...",
    findMySchemes: "Find My Schemes",
    aiVoiceAssistant: "AI Voice Assistant",
    exploreSchemes: "Explore Schemes",
    howItWorks: "How It Works",
    schemesCatalog: "All Schemes",
    applicationGuide: "Smart Application Guide",
    myDashboard: "Citizen Dashboard",
    adminPanel: "Admin Panel",
    verifiedOfficial: "Verified Official Government Data",
    lastVerified: "Last Verified",
    officialPortal: "Official Portal",
    applyOnPortal: "Apply on Official Portal",
    viewDetails: "View Scheme Details",
    prepareApplication: "Prepare Application",
    bookmarkScheme: "Bookmark Scheme",
    saved: "Saved",
    
    // Hero
    heroTitle: "Every Government Scheme. One Simple Platform.",
    heroSubtitle: "Discover eligible welfare schemes, understand benefits in plain language, and prepare your application with step-by-step AI guidance.",
    heroBadge: "Official Citizen Guidance Portal • 100% Free & Transparent",
    
    // How it works
    step1Title: "1. Discover",
    step1Desc: "Search across 100+ verified central and state welfare initiatives with zero jargon.",
    step2Title: "2. Check Eligibility",
    step2Desc: "Answer a few simple questions to instantly calculate matching schemes tailored to your family.",
    step3Title: "3. Apply with Guidance",
    step3Desc: "Get document checklists, field-by-field form guidance, and direct links to official .gov.in portals.",
    
    // Categories
    categoriesHeading: "Browse Schemes by Need & Category",
    allCategories: "All Categories",
    agriculture: "Agriculture & Farmers",
    healthcare: "Healthcare & Wellness",
    scholarships: "Education & Scholarships",
    housing: "Housing & Shelter",
    women: "Women & Child Care",
    business: "Business & MSME",
    employment: "Employment & Skill",
    social_security: "Pension & Social Security",
    divyangjan: "Divyangjan (Differently Abled)",
    
    // Finder / Wizard
    finderTitle: "AI-Powered Scheme Eligibility Finder",
    finderSubtitle: "Input your basic details to calculate exact schemes your family is entitled to.",
    stepDemographics: "1. Basic Details",
    stepOccupation: "2. Occupation & Category",
    stepHousehold: "3. Economic Profile",
    calculateMatches: "Calculate Eligible Schemes",
    ageLabel: "Your Age",
    genderLabel: "Gender",
    male: "Male",
    female: "Female",
    transgender: "Transgender",
    stateLabel: "State / UT",
    occupationLabel: "Primary Occupation",
    farmer: "Farmer / Agricultural Worker",
    student: "Student",
    street_vendor: "Street Vendor / Small Trader",
    artisan: "Traditional Artisan / Craftsperson",
    unemployed: "Unemployed / Job Seeker",
    shg_member: "Women Self-Help Group (SHG) Member",
    self_employed: "Self-Employed / Small Business",
    daily_wage: "Daily Wage / Unskilled Laborer",
    other: "Other",
    socialCategoryLabel: "Social Category",
    general: "General",
    obc: "OBC",
    sc: "SC",
    st: "ST",
    ews: "EWS",
    incomeLabel: "Annual Family Income (₹)",
    landLabel: "Do you own cultivable agricultural land?",
    puccaHouseLabel: "Do you already own a pucca house?",
    disabilityLabel: "Do you have a certified disability (40%+)?",
    pregnantLabel: "Are you pregnant or a lactating mother?",
    girlChildLabel: "Do you have a daughter aged below 10 years?",
    yes: "Yes",
    no: "No",
    
    // Results
    eligibleSchemes: "High Match (Eligible)",
    partialSchemes: "Partial Match",
    noSchemesFound: "No schemes match the selected filters. Try broadening your criteria.",
    matchRate: "Match Score",
    
    // Disclaimer
    disclaimerText: "CONNECTOR is an independent citizen assistance platform. We never ask for OTPs, passwords, or processing fees. Benefits are disbursed solely by respective Government Ministries on official government portals (.gov.in / .nic.in).",
    disclaimerTitle: "Important Citizen Trust Notice"
  },
  hi: {
    // Navigation & Global
    tagline: "हर नागरिक को हर अवसर से जोड़ना",
    searchPlaceholder: "योजना के नाम, समस्या या लाभ से खोजें (जैसे: छात्रवृत्ति, किसान ₹6000, 5 लाख मुफ्त इलाज)...",
    findMySchemes: "मेरी योजनाएं खोजें",
    aiVoiceAssistant: "AI वॉयस सहायक",
    exploreSchemes: "सभी योजनाएं देखें",
    howItWorks: "यह कैसे काम करता है",
    schemesCatalog: "योजना सूची",
    applicationGuide: "आवेदन मार्गदर्शिका",
    myDashboard: "नागरिक डैशबोर्ड",
    adminPanel: "व्यवस्थापक पैनल",
    verifiedOfficial: "सत्यापित सरकारी जानकारी",
    lastVerified: "अंतिम सत्यापन",
    officialPortal: "आधिकारिक पोर्टल",
    applyOnPortal: "सरकारी पोर्टल पर आवेदन करें",
    viewDetails: "योजना विवरण देखें",
    prepareApplication: "आवेदन तैयार करें",
    bookmarkScheme: "सुरक्षित करें",
    saved: "सहेजा गया",
    
    // Hero
    heroTitle: "हर सरकारी योजना। एक सरल डिजिटल मंच।",
    heroSubtitle: "अपनी पात्र कल्याणकारी योजनाएं खोजें, लाभों को सरल भाषा में समझें और एआई मार्गदर्शन के साथ आसानी से आवेदन करें।",
    heroBadge: "आधिकारिक नागरिक मार्गदर्शन पोर्टल • 100% निःशुल्क और पारदर्शी",
    
    // How it works
    step1Title: "1. खोजें",
    step1Desc: "बिना किसी कठिन तकनीकी शब्दों के 100+ केंद्र और राज्य सरकार की योजनाओं की जानकारी प्राप्त करें।",
    step2Title: "2. पात्रता जांचें",
    step2Desc: "कुछ आसान सवालों के जवाब देकर तुरंत जानें कि आप और आपका परिवार किन योजनाओं के हकदार हैं।",
    step3Title: "3. मार्गदर्शन से आवेदन करें",
    step3Desc: "दस्तावेज़ चेकलिस्ट, फॉर्म भरने की सलाह और आधिकारिक .gov.in पोर्टल्स के सीधे लिंक प्राप्त करें।",
    
    // Categories
    categoriesHeading: "अपनी आवश्यकता और श्रेणी के अनुसार योजनाएं चुनें",
    allCategories: "सभी श्रेणियां",
    agriculture: "कृषि एवं किसान कल्याण",
    healthcare: "स्वास्थ्य एवं चिकित्सा",
    scholarships: "शिक्षा एवं छात्रवृत्ति",
    housing: "आवास एवं मकान",
    women: "महिला एवं बाल विकास",
    business: "व्यापार, कारीगर एवं ऋण",
    employment: "रोजगार एवं कौशल विकास",
    social_security: "पेंशन एवं सामाजिक सुरक्षा",
    divyangjan: "दिव्यांगजन सशक्तिकरण",
    
    // Finder / Wizard
    finderTitle: "एआई योजना पात्रता कैलकुलेटर",
    finderSubtitle: "अपनी बुनियादी जानकारी दर्ज करें और तुरंत जानें कि आप किन योजनाओं के पात्र हैं।",
    stepDemographics: "1. व्यक्तिगत विवरण",
    stepOccupation: "2. व्यवसाय एवं सामाजिक वर्ग",
    stepHousehold: "3. आर्थिक स्थिति एवं परिवार",
    calculateMatches: "पात्र योजनाएं खोजें",
    ageLabel: "आपकी उम्र (वर्ष)",
    genderLabel: "लिंग",
    male: "पुरुष",
    female: "महिला",
    transgender: "थर्ड जेंडर",
    stateLabel: "राज्य / केंद्र शासित प्रदेश",
    occupationLabel: "मुख्य पेशा",
    farmer: "किसान / कृषि श्रमिक",
    student: "विद्यार्थी / छात्र",
    street_vendor: "रेहड़ी-पटरी / छोटा दुकानदार",
    artisan: "पारंपरिक कारीगर / हस्तशिल्पी",
    unemployed: "बेरोजगार / नौकरी की तलाश में",
    shg_member: "महिला स्वयं सहायता समूह (SHG) सदस्य",
    self_employed: "स्वरोजगार / छोटा व्यवसाय",
    daily_wage: "दैनिक मजदूर / अकुशल श्रमिक",
    other: "अन्य",
    socialCategoryLabel: "सामाजिक वर्ग (जाति)",
    general: "सामान्य (General)",
    obc: "ओबीसी (OBC)",
    sc: "अनुसूचित जाति (SC)",
    st: "अनुसूचित जनजाति (ST)",
    ews: "ईडब्ल्यूएस (EWS)",
    incomeLabel: "वार्षिक पारिवारिक आय (₹)",
    landLabel: "क्या आपके पास अपने नाम पर खेती की जमीन है?",
    puccaHouseLabel: "क्या आपके पास पहले से पक्का मकान है?",
    disabilityLabel: "क्या आप प्रमाणित दिव्यांगजन (40%+) हैं?",
    pregnantLabel: "क्या आप गर्भवती या धात्री महिला हैं?",
    girlChildLabel: "क्या आपके घर में 10 वर्ष से कम उम्र की बेटी है?",
    yes: "हाँ",
    no: "नहीं",
    
    // Results
    eligibleSchemes: "सटीक पात्र योजनाएं",
    partialSchemes: "आंशिक पात्रता वाली योजनाएं",
    noSchemesFound: "चयनित विकल्पों से कोई योजना नहीं मिली। कृपया फ़िल्टर बदलें।",
    matchRate: "पात्रता स्कोर",
    
    // Disclaimer
    disclaimerText: "CONNECTOR एक स्वतंत्र नागरिक मार्गदर्शन मंच है। हम कभी भी आपसे ओटीपी, पासवर्ड या कोई शुल्क नहीं मांगते। सभी योजनाओं के लाभ केवल आधिकारिक सरकारी पोर्टल्स (.gov.in / .nic.in) पर ही मिलते हैं।",
    disclaimerTitle: "महत्वपूर्ण नागरिक विश्वास सूचना"
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('connector_lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('connector_lang', lang);
  }, [lang]);

  const t = (key) => {
    return translations[lang]?.[key] || translations['en']?.[key] || key;
  };

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'hi' : 'en');
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
