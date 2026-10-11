# CONNECTOR — Government Schemes for Everyone
> **“Connecting Every Citizen to Every Opportunity.”**

CONNECTOR is a modern, responsive, citizen-centric government technology platform designed to help Indian citizens discover, understand, and apply for government welfare schemes through a unified digital interface with AI assistance.

---

## 🏛️ Key Features

### 1. GovTech Accessible Design System
- **Color Palette**: Deep Navy Blue (`#0B2545`), Crisp White, subtle Indian saffron (`#F97316`) and emerald green (`#15803D`) accents.
- **Accessibility Tools**:
  - Font size adjustment ($A^- / A / A^+$) for elderly and low-vision users.
  - High Contrast mode toggle.
  - Bilingual interface (English & हिन्दी) with instant language switching.
  - Screen reader compliant and touch-friendly controls.

### 2. Homepage & Omnibox Search
- Hero section with live welfare statistics (500+ Cataloged, ₹15,000+ Cr DBT Tracked, 28 States Covered).
- Prominent omnibox search with trending tags (*PM-KISAN ₹6,000*, *Ayushman 5 Lakh Card*, *PM Vishwakarma*, *Post-Matric Scholarship*).
- 9 Welfare Categories with live scheme counts.
- 3-Step Citizen Journey: **1. Discover** &rarr; **2. Check Eligibility** &rarr; **3. Apply with Guidance**.

### 3. AI-Powered Scheme Finder
- 3-step interactive wizard calculating exact scheme eligibility based on:
  - Age group & Gender
  - State and District
  - Occupation (Farmer, Student, Street Vendor, Artisan, SHG Member, etc.)
  - Education level & Social Category (General, OBC, SC, ST, EWS)
  - Annual Family Income bracket & specific conditions (Landholding, Pucca House, Disability, Pregnant/Lactating, Girl Child under 10)
- Computes percentage match scores with detailed breakdowns of met criteria vs missing documents.

### 4. AI Voice Assistant ("Connector Sahayak / वानी")
- Voice-enabled speech recognition (Speech-to-Text) and audio voice responses (Text-to-Speech).
- Bilingual Hindi and English natural language understanding.
- Answers natural questions like:
  - *"Mujhe scholarship ke liye kaunsi scheme milegi?"*
  - *"Kisan bhaiyo ke liye khad aur beej subsidy"*
  - *"Ayushman card me 5 lakh ka ilaj kaise milega?"*
  - *"PM Vishwakarma 15000 toolkit kaise milegi?"*

### 5. Smart Application Guide & Document Readiness Checker
- Document verification checklist with clear mandatory/optional badges.
- Field-by-field form preparation with explanatory tooltips for confusing terms (*DBT-linked Aadhaar*, *NPCI Seeding*, *IFSC Code*, *Khatauni*).
- Draft save and resume feature saved in local storage.
- Safe official portal redirection gate to designated `.gov.in` / `.nic.in` domains.

### 6. Citizen Dashboard
- Tailored scheme recommendations matching citizen profile.
- Bookmarked / Saved schemes manager.
- Application status tracker.
- Important deadlines and renewal reminders.

### 7. Administration Panel
- Catalog management: Add new schemes, update official guidelines, verify official links.
- Real-time anonymized platform search analytics.
- Citizen feedback and inquiry review.

### 8. Trust & Security
- Strict statutory disclaimer on non-impersonation of government ministries.
- No requests for OTPs, passwords, or processing fees.
- Verified government gazette stamps with audit timestamps.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4, Lucide React, Canvas Confetti, Web Speech API (STT & TTS)
- **Backend**: Node.js, Express.js REST API
- **Data Store**: Structured Government Schemes Catalog with rule-based evaluation engine

---

## 🚀 How to Run

### Backend API Server
```bash
cd server
npm install
node index.js
# Runs on http://localhost:5000
```

### Frontend Web Application
```bash
cd client
npm install
npm run dev
# Runs on http://localhost:5173
```

---

## 📜 Official Government Verification Notice
*CONNECTOR is an independent citizen guidance platform. All benefit sanctions and disbursements are conducted strictly by designated Government of India and State authorities through their respective official portals.*
