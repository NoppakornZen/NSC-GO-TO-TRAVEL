# GO TO TRAVEL — AI Agent Master Execution Document

> Version: 2.0 — Route-Based Adventure System
> Project Type: Startup-Grade Product Development Document
> Purpose: Single Source of Truth (SSOT) สำหรับ AI Agent, Developer, Designer และ Product Team
> Last Updated: 2026-06-23

---

# 1. PROJECT IDENTITY

## Product Name
GO TO TRAVEL

## Mission
เปลี่ยนการท่องเที่ยวจาก "การเดินทางไปจุดหมาย" ให้กลายเป็น "การผจญภัยตามเส้นทางที่สร้างรายได้ให้ชุมชน"

## Core Philosophy

**"ปลายทางไม่ใช่เป้าหมาย แต่เส้นทางคือการผจญภัย"**

_"It's not about where you want to go — it's about where you want to be between."_

## Core Problem

- รายได้ท่องเที่ยวกระจุกตัวเฉพาะแลนด์มาร์กหลัก
- ร้านค้าชุมชนถูกมองข้ามและเข้าถึงนักท่องเที่ยวได้ยาก
- นักท่องเที่ยว Gen Y / Gen Z ไม่รู้จะทำอะไรระหว่างทาง
- แอปท่องเที่ยวปัจจุบัน = Google Maps + Directory ไม่สร้างแรงจูงใจ
- ผู้คนมุ่งหน้าไปจุดหมายปลายทาง แล้วกลับบ้าน พลาดประสบการณ์ระหว่างทาง

## Core Solution

GO TO TRAVEL คือ **Route-Based Adventure Platform** ที่ผสาน:

- **Route Gamification** — เส้นทางคือเกม
- **Mascot Scout System** — คู่หูเสนอเส้นทางผจญภัย
- **Smart Checkpoint Discovery** — ค้นหาจุดน่าสนใจที่ถูกมองข้าม
- **Progressive Unlock** — ปลดล็อกจุดหมายทีละจุด
- **Memory Collection** — Photos + Stamps + Stories
- **Community Commerce** — รางวัลที่สร้างรายได้ให้ชุมชน
- **AR Experience** — Mascot ในโลกจริง

เพื่อสร้างวงจร:

**Select Destination → Mascot Scout Route → Unlock Checkpoints → Collect Memories → Earn Vouchers → Support Community → Share Journey**

---

# 2. NON-NEGOTIABLE RULES FOR ALL AI AGENTS

AI Agent ทุกตัวต้องปฏิบัติตาม

## Rule 1

ห้ามสร้าง Feature ใหม่เอง
หากไม่มีในเอกสารนี้ให้เสนอเป็น Proposal แยก

## Rule 2

ทุกงานต้องตรวจสอบก่อนว่า Feature นั้นมีอยู่แล้วหรือไม่

ป้องกัน

- Duplicate Logic
- Duplicate Component
- Duplicate API
- Duplicate Database Collection

## Rule 3

ต้องยึด Architecture กลางเป็นหลัก

ห้าม

- Hardcode
- Temporary Fix
- Quick Hack

## Rule 4

ทุก Feature ต้องตอบโจทย์อย่างน้อย 1 ข้อ

- Discovery
- Exploration
- Community Economy
- Retention
- Social Sharing

หากไม่ตอบโจทย์ใดเลย ให้ถือว่าไม่ควรพัฒนา

---

# 3. PRODUCT VISION

GO TO TRAVEL ไม่ใช่ App นำทาง หรือ App ท่องเที่ยวแบบเดิม

แต่เป็น

**Route-Based Adventure Ecosystem**

ที่ทำให้ผู้ใช้รู้สึกว่า

**"การเดินทางไปจุดหมายคือการผจญภัยที่มีมูลค่า"**

ไม่ใช่แค่ไปถึงปลายทาง แต่คือการสร้างประสบการณ์ระหว่างทาง

---

# 4. USER TYPES

## Tourist

เป้าหมาย

