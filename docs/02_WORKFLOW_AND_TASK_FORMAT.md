# 02_WORKFLOW_AND_TASK_FORMAT.md

> GO TO TRAVEL — Workflow & Task Management Format
> Version: 2.0
> Last Updated: 2026-06-23

---

## Purpose

กำหนดขั้นตอนการทำงานและรูปแบบการจัดการ Tasks สำหรับทีมและ AI Agents

---

## Development Workflow

### Overall Process

```
Backlog → Sprint Planning → Development → Testing → Review → Deploy → Monitor
   ↑                                                                      ↓
   └────────────────────── Feedback & Iteration ────────────────────────┘
```

---

## Sprint Cycle

### Duration: 2 weeks

```
Week 1:
Monday    → Sprint Planning
Tue-Fri   → Development
Friday    → Mid-sprint Review

Week 2:
Mon-Thu   → Development
Thursday  → Code Freeze
Friday    → Sprint Review & Retro
```

---

## Task States

```
📋 Backlog
  ↓
🎯 Todo (in Sprint)
  ↓
🚧 In Progress
  ↓
👀 Code Review
  ↓
✅ Testing
  ↓
🚀 Ready to Deploy
  ↓
✔️ Done
```

---

## Task Format

### GitHub Issue Template

```markdown
## 📋 Task Title
[Component] Brief description

## 🎯 Objective
What needs to be accomplished and why

## 📝 Description
Detailed explanation of the task

## 🔗 Related Documents
- Link to ARCHITECTURE.md section
- Link to API_SPECIFICATION.md
- Link to DATABASE_SCHEMA.md
- Link to designs (if applicable)

## ✅ Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## 🏗️ Technical Requirements
- Module: [Module Name]
- Priority: [P0/P1/P2]
- Estimated Time: [hours/days]
- Dependencies: [List dependencies]

## 📦 Implementation Checklist
- [ ] Read relevant documentation
- [ ] Check for duplicates
- [ ] Create feature branch
- [ ] Implement code
- [ ] Write tests
- [ ] Update documentation
- [ ] Self-review
- [ ] Create PR
- [ ] Get code review
- [ ] Address feedback
- [ ] Merge
- [ ] Deploy to staging
- [ ] Test on staging
- [ ] Deploy to production

## 🧪 Testing Strategy
- Unit tests: [describe]
- Integration tests: [describe]
- Manual testing: [describe]

## 📸 Screenshots/Mockups
[Attach if UI-related]

## 🔖 Labels
[backend, frontend, bug, feature, documentation]

## 👤 Assignee
[GitHub username]

## ⏱️ Time Tracking
- Estimated: X hours
- Actual: Y hours
```

---

## Task Examples

### Example 1: Feature Task

```markdown
## 📋 Task Title
[Backend] Implement Route Generation API

## 🎯 Objective
Create API endpoint that generates adventure routes between origin 
and destination with checkpoints

## 📝 Description
Implement POST /api/v1/routes/generate endpoint that:
1. Accepts origin and destination GeoPoints
2. Queries Google Maps Directions API
3. Discovers Points of Interest along route
4. Filters and selects 3-5 optimal checkpoints
5. Returns Route object with polyline

## 🔗 Related Documents
- [API_SPECIFICATION.md - Routes API](/docs/API_SPECIFICATION.md#routes-api)
- [ARCHITECTURE.md - Route Engine](/docs/ARCHITECTURE.md#route-engine)
- [DATABASE_SCHEMA.md - routes collection](/docs/DATABASE_SCHEMA.md#routes)

## ✅ Acceptance Criteria
- [ ] API accepts origin and destination GeoPoints
- [ ] Returns Route object with checkpoints
- [ ] Checkpoints are max 5km detour from main route
- [ ] Response time < 2 seconds
- [ ] Error handling for invalid coordinates
- [ ] Proper authentication required

## 🏗️ Technical Requirements
- Module: Module B (Route Engine)
- Priority: P0
- Estimated Time: 8 hours
- Dependencies: Google Maps API key configured

## 📦 Implementation Checklist
- [ ] Read ARCHITECTURE.md Route Engine section
- [ ] Check existing route-related code
- [ ] Create feature/route-generation branch
- [ ] Implement route generation algorithm
- [ ] Integrate Google Maps Directions API
- [ ] Integrate Google Places API
- [ ] Add checkpoint filtering logic
- [ ] Write unit tests (coverage > 80%)
- [ ] Write integration tests
- [ ] Add error handling
- [ ] Update API_SPECIFICATION.md if changes
- [ ] Add code comments
- [ ] Self-review
- [ ] Create PR
- [ ] Get code review from Technical Lead
- [ ] Address feedback
- [ ] Merge to develop
- [ ] Deploy to staging
- [ ] Test with Postman
- [ ] Update CHANGELOG.md

## 🧪 Testing Strategy
- Unit tests: Test checkpoint filtering algorithm
- Integration tests: Test with real Google Maps API
- Manual testing: Test with various origin-destination pairs

## 🔖 Labels
backend, feature, p0, route-engine

## 👤 Assignee
@backend-developer

## ⏱️ Time Tracking
- Estimated: 8 hours
- Actual: ___ hours
```

