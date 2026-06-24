# 01_ROLES_AND_APPROVAL.md

> GO TO TRAVEL — Roles, Responsibilities & Approval Matrix
> Version: 2.0
> Last Updated: 2026-06-23

---

## Purpose

กำหนดบทบาทหน้าที่ของทีมงานและ AI Agents พร้อมระบบอนุมัติสำหรับ GO TO TRAVEL

---

## Team Structure

```
Product Owner (คุณ Zen)
    │
    ├── Technical Lead
    │   ├── Backend Team
    │   ├── Frontend Team
    │   └── DevOps
    │
    ├── Design Team
    │   ├── UI/UX Designer
    │   └── Graphic Designer
    │
    └── AI Agents
        ├── Backend Agent
        ├── Frontend Agent
        ├── Documentation Agent
        └── QA Agent
```

---

## Roles & Responsibilities

### 1. Product Owner

**คุณ Zen (Project Owner)**

**Responsibilities:**
- กำหนด Product Vision
- อนุมัติ Features ใหม่
- จัดลำดับความสำคัญ (P0/P1/P2)
- Review และอนุมัติ Major Changes
- ตัดสินใจเชิงธุรกิจ
- นำเสนอต่อ NSC

**Authority Level:** ⭐⭐⭐⭐⭐ (Final Decision)

**Approvals Required:**
- Feature additions
- Architecture changes
- Budget decisions
- Timeline changes
- Partnership decisions

---

### 2. Technical Lead

**Responsibilities:**
- กำหนด Technical Architecture
- Review Pull Requests
- Code quality control
- Technical decision making
- Mentor developers
- Performance optimization

**Authority Level:** ⭐⭐⭐⭐

**Approvals Required:**
- Major code changes
- Database schema changes
- API design changes
- Third-party integrations
- Deployment to production

**Reports To:** Product Owner

---

### 3. Backend Team

**Responsibilities:**
- Implement Cloud Functions
- Design and maintain Database
- API development
- Security implementation
- Server-side logic
- Integration with Firebase

**Authority Level:** ⭐⭐⭐

**Approvals Required:**
- New API endpoints → Technical Lead
- Database changes → Technical Lead
- Third-party services → Technical Lead
- Deploy to staging → Self
- Deploy to production → Technical Lead

**Reports To:** Technical Lead

**Key Modules:**
- Module B: Route Engine
- Module E: Checkpoint Engine
- Module H: Voucher Engine
- Module J: Economic Impact Engine

---

### 4. Frontend Team

**Responsibilities:**
- Implement Mobile App (React Native)
- UI/UX implementation
- State management (Redux)
- Client-side routing
- Integration with Backend APIs
- Offline functionality

**Authority Level:** ⭐⭐⭐

**Approvals Required:**
- New screens → Technical Lead
- Major UX changes → Product Owner
- Third-party libraries → Technical Lead
- Design deviations → Design Team
- Deploy to staging → Self
- Deploy to production → Technical Lead

**Reports To:** Technical Lead

**Key Modules:**
- Module C: Mascot Scout (UI)
- Module D: Map & Navigation
- Module F: Memory System (UI)
- Module G: AR Experience

---

### 5. Design Team

**UI/UX Designer**

**Responsibilities:**
- Design User Flows
- Create mockups and prototypes
- Design System maintenance
- User research
- Accessibility compliance
- Visual consistency

**Authority Level:** ⭐⭐⭐

**Approvals Required:**
- Major UX changes → Product Owner
- Design System changes → Technical Lead
- Brand changes → Product Owner

**Reports To:** Product Owner

**Graphic Designer**

**Responsibilities:**
- Create graphics and illustrations
- Mascot character design
- Stamp design
- Marketing materials
- App icons and assets

**Authority Level:** ⭐⭐

**Approvals Required:**
- Brand assets → Product Owner
- Character design → Product Owner

**Reports To:** Design Team Lead

---

### 6. DevOps

**Responsibilities:**
- CI/CD pipeline
- Deployment automation
- Infrastructure monitoring
- Backup and recovery
- Performance monitoring
- Security audits

**Authority Level:** ⭐⭐⭐

**Approvals Required:**
- Infrastructure changes → Technical Lead
- Cost optimization → Product Owner
- Security patches → Self (urgent)

**Reports To:** Technical Lead

---

### 7. QA Team

**Responsibilities:**
- Test planning
- Manual testing
- Automated testing
- Bug reporting
- Regression testing
- User acceptance testing

**Authority Level:** ⭐⭐

