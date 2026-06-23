# GO TO TRAVEL Frontend — Claude Development Guide

> Route-Based Tourism Adventure Platform
> Version: 2.0
> Updated: 2026-06-23

---

## Project Overview

GO TO TRAVEL เป็น **Route-Based Adventure Platform** สำหรับนักท่องเที่ยว Gen Y/Z ที่เปลี่ยนการเดินทางให้กลายเป็นการผจญภัย

**Core Philosophy:** "The journey is the adventure, not just the destination."

---

## Tech Stack

- **Framework:** React Native with Expo SDK 56
- **Language:** TypeScript
- **State Management:** Redux Toolkit
- **Navigation:** React Navigation 6
- **Maps:** react-native-maps
- **Location:** expo-location
- **Camera/AR:** expo-camera, expo-ar
- **Backend:** Firebase (Firestore, Auth, Storage, Functions)

---

## Important Context

### Read These Files First

1. **Product Vision:**
   - `../GO_TO_TRAVEL_AI_AGENT_MASTER.md` — SSOT for entire project
   - `../Ref/Prompt/GO TO TRAVEL - Master Product Prompt.pdf` — Product requirements
   - `../Ref/Prompt/StoryBoard NSC GO TO TRAVEL.png` — Visual flow

2. **Architecture:**
   - `../docs/ARCHITECTURE.md` — System design
   - `../docs/API_SPECIFICATION.md` — Backend API contracts
   - `../docs/DATABASE_SCHEMA.md` — Database structure

3. **Frontend Specifics:**
   - `AGENTS.md` — Agent instructions for this codebase
   - `package.json` — Dependencies

---

## Key Concepts

### Route-Based vs Quest-Based (V2.0 Change)

**Old (V1.0):**
- Pet Scout หาสถานที่แยกกัน
- Quest system แบบ standalone
- Jigsaw puzzle collection

**New (V2.0):**
- **Mascot Scout เสนอเส้นทาง** (route ที่เชื่อม checkpoints)
- **Checkpoint System** — Progressive unlock ตามลำดับ
- **Memory Collection** — Photos + Stamps + Stories

### Core User Flow

```
1. Select Destination → 2. Mascot Scout Route → 3. Start Journey
→ 4. Unlock Checkpoint 1 → 5. Complete Challenge (AR Photo)
→ 6. Get Stamp → 7. Unlock Checkpoint 2 → 8. Repeat
→ 9. Reach Destination → 10. Memory Book → 11. Get Vouchers
```

---

## Project Structure

```
frontend/
├── src/
│   ├── screens/           # UI Screens
│   │   ├── auth/
│   │   ├── destination/   # Destination selection
│   │   ├── route/         # Route preview & scout
│   │   ├── journey/       # Active journey & navigation
│   │   ├── checkpoint/    # Checkpoint unlock & AR
│   │   ├── memory/        # Memory Book
│   │   └── profile/
│   ├── components/        # Reusable components
│   │   ├── Mascot/        # Mascot character components
│   │   ├── Map/           # Map components
│   │   ├── AR/            # AR components
│   │   └── common/
│   ├── services/          # API & External services
│   │   ├── api/           # Firebase API calls
│   │   ├── location/      # GPS & Geolocation
│   │   ├── camera/        # Camera & AR
│   │   └── maps/          # Google Maps integration
│   ├── store/             # Redux store
│   │   ├── slices/
│   │   │   ├── authSlice.ts
│   │   │   ├── routeSlice.ts
│   │   │   ├── journeySlice.ts
│   │   │   ├── checkpointSlice.ts
│   │   │   └── memorySlice.ts
│   │   └── store.ts
│   ├── navigation/        # Navigation setup
│   ├── types/             # TypeScript types
│   ├── utils/             # Utility functions
│   ├── hooks/             # Custom hooks
│   ├── constants/         # Constants & config
│   └── assets/            # Images, fonts
├── app.json
├── package.json
└── tsconfig.json
```

---

## Development Rules

### 1. TypeScript Types

Always define types. Import from `../shared/types` when available.

```typescript
// Good
interface RoutePreviewProps {
  route: Route;
  onStart: () => void;
}

// Bad
function RoutePreview(props: any) { ... }
```

### 2. State Management

Use Redux Toolkit for global state. Local state for component-specific data.