- เดินทางสนุก มีประสบการณ์ระหว่างทาง
- ค้นพบสถานที่ที่ไม่เคยรู้จัก
- สะสม Memory และ Stamps
- ได้รางวัลและส่วนลดจริง
- แชร์ประสบการณ์การเดินทาง

## Community Merchant

เป้าหมาย

- ได้ลูกค้าใหม่ที่กำลังเดินทางผ่าน
- เพิ่มยอดขายจากนักท่องเที่ยว
- เข้าถึง Gen Y / Gen Z
- สร้างการรับรู้แบรนด์

## Administrator

เป้าหมาย

- จัดการเส้นทางและ Checkpoints
- จัดการร้านค้าพันธมิตร
- ดู Analytics และ Community Impact
- ปรับปรุง Route Algorithm

---

# 5. CORE USER FLOW (ROUTE-BASED ADVENTURE)

## Step 1: Destination Selection
ผู้ใช้เลือกต้นทาง (ตำแหน่งปัจจุบัน) และปลายทาง (เช่น หัวหิน)

## Step 2: Mascot Scout
Mascot ปรากฏตัวและเสนอ Adventure Route
- ไม่ใช่เส้นทางเร็วที่สุด (แบบ Google Maps)
- แต่เป็นเส้นทางที่มี Checkpoints น่าสนใจ
- แสดงจำนวน Checkpoints และรางวัลที่คาดว่าจะได้รับ

## Step 3: Route Presentation
แสดงแผนที่เส้นทาง พร้อม:
- Checkpoints ที่จะพบระหว่างทาง (เบลอไว้)
- เฉพาะ Checkpoint แรกที่ปลดล็อกแล้ว
- ระยะทาง เวลา และรางวัลโดยประมาณ

## Step 4: Journey Begins
ผู้ใช้เริ่มเดินทางตามเส้นทาง
- Navigation นำทาง
- แจ้งเตือนเมื่อเข้าใกล้ Checkpoint

## Step 5: Checkpoint Unlock
เมื่อเข้าใกล้ Checkpoint:
- Checkpoint ปลดล็อก (animation)
- แสดงข้อมูลสถานที่
- เปิดภารกิจ (Check-in + AR Photo)

## Step 6: Checkpoint Challenge
ทำภารกิจ:
- ถ่ายรูปกับ Mascot ใน AR
- Check-in ยืนยันตำแหน่ง
- รับ Route Stamp (ตราประทับ)

## Step 7: Progressive Unlock
หลังจากทำ Checkpoint สำเร็จ:
- Checkpoint ถัดไปปลดล็อก
- เส้นทางต่อไปแสดงชัดเจน
- สะสม Memories เพิ่มขึ้น

## Step 8: Memory Collection
ระหว่างทาง สะสม:
- Photos (รูปถ่าย)
- Route Stamps (ตราประทับ)
- Checkpoint Memories (บันทึก)
- Mascot Encounters (การพบกับ Mascot)
- Route Achievements (ความสำเร็จ)

## Step 9: Route Completion
เมื่อถึงจุดหมายปลายทาง:
- ระบบสร้าง Memory Book อัตโนมัติ
- แสดงสรุปการเดินทาง
- รางวัล E-Voucher

## Step 10: Voucher Rewards
รับ Vouchers:
- ส่วนลดร้านชุมชน
- โปรโมชันพิเศษ
- ใช้ได้จริงที่ร้านพันธมิตร

## Step 11: Economic Impact
ระบบบันทึก:
- ร้านค้าที่แวะ
- มูลค่าการใช้จ่าย
- Community Impact Score

## Step 12: Memory Book
Memory Book ประกอบด้วย:
- รูปถ่ายทั้งหมด
- Stamps ที่เก็บได้
- เส้นทางที่เดิน (Map)
- Statistics (ระยะทาง, เวลา, Checkpoints)
- Travel Story

## Step 13: Social Share
แชร์:
- Memory Book
- ไฮไลท์การเดินทาง
- สถิติและรางวัล
- Facebook / Instagram

