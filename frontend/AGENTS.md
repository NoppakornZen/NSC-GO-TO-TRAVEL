# Frontend Development — Agent Instructions

> GO TO TRAVEL Route-Based Adventure Platform
> Version: 2.0
> Last Updated: 2026-06-23

---

## Critical Instructions

### Before Starting ANY Task

1. **Read CLAUDE.md** — Frontend development guide
2. **Read ../GO_TO_TRAVEL_AI_AGENT_MASTER.md** — Product SSOT
3. **Verify Expo SDK 56 docs** at https://docs.expo.dev/versions/v56.0.0/
4. **Check for existing code** — Don't duplicate
5. **Understand the Route-based concept** — Not Quest-based anymore

---

## Core Principles

### 1. Route-Based Adventure (V2.0)

**Remember:** This is NOT a Quest-based app anymore.

✅ **Correct Approach:**
- User selects destination
- Mascot Scout suggests route with checkpoints
- Checkpoints unlock progressively
- Journey creates Memory Book

❌ **Wrong Approach:**
- Pet Scout finds random locations
- Quests that are independent
- Jigsaw puzzles
- Random checkpoint discovery

### 2. TypeScript First

- Never use `any` type
- Define interfaces for all props
- Import shared types from `../shared/types`
- Use strict mode

### 3. Component Hierarchy

```
Screen (business logic, Redux)
  └─> Container Components (data fetching, state)
      └─> Presentational Components (pure UI)
          └─> Basic Components (buttons, inputs)
```

### 4. State Management Rules

**Redux for:**
- User authentication state
- Active journey data
- Route data
- Checkpoint progress
- Memory collection

**Local state for:**
- UI state (modals, loading)
- Form inputs
- Component-specific data

**Never store in Redux:**
- Derived data (calculate on the fly)
- Temporary UI states
- Data that doesn't need to be shared

---

## File Organization

### Creating New Screens

```typescript
// screens/journey/ActiveJourneyScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';

interface ActiveJourneyScreenProps {
  navigation: any; // Replace with proper type
  route: any;
}

export default function ActiveJourneyScreen({ navigation, route }: ActiveJourneyScreenProps) {
  const journey = useSelector((state: RootState) => state.journey.current);
  const dispatch = useDispatch();
  
  // Component logic
  
  return (
    <View style={styles.container}>
      {/* UI */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F4EF',
  },
});
```

### Creating Reusable Components

```typescript
// components/Mascot/MascotAvatar.tsx
import React from 'react';
import { Image, StyleSheet } from 'react-native';

interface MascotAvatarProps {
  species: string;
  size?: number;
  style?: any;
}

export const MascotAvatar: React.FC<MascotAvatarProps> = ({ 
  species, 
  size = 80,
  style 
}) => {
  return (
    <Image
      source={getMascotImage(species)}
      style={[styles.avatar, { width: size, height: size }, style]}
    />
  );
};

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 999,
  },
});
```

### Creating Services

```typescript
// services/api/routes.ts
import { firestore } from '../firebase';
import { Route } from '@/types';

export async function generateRoute(
  origin: GeoPoint,
  destination: GeoPoint
): Promise<Route> {
  try {
    const response = await fetch(`${API_BASE_URL}/routes/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await getAuthToken()}`,
      },
      body: JSON.stringify({ origin, destination }),
    });
    
    if (!response.ok) {
      throw new Error('Route generation failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Generate route error:', error);
    throw error;
  }
}
```

---

## Redux Patterns

### Creating Slices

```typescript
// store/slices/journeySlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Journey, GeoPoint } from '@/types';

interface JourneyState {
  current: Journey | null;
  loading: boolean;
  error: string | null;
}

const initialState: JourneyState = {
  current: null,
  loading: false,
  error: null,
};

const journeySlice = createSlice({
  name: 'journey',
  initialState,
  reducers: {
    setJourney(state, action: PayloadAction<Journey>) {
      state.current = action.payload;
      state.error = null;
    },
    updateLocation(state, action: PayloadAction<GeoPoint>) {
      if (state.current) {
        // Update location logic
      }
    },
    completeCheckpoint(state, action: PayloadAction<string>) {
      if (state.current) {
        state.current.checkpointsCompleted.push(action.payload);
        state.current.currentCheckpointIndex += 1;
      }
    },
    clearJourney(state) {
      state.current = null;
    },
  },
});

export const { setJourney, updateLocation, completeCheckpoint, clearJourney } = journeySlice.actions;
export default journeySlice.reducer;
```

