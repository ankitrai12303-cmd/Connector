import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  // Default citizen profile
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('connector_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return {
      fullName: "Anil Kumar",
      phone: "+91 98765 12345",
      age: 38,
      gender: "male",
      state: "Uttar Pradesh",
      district: "Varanasi",
      occupation: "farmer",
      socialCategory: "OBC",
      annualIncome: 95000,
      education: "10th Pass",
      hasLand: true,
      hasPuccaHouse: false,
      isDisability: false,
      isPregnant: false,
      hasGirlChildUnder10: true,
      rationCard: "BPL (NFSA)",
      aadhaarLinkedDBT: true
    };
  });

  // Bookmarked schemes
  const [savedSchemes, setSavedSchemes] = useState(() => {
    const saved = localStorage.getItem('connector_bookmarks');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return ["pm-kisan", "ayushman-bharat-pmjay", "sukanya-samriddhi-yojana"];
  });

  // Application drafts and tracking
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('connector_applications');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return [
      {
        id: "app-101",
        schemeId: "pm-kisan",
        schemeName: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
        status: "Draft Ready",
        progress: 85,
        updatedAt: "2026-10-10",
        notes: "Land record Khatauni verified. Pending bank branch IFSC confirmation."
      },
      {
        id: "app-102",
        schemeId: "ayushman-bharat-pmjay",
        schemeName: "Ayushman Bharat PM-JAY",
        status: "Official Portal Redirected",
        progress: 100,
        updatedAt: "2026-10-08",
        notes: "Completed e-KYC on beneficiary.nha.gov.in. Golden Card active."
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('connector_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('connector_bookmarks', JSON.stringify(savedSchemes));
  }, [savedSchemes]);

  useEffect(() => {
    localStorage.setItem('connector_applications', JSON.stringify(applications));
  }, [applications]);

  const toggleBookmark = (schemeId) => {
    setSavedSchemes(prev => {
      if (prev.includes(schemeId)) {
        return prev.filter(id => id !== schemeId);
      } else {
        return [...prev, schemeId];
      }
    });
  };

  const isBookmarked = (schemeId) => savedSchemes.includes(schemeId);

  const updateProfile = (fields) => {
    setProfile(prev => ({ ...prev, ...fields }));
  };

  const addOrUpdateApplication = (app) => {
    setApplications(prev => {
      const idx = prev.findIndex(a => a.schemeId === app.schemeId);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], ...app, updatedAt: new Date().toISOString().slice(0, 10) };
        return copy;
      }
      return [
        {
          id: `app-${Date.now()}`,
          progress: 50,
          updatedAt: new Date().toISOString().slice(0, 10),
          ...app
        },
        ...prev
      ];
    });
  };

  return (
    <UserContext.Provider
      value={{
        profile,
        updateProfile,
        savedSchemes,
        toggleBookmark,
        isBookmarked,
        applications,
        addOrUpdateApplication
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