## Step 14: Repeat Journey
ผู้ใช้กลับมาใช้ซ้ำ:
- เลือกเส้นทางใหม่
- สะสม Memory Books
- สำรวจพื้นที่อื่นๆ

---

# 6. FEATURE PRIORITY

## P0 (MVP) — For NSC Demo

### Authentication

- Google Login
- User Profile
- Session Management

### Destination Selection

- Origin Selection (Current Location)
- Destination Selection (Search/Browse)
- Destination Info Display

### Mascot Scout System

- Mascot Character Display
- Route Suggestion Algorithm
- Adventure Route vs Fast Route Comparison
- Checkpoint Preview

### Route Presentation

- Route Map Display
- Checkpoint Markers (locked/unlocked states)
- Route Information (Distance, Duration, Rewards)
- Navigation Path

### GPS & Navigation

- Real-time Location Tracking
- Geofencing for Checkpoints
- Route Navigation
- Proximity Alerts

### Checkpoint System

- Progressive Unlock Logic
- Checkpoint Detection (GPS-based)
- Unlock Animation
- Checkpoint Info Display
- Check-in Validation

### AR Experience

- Mascot AR Spawn
- AR Photo Capture
- Photo Saving

### Memory Collection

- Photo Collection
- Route Stamp System
- Checkpoint Memories
- Progress Tracking

### Memory Book

- Auto-generation after Route Completion
- Photo Gallery
- Stamp Collection Display
- Route Map Visualization
- Statistics (Distance, Time, Checkpoints)
- Travel Story Summary
- Shareable Format

### E-Voucher System

- Voucher Generation (Route Completion Reward)
- Voucher Display
- Voucher Details
- Basic Redemption Info

### Merchant Integration (Basic)

- Merchant List Display
- Merchant Location on Map
- Voucher Acceptance Info

---

## P1 (Post-MVP)

### Enhanced AR Experience

- Multiple Mascot Interactions
- AR Mini-games at Checkpoints
- Smooth AR Performance

### Mascot Personality

- Dialogue System
- Personality Traits
- Companion Bonding

### Social Features

- Share to Facebook
- Share to Instagram
- Share Memory Book
- Leaderboard
- Friend Achievements

### Advanced Route System

- Multiple Route Options
- Route Difficulty Levels
- Themed Routes (Food, Culture, Nature)
- User Route Ratings

### Merchant App

- QR Code Scanning
- Voucher Validation
- Transaction Recording
- Merchant Dashboard

---

## P2 (Future)

### Community Features

- User-Generated Routes
- Community Route Ratings
- Route Collections
- Challenges & Events

### Multiplayer

- Co-op Journey
- Friend Visit System
- Shared Memory Books

### Lobby System

- Village Builder
- Decoration & Customization
- Collection Showcase

### Advanced Analytics

- Personal Travel Insights
- Community Impact Visualization
- Gamification Achievements

---

# 7. SYSTEM MODULES

## Module A: Authentication

Responsibilities

- User Registration
- Google OAuth Login
- Session Management
- User Permissions
- Profile Management

---

## Module B: Route Engine

Responsibilities

- Route Generation Algorithm
- Checkpoint Discovery
- Route Optimization (Adventure vs Speed)
- Route Caching
- Route Variations

---

## Module C: Mascot Scout

Responsibilities

- Mascot Character System
- Route Recommendation Logic
- Scout Animation & Dialogue
- Companion State Management
- Personality System

---

## Module D: Map & Navigation

Responsibilities

- GPS Tracking
- Geofencing
- Route Display
- Navigation Guidance
- Google Maps Integration

---

## Module E: Checkpoint Engine

Responsibilities

- Checkpoint Detection
- Progressive Unlock Logic
- Proximity Validation
- Checkpoint State Management
- Challenge Verification

---

## Module F: Memory System

Responsibilities

- Photo Management
- Stamp Collection
- Memory Book Generation
- Progress Tracking
- Story Compilation

---

## Module G: AR Experience

Responsibilities

- Mascot AR Rendering
- AR Photo Capture
- Surface Detection
- AR Performance Optimization

---

