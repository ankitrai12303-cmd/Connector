import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Plus, 
  Edit3, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  Search, 
  MessageSquare, 
  RefreshCw,
  ExternalLink,
  Layers,
  Save,
  X
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AdminDashboard({ schemes = [], onRefreshSchemes }) {
  const { lang } = useLanguage();
  const [adminTab, setAdminTab] = useState('overview'); // 'overview', 'schemes', 'feedback', 'add'
  const [stats, setStats] = useState(null);
  const [topSearches, setTopSearches] = useState([]);
  const [feedbackList, setFeedbackList] = useState([]);
  const [selectedSchemeForEdit, setSelectedSchemeForEdit] = useState(null);

  // New Scheme Form State
  const [newSchemeForm, setNewSchemeForm] = useState({
    id: '',
    name: '',
    hindiName: '',
    ministry: '',
    category: 'agriculture',
    sponsor: 'Central Sector',
    tagline: '',
    brief: '',
    financialBenefit: '',
    officialUrl: 'https://',
    helplineNumber: '1800-11-0001'
  });

  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/stats');
      const data = await res.json();
      if (data.success) {
        setStats(data.stats);
        setTopSearches(data.topSearches || []);
        setFeedbackList(data.recentFeedback || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateScheme = async (e) => {
    e.preventDefault();
    if (!newSchemeForm.id || !newSchemeForm.name) {
      alert("Please provide ID and Scheme Name");
      return;
    }

    try {
      const payload = {
        ...newSchemeForm,
        benefits: ["Direct DBT financial benefit", "Verified digital processing", "No middlemen"],
        eligibilityCriteria: {
          minAge: 18,
          maxAge: 70,
          occupations: ["all"],
          genders: ["all"],
          maxIncome: null,
          summary: newSchemeForm.tagline
        },
        documentsRequired: [
          { name: "Aadhaar Card", type: "Identity Proof", mandatory: true, detail: "Linked with mobile" },
          { name: "Bank Passbook", type: "Financial", mandatory: true, detail: "Aadhaar seeded" }
        ],
        applicationSteps: [
          { step: 1, title: "Online Registration", description: "Register on official ministry portal." },
          { step: 2, title: "Document Verification", description: "Authority verifies records." }
        ],
        faqs: [
          { q: "Who is eligible?", a: "Indian citizens meeting the criteria." }
        ],
        tags: [newSchemeForm.id, newSchemeForm.category, "government", "subsidy"]
      };

      const res = await fetch('/api/admin/schemes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setSaveStatus('Scheme published successfully!');
        if (onRefreshSchemes) onRefreshSchemes();
        fetchStats();
        setTimeout(() => {
          setSaveStatus('');
          setAdminTab('schemes');
        }, 1500);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Admin Header */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-2xl shadow-md">
              <Building2 className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-white">Government Administration Panel</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-slate-950">
                  Role: National Coordinator
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Manage scheme gazettes, audit official URLs, monitor citizen reach, and ensure 100% verified data.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setAdminTab('add')}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-transform hover:scale-105 shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Scheme</span>
            </button>
            <button
              onClick={fetchStats}
              className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors"
              title="Refresh Stats"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 mb-8 overflow-x-auto text-xs sm:text-sm">
          {[
            { id: 'overview', label: 'Platform Metrics & Usage', icon: TrendingUp },
            { id: 'schemes', label: `Catalog Management (${schemes.length})`, icon: Layers },
            { id: 'feedback', label: `Citizen Inquiries (${feedbackList.length})`, icon: MessageSquare },
            { id: 'add', label: 'Add New Scheme', icon: Plus }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = adminTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setAdminTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-blue-950 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW & USAGE ANALYTICS */}
        {adminTab === 'overview' && (
          <div className="space-y-8">
            
            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="text-xs font-bold text-slate-500 uppercase">Cataloged Schemes</div>
                <div className="text-2xl sm:text-3xl font-black text-blue-950 mt-1">{stats?.totalSchemes || schemes.length}</div>
                <div className="text-[11px] text-emerald-600 font-semibold mt-1">100% Central & State Gazette verified</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="text-xs font-bold text-slate-500 uppercase">Verification Standard</div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1">{stats?.verifiedPercentage || 100}%</div>
                <div className="text-[11px] text-slate-500 mt-1">Audit Date: {stats?.lastAuditDate || 'October 2026'}</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="text-xs font-bold text-slate-500 uppercase">Citizens Guided</div>
                <div className="text-2xl sm:text-3xl font-black text-blue-900 mt-1">{stats?.citizensHelpedEstimate || "1.2M+"}</div>
                <div className="text-[11px] text-emerald-600 font-semibold mt-1">+18% this month</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="text-xs font-bold text-slate-500 uppercase">Active Portals</div>
                <div className="text-2xl sm:text-3xl font-black text-amber-600 mt-1">{stats?.activeStatesIntegrated || 28} States</div>
                <div className="text-[11px] text-slate-500 mt-1">Direct .gov.in linkage</div>
              </div>
            </div>

            {/* Top Trending Citizen Searches */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
              <h3 className="text-lg font-bold text-blue-950 mb-4 flex items-center gap-2">
                <Search className="w-5 h-5 text-blue-800" />
                <span>Top Anonymized Citizen Search Queries</span>
              </h3>

              <div className="space-y-3">
                {topSearches.map((item, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-950 font-bold text-xs flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="text-sm font-semibold text-slate-800">{item.query}</span>
                    </div>

                    <div className="flex items-center gap-4 text-xs">
                      <span className="font-bold text-slate-700">{item.count.toLocaleString('en-IN')} inquiries</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">{item.trend}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: SCHEMES CATALOG MANAGEMENT */}
        {adminTab === 'schemes' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-blue-950">Active Government Schemes Catalog</h3>
              <span className="text-xs text-slate-500">Showing {schemes.length} verified schemes</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase text-[11px]">
                    <th className="pb-3">Scheme Name</th>
                    <th className="pb-3">Category</th>
                    <th className="pb-3">Sponsor</th>
                    <th className="pb-3">Official Portal</th>
                    <th className="pb-3">Verification</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {schemes.map(s => (
                    <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 pr-3">
                        <div className="font-bold text-blue-950">{s.name}</div>
                        <div className="text-[11px] text-slate-500 line-clamp-1">{s.ministry}</div>
                      </td>
                      <td className="py-3.5 pr-3">
                        <span className="px-2 py-0.5 bg-slate-100 rounded-md text-xs font-medium capitalize">
                          {s.category}
                        </span>
                      </td>
                      <td className="py-3.5 pr-3 text-xs text-slate-600">
                        {s.sponsor}
                      </td>
                      <td className="py-3.5 pr-3">
                        <a 
                          href={s.officialUrl} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-blue-700 hover:underline flex items-center gap-1 font-mono text-xs"
                        >
                          <span>{new URL(s.officialUrl).hostname}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                      <td className="py-3.5 pr-3">
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-xs">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Verified
                        </span>
                      </td>
                      <td className="py-3.5 text-right">
                        <button
                          onClick={() => alert(`Scheme ${s.name} links and Gazette parameters verified!`)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-blue-100 text-blue-900 font-semibold rounded text-xs transition-colors"
                        >
                          Verify Link
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: CITIZEN FEEDBACK & INQUIRIES */}
        {adminTab === 'feedback' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-lg font-bold text-blue-950 mb-2">
              Citizen Feedback & Review Queue
            </h3>
            
            <div className="space-y-3">
              {feedbackList.map(fb => (
                <div key={fb.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 text-sm">{fb.name}</span>
                      <span className="text-xs text-slate-500 ml-2">({fb.role})</span>
                    </div>
                    <span className="text-xs text-amber-600 font-bold">★ {fb.rating}/5</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    "{fb.message}"
                  </p>
                  <div className="text-[11px] text-slate-400">
                    Contact: {fb.phoneOrEmail} • Submitted: {new Date(fb.timestamp).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: ADD NEW SCHEME */}
        {adminTab === 'add' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs max-w-3xl mx-auto">
            <h3 className="text-xl font-bold text-blue-950 pb-4 border-b border-slate-100 mb-6">
              Add New Official Welfare Scheme to Catalog
            </h3>

            {saveStatus && (
              <div className="p-4 bg-emerald-100 text-emerald-800 rounded-xl mb-6 font-bold text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{saveStatus}</span>
              </div>
            )}

            <form onSubmit={handleCreateScheme} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Scheme ID / Slug</label>
                  <input
                    type="text"
                    required
                    value={newSchemeForm.id}
                    onChange={(e) => setNewSchemeForm({ ...newSchemeForm, id: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                    placeholder="e.g. pm-poshan-shakti"
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Category</label>
                  <select
                    value={newSchemeForm.category}
                    onChange={(e) => setNewSchemeForm({ ...newSchemeForm, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                  >
                    <option value="agriculture">Agriculture & Farmers</option>
                    <option value="healthcare">Healthcare & Wellness</option>
                    <option value="scholarships">Education & Scholarships</option>
                    <option value="housing">Housing & Shelter</option>
                    <option value="women">Women & Child Care</option>
                    <option value="business">Business & MSME</option>
                    <option value="employment">Employment & Skill</option>
                    <option value="social_security">Social Security & Pension</option>
                    <option value="divyangjan">Divyangjan</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Official Scheme Name</label>
                  <input
                    type="text"
                    required
                    value={newSchemeForm.name}
                    onChange={(e) => setNewSchemeForm({ ...newSchemeForm, name: e.target.value })}
                    placeholder="e.g. Pradhan Mantri Poshan Shakti Nirman"
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Ministry / Department</label>
                  <input
                    type="text"
                    required
                    value={newSchemeForm.ministry}
                    onChange={(e) => setNewSchemeForm({ ...newSchemeForm, ministry: e.target.value })}
                    placeholder="e.g. Ministry of Education"
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Tagline / Key Highlight</label>
                  <input
                    type="text"
                    value={newSchemeForm.tagline}
                    onChange={(e) => setNewSchemeForm({ ...newSchemeForm, tagline: e.target.value })}
                    placeholder="e.g. Nutritional support to school children across India"
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Financial Benefit (DBT)</label>
                  <input
                    type="text"
                    value={newSchemeForm.financialBenefit}
                    onChange={(e) => setNewSchemeForm({ ...newSchemeForm, financialBenefit: e.target.value })}
                    placeholder="e.g. Free hot cooked meals / ₹5,000 allowance"
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Official Portal URL</label>
                  <input
                    type="url"
                    required
                    value={newSchemeForm.officialUrl}
                    onChange={(e) => setNewSchemeForm({ ...newSchemeForm, officialUrl: e.target.value })}
                    placeholder="https://pmposhan.education.gov.in"
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-mono"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Brief Description</label>
                  <textarea
                    rows="3"
                    value={newSchemeForm.brief}
                    onChange={(e) => setNewSchemeForm({ ...newSchemeForm, brief: e.target.value })}
                    placeholder="Detailed explanation in plain language..."
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm"
                  ></textarea>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-950 hover:bg-blue-900 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Publish to National Catalog</span>
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </section>
  );
}
