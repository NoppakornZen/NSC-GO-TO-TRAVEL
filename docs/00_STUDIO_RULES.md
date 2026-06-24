# 00_STUDIO_RULES.md

> GO TO TRAVEL Development Studio Rules
> Version: 2.0
> Last Updated: 2026-06-23

---

## Purpose

กฎเกณฑ์และหลักการสำหรับทีมพัฒนา AI Agents และนักพัฒนาทุกคนที่ทำงานกับ GO TO TRAVEL

---

## Core Rules

### Rule 0: SSOT (Single Source of Truth)

**GO_TO_TRAVEL_AI_AGENT_MASTER.md คือ SSOT เดียวของโปรเจค**

- อ่านทุกครั้งก่อนเริ่มงาน
- ถ้าเอกสารอื่นขัดแย้ง → ยึด SSOT
- ถ้า SSOT ไม่ชัดเจน → ถามก่อนตีความเอง

### Rule 1: No Feature Creep

**ห้ามเพิ่ม Feature ที่ไม่มีในเอกสาร**

❌ **ห้าม:**
- "น่าจะมี Feature นี้ดีนะ"
- "ผมคิดว่าควรมี..."
- "แอปอื่นมี เราก็ควรมี"

✅ **ถูกต้อง:**
- ตรวจสอบว่า Feature อยู่ใน P0/P1/P2
- ถ้าไม่มี → เสนอเป็น Proposal แยก
- รอ Approval ก่อนทำ

### Rule 2: Check for Duplicates

**ตรวจสอบก่อนสร้างใหม่ทุกครั้ง**

ก่อนสร้าง:
- ✅ Function → grep ชื่อใน codebase
- ✅ Component → ดู components/
- ✅ API endpoint → ดู API_SPECIFICATION.md
- ✅ Database collection → ดู DATABASE_SCHEMA.md

### Rule 3: No Hardcode

**ห้าม Hardcode ทุกกรณี**

❌ **ห้าม:**
```typescript
const API_URL = "https://api.gototravel.app";
const UNLOCK_RADIUS = 50;
const MAX_CHECKPOINTS = 5;
```

✅ **ถูกต้อง:**
```typescript
const API_URL = process.env.API_URL;
const UNLOCK_RADIUS = CONFIG.checkpoint.unlockRadius;
const MAX_CHECKPOINTS = CONFIG.route.maxCheckpoints;
```

### Rule 4: Architecture Compliance

**ยึดตาม ARCHITECTURE.md เสมอ**

- ✅ ใช้ Services layer สำหรับ API calls
- ✅ ใช้ Redux สำหรับ global state
- ✅ ใช้ TypeScript interfaces
- ✅ ตั้งชื่อตาม naming convention

### Rule 5: V2.0 Route-Based Only

**ห้ามใช้ระบบเก่า (V1.0)**

❌ **ห้ามใช้:**
- Pet Scout
- Quest System
- Jigsaw Collection

✅ **ใช้:**
- Mascot Scout
- Checkpoint System
- Memory Collection

### Rule 6: Test Before Commit

**ทดสอบก่อน commit ทุกครั้ง**

- ✅ Build ผ่าน
- ✅ TypeScript compile ผ่าน
- ✅ ไม่มี console errors
- ✅ Feature ทำงานได้

### Rule 7: Document Changes

**เขียน Documentation พร้อมกับ Code**

เมื่อเปลี่ยนแปลง:
- ✅ Update API_SPECIFICATION.md (ถ้าแก้ API)
- ✅ Update DATABASE_SCHEMA.md (ถ้าแก้ DB)
- ✅ Update ARCHITECTURE.md (ถ้าแก้ระบบ)
- ✅ เขียน code comments

### Rule 8: Security First

**ตรวจสอบ Security ทุก Feature**

- ✅ Validate input ทุก API
- ✅ Check permissions
- ✅ Sanitize user data
- ✅ Use Firestore Security Rules
- ✅ No secrets in code

### Rule 9: Mobile-First Design

**คิดเป็น Mobile ก่อนเสมอ**

- ✅ Responsive design
- ✅ Touch-friendly UI
- ✅ Optimize images
- ✅ Consider offline mode

### Rule 10: Community Impact Focus

**ทุก Feature ต้องตอบโจทย์อย่างน้อย 1 ข้อ:**

1. Discovery — ช่วยค้นพบสถานที่ใหม่
2. Exploration — สร้างประสบการณ์การเดินทาง
3. Community Economy — สร้างรายได้ให้ชุมชน
4. Retention — ทำให้ผู้ใช้กลับมาใช้ซ้ำ
5. Social Sharing — ส่งเสริมการแชร์

---

## Development Workflow

### 1. Before Starting

```
1. อ่าน GO_TO_TRAVEL_AI_AGENT_MASTER.md
2. อ่าน Task/Issue description
3. ระบุ Module ที่เกี่ยวข้อง
4. ตรวจสอบ Dependency
5. ตรวจสอบว่ามีของเดิมหรือไม่
```