## Module H: Voucher Engine

Responsibilities

- Voucher Creation
- Voucher Validation
- Redemption Logic
- Expiration Management
- Merchant Integration

---

## Module I: Merchant Platform

Responsibilities

- Merchant Registration
- Merchant Dashboard
- Voucher Scanning
- Transaction Recording
- Analytics Display

---

## Module J: Economic Impact Engine

Responsibilities

- Spending Calculation
- Community Impact Metrics
- Revenue Distribution Tracking
- Business Analytics
- Reporting

---

## Module K: Social Sharing

Responsibilities

- Share Content Generation
- Facebook Integration
- Instagram Integration
- Image Export
- Share Analytics

---

# 8. DATABASE DESIGN

## users

Store

- userId (doc ID)
- profile (name, email, photoURL)
- mascotCompanion (species, level, personality)
- routesCompleted (number)
- totalDistance (number)
- totalCheckpoints (number)
- achievements (array)
- createdAt (timestamp)
- lastActiveAt (timestamp)

## routes

Store

- routeId (doc ID)
- origin (GeoPoint)
- destination (GeoPoint)
- checkpoints (array of checkpoint refs)
- distance (number)
- duration (number)
- difficulty (string: easy|medium|hard)
- rewards (object)
- createdBy (string: system|user)
- rating (number)
- completionCount (number)
- createdAt (timestamp)

## checkpoints

Store

- checkpointId (doc ID)
- location (GeoPoint)
- name (string)
- description (string)
- type (string: cafe|restaurant|attraction|photo_spot|hidden_gem|cultural|market)
- businessInfo (object: merchantId, category, hours)
- unlockRadius (number: meters)
- rewardPoints (number)
- photoRequired (boolean)
- arEnabled (boolean)
- visitCount (number)
- createdAt (timestamp)

## user_journeys

Store

- journeyId (doc ID)
- userId (string)
- routeId (string)
- status (string: in_progress|completed|abandoned)
- startedAt (timestamp)
- completedAt (timestamp)
- currentCheckpointIndex (number)
- checkpointsCompleted (array of checkpointIds)
- checkpointsData (array: [{checkpointId, arrivedAt, photo, stamp}])
- totalDistance (number)
- totalDuration (number)
- pausedDurations (array)

## memory_books

Store

- bookId (doc ID)
- userId (string)
- journeyId (string)
- routeName (string)
- origin (string)
- destination (string)
- photos (array: [{url, checkpointId, timestamp, caption}])
- stamps (array: [{stampId, checkpointId, earnedAt}])
- routeMap (object: encoded polyline)
- statistics (object: {distance, duration, checkpoints, avgSpeed})
- achievements (array)
- story (string: auto-generated)
- shareCount (number)
- createdAt (timestamp)

## vouchers

Store

- voucherId (doc ID)
- userId (string)
- routeId (string)
- journeyId (string)
- code (string: unique)
- type (string: discount|freebie|special_offer)
- value (number)
- merchantId (string)
- merchantName (string)
- status (string: active|used|expired)
- expiresAt (timestamp)
- usedAt (timestamp)
- redeemedBy (string: merchantId)
- createdAt (timestamp)

## merchants

Store

- merchantId (doc ID)
- name (string)
- description (string)
- location (GeoPoint)
- address (string)
- category (string: cafe|restaurant|shop|attraction)
- photos (array)
- vouchersAccepted (boolean)
- contactInfo (object: phone, email, website)
- openingHours (object)
- checkpointIds (array: associated checkpoints)
- analytics (object: {visitCount, voucherRedeemed, revenue})
- verified (boolean)
- joinedAt (timestamp)

## economic_impacts

Store

- impactId (doc ID)
- userId (string)
- journeyId (string)
- merchantId (string)
- merchantName (string)
- checkpointId (string)
- voucherId (string: optional)
- amount (number)
- type (string: voucher_redemption|direct_visit|purchase)
- timestamp (timestamp)
- location (GeoPoint)

## stamps

Store