```typescript
// Global state (Redux)
const journey = useSelector((state: RootState) => state.journey.current);
const dispatch = useDispatch();
dispatch(updateJourneyLocation({ location }));

// Local state (useState)
const [isLoading, setIsLoading] = useState(false);
```

### 3. API Calls

Always use services layer. Never call Firebase directly from components.

```typescript
// Good
import { startJourney } from '@/services/api/journeys';
const journey = await startJourney(routeId);

// Bad
import { firestore } from '@/services/firebase';
const doc = await firestore.collection('journeys').add({ ... });
```

### 4. Error Handling

Handle errors gracefully with user feedback.

```typescript
try {
  await completeCheckpoint(checkpointId, photo);
  Alert.alert('สำเร็จ!', 'คุณได้รับตราประทับแล้ว');
} catch (error) {
  Alert.alert('ขออภัย', 'ไม่สามารถบันทึกได้ กรุณาลองใหม่');
  console.error('Checkpoint completion error:', error);
}
```

### 5. Location Permissions

Always check permissions before accessing location.

```typescript
import * as Location from 'expo-location';

const { status } = await Location.requestForegroundPermissionsAsync();
if (status !== 'granted') {
  Alert.alert('ต้องการสิทธิ์เข้าถึงตำแหน่ง', 'แอปต้องการตำแหน่งเพื่อนำทาง');
  return;
}
```

### 6. Performance

- Use `React.memo` for expensive components
- Lazy load screens with `React.lazy`
- Optimize images (compress, use appropriate sizes)
- Cache data when appropriate

---

## Key Features Implementation

### 1. Destination Selection

**Screen:** `src/screens/destination/DestinationSelectionScreen.tsx`

```typescript
// Show popular destinations
// Let user search/select
// Pass to Route Engine for route generation
```

### 2. Mascot Scout

**Component:** `src/components/Mascot/MascotScout.tsx`

```typescript
// Animated mascot character
// Dialogue system
// Present route with comparison to fast route
// User accepts/rejects route
```

### 3. Route Preview

**Screen:** `src/screens/route/RoutePreviewScreen.tsx`

```typescript
// Display route on map
// Show checkpoint markers (locked/unlocked)
// Show stats (distance, time, rewards)
// Start journey button
```

### 4. Active Journey

**Screen:** `src/screens/journey/ActiveJourneyScreen.tsx`

```typescript
// Real-time GPS tracking
// Navigation to next checkpoint
// Proximity detection
// Progress indicator
```

### 5. Checkpoint Unlock

**Screen:** `src/screens/checkpoint/CheckpointUnlockScreen.tsx`

```typescript
// Unlock animation
// Checkpoint info display
// Challenge: Take AR photo
// Stamp collection
// Unlock next checkpoint
```

### 6. AR Photo Capture

**Component:** `src/components/AR/ARPhotoCapture.tsx`

```typescript
// Initialize AR session
// Spawn mascot at checkpoint
// Capture photo with mascot
// Save to Memory
```

### 7. Memory Book

**Screen:** `src/screens/memory/MemoryBookScreen.tsx`

```typescript
// Display journey summary
// Photo gallery
// Stamp collection
// Route map visualization
// Statistics
// Share button
```

---

## Expo SDK 56 Important Changes

### Always check docs at:
https://docs.expo.dev/versions/v56.0.0/

### Key Changes from Previous Versions

1. **expo-location:**
   - New permission API
   - Background location requires additional config

2. **expo-camera:**
   - New Camera API
   - Better AR support

3. **expo-router:**
   - Available but we use React Navigation
   - Don't mix navigation libraries

4. **expo-updates:**
   - OTA updates enabled by default
   - Configure in app.json

---

## Common Patterns

### API Request Pattern

```typescript
const [data, setData] = useState<Route | null>(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  async function fetchRoute() {
    setLoading(true);
    setError(null);
    try {
      const route = await routeService.getRoute(routeId);
      setData(route);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  fetchRoute();
}, [routeId]);
```

### Location Tracking Pattern

```typescript
useEffect(() => {
  let subscription: Location.LocationSubscription;
  
  async function startTracking() {
    subscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        distanceInterval: 10, // Update every 10 meters
      },
      (location) => {
        dispatch(updateJourneyLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }));
      }
    );
  }
  
  startTracking();
  
  return () => {
    subscription?.remove();
  };
}, [dispatch]);
```

