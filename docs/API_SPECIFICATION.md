# GO TO TRAVEL — API Specification

> Version: 2.0 — Route-Based Adventure System
> Last Updated: 2026-06-23
> Base URL: `https://api.gototravel.app/v1`

---

## Table of Contents

1. [Overview](#overview)
2. [Authentication](#authentication)
3. [Common Patterns](#common-patterns)
4. [Routes API](#routes-api)
5. [Journeys API](#journeys-api)
6. [Checkpoints API](#checkpoints-api)
7. [Memory Books API](#memory-books-api)
8. [Vouchers API](#vouchers-api)
9. [Merchants API](#merchants-api)
10. [Users API](#users-api)
11. [WebSocket API](#websocket-api)
12. [Error Codes](#error-codes)

---

## Overview

GO TO TRAVEL API เป็น RESTful API ที่ใช้ JSON สำหรับ request/response

### Base URL

```
Production:  https://api.gototravel.app/v1
Staging:     https://staging-api.gototravel.app/v1
Development: http://localhost:5001/gototravel-dev/asia-southeast1/api/v1
```

### Content Type

```
Content-Type: application/json
Accept: application/json
```

---

## Authentication

### Firebase JWT Token

ทุก request ต้องมี Firebase Authentication token ใน header:

```http
Authorization: Bearer <firebase-id-token>
```

### Get Token (Client-side)

```typescript
import { getAuth } from 'firebase/auth';

const auth = getAuth();
const user = auth.currentUser;
const token = await user.getIdToken();
```

### Token Validation

Backend จะ verify token ด้วย Firebase Admin SDK:

```typescript
const decodedToken = await admin.auth().verifyIdToken(token);
const userId = decodedToken.uid;
```

---

## Common Patterns

### Pagination

```typescript
interface PaginationParams {
  limit?: number;    // Default: 20, Max: 100
  offset?: number;   // Default: 0
  cursor?: string;   // For cursor-based pagination
}

interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
    nextCursor?: string;
  };
}
```

### Standard Response

```typescript
interface SuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
}
```

### Common Types

```typescript
interface GeoPoint {
  latitude: number;
  longitude: number;
}

interface Timestamp {
  _seconds: number;
  _nanoseconds: number;
}
```

---

## Routes API

### Generate Route

สร้างเส้นทางผจญภัยจาก origin ไป destination

**Endpoint:** `POST /routes/generate`

**Request:**
```json
{
  "origin": {
    "latitude": 13.7563,
    "longitude": 100.5018
  },
  "destination": {
    "latitude": 12.9236,
    "longitude": 100.8825
  },
  "preferences": {
    "maxDetour": 10,        // km
    "checkpointCount": 5,   // 3-7
    "interests": ["food", "culture", "nature"],
    "difficulty": "medium"  // easy|medium|hard
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "routeId": "route_abc123",
    "origin": {
      "latitude": 13.7563,
      "longitude": 100.5018,
      "name": "Bangkok"
    },
    "destination": {
      "latitude": 12.9236,
      "longitude": 100.8825,
      "name": "Hua Hin"
    },
    "checkpoints": [
      {
        "checkpointId": "cp_001",
        "name": "ร้านกาแฟริมทะเล",
        "location": {
          "latitude": 13.3611,
          "longitude": 100.9847
        },
        "type": "cafe",
        "description": "ร้านกาแฟเล็กๆ ริมทะเล บรรยากาศดี",
        "estimatedArrival": "2024-06-23T10:30:00Z",
        "unlockRadius": 50,
        "rewardPoints": 10,
        "photoRequired": true
      }
    ],
    "distance": 220000,          // meters
    "duration": 10800,           // seconds (3 hours)
    "difficulty": "medium",
    "rewards": {
      "vouchers": 3,
      "points": 100,
      "stamps": 5
    },
    "polyline": "encoded_polyline_string",
    "createdAt": "2024-06-23T08:00:00Z"
  }
}
```

**Status Codes:**
- `200 OK` — Route generated successfully
- `400 Bad Request` — Invalid origin/destination
- `429 Too Many Requests` — Rate limit exceeded
- `500 Internal Server Error` — Route generation failed

---

### Get Route

ดึงข้อมูล route ที่มีอยู่แล้ว

**Endpoint:** `GET /routes/:routeId`

**Response:**
```json
{
  "success": true,
  "data": {
    "routeId": "route_abc123",
    "origin": { ... },
    "destination": { ... },
    "checkpoints": [ ... ],
    "distance": 220000,
    "duration": 10800,
    "difficulty": "medium",
    "rewards": { ... },
    "statistics": {
      "completionCount": 42,
      "averageRating": 4.5,
      "averageDuration": 11200
    }
  }
}
```

---

### List Popular Routes

**Endpoint:** `GET /routes/popular`

**Query Params:**
```
?limit=10
&region=central
&difficulty=easy
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "routeId": "route_001",
      "name": "ชายฝั่งอันดามัน",
      "origin": "กรุงเทพฯ",
      "destination": "ภูเก็ต",
      "checkpointCount": 5,
      "distance": 850000,
      "duration": 36000,
      "difficulty": "hard",
      "completionCount": 128,
      "rating": 4.7,
      "thumbnail": "https://storage.googleapis.com/..."
    }
  ],
  "pagination": {
    "total": 42,
    "limit": 10,
    "offset": 0,
    "hasMore": true
  }
}
```

---

## Journeys API

### Start Journey

เริ่มต้นการเดินทางตามเส้นทาง

**Endpoint:** `POST /journeys/start`

**Request:**
```json
{
  "routeId": "route_abc123",
  "startLocation": {
    "latitude": 13.7563,
    "longitude": 100.5018
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "journeyId": "journey_xyz789",
    "userId": "user_123",
    "routeId": "route_abc123",
    "status": "in_progress",
    "currentCheckpointIndex": 0,
    "checkpointsCompleted": [],
    "startedAt": "2024-06-23T08:00:00Z",
    "nextCheckpoint": {
      "checkpointId": "cp_001",
      "name": "ร้านกาแฟริมทะเล",
      "location": { ... },
      "distanceFromCurrent": 45000,
      "estimatedArrival": "2024-06-23T09:15:00Z"
    }
  }
}
```

---

### Update Journey Location

อัปเดตตำแหน่งปัจจุบันของผู้ใช้

**Endpoint:** `PATCH /journeys/:journeyId/location`

**Request:**
```json
{
  "location": {
    "latitude": 13.6521,
    "longitude": 100.7890
  },
  "timestamp": "2024-06-23T08:30:00Z"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "journeyId": "journey_xyz789",
    "proximityAlerts": [
      {
        "checkpointId": "cp_001",
        "distance": 150,
        "canUnlock": true,
        "message": "คุณอยู่ใกล้จุดหมายแล้ว!"
      }
    ]
  }
}
```

---

### Complete Checkpoint

ทำภารกิจที่ Checkpoint สำเร็จ

**Endpoint:** `POST /journeys/:journeyId/checkpoints/:checkpointId/complete`

**Request:**
```json
{
  "photo": {
    "base64": "data:image/jpeg;base64,...",
    "metadata": {
      "width": 1920,
      "height": 1080,
      "timestamp": "2024-06-23T09:15:00Z",
      "location": {
        "latitude": 13.3611,
        "longitude": 100.9847
      }
    }
  },
  "arrivedAt": "2024-06-23T09:15:00Z"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "checkpointCompleted": {
      "checkpointId": "cp_001",
      "completedAt": "2024-06-23T09:15:00Z",
      "photo": {
        "url": "https://storage.googleapis.com/...",
        "thumbnailUrl": "https://storage.googleapis.com/..."
      },
      "stamp": {
        "stampId": "stamp_001",
        "name": "ริมทะเล",
        "imageUrl": "https://storage.googleapis.com/...",
        "rarity": "common"
      },
      "rewards": {
        "points": 10,
        "experience": 25
      }
    },
    "nextCheckpoint": {
      "checkpointId": "cp_002",
      "unlocked": true,
      "name": "ตลาดชุมชน",
      "distance": 32000
    },
    "journeyProgress": {
      "checkpointsCompleted": 1,
      "totalCheckpoints": 5,
      "percentComplete": 20
    }
  }
}
```

---

### Complete Journey

จบการเดินทาง (ถึงปลายทาง)

**Endpoint:** `POST /journeys/:journeyId/complete`

**Request:**
```json
{
  "finalLocation": {
    "latitude": 12.9236,
    "longitude": 100.8825
  },
  "completedAt": "2024-06-23T14:30:00Z"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "journeyId": "journey_xyz789",
    "status": "completed",
    "statistics": {
      "totalDistance": 225430,
      "totalDuration": 11800,
      "checkpointsCompleted": 5,
      "photosToken": 12,
      "stampsEarned": 5
    },
    "memoryBookId": "book_456",
    "vouchers": [
      {
        "voucherId": "voucher_001",
        "code": "GT-HH-ABC123",
        "type": "discount",
        "value": 20,
        "merchantName": "ร้านอาหารทะเล",
        "expiresAt": "2024-07-23T23:59:59Z"
      }
    ],
    "achievements": [
      {
        "achievementId": "ach_001",
        "title": "นักผจญภัยมือใหม่",
        "description": "จบเส้นทางแรก"
      }
    ]
  }
}
```

---

### Get Journey Details

**Endpoint:** `GET /journeys/:journeyId`

**Response:**
```json
{
  "success": true,
  "data": {
    "journeyId": "journey_xyz789",
    "userId": "user_123",
    "routeId": "route_abc123",
    "status": "in_progress",
    "startedAt": "2024-06-23T08:00:00Z",
    "currentCheckpointIndex": 2,
    "checkpointsCompleted": ["cp_001", "cp_002"],
    "checkpointsData": [
      {
        "checkpointId": "cp_001",
        "arrivedAt": "2024-06-23T09:15:00Z",
        "photo": { ... },
        "stamp": { ... }
      }
    ],
    "totalDistance": 125430,
    "elapsedTime": 5400
  }
}
```

---

## Checkpoints API

### Get Checkpoint Details

**Endpoint:** `GET /checkpoints/:checkpointId`

**Response:**
```json
{
  "success": true,
  "data": {
    "checkpointId": "cp_001",
    "name": "ร้านกาแฟริมทะเล",
    "description": "ร้านกาแฟเล็กๆ ริมทะเล บรรยากาศสบายๆ",
    "location": {
      "latitude": 13.3611,
      "longitude": 100.9847
    },
    "type": "cafe",
    "photos": [
      "https://storage.googleapis.com/..."
    ],
    "businessInfo": {
      "merchantId": "merchant_001",
      "category": "cafe",
      "openingHours": {
        "monday": "08:00-18:00",
        "tuesday": "08:00-18:00"
      },
      "contactInfo": {
        "phone": "+66-xx-xxx-xxxx"
      }
    },
    "unlockRadius": 50,
    "rewardPoints": 10,
    "photoRequired": true,
    "arEnabled": true,
    "statistics": {
      "visitCount": 342,
      "averageRating": 4.3
    }
  }
}
```

---

### Validate Checkpoint Proximity

ตรวจสอบว่าผู้ใช้อยู่ในระยะที่ unlock checkpoint ได้หรือไม่

**Endpoint:** `POST /checkpoints/:checkpointId/validate-proximity`

**Request:**
```json
{
  "userLocation": {
    "latitude": 13.3615,
    "longitude": 100.9850
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "canUnlock": true,
    "distance": 45.8,
    "withinRadius": true,
    "unlockRadius": 50
  }
}
```

---

## Memory Books API

### Get Memory Book

**Endpoint:** `GET /memory-books/:bookId`

**Response:**
```json
{
  "success": true,
  "data": {
    "bookId": "book_456",
    "userId": "user_123",
    "journeyId": "journey_xyz789",
    "routeName": "ชายฝั่งอันดามัน",
    "origin": "กรุงเทพฯ",
    "destination": "ภูเก็ต",
    "coverPhoto": {
      "url": "https://storage.googleapis.com/...",
      "caption": "สายลมทะเล"
    },
    "photos": [
      {
        "url": "https://storage.googleapis.com/...",
        "checkpointId": "cp_001",
        "checkpointName": "ร้านกาแฟริมทะเล",
        "timestamp": "2024-06-23T09:15:00Z",
        "caption": "กาแฟเช้าริมทะเล"
      }
    ],
    "stamps": [
      {
        "stampId": "stamp_001",
        "name": "ริมทะเล",
        "imageUrl": "https://storage.googleapis.com/...",
        "earnedAt": "2024-06-23T09:15:00Z"
      }
    ],
    "routeMap": {
      "polyline": "encoded_polyline",
      "checkpointMarkers": [ ... ]
    },
    "statistics": {
      "totalDistance": 225430,
      "totalDuration": 11800,
      "checkpointsVisited": 5,
      "photosToken": 12,
      "averageSpeed": 19.1
    },
    "story": "วันนี้เราเริ่มต้นการเดินทางจากกรุงเทพฯ...",
    "achievements": [ ... ],
    "shareCount": 3,
    "isPublic": false,
    "createdAt": "2024-06-23T14:30:00Z"
  }
}
```

---

### List User Memory Books

**Endpoint:** `GET /users/:userId/memory-books`

**Query Params:**
```
?limit=20
&offset=0
&sortBy=createdAt
&order=desc
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "bookId": "book_456",
      "routeName": "ชายฝั่งอันดามัน",
      "coverPhoto": "https://...",
      "destination": "ภูเก็ต",
      "checkpointsVisited": 5,
      "createdAt": "2024-06-23T14:30:00Z"
    }
  ],
  "pagination": { ... }
}
```

---

### Share Memory Book

**Endpoint:** `POST /memory-books/:bookId/share`

**Request:**
```json
{
  "platform": "facebook",
  "isPublic": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "shareUrl": "https://gototravel.app/memory/book_456",
    "shareImage": "https://storage.googleapis.com/...",
    "shareText": "ฉันเพิ่งจบการเดินทางสุดมันส์จาก..."
  }
}
```

---

## Vouchers API

### List User Vouchers

**Endpoint:** `GET /users/:userId/vouchers`

**Query Params:**
```
?status=active
&limit=20
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "voucherId": "voucher_001",
      "code": "GT-HH-ABC123",
      "type": "discount",
      "value": 20,
      "unit": "percent",
      "merchantId": "merchant_001",
      "merchantName": "ร้านอาหารทะเล",
      "merchantLogo": "https://storage.googleapis.com/...",
      "status": "active",
      "expiresAt": "2024-07-23T23:59:59Z",
      "terms": "ใช้ได้เฉพาะเมนูอาหารทะเล มูลค่าขั้นต่ำ 300 บาท"
    }
  ],
  "pagination": { ... }
}
```

---

### Get Voucher Details

**Endpoint:** `GET /vouchers/:voucherId`

**Response:**
```json
{
  "success": true,
  "data": {
    "voucherId": "voucher_001",
    "code": "GT-HH-ABC123",
    "qrCode": "https://api.qrserver.com/v1/create-qr-code/?data=GT-HH-ABC123",
    "type": "discount",
    "value": 20,
    "unit": "percent",
    "merchantId": "merchant_001",
    "merchantName": "ร้านอาหารทะเล",
    "merchantLocation": {
      "latitude": 12.9236,
      "longitude": 100.8825
    },
    "status": "active",
    "issuedAt": "2024-06-23T14:30:00Z",
    "expiresAt": "2024-07-23T23:59:59Z",
    "terms": "...",
    "canRedeem": true
  }
}
```

---

### Redeem Voucher (Merchant)

**Endpoint:** `POST /vouchers/:voucherId/redeem`

**Request:**
```json
{
  "merchantId": "merchant_001",
  "transactionAmount": 500.00,
  "notes": "Used for seafood dinner"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "voucherId": "voucher_001",
    "status": "used",
    "redeemedAt": "2024-06-24T18:30:00Z",
    "redeemedBy": "merchant_001",
    "discountAmount": 100.00,
    "finalAmount": 400.00
  }
}
```

---

## Merchants API

### Get Merchant Profile

**Endpoint:** `GET /merchants/:merchantId`

**Response:**
```json
{
  "success": true,
  "data": {
    "merchantId": "merchant_001",
    "name": "ร้านอาหารทะเล",
    "description": "อาหารทะเลสด ราคาย่อมเยา",
    "category": "restaurant",
    "location": {
      "latitude": 12.9236,
      "longitude": 100.8825
    },
    "address": "123 ถนนชายหาด หัวหิน",
    "photos": [
      "https://storage.googleapis.com/..."
    ],
    "contactInfo": {
      "phone": "+66-xx-xxx-xxxx",
      "email": "info@seafood.com",
      "website": "https://seafood.com"
    },
    "openingHours": {
      "monday": "10:00-22:00",
      "tuesday": "10:00-22:00"
    },
    "vouchersAccepted": true,
    "checkpointIds": ["cp_003"],
    "verified": true,
    "rating": 4.5,
    "reviewCount": 42
  }
}
```

---

### List Nearby Merchants

**Endpoint:** `GET /merchants/nearby`

**Query Params:**
```
?latitude=12.9236
&longitude=100.8825
&radius=5000
&category=restaurant
&acceptsVouchers=true
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "merchantId": "merchant_001",
      "name": "ร้านอาหารทะเล",
      "category": "restaurant",
      "distance": 1250.5,
      "location": { ... },
      "vouchersAccepted": true,
      "rating": 4.5
    }
  ]
}
```

---

## Users API

### Get User Profile

**Endpoint:** `GET /users/:userId`

**Response:**
```json
{
  "success": true,
  "data": {
    "userId": "user_123",
    "profile": {
      "displayName": "สมชาย ใจดี",
      "email": "somchai@example.com",
      "photoURL": "https://lh3.googleusercontent.com/..."
    },
    "mascotCompanion": {
      "species": "panda",
      "name": "น้องแพนด้า",
      "level": 5,
      "personality": "cheerful"
    },
    "statistics": {
      "routesCompleted": 12,
      "totalDistance": 2450000,
      "totalCheckpoints": 58,
      "stampsCollected": 45,
      "vouchersEarned": 24,
      "vouchersUsed": 18
    },
    "achievements": [
      {
        "achievementId": "ach_001",
        "title": "นักผจญภัยมือใหม่",
        "unlockedAt": "2024-06-20T10:00:00Z"
      }
    ],
    "createdAt": "2024-06-15T08:00:00Z",
    "lastActiveAt": "2024-06-23T14:30:00Z"
  }
}
```

---

### Update User Profile

**Endpoint:** `PATCH /users/:userId`

**Request:**
```json
{
  "profile": {
    "displayName": "สมชาย ใจดี Updated"
  },
  "mascotCompanion": {
    "name": "แพนด้าน้อย"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "userId": "user_123",
    "profile": { ... },
    "updatedAt": "2024-06-23T15:00:00Z"
  }
}
```

---

## WebSocket API

### Journey Real-time Updates

**Endpoint:** `wss://api.gototravel.app/ws/journey/:journeyId`

**Authentication:**
```
?token=<firebase-id-token>
```

**Messages from Client:**

```json
// Location update
{
  "type": "location_update",
  "data": {
    "location": {
      "latitude": 13.6521,
      "longitude": 100.7890
    },
    "timestamp": "2024-06-23T08:30:00Z"
  }
}
```

**Messages from Server:**

```json
// Checkpoint proximity alert
{
  "type": "proximity_alert",
  "data": {
    "checkpointId": "cp_001",
    "distance": 150,
    "message": "คุณอยู่ใกล้จุดหมายแล้ว!"
  }
}

// Checkpoint unlocked
{
  "type": "checkpoint_unlocked",
  "data": {
    "checkpointId": "cp_002",
    "name": "ตลาดชุมชน"
  }
}

// Journey completed
{
  "type": "journey_completed",
  "data": {
    "journeyId": "journey_xyz789",
    "memoryBookId": "book_456"
  }
}
```

---

## Error Codes

### HTTP Status Codes

- `200 OK` — Success
- `201 Created` — Resource created
- `400 Bad Request` — Invalid request
- `401 Unauthorized` — Missing or invalid auth token
- `403 Forbidden` — No permission
- `404 Not Found` — Resource not found
- `409 Conflict` — Resource conflict (e.g., journey already started)
- `429 Too Many Requests` — Rate limit exceeded
- `500 Internal Server Error` — Server error
- `503 Service Unavailable` — Service temporarily unavailable

### Custom Error Codes

```json
{
  "success": false,
  "error": {
    "code": "ROUTE_GENERATION_FAILED",
    "message": "ไม่สามารถสร้างเส้นทางได้ในขณะนี้",
    "details": {
      "reason": "No checkpoints found between origin and destination"
    }
  }
}
```

**Common Error Codes:**

- `INVALID_ORIGIN` — Invalid origin coordinates
- `INVALID_DESTINATION` — Invalid destination coordinates
- `ROUTE_NOT_FOUND` — Route ID not found
- `JOURNEY_NOT_FOUND` — Journey ID not found
- `JOURNEY_ALREADY_COMPLETED` — Cannot modify completed journey
- `CHECKPOINT_NOT_UNLOCKED` — Checkpoint is not yet unlocked
- `CHECKPOINT_OUT_OF_RANGE` — User not close enough to checkpoint
- `VOUCHER_EXPIRED` — Voucher has expired
- `VOUCHER_ALREADY_USED` — Voucher already redeemed
- `MERCHANT_NOT_FOUND` — Merchant ID not found
- `INSUFFICIENT_PERMISSIONS` — User lacks required permissions
- `RATE_LIMIT_EXCEEDED` — Too many requests
- `INVALID_TOKEN` — Firebase token invalid or expired

---

## Rate Limiting

**Limits:**
- `/routes/generate`: 10 requests / minute / user
- `/journeys/*`: 100 requests / minute / user
- `/checkpoints/*`: 200 requests / minute / user
- Default: 500 requests / minute / user

**Headers:**
```
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 7
X-RateLimit-Reset: 1687509600
```

---

## Versioning

API ใช้ URL versioning: `/v1/`, `/v2/`

เมื่อมี breaking changes จะสร้าง version ใหม่ และรักษา version เก่าไว้อย่างน้อย 6 เดือน

---

## Changelog

### v1.0 (2026-06-01)
- Initial release

### v2.0 (2026-06-23)
- เปลี่ยนจาก Quest-based เป็น Route-based
- เพิ่ม Routes API
- เพิ่ม Memory Books API
- อัปเดต Journeys API ให้รองรับ checkpoint progression
- เพิ่ม WebSocket real-time updates

---

**Document Version:** 2.0
**Last Updated:** 2026-06-23
**Maintained By:** NSC GO TO TRAVEL Development Team