- stampId (doc ID)
- name (string)
- description (string)
- imageURL (string)
- type (string: checkpoint|achievement|special)
- rarity (string: common|rare|epic|legendary)
- earnCondition (string)
- createdAt (timestamp)

## achievements

Store

- achievementId (doc ID)
- title (string)
- description (string)
- iconURL (string)
- criteria (object: {type, value})
- reward (object: {points, badge})
- rarity (string)
- createdAt (timestamp)

---

# 9. SUCCESS METRICS

## Product KPI

- **Route Completion Rate** — % ของเส้นทางที่ผู้ใช้เดินจบสำเร็จ
- **Checkpoint Visit Rate** — จำนวน Checkpoint เฉลี่ยที่แวะต่อเส้นทาง
- **Journey Duration** — เวลาเฉลี่ยที่ใช้ต่อเส้นทาง
- **Memory Book Creation Rate** — % ที่สร้าง Memory Book หลังเดินทาง
- **Daily Active Users (DAU)**
- **Monthly Active Users (MAU)**
- **User Retention (D7/D30)** — อัตราผู้ใช้กลับมาใช้ซ้ำ
- **Average Routes per User per Month**

## Business KPI

- **Voucher Redemption Rate** — % การใช้ voucher จากที่ได้รับ
- **Revenue per Checkpoint** — รายได้เฉลี่ยต่อ Checkpoint
- **Merchant Partner Growth** — จำนวนร้านค้าพันธมิตรเพิ่มขึ้น
- **GMV (Gross Merchandise Value)** — มูลค่ารวมผ่านแพลตฟอร์ม
- **Average Transaction Value**
- **Repeat Visit Rate** — อัตราการกลับมาใช้เส้นทางซ้ำ

## Community KPI

- **New Community Visitors** — นักท่องเที่ยวใหม่ที่แวะร้านชุมชน
- **Revenue Distribution** — การกระจายรายได้ (Gini coefficient)
- **Overlooked Places Discovered** — สถานที่ที่ถูกมองข้ามได้รับความสนใจ
- **Local Business Growth** — % การเติบโตของธุรกิจท้องถิ่น
- **Checkpoint Diversity** — ความหลากหลายของสถานที่ที่ผู้ใช้แวะ
- **Economic Impact per Journey** — ผลกระทบทางเศรษฐกิจเฉลี่ยต่อการเดินทาง

## Engagement KPI

- **Social Share Rate** — % ที่แชร์ Memory Book
- **Photo Capture Rate** — จำนวนรูปเฉลี่ยต่อเส้นทาง
- **Stamp Collection Rate** — อัตราการสะสม Stamps
- **AR Interaction Rate** — % ที่ใช้ AR feature
- **Route Discovery Rate** — อัตราการค้นพบเส้นทางใหม่

---

# 10. MVP FOCUS FOR NSC DEMO

## Objective

สร้าง Working Prototype สำหรับสาธิตต่อคณะกรรมการ NSC ให้เห็น:

1. **Core Concept** — Route-based Adventure แทน Destination-based
2. **User Flow** — ตั้งแต่เลือกปลายทาง จนถึง Memory Book
3. **Mascot Scout** — ระบบเสนอเส้นทางแบบ Intelligent
4. **Checkpoint System** — Progressive unlock และ AR interaction
5. **Community Impact** — แสดงให้เห็นว่าสร้างรายได้ให้ชุมชนได้จริง

## Must-Have Features

### 1. Destination Selection Screen
- UI: แสดงปลายทางยอดนิยม (Pattaya, Hua Hin, etc.)
- ฟังก์ชัน: เลือกได้ 1 destination
- Mock data: 3-5 destinations

### 2. Mascot Scout Animation
- UI: Mascot ปรากฏตัวพร้อม dialogue
- ฟังก์ชัน: เสนอ Adventure Route
- แสดงเปรียบเทียบ: Fast Route vs Adventure Route

### 3. Route Preview Map
- UI: แผนที่แสดงเส้นทาง
- ฟังก์ชัน: แสดง Checkpoint markers (locked/unlocked)
- Mock data: 1 Route ที่มี 3-5 Checkpoints

