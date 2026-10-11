import React, { useState } from 'react';
import { 
  User, 
  Bookmark, 
  CheckCircle2, 
  Clock, 
  Bell, 
  Settings, 
  FileText, 
  ExternalLink, 
  ArrowRight, 
  Sparkles,
  ShieldCheck,
  Edit2,
  Trash2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import SchemeCard from './SchemeCard';

export default function UserDashboard({ allSchemes = [], onViewScheme, onPrepareApplication, onStartFinder }) {
  const { lang, t, toggleLang } = useLanguage();
  const { profile, updateProfile, savedSchemes, applications } = useUser();
  const [activeTab, setActiveTab] = useState('saved'); // 'saved', 'recommended', 'tracker', 'profile'
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({ ...profile });

  // Filter bookmarked schemes
  const bookmarkedList = allSchemes.filter(s => savedSchemes.includes(s.id));

  // Recommended schemes based on occupation & income
  const recommendedList = allSchemes.filter(s => {
    const crit = s.eligibilityCriteria;
    if (crit.occupations && !crit.occupations.includes('all')) {
      return crit.occupations.includes(profile.occupation);
    }
    return true;
  }).slice(0, 4);

  const handleProfileSave = (e) => {
    e.preventDefault();
    updateProfile(profileForm);
    setIsEditingProfile(false);
  };

  const deadlines = [
    { scheme: "PM-KISAN e-KYC Verification", date: "31st October 2026", status: "Urgent", type: "DBT Prerequisite" },
    { scheme: "Post-Matric Scholarship NSP Portal", date: "30th November 2026", status: "Open", type: "Academic Deadline" },
    { scheme: "PMFBY Rabi Crop Season Enrollment", date: "31st December 2026", status: "Upcoming", type: "Insurance Cutoff" }
  ];

  return (
    <section className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Profile Header Card */}
        <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-2xl shadow-md">
              {profile.fullName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-white">{profile.fullName}</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Active Citizen
                </span>
              </div>
              <p className="text-xs sm:text-sm text-blue-200 mt-0.5">
                {profile.state}, {profile.district} • {profile.occupation} • Age {profile.age} • Category {profile.socialCategory}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('profile')}
              className="px-4 py-2 bg-blue-900/80 hover:bg-blue-800 text-white rounded-xl text-xs font-semibold border border-blue-700 flex items-center gap-1.5 transition-colors"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'प्रोफ़ाइल बदलें' : 'Edit Profile'}</span>
            </button>
            <button
              onClick={onStartFinder}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-transform hover:scale-105 shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'पुनः पात्रता जांचें' : 'Recalculate'}</span>
            </button>
          </div>
        </div>

        {/* Dashboard Tabs Bar */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 mb-8 overflow-x-auto text-xs sm:text-sm">
          {[
            { id: 'saved', label: lang === 'hi' ? 'सहेजी गई योजनाएं' : 'Saved Schemes', count: bookmarkedList.length, icon: Bookmark },
            { id: 'recommended', label: lang === 'hi' ? 'सिफारिश की गई योजनाएं' : 'Recommended For You', count: recommendedList.length, icon: Sparkles },
            { id: 'tracker', label: lang === 'hi' ? 'आवेदन ट्रैकर' : 'Application Tracker', count: applications.length, icon: FileText },
            { id: 'deadlines', label: lang === 'hi' ? 'महत्वपूर्ण तिथियां' : 'Important Deadlines', count: deadlines.length, icon: Bell },
            { id: 'profile', label: lang === 'hi' ? 'प्रोफ़ाइल सेटिंग' : 'Profile Settings', icon: User }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-blue-950 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: SAVED SCHEMES */}
        {activeTab === 'saved' && (
          <div>
            {bookmarkedList.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-lg mx-auto">
                <Bookmark className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">
                  {lang === 'hi' ? 'कोई योजना सहेजी नहीं गई है' : 'No Bookmarked Schemes Yet'}
                </h3>
                <p className="text-xs text-slate-500 mt-1 mb-4">
                  {lang === 'hi' ? 'योजनाओं के कार्ड पर बुकमार्क आइकन दबाकर उन्हें यहां सुरक्षित रखें।' : 'Click the bookmark icon on any scheme card to save it for quick reference.'}
                </p>
                <button
                  onClick={() => setActiveTab('recommended')}
                  className="px-4 py-2 bg-blue-900 text-white rounded-xl text-xs font-semibold"
                >
                  Browse Recommended Schemes
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookmarkedList.map(scheme => (
                  <SchemeCard
                    key={scheme.id}
                    scheme={scheme}
                    onViewDetails={onViewScheme}
                    onPrepareApplication={onPrepareApplication}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: RECOMMENDED FOR YOU */}
        {activeTab === 'recommended' && (
          <div className="space-y-6">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-between">
              <div className="text-xs sm:text-sm text-blue-950">
                <strong>Tailored Suggestions:</strong> These schemes directly target citizens working in <strong>{profile.occupation}</strong> within <strong>{profile.state}</strong>.
              </div>
              <button 
                onClick={onStartFinder}
                className="text-xs font-bold text-blue-900 underline shrink-0"
              >
                Change Profile
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedList.map(scheme => (
                <SchemeCard
                  key={scheme.id}
                  scheme={scheme}
                  onViewDetails={onViewScheme}
                  onPrepareApplication={onPrepareApplication}
                />
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: APPLICATION TRACKER */}
        {activeTab === 'tracker' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-lg font-bold text-blue-950 mb-2">
              {lang === 'hi' ? 'आवेदन तैयारी स्थिति ट्रैकर' : 'Application Preparation & Submission Status'}
            </h3>
            
            <div className="divide-y divide-slate-100">
              {applications.map(app => (
                <div key={app.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center shrink-0 mt-0.5">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-blue-950">{app.schemeName}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Last updated: {app.updatedAt} • {app.notes || 'All documents prepared'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className={`inline-block px-3 py-0.5 rounded-full text-xs font-bold ${
                        app.progress === 100 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {app.status}
                      </span>
                      <div className="w-32 bg-slate-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                        <div 
                          className="bg-emerald-600 h-full"
                          style={{ width: `${app.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        const scheme = allSchemes.find(s => s.id === app.schemeId);
                        if (scheme) onPrepareApplication(scheme);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-semibold text-xs"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: IMPORTANT DEADLINES */}
        {activeTab === 'deadlines' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-lg font-bold text-blue-950 mb-2">
              {lang === 'hi' ? 'आधिकारिक समय-सीमा एवं अनुस्मारक' : 'Official Portal Deadlines & Reminders'}
            </h3>

            <div className="space-y-3">
              {deadlines.map((d, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{d.scheme}</h4>
                      <div className="text-xs text-slate-500">{d.type}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-extrabold text-blue-950">{d.date}</div>
                    <span className="text-[10px] font-bold text-amber-700 uppercase">{d.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: PROFILE EDIT */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs max-w-2xl mx-auto space-y-6">
            <h3 className="text-lg font-bold text-blue-950 pb-3 border-b border-slate-100">
              {lang === 'hi' ? 'नागरिक प्रोफ़ाइल विवरण' : 'Citizen Demographics Profile'}
            </h3>

            <form onSubmit={handleProfileSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profileForm.fullName}
                    onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Age</label>
                  <input
                    type="number"
                    value={profileForm.age}
                    onChange={(e) => setProfileForm({ ...profileForm, age: parseInt(e.target.value, 10) })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">State</label>
                  <input
                    type="text"
                    value={profileForm.state}
                    onChange={(e) => setProfileForm({ ...profileForm, state: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">District</label>
                  <input
                    type="text"
                    value={profileForm.district}
                    onChange={(e) => setProfileForm({ ...profileForm, district: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Annual Income (₹)</label>
                  <input
                    type="number"
                    value={profileForm.annualIncome}
                    onChange={(e) => setProfileForm({ ...profileForm, annualIncome: parseInt(e.target.value, 10) })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Social Category</label>
                  <select
                    value={profileForm.socialCategory}
                    onChange={(e) => setProfileForm({ ...profileForm, socialCategory: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                  >
                    <option value="General">General</option>
                    <option value="OBC">OBC</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                    <option value="EWS">EWS</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-950 hover:bg-blue-900 text-white font-bold rounded-xl text-xs transition-colors shadow-md"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </section>
  );
}