### Geofence Detection Pattern

```typescript
function checkCheckpointProximity(
  userLocation: GeoPoint,
  checkpoint: Checkpoint
): boolean {
  const distance = calculateDistance(
    userLocation,
    checkpoint.location
  );
  return distance <= checkpoint.unlockRadius;
}
```

---

## Testing

### MVP Testing Strategy (For Demo)

- **Manual Testing:** Primary method for demo
- **Unit Tests:** Critical utils (distance calculation, geofence)
- **Integration Tests:** Can skip for demo
- **E2E Tests:** Can skip for demo

### Test Critical Functions

```typescript
// utils/distance.test.ts
import { calculateDistance } from './distance';

describe('calculateDistance', () => {
  it('should calculate distance between two points', () => {
    const pointA = { latitude: 13.7563, longitude: 100.5018 };
    const pointB = { latitude: 12.9236, longitude: 100.8825 };
    const distance = calculateDistance(pointA, pointB);
    expect(distance).toBeCloseTo(101500, -2); // ~101.5 km
  });
});
```

---

## Debugging

### Common Issues

1. **Location not updating:**
   - Check permissions
   - Check background location config
   - Check Location.Accuracy setting

2. **AR not working:**
   - Check device compatibility
   - Check camera permissions
   - Test on physical device (AR doesn't work in simulator)

3. **Firebase errors:**
   - Check network connection
   - Check Firebase config
   - Check Security Rules

4. **Map not rendering:**
   - Check Google Maps API key
   - Check API key restrictions
   - Enable required APIs (Maps SDK, Places API)

### Debug Tools

```typescript
// Enable debug logging
if (__DEV__) {
  console.log('User location:', location);
  console.log('Checkpoint distance:', distance);
}
```

---

## MVP Priorities (For NSC Demo)

### Must Have ✅
1. Destination Selection UI
2. Mascot Scout Animation
3. Route Preview with Map
4. Simulated Navigation (no real GPS needed)
5. Checkpoint Unlock Animation
6. AR Photo (can use image overlay if AR too complex)
7. Stamp Collection Display
8. Memory Book

### Nice to Have 🟡
- Real GPS tracking
- Real AR rendering
- Social sharing
- Animations polish

### Can Skip ❌
- Authentication (use mock user)
- Backend API (use local mock data)
- Multiple routes
- Merchant app integration

---

## Mock Data for Demo

```typescript
// mockData.ts
export const MOCK_ROUTE: Route = {
  routeId: 'route_demo',
  name: 'ชายฝั่งอันดามัน',
  origin: {
    location: { latitude: 13.7563, longitude: 100.5018 },
    name: 'กรุงเทพฯ'
  },
  destination: {
    location: { latitude: 12.9236, longitude: 100.8825 },
    name: 'หัวหิน'
  },
  checkpoints: [
    {
      checkpointId: 'cp_001',
      name: 'ร้านกาแฟริมทะเล',
      location: { latitude: 13.3611, longitude: 100.9847 },
      type: 'cafe',
      unlockRadius: 50,
      rewardPoints: 10
    },
    // ... more checkpoints
  ],
  distance: 220000,
  duration: 10800,
  difficulty: 'medium'
};
```

---

## Deployment

### Development
```bash
npx expo start
```

### Build (iOS)
```bash
eas build --platform ios --profile preview
```

### Build (Android)
```bash
eas build --platform android --profile preview
```

### Publish Update (OTA)
```bash
eas update --branch preview --message "Update for demo"
```

---

## Resources

- [Expo Docs v56](https://docs.expo.dev/versions/v56.0.0/)
- [React Navigation](https://reactnavigation.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Firebase Docs](https://firebase.google.com/docs)
- [Google Maps Platform](https://developers.google.com/maps)

---

## Questions?

Read these in order:
1. `GO_TO_TRAVEL_AI_AGENT_MASTER.md` — Overall project vision
2. `docs/ARCHITECTURE.md` — System design
3. `docs/API_SPECIFICATION.md` — Backend contracts
4. `AGENTS.md` — Specific agent instructions

---

**Updated:** 2026-06-23
**For:** NSC GO TO TRAVEL Frontend Development