### 4. Navigation View (Simulated)
- UI: แผนที่นำทาง + ตำแหน่งปัจจุบัน (mock)
- ฟังก์ชัน: แสดงเส้นทางและ Checkpoint ถัดไป
- Simulated: ไม่ต้องเดินจริง ใช้ "Arrive" button

### 5. Checkpoint Unlock & AR Photo
- UI: Unlock animation + Checkpoint info
- ฟังก์ชัน: AR camera เปิด, ถ่ายรูปกับ Mascot
- Mock AR: ใช้ image overlay (ไม่ต้อง AR จริง ถ้าเวลาไม่พอ)

### 6. Stamp Collection
- UI: แสดง Stamps ที่เก็บได้
- ฟังก์ชัน: เพิ่ม Stamp ทุกครั้งที่ผ่าน Checkpoint

### 7. Memory Book
- UI: Gallery-style แสดงรูป + Stamps + Map
- ฟังก์ชัน: Auto-generate หลังจบเส้นทาง
- Mock data: Summary statistics

### 8. Voucher Display
- UI: รายการ Voucher ที่ได้รับ
- ฟังก์ชัน: แสดงรายละเอียดและร้านที่ใช้ได้
- Mock data: 2-3 Vouchers

## Can Skip (ถ้าเวลาไม่พอ)

- Real GPS tracking (ใช้ simulate)
- Real AR (ใช้ image overlay)
- Backend API (ใช้ local mock data)
- Google Maps Integration (ใช้ static map)
- Authentication (ใช้ mock user)
- Social sharing

## Demo Flow (3-5 นาที)

```
1. เปิดแอป → Welcome screen
2. เลือกปลายทาง → "หัวหิน"
3. Mascot ปรากฏ → เสนอเส้นทาง
4. ดูแผนที่ Route → ตัดสินใจเริ่มเดินทาง
5. Checkpoint 1 → กด "Arrive" → Unlock → ถ่าย AR Photo → รับ Stamp
6. Checkpoint 2 → กด "Arrive" → Unlock → ถ่าย AR Photo → รับ Stamp
7. Checkpoint 3 → กด "Arrive" → Unlock → ถ่าย AR Photo → รับ Stamp
8. ถึงปลายทาง → Memory Book แสดงขึ้น
9. ดู Photos, Stamps, Map Summary
10. รับ Vouchers
11. จบ
```

## Success Criteria

Demo ถือว่าสำเร็จถ้า:

- ✅ แสดง User Flow ครบทั้ง 14 Steps
- ✅ แสดงให้เห็น Route-based Concept ชัดเจน
- ✅ UI/UX ดูสมบูรณ์ และ Polished
- ✅ ไม่มี Bug ขัดจังหวะ
- ✅ คณะกรรมการเข้าใจ Core Value Proposition

---

# 11. AI AGENT WORKFLOW

ก่อนเริ่มงานทุกครั้ง

STEP 1

อ่านเอกสารนี้ทั้งหมด

STEP 2

ระบุ Module ที่เกี่ยวข้อง

STEP 3

ตรวจสอบ Dependency

STEP 4

ตรวจสอบว่ามีของเดิมอยู่แล้วหรือไม่

STEP 5

พัฒนาเฉพาะส่วนที่ได้รับมอบหมาย

STEP 6

ทดสอบ

STEP 7

ส่งผลลัพธ์พร้อม Change Log

---

# 11. DEFINITION OF DONE

Feature จะถือว่าเสร็จเมื่อ

- ผ่าน Build
- ผ่าน Test
- ไม่มี Duplicate Logic
- ไม่มี Hardcode
- เชื่อม Database ได้
- รองรับ Production Scale
- มี Error Handling
- มี Documentation

---

# 12. DEFINITION OF DONE

Feature จะถือว่าเสร็จเมื่อ

