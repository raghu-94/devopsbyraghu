# DevOps by Raghu — Next.js Landing Page + Unified Guide Theme

## Background

Raghu has 11 existing HTML guide/project files with **inconsistent themes** (different accent colors, backgrounds, fonts, layouts). He wants:

1. A **Next.js landing page** matching his detailed spec (hero, stats, tool cards, project cards, about, CTA, footer)
2. All guide/project pages **unified under one consistent theme** so they look like a cohesive product — NOT matched to the landing page, but consistent among themselves
3. Architecture that supports future **auth pages** and **new content**

---

## Scope — All Source Files

### Foundation Guides (7 files)
| File | Size | Current Theme |
|---|---|---|
| `docker_mastery.html` | 82KB, 1577 lines | Cyan accent, sidebar layout |
| `dockerfile-guide.html` | 69KB, 1152 lines | Blue accent, **scrolling page layout** (different from all others) |
| `jenkins_mastery.html` | 120KB, 2177 lines | Purple accent, sidebar layout |
| `kubernetes_mastery.html` | 67KB, 1339 lines | K8s blue accent, sidebar layout |
| `monitoring_mastery.html` | 26KB, 454 lines | Grafana orange accent, sidebar layout |
| `python_mastery.html` | 16KB, 317 lines | Python blue accent, sidebar layout |
| `terminology_mastery.html` | 15KB, 242 lines | Burn orange accent, sidebar layout |

### Project Guides (3 files)
| File | Size | Current Theme |
|---|---|---|
| `project1_iac.html` | 39KB, 704 lines | Terraform purple accent |
| `project2_gitops.html` | 32KB, 553 lines | K8s blue accent |
| `project3_serverless.html` | 32KB, 624 lines | AWS orange accent |

### Additional Files (in project folders, not guides)
| File | Notes |
|---|---|
| `aws/vpn_wizard.html` | 78KB — appears to be a separate tool, not a guide. **Excluding from scope.** |
| `interview questions/` | Empty folder |
| Project 2 & 3 each have `interview_qna.html` + `implementation_plan.md` | Small files, likely supplementary |

> [!IMPORTANT]
> **Total content to convert: 10 HTML files** (excluding vpn_wizard and dockerfile-guide for now — see Open Questions).
> Total combined size: **~430KB of HTML** across **~7,900 lines**.

---

## Open Questions

> [!IMPORTANT]
> These need your input before I start building:

1. **Dockerfile Guide** (`dockerfile-guide.html`) uses a completely different layout — it's a **long scrolling page** with accordion cards, NOT the sidebar+section pattern used by all other files. Should I:
   - **(A)** Convert it to the same sidebar layout as the others for consistency?
   - **(B)** Keep its unique scrolling layout but apply the unified color theme?
   - **(C)** Exclude it and keep it as a standalone page?

2. **Landing page spec vs actual content mismatch**: Your spec mentions 4 tools (Docker, Jenkins, K8s, Terraform), but you have **7 foundation guides** (Docker, Dockerfile, Jenkins, K8s, Monitoring, Python, Terminology) and **no Terraform guide**. Should I:
   - **(A)** Update the landing page to show all 7 guides instead of the 4 in the spec?
   - **(B)** Keep the spec's 4 cards and add the extra 3 as a separate "Additional Guides" section?

3. **VPN Wizard** (`aws/vpn_wizard.html`) — should this be included in the landing page as a tool/project, or is it separate?

4. **Interview Q&A files** in project 2 and 3 folders — should these be linked from the project pages?

5. **Guide page conversion approach**: Each file is massive (1000-2000 lines). The content (HTML structure, JS interactivity) is identical in pattern — just the CSS theme differs. My plan is to:
   - Extract the **content** (sections, labs, code blocks, quizzes, etc.) from each file
   - Create a **shared CSS theme** in Next.js that all guide pages inherit
   - Keep each guide as its own Next.js page at routes like `/guides/docker`, `/guides/jenkins`, etc.
   - **Is this approach OK, or do you want the guides to remain as standalone HTML files** served from the `public/` folder?

---

## Proposed Changes

### Phase 1 — Next.js Project Setup

#### [NEW] `project/` (Next.js App Router project)

- Initialize Next.js with App Router using `npx create-next-app@latest`
- Set up project structure:

```
project/
├── app/
│   ├── layout.js          ← Root layout (Plus Jakarta Sans, meta tags)
│   ├── page.js             ← Landing page (index)
│   ├── globals.css          ← Landing page design system tokens
│   ├── guides/
│   │   ├── layout.js        ← Shared guide layout (sidebar, unified theme)
│   │   ├── guide-theme.css  ← Unified guide theme CSS
│   │   ├── docker/page.js
│   │   ├── jenkins/page.js
│   │   ├── kubernetes/page.js
│   │   ├── monitoring/page.js
│   │   ├── python/page.js
│   │   └── terminology/page.js
│   └── projects/
│       ├── layout.js        ← Shared project layout (same theme as guides)
│       ├── iac-migration/page.js
│       ├── k8s-gitops/page.js
│       └── serverless-pipeline/page.js
├── components/
│   ├── landing/             ← Landing page components (Nav, Hero, Stats, etc.)
│   └── guide/               ← Shared guide components (Sidebar, CodeBlock, Quiz, ErrorCard, etc.)
├── public/
│   └── (static assets if any)
├── package.json
└── next.config.js
```

