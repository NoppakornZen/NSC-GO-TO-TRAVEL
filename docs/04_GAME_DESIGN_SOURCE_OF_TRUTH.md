# 04_GAME_DESIGN_SOURCE_OF_TRUTH.md

> GO TO TRAVEL — Route-Based Adventure Game Design
> Version: 2.0
> Last Updated: 2026-06-23

---

## Core Game Loop

```
Select Destination → Scout Route → Start Journey → Unlock Checkpoint 
→ Complete Challenge → Get Reward → Next Checkpoint → Repeat
→ Reach Destination → Memory Book → Share → Return
```

---

## Game Pillars

### 1. Discovery
**Mechanic:** Progressive checkpoint unlock
**Emotion:** Curiosity and wonder
**Reward:** New places revealed

### 2. Collection
**Mechanic:** Stamps, photos, achievements
**Emotion:** Accomplishment
**Reward:** Memory Book completion

### 3. Progression
**Mechanic:** Mascot leveling, route completion
**Emotion:** Growth and mastery
**Reward:** New features unlock

### 4. Social
**Mechanic:** Memory Book sharing, leaderboards
**Emotion:** Pride and belonging
**Reward:** Recognition

---

## Mascot Scout System

### Mascot Species
- 🐼 **Panda** — Cheerful, foodie
- 🐱 **Cat** — Curious, adventurous
- 🐶 **Dog** — Loyal, energetic

### Personality Traits
- **Cheerful:** Positive dialogue, encouraging
- **Adventurous:** Bold suggestions, challenges
- **Calm:** Relaxing pace, peaceful routes

### Leveling System
```
Level 1-5:   Beginner Scout
Level 6-10:  Explorer
Level 11-15: Adventurer
Level 16-20: Master Scout
Level 21+:   Legend
```

**XP Sources:**
- Complete checkpoint: +25 XP
- Complete route: +150 XP
- First visit to new area: +50 XP
- Share Memory Book: +30 XP

---

## Route System

### Route Difficulty

**Easy (Green)**
- Distance: < 50 km
- Checkpoints: 3
- Time: 1-2 hours
- Detour: < 3 km

**Medium (Yellow)**
- Distance: 50-150 km
- Checkpoints: 4-5
- Time: 2-4 hours
- Detour: < 5 km

**Hard (Red)**
- Distance: > 150 km
- Checkpoints: 6-7
- Time: 4+ hours
- Detour: < 10 km

### Route Types
- 🍜 **Food Tour** — Focused on local cuisine
- 🏛️ **Culture Route** — Temples, museums, heritage
- 🌳 **Nature Trail** — Beaches, mountains, parks
- 📸 **Instagram Route** — Photo-worthy spots
- 🎭 **Hidden Gems** — Off-the-beaten-path

---

## Checkpoint System

### Checkpoint Types

**Discovery Checkpoints**
- New, undiscovered places
- Bonus XP for first visit
- Special stamps

**Community Checkpoints**
- Local businesses
- Voucher rewards
- Support local economy

**Photo Checkpoints**
- Scenic viewpoints
- Instagram-worthy
- Bonus for creative photos

**Cultural Checkpoints**
- Temples, museums
- Learn local history
- Cultural stamps

---

## Challenge System

### Challenge Types

**1. Photo Challenge**
- Take AR photo with Mascot
- Required for all checkpoints
- Rewards: Stamp + Memory

**2. Check-in Challenge**
- GPS verification
- Automatic unlock
- Rewards: XP

**3. Time Challenge (Optional)**
- Complete route within time
- Bonus rewards
- Leaderboard entry

**4. Discovery Challenge (Optional)**
- Find hidden easter eggs
- Bonus checkpoints
- Rare stamps

---

## Reward System

### Immediate Rewards
- ✅ Stamp (every checkpoint)
- 📸 Photo memory
- ⭐ XP points
- 🎁 Progress towards voucher

### Route Completion Rewards
- 🎫 E-Voucher pack (3-5 vouchers)
- 📖 Memory Book
- 🏆 Achievement badge
- ⬆️ Mascot XP boost

### Long-term Rewards
- 🎖️ Achievements (collect 10 routes, etc.)
- 🌟 Rare stamps (region completion)
- 👑 Leaderboard ranks
- 🔓 New mascot customizations

---

## Stamp Collection

### Rarity System
- **Common** (70%) — Gray border
- **Rare** (20%) — Blue border
- **Epic** (8%) — Purple border
- **Legendary** (2%) — Gold border

### Stamp Categories
- 📍 Location stamps (checkpoint-based)
- 🏆 Achievement stamps
- 🎉 Event stamps (special occasions)
- ⭐ Master stamps (complete all in region)

