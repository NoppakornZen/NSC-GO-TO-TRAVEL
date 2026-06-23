# GO TO TRAVEL — AI Agent Master Execution Document

> Version: 1.0
> Project Type: Startup-Grade Product Development Document
> Purpose: Single Source of Truth (SSOT) สำหรับ AI Agent, Developer, Designer และ Product Team

---

# 1. PROJECT IDENTITY

## Product Name
GO TO TRAVEL

## Mission
เปลี่ยนการท่องเที่ยวจาก "การค้นหาสถานที่" ให้กลายเป็น "การออกผจญภัยเพื่อสร้างรายได้ให้ชุมชน"

## Core Problem

- รายได้ท่องเที่ยวกระจุกตัวเฉพาะแลนด์มาร์กหลัก
- ร้านค้าชุมชนเข้าถึงนักท่องเที่ยวได้ยาก
- นักท่องเที่ยว Gen Y / Gen Z เลือกสถานที่เที่ยวไม่ออก
- แอปท่องเที่ยวปัจจุบันเป็นเพียง Directory ไม่ได้สร้างแรงจูงใจ

## Core Solution

GO TO TRAVEL คือ Tourism Gamification Platform ที่ผสาน

- Gamification
- AR Experience
- Geolocation
- Community Commerce
- E-Voucher Economy

เพื่อสร้างวงจร

Discover → Explore → Complete Quest → Spend → Support Community → Share

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

GO TO TRAVEL ไม่ใช่ App ท่องเที่ยว

แต่เป็น

Community Exploration Ecosystem

ที่ทำให้ผู้ใช้รู้สึกว่า

"การออกจากบ้านไปเที่ยวคือการเล่นเกม"

---

# 4. USER TYPES

## Tourist

เป้าหมาย

- เที่ยวสนุก
- สะสมสัตว์
- ได้รางวัล
- ได้ส่วนลดจริง

## Community Merchant

เป้าหมาย

- ได้ลูกค้าใหม่
- เพิ่มยอดขาย
- เข้าถึง Gen Y / Gen Z

## Administrator

เป้าหมาย

- จัดการร้านค้า
- จัดการ Voucher
- ดูข้อมูลเศรษฐกิจ

---

# 5. CORE GAME LOOP

1. Login
2. เลือกสัตว์คู่หู
3. เปิดแผนที่
4. Pet Scout ค้นหาจุดหมาย
5. เดินทางจริง
6. ทำ Quest
7. เก็บ Jigsaw
8. สะสมครบชุด
9. รับ Voucher
10. ใช้หน้าร้านจริง
11. ระบบบันทึก Impact
12. สร้าง Memory Book
13. แชร์ Social Media
14. กลับมาเล่นซ้ำ

---

# 6. FEATURE PRIORITY

## P0 (MVP)

### Authentication

- Google Login
- User Profile

### GPS System

- Location Tracking
- Geofencing

### Pet Scout

- Location Scout
- Jigsaw Scout

### Quest System

- Check-in
- Reward

### E-Voucher

- Generate
- Redeem

### Merchant App

- Scan
- Validate
- Redeem

### Memory Book

- Economic Impact
- Travel History

---

## P1

### AR Experience

- Pet Spawn
- Surface Detection

### Make Friend System

- Random Encounter
- Feeding
- Collection

### Social Share

- Facebook
- Instagram

---

## P2

### Lobby

- Village Builder
- Decoration

### Multiplayer Visit

- Visit Friend Island
- Showcase Collection

---

# 7. SYSTEM MODULES

## Module A

Authentication

Responsibilities

- Register
- Login
- Session
- Permissions

---

## Module B

Pet System

Responsibilities

- Companion Data
- Friendship Level
- Feeding
- Collection

---

## Module C

Map System

Responsibilities

- GPS
- Geofence
- Discovery

---

## Module D

Quest System

Responsibilities

- Quest Generation
- Progress Tracking
- Rewards

---

## Module E

Voucher Engine

Responsibilities

- Voucher Creation
- Validation
- Redemption

---

## Module F

Merchant Platform

Responsibilities

- Coupon Scan
- Verification
- Transaction Log

---

## Module G

Economic Impact Engine

Responsibilities

- Spending Calculation
- Impact Dashboard
- Community Analytics

---

# 8. DATABASE DESIGN

## users

Store

- profile
- level
- pet
- achievements

## pets

Store

- petId
- species
- friendship
- rarity

## quests

Store

- location
- reward
- status

## jigsaws

Store

- piece
- collection
- completion

## vouchers

Store

- code
- status
- merchant

## merchants

Store

- shop info
- location
- category

## economic_impacts

Store

- user
- merchant
- amount
- timestamp

---

# 9. SUCCESS METRICS

## Product KPI

- Daily Active User
- Monthly Active User
- Retention
- Quest Completion Rate

## Business KPI

- Voucher Usage
- Merchant Revenue
- Economic Impact

## Community KPI

- New Visitors
- Repeat Visitors
- Revenue Distribution

---

# 10. AI AGENT WORKFLOW

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

# 12. STARTUP SCALING ROADMAP

Phase 1

Pilot จังหวัดชลบุรี

Phase 2

ขยายสู่เมืองรอง

Phase 3

ทั่วประเทศไทย

Phase 4

Southeast Asia

Phase 5

Global Tourism Exploration Platform

---

# END OF DOCUMENT

เอกสารนี้คือ Source of Truth หลักสำหรับทุก AI Agent ที่ทำงานในโครงการ GO TO TRAVEL
