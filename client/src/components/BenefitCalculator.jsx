import React, { useState } from 'react';
import { 
  Calculator, 
  IndianRupee, 
  Plus, 
  Trash2, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  HeartPulse, 
  GraduationCap, 
  Sprout, 
  Briefcase,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function BenefitCalculator({ onExploreSchemes, onViewScheme }) {
  const { lang, t } = useLanguage();

  const [state, setState] = useState('Uttar Pradesh');
  const [familyMembers, setFamilyMembers] = useState([
    { id: 1, role: 'farmer', name: 'Household Head', age: 42, gender: 'male' },
    { id: 2, role: 'woman', name: 'Spouse / Mother', age: 39, gender: 'female' },
    { id: 3, role: 'daughter', name: 'Daughter', age: 7, gender: 'female' },
    { id: 4, role: 'student', name: 'Son (College)', age: 19, gender: 'male' },
    { id: 5, role: 'senior', name: 'Grandmother', age: 71, gender: 'female' }
  ]);

  const [results, setResults] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const availableRoles = [
    { id: 'farmer', label: 'Farmer / Khetihar', icon: Sprout },
    { id: 'woman', label: 'Homemaker / Mother', icon: Sparkles },
    { id: 'daughter', label: 'Girl Child (< 10 yrs)', icon: HeartPulse },
    { id: 'student', label: 'College / School Student', icon: GraduationCap },
    { id: 'senior', label: 'Senior Citizen (60+ yrs)', icon: ShieldCheck },
    { id: 'artisan', label: 'Artisan / Vishwakarma', icon: Briefcase },
    { id: 'vendor', label: 'Street Vendor / Hawker', icon: IndianRupee }
  ];

  const handleAddMember = (roleId) => {
    const roleObj = availableRoles.find(r => r.id === roleId);
    const newMember = {
      id: Date.now(),
      role: roleId,
      name: `Member (${roleObj.label})`,
      age: roleId === 'senior' ? 68 : roleId === 'daughter' ? 6 : roleId === 'student' ? 18 : 35,
      gender: ['daughter', 'woman'].includes(roleId) ? 'female' : 'male'
    };
    setFamilyMembers(prev => [...prev, newMember]);
  };

  const handleRemoveMember = (id) => {
    setFamilyMembers(prev => prev.filter(m => m.id !== id));
  };

  const calculateBenefits = async () => {
    setIsCalculating(true);
    try {
      const res = await fetch('/api/calculator/dbt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ members: familyMembers, state })
      });
      const data = await res.json();
      if (data.success) {
        setResults(data.summary);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsCalculating(false);
    }
  };

  // Run on first load
  React.useEffect(() => {
    calculateBenefits();
  }, [familyMembers, state]);

  return (
    <section className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Calculator className="w-3.5 h-3.5 text-amber-600" />
            {lang === 'hi' ? 'परिवार डीबीटी लाभ कैलकुलेटर' : 'Family Welfare Entitlement Calculator'}
          </div>
          <h2 className="text-3xl font-extrabold text-blue-950">
            {lang === 'hi' ? 'आपके परिवार के लिए कुल सरकारी लाभ की गणना' : 'Calculate Total Government Benefits for Your Family'}
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            {lang === 'hi'
              ? 'परिवार के सदस्यों का चयन करें और देखें कि आपका परिवार हर साल कितने प्रत्यक्ष डीबीटी लाभ और बीमा का हकदार है।'
              : 'Add your household members to compute cumulative Direct Benefit Transfers (DBT), tuition waivers, and health coverage.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Family Composition Builder (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-900" />
                <h3 className="font-bold text-base sm:text-lg text-blue-950">
                  {lang === 'hi' ? 'परिवार के सदस्य' : 'Household Members'} ({familyMembers.length})
                </h3>
              </div>

              {/* State Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">State:</span>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="p-1.5 rounded-xl border border-slate-300 text-xs font-semibold text-blue-950 bg-white"
                >
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Bihar">Bihar</option>
                  <option value="All India">Other States</option>
                </select>
              </div>
            </div>

            {/* Quick Add Pills */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                {lang === 'hi' ? '+ नया सदस्य जोड़ें:' : '+ Add Member Persona:'}
              </label>
              <div className="flex flex-wrap gap-2">
                {availableRoles.map(r => {
                  const Icon = r.icon;
                  return (
                    <button
                      key={r.id}
                      onClick={() => handleAddMember(r.id)}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 hover:border-blue-800 bg-slate-50 hover:bg-blue-50 text-xs font-semibold text-slate-700 hover:text-blue-950 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3 h-3 text-blue-800" />
                      <Icon className="w-3.5 h-3.5" />
                      <span>{r.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Members List */}
            <div className="space-y-2.5">
              {familyMembers.map((m, idx) => (
                <div 
                  key={m.id}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-blue-950 text-amber-400 text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="text-sm font-bold text-slate-900 capitalize">
                        {m.role === 'farmer' && '🌾 Farmer (Kisan)'}
                        {m.role === 'woman' && '✨ Homemaker / Mother'}
                        {m.role === 'daughter' && '👧 Daughter (< 10 yrs)'}
                        {m.role === 'student' && '🎓 Student (Higher Education)'}
                        {m.role === 'senior' && '👴 Senior Citizen (60+ yrs)'}
                        {m.role === 'artisan' && '🔨 Artisan / Craftsperson'}
                        {m.role === 'vendor' && '🛒 Street Vendor (Rehri / Thela)'}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Age: {m.age} yrs • Gender: {m.gender}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRemoveMember(m.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    title="Remove Member"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Calculated Total Entitlement Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Grand Total Highlight */}
            <div className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none"></div>

              <div className="text-xs uppercase tracking-wider text-amber-400 font-bold mb-1">
                {lang === 'hi' ? 'कुल पारिवारिक कल्याण पात्रता' : 'Annual Welfare Entitlement'}
              </div>

              <div className="text-3xl sm:text-4xl font-black text-white mt-1">
                ₹{((results?.totalFinancialEntitlement || 0) + (results?.totalLoanCreditFacility || 0)).toLocaleString('en-IN')}
                <span className="text-xs font-normal text-blue-200 block mt-1">
                  combined annual direct benefits, loans, & health assurance
                </span>
              </div>

              {/* Breakdown metrics */}
              <div className="mt-6 pt-6 border-t border-blue-800/80 space-y-3 text-xs sm:text-sm">
                
                <div className="flex items-center justify-between">
                  <span className="text-blue-200 flex items-center gap-1.5">
                    <IndianRupee className="w-4 h-4 text-amber-400" />
                    Direct Cash DBT / Year:
                  </span>
                  <span className="font-extrabold text-white text-base">
                    ₹{(results?.totalDirectCashAnnual || 0).toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-blue-200 flex items-center gap-1.5">
                    <HeartPulse className="w-4 h-4 text-rose-400" />
                    Cashless Health Cover:
                  </span>
                  <span className="font-extrabold text-white text-base">
                    ₹{(results?.totalHealthInsuranceCover || 500000).toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-blue-200 flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-emerald-400" />
                    Scholarships & Fee Waivers:
                  </span>
                  <span className="font-extrabold text-white text-base">
                    ₹{(results?.totalScholarshipsGrant || 0).toLocaleString('en-IN')}
                  </span>
                </div>

                {(results?.totalLoanCreditFacility || 0) > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-blue-200 flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4 text-cyan-400" />
                      Subsidized Collateral-Free Loans:
                    </span>
                    <span className="font-extrabold text-white text-base">
                      ₹{(results?.totalLoanCreditFacility || 0).toLocaleString('en-IN')}
                    </span>
                  </div>
                )}

              </div>

              <div className="mt-6 pt-4 border-t border-blue-800/60">
                <button
                  onClick={onExploreSchemes}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-102"
                >
                  <span>{lang === 'hi' ? 'सभी योजनाओं की जांच करें' : 'View Matching Schemes'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Itemized Scheme Entitlement Breakdown */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                {lang === 'hi' ? 'पात्र योजनाओं की सूची:' : 'Eligible Scheme Breakdown:'}
              </h4>

              <div className="space-y-2 text-xs">
                {results?.eligibleSchemes?.map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-blue-950">{item.schemeName || item.scheme?.name}</div>
                      <div className="text-[11px] text-emerald-700 font-semibold">{item.benefit}</div>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">
                      {item.member}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