---

## Navigation Setup

### Navigation Structure

```typescript
// navigation/AppNavigator.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="DestinationSelection">
        <Stack.Screen 
          name="DestinationSelection" 
          component={DestinationSelectionScreen} 
          options={{ title: 'เลือกจุดหมาย' }}
        />
        <Stack.Screen 
          name="RoutePreview" 
          component={RoutePreviewScreen} 
          options={{ title: 'เส้นทางผจญภัย' }}
        />
        <Stack.Screen 
          name="ActiveJourney" 
          component={ActiveJourneyScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="CheckpointUnlock" 
          component={CheckpointUnlockScreen} 
          options={{ presentation: 'modal' }}
        />
        <Stack.Screen 
          name="MemoryBook" 
          component={MemoryBookScreen} 
          options={{ title: 'บันทึกการเดินทาง' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

---

## Location & Maps

### Location Tracking

```typescript
// hooks/useLocationTracking.ts
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { useDispatch } from 'react-redux';
import { updateLocation } from '@/store/slices/journeySlice';

export function useLocationTracking() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    let subscription: Location.LocationSubscription;

    async function startTracking() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission denied');
        return;
      }

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        (newLocation) => {
          setLocation(newLocation);
          dispatch(updateLocation({
            latitude: newLocation.coords.latitude,
            longitude: newLocation.coords.longitude,
          }));
        }
      );
    }

    startTracking();

    return () => {
      subscription?.remove();
    };
  }, [dispatch]);

  return { location, error };
}
```

### Map Component

```typescript
// components/Map/RouteMapView.tsx
import React from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Route } from '@/types';

interface RouteMapViewProps {
  route: Route;
  userLocation?: GeoPoint;
}

