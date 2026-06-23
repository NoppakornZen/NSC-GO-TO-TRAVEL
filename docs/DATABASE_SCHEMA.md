# GO TO TRAVEL — Database Schema

> Version: 2.0 — Route-Based Adventure System
> Last Updated: 2026-06-23
> Database: Cloud Firestore (NoSQL)

---

## Table of Contents

1. [Overview](#overview)
2. [Collections Structure](#collections-structure)
3. [Collection Details](#collection-details)
4. [Indexes](#indexes)
5. [Security Rules](#security-rules)
6. [Data Relationships](#data-relationships)
7. [Migration Guide](#migration-guide)

---

## Overview

GO TO TRAVEL ใช้ **Cloud Firestore** (NoSQL Document Database) สำหรับเก็บข้อมูล

### Firestore Characteristics

- **Document-based:** แต่ละ record เป็น document ใน collection
- **Schema-less:** ไม่บังคับ schema แต่เรากำหนดโครงสร้างเพื่อความชัดเจน
- **Real-time:** รองรับ real-time listeners
- **Scalable:** Auto-scaling และ auto-sharding

### Naming Conventions

- **Collections:** `snake_case` (e.g., `user_journeys`)
- **Document IDs:** Auto-generated หรือ custom (e.g., `user_abc123`)
- **Fields:** `camelCase` (e.g., `createdAt`, `displayName`)

---

## Collections Structure

```
firestore/
├── users/
├── routes/
├── checkpoints/
├── user_journeys/
├── memory_books/
├── vouchers/
├── merchants/
├── economic_impacts/
├── stamps/
├── achievements/
└── analytics_events/
```

---

## Collection Details

### 1. `users`

**Purpose:** เก็บข้อมูลผู้ใช้งาน

**Document ID:** Firebase Auth UID (e.g., `xyz123abc`)

**Schema:**
```typescript
interface User {
  userId: string;              // Same as document ID
  profile: {
    displayName: string;
    email: string;
    photoURL: string;
    phoneNumber?: string;
  };
  mascotCompanion: {
    species: string;           // e.g., "panda", "cat", "dog"
    name: string;
    level: number;
    experience: number;
    personality: string;       // e.g., "cheerful", "adventurous"
  };
  statistics: {
    routesCompleted: number;
    totalDistance: number;     // meters
    totalDuration: number;     // seconds
    totalCheckpoints: number;
    stampsCollected: number;
    vouchersEarned: number;
    vouchersUsed: number;
    photosToken: number;
  };
  achievements: string[];      // Array of achievement IDs
  preferences: {
    interests: string[];       // e.g., ["food", "culture", "nature"]
    difficulty: string;        // "easy" | "medium" | "hard"
    language: string;          // "th" | "en"
  };
  createdAt: Timestamp;
  lastActiveAt: Timestamp;
  updatedAt: Timestamp;
}
```

**Example Document:**
```json
{
  "userId": "user_abc123",
  "profile": {
    "displayName": "สมชาย ใจดี",
    "email": "somchai@example.com",
    "photoURL": "https://lh3.googleusercontent.com/...",
    "phoneNumber": "+66812345678"
  },
  "mascotCompanion": {
    "species": "panda",
    "name": "น้องแพนด้า",
    "level": 5,
    "experience": 250,
    "personality": "cheerful"
  },
  "statistics": {
    "routesCompleted": 3,
    "totalDistance": 450000,
    "totalDuration": 32400,
    "totalCheckpoints": 15,
    "stampsCollected": 12,
    "vouchersEarned": 6,
    "vouchersUsed": 4,
    "photosToken": 28
  },
  "achievements": ["ach_001", "ach_005"],
  "preferences": {
    "interests": ["food", "culture"],
    "difficulty": "medium",
    "language": "th"
  },
  "createdAt": { "_seconds": 1718438400, "_nanoseconds": 0 },
  "lastActiveAt": { "_seconds": 1718870400, "_nanoseconds": 0 },
  "updatedAt": { "_seconds": 1718870400, "_nanoseconds": 0 }
}
```

**Indexes:**
- `lastActiveAt` (DESC)
- `statistics.routesCompleted` (DESC)

---

### 2. `routes`

**Purpose:** เก็บข้อมูลเส้นทางผจญภัย

**Document ID:** Auto-generated (e.g., `route_xyz789`)

**Schema:**
```typescript
interface Route {
  routeId: string;
  name?: string;               // Optional custom name
  origin: {
    location: GeoPoint;
    name: string;
    placeId?: string;          // Google Places ID
  };
  destination: {
    location: GeoPoint;
    name: string;
    placeId?: string;
  };
  checkpoints: string[];       // Array of checkpoint IDs (ordered)
  polyline: string;            // Encoded polyline
  distance: number;            // meters
  duration: number;            // seconds (estimated)
  difficulty: string;          // "easy" | "medium" | "hard"
  rewards: {
    vouchers: number;
    points: number;
    stamps: number;
    experience: number;
  };
  tags: string[];              // e.g., ["coastal", "food-tour", "culture"]
  region: string;              // e.g., "central", "north", "south"
  featured: boolean;
  statistics: {
    completionCount: number;
    averageRating: number;
    averageDuration: number;   // Actual duration from users
    viewCount: number;
  };
  createdBy: string;           // "system" or userId
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

**Example:**
```json
{
  "routeId": "route_123",
  "name": "ชายฝั่งอันดามัน",
  "origin": {
    "location": { "latitude": 13.7563, "longitude": 100.5018 },
    "name": "กรุงเทพฯ",
    "placeId": "ChIJ2w..."
  },
  "destination": {
    "location": { "latitude": 12.9236, "longitude": 100.8825 },
    "name": "หัวหิน",
    "placeId": "ChIJ8x..."
  },
  "checkpoints": ["cp_001", "cp_002", "cp_003", "cp_004", "cp_005"],
  "polyline": "encoded_polyline_string",
  "distance": 220000,
  "duration": 10800,
  "difficulty": "medium",
  "rewards": {
    "vouchers": 3,
    "points": 100,
    "stamps": 5,
    "experience": 150
  },
  "tags": ["coastal", "food", "relaxing"],
  "region": "central",
  "featured": true,
  "statistics": {
    "completionCount": 42,
    "averageRating": 4.5,
    "averageDuration": 11200,
    "viewCount": 328
  },
  "createdBy": "system",
  "createdAt": { "_seconds": 1718438400, "_nanoseconds": 0 },
  "updatedAt": { "_seconds": 1718870400, "_nanoseconds": 0 }
}
```

**Indexes:**
- `region` + `difficulty` + `featured`
- `statistics.completionCount` (DESC)
- `createdAt` (DESC)

---

### 3. `checkpoints`

**Purpose:** จุดหมายระหว่างทาง

**Document ID:** Auto-generated (e.g., `cp_abc123`)

**Schema:**
```typescript
interface Checkpoint {
  checkpointId: string;
  name: string;
  description: string;
  location: GeoPoint;
  address?: string;
  type: string;                // "cafe" | "restaurant" | "attraction" | "photo_spot" | "hidden_gem" | "cultural" | "market"
  photos: string[];            // Array of image URLs
  businessInfo?: {
    merchantId?: string;
    category: string;
    openingHours?: {
      [day: string]: string;   // e.g., "monday": "08:00-18:00"
    };
    contactInfo?: {
      phone?: string;
      email?: string;
      website?: string;
    };
    priceRange?: string;       // "$" | "$$" | "$$$"
  };
  unlockRadius: number;        // meters
  rewardPoints: number;
  photoRequired: boolean;
  arEnabled: boolean;
  hints?: string[];            // Array of hints
  tags: string[];
  statistics: {
    visitCount: number;
    averageRating: number;
    reviewCount: number;
    lastVisitedAt?: Timestamp;
  };
  verified: boolean;
  createdBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

**Example:**
```json
{
  "checkpointId": "cp_001",
  "name": "ร้านกาแฟริมทะเล",
  "description": "ร้านกาแฟเล็กๆ ริมทะเล บรรยากาศสบายๆ เหมาะกับการพักผ่อน",
  "location": { "latitude": 13.3611, "longitude": 100.9847 },
  "address": "99/1 ถนนชายหาด ตำบลแสนสุข อำเภอเมือง",
  "type": "cafe",
  "photos": [
    "https://storage.googleapis.com/gototravel-prod/checkpoints/cp_001/photo1.jpg",
    "https://storage.googleapis.com/gototravel-prod/checkpoints/cp_001/photo2.jpg"
  ],
  "businessInfo": {
    "merchantId": "merchant_001",
    "category": "cafe",
    "openingHours": {
      "monday": "08:00-18:00",
      "tuesday": "08:00-18:00",
      "wednesday": "08:00-18:00",
      "thursday": "08:00-18:00",
      "friday": "08:00-18:00",
      "saturday": "07:00-19:00",
      "sunday": "07:00-19:00"
    },
    "contactInfo": {
      "phone": "+66-32-123-456",
      "facebook": "https://facebook.com/seacafe"
    },
    "priceRange": "$$"
  },
  "unlockRadius": 50,
  "rewardPoints": 10,
  "photoRequired": true,
  "arEnabled": true,
  "hints": [
    "มองหาร้านสีฟ้าริมทะเล",
    "ใกล้กับอนุสาวรีย์"
  ],
  "tags": ["cafe", "seaside", "instagram-worthy"],
  "statistics": {
    "visitCount": 342,
    "averageRating": 4.3,
    "reviewCount": 87,
    "lastVisitedAt": { "_seconds": 1718870400, "_nanoseconds": 0 }
  },
  "verified": true,
  "createdBy": "system",
  "createdAt": { "_seconds": 1718438400, "_nanoseconds": 0 },
  "updatedAt": { "_seconds": 1718870400, "_nanoseconds": 0 }
}
```

**Indexes:**
- `type` + `verified`
- `location` (geohash for geo queries)
- `statistics.visitCount` (DESC)

---

### 4. `user_journeys`

**Purpose:** บันทึกการเดินทางของผู้ใช้

**Document ID:** Auto-generated (e.g., `journey_xyz789`)

**Schema:**
```typescript
interface UserJourney {
  journeyId: string;
  userId: string;
  routeId: string;
  status: string;              // "in_progress" | "completed" | "abandoned"
  startedAt: Timestamp;
  completedAt?: Timestamp;
  abandonedAt?: Timestamp;
  currentCheckpointIndex: number;
  checkpointsCompleted: string[];  // Array of checkpoint IDs
  checkpointsData: Array<{
    checkpointId: string;
    arrivedAt: Timestamp;
    completedAt: Timestamp;
    photo: {
      url: string;
      thumbnailUrl: string;
      caption?: string;
    };
    stamp: {
      stampId: string;
      name: string;
      imageUrl: string;
    };
    timeSpent: number;         // seconds
  }>;
  locationHistory: Array<{     // Sampled location points
    location: GeoPoint;
    timestamp: Timestamp;
  }>;
  statistics: {
    totalDistance: number;     // Actual distance traveled
    totalDuration: number;     // Actual duration
    pausedDurations: number[]; // Array of pause durations
    averageSpeed: number;      // km/h
  };
  pausedAt?: Timestamp;
  resumedAt?: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

**Example:**
```json
{
  "journeyId": "journey_xyz789",
  "userId": "user_abc123",
  "routeId": "route_123",
  "status": "completed",
  "startedAt": { "_seconds": 1718838000, "_nanoseconds": 0 },
  "completedAt": { "_seconds": 1718849800, "_nanoseconds": 0 },
  "currentCheckpointIndex": 5,
  "checkpointsCompleted": ["cp_001", "cp_002", "cp_003", "cp_004", "cp_005"],
  "checkpointsData": [
    {
      "checkpointId": "cp_001",
      "arrivedAt": { "_seconds": 1718840700, "_nanoseconds": 0 },
      "completedAt": { "_seconds": 1718841000, "_nanoseconds": 0 },
      "photo": {
        "url": "https://storage.googleapis.com/.../photo1.jpg",
        "thumbnailUrl": "https://storage.googleapis.com/.../photo1_thumb.jpg",
        "caption": "กาแฟเช้าริมทะเล"
      },
      "stamp": {
        "stampId": "stamp_001",
        "name": "ริมทะเล",
        "imageUrl": "https://storage.googleapis.com/.../stamp1.png"
      },
      "timeSpent": 300
    }
  ],
  "locationHistory": [
    {
      "location": { "latitude": 13.7563, "longitude": 100.5018 },
      "timestamp": { "_seconds": 1718838000, "_nanoseconds": 0 }
    }
  ],
  "statistics": {
    "totalDistance": 225430,
    "totalDuration": 11800,
    "pausedDurations": [600, 300],
    "averageSpeed": 19.1
  },
  "createdAt": { "_seconds": 1718838000, "_nanoseconds": 0 },
  "updatedAt": { "_seconds": 1718849800, "_nanoseconds": 0 }
}
```

**Indexes:**
- `userId` + `status` + `createdAt` (DESC)
- `routeId` + `status`

---

### 5. `memory_books`

**Purpose:** บันทึกประสบการณ์การเดินทาง

**Document ID:** Auto-generated (e.g., `book_abc123`)

**Schema:**
```typescript
interface MemoryBook {
  bookId: string;
  userId: string;
  journeyId: string;
  routeName: string;
  origin: string;
  destination: string;
  coverPhoto: {
    url: string;
    caption?: string;
  };
  photos: Array<{
    url: string;
    thumbnailUrl: string;
    checkpointId: string;
    checkpointName: string;
    timestamp: Timestamp;
    caption?: string;
    location: GeoPoint;
  }>;
  stamps: Array<{
    stampId: string;
    name: string;
    imageUrl: string;
    checkpointId: string;
    earnedAt: Timestamp;
    rarity: string;            // "common" | "rare" | "epic" | "legendary"
  }>;
  routeMap: {
    polyline: string;
    checkpointMarkers: Array<{
      checkpointId: string;
      location: GeoPoint;
      name: string;
    }>;
  };
  statistics: {
    totalDistance: number;
    totalDuration: number;
    checkpointsVisited: number;
    photosToken: number;
    stampsEarned: number;
    averageSpeed: number;
  };
  achievements: string[];      // Achievement IDs earned during this journey
  story: string;               // Auto-generated story
  shareCount: number;
  isPublic: boolean;
  shareUrl?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

**Indexes:**
- `userId` + `createdAt` (DESC)
- `isPublic` + `createdAt` (DESC)

---

### 6. `vouchers`

**Purpose:** E-Vouchers และส่วนลด

**Document ID:** Auto-generated (e.g., `voucher_xyz123`)

**Schema:**
```typescript
interface Voucher {
  voucherId: string;
  userId: string;
  routeId: string;
  journeyId: string;
  code: string;                // Unique code (e.g., "GT-HH-ABC123")
  type: string;                // "discount" | "freebie" | "special_offer"
  value: number;
  unit: string;                // "percent" | "baht" | "item"
  merchantId: string;
  merchantName: string;
  merchantLogo?: string;
  status: string;              // "active" | "used" | "expired"
  terms: string;
  minimumPurchase?: number;
  maximumDiscount?: number;
  issuedAt: Timestamp;
  expiresAt: Timestamp;
  usedAt?: Timestamp;
  redeemedBy?: string;         // Merchant ID
  transactionAmount?: number;
  discountAmount?: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

**Indexes:**
- `userId` + `status` + `expiresAt`
- `code` (unique)
- `merchantId` + `status`

---

### 7. `merchants`

**Purpose:** ร้านค้าพันธมิตร

**Document ID:** Auto-generated (e.g., `merchant_abc123`)

**Schema:**
```typescript
interface Merchant {
  merchantId: string;
  name: string;
  description: string;
  category: string;            // "cafe" | "restaurant" | "shop" | "attraction"
  location: GeoPoint;
  address: string;
  photos: string[];
  logo?: string;
  contactInfo: {
    phone: string;
    email?: string;
    website?: string;
    facebook?: string;
    instagram?: string;
  };
  openingHours: {
    [day: string]: string;
  };
  vouchersAccepted: boolean;
  checkpointIds: string[];     // Associated checkpoints
  businessLicense?: string;
  taxId?: string;
  bankAccount?: {
    bankName: string;
    accountNumber: string;
    accountName: string;
  };
  analytics: {
    visitCount: number;
    voucherRedeemed: number;
    totalRevenue: number;
    lastTransactionAt?: Timestamp;
  };
  verified: boolean;
  featured: boolean;
  rating: number;
  reviewCount: number;
  joinedAt: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

**Indexes:**
- `location` (geohash)
- `category` + `verified`
- `vouchersAccepted` + `featured`

---

### 8. `economic_impacts`

**Purpose:** ติดตาม Economic Impact

**Document ID:** Auto-generated

**Schema:**
```typescript
interface EconomicImpact {
  impactId: string;
  userId: string;
  journeyId: string;
  merchantId: string;
  merchantName: string;
  checkpointId?: string;
  voucherId?: string;
  amount: number;              // Transaction amount
  discountAmount?: number;
  type: string;                // "voucher_redemption" | "direct_visit" | "purchase"
  timestamp: Timestamp;
  location: GeoPoint;
  metadata?: {
    routeId?: string;
    region?: string;
  };
}
```

**Indexes:**
- `merchantId` + `timestamp` (DESC)
- `userId` + `timestamp` (DESC)
- `timestamp` (DESC)

---

### 9. `stamps`

**Purpose:** Master collection ของ Stamps

**Document ID:** Stamp ID (e.g., `stamp_001`)

**Schema:**
```typescript
interface Stamp {
  stampId: string;
  name: string;
  description: string;
  imageUrl: string;
  type: string;                // "checkpoint" | "achievement" | "special"
  rarity: string;              // "common" | "rare" | "epic" | "legendary"
  earnCondition: string;       // How to earn this stamp
  region?: string;
  createdAt: Timestamp;
}
```

---

### 10. `achievements`

**Purpose:** Master collection ของ Achievements

**Document ID:** Achievement ID (e.g., `ach_001`)

**Schema:**
```typescript
interface Achievement {
  achievementId: string;
  title: string;
  description: string;
  iconUrl: string;
  criteria: {
    type: string;              // "routes_completed" | "distance" | "checkpoints"
    value: number;
  };
  reward: {
    points: number;
    badge?: string;
    specialStamp?: string;
  };
  rarity: string;
  createdAt: Timestamp;
}
```

---

## Indexes

### Composite Indexes

```javascript
// users collection
users: {
  lastActiveAt: "DESC",
  "statistics.routesCompleted": "DESC"
}

// routes collection
routes: {
  region: "ASC",
  difficulty: "ASC",
  featured: "DESC",
  "statistics.completionCount": "DESC"
}

// checkpoints collection
checkpoints: {
  type: "ASC",
  verified: "DESC",
  "statistics.visitCount": "DESC"
}

// user_journeys collection
user_journeys: {
  userId: "ASC",
  status: "ASC",
  createdAt: "DESC"
}

// vouchers collection
vouchers: {
  userId: "ASC",
  status: "ASC",
  expiresAt: "ASC"
}

// economic_impacts collection
economic_impacts: {
  merchantId: "ASC",
  timestamp: "DESC"
}
```

### Geohash Indexes

สำหรับ geo queries:

```javascript
checkpoints: {
  geohash: "ASC"
}

merchants: {
  geohash: "ASC"
}
```

---

## Security Rules

### Firestore Rules Overview

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    function isAdmin() {
      return isAuthenticated() && 
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Users collection
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow create: if isOwner(userId);
      allow update, delete: if isOwner(userId);
    }
    
    // Routes collection
    match /routes/{routeId} {
      allow read: if isAuthenticated();
      allow write: if isAdmin();
    }
    
    // Checkpoints collection
    match /checkpoints/{checkpointId} {
      allow read: if isAuthenticated();
      allow write: if isAdmin();
    }
    
    // User journeys
    match /user_journeys/{journeyId} {
      allow read: if isAuthenticated() && resource.data.userId == request.auth.uid;
      allow create: if isAuthenticated() && request.resource.data.userId == request.auth.uid;
      allow update: if isAuthenticated() && resource.data.userId == request.auth.uid;
      allow delete: if isOwner(resource.data.userId);
    }
    
    // Memory books
    match /memory_books/{bookId} {
      allow read: if isAuthenticated() && 
                     (resource.data.userId == request.auth.uid || resource.data.isPublic == true);
      allow write: if isAuthenticated() && resource.data.userId == request.auth.uid;
    }
    
    // Vouchers
    match /vouchers/{voucherId} {
      allow read: if isAuthenticated() && 
                     (resource.data.userId == request.auth.uid || 
                      resource.data.merchantId == request.auth.uid);
      allow create: if isAdmin();
      allow update: if isAuthenticated() && 
                       (resource.data.userId == request.auth.uid || 
                        resource.data.merchantId == request.auth.uid);
    }
    
    // Merchants
    match /merchants/{merchantId} {
      allow read: if isAuthenticated();
      allow write: if isAdmin() || isOwner(merchantId);
    }
    
    // Economic impacts
    match /economic_impacts/{impactId} {
      allow read: if isAdmin();
      allow create: if isAuthenticated();
    }
    
    // Stamps (read-only)
    match /stamps/{stampId} {
      allow read: if isAuthenticated();
      allow write: if isAdmin();
    }
    
    // Achievements (read-only)
    match /achievements/{achievementId} {
      allow read: if isAuthenticated();
      allow write: if isAdmin();
    }
  }
}
```

---

## Data Relationships

```
User (1) ──────> (N) UserJourney
                      │
                      ├──> (1) Route
                      │         │
                      │         └──> (N) Checkpoint
                      │
                      └──> (1) MemoryBook
                               │
                               └──> (N) Photo
                               └──> (N) Stamp

User (1) ──────> (N) Voucher ──> (1) Merchant
                                       │
                                       └──> (N) Checkpoint

UserJourney (1) ──> (N) EconomicImpact ──> (1) Merchant
```

---

## Migration Guide

### From V1.0 to V2.0

#### Deprecated Collections
- `pets` (replaced by `mascotCompanion` in `users`)
- `quests` (replaced by `checkpoints` in route context)
- `jigsaws` (replaced by `stamps` and `memory_books`)

#### New Collections
- `routes`
- `user_journeys`
- `memory_books`
- `stamps`

#### Migration Steps

```typescript
// 1. Migrate users.pet to users.mascotCompanion
async function migrateUserPets() {
  const usersSnapshot = await db.collection('users').get();
  
  for (const userDoc of usersSnapshot.docs) {
    const userData = userDoc.data();
    if (userData.pet) {
      await userDoc.ref.update({
        mascotCompanion: {
          species: userData.pet.species,
          name: userData.pet.name || 'คู่หู',
          level: userData.pet.friendshipLevel || 1,
          experience: 0,
          personality: 'cheerful'
        },
        pet: admin.firestore.FieldValue.delete()
      });
    }
  }
}

// 2. Migrate quests to checkpoints
// (Manual process - review and create checkpoints from quest data)

// 3. Archive old collections
// Keep for 6 months then delete
```

---

## Best Practices

### 1. Document Size
- Keep documents < 1 MB
- Large arrays → subcollections
- Store large images in Firebase Storage, keep URLs only

### 2. Reads Optimization
- Use `limit()` queries
- Implement pagination
- Cache frequently accessed data client-side

### 3. Writes Optimization
- Batch writes when possible
- Use transactions for atomic operations
- Avoid updating same document too frequently

### 4. Security
- Always validate data server-side (Cloud Functions)
- Never trust client input
- Use Security Rules as first line of defense

### 5. Real-time Listeners
- Unsubscribe when component unmounts
- Limit scope of listeners
- Use specific document listeners instead of collection listeners when possible

---

**Document Version:** 2.0
**Last Updated:** 2026-06-23
**Maintained By:** NSC GO TO TRAVEL Development Team