### 2. During Development

```
1. สร้าง branch ใหม่
2. เขียน code ตาม architecture
3. เขียน tests
4. Update documentation
5. Self-review code
```

### 3. Before Commit

```
1. Run linter
2. Run tests
3. Build project
4. Manual test feature
5. Check no hardcoded values
```

### 4. Commit Message Format

```
<type>(<scope>): <subject>

<body>

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>
```

**Types:**
- `feat` — new feature
- `fix` — bug fix
- `docs` — documentation
- `refactor` — code refactor
- `test` — add tests
- `chore` — maintenance

**Example:**
```
feat(checkpoint): add progressive unlock logic

Implement checkpoint unlock system that progressively
reveals next checkpoint after current one is completed.

- Add geofence detection
- Add unlock animation
- Update checkpoint state in Redux

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>
```

### 5. Pull Request

```
1. Create PR with descriptive title
2. Reference issue number
3. Describe changes
4. Add screenshots (for UI changes)
5. List breaking changes
6. Request review
```

---

## Code Review Checklist

### For Reviewer

- [ ] ตรงตาม requirement
- [ ] Follow architecture
- [ ] No duplicate code
- [ ] No hardcode
- [ ] TypeScript types ครบ
- [ ] Error handling ถูกต้อง
- [ ] Tests ครบ
- [ ] Documentation updated
- [ ] No security issues
- [ ] Performance OK

---

## Definition of Done

Feature ถือว่าเสร็จเมื่อ:

- [x] ผ่าน Build
- [x] ผ่าน Tests
- [x] ไม่มี Duplicate Logic
- [x] ไม่มี Hardcode
- [x] เชื่อม Database ได้ (หรือ Mock Data)
- [x] มี Error Handling
- [x] มี Documentation
- [x] สอดคล้องกับ Route-based Concept
- [x] ไม่ทำลาย User Flow
- [x] Code review ผ่าน
- [x] Deployed/Merged

---

## Common Mistakes to Avoid

### ❌ Don't

1. สร้าง Feature นอก spec
2. Hardcode values
3. Skip error handling
4. Commit without testing
5. Mix V1.0 and V2.0 concepts
6. Call Firebase directly from components
7. Store secrets in code
8. Ignore TypeScript errors
9. Skip documentation
10. Create duplicate functions

### ✅ Do

1. Read SSOT first
2. Use constants/config
3. Handle all error cases
4. Test before commit
5. Use V2.0 concepts only
6. Use services layer
7. Use environment variables
8. Fix TypeScript errors
9. Update docs
10. Check for existing code

---

## Emergency Procedures

### Production Issue

1. Alert team immediately
2. Create hotfix branch
3. Fix and test
4. Deploy ASAP
5. Post-mortem after

### Security Vulnerability

1. **DO NOT** push to public repo
2. Alert team immediately
3. Create private fix
4. Deploy to production
5. Update all environments
6. Document incident

### Data Loss Risk

1. Stop deployment immediately
2. Backup current data
3. Verify backup
4. Test migration in staging
5. Proceed only when safe

---

## Tools & Resources

### Required Tools

- **Editor:** VS Code (recommended)
- **Node.js:** v20+
- **Package Manager:** npm
- **Git:** latest version
- **Firebase CLI:** v13+

### Recommended Extensions

- ESLint
- Prettier
- TypeScript
- GitLens
- Firebase Explorer

### Documentation

- [ARCHITECTURE.md](docs/ARCHITECTURE.md)
- [API_SPECIFICATION.md](docs/API_SPECIFICATION.md)
- [DATABASE_SCHEMA.md](docs/DATABASE_SCHEMA.md)
- [Expo Docs](https://docs.expo.dev/versions/v56.0.0/)
- [Firebase Docs](https://firebase.google.com/docs)

---

## Communication

### Daily Standup

- What did you do yesterday?
- What will you do today?
- Any blockers?

### Code Questions

1. Check documentation first
2. Search existing issues
3. Ask in team chat
4. Create issue if needed

### Feature Requests

1. Create GitHub Issue
2. Use Feature Request template
3. Explain use case
4. Wait for approval
5. Only then start coding

---

## License & Attribution

- **Project:** Proprietary - NSC GO TO TRAVEL
- **AI Attribution:** Co-Authored-By: Claude Opus 4.8 (1M context)
- **Contributors:** See GitHub contributors

---

## Version History

- **2.0** (2026-06-23) — Route-Based Adventure System
- **1.0** (2026-06-15) — Initial Quest-Based System

---

**Remember:** These rules exist to maintain quality, prevent mistakes, and ensure consistency. Follow them strictly.

---

**Last Updated:** 2026-06-23
**Maintained By:** NSC GO TO TRAVEL Development Team