export const RouteMapView: React.FC<RouteMapViewProps> = ({ route, userLocation }) => {
  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: route.origin.location.latitude,
        longitude: route.origin.location.longitude,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      }}
    >
      {/* Origin marker */}
      <Marker
        coordinate={route.origin.location}
        title={route.origin.name}
        pinColor="green"
      />

      {/* Checkpoint markers */}
      {route.checkpoints.map((checkpoint, index) => (
        <Marker
          key={checkpoint.checkpointId}
          coordinate={checkpoint.location}
          title={checkpoint.name}
          description={checkpoint.description}
          pinColor={index === 0 ? 'blue' : 'gray'}
        />
      ))}

      {/* Destination marker */}
      <Marker
        coordinate={route.destination.location}
        title={route.destination.name}
        pinColor="red"
      />

      {/* Route polyline */}
      <Polyline
        coordinates={decodePolyline(route.polyline)}
        strokeColor="#C4612F"
        strokeWidth={3}
      />

      {/* User location */}
      {userLocation && (
        <Marker
          coordinate={userLocation}
          title="คุณอยู่ที่นี่"
        />
      )}
    </MapView>
  );
};
```

---

## Styling Guide

### Design System

```typescript
// constants/theme.ts
export const COLORS = {
  // Background
  background: '#F7F4EF',
  surface: '#FBF9F5',
  surfaceAlt: '#FFFFFF',
  
  // Borders
  border: '#E7E1D7',
  
  // Text
  text: '#1F2421',
  textMuted: '#5C635D',
  
  // Primary (Terracotta)
  primary: '#C4612F',
  primaryHover: '#A94E22',
  primaryTint: '#F2E3D6',
  
  // Functional
  success: '#4CAF50',
  error: '#F44336',
  warning: '#FF9800',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const TYPOGRAPHY = {
  heading1: {
    fontFamily: 'Fraunces', // Display serif
    fontSize: 32,
    fontWeight: '400',
    letterSpacing: -1,
  },
  heading2: {
    fontFamily: 'Fraunces',
    fontSize: 24,
    fontWeight: '400',
    letterSpacing: -0.5,
  },
  body: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '300',
  },
  bodyMedium: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '500',
  },
};
```

### Applying Styles

```typescript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.md,
  },
  title: {
    ...TYPOGRAPHY.heading1,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: 999,
  },
  buttonText: {
    ...TYPOGRAPHY.bodyMedium,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
```

---

## Error Handling

```typescript
// utils/errorHandler.ts
import { Alert } from 'react-native';

export function handleApiError(error: any) {
  console.error('API Error:', error);
  
  let message = 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง';
  
  if (error.response) {
    // Server responded with error
    switch (error.response.status) {
      case 401:
        message = 'กรุณาเข้าสู่ระบบใหม่';
        break;
      case 404:
        message = 'ไม่พบข้อมูล';
        break;
      case 500:
        message = 'เซิร์ฟเวอร์ขัดข้อง';
        break;
    }
  } else if (error.request) {
    // No response received
    message = 'ไม่สามารถเชื่อมต่อได้ ตรวจสอบอินเทอร์เน็ต';
  }
  
  Alert.alert('ขออภัย', message);
}
```

---

## Testing Patterns

```typescript
// __tests__/utils/distance.test.ts
import { calculateDistance } from '@/utils/distance';

describe('calculateDistance', () => {
  it('calculates distance correctly', () => {
    const point1 = { latitude: 13.7563, longitude: 100.5018 };
    const point2 = { latitude: 12.9236, longitude: 100.8825 };
    
    const distance = calculateDistance(point1, point2);
    
    expect(distance).toBeGreaterThan(100000); // > 100km
    expect(distance).toBeLessThan(110000);    // < 110km
  });
});
```

---

## Common Tasks

### Task: Add New Screen

1. Create screen file in `src/screens/[category]/`
2. Add to navigation in `navigation/AppNavigator.tsx`
3. Create Redux slice if needed
4. Add types to `src/types/`
5. Test navigation flow

### Task: Add New API Endpoint

1. Add function to `src/services/api/`
2. Add types for request/response
3. Handle errors properly
4. Update Redux slice if needed

### Task: Add New Component

1. Create in `src/components/[category]/`
2. Make it reusable with props
3. Use TypeScript interfaces
4. Export from index file
5. Document props with comments

---

## MVP Demo Checklist

### Screens to Build

- [x] Destination Selection
- [ ] Route Preview (with Mascot Scout)
- [ ] Active Journey (with simulated navigation)
- [ ] Checkpoint Unlock
- [ ] AR Photo Capture (can use mock)
- [ ] Memory Book
- [ ] Voucher Display

### Components to Build

- [ ] MascotAvatar
- [ ] MascotDialogue
- [ ] RouteMapView
- [ ] CheckpointMarker
- [ ] StampCard
- [ ] MemoryBookGallery

### State Management

- [ ] authSlice
- [ ] routeSlice
- [ ] journeySlice
- [ ] checkpointSlice
- [ ] memorySlice

---

## Don'ts ❌

1. ❌ Don't use Pet Scout — use Mascot Scout
2. ❌ Don't implement Quest system — use Checkpoint system
3. ❌ Don't use Jigsaw collection — use Memory collection
4. ❌ Don't hardcode API URLs — use environment variables
5. ❌ Don't skip TypeScript types
6. ❌ Don't call Firebase directly from components
7. ❌ Don't forget permission checks for Location/Camera
8. ❌ Don't test AR in simulator (won't work)

---

## Do's ✅

1. ✅ Read CLAUDE.md before every task
2. ✅ Check Expo SDK 56 docs for API changes
3. ✅ Use TypeScript strictly
4. ✅ Follow component hierarchy
5. ✅ Use Redux for shared state
6. ✅ Use services layer for API calls
7. ✅ Handle errors gracefully
8. ✅ Test on physical device for AR/GPS features

---

**Last Updated:** 2026-06-23
**For:** Frontend Development Agents