### Collection Tracker
```
Pattaya Region: 12/20 stamps
  - Common: 8/12
  - Rare: 3/5
  - Epic: 1/2
  - Legendary: 0/1
```

---

## Memory Book

### Auto-Generated Sections

**1. Cover Page**
- Route name
- Date
- Cover photo (best photo)
- Mascot companion

**2. Journey Map**
- Route visualization
- Checkpoint markers
- Distance traveled

**3. Photo Gallery**
- All photos taken
- Organized by checkpoint
- Captions and timestamps

**4. Stamp Collection**
- All stamps earned
- Rarity highlighted
- Progress bars

**5. Statistics**
- Total distance
- Total time
- Checkpoints visited
- Mascot level gained

**6. Story**
- Auto-generated narrative
- Highlights key moments
- Shareable format

---

## Progression Systems

### User Level
```
Level 1: Traveler
Level 5: Explorer
Level 10: Adventurer
Level 15: Voyager
Level 20: Pathfinder
Level 25: Trailblazer
Level 30: Legend
```

### Achievements
- **Route Master** — Complete 10 routes
- **Distance King** — Travel 1000 km
- **Checkpoint Hunter** — Visit 100 checkpoints
- **Community Hero** — Redeem 50 vouchers
- **Photo Pro** — Take 500 photos
- **Region Explorer** — Complete all routes in region
- **Stamp Collector** — Collect 100 stamps
- **Early Bird** — Start journey before 8 AM
- **Night Owl** — Complete route after sunset

---

## Leaderboard System

### Weekly Leaderboards
- Most routes completed
- Most distance traveled
- Most checkpoints visited
- Most vouchers earned

### All-time Leaderboards
- Total routes
- Total XP
- Total achievements
- Community impact score

### Rewards
- Top 10: Exclusive stamp
- Top 3: Featured in app
- #1: Legendary badge

---

## Onboarding Flow

### First-time User Experience

**Step 1: Welcome**
- Animated intro
- Value proposition
- Permission requests (Location, Camera)

**Step 2: Choose Mascot**
- Select species
- Name your companion
- Personality selection

**Step 3: Tutorial Route**
- Guided mini-route (1 checkpoint)
- Learn mechanics
- Get first stamp

**Step 4: First Real Route**
- Select nearby destination
- Complete full route
- Earn first rewards

---

## Economy & Balance

### Progression Speed
- Route per day: 1-2 average
- XP to level: Exponential curve
- Stamps per route: 3-5 guaranteed

### Reward Balance
- Voucher value: 50-500 THB
- Vouchers per route: 3-5
- Total route value: 300-1000 THB

### Engagement Target
- Session time: 20-60 minutes
- Sessions per week: 2-4
- Routes per month: 4-8

---

## Social Features

### Sharing
- Share Memory Book to Facebook/Instagram
- Share specific photos
- Challenge friends to route
- Compare progress

### Future Multiplayer (P2)
- Co-op journey (2-4 players)
- Shared Memory Book
- Team challenges
- Guild system

---

## Monetization Design

### Non-Intrusive
- No pay-to-win
- No energy systems
- No loot boxes
- No ads (free tier)

### Premium Value
- More routes per month
- Exclusive stamps
- Priority support
- Ad-free

---

## Retention Mechanics

### Daily
- Daily login rewards
- New routes rotation
- Time-limited events

### Weekly
- Leaderboard reset
- Weekly challenges
- Featured routes

### Monthly
- Season pass (future)
- Monthly events
- Region rotations

---

## Analytics & Metrics

### Core Metrics
- Route completion rate: Target >60%
- Average checkpoints per route: Target >4
- Photo capture rate: Target >90%
- Voucher redemption: Target >40%
- Share rate: Target >20%

### Drop-off Points
- Monitor where users abandon routes
- Optimize checkpoint spacing
- Improve rewards

---

## Game Feel & Polish

### Animations
- Checkpoint unlock: Satisfying reveal
- Stamp collection: Celebratory
- Memory Book generation: Magical
- Mascot reactions: Lively

### Sound Design
- Checkpoint unlock: Success chime
- Stamp collect: Satisfying click
- Route complete: Victory fanfare
- Background: Ambient travel sounds

### Haptics
- Checkpoint proximity: Gentle pulse
- Checkpoint unlock: Strong tap
- Photo capture: Camera click
- Achievement: Victory vibration

---

**Game design principles: Reward exploration, celebrate journey, support community.**

---

**Last Updated:** 2026-06-23
**Maintained By:** NSC GO TO TRAVEL Development Team
