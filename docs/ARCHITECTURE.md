# GO TO TRAVEL — Architecture Document

> Version: 2.0 — Route-Based Adventure System
> Last Updated: 2026-06-23

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Architecture Principles](#architecture-principles)
3. [High-Level Architecture](#high-level-architecture)
4. [Core Systems](#core-systems)
5. [Data Flow](#data-flow)
6. [Technology Stack](#technology-stack)
7. [API Architecture](#api-architecture)
8. [Security Architecture](#security-architecture)
9. [Scalability & Performance](#scalability--performance)
10. [Deployment Architecture](#deployment-architecture)

---

## System Overview

GO TO TRAVEL เป็น **Route-Based Tourism Adventure Platform** ที่ออกแบบมาเพื่อ:

- เปลี่ยนการท่องเที่ยวจาก destination-focused เป็น journey-focused
- สร้างประสบการณ์ gamification ตามเส้นทาง
- กระจายรายได้ท่องเที่ยวสู่ชุมชนท้องถิ่น
- ใช้ AI/ML ในการแนะนำเส้นทางที่เหมาะสม

### Core Philosophy
**"The journey is the adventure, not just the destination."**

---

## Architecture Principles

### 1. Mobile-First Design
- React Native cross-platform app (iOS + Android)
- Offline-capable สำหรับ GPS tracking
- Progressive Web App (PWA) สำหรับ merchant

### 2. Serverless Architecture
- Firebase Cloud Functions สำหรับ backend logic
- Auto-scaling ตาม traffic
- Pay-per-use model

### 3. Real-time Data Synchronization
- Firestore real-time listeners
- Optimistic UI updates
- Conflict resolution

### 4. Microservices Pattern
- แต่ละ module เป็น independent service
- Loose coupling
- Event-driven communication

### 5. Security-First
- Firebase Authentication
- Firestore Security Rules
- Data encryption at rest and in transit
- PII protection

### 6. Performance Optimization
- Image CDN (Firebase Storage)
- Client-side caching
- Lazy loading
- Route pre-caching

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
├─────────────────────────────────────────────────────────────┤
│  React Native App          │  Merchant PWA  │  Admin Panel  │
│  (iOS + Android)           │                │               │
└────────────┬───────────────┴────────────────┴───────────────┘
             │
             │ HTTPS / WSS
             │
┌────────────▼───────────────────────────────────────────────┐
│                    API Gateway Layer                        │
├─────────────────────────────────────────────────────────────┤
│  Firebase Hosting  │  Cloud Functions  │  Cloud Run         │
└────────────┬────────────────────────────────────────────────┘
             │
             │
┌────────────▼────────────────────────────────────────────────┐
│                   Business Logic Layer                       │
├─────────────────────────────────────────────────────────────┤
│  Route Engine   │  Checkpoint    │  Memory      │  Voucher  │
│                 │  Engine        │  System      │  Engine   │
│  Mascot Scout   │  AR Service    │  Analytics   │  Auth     │
└────────────┬────────────────────────────────────────────────┘
             │
             │
┌────────────▼────────────────────────────────────────────────┐
│                     Data Layer                               │
├─────────────────────────────────────────────────────────────┤
│  Firestore      │  Firebase      │  Firebase    │  BigQuery │
│  (NoSQL)        │  Storage       │  Auth        │  (Analytics)│
└─────────────────────────────────────────────────────────────┘
             │
             │
┌────────────▼────────────────────────────────────────────────┐
│               External Services Layer                        │
├─────────────────────────────────────────────────────────────┤
│  Google Maps API  │  Places API   │  FCM        │  Analytics│
└─────────────────────────────────────────────────────────────┘
```

---

## Core Systems

### 1. Route Engine

**Purpose:** สร้างและจัดการเส้นทางผจญภัย

**Components:**
- Route Generator
- Checkpoint Discovery Algorithm
- Route Optimizer
- Route Cache Manager

**Responsibilities:**
```typescript
interface RouteEngine {
  generateRoute(origin: GeoPoint, destination: GeoPoint): Promise<Route>;
  discoverCheckpoints(route: Path, preferences: UserPreferences): Promise<Checkpoint[]>;
  optimizeRoute(route: Route, objectives: Objective[]): Promise<Route>;
  cacheRoute(routeId: string, route: Route): Promise<void>;
}
```

**Algorithm Outline:**
1. รับ origin และ destination
2. ใช้ Google Maps Directions API หา base routes (2-3 options)
3. ค้นหา Points of Interest (POI) ระหว่างทาง ด้วย Places API
4. Filter POI ตาม criteria:
   - ระยะห่างจากเส้นทางหลัก (< 5 km detour)
   - ประเภทสถานที่ (cafe, restaurant, attraction, hidden gem)
   - Rating และ popularity
   - Community merchant status
5. เลือก 3-5 Checkpoints ที่ดีที่สุด
6. สร้าง optimized route ที่เชื่อม checkpoints
7. คำนวณ rewards และ difficulty level
8. Cache route for reuse

---

### 2. Mascot Scout System

**Purpose:** ตัวละครคู่หูที่แนะนำและนำทาง

**Components:**
- Mascot Character Manager
- Dialogue System
- Personality Engine
- Scout Recommendation Logic

**Responsibilities:**
```typescript
interface MascotScout {
  presentRoute(route: Route): Promise<Presentation>;
  generateDialogue(context: JourneyContext): Promise<Dialogue>;
  recommendCheckpoint(currentLocation: GeoPoint, route: Route): Promise<Checkpoint>;
  updatePersonality(interactions: Interaction[]): Promise<void>;
}
```

**Features:**
- Dynamic dialogue based on context
- Route presentation animation
- Personality traits (cheerful, adventurous, helpful)
- Context-aware recommendations

---

### 3. Checkpoint Engine

**Purpose:** จัดการ Checkpoint detection, unlock, และ validation

**Components:**
- Geofence Monitor
- Progressive Unlock Controller
- Challenge Validator
- Reward Distributor

**Responsibilities:**
```typescript
interface CheckpointEngine {
  detectProximity(userLocation: GeoPoint, checkpoint: Checkpoint): Promise<boolean>;
  unlockCheckpoint(checkpointId: string, journeyId: string): Promise<UnlockResult>;
  validateChallenge(checkpointId: string, photo: Photo): Promise<ValidationResult>;
  distributeReward(checkpointId: string, userId: string): Promise<Reward>;
}
```

**Unlock Logic:**
```
Checkpoint 1: Unlocked by default เมื่อเริ่ม journey
Checkpoint 2: Unlocked เมื่อ complete Checkpoint 1
Checkpoint 3: Unlocked เมื่อ complete Checkpoint 2
...และต่อไปเรื่อยๆ
```

**Geofence Radius:**
- Standard: 50 meters
- Large attractions: 100 meters
- Photo spots: 30 meters

---

### 4. Memory System

**Purpose:** รวบรวมและสร้าง Memory Book

**Components:**
- Photo Manager
- Stamp Collection Manager
- Memory Book Generator
- Story Compiler

**Responsibilities:**
```typescript
interface MemorySystem {
  collectPhoto(photo: Photo, checkpointId: string): Promise<void>;
  collectStamp(stamp: Stamp, checkpointId: string): Promise<void>;
  generateMemoryBook(journeyId: string): Promise<MemoryBook>;
  compileStory(journey: Journey): Promise<Story>;
}
```

**Memory Book Structure:**
```typescript
interface MemoryBook {
  journeyId: string;
  userId: string;
  routeName: string;
  coverPhoto: Photo;
  photos: Photo[];
  stamps: Stamp[];
  routeMap: EncodedPolyline;
  statistics: {
    totalDistance: number;
    totalDuration: number;
    checkpointsVisited: number;
    photosToken: number;
  };
  story: string;
  achievements: Achievement[];
  createdAt: Timestamp;
}
```

---

### 5. Voucher Engine

**Purpose:** สร้าง validate และจัดการ E-Vouchers

**Components:**
- Voucher Generator
- Code Generator (unique codes)
- Validation Service
- Redemption Tracker

**Responsibilities:**
```typescript
interface VoucherEngine {
  generateVoucher(routeId: string, userId: string): Promise<Voucher>;
  validateCode(code: string): Promise<ValidationResult>;
  redeemVoucher(voucherId: string, merchantId: string): Promise<RedemptionResult>;
  trackUsage(voucherId: string): Promise<UsageStats>;
}
```

**Voucher Types:**
- Discount vouchers (10%, 20%, 50% off)
- Freebie vouchers (free drink, free dessert)
- Special offers (2-for-1, buy 1 get 1)

**Expiration Logic:**
- Standard: 30 days from issue
- Special events: 7 days
- High-value: 90 days

---

### 6. AR Experience Service

**Purpose:** Render Mascot ใน AR และจัดการ AR photo capture

**Components:**
- AR Scene Manager
- Mascot Renderer
- Surface Detection
- Photo Capture Service

**Responsibilities:**
```typescript
interface ARService {
  initializeARSession(): Promise<ARSession>;
  spawnMascot(position: Vector3): Promise<MascotInstance>;
  capturePhoto(): Promise<Photo>;
  detectSurface(): Promise<Surface>;
}
```

**AR Framework:**
- iOS: ARKit
- Android: ARCore
- React Native: react-native-arkit / react-native-arcore

---

### 7. Analytics & Impact Engine

**Purpose:** ติดตามและคำนวณ Economic Impact

**Components:**
- Event Tracker
- Impact Calculator
- Dashboard Generator
- Reporting Service

**Responsibilities:**
```typescript
interface AnalyticsEngine {
  trackEvent(event: AnalyticsEvent): Promise<void>;
  calculateImpact(journeyId: string): Promise<ImpactReport>;
  generateDashboard(merchantId: string): Promise<Dashboard>;
  exportReport(period: DateRange): Promise<Report>;
}
```

**Tracked Metrics:**
- Route completions
- Checkpoint visits
- Voucher redemptions
- Revenue generated
- Community impact score

---

## Data Flow

### User Journey Data Flow

```
1. User selects destination
   │
   ├─► Route Engine generates route
   │   ├─► Queries Google Maps API
   │   ├─► Queries Places API
   │   └─► Stores route in Firestore
   │
2. Mascot presents route
   │
   ├─► User accepts route
   │   └─► Creates user_journey document
   │
3. User travels to Checkpoint 1
   │
   ├─► GPS tracks location (client-side)
   ├─► Checkpoint Engine detects proximity
   └─► Unlocks Checkpoint 1
   │
4. User completes Checkpoint 1
   │
   ├─► Takes AR photo
   ├─► Memory System stores photo
   ├─► Checkpoint Engine awards stamp
   └─► Unlocks Checkpoint 2
   │
5. Repeat for all checkpoints
   │
6. User reaches destination
   │
   ├─► Memory System generates Memory Book
   ├─► Voucher Engine issues vouchers
   └─► Updates user_journey status to 'completed'
```

### Real-time Sync Flow

```
Client                    Firestore                Cloud Function
  │                          │                          │
  │──GPS Update──────────────▶│                          │
  │                          │                          │
  │◀────Real-time Listener───│                          │
  │                          │                          │
  │──Checkpoint Arrived──────▶│                          │
  │                          │──Trigger────────────────▶│
  │                          │                          │
  │                          │◀────Update Journey───────│
  │◀────Updated Journey──────│                          │
  │                          │                          │
```

---

## Technology Stack

### Frontend (Mobile App)

```javascript
{
  "framework": "React Native (Expo)",
  "version": "Expo SDK 56",
  "language": "TypeScript",
  "stateManagement": "Redux Toolkit",
  "navigation": "React Navigation 6",
  "maps": "@react-native-maps/maps",
  "ar": "expo-ar / react-native-arkit",
  "location": "expo-location",
  "camera": "expo-camera",
  "storage": "@react-native-async-storage/async-storage"
}
```

### Backend

```javascript
{
  "platform": "Firebase",
  "runtime": "Node.js 20",
  "framework": "Express.js",
  "language": "TypeScript",
  "functions": "Firebase Cloud Functions (Gen 2)",
  "auth": "Firebase Authentication",
  "database": "Cloud Firestore",
  "storage": "Firebase Storage",
  "analytics": "Google Analytics 4 + BigQuery"
}
```

### External Services

```javascript
{
  "maps": "Google Maps Platform",
  "directions": "Directions API",
  "places": "Places API",
  "geocoding": "Geocoding API",
  "messaging": "Firebase Cloud Messaging",
  "cdn": "Firebase Hosting + Cloud CDN"
}
```

---

## API Architecture

### RESTful Endpoints

```
POST   /api/v1/routes/generate
GET    /api/v1/routes/:routeId
POST   /api/v1/journeys/start
PATCH  /api/v1/journeys/:journeyId/checkpoint
POST   /api/v1/checkpoints/:checkpointId/validate
GET    /api/v1/memory-books/:bookId
POST   /api/v1/vouchers/generate
POST   /api/v1/vouchers/redeem
GET    /api/v1/merchants/:merchantId
```

### WebSocket Endpoints (Real-time)

```
ws://api.gototravel.app/ws/journey/:journeyId
  - Location updates
  - Checkpoint proximity alerts
  - Real-time notifications
```

---

## Security Architecture

### Authentication Flow

```
User ──Google OAuth───▶ Firebase Auth ──JWT Token───▶ Client
                            │
                            ├──Verify Token──▶ Cloud Functions
                            │
                            └──Check Rules───▶ Firestore
```

### Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    
    // Routes are public read, admin write
    match /routes/{routeId} {
      allow read: if request.auth != null;
      allow write: if request.auth.token.admin == true;
    }
    
    // User journeys are private
    match /user_journeys/{journeyId} {
      allow read, write: if request.auth.uid == resource.data.userId;
    }
    
    // Memory books are owner-readable, public if shared
    match /memory_books/{bookId} {
      allow read: if request.auth.uid == resource.data.userId 
                  || resource.data.isPublic == true;
      allow write: if request.auth.uid == resource.data.userId;
    }
  }
}
```

---

## Scalability & Performance

### Horizontal Scaling

- **Cloud Functions:** Auto-scale ตาม concurrency
- **Firestore:** Automatic sharding
- **CDN:** Global edge caching สำหรับ static assets

### Caching Strategy

```
Level 1: Client-side cache (AsyncStorage)
  ├─ Routes (7 days TTL)
  ├─ Checkpoints (7 days TTL)
  └─ User profile (until logout)

Level 2: CDN cache (Cloud CDN)
  ├─ Images (30 days TTL)
  ├─ Static assets (90 days TTL)
  └─ Public routes (1 day TTL)

Level 3: Firestore cache
  ├─ Offline persistence enabled
  └─ Real-time listener cache
```

### Performance Targets

- Initial app load: < 2s
- Route generation: < 1s
- Checkpoint unlock: < 500ms
- Photo upload: < 3s (2MB image)
- Memory Book generation: < 5s

---

## Deployment Architecture

### Development Environment

```
localhost:3000 ──▶ Expo Dev Server (Frontend)
localhost:5001 ──▶ Firebase Emulator (Backend)
localhost:4000 ──▶ Firestore Emulator
localhost:9199 ──▶ Storage Emulator
```

### Staging Environment

```
staging.gototravel.app
├─ Firebase Project: gototravel-staging
├─ Expo channel: staging
└─ Separate Firestore instance
```

### Production Environment

```
app.gototravel.app
├─ Firebase Project: gototravel-prod
├─ Expo channel: production
├─ Multi-region Firestore
└─ CDN-backed assets
```

### CI/CD Pipeline

```
Git Push ──▶ GitHub Actions
            │
            ├─ Run Tests
            ├─ Build App (Expo)
            ├─ Deploy Functions (Firebase)
            ├─ Deploy Firestore Rules
            └─ Deploy Hosting
```

---

## Monitoring & Observability

### Logging

- **Cloud Functions Logs:** Google Cloud Logging
- **Frontend Errors:** Sentry
- **Analytics Events:** Google Analytics 4

### Metrics

- **Performance:** Firebase Performance Monitoring
- **Availability:** Uptime checks via Cloud Monitoring
- **Business Metrics:** BigQuery dashboards

### Alerts

```yaml
- Route generation failures > 5% → Email admin
- Firestore read costs > $100/day → Slack alert
- App crash rate > 1% → Pager duty
- Checkpoint unlock latency > 1s → Dashboard alert
```

---

## Future Architecture Considerations

### Phase 2 (Post-MVP)

- **ML-based Route Recommendations:** Use TensorFlow to personalize routes
- **Real-time Multi-player:** Firebase Realtime Database for co-op journeys
- **Video Memory Books:** Video compilation service

### Phase 3 (Scale)

- **GraphQL API:** Apollo Server for flexible queries
- **Microservices Split:** Separate services for Route, Voucher, Memory
- **Multi-region Deployment:** Asia-Pacific + Southeast Asia regions

### Phase 4 (Global)

- **Edge Computing:** Cloudflare Workers for global latency reduction
- **Multi-language Support:** i18n with automatic translation
- **Kubernetes Orchestration:** For complex service coordination

---

## Conclusion

GO TO TRAVEL architecture เป็น **serverless-first, mobile-native** platform ที่ออกแบบมาเพื่อ:

✅ Scalability — รองรับผู้ใช้หลายแสนคนพร้อมกัน
✅ Performance — Real-time updates และ smooth UX
✅ Security — Firebase Authentication และ granular permissions
✅ Cost-efficiency — Pay-per-use model
✅ Developer Experience — TypeScript, modern tooling, clear separation of concerns

สถาปัตยกรรมนี้รองรับ **Route-based Adventure** concept อย่างเต็มที่ และพร้อม scale ไปสู่ระดับ global platform.

---

**Document Version:** 2.0
**Last Updated:** 2026-06-23
**Maintained By:** NSC GO TO TRAVEL Development Team
