# 🌏 GO TO TRAVEL

> **Tourism Route-Based Adventure Platform** — เปลี่ยนการท่องเที่ยวให้กลายเป็นการผจญภัยตามเส้นทาง

[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React Native](https://img.shields.io/badge/React_Native-61DAFB?style=flat&logo=react&logoColor=black)](https://reactnative.dev/)

---

## 🎯 Core Philosophy

**"ปลายทางไม่ใช่เป้าหมาย แต่เส้นทางคือการผจญภัย"**

> _"It's not about where you want to go — it's about where you want to be between."_

GO TO TRAVEL เปลี่ยนแนวคิดจาก **"Getting to destination"** เป็น **"The journey itself forms the adventure"**

---

## 🧩 Core Problem

- 💰 รายได้ท่องเที่ยวกระจุกตัวเฉพาะแลนด์มาร์กหลัก
- 🏪 ร้านค้าชุมชนถูกมองข้ามและเข้าถึงนักท่องเที่ยวได้ยาก
- 🤷 นักท่องเที่ยว Gen Y / Gen Z ไม่รู้ว่าจะทำอะไรระหว่างทาง
- 📱 แอปท่องเที่ยวปัจจุบัน = Google Maps + Directory ไม่มีแรงจูงใจ
- 🚗 ผู้คนมุ่งหน้าไปจุดหมายปลายทาง แล้วกลับบ้าน พลาดประสบการณ์ระหว่างทาง

---

## ✨ Core Solution

### Adventure Route System

GO TO TRAVEL ไม่ใช่แอปนำทาง แต่เป็น **Route-Based Adventure Platform** ที่สร้างประสบการณ์ตามเส้นทาง:

```
เลือกต้นทาง - ปลายทาง → Mascot Scout เสนอเส้นทางพิเศษ
→ ค้นพบ Checkpoint น่าสนใจระหว่างทาง
→ ปลดล็อก Checkpoint ทีละจุด
→ ถ่ายรูปกับ Mascot ใน AR
→ รับตราประทับและรางวัล
→ สะสม Memory Collection
→ รับ Voucher ใช้ที่ร้านชุมชน
→ สร้าง Memory Book
→ แชร์ประสบการณ์
```

### สิ่งที่ผสมผสาน:

- 🎮 **Route Gamification** — เส้นทางคือเกม ไม่ใช่แค่การเดินทาง
- 📍 **Smart Checkpoint System** — ค้นหาจุดน่าสนใจที่ถูกมองข้าม
- 🎭 **Mascot Scout** — คู่หูเสนอเส้นทางผจญภัยแทนเส้นทางเร็วสุด
- 🎁 **E-Voucher Economy** — รางวัลใช้ได้จริงที่ร้านชุมชน
- 📖 **Memory Book** — บันทึกเส้นทางการเดินทางทั้งหมด
- 🏘️ **Community Impact** — สร้างรายได้ให้ธุรกิจท้องถิ่น

---

## 🗺️ User Journey Example

**สถานการณ์:** นักท่องเที่ยวต้องการไปหัวหิน

### แบบเดิม (Google Maps):
```
กรุงเทพฯ → เส้นทางตรง → หัวหิน (2 ชม.)
ไม่รู้ว่าระหว่างทางมีอะไรน่าสนใจ
```

### แบบ GO TO TRAVEL:
```
1️⃣ ผู้ใช้เลือก: กรุงเทพฯ → หัวหิน
2️⃣ Mascot Scout เสนอ: "เส้นทางชายฝั่งลับ" (3 ชม. + 5 Checkpoints)
3️⃣ Checkpoint 1: ร้านกาแฟริมทะเล (เปิด)
   ├─ ถ่าย AR Photo กับ Mascot
   ├─ รับตราประทับ
   └─ ปลดล็อก Checkpoint 2
4️⃣ Checkpoint 2: ร้านอาหารชุมชนซ่อนเร้น
5️⃣ Checkpoint 3: จุดชมวิวที่ไม่มีในแผนที่
6️⃣ Checkpoint 4: ตลาดท้องถิ่น
7️⃣ Checkpoint 5: พิพิธภัณฑ์เล็กๆ
8️⃣ สะสมครบ → รับ Voucher Pack ใช้ที่หัวหิน
9️⃣ ถึงหัวหิน + Memory Book ที่เต็มไปด้วยประสบการณ์
```

**ผลลัพธ์:**
- ✅ นักท่องเที่ยวมีความสุขกับการเดินทาง ไม่ใช่แค่จุดหมาย
- ✅ ร้านชุมชนได้ลูกค้าใหม่
- ✅ รายได้กระจายตัว ไม่กระจุกแค่แลนด์มาร์ก
- ✅ ผู้ใช้ใช้เวลาท่องเที่ยวนานขึ้น

---

## 🏗️ Project Structure

```
NSC-GO-TO-TRAVEL/
├── apps/              # Mobile & Web Applications
├── backend/           # Cloud Functions & APIs
│   ├── functions/     # Firebase Cloud Functions
│   └── services/      # Business Logic Services
├── frontend/          # React Native Mobile App
│   ├── src/
│   │   ├── screens/   # UI Screens
│   │   ├── components/# Reusable Components
│   │   ├── services/  # API Services
│   │   └── store/     # State Management
├── shared/            # Shared Types & Utils
│   ├── types/         # TypeScript Types
│   └── utils/         # Shared Utilities
├── docs/              # Documentation
│   ├── ARCHITECTURE.md
│   ├── API_SPECIFICATION.md
│   └── DATABASE_SCHEMA.md
├── Ref/               # Reference Materials
│   └── Prompt/        # Product Documentation
├── firebase.json      # Firebase Configuration
├── firestore.rules    # Security Rules
└── storage.rules      # Storage Rules
```

---

## 🚀 Tech Stack

### Frontend
- **React Native** (Expo v56) — Cross-platform mobile
- **TypeScript** — Type safety
- **React Navigation** — Screen navigation
- **Google Maps API** — Map & Route display
- **AR Foundation** — Mascot AR experience
- **Expo Location** — GPS tracking

### Backend
- **Firebase Cloud Functions** (Node.js 20)
- **Express.js** — API routing
- **TypeScript** — Type safety
- **Firebase Admin SDK** — Backend services

### Database & Services
- **Firestore** — NoSQL database
- **Firebase Storage** — Image storage
- **Firebase Authentication** — User auth
- **Google Maps Platform** — Routing & Places API
- **Firebase Cloud Messaging** — Push notifications

---

## 📦 Core System Modules

| Module | Responsibility | Status |
|--------|----------------|--------|
| **Route System** | Route generation, checkpoint discovery | 🔴 New |
| **Mascot Scout** | Smart route suggestion, companion system | 🔴 New |
| **Checkpoint Engine** | Progressive unlock, validation | 🔴 New |
| **Memory System** | Photo collection, stamp system, Memory Book | 🔴 New |
| **Authentication** | Google Login, user profiles | 🟢 Existing |
| **Voucher Engine** | E-voucher creation, validation, redemption | 🟡 Updated |
| **Map Integration** | GPS tracking, geofencing, navigation | 🟡 Updated |
| **AR Experience** | Mascot spawn, photo capture | 🟢 Existing |
| **Community Platform** | Merchant integration, analytics | 🟢 Existing |
| **Economic Impact** | Spending tracking, impact calculation | 🟢 Existing |

---

## 🎯 Feature Priority

### ✅ MVP (P0) — For NSC Demo

#### 1. Destination Selection
- เลือกต้นทาง (จากตำแหน่งปัจจุบัน)
- เลือกปลายทาง (เมนู/ค้นหา)

#### 2. Mascot Scout Experience
- Mascot แสดงตัวและแนะนำ
- เสนอ Adventure Route (ไม่ใช่เส้นทางเร็วสุด)
- แสดงจำนวน Checkpoints และโอกาสรับรางวัล

#### 3. Route Presentation
- แสดงแผนที่เส้นทาง
- แสดง Checkpoint markers (เฉพาะ Checkpoint 1 ที่ปลดล็อกแล้ว)
- แสดงระยะทาง เวลา และรางวัลที่คาดหวัง

#### 4. Checkpoint System
- GPS detection เมื่อเข้าใกล้ Checkpoint
- Unlock Checkpoint animation
- ถ่ายรูปกับ Mascot ใน AR
- รับตราประทับ (Route Stamp)
- Progressive unlock (Checkpoint ถัดไปเปิดหลังจากทำปัจจุบันสำเร็จ)

#### 5. Memory Book
- เก็บรูปถ่าย + Stamps
- แสดงเส้นทางที่เดินมา
- Statistics (ระยะทาง, เวลา, Checkpoint ที่แวะ)
- Shareable summary

#### 6. Basic Reward System
- E-Voucher เมื่อเส้นทางสำเร็จ
- แสดงรายการรางวัล
- ตัวอย่างร้านค้าที่ใช้ได้

---

### 🔜 P1 (Post-MVP)
- AR Experience ที่ลื่นไหลขึ้น
- Mascot personality & interactions
- Social sharing (Facebook, Instagram)
- Leaderboard & achievements
- Multi-route suggestions

### 💭 P2 (Future)
- User-generated routes
- Community route ratings
- Route collections (ธีมต่างๆ)
- Multiplayer journey
- Village builder (Lobby system)

---

## 🗄️ Database Collections

### Core Collections

```typescript
// Routes - เส้นทางผจญภัย
routes/
  ├── routeId
  │   ├── origin: GeoPoint
  │   ├── destination: GeoPoint
  │   ├── checkpoints: Checkpoint[]
  │   ├── distance: number
  │   ├── duration: number
  │   ├── rewards: Reward[]
  │   ├── difficultyLevel: string
  │   └── createdAt: timestamp

// Checkpoints - จุดหมายระหว่างทาง
checkpoints/
  ├── checkpointId
  │   ├── location: GeoPoint
  │   ├── name: string
  │   ├── type: string (cafe|restaurant|attraction|photo_spot|hidden_gem)
  │   ├── description: string
  │   ├── businessInfo: object
  │   ├── unlockRadius: number
  │   └── rewardPoints: number

// User Journeys - บันทึกการเดินทาง
user_journeys/
  ├── journeyId
  │   ├── userId: string
  │   ├── routeId: string
  │   ├── status: string (in_progress|completed|abandoned)
  │   ├── startedAt: timestamp
  │   ├── completedAt: timestamp
  │   ├── checkpointsCompleted: string[]
  │   ├── photos: Photo[]
  │   ├── stamps: Stamp[]
  │   └── memoryBook: MemoryBook

// Memory Books - บันทึกประสบการณ์
memory_books/
  ├── bookId
  │   ├── userId: string
  │   ├── journeyId: string
  │   ├── routeName: string
  │   ├── photos: Photo[]
  │   ├── stamps: Stamp[]
  │   ├── achievements: Achievement[]
  │   ├── totalDistance: number
  │   ├── totalTime: number
  │   └── createdAt: timestamp

// Vouchers - รางวัล E-Voucher
vouchers/
  ├── voucherId
  │   ├── userId: string
  │   ├── routeId: string
  │   ├── code: string
  │   ├── type: string
  │   ├── value: number
  │   ├── merchantId: string
  │   ├── status: string (active|used|expired)
  │   ├── expiresAt: timestamp
  │   └── usedAt: timestamp

// Users - ผู้ใช้
users/
  ├── userId
  │   ├── profile: object
  │   ├── mascotCompanion: object
  │   ├── routesCompleted: number
  │   ├── totalDistance: number
  │   ├── achievements: string[]
  │   └── createdAt: timestamp

// Merchants - ร้านค้าชุมชน
merchants/
  ├── merchantId
  │   ├── name: string
  │   ├── location: GeoPoint
  │   ├── category: string
  │   ├── vouchersAccepted: boolean
  │   └── analytics: object
```

---

## 📊 Success Metrics

### Product KPIs
- **Route Completion Rate** — % ของเส้นทางที่เดินจบ
- **Checkpoint Visit Rate** — จำนวน Checkpoint เฉลี่ยต่อเส้นทาง
- **Journey Duration** — เวลาเฉลี่ยต่อเส้นทาง
- **Memory Book Creation Rate** — % ที่สร้าง Memory Book
- **User Retention (D7/D30)** — ผู้ใช้กลับมาใช้ซ้ำ

### Business KPIs
- **Voucher Redemption Rate** — % การใช้ voucher
- **Revenue per Checkpoint** — รายได้เฉลี่ยต่อจุดแวะ
- **Merchant Partner Growth** — จำนวนร้านค้าเพิ่มขึ้น
- **GMV (Gross Merchandise Value)** — มูลค่ารวมผ่านแพลตฟอร์ม

### Community Impact KPIs
- **New Community Visitors** — นักท่องเที่ยวใหม่ที่แวะร้านชุมชน
- **Revenue Distribution** — การกระจายรายได้ (Gini coefficient)
- **Overlooked Places Discovered** — สถานที่ที่ถูกมองข้ามได้รับความสนใจ
- **Local Business Growth** — % การเติบโตของธุรกิจท้องถิ่น

---

## 🛠️ Getting Started

### Prerequisites
```bash
node >= 20.x
npm >= 10.x
firebase-tools >= 13.x
expo-cli >= 6.x
```

### Installation

```bash
# Clone repository
git clone https://github.com/NoppakornZen/NSC-GO-TO-TRAVEL.git
cd NSC-GO-TO-TRAVEL

# Install dependencies - Backend
cd backend
npm install

# Install dependencies - Frontend
cd ../frontend
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

# Run frontend (Expo)
cd frontend
npx expo start

# Deploy to Firebase
firebase deploy
```

### Environment Variables

```bash
# backend/.env
GOOGLE_MAPS_API_KEY=your_api_key
FIREBASE_PROJECT_ID=your_project_id

# frontend/.env
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key
EXPO_PUBLIC_API_URL=your_api_url
```

---

## 📖 Documentation

- [Architecture Guide](docs/ARCHITECTURE.md) — System design & technical architecture
- [API Specification](docs/API_SPECIFICATION.md) — API endpoints & schemas
- [Database Schema](docs/DATABASE_SCHEMA.md) — Firestore collections & structure
- [AI Agent Master](GO_TO_TRAVEL_AI_AGENT_MASTER.md) — SSOT for AI development
- [Product Prompt](Ref/Prompt/GO%20TO%20TRAVEL%20-%20Master%20Product%20Prompt.pdf) — Product vision & requirements
- [Storyboard](Ref/Prompt/StoryBoard%20NSC%20GO%20TO%20TRAVEL.png) — Visual user flow

---

## 🗺️ Roadmap

| Phase | Target | Focus |
|-------|--------|-------|
| **Phase 1** | 🎯 NSC Demo (Current) | MVP: Route system, Checkpoint, Memory Book |
| **Phase 2** | 🏙️ Pilot in Pattaya | Full features, 50+ checkpoints, 20+ merchants |
| **Phase 3** | 🇹🇭 Expand to 5 provinces | Scale to secondary cities |
| **Phase 4** | 🌏 Nationwide Thailand | Coverage across all major destinations |
| **Phase 5** | 🌍 Southeast Asia | International expansion |

---

## 🔄 What Changed from Previous Version

| Previous (Quest-based) | New (Route-based) |
|------------------------|-------------------|
| Pet Scout หาสถานที่ | **Mascot Scout เสนอเส้นทาง** |
| Quest แบบแยกจากกัน | **Checkpoint ในเส้นทางต่อเนื่อง** |
| Jigsaw puzzle collection | **Memory Collection (Photos + Stamps + Stories)** |
| เน้นจุดหมายปลายทาง | **เน้นประสบการณ์ระหว่างทาง** |
| รางวัลแบบ Quest | **รางวัลจากเส้นทางสำเร็จ** |
| สถานที่แยก | **เส้นทางเชื่อมโยง** |

---

## 🤝 Contributing

This is a startup project under NSC incubation. For collaboration inquiries, contact the project team.

### Development Rules

1. ❌ **No New Features** without approval and documentation
2. ✅ **Check for Duplicates** before creating anything
3. 🏛️ **Follow Architecture** — no hardcodes or quick hacks
4. 🎯 **Feature must solve** at least one core problem
5. 📖 **Update Documentation** when changing features

---

## 📄 License

Proprietary. All rights reserved © NSC GO TO TRAVEL Development Team

---

## 👥 Team

**NSC GO TO TRAVEL Development Team**

Built with ❤️ for Thai communities and travelers who seek adventures, not just destinations.

---

## 📞 Contact

For business inquiries, partnerships, and investment opportunities, please reach out through official channels.

---

<div align="center">

**🗺️ The Journey Is The Adventure 🗺️**

**เส้นทางคือการผจญภัย ไม่ใช่แค่จุดหมาย**

</div>