---

### Example 2: Bug Fix Task

```markdown
## 📋 Task Title
[Frontend] Fix Memory Book photo loading issue

## 🎯 Objective
Fix bug where Memory Book photos don't load on slow connections

## 📝 Description
Users report that photos in Memory Book fail to load when 
internet connection is slow. Need to implement proper loading 
states and retry logic.

## 🔗 Related Documents
- [Memory Book Screen](/frontend/src/screens/memory/MemoryBookScreen.tsx)
- Bug report: #123

## ✅ Acceptance Criteria
- [ ] Photos show loading skeleton while loading
- [ ] Failed photos show retry button
- [ ] Retry logic with exponential backoff
- [ ] Works on 3G connection
- [ ] No console errors

## 🏗️ Technical Requirements
- Module: Module F (Memory System)
- Priority: P1
- Estimated Time: 4 hours
- Dependencies: None

## 📦 Implementation Checklist
- [ ] Reproduce bug locally
- [ ] Identify root cause
- [ ] Create fix/memory-book-photos branch
- [ ] Add loading skeleton component
- [ ] Implement retry logic
- [ ] Add error state UI
- [ ] Test on throttled connection
- [ ] Update component tests
- [ ] Self-review
- [ ] Create PR
- [ ] Get code review
- [ ] Merge
- [ ] Deploy to staging
- [ ] Verify fix on staging

## 🧪 Testing Strategy
- Manual testing: Throttle connection to 3G in dev tools
- Unit tests: Test retry logic
- User testing: Ask reporter to verify fix

## 🔖 Labels
frontend, bug, p1, memory-system

## 👤 Assignee
@frontend-developer

## ⏱️ Time Tracking
- Estimated: 4 hours
- Actual: ___ hours
```

---

## Daily Workflow

### Morning Routine

```
1. Check notifications
2. Review assigned tasks
3. Update task status
4. Plan today's work
5. Block time for deep work
```

### During Development

```
1. Move task to "In Progress"
2. Create feature branch
3. Implement with frequent commits
4. Write tests as you go
5. Update documentation
6. Self-review before PR
```

### Before End of Day

```
1. Commit and push work
2. Update task progress
3. Comment on blockers
4. Plan tomorrow
5. Update time tracking
```

---

## Code Review Workflow

### For Author

```
1. Self-review code first
2. Run all tests locally
3. Update documentation
4. Create PR with template
5. Tag reviewers
6. Respond to feedback promptly
7. Make requested changes
8. Re-request review after changes
```

### For Reviewer

```
1. Review within 24 hours
2. Check code against checklist
3. Test locally if needed
4. Provide constructive feedback
5. Approve or request changes
6. Follow up on changes
```

### PR Template

```markdown
## 🎯 Purpose
Brief description of what this PR does

## 🔗 Related Issue
Closes #123

## 📝 Changes Made
- Change 1
- Change 2
- Change 3

## ✅ Checklist
- [ ] Code follows architecture
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No hardcoded values
- [ ] Self-reviewed
- [ ] Builds successfully
- [ ] All tests pass

## 🧪 How to Test
1. Step 1
2. Step 2
3. Expected result

## 📸 Screenshots
[If UI changes]

## ⚠️ Breaking Changes
[List any breaking changes]

## 📝 Additional Notes
[Any other relevant info]
```

---

## Testing Workflow

### Unit Testing

```
1. Write test before implementation (TDD)
2. Test happy path
3. Test edge cases
4. Test error cases
5. Aim for >80% coverage
6. Run tests before commit
```

### Integration Testing

```
1. Test API endpoints end-to-end
2. Test with real Firebase
3. Test authentication flow
4. Test permissions
5. Test data validation
```

### Manual Testing

```
1. Test on real device
2. Test different scenarios
3. Test edge cases
4. Test offline mode
5. Test slow network
6. Record bugs found
```