- ผ่าน Build
- ผ่าน Test
- ไม่มี Duplicate Logic
- ไม่มี Hardcode
- เชื่อม Database ได้ (หรือใช้ Mock Data อย่างเป็นระบบ)
- รองรับ Production Scale (หรือ Demo Scale สำหรับ MVP)
- มี Error Handling
- มี Documentation
- **สอดคล้องกับ Route-based Adventure Concept**
- **ไม่ทำลาย User Flow ที่กำหนดไว้**

---

# 13. MAJOR CHANGES FROM V1.0

## Concept Shift

| V1.0 (Quest-based) | V2.0 (Route-based) |
|--------------------|--------------------|
| Pet Scout หาสถานที่แยก | Mascot Scout เสนอเส้นทาง |
| Quest แบบแยกกัน | Checkpoint ในเส้นทางต่อเนื่อง |
| Jigsaw puzzle collection | Memory Collection (Photos + Stamps) |
| เน้นจุดหมายปลายทาง | เน้นประสบการณ์ระหว่างทาง |
| รางวัลแบบ Quest | รางวัลจากเส้นทางสำเร็จ |
| สถานที่แยกกัน | เส้นทางเชื่อมโยง |

## New Modules

- ✨ **Route Engine** — ระบบสร้างและจัดการเส้นทาง
- ✨ **Checkpoint System** — Progressive unlock logic
- ✨ **Memory System** — รวบรวม Photos, Stamps, Stories
- ✨ **Mascot Scout** — ตัวละครแนะนำเส้นทาง (แทน Pet Scout)

## Updated Modules

- 🔄 **Map System** — เพิ่ม Route navigation
- 🔄 **Voucher Engine** — เชื่อมกับ Route completion
- 🔄 **AR Experience** — เน้น Checkpoint interaction

## Deprecated Features

- ❌ Jigsaw Puzzle System
- ❌ Separate Quest System
- ❌ Pet Collection (เปลี่ยนเป็น Mascot Companion)

---

# 14. STARTUP SCALING ROADMAP

Phase 1: NSC Demo

**Timeline:** Current (Q2-Q3 2026)
**Target:** Working Prototype
**Scope:** 1 Mock Route, 3-5 Checkpoints, Core User Flow
**Goal:** Secure funding และ validation

Phase 2: Pilot in Pattaya

**Timeline:** Q4 2026
**Target:** 50+ Real Checkpoints, 20+ Merchant Partners
**Scope:** Full feature set, Real GPS/AR, Backend API
**Goal:** Validate Product-Market Fit

Phase 3: Expand to Secondary Cities

**Timeline:** Q1-Q2 2027
**Target:** 5 Provinces (Chiang Mai, Phuket, Krabi, Ayutthaya, Chonburi)
**Scope:** 500+ Checkpoints, 100+ Merchants
**Goal:** Achieve profitability in pilot regions

Phase 4: Nationwide Thailand

**Timeline:** Q3-Q4 2027
**Target:** All major tourist destinations
**Scope:** 2000+ Checkpoints, 500+ Merchants
**Goal:** Become #1 Tourism Adventure Platform in Thailand

Phase 5: Southeast Asia Expansion

**Timeline:** 2028+
**Target:** Vietnam, Philippines, Malaysia, Indonesia
**Scope:** International markets, Multi-language support
**Goal:** Regional Tourism Platform Leader

Phase 6: Global Tourism Platform

**Timeline:** 2029+
**Target:** Worldwide
**Scope:** Global destinations
**Goal:** Transform how people travel globally

---

# END OF DOCUMENT

เอกสารนี้คือ **Source of Truth หลัก** สำหรับทุก AI Agent ที่ทำงานในโครงการ GO TO TRAVEL

**Version 2.0** — Route-Based Adventure System

**สรุปการเปลี่ยนแปลงสำคัญ:**
- เปลี่ยนจาก Quest-based เป็น Route-based Adventure
- เน้นประสบการณ์ระหว่างทาง ไม่ใช่แค่จุดหมาย
- Checkpoint System แทน Quest System
- Memory Collection แทน Jigsaw Collection
- Mascot Scout แทน Pet Scout

**หลักการทำงาน:**
"The journey is the adventure, not just the destination."