---

### Phase 2 — Landing Page (per spec)

#### [NEW] `app/page.js` — Landing page

Build all 8 sections from the spec:
1. Sticky nav (logo, links, CTA)
2. Dark hero (`#0A0F1E` → `#1a2a4a`)
3. Stats strip (3 cards with count-up)
4. Foundational tools (2×2 card grid → links to `/guides/xxx`)
5. Hands-on projects (2×2 card grid → links to `/projects/xxx`)
6. About section (avatar + text)
7. CTA banner (solid blue)
8. Dark footer (3-column)

#### [NEW] `app/globals.css` — Design system
- All color tokens from the spec
- Plus Jakarta Sans import
- Button, card, badge, pill styles
- Animations (scroll-triggered fade-in, count-up)

---

### Phase 3 — Unified Guide Theme

> [!IMPORTANT]
> This is the core ask — all guides share ONE consistent theme.

#### [NEW] `app/guides/guide-theme.css` — Shared guide theme

**Proposed unified theme:**
- **Background**: `#0d1117` (dark, GitHub-style — most guides already use this or close)
- **Sidebar**: `#161b22`
- **Surface**: `#21262d`
- **Accent**: `#60a5fa` (a neutral, modern blue — not tool-specific)
- **Font**: `Inter` + `JetBrains Mono` for code (most guides already use this)
- **Consistent components**: sidebar, nav items, sections, code blocks, copy buttons, tips, warnings, error cards, quizzes, checklists, step indicators, nav buttons — all standardized

#### [NEW] `components/guide/` — Reusable guide components

| Component | Purpose |
|---|---|
| `GuideSidebar.js` | Collapsible sidebar with nav groups, search, progress bar |
| `GuideSection.js` | Section wrapper with fade-in animation |
| `CodeBlock.js` | Styled code block with copy button |
| `ConceptBox.js` | Blue-bordered concept callout |
| `TipBox.js` | Green tip callout |
| `WarningBox.js` | Yellow warning callout |
| `ErrorCard.js` | Red error card with title, error msg, detail, fix |
| `Quiz.js` | Quiz with reveal answer button |
| `Checklist.js` | Checkbox checklist |
| `StepIndicator.js` | Numbered step with content |
| `NavButtons.js` | Previous/Next navigation |
| `DiagramBox.js` | ASCII diagram display |
| `DynamicVarConfig.js` | Variable input + apply (for project pages) |
| `ChaosEngine.js` | Chaos scenario generator (for project pages) |

---

### Phase 4 — Content Migration

For each of the 10 HTML files:
1. Extract the **raw content** (sections, headings, paragraphs, code blocks, quizzes, etc.)
2. Convert to **React components** using the shared guide components
3. Preserve all interactivity (sidebar nav, search, progress tracking, copy code, reveal answers, chaos engine)
4. Each guide becomes a Next.js page that inherits the shared layout + theme

> [!WARNING]
> This is the most labor-intensive phase. Each file is 300-2000 lines. I'll do them one at a time, confirming each before moving to the next.

**Migration order (smallest → largest):**
1. `terminology_mastery.html` (242 lines) — simplest, good test case
2. `python_mastery.html` (317 lines)
3. `monitoring_mastery.html` (454 lines)
4. `project2_gitops.html` (553 lines)
5. `project3_serverless.html` (624 lines)
6. `project1_iac.html` (704 lines)
7. `kubernetes_mastery.html` (1339 lines)
8. `docker_mastery.html` (1577 lines)
9. `jenkins_mastery.html` (2177 lines)
10. `dockerfile-guide.html` (1152 lines) — if included

---

## Verification Plan

### Automated Tests
- `npm run build` — ensure production build succeeds with no errors
- `npm run lint` — check for lint issues

### Manual Verification
1. Run `npm run dev` and verify:
   - Landing page loads with all 8 sections
   - All hover/transition animations work
   - Stat counter animation triggers on scroll
   - Mobile responsive layout at 480px
   - All guide/project card links navigate correctly
2. Open each guide page and verify:
   - Sidebar navigation works
   - Code copy buttons work
   - Quiz reveal buttons work
   - Section transitions animate
   - Progress bar updates
   - Search/filter works (if applicable)
3. Compare guide pages side-by-side to confirm unified theme consistency

---

*Estimated total effort: This is a significant project — roughly 15-20 build steps.*