---

## Deployment Workflow

### Deploy to Development

```
1. Merge to develop branch
2. Automatic deploy via CI/CD
3. Smoke test
```

### Deploy to Staging

```
1. Create release candidate
2. Deploy to staging
3. Full regression testing
4. UAT by Product Owner
5. Sign-off from QA
```

### Deploy to Production

```
1. Technical Lead approval
2. Backup production data
3. Deploy during low-traffic window
4. Monitor metrics
5. Smoke test production
6. Monitor for errors (24h)
7. Announce to team
```

### Rollback Procedure

```
1. Identify issue
2. Alert Technical Lead
3. Stop new deployments
4. Revert to previous version
5. Verify rollback successful
6. Post-mortem meeting
7. Document incident
```

---

## Communication Workflow

### Daily Standup Format

```
👋 Morning!

🎯 Yesterday:
- Implemented Route Generation API
- Wrote unit tests
- Created PR

🚀 Today:
- Address PR feedback
- Start Checkpoint unlock logic
- Update documentation

🚧 Blockers:
- Waiting for Google Maps API key
```

### Status Update Format

```
Task: [Route Generation API]
Status: 🚧 In Progress (80%)
ETA: Tomorrow
Blockers: None
Notes: PR submitted, waiting for review
```

---

## AI Agent Workflow

### Task Assignment to AI Agent

```markdown
## 🤖 AI Agent Task

Module: [Module Name]
Type: [Implementation/Refactor/Documentation]
Priority: [P0/P1/P2]

**Context:**
- Read: [List documents to read]
- Existing code: [Relevant file paths]
- Dependencies: [List dependencies]

**Requirements:**
[Clear, specific requirements]

**Constraints:**
- Must follow ARCHITECTURE.md
- Must use existing patterns
- Must include tests
- Must update docs

**Deliverables:**
- [ ] Code implementation
- [ ] Unit tests
- [ ] Documentation update
- [ ] PR description

**Review Criteria:**
[Specific review criteria]
```

### AI Agent Submission

```markdown
## ✅ AI Agent Deliverable

**Task:** [Task name]
**Files Changed:**
- file1.ts
- file2.ts
- file3.test.ts

**Implementation Summary:**
[Brief summary]

**Tests Added:**
- Test 1
- Test 2

**Documentation Updated:**
- [List files]

**Self-Check:**
- [x] Follows architecture
- [x] TypeScript types correct
- [x] Tests pass
- [x] No hardcodes
- [x] Documentation updated

**Ready for Review:** ✅
```

---

## Time Tracking

### How to Estimate

```
Simple (< 4h): 
- Fix typo
- Update config
- Add constant

Medium (4-8h):
- New component
- New API endpoint
- Refactor module

Complex (1-3 days):
- New feature
- Major refactor
- Integration

Very Complex (> 3 days):
- New system module
- Architecture change
- Break into smaller tasks
```

### Estimation Formula

```
Estimate = (Best Case + (4 × Most Likely) + Worst Case) / 6

Example:
- Best: 4 hours
- Most Likely: 6 hours
- Worst: 10 hours
- Estimate = (4 + 24 + 10) / 6 = 6.3 hours
```

---

## Definition of Ready (Before Starting)

Task is ready when:

- [ ] Requirements are clear
- [ ] Acceptance criteria defined
- [ ] Dependencies identified
- [ ] Design approved (if UI)
- [ ] Technical approach agreed
- [ ] Estimated
- [ ] Assigned
- [ ] Priority set

---

## Definition of Done (Before Closing)

Task is done when:

- [ ] Code implemented
- [ ] Tests written and passing
- [ ] Documentation updated
- [ ] Code reviewed and approved
- [ ] Merged to main branch
- [ ] Deployed to staging
- [ ] QA tested
- [ ] Product Owner approved
- [ ] Deployed to production
- [ ] Monitored (no errors)

---

## Metrics & KPIs

### Team Velocity
- Story points completed per sprint
- Target: Steady or increasing

### Code Quality
- Test coverage: >80%
- Code review turnaround: <24h
- Bug rate: <5% of features

### Delivery
- Sprint completion rate: >90%
- Deployment frequency: Daily (staging), Weekly (production)
- Lead time: <1 week

---

**Remember:** Consistent workflow leads to predictable delivery and high quality. Follow the process.

---

**Last Updated:** 2026-06-23
**Maintained By:** NSC GO TO TRAVEL Development Team