**Approvals Required:**
- Release sign-off → Technical Lead
- Test strategy → Technical Lead

**Reports To:** Technical Lead

---

## AI Agent Roles

### Backend AI Agent

**Responsibilities:**
- Generate backend code
- Create API endpoints
- Write Cloud Functions
- Database operations
- Documentation

**Authority Level:** ⭐⭐

**Must Get Approval For:**
- All code before commit → Human review
- Database schema changes → Technical Lead
- New dependencies → Technical Lead

**Limitations:**
- Cannot deploy to production
- Cannot modify security rules without review
- Cannot access production data

---

### Frontend AI Agent

**Responsibilities:**
- Generate frontend code
- Create React components
- Implement screens
- State management
- UI styling

**Authority Level:** ⭐⭐

**Must Get Approval For:**
- All code before commit → Human review
- New dependencies → Technical Lead
- Major UX changes → Design Team

**Limitations:**
- Cannot deploy to production
- Cannot deviate from designs
- Must follow Design System

---

### Documentation AI Agent

**Responsibilities:**
- Update documentation
- Generate API docs
- Write technical specs
- Create diagrams
- Maintain README files

**Authority Level:** ⭐⭐

**Must Get Approval For:**
- SSOT changes → Product Owner
- Architecture changes → Technical Lead

**Limitations:**
- Cannot change SSOT without approval
- Must verify technical accuracy

---

### QA AI Agent

**Responsibilities:**
- Generate test cases
- Write unit tests
- Integration testing
- Performance testing
- Bug detection

**Authority Level:** ⭐

**Must Get Approval For:**
- Test strategy → QA Team Lead

**Limitations:**
- Cannot skip tests
- Must report all bugs

---

## Approval Matrix

### Feature Development

| Action | Requires Approval From | Authority Level Required |
|--------|------------------------|--------------------------|
| P0 Feature | Product Owner | ⭐⭐⭐⭐⭐ |
| P1 Feature | Product Owner | ⭐⭐⭐⭐⭐ |
| P2 Feature | Product Owner | ⭐⭐⭐⭐⭐ |
| New Feature (not in spec) | Product Owner | ⭐⭐⭐⭐⭐ |
| Feature modification | Technical Lead | ⭐⭐⭐⭐ |
| Bug fix | Self (if minor) | ⭐⭐⭐ |
| Critical bug fix | Technical Lead | ⭐⭐⭐⭐ |

### Code Changes

| Action | Requires Approval From | Authority Level Required |
|--------|------------------------|--------------------------|
| New API endpoint | Technical Lead | ⭐⭐⭐⭐ |
| Modify existing API | Technical Lead | ⭐⭐⭐⭐ |
| Database schema change | Technical Lead | ⭐⭐⭐⭐ |
| New component | Self (Frontend) | ⭐⭐⭐ |
| Third-party library | Technical Lead | ⭐⭐⭐⭐ |
| Code refactor | Self | ⭐⭐⭐ |

### Design Changes

| Action | Requires Approval From | Authority Level Required |
|--------|------------------------|--------------------------|
| New screen design | Design Team + Product Owner | ⭐⭐⭐⭐⭐ |
| Minor UI tweak | Design Team | ⭐⭐⭐ |
| UX flow change | Product Owner | ⭐⭐⭐⭐⭐ |
| Design system update | Design Team + Technical Lead | ⭐⭐⭐⭐ |
| Brand change | Product Owner | ⭐⭐⭐⭐⭐ |

### Deployment

| Action | Requires Approval From | Authority Level Required |
|--------|------------------------|--------------------------|
| Deploy to development | Self | ⭐⭐ |
| Deploy to staging | Self | ⭐⭐⭐ |
| Deploy to production | Technical Lead | ⭐⭐⭐⭐ |
| Hotfix to production | Technical Lead (urgent) | ⭐⭐⭐⭐ |
| Rollback production | Technical Lead | ⭐⭐⭐⭐ |

### Documentation

| Action | Requires Approval From | Authority Level Required |
|--------|------------------------|--------------------------|
| Update README | Self | ⭐⭐ |
| Update SSOT | Product Owner | ⭐⭐⭐⭐⭐ |
| Update API docs | Technical Lead | ⭐⭐⭐⭐ |
| Update Architecture | Technical Lead | ⭐⭐⭐⭐ |
| Update Database docs | Technical Lead | ⭐⭐⭐⭐ |

---

## Decision Making Process

### 1. Feature Request

