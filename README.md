# 🌏 GO TO TRAVEL

> **Tourism Gamification Platform** — เปลี่ยนการท่องเที่ยวให้กลายเป็นการผจญภัยที่สร้างรายได้ให้ชุมชน

[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React Native](https://img.shields.io/badge/React_Native-61DAFB?style=flat&logo=react&logoColor=black)](https://reactnative.dev/)

---

## 🎯 Mission

**เปลี่ยนการท่องเที่ยวจาก "การค้นหาสถานที่" ให้กลายเป็น "การออกผจญภัยเพื่อสร้างรายได้ให้ชุมชน"**

GO TO TRAVEL คือ Community Exploration Ecosystem ที่ทำให้ผู้ใช้รู้สึกว่า **"การออกจากบ้านไปเที่ยวคือการเล่นเกม"**

---

## 🧩 Core Problem

- 💰 รายได้ท่องเที่ยวกระจุกตัวเฉพาะแลนด์มาร์กหลัก
- 🏪 ร้านค้าชุมชนเข้าถึงนักท่องเที่ยวได้ยาก
- 🤷 นักท่องเที่ยว Gen Y / Gen Z เลือกสถานที่เที่ยวไม่ออก
- 📱 แอปท่องเที่ยวปัจจุบันเป็นเพียง Directory ไม่ได้สร้างแรงจูงใจ

---

## ✨ Core Solution

GO TO TRAVEL ผสาน:

- 🎮 **Gamification** — Quest System + Pet Scout
- 📍 **Geolocation** — GPS Tracking + Geofencing
- 🎁 **E-Voucher Economy** — รางวัลใช้ได้จริง
- 🏘️ **Community Commerce** — สนับสนุนร้านค้าท้องถิ่น
- 🎭 **AR Experience** — สัตว์คู่หูในโลกจริง

### Game Loop

```
Login → เลือกสัตว์คู่หู → Pet Scout ค้นหาจุดหมาย → เดินทางจริง 
→ ทำ Quest → เก็บ Jigsaw → รับ Voucher → ใช้หน้าร้าน 
→ บันทึก Impact → สร้าง Memory Book → แชร์ → เล่นซ้ำ
```

---

## 🏗️ Project Structure

```
NSC-GO-TO-TRAVEL/
├── apps/              # Mobile & Web Applications
├── backend/           # Cloud Functions & APIs
├── frontend/          # Web Dashboard
├── shared/            # Shared Types & Utils
├── docs/              # Documentation
├── Ref/               # Reference Materials
├── firebase.json      # Firebase Configuration
├── firestore.rules    # Security Rules
└── storage.rules      # Storage Rules
```

---

## 🚀 Tech Stack

### Frontend
- React Native (Mobile App)
- React (Web Dashboard)
- TypeScript
- TailwindCSS

### Backend
- Firebase Cloud Functions
- Node.js + TypeScript
- Express.js

### Database
- Firestore (NoSQL)
- Firebase Storage

### Services
- Firebase Authentication
- Firebase Cloud Messaging
- Google Maps API
- AR Foundation

---

## 📦 Core Modules

| Module | Responsibility |
|--------|----------------|
| **Authentication** | Register, Login, Session Management |
| **Pet System** | Companion Data, Friendship Level, Collection |
| **Map System** | GPS, Geofence, Location Discovery |
| **Quest System** | Quest Generation, Progress Tracking, Rewards |
| **Voucher Engine** | Voucher Creation, Validation, Redemption |
| **Merchant Platform** | Coupon Scan, Verification, Transaction Log |
| **Economic Impact** | Spending Calculation, Impact Dashboard, Analytics |

---

## 🎯 Feature Priority

### ✅ P0 (MVP)
- ✨ Authentication (Google Login)
- 🗺️ GPS & Geofencing
- 🐾 Pet Scout System
- 🎯 Quest System
- 🎟️ E-Voucher Generation & Redemption
- 🏪 Merchant App (Scan & Validate)
- 📖 Memory Book (Economic Impact)

### 🔜 P1
- 🎭 AR Experience (Pet Spawn)
- 🤝 Make Friend System
- 📱 Social Share (Facebook, Instagram)

### 💭 P2
- 🏡 Lobby (Village Builder)
- 👥 Multiplayer Visit

---

## 🗄️ Database Collections

```
users/           # User profiles, levels, achievements
pets/            # Pet companions, friendship, rarity
quests/          # Location-based quests & rewards
jigsaws/         # Collectible pieces & sets
vouchers/        # E-vouchers & redemption status
merchants/       # Shop info & locations
economic_impacts/ # Transaction records & analytics
```

---

## 📊 Success Metrics

### Product KPI
- Daily Active Users (DAU)
- Monthly Active Users (MAU)
- User Retention Rate
- Quest Completion Rate

### Business KPI
- Voucher Usage Rate
- Merchant Revenue Growth
- Economic Impact per User

### Community KPI
- New Visitors to Local Shops
- Repeat Visitors Rate
- Revenue Distribution Across Community

---

## 🛠️ Getting Started

### Prerequisites
```bash
node >= 18.x
npm >= 9.x
firebase-tools >= 12.x
```

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/NSC-GO-TO-TRAVEL.git
cd NSC-GO-TO-TRAVEL

# Install dependencies
npm install

# Configure Firebase
firebase login
firebase use --add
```

### Development

```bash
# Run backend locally
cd backend
npm run serve

# Run frontend
cd frontend
npm start

# Deploy to Firebase
firebase deploy
```

---

## 📖 Documentation

- [AI Agent Master Document](GO_TO_TRAVEL_AI_AGENT_MASTER.md) — SSOT for all agents
- [Prompt Guide](Prompt.txt) — Development guidelines
- [Firestore Rules](firestore.rules) — Database security
- [Storage Rules](storage.rules) — File storage security

---

## 🗺️ Roadmap

| Phase | Target |
|-------|--------|
| **Phase 1** | 🎯 Pilot in Chonburi Province |
| **Phase 2** | 🏙️ Expand to Secondary Cities |
| **Phase 3** | 🇹🇭 Nationwide Thailand |
| **Phase 4** | 🌏 Southeast Asia |
| **Phase 5** | 🌍 Global Tourism Platform |

---

## 🤝 Contributing

This is a startup project. For collaboration inquiries, please contact the project maintainers.

### Development Rules

1. ❌ **No New Features** without approval
2. ✅ **Check for Duplicates** before creating anything
3. 🏛️ **Follow Architecture** — no hardcodes or quick hacks
4. 🎯 **Feature must solve** at least one core problem

---

## 📄 License

This project is proprietary. All rights reserved.

---

## 👥 Team

**NSC GO TO TRAVEL Development Team**

Built with ❤️ for Thai communities

---

## 📞 Contact

For business inquiries and partnerships, please reach out through official channels.

---

<div align="center">

**🌏 Transforming Tourism, Empowering Communities 🌏**

</div>
