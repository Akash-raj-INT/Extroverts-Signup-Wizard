# 🍸 Extroverts — Signup Wizard Replication

High-fidelity responsive web application replicating the Signup Wizard of the **Extroverts - Party•Hangout•Vibe** Android Application (`com.pro.nubpack`). Built with React 19, Vite, CSS design system, and Google Fonts Poppins.

---

## 🔗 Quick Links & Live Submission

- 🌐 **Live Deployed Web Application**: [https://extroverts-signup-wizard-9ndtys3fo-akash-rajs-projects-d00afc42.vercel.app/](https://extroverts-signup-wizard-9ndtys3fo-akash-rajs-projects-d00afc42.vercel.app/)
- 🎥 **Screen Recording Video Explanation**: [Google Drive Video Walkthrough](https://drive.google.com/file/d/1NS8IZlv-rwds5QhdMF47TX8s_kM_hixK/view?usp=sharing)
- 📁 **GitHub Source Repository**: [https://github.com/Akash-raj-INT/Extroverts-Signup-Wizard.git](https://github.com/Akash-raj-INT/Extroverts-Signup-Wizard.git)

---

## 🌟 Key Features & UX Improvements

### 📜 1. Landing Page & Terms Modal
- **High-Energy Party Vibe**: Dark theme (`#090A0F`), neon glowing accents, glassmorphic cards, and live party category showcases (*Secret House Parties*, *Rooftop Sundowners*, *Campus Hangouts*, *Techno Nights*).
- **Live Stats Ticker**: Active counters (`12,450+ Verified Extroverts`, `840+ Parties Host This Month`, `4.9★ Community Rating`).
- **Community Terms Modal**: Dedicated 18+ policy agreement, safety code, zero-tolerance policy, and location privacy agreement with direct transition to signup.

### 🧙‍♂️ 2. Progressive 4-Step Signup Wizard
- **Step 1: Contact & Enhanced OTP Verification**
  - Email or Mobile Phone toggle with country code selector (`+1`, `+91`, `+44`, `+61`).
  - Real-time format validation for invalid emails/phones and whitespace-only entries.
  - 6 individual digit input boxes with auto-focus, backspace navigation, paste support, 30s countdown timer (`Resend in 0:28s`), and a `⚡ Fill Demo (123456)` quick-fill button.

- **Step 2: Profile Essentials & Age Restriction UX Improvement**
  - Full Name input (2–50 characters, trim validation).
  - Date of Birth (DOB) date selector with **Real-Time Age Calculation**.
  - **Under 18 Alert UX Improvement**: If calculated age is under 18, a glowing red warning banner appears (`⚠️ Under 18 Restriction: Extroverts is strictly reserved for adults 18+`) and disables registration. If 18+, a green `18+ VERIFIED` badge appears.
  - Gender identity & Pronouns selection pills.

- **Step 3: Campus & Location (Cross-Field Filtering)**
  - **Cross-Field Logic**: Selecting a State (e.g., *California*, *New York*, *Texas*, *Maharashtra*, *Delhi NCR*, *Karnataka*) dynamically filters available Cities.
  - Selecting a City dynamically populates matching Colleges and Universities (e.g., *UCLA*, *NYU*, *IIT Bombay*, *Amity*, *Christ University*).

- **Step 4: Party Vibes, Photo & Bio**
  - Party Vibe Interest Tag pills with a **minimum 3 tags selection requirement**.
  - Photo file uploader preview + **6 preset party avatars gallery picker**.
  - Bio textarea with live character counter (`0/150`) and quick prompt insertion pills.

### 🎉 3. VIP Extrovert Party Pass & Confetti
- Celebratory canvas confetti blast on profile completion.
- Interactive VIP Extrovert Party Pass ticket featuring user photo, name, age, city/state, campus, selected vibes, and Pass Serial Code barcode (`EX-2026-XXXXXX`).

### 📱 4. Device View Simulator
- Top bar toggle to switch between **Desktop Wide Layout** and **Mobile Phone Simulator Frame View** for easy evaluation on any screen.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Plain CSS (CSS Custom Variables, Glassmorphism, Neon Glow Effects, Micro-animations)
- **State Management**: React Component State (`useState`)
- **Typography**: Google Fonts (Poppins)
- **Icons**: Lucide React
- **Animations**: Canvas Confetti
- **Deployment**: Vercel

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Local Setup & Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Akash-raj-INT/Extroverts-Signup-Wizard.git
   cd Extroverts-Signup-Wizard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🧪 Demo Testing Hints

- **OTP Step**: Click the `⚡ Fill Demo (123456)` pill or enter `123456`.
- **Under 18 Check**: Select DOB year `2010` to view the Under 18 restriction banner, then change to `2002` to proceed.
- **Cross-Field Filter**: Select State `California` -> City `Los Angeles` -> College `UCLA`.