```
User/Stakeholder
    ↓ (Request)
Product Owner
    ↓ (Evaluate)
Priority Assignment (P0/P1/P2)
    ↓ (if approved)
Technical Lead
    ↓ (Technical Feasibility)
Team Assignment
    ↓
Development
    ↓
QA Testing
    ↓
Deployment
```

### 2. Technical Decision

```
Developer/AI Agent
    ↓ (Proposal)
Technical Lead
    ↓ (Review)
Architecture Impact Assessment
    ↓
Approval/Rejection
    ↓ (if approved)
Implementation
```

### 3. Emergency Fix

```
Bug Report
    ↓
Severity Assessment
    ↓
Critical? → Yes → Technical Lead → Immediate Fix
    ↓
    No → Normal Process
```

---

## Escalation Path

### Level 1: Team Member
- Self-resolve if within authority
- Document decision

### Level 2: Technical Lead
- Technical decisions
- Code reviews
- Architecture changes

### Level 3: Product Owner
- Product decisions
- Feature priorities
- Business impact

### Emergency: Product Owner + Technical Lead
- Production incidents
- Security issues
- Major bugs

---

## Communication Channels

### Daily Updates
- **Channel:** Team chat
- **Frequency:** Daily
- **Participants:** All team

### Code Reviews
- **Channel:** GitHub Pull Requests
- **Frequency:** Per PR
- **Participants:** Developer + Reviewer

### Feature Planning
- **Channel:** Weekly meeting
- **Frequency:** Weekly
- **Participants:** Product Owner + Technical Lead

### Sprint Planning
- **Channel:** Sprint meeting
- **Frequency:** Bi-weekly
- **Participants:** Entire team

### Emergency
- **Channel:** Phone/Emergency chat
- **Frequency:** As needed
- **Participants:** Technical Lead + Product Owner

---

## AI Agent Guidelines

### What AI Agents CAN Do

✅ Generate code following architecture
✅ Write tests
✅ Update documentation
✅ Refactor code
✅ Fix bugs (minor)
✅ Create components
✅ Write API endpoints
✅ Optimize performance

### What AI Agents CANNOT Do

❌ Change SSOT without approval
❌ Deploy to production
❌ Modify security rules
❌ Add new features not in spec
❌ Change architecture
❌ Merge to main branch
❌ Access production data
❌ Make business decisions

### AI Agent Workflow

1. **Receive Task**
   - Read SSOT
   - Understand requirements
   - Check for existing code

2. **Generate Code**
   - Follow architecture
   - Use TypeScript
   - Add tests
   - Update docs

3. **Submit for Review**
   - Create PR
   - Add description
   - Tag reviewer
   - Wait for approval

4. **After Approval**
   - Merge (if authorized)
   - Deploy to dev/staging
   - Update tracking

---

## Review Standards

### Code Review Checklist

Reviewer must verify:

- [ ] Follows architecture
- [ ] TypeScript types correct
- [ ] Tests included
- [ ] Documentation updated
- [ ] No hardcoded values
- [ ] Error handling present
- [ ] Security considered
- [ ] Performance acceptable
- [ ] No duplicates
- [ ] Follows V2.0 concepts

**Approval Threshold:**
- Minor changes: 1 approval
- Major changes: 2 approvals (Technical Lead + Senior)
- Architecture changes: Product Owner + Technical Lead

---

## Version Control

### Branch Strategy

```
main (production)
    ├── develop (staging)
    │   ├── feature/route-engine
    │   ├── feature/checkpoint-system
    │   └── fix/memory-book-bug
    │
    └── hotfix/critical-bug
```

### Branch Permissions

| Branch | Can Push | Can Merge | Can Delete |
|--------|----------|-----------|------------|
| main | ❌ | Technical Lead | ❌ |
| develop | ❌ | Technical Lead | ❌ |
| feature/* | Developer | Developer | Developer |
| hotfix/* | Technical Lead | Technical Lead | Technical Lead |

---

## Conflict Resolution

### Technical Disagreement

1. Present both approaches
2. Technical Lead decides
3. Document decision
4. Implement decided approach

### Product Disagreement

1. Present to Product Owner
2. Product Owner decides
3. Document decision
4. Implement decided approach

### Escalation

If no resolution:
1. Document both sides
2. Present to Product Owner + Technical Lead
3. Joint decision
4. Decision is final

---

**Remember:** Clear roles and approval processes prevent chaos and ensure quality. When in doubt, ask for approval.

---

**Last Updated:** 2026-06-23
**Maintained By:** NSC GO TO TRAVEL Development Team
