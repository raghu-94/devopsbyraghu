"use client";

import GuideWrapper from "@/components/guide/GuideWrapper";
import { CodeBlock, ConceptBox, TipBox, WarningBox, ErrorCard, Quiz } from "@/components/guide/GuideComponents";

export default function GitMastery() {
  const navGroups = [
    {
        "title": "🗺️ Overview",
        "items": [
            {
                "id": "overview",
                "title": "Roadmap & Setup"
            }
        ]
    },
    {
        "title": "Stage 1 · Foundations",
        "items": [
            {
                "id": "s1-l1",
                "title": "What is Git & Why It Exists"
            },
            {
                "id": "s1-l2",
                "title": "The Three-Tree Architecture"
            },
            {
                "id": "s1-l3",
                "title": "Your First Repository"
            },
            {
                "id": "s1-l4",
                "title": "Staging, Committing & History"
            },
            {
                "id": "s1-l5",
                "title": "Stage 1 Capstone"
            }
        ]
    },
    {
        "title": "Stage 2 · Branching & Merging",
        "items": [
            {
                "id": "s2-l1",
                "title": "Branches — What They Really Are"
            },
            {
                "id": "s2-l2",
                "title": "Merging Strategies"
            },
            {
                "id": "s2-l3",
                "title": "Resolving Merge Conflicts"
            },
            {
                "id": "s2-l4",
                "title": "Rebasing Without Fear"
            },
            {
                "id": "s2-l5",
                "title": "Stage 2 Capstone"
            }
        ]
    },
    {
        "title": "Stage 3 · Remote Collaboration",
        "items": [
            {
                "id": "s3-l1",
                "title": "Remotes, Push & Pull"
            },
            {
                "id": "s3-l2",
                "title": "Pull Requests & Code Review Flow"
            },
            {
                "id": "s3-l3",
                "title": "Fetch vs Pull vs Sync"
            },
            {
                "id": "s3-l4",
                "title": "Working with Tags & Releases"
            },
            {
                "id": "s3-l5",
                "title": "Stage 3 Capstone"
            }
        ]
    },
    {
        "title": "Stage 4 · Rewriting History",
        "items": [
            {
                "id": "s4-l1",
                "title": "Amend, Reset & Revert"
            },
            {
                "id": "s4-l2",
                "title": "Interactive Rebase — Sculpting Commits"
            },
            {
                "id": "s4-l3",
                "title": "Cherry-Pick & Stash"
            },
            {
                "id": "s4-l4",
                "title": "Reflog — The Safety Net"
            },
            {
                "id": "s4-l5",
                "title": "Stage 4 Capstone"
            }
        ]
    },
    {
        "title": "Stage 5 · Production Git",
        "items": [
            {
                "id": "s5-l1",
                "title": "Git Workflows at Scale"
            },
            {
                "id": "s5-l2",
                "title": "Security — Signed Commits & Secrets"
            },
            {
                "id": "s5-l3",
                "title": "Git Hooks & Automation"
            },
            {
                "id": "s5-l4",
                "title": "Git in CI/CD (Jenkins & GitHub Actions)"
            },
            {
                "id": "s5-l5",
                "title": "Stage 5 Capstone · Full Feature Workflow"
            }
        ]
    },
    {
        "title": "📚 Reference",
        "items": [
            {
                "id": "errors",
                "title": "Master Error Reference"
            }
        ]
    }
];

  return (
    <GuideWrapper 
      title="Git Mastery Guide" 
      subtitle="From first commit to production branching strategy — no fluff, just the commands working engineers actually use."
      navGroups={navGroups}
    >
      {(activeSection) => {
        switch (activeSection) {
          case 'overview':
            return (
              <div>
                
  <div className="hero-banner">
    <h1>🌿 Git Mastery Guide</h1>
    <p>From first commit to production branching strategy — no fluff, just the commands working engineers actually use.</p>
    <div className="tag-row">
      <span className="tag">Git 2.40+</span>
      <span className="tag">GitHub / GitLab</span>
      <span className="tag">Mac · Linux · WSL2</span>
      <span className="tag">No cloud cost</span>
    </div>
  </div>

  <h2>The Problem Git Solves</h2>
  <p>Before Git, the workflow looked like this: <code>project-final.zip</code>, <code>project-final-v2.zip</code>, <code>project-ACTUALLY-final.zip</code>, emailing files back and forth, accidentally overwriting a teammate's work, and zero idea who changed what or why. Git gives every file change a permanent, traceable identity — who made it, when, and what else changed alongside it — and lets multiple people work on the same codebase simultaneously without stepping on each other.</p>
  <p>The fix: a distributed version-control system where every developer has the full history locally, changes are proposed through branches, and the permanent record is append-only. You can always go back. You can always see why something changed.</p>

  <h2>Cost &amp; Infrastructure</h2>
  <TipBox title="💰 No cloud cost."> Everything in this guide runs entirely on your local machine. You'll push to GitHub in Stage 3, but GitHub's free tier is more than enough — no credit card required, no resources left running.</TipBox>

  <h2>Prerequisites</h2>

  <div className="g-step">
    <div>1</div>
    <div>
      <strong>Install Git</strong>
      <TipBox title="📍 Where to run"> Terminal (macOS/Linux) or WSL2 Ubuntu terminal on Windows.</TipBox>
<CodeBlock code={`# macOS (Homebrew)
brew install git

# Ubuntu / WSL2
sudo apt update &amp;&amp; sudo apt install git -y

# Verify
git --version
# Expected: git version 2.40.x or higher`} title="Install Git"></CodeBlock>

      <ErrorCard error="⚠️ Common Install Issue — git: command not found after install" meaning="bash: git: command not found" fix="Scenario: You installed Git on Windows (native installer), then opened WSL2 and got this error. The Windows Git binary isn't on the WSL2 PATH.
          Fix: Install Git inside WSL2 separately: sudo apt install git -y. WSL2 is a full Linux environment — it needs its own Git installation, not the Windows one. Run which git inside WSL2 to confirm it resolves to /usr/bin/git."></ErrorCard>
    </div>
  </div>

  <div className="g-step">
    <div>2</div>
    <div>
      <strong>Configure your identity (do this once, globally)</strong>
      <TipBox title="📍 Where to run"> Any terminal. This writes to <code>~/.gitconfig</code> — it applies to every repo on this machine.</TipBox>
<CodeBlock code={`git config --global user.name 'Your Name'
git config --global user.email 'you@example.com'
git config --global core.editor 'code --wait'   # or nano, vim
git config --global init.defaultBranch main

# Verify everything looks right
git config --global --list`} title="Configure your identity (do this once, globally)"></CodeBlock>
    </div>
  </div>

  <div className="g-step">
    <div>3</div>
    <div>
      <strong>Set up SSH key for GitHub (needed in Stage 3)</strong>
      <TipBox title="📍 Where to run"> Your terminal. You'll add the public key to GitHub Settings → SSH Keys.</TipBox>
<CodeBlock code={`# Generate key (accept default path, add a passphrase)
ssh-keygen -t ed25519 -C 'you@example.com'

# Copy public key to clipboard
cat ~/.ssh/id_ed25519.pub

# Test after adding to GitHub
ssh -T git@github.com
# Expected: Hi username! You've successfully authenticated...`} title="Set up SSH key for GitHub (needed in Stage 3)"></CodeBlock>
    </div>
  </div>

  <h2>Learning Roadmap</h2>
  <div className="stage-card">
    <div className="stage-num">1</div>
    <div className="stage-info">
      <strong>Foundations</strong>
      <span>How Git thinks about files. The staging area, commits, and the mental model you need before touching branches.</span>
    </div>
  </div>
  <div className="stage-card">
    <div className="stage-num">2</div>
    <div className="stage-info">
      <strong>Branching &amp; Merging</strong>
      <span>Branches are just pointers. Merge strategies, conflict resolution, and rebasing without nuking your teammates' work.</span>
    </div>
  </div>
  <div className="stage-card">
    <div className="stage-num">3</div>
    <div className="stage-info">
      <strong>Remote Collaboration</strong>
      <span>Push, pull, fetch, pull requests, tags. The full GitHub/GitLab workflow a real team uses every day.</span>
    </div>
  </div>
  <div className="stage-card">
    <div className="stage-num">4</div>
    <div className="stage-info">
      <strong>Rewriting History</strong>
      <span>Amend, reset, revert, interactive rebase, cherry-pick, stash, and the reflog safety net. The dangerous-but-essential toolkit.</span>
    </div>
  </div>
  <div className="stage-card">
    <div className="stage-num">5</div>
    <div className="stage-info">
      <strong>Production Git</strong>
      <span>Trunk-based development vs Gitflow, signed commits, secret scanning, hooks, and wiring Git into CI/CD pipelines (Jenkins, GitHub Actions).</span>
    </div>
  </div>

  <table>
    <thead><tr><th>Stage</th><th>Focus</th><th>Capstone</th></tr></thead>
    <tbody>
      <tr><td>1 — Foundations</td><td>Commits, staging, history</td><td>Version-controlled project with meaningful commit history</td></tr>
      <tr><td>2 — Branches</td><td>Merge, rebase, conflicts</td><td>Feature branch merged cleanly via rebase + merge</td></tr>
      <tr><td>3 — Remotes</td><td>GitHub, push, pull, PRs</td><td>Collaborative repo with reviewed PR merged to main</td></tr>
      <tr><td>4 — History</td><td>Rewrite, recover, sculpt</td><td>Messy commit history cleaned into logical story</td></tr>
      <tr><td>5 — Production</td><td>Workflows, CI/CD, hooks</td><td>Full feature lifecycle with pre-commit hooks + CI pipeline</td></tr>
    </tbody>
  </table>

  

              </div>
            );
          case 's1-l1':
            return (
              <div>
                
  <h2>What is Git &amp; Why It Exists <span className="badge beginner">Beginner</span></h2>
  <p className="subtitle">Stage 1 · Foundations — the mental model before any commands</p>

  <ConceptBox title="Why this matters">
     Most Git pain comes from treating Git like a backup tool ("I'll just commit when it works"). Git is actually a <em>content-addressable filesystem with a directed acyclic graph of snapshots</em>. That sounds scary but it means one thing practically: every commit is a permanent, unique fingerprint of your project at a point in time, and Git is impossibly good at comparing those fingerprints. Understanding this makes every other Git concept click.
  </ConceptBox>

  <h3>Git vs. The Alternatives</h3>
  <table>
    <thead><tr><th>Approach</th><th>How it works</th><th>The problem</th></tr></thead>
    <tbody>
      <tr><td>Copy folders</td><td><code>project-v1/</code>, <code>project-v2/</code></td><td>Can't merge, no who/why, disk explosion</td></tr>
      <tr><td>SVN (centralised)</td><td>One server holds history; check out files</td><td>Server down = can't commit; branching is painful</td></tr>
      <tr><td>Git (distributed)</td><td>Every clone IS the full repository</td><td>Learning curve; tiny operational overhead that pays off 100x</td></tr>
    </tbody>
  </table>

  <h3>The SHA-1 Fingerprint</h3>
  <p>Every object Git stores (files, commits, trees) gets a SHA-1 hash: a 40-character string like <code>a3f5c8d...</code>. This hash is computed from the content itself. Change one byte → completely different hash. This is why Git can detect corruption and why "the same commit on two machines" means literally bit-for-bit identical content.</p>

  <div className="diagram">
Commit a3f5c8d
│
├── tree 9b2e1f3   ← snapshot of your project directory
│    ├── blob c4d7a1e  ← contents of README.md
│    └── blob 8f3b2d9  ← contents of app.py
│
├── parent 7c1e4b2   ← previous commit
├── author Raghu &lt;r@dev.io&gt;
└── message "Add login endpoint"</div>

  <Quiz question="You and a teammate both run git clone on the same repo. Two weeks later, with no internet, you both run git log. Will the output be the same? Why?" answer="Yes — as of the moment of cloning. Git is distributed: every clone contains the full commit history (all SHA-1 objects) up to that point. You don't need the server to read history. The outputs diverge only once one of you makes new commits that the other hasn't fetched."></Quiz>

  

              </div>
            );
          case 's1-l2':
            return (
              <div>
                
  <h2>The Three-Tree Architecture <span className="badge beginner">Beginner</span></h2>
  <p className="subtitle">Stage 1 · Foundations — the model that makes every git command make sense</p>

  <ConceptBox title="Why this matters">
     Every confusing Git command — <code>git reset</code>, <code>git checkout</code>, <code>git restore</code> — becomes obvious once you understand that Git manages three separate "trees" (versions of your project) at all times. Commands move content between these trees in different ways. People who skip this step spend years being confused.
  </ConceptBox>

  <div className="diagram">
┌─────────────────────────────────────────────────────────┐
│                 YOUR THREE TREES                        │
│                                                         │
│  Working           Staging Area         Repository      │
│  Directory         (Index)              (.git/objects)  │
│                                                         │
│  [ files you    ]  [ files you've    ]  [ committed     │
│  [ edit daily   ]  [ git add'd       ]  [ snapshots     │
│                 ]  [ but not yet     ]  [ permanent     │
│                 ]  [ committed       ]  [ SHA-1 hashes] │
│                                                         │
│   git add ──────────────►                              │
│                           git commit ──────────────►   │
│   git restore ◄───────────                             │
│   git restore --staged ◄── (unstage)                   │
│   git checkout / reset ◄──────────────────────────     │
└─────────────────────────────────────────────────────────┘</div>

  <h3>Why the staging area exists</h3>
  <p>You changed 8 files to fix a bug, but 3 of them are unrelated cleanup you did along the way. The staging area lets you craft a commit from exactly the right files — or even the right <em>lines within a file</em> — without committing everything at once. This is what separates a readable commit history from a noise dump.</p>

  <TipBox title="📍 Where to run"> Any directory. These commands inspect state — they won't change anything.</TipBox>
<CodeBlock code={`# See all three trees at once
git status              # what's different between working dir, staging, and HEAD
git diff                # working dir vs staging area
git diff --staged       # staging area vs last commit (HEAD)
git diff HEAD           # working dir vs last commit (combines both)`} title="Terminal"></CodeBlock>

  <Quiz question="You run git add app.py then immediately edit app.py again. What does git status show? What does git commit record?" answer="git status shows app.py in both 'changes to be committed' and 'changes not staged for commit' — because Git snapshotted the file's content at the time of git add. Running git commit would commit the first version (the one you staged). The second set of edits stays in the working directory, unstaged. This is why you should always check git diff --staged before committing."></Quiz>

  

              </div>
            );
          case 's1-l3':
            return (
              <div>
                
  <h2>Your First Repository <span className="badge beginner">Beginner</span></h2>
  <p className="subtitle">Stage 1 · Foundations — init, add, and the .git directory</p>

  <ConceptBox title="Why this matters">
     <code>git init</code> creates a hidden <code>.git/</code> folder that IS the repository. Everything — all history, all branches, all config — lives in there. Understanding this means you know that deleting <code>.git/</code> loses everything, that copying a repo is just copying that folder, and that <code>git clone</code> is just creating a new directory with a fresh <code>.git/</code> populated from a remote.
  </ConceptBox>

  <TipBox title="📍 Where to run"> WSL2 or macOS/Linux terminal. Create a fresh folder first — don't run this inside an existing repo.</TipBox>

<CodeBlock code={`# Create a new project
mkdir my-devops-notes &amp;&amp; cd my-devops-notes
git init
# Output: Initialized empty Git repository in .../my-devops-notes/.git/

# See what git created
ls -la .git/
# HEAD  config  description  hooks/  info/  objects/  refs/

# Create a file
echo '# My DevOps Notes' > README.md
echo 'Started learning Git on \$(date)' >> README.md

# Check status — git sees it but isn't tracking it yet
git status
# Untracked files: README.md

# Stage it
git add README.md

# Or stage everything (use carefully — see warning below)
git add .

# Check what you're about to commit
git diff --staged`} title="Terminal"></CodeBlock>

  <WarningBox>
    <strong>⚠️ Danger:</strong> <code>git add .</code> stages <em>everything</em> in your directory, including secrets, compiled binaries, and OS junk (<code>.DS_Store</code>, <code>node_modules/</code>). Always have a <code>.gitignore</code> before using it. Committing a private key or API token to a repo — even a "private" one you later make public — is a security incident. GitHub's secret scanning will find it. The fix is always painful (key rotation + history rewrite).
  </WarningBox>

<CodeBlock code={`# Create a .gitignore BEFORE git add .
cat > .gitignore << 'EOF'
# OS files
.DS_Store
Thumbs.db

# Editor
.vscode/
.idea/

# Secrets (never commit these)
.env
*.pem
*.key
secrets/

# Build artifacts
node_modules/
__pycache__/
*.pyc
dist/
EOF

git add .gitignore README.md`} title="Terminal"></CodeBlock>

  <ErrorCard error="⚠️ Accidentally staged a file you shouldn't have" meaning="Changes to be committed:
  new file: .env" fix="Scenario: You ran git add . before creating .gitignore, and now .env (containing database passwords) is staged.
      Fix: git restore --staged .env — this removes it from staging back to your working directory without deleting the file. Then add .env to your .gitignore before your next git add .. If you already committed it: see Stage 4 (reset/revert) and rotate any secrets immediately."></ErrorCard>

  

              </div>
            );
          case 's1-l4':
            return (
              <div>
                
  <h2>Staging, Committing &amp; Reading History <span className="badge beginner">Beginner</span></h2>
  <p className="subtitle">Stage 1 · Foundations — the day-to-day loop and writing commits that help future-you</p>

  <ConceptBox title="Why this matters">
     A commit message is a letter to your future self (and teammates) explaining not what the code does — they can read the diff for that — but <em>why</em> you made the change. "Fix bug" is useless at 2am when you're debugging. "Fix null pointer when user has no shipping address (order #4821)" is what saves your night.
  </ConceptBox>

  <TipBox title="📍 Where to run"> Inside your <code>my-devops-notes</code> project folder in your terminal.</TipBox>

<CodeBlock code={`# Make your first commit
git commit -m 'Initial commit: add README and .gitignore'

# For multi-line commit messages (opens your configured editor)
git commit

# Good commit message structure:
# Line 1: Short summary (50 chars), imperative mood ('Add' not 'Added')
# Line 2: blank
# Line 3+: Why this change, what problem it solves, any caveats

# Stage only specific parts of a file (interactive patch mode)
git add -p README.md
# Git shows each hunk and asks y/n/s (split) — powerful for surgical commits`} title="Terminal"></CodeBlock>

  <h3>Reading History Like a Pro</h3>
<CodeBlock code={`# Basic log
git log

# Compact, one line per commit — what you'll use 90% of the time
git log --oneline

# Graph view — essential once you have branches
git log --oneline --graph --all

# Find commits by author
git log --author='Raghu'

# Find commits that changed a specific file
git log --oneline -- app.py

# See what changed in a specific commit
git show a3f5c8d

# Who last touched each line of a file (great for blame/understanding)
git blame README.md`} title="Terminal"></CodeBlock>

  <Quiz question="Your team has 200 commits. You need to find the commit that introduced a specific function called calculate_tax(). You don't know who wrote it or when. What's the fastest Git command to find it?" answer="git log -S 'calculate_tax' --oneline — the -S flag (called the 'pickaxe') searches for commits that added or removed a string. It's different from greping the file because it searches the diff content across all history. Combine with --all to search all branches."></Quiz>

  

              </div>
            );
          case 's1-l5':
            return (
              <div>
                
  <h2>Stage 1 Capstone · Version-Controlled Project <span className="badge beginner">Beginner</span></h2>
  <p className="subtitle">Stage 1 · Foundations — build a real tracked project from scratch</p>

  <ConceptBox title="Project goal">
     Create a local Git repository for a simple DevOps runbook. You'll write meaningful commits, use <code>git add -p</code> to stage surgically, and end up with a clean, readable history.
  </ConceptBox>

  <TipBox title="📍 Where to run"> Terminal, inside a new folder. Every command below runs in sequence.</TipBox>

<CodeBlock code={`# 1. Set up the project
mkdir devops-runbook &amp;&amp; cd devops-runbook
git init
git config user.name 'Your Name'   # if not set globally
git config user.email 'you@example.com'`} title="Terminal"></CodeBlock>

<CodeBlock code={`# 2. Create .gitignore first — always
cat > .gitignore << 'EOF'
.DS_Store
.env
*.log
EOF
git add .gitignore
git commit -m 'Add .gitignore'`} title="Terminal"></CodeBlock>

<CodeBlock code={`# 3. Create README
cat > README.md << 'EOF'
# DevOps Runbook

Operational procedures for the production infrastructure.

## Contents
- deployment.md — how to deploy the app
- rollback.md — how to rollback safely
EOF
git add README.md
git commit -m 'Add README with runbook structure'`} title="Terminal"></CodeBlock>

<CodeBlock code={`# 4. Add deployment procedure
cat > deployment.md << 'EOF'
# Deployment Procedure

## Prerequisites
- Docker 24+ installed on target server
- Access to container registry

## Steps
1. Pull latest image: docker pull registry/app:latest
2. Stop current: docker stop app-prod
3. Start new: docker run -d --name app-prod registry/app:latest
4. Verify health: curl http://localhost:8080/health
EOF
git add deployment.md
git commit -m 'Add deployment procedure with Docker steps'`} title="Terminal"></CodeBlock>

<CodeBlock code={`# 5. Add rollback procedure (separate commit — separate concern)
cat > rollback.md << 'EOF'
# Rollback Procedure

## When to use this
Container healthcheck fails after deploy, or error rate spikes > 5%.

## Steps
1. Identify previous tag: docker images registry/app --format '{{.Tag}}'
2. Stop current: docker stop app-prod &amp;&amp; docker rm app-prod
3. Start previous: docker run -d --name app-prod registry/app:v1.2.3
4. Confirm: curl http://localhost:8080/health
EOF
git add rollback.md
git commit -m 'Add rollback procedure with Docker commands'`} title="Terminal"></CodeBlock>

<CodeBlock code={`# 6. Verify your history looks clean and meaningful
git log --oneline
# Should show 4 commits, each with a clear purpose:
# e.g.:
# f9a1b3c Add rollback procedure with Docker commands
# 4d2e8a1 Add deployment procedure with Docker steps
# 7c3f5b2 Add README with runbook structure
# a1e9d4f Add .gitignore`} title="Terminal"></CodeBlock>

  <div className="g-checklist"><ul classname="g-checklist"><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="git-cb-s1-l5-0" /><label htmlfor="git-cb-s1-l5-0">I understand what the three trees (working dir, staging, repo) are and how data moves between them</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="git-cb-s1-l5-1" /><label htmlfor="git-cb-s1-l5-1">I can initialise a repo, write a .gitignore, and stage files selectively</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="git-cb-s1-l5-2" /><label htmlfor="git-cb-s1-l5-2">I write commit messages that explain why a change was made, not just what</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="git-cb-s1-l5-3" /><label htmlfor="git-cb-s1-l5-3">I can read history with git log --oneline --graph --all</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="git-cb-s1-l5-4" /><label htmlfor="git-cb-s1-l5-4">I can use git log -S "string" to find when specific code was introduced</label></li></ul></div>

  

              </div>
            );
          case 's2-l1':
            return (
              <div>
                
  <h2>Branches — What They Really Are <span className="badge intermediate">Intermediate</span></h2>
  <p className="subtitle">Stage 2 · Branching &amp; Merging — branches are pointers, not copies</p>

  <ConceptBox title="Why this matters">
     Most people think of branches as "copies of the code." They're not — a branch is just a text file containing a 40-character SHA-1 hash (the commit it points to). Creating a branch takes microseconds and zero disk space. This is why Git branches are so cheap to make and why you should make them for every change, no matter how small.
  </ConceptBox>

  <div className="diagram">
        main ──► a3f5c8d ◄── HEAD
                     │
              (parent)
                     │
                  7c1e4b2
                     │
                  2d3f9a1

After: git branch feature/login

        main ──► a3f5c8d ◄── HEAD (still on main)
                     │
feature/login ───────┘

After: git checkout feature/login

        main ──► a3f5c8d
                     │
feature/login ───────┘ ◄── HEAD

After: git commit (on feature/login)

        main ──► a3f5c8d
                     │
                  f4b2e9a ◄── feature/login ◄── HEAD</div>

  <TipBox title="📍 Where to run"> Inside any Git repository in your terminal.</TipBox>

<CodeBlock code={`# Create and switch to a branch in one command (preferred modern way)
git switch -c feature/login

# Or the classic way (both work)
git checkout -b feature/login

# List all branches — current branch marked with *
git branch

# List all branches including remotes
git branch -a

# Switch branches
git switch main
git switch feature/login

# See where all branches point
git log --oneline --graph --all --decorate

# Rename a branch
git branch -m old-name new-name

# Delete a fully merged branch
git branch -d feature/login

# Force delete (even if unmerged — you're sure you don't need it)
git branch -D feature/login`} title="Terminal"></CodeBlock>

  <Quiz question="You're on feature/login and run git branch -d main. What happens? Is anything lost?" answer="Git deletes the main pointer (the branch label), but the commits themselves still exist in the object store — nothing is lost yet. You can re-create the branch with git branch main <sha>. Git only garbage-collects unreachable commits after 30 days (by default). This is also why the reflog (Stage 4) can save you from seemingly catastrophic mistakes."></Quiz>

  

              </div>
            );
          case 's2-l2':
            return (
              <div>
                
  <h2>Merging Strategies <span className="badge intermediate">Intermediate</span></h2>
  <p className="subtitle">Stage 2 · Branching &amp; Merging — fast-forward vs three-way merge, and when to use each</p>

  <ConceptBox title="Why this matters">
     Git has multiple merge strategies and picks automatically based on the situation. But "automatically" isn't always what you want. Understanding fast-forward vs. three-way merge means you can control your history shape — the difference between a clean linear log and a spaghetti graph of merge commits.
  </ConceptBox>

  <div className="diagram">
─── Fast-Forward Merge (main hasn't moved since branch was created) ───

Before:  main ──► A ──► B
                         └──► C ──► D ◄── feature

After git merge feature:
         main ──────────────────────────► D ◄── feature
         (no merge commit — history stays linear)

─── Three-Way Merge (main has new commits) ────────────────────────────

Before:  main ──► A ──► B ──► E
                         └──► C ──► D ◄── feature

After git merge feature:
         main ──► A ──► B ──► E ──► M ◄── main
                          └──► C ──► D ┘
         M = merge commit (has 2 parents)</div>

  <TipBox title="📍 Where to run"> Inside your Git repo, after creating and working on a feature branch.</TipBox>

<CodeBlock code={`# Set up a scenario
git switch -c feature/add-monitoring
echo '## Monitoring: use Prometheus/Grafana stack' >> README.md
git add README.md
git commit -m 'Add monitoring section to README'

# Merge back to main — fast-forward (if main hasn't moved)
git switch main
git merge feature/add-monitoring
# 'Fast-forward' — no merge commit, clean linear history

# Force a merge commit even when fast-forward is possible
# (useful for traceability — you can see when a feature landed)
git merge --no-ff feature/add-monitoring -m 'Merge feature/add-monitoring'

# See the result
git log --oneline --graph`} title="Terminal"></CodeBlock>

  <WarningBox>
    <strong>⚠️ Never merge directly to main from your local machine in a team environment.</strong> You bypass code review, break protected branch rules, and risk pushing broken code to production. Always open a Pull Request. The merge commands above are for understanding the mechanism — in practice, the merge happens on the server after review.
  </WarningBox>

  

              </div>
            );
          case 's2-l3':
            return (
              <div>
                
  <h2>Resolving Merge Conflicts <span className="badge intermediate">Intermediate</span></h2>
  <p className="subtitle">Stage 2 · Branching &amp; Merging — conflicts are Git asking for your judgment</p>

  <ConceptBox title="Why this matters">
     A merge conflict is NOT Git failing — it's Git saying "two people changed the same part of the same file in different ways, and I can't decide which one is correct. You decide." Conflicts are normal on active teams. The goal isn't to avoid them; it's to resolve them correctly and quickly.
  </ConceptBox>

  <TipBox title="📍 Where to run"> Terminal inside your repo. You'll create an intentional conflict to practice.</TipBox>

<CodeBlock code={`# Create a conflict scenario
git switch main
echo 'Server: nginx' > config.txt
git add config.txt &amp;&amp; git commit -m 'Set server to nginx'

git switch -c feature/apache
echo 'Server: apache' > config.txt
git add config.txt &amp;&amp; git commit -m 'Switch server to apache'

git switch main
git merge feature/apache
# CONFLICT (content): Merge conflict in config.txt`} title="Terminal"></CodeBlock>

<CodeBlock code={`# The conflict markers Git adds to the file:
cat config.txt

<<<<<<< HEAD
Server: nginx
=======
Server: apache
>>>>>>> feature/apache
`} title="Terminal"></CodeBlock>

  <p>The section between <code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD</code> and <code>=======</code> is what's on your current branch. Below <code>=======</code> is what's coming in from the other branch.</p>

<CodeBlock code={`# Resolve: manually edit the file to the desired state
echo 'Server: nginx  # keeping nginx, apache was wrong choice' > config.txt

# Mark conflict as resolved by staging the file
git add config.txt

# Complete the merge
git commit -m 'Merge feature/apache — kept nginx (see ticket #123)'

# If you want to abort mid-conflict and go back to before the merge
git merge --abort`} title="Terminal"></CodeBlock>

  <h3>Merge Tools (for complex conflicts)</h3>
<CodeBlock code={`# Configure VS Code as your merge tool
git config --global merge.tool vscode
git config --global mergetool.vscode.cmd 'code --wait \$MERGED'

# Launch the merge tool for all conflicted files
git mergetool`} title="Terminal"></CodeBlock>

  <ErrorCard error="⚠️ Committed with conflict markers still in file" meaning="<<<<<<< HEAD
Server: nginx
=======
Server: apache
>>>>>>> feature/apache" fix="Scenario: You ran git add . and git commit without looking at the file, and now the raw conflict markers are in production code. Tests fail. The build breaks.
      Fix: Immediately run git revert HEAD to create a new commit that undoes the bad one (safe on shared branches). Then resolve the conflict properly on a new branch. To prevent this: set up a pre-commit hook that greps for <<<<<<< (covered in Stage 5)."></ErrorCard>

  

              </div>
            );
          case 's2-l4':
            return (
              <div>
                
  <h2>Rebasing Without Fear <span className="badge intermediate">Intermediate</span></h2>
  <p className="subtitle">Stage 2 · Branching &amp; Merging — the clean-history alternative to merging</p>

  <ConceptBox title="Why this matters">
     Rebasing moves your branch's commits to start from the tip of another branch — it replays them one by one as if you'd branched off later. The result is a perfectly linear history with no merge commits. It's preferred by teams that value a clean, readable git log. The danger is real: rebasing rewrites commit SHA-1 hashes, so <strong>never rebase commits that others have based work on.</strong>
  </ConceptBox>

  <div className="diagram">
─── Before Rebase ──────────────────────────────────────────────────

main:     A ──► B ──► C ──► D
                 └──► X ──► Y ◄── feature (branched off B)

─── After: git switch feature &amp;&amp; git rebase main ───────────────────

main:     A ──► B ──► C ──► D
                              └──► X' ──► Y' ◄── feature
          (X and Y are REPLAYED after D with new SHA-1s)

─── After: git switch main &amp;&amp; git merge feature (fast-forward) ─────

main:     A ──► B ──► C ──► D ──► X' ──► Y' ◄── main, feature</div>

  <TipBox title="📍 Where to run"> Terminal, on your feature branch. Never rebase <code>main</code> or any branch others are working on.</TipBox>

<CodeBlock code={`# The safe rebase workflow

# 1. Update main
git switch main
git pull origin main

# 2. Switch to your feature branch
git switch feature/login

# 3. Rebase onto main
git rebase main

# If there are conflicts during rebase:
# Fix the conflict, then:
git add <conflicted-file>
git rebase --continue

# Or bail out entirely
git rebase --abort

# 4. After successful rebase, push (force push required since SHA changed)
git push --force-with-lease origin feature/login
# --force-with-lease is safer than --force: it checks nobody else pushed`} title="Terminal"></CodeBlock>

  <WarningBox>
    <strong>⚠️ The Golden Rule of Rebasing:</strong> Never rebase a branch that has been pushed and is being worked on by others. If someone based their work on <code>feature/login</code> before you rebased it, their history now diverges from yours (different SHA-1s for the same logical commits). They'll face confusing conflicts. Safe rule: only rebase local commits that haven't been pushed, or branches you own alone.
  </WarningBox>

  <Quiz question="Your team is debating: should we merge or rebase feature branches before merging to main? What are the actual tradeoffs, not just 'rebase is cleaner'?" answer="Merge (--no-ff): preserves the true history — you can see exactly when a feature was integrated and what was happening in main at that time. Merge commits act as waypoints. Downside: the log becomes a graph, not a line, which is harder to bisect.Rebase: produces a clean linear history that's easier to git bisect and git log. Downside: rewrites history (new SHAs), so you lose the 'real' timeline of when things were actually developed.Team choice matters more than technical superiority. Whatever your team picks, enforce it consistently. Mixed approaches cause the most confusion."></Quiz>

  

              </div>
            );
          case 's2-l5':
            return (
              <div>
                
  <h2>Stage 2 Capstone · Feature Branch Lifecycle <span className="badge intermediate">Intermediate</span></h2>
  <p className="subtitle">Stage 2 · Branching &amp; Merging — full branch → rebase → merge workflow</p>

  <ConceptBox title="Project goal">
     Simulate a complete feature development cycle on the <code>devops-runbook</code> project: create a feature branch, make commits, simulate main moving forward, rebase cleanly, and merge.
  </ConceptBox>

  <TipBox title="📍 Where to run"> Inside your <code>devops-runbook</code> project folder.</TipBox>

<CodeBlock code={`# 1. Ensure you're on main with a clean state
git switch main
git status  # should show 'nothing to commit'

# 2. Create a feature branch
git switch -c feature/add-ci-guide

# 3. Do your work
cat > ci-guide.md << 'EOF'
# CI/CD Guide

## Pipeline stages
1. Lint — check code style
2. Test — run unit tests
3. Build — docker build
4. Push — push to registry
5. Deploy — trigger deployment
EOF
git add ci-guide.md
git commit -m 'Add initial CI/CD pipeline guide'

echo '## Rollback from CI' >> ci-guide.md
git add ci-guide.md
git commit -m 'Add CI rollback notes to CI guide'

# 4. Simulate main moving forward (teammate merged something)
git switch main
echo '## Alerting: PagerDuty integration' >> README.md
git add README.md
git commit -m 'Add alerting section to README'

# 5. Rebase your feature onto the updated main
git switch feature/add-ci-guide
git rebase main
# 'Successfully rebased and updated refs/heads/feature/add-ci-guide'

# 6. Check the history — should be linear
git log --oneline --graph --all

# 7. Merge feature into main (fast-forward now possible)
git switch main
git merge --no-ff feature/add-ci-guide -m 'Merge feature/add-ci-guide: add CI/CD guide'

# 8. Clean up the branch
git branch -d feature/add-ci-guide

# 9. Final check
git log --oneline --graph`} title="Terminal"></CodeBlock>

  <div className="g-checklist"><ul classname="g-checklist"><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="git-cb-s2-l5-0" /><label htmlfor="git-cb-s2-l5-0">I understand a branch is a pointer (40-char SHA), not a copy of the codebase</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="git-cb-s2-l5-1" /><label htmlfor="git-cb-s2-l5-1">I can create, switch, rename, and delete branches confidently</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="git-cb-s2-l5-2" /><label htmlfor="git-cb-s2-l5-2">I can resolve merge conflicts manually and know when to use git merge --abort</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="git-cb-s2-l5-3" /><label htmlfor="git-cb-s2-l5-3">I understand when rebase is safe vs dangerous (the Golden Rule)</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="git-cb-s2-l5-4" /><label htmlfor="git-cb-s2-l5-4">I use --force-with-lease instead of --force when force-pushing rebased branches</label></li></ul></div>

  

              </div>
            );
          case 's3-l1':
            return (
              <div>
                
  <h2>Remotes, Push &amp; Pull <span className="badge intermediate">Intermediate</span></h2>
  <p className="subtitle">Stage 3 · Remote Collaboration — connecting your local repo to the world</p>

  <ConceptBox title="Why this matters">
     A "remote" is just a name for a URL. When you <code>git clone</code>, Git automatically creates a remote called <code>origin</code> pointing to where you cloned from. There's nothing magic about <code>origin</code> — it's a convention. You can have multiple remotes (e.g. <code>origin</code> for your fork, <code>upstream</code> for the main project). Understanding this makes fork-based contribution workflows make sense.
  </ConceptBox>

  <TipBox title="📍 Where to run"> Terminal. You'll need a GitHub account and SSH key set up (see Prerequisites in Overview).</TipBox>

<CodeBlock code={`# Push existing local repo to a new GitHub repo
# (Create the repo on GitHub first — empty, no README)

cd devops-runbook
git remote add origin git@github.com:yourusername/devops-runbook.git
git remote -v  # verify

# Push and set upstream tracking
git push -u origin main
# -u sets the upstream: after this, plain 'git push' and 'git pull' work`} title="Terminal"></CodeBlock>

<CodeBlock code={`# Day-to-day remote commands

# Push your branch to remote
git push origin feature/add-ci-guide

# Pull = fetch + merge (updates your current branch from its upstream)
git pull

# Pull with rebase instead of merge (keeps history cleaner)
git pull --rebase

# Show all remote branches
git branch -r

# Check out a remote branch locally
git switch -t origin/feature/some-feature

# Delete a remote branch (when you're done with a PR)
git push origin --delete feature/add-ci-guideCopy`} title="Terminal"></CodeBlock>

  <ErrorCard error="⚠️ Rejected push — remote has commits you don't have" meaning="! [rejected] main -> main (fetch first)
error: failed to push some refs to 'git@github.com:...'
hint: Updates were rejected because the remote contains work that you do not have locally." fix="Scenario: A teammate pushed to main while you were working. Your local main is behind and Git won't let you overwrite their work.
      Fix: git pull --rebase origin main (or git pull) to integrate their work first. Resolve any conflicts, then push. Never use git push --force on main — you'd overwrite your teammate's commits."></ErrorCard>

  

              </div>
            );
          case 's3-l2':
            return (
              <div>
                
  <h2>Pull Requests &amp; Code Review Flow <span className="badge intermediate">Intermediate</span></h2>
  <p className="subtitle">Stage 3 · Remote Collaboration — the workflow every team uses</p>

  <ConceptBox title="Why this matters">
     A Pull Request (GitHub) or Merge Request (GitLab) is not a Git feature — it's a collaboration workflow built on top of Git by the hosting platform. It gives your team a place to review code, run automated checks, and discuss changes before anything reaches main. This is the standard unit of work in professional software teams.
  </ConceptBox>

  <div className="diagram">
Developer workflow (fork model — open source)
──────────────────────────────────────────────
upstream/main ──► fork/main ──► fork/feature ──► PR ──► upstream/main

Team workflow (branch model — most companies)
──────────────────────────────────────────────
origin/main ──► origin/feature/x ──► PR ──► origin/main
                (your branch)         (code review)  (merge after approval)</div>

  <TipBox title="📍 Where to run"> Terminal for Git commands, GitHub UI for the PR itself.</TipBox>

<CodeBlock code={`# The complete PR workflow

# 1. Create a feature branch from an up-to-date main
git switch main &amp;&amp; git pull
git switch -c feature/improve-deployment-doc

# 2. Make changes with meaningful commits
# (edit deployment.md to add health check details)
git add deployment.md
git commit -m 'Add health check endpoint details to deployment doc'

# 3. Push the branch to origin
git push -u origin feature/improve-deployment-doc

# 4. GitHub will show a banner: 'Compare &amp; pull request' — click it
#    Or use GitHub CLI if installed:

gh pr create --title 'Improve deployment doc' --body 'Adds health check details and clarifies step 4'

# 5. While waiting for review, keep your branch up to date
git fetch origin
git rebase origin/main  # if main moved forward
git push --force-with-lease origin feature/improve-deployment-doc

# 6. After PR is approved and merged on GitHub, clean up locally
git switch main
git pull
git branch -d feature/improve-deployment-docCopy`} title="Terminal"></CodeBlock>

  <Quiz question="Your PR has been approved but the CI pipeline is failing because main has moved and now has a conflict with your branch. What do you do — and in what order?" answer="1. git fetch origin to get latest main. 2. git rebase origin/main on your feature branch to replay your commits on top. 3. Resolve any conflicts during the rebase. 4. git push --force-with-lease to update the PR branch. 5. The CI pipeline re-runs automatically on the new push. Never merge a PR when CI is failing — even with approval. The approval was for the logic, not for the broken build state."></Quiz>

  

              </div>
            );
          case 's3-l3':
            return (
              <div>
                
  <h2>Fetch vs Pull vs Sync <span className="badge intermediate">Intermediate</span></h2>
  <p className="subtitle">Stage 3 · Remote Collaboration — understanding what git pull actually does</p>

  <ConceptBox title="Why this matters">
     <code>git pull</code> is <code>git fetch</code> + <code>git merge</code> in one command. That's convenient — until it creates an unwanted merge commit on your local main branch. Many engineers use <code>git fetch</code> followed by a manual decision (rebase or merge) to stay in control of what happens.
  </ConceptBox>

<CodeBlock code={`# git fetch: downloads all new remote objects — changes NOTHING locally
git fetch origin
# Now you can inspect without touching your local branches:
git log origin/main --oneline   # see what changed remotely
git diff HEAD origin/main       # diff your current branch vs remote main

# Then decide how to integrate:
git merge origin/main   # creates merge commit if histories diverged
# OR
git rebase origin/main  # replay your commits on top (cleaner)

# git pull --rebase is the best default for keeping local branches clean
git pull --rebase

# Set this globally so git pull always rebases:
git config --global pull.rebase true

# Fetch ALL remotes at once (useful in fork workflows)
git fetch --allCopy`} title="Terminal"></CodeBlock>

  

              </div>
            );
          case 's3-l4':
            return (
              <div>
                
  <h2>Working with Tags &amp; Releases <span className="badge intermediate">Intermediate</span></h2>
  <p className="subtitle">Stage 3 · Remote Collaboration — marking versions in your history</p>

  <ConceptBox title="Why this matters">
     A tag is like a branch that never moves — a permanent label on a commit. Every software release should have a tag. When your Docker image build pipeline triggers on a Git tag (e.g. <code>v1.4.2</code>), teams can trace exactly which code is running in production just from the image version.
  </ConceptBox>

<CodeBlock code={`# Lightweight tag (just a pointer, no message)
git tag v1.0.0

# Annotated tag — preferred for releases (has author, date, message)
git tag -a v1.0.0 -m 'Release v1.0.0: initial production deployment'

# Tag a specific past commit
git tag -a v0.9.0 a3f5c8d -m 'Beta release'

# List all tags
git tag
git tag -l 'v1.*'  # filter

# Show tag details
git show v1.0.0

# Push tags to remote (git push doesn't push tags by default)
git push origin v1.0.0
git push origin --tags   # push ALL tags

# Delete a tag locally and remotely
git tag -d v1.0.0-bad
git push origin --delete v1.0.0-badCopy`} title="Terminal"></CodeBlock>

  <TipBox title="📍 Semantic versioning convention"> Use <code>v&#123;MAJOR&#125;.&#123;MINOR&#125;.&#123;PATCH&#125;</code>. MAJOR = breaking change, MINOR = new feature (backwards compatible), PATCH = bug fix. Your CI/CD pipeline (Jenkins or GitHub Actions) can trigger Docker builds automatically when a new tag matching <code>v*</code> is pushed. Just like you tagged Docker images for rollback, you tag Git commits for the same reason — so you can always find "exactly what was deployed."</TipBox>

  

              </div>
            );
          case 's3-l5':
            return (
              <div>
                
  <h2>Stage 3 Capstone · Collaborative Repo with PR <span className="badge intermediate">Intermediate</span></h2>
  <p className="subtitle">Stage 3 · Remote Collaboration — full remote workflow end to end</p>

  <TipBox title="📍 Where to run"> Terminal + GitHub UI. You need a GitHub account.</TipBox>

<CodeBlock code={`# 1. Push devops-runbook to GitHub (if not done yet)
cd devops-runbook
git remote add origin git@github.com:yourusername/devops-runbook.git
git push -u origin main

# 2. Create a feature branch and add content
git switch -c feature/add-kubernetes-guide
cat > kubernetes-basics.md << 'EOF'
# Kubernetes Basics

## Key concepts
- Pod: smallest deployable unit (1+ containers)
- Deployment: manages replica sets and rolling updates
- Service: stable network endpoint for pods

## Quick commands
kubectl get pods
kubectl describe pod <name>
kubectl logs <pod-name> --tail=100 -f
EOF
git add kubernetes-basics.md
git commit -m 'Add Kubernetes basics reference'
git push -u origin feature/add-kubernetes-guide

# 3. On GitHub: open a Pull Request
#    Title: 'Add Kubernetes basics reference guide'
#    Body: 'Adds key concepts and quick commands for K8s debugging'
#    Have a teammate (or yourself, second account) leave a review comment

# 4. Address review feedback
echo '' >> kubernetes-basics.md
echo '## Relation to Docker' >> kubernetes-basics.md
echo 'Kubernetes orchestrates Docker containers — it handles scheduling,' >> kubernetes-basics.md
echo 'scaling, and healing the containers you built with Docker.' >> kubernetes-basics.md
git add kubernetes-basics.md
git commit -m 'Address review: add Docker relationship explanation'
git push

# 5. Merge PR on GitHub (Squash and merge or Create merge commit)
# 6. Sync your local main
git switch main &amp;&amp; git pull
git branch -d feature/add-kubernetes-guide

# 7. Tag the release
git tag -a v1.1.0 -m 'Release v1.1.0: add Kubernetes reference'
git push origin v1.1.0Copy`} title="Terminal"></CodeBlock>

  <div className="g-checklist"><ul classname="g-checklist"><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="git-cb-s3-l5-0" /><label htmlfor="git-cb-s3-l5-0">I can add a remote, push an initial branch, and set upstream tracking</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="git-cb-s3-l5-1" /><label htmlfor="git-cb-s3-l5-1">I understand the PR lifecycle: branch → push → review → address feedback → merge → clean up</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="git-cb-s3-l5-2" /><label htmlfor="git-cb-s3-l5-2">I use git fetch + manual rebase instead of blind git pull on active branches</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="git-cb-s3-l5-3" /><label htmlfor="git-cb-s3-l5-3">I can create annotated tags and push them to trigger CI/CD pipelines</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="git-cb-s3-l5-4" /><label htmlfor="git-cb-s3-l5-4">I never force-push to main or shared branches</label></li></ul></div>

  

              </div>
            );
          case 's4-l1':
            return (
              <div>
                
  <h2>Amend, Reset &amp; Revert <span className="badge advanced">Advanced</span></h2>
  <p className="subtitle">Stage 4 · Rewriting History — the safe vs unsafe toolkit</p>

  <ConceptBox title="Why this matters">
     The single biggest source of Git-related panic is accidentally destroying commits. Before touching these commands, internalize one rule: <strong>amend and reset rewrite history (dangerous on shared branches); revert creates a new commit undoing past work (always safe).</strong> The right tool depends entirely on whether others have your commits.
  </ConceptBox>

  <div className="diagram">
SAFETY MATRIX
──────────────────────────────────────────────────────────
Command            | Rewrites SHA? | Safe on shared branch?
───────────────────┼───────────────┼────────────────────────
git commit --amend | YES           | NO (only if not pushed)
git reset --soft   | YES           | NO
git reset --mixed  | YES           | NO
git reset --hard   | YES           | NO
git revert         | NO            | YES (always safe)
──────────────────────────────────────────────────────────</div>

  <TipBox title="📍 Where to run"> Inside your repo. Test these on a throwaway branch if nervous.</TipBox>

<CodeBlock code={`# ── git commit --amend ──
# Fix the LAST commit: change message OR add forgotten file
git add forgotten-file.md
git commit --amend -m 'Better commit message, and add forgotten file'
# Warning: this creates a new SHA — don't amend already-pushed commits

# ── git reset ──
# --soft: move HEAD back, keep changes in staging area
git reset --soft HEAD~1   # undo last commit, keep staged

# --mixed (default): move HEAD back, keep changes in working dir only
git reset HEAD~1          # undo last commit, keep files edited

# --hard: move HEAD back, DISCARD all changes (destructive)
git reset --hard HEAD~1   # you WILL lose uncommitted work
git reset --hard origin/main  # reset to exactly match remote

# ── git revert ── (the safe one — always use on shared branches)
# Creates a NEW commit that undoes a specific commit's changes
git revert a3f5c8d         # reverts specific commit
git revert HEAD            # reverts last commit
git revert HEAD~3..HEAD    # reverts last 3 commitsCopy`} title="Terminal"></CodeBlock>

  <WarningBox>
    <strong>⚠️ <code>git reset --hard</code> destroys uncommitted work forever.</strong> It's the one Git command that loses data by design. Always run <code>git status</code> and <code>git stash</code> before using it. If you reset and lose work you needed, immediately check <code>git reflog</code> (next lab) — you likely can recover it within 30 days.
  </WarningBox>

  <ErrorCard error="⚠️ Production incident: accidentally reset --hard on a shared branch" meaning="HEAD is now at 7c1e4b2 Three commits behind main — teammate's work is gone" fix="Scenario: A developer ran git reset --hard HEAD~3 on main and force-pushed. Three teammates' merged commits vanished from the branch. This was a real incident at multiple companies.
      Fix: Immediately run git reflog to find the SHA before the reset, then git reset --hard <that-sha> and force-push with care. Prevention: enable branch protection rules on GitHub that block force pushes to main. Require PRs. This is a policy problem, not a Git problem."></ErrorCard>

  

              </div>
            );
          case 's4-l2':
            return (
              <div>
                
  <h2>Interactive Rebase — Sculpting Commits <span className="badge advanced">Advanced</span></h2>
  <p className="subtitle">Stage 4 · Rewriting History — turn your messy WIP commits into a clean story</p>

  <ConceptBox title="Why this matters">
     During development, your commits look like: "WIP", "fix typo", "actually fix it", "argh fix for real", "done". Before opening a PR, you can rewrite all of that into logical, atomic commits that tell a clear story. This is what senior engineers mean when they say "clean up your commits before review."
  </ConceptBox>

  <TipBox title="📍 Where to run"> On your feature branch, before pushing (or before asking for review). Interactive rebase is safest on commits that haven't been pushed yet.</TipBox>

<CodeBlock code={`# Set up a messy history to clean up
git switch -c practice/rebase-demo
echo 'feature A' > feature-a.txt &amp;&amp; git add . &amp;&amp; git commit -m 'WIP'
echo 'feature A fixed' > feature-a.txt &amp;&amp; git add . &amp;&amp; git commit -m 'fix typo'
echo 'feature B' > feature-b.txt &amp;&amp; git add . &amp;&amp; git commit -m 'add B'
echo 'feature A final' > feature-a.txt &amp;&amp; git add . &amp;&amp; git commit -m 'actually done'

git log --oneline
# 4 messy commits — let's clean them into 2 logical ones

# Open interactive rebase for last 4 commits
git rebase -i HEAD~4Copy`} title="Terminal"></CodeBlock>

<CodeBlock code={`# Your editor opens with something like:
#
# pick a1b2c3 WIP
# pick d4e5f6 fix typo
# pick 7g8h9i add B
# pick j0k1l2 actually done
#
# Change to:
#
# pick a1b2c3 WIP           ← keep as base, then rename
# fixup d4e5f6 fix typo     ← squash into above, discard its message
# fixup j0k1l2 actually done ← squash into above too
# pick 7g8h9i add B          ← keep as separate commit
#
# Rebase commands:
# p/pick   = use commit as-is
# r/reword = use commit but edit message
# s/squash = meld into previous commit (keep message)
# f/fixup  = meld into previous commit (discard message)
# d/drop   = remove commit entirelyCopy`} title="Terminal"></CodeBlock>

  <Quiz question="You have 5 commits on your feature branch. You want to combine commits 2 and 3 but keep 1, 4, and 5 separate. What interactive rebase command sequence produces this?" answer="Run git rebase -i HEAD~5. In the editor, leave commit 1 as pick. Change commit 3 to fixup or squash (it will merge into commit 2 which stays as pick). Leave commits 4 and 5 as pick. The order in the rebase editor is oldest-first (top = oldest), so commit 2 must appear above commit 3 for the squash to work correctly."></Quiz>

  

              </div>
            );
          case 's4-l3':
            return (
              <div>
                
  <h2>Cherry-Pick &amp; Stash <span className="badge advanced">Advanced</span></h2>
  <p className="subtitle">Stage 4 · Rewriting History — surgical commit moves and saving unfinished work</p>

  <ConceptBox title="Why this matters">
     Cherry-pick lets you copy a specific commit from one branch to another without merging the whole branch. It's the right tool when a bug fix lands in a feature branch but production needs it now, before the feature is ready. Stash is for when you need to quickly switch contexts without committing half-finished work.
  </ConceptBox>

<CodeBlock code={`── CHERRY-PICK ──

# Scenario: hotfix landed in feature/v2, production (main) needs it now
git log feature/v2 --oneline
# a3f5c8d Fix critical XSS vulnerability in user input  ← want this
# 7c1e4b2 Add new dashboard feature (not ready)

git switch main
git cherry-pick a3f5c8d
# Applies just that one commit's changes to main

# Cherry-pick a range of commits
git cherry-pick a3f5c8d^..f4b2e9a  # inclusive range

# Apply changes without creating a commit (review first)
git cherry-pick --no-commit a3f5c8dCopy`} title="Terminal"></CodeBlock>

<CodeBlock code={`── STASH ──

# Your manager needs you to switch to a hotfix branch NOW
# You have half-written changes you can't commit yet

git stash push -m 'WIP: adding monitoring to deployment script'

# List stashes
git stash list
# stash@{0}: On feature/v2: WIP: adding monitoring to deployment script

# Do your hotfix work on another branch...

# Come back and restore your work
git switch feature/v2
git stash pop       # apply and remove from stash stack
# OR
git stash apply stash@{0}  # apply but keep in stash (useful for applying to multiple branches)

# Stash only staged changes, leave unstaged alone
git stash push --staged -m 'staged changes only'

# Clear all stashes
git stash clearCopy`} title="Terminal"></CodeBlock>

  

              </div>
            );
          case 's4-l4':
            return (
              <div>
                
  <h2>Reflog — The Safety Net <span className="badge advanced">Advanced</span></h2>
  <p className="subtitle">Stage 4 · Rewriting History — recovering from "I just destroyed everything"</p>

  <ConceptBox title="Why this matters">
     The reflog is a local journal of every position HEAD has ever been at — even commits that no longer appear in your branch history because you rebased, reset, or amended them away. It's the closest thing Git has to an undo button, and it has saved countless engineers from career-limiting mistakes. By default, reflog entries are kept for 90 days.
  </ConceptBox>

  <TipBox title="📍 Where to run"> Terminal, inside your repo. The reflog is always there, always local — it doesn't push to remote.</TipBox>

<CodeBlock code={`# See your full movement history
git reflog
# Output example:
# a3f5c8d HEAD@{0}: commit: Add monitoring guide
# 7c1e4b2 HEAD@{1}: reset: moving to HEAD~1
# f9a1b3c HEAD@{2}: commit: WIP monitoring
# 4d2e8a1 HEAD@{3}: checkout: moving from main to feature/monitoring

# Recovery scenarios:

# 1. You ran git reset --hard and lost commits
git reflog                        # find the SHA before the reset
git reset --hard HEAD@{2}         # restore to that state

# 2. You deleted a branch
git reflog                        # find last commit on that branch
git branch recovered-branch a3f5c8d

# 3. You rebased and now need the pre-rebase commits
git reflog                        # find ORIG_HEAD (set by rebase)
git reset --hard ORIG_HEAD        # undo the rebase

# Reflog for a specific branch
git reflog show feature/monitoringCopy`} title="Terminal"></CodeBlock>

  <Quiz question="You ran git rebase -i HEAD~5, made a mistake, and want to completely undo the entire rebase. How do you restore your branch to exactly before the rebase started?" answer="Git sets ORIG_HEAD automatically before any rebase or merge — it points to exactly where HEAD was. Run git reset --hard ORIG_HEAD to restore your branch to its pre-rebase state. If ORIG_HEAD is no longer set (you did something else since), use git reflog to find the SHA from just before the rebase operation and git reset --hard <sha>."></Quiz>

  

              </div>
            );
          case 's4-l5':
            return (
              <div>
                
  <h2>Stage 4 Capstone · History Cleanup <span className="badge advanced">Advanced</span></h2>
  <p className="subtitle">Stage 4 · Rewriting History — transform messy WIP history into a clean narrative</p>

  <TipBox title="📍 Where to run"> Inside your <code>devops-runbook</code> repo, on a dedicated practice branch.</TipBox>

<CodeBlock code={`# 1. Create a messy feature branch (simulating real development)
git switch main
git switch -c feature/incident-runbook

echo '# Incident Response' > incident-response.md
git add . &amp;&amp; git commit -m 'WIP'

echo '## Severity Levels' >> incident-response.md
git add . &amp;&amp; git commit -m 'wip again'

echo '- P1: production down, all hands' >> incident-response.md
echo '- P2: degraded, on-call engineer' >> incident-response.md
git add . &amp;&amp; git commit -m 'add severity'

echo '- P3: minor, next business day' >> incident-response.md
git add . &amp;&amp; git commit -m 'fix: forgot P3'

echo '## On-Call Rotation' >> incident-response.md
echo 'Use PagerDuty for alerting (linked to Prometheus alerts)' >> incident-response.md
git add . &amp;&amp; git commit -m 'add on-call section'

git log --oneline
# 5 messy commitsCopy`} title="Terminal"></CodeBlock>

<CodeBlock code={`# 2. Clean up with interactive rebase
git rebase -i HEAD~5
# In editor, change to:
# reword [sha] WIP            ← keep but rename
# fixup  [sha] wip again      ← merge into above
# squash [sha] add severity   ← merge, keep message
# fixup  [sha] fix: forgot P3 ← merge into severity
# pick   [sha] add on-call section ← keep separate
#
# When editor prompts for new commit message, write:
# 'Add incident response guide with severity levels'

# 3. Verify the result — should be exactly 2 clean commits
git log --oneline
# Expected:
# abc1234 Add on-call rotation with PagerDuty reference
# def5678 Add incident response guide with severity levelsCopy`} title="Terminal"></CodeBlock>

<CodeBlock code={`# 4. Simulate a recovery scenario: 'accidentally' undo a commit
git reset --hard HEAD~1
git log --oneline  # on-call commit is 'gone'

# 5. Recover it using reflog
git reflog
# Find the SHA of the commit just before the reset
git reset --hard HEAD@{1}
git log --oneline  # on-call commit is backCopy`} title="Terminal"></CodeBlock>

  <div className="g-checklist"><ul classname="g-checklist"><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="git-cb-s4-l5-0" /><label htmlfor="git-cb-s4-l5-0">I know the safety matrix: which commands rewrite history vs create new commits</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="git-cb-s4-l5-1" /><label htmlfor="git-cb-s4-l5-1">I can use git rebase -i to squash, fixup, reword, and drop commits</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="git-cb-s4-l5-2" /><label htmlfor="git-cb-s4-l5-2">I can cherry-pick a specific commit to a different branch</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="git-cb-s4-l5-3" /><label htmlfor="git-cb-s4-l5-3">I use git stash push -m "description" with descriptive messages</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="git-cb-s4-l5-4" /><label htmlfor="git-cb-s4-l5-4">I can recover from a git reset --hard mistake using the reflog</label></li></ul></div>

  

              </div>
            );
          case 's5-l1':
            return (
              <div>
                
  <h2>Git Workflows at Scale <span className="badge expert">Expert</span></h2>
  <p className="subtitle">Stage 5 · Production Git — Gitflow vs Trunk-Based Development</p>

  <ConceptBox title="Why this matters">
     The branching workflow you choose determines how fast your team can ship, how often merge conflicts happen, and how quickly you can hot-patch production. There's no universally correct answer — but there is a right answer for your team size, deploy frequency, and product type.
  </ConceptBox>

  <h3>Gitflow</h3>
  <div className="diagram">
main ─────────────────────────────────────────────────────────► (prod)
   │                   ↑                      ↑
   ▼                   │                      │
hotfix ─────────────────┘               release/1.2 ──────────┘
                                             ↑
develop ──────────────────────────────────────────────────────►
            ↑         ↑           ↑
   feature/login  feature/payments  feature/settings</div>

  <p><strong>Gitflow</strong> uses long-lived <code>develop</code> and <code>main</code> branches, with feature/release/hotfix branches. It was designed for software shipped in scheduled releases (mobile apps, packaged software).</p>
  <p><strong>When it works:</strong> versioned releases, mobile apps, libraries. <strong>When it fails:</strong> teams deploying multiple times per day — too much merge friction, too many long-lived branches.</p>

  <h3>Trunk-Based Development (TBD)</h3>
  <div className="diagram">
main/trunk ──► A ──► B ──► C ──► D ──► E ──► F  (always deployable)
               ↑         ↑
          short-lived  short-lived
          feature      feature
          branch       branch
          (&lt; 2 days)   (&lt; 2 days)</div>

  <p><strong>TBD</strong> keeps all feature branches short-lived (hours to a day or two at most), merging back to main constantly. Feature flags hide incomplete work from users. This is how Google, Facebook, and most high-velocity engineering teams operate.</p>
  <p><strong>When it works:</strong> web services, continuous deployment, mature CI. <strong>When it fails:</strong> teams without good automated testing — you'll break production constantly.</p>

  <Quiz question="Your team deploys to production 15 times per day. You're adding a feature that takes 3 weeks to build. How do you work in a trunk-based environment without blocking deployments?" answer="Feature flags (also called feature toggles). You merge small, incomplete increments to main daily, but the feature is hidden behind a runtime flag (if (featureFlags.newCheckout) { ... }). The code ships to production but users don't see it until you flip the flag. This keeps the branch short-lived and eliminates the 3-week merge conflict nightmare. Tools like LaunchDarkly, Unleash, or a simple config file support this pattern."></Quiz>

  <WarningBox>
    <strong>⚠️ Long-lived feature branches are a team risk.</strong> Every day a branch stays alive, it diverges further from main. A branch open for 3 weeks often creates 2–3 days of conflict resolution before it can merge — and that work doesn't show up on anyone's sprint board until it's a crisis. If your branches regularly live longer than 2 days, your workflow has a structural problem.
  </WarningBox>

  

              </div>
            );
          case 's5-l2':
            return (
              <div>
                
  <h2>Security — Signed Commits &amp; Secrets <span className="badge expert">Expert</span></h2>
  <p className="subtitle">Stage 5 · Production Git — trust, verification, and the things that get you fired</p>

  <ConceptBox title="Why this matters">
     Git has no built-in authentication for commit authorship — anyone can set <code>user.name</code> and <code>user.email</code> to impersonate anyone else. Signed commits (GPG or SSH) create a cryptographic proof that a commit really came from you. Secret leakage in Git history is one of the most common security incidents — and the fix is always painful.
  </ConceptBox>

  <h3>Commit Signing</h3>
<CodeBlock code={`# Option 1: GPG signing
gpg --gen-key
gpg --list-secret-keys --keyid-format LONG
# Copy the key ID (the part after rsa4096/)

git config --global user.signingkey YOUR_KEY_ID
git config --global commit.gpgsign true  # sign all commits automatically

# Option 2: SSH signing (simpler, newer)
git config --global gpg.format ssh
git config --global user.signingkey ~/.ssh/id_ed25519.pub
git config --global commit.gpgsign true

# Verify a signed commit
git log --show-signatureCopy`} title="Terminal"></CodeBlock>

  <h3>Secret Scanning — Prevention</h3>
<CodeBlock code={`# Install gitleaks (open-source secret scanner)
# macOS:
brew install gitleaks
# Ubuntu/WSL2:
wget https://github.com/gitleaks/gitleaks/releases/latest/download/gitleaks_linux_x64.tar.gz
tar xzf gitleaks_linux_x64.tar.gz &amp;&amp; sudo mv gitleaks /usr/local/bin/

# Scan your entire repo history
gitleaks detect --source . --verbose

# Scan only staged changes (use in pre-commit hook — see next lab)
gitleaks protect --staged --verboseCopy`} title="Terminal"></CodeBlock>

  <ErrorCard error="⚠️ Real incident: AWS key committed to public repo" meaning="CRITICAL: 'AKIA...' AWS access key found in commit a3f5c8d in file config.py" fix="Scenario: A developer hardcoded AWS credentials in config.py, committed, and pushed to a public GitHub repo. Within 4 minutes, automated bots scraping GitHub found the key and spun up EC2 instances for crypto mining. The bill was $12,000 before AWS detected and suspended the account.
      Fix — in order of urgency: (1) Rotate the key immediately in AWS IAM — don't wait. (2) Use git filter-repo (not filter-branch) to rewrite history and remove the secret: git filter-repo --path config.py --invert-paths. (3) Force-push all branches. (4) Add .env to .gitignore and use environment variables for all credentials going forward. (5) Add a pre-commit hook with gitleaks (next lab). History rewrite does NOT invalidate the key — rotate first."></ErrorCard>

  

              </div>
            );
          case 's5-l3':
            return (
              <div>
                
  <h2>Git Hooks &amp; Automation <span className="badge expert">Expert</span></h2>
  <p className="subtitle">Stage 5 · Production Git — enforce quality automatically before code leaves your machine</p>

  <ConceptBox title="Why this matters">
     Git hooks are scripts that run automatically at key points in the Git workflow (before commit, before push, etc.). A pre-commit hook that catches linting errors, test failures, or secret leakage prevents bad code from ever reaching your PR — saving review time and CI minutes. Just like Docker's CMD runs a process automatically when a container starts, hooks run scripts automatically when Git events fire.
  </ConceptBox>

  <TipBox title="📍 Where to run"> Inside your repo. Hook scripts live in <code>.git/hooks/</code> and are not committed (they're local only). Use a tool like <code>pre-commit</code> to share hooks across your team.</TipBox>

<CodeBlock code={`# Hooks live in .git/hooks/ — examples already there with .sample extension
ls .git/hooks/
# pre-commit.sample  commit-msg.sample  pre-push.sample ...

# Create a pre-commit hook that:
# 1. Checks for secret patterns
# 2. Prevents committing conflict markers
# 3. Checks commit doesn't contain .env files

cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
set -e

echo '🔍 Running pre-commit checks...'

# Check for conflict markers
if git diff --cached --name-only | xargs grep -l '^<<<<<<< ' 2>/dev/null; then
  echo '❌ Commit contains merge conflict markers. Resolve conflicts first.'
  exit 1
fi

# Block .env files from being staged
if git diff --cached --name-only | grep -q '\\.env\$'; then
  echo '❌ Attempting to commit a .env file. Remove it from staging: git restore --staged .env'
  exit 1
fi

# Block obvious secret patterns (basic check — use gitleaks for thorough scanning)
if git diff --cached | grep -qE '(AKIA[0-9A-Z]{16}|password\\s*=\\s*['\\'][^'\\']+['\\']|secret\\s*=\\s*['\\'][^'\\']+['\\'])'; then
  echo '❌ Possible secret detected in staged changes. Review your diff.'
  exit 1
fi

echo '✅ Pre-commit checks passed.'
EOF

chmod +x .git/hooks/pre-commit

# Test it
echo 'password = 'supersecret123'' > test.py
git add test.py
git commit -m 'test'  # should be BLOCKED by the hook
rm test.py &amp;&amp; git restore --staged test.pyCopy`} title="Terminal"></CodeBlock>

<CodeBlock code={`# For team-wide hooks, use the 'pre-commit' framework
pip install pre-commit

# Create .pre-commit-config.yaml in repo root
cat > .pre-commit-config.yaml << 'EOF'
repos:
  - repo: https://github.com/gitleaks/gitleaks
    rev: v8.18.0
    hooks:
      - id: gitleaks
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.5.0
    hooks:
      - id: check-merge-conflict
      - id: detect-private-key
      - id: trailing-whitespace
      - id: end-of-file-fixer
EOF

pre-commit install   # installs hooks into .git/hooks/ for this repo
git add .pre-commit-config.yaml
git commit -m 'Add pre-commit config for secret scanning and code quality'Copy`} title="Terminal"></CodeBlock>

  

              </div>
            );
          case 's5-l4':
            return (
              <div>
                
  <h2>Git in CI/CD — Jenkins &amp; GitHub Actions <span className="badge expert">Expert</span></h2>
  <p className="subtitle">Stage 5 · Production Git — wiring Git events to automated pipelines</p>

  <ConceptBox title="Why this matters">
     CI/CD pipelines are triggered by Git events — a push to a branch, a PR being opened, a tag being created. Understanding the Git side of this connection means you can design pipelines that do the right thing automatically: run tests on every push, build and push Docker images on tags, deploy when a PR merges to main. This connects directly to the Jenkins and GitHub Actions work you may have done previously.
  </ConceptBox>

  <h3>GitHub Actions triggered by Git events</h3>
<CodeBlock code={`# .github/workflows/ci.yml
# This file goes in your repo — commit it to trigger CI
cat > .github/workflows/ci.yml << 'EOF'
name: CI Pipeline

on:
  push:
    branches: [ main, 'feature/**' ]  # run on main and all feature branches
  pull_request:
    branches: [ main ]                # run on PRs targeting main
  push:
    tags:
      - 'v*'                          # trigger release build on version tags

jobs:
  lint-and-test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0    # fetch full history for git log/blame to work

      - name: Check for secrets
        uses: gitleaks/gitleaks-action@v2

      - name: Run tests
        run: echo 'Run your tests here — e.g. pytest, npm test'

  docker-build-and-push:
    needs: lint-and-test
    if: startsWith(github.ref, 'refs/tags/v')  # only on version tags
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build Docker image
        run: |
          docker build -t myapp:\${{ github.ref_name }} .
          # Push to registry here
          echo 'docker push myregistry/myapp:\${{ github.ref_name }}'
EOFCopy`} title="Terminal"></CodeBlock>

  <h3>Jenkins pipeline triggered by Git webhook</h3>
<CodeBlock code={`# Jenkinsfile — commit this to your repo root
cat > Jenkinsfile << 'EOF'
pipeline {
    agent any
    triggers {
        // GitHub webhook triggers this automatically on push
        githubPush()
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
                sh 'git log --oneline -5'  // show recent commits in build log
            }
        }
        stage('Secret Scan') {
            steps {
                sh 'gitleaks detect --source . --exit-code 1'
            }
        }
        stage('Test') {
            steps {
                sh 'echo 'Run tests here''
            }
        }
        stage('Docker Build') {
            when {
                tag 'v*'   // only build Docker image on version tags
            }
            steps {
                sh 'docker build -t myapp:\\\${env.TAG_NAME} .'
            }
        }
    }
    post {
        failure {
            // In a real pipeline, this would alert your Prometheus/Grafana or PagerDuty
            echo 'Build failed — notify on-call engineer'
        }
    }
}
EOF
git add Jenkinsfile .github/
git commit -m 'Add CI/CD pipeline configs (Jenkins + GitHub Actions)'Copy`} title="Terminal"></CodeBlock>

  <Quiz question="Your GitHub Actions CI runs on every push and takes 12 minutes. Developers are pushing small fixup commits that each trigger a full 12-minute run. How would you optimize this using Git events?" answer="Several approaches: (1) Concurrency groups — cancel in-progress runs when a new push on the same branch comes in (concurrency: group: ${{ github.ref }}). (2) Path filters — only run CI if relevant files changed (paths: ['src/**', 'tests/**']). (3) Require interactive rebase before PR — squash all 'fixup' commits into logical units before pushing, reducing total CI runs. (4) Draft PRs — mark PRs as Draft until ready for CI; configure CI to skip draft PRs."></Quiz>

  

              </div>
            );
          case 's5-l5':
            return (
              <div>
                
  <h2>Stage 5 Capstone · Full Feature Workflow <span className="badge expert">Expert</span></h2>
  <p className="subtitle">Stage 5 · Production Git — end-to-end: hooks → branch → PR → CI → merge → tag → deploy</p>

  <ConceptBox title="Project goal">
     Implement a complete production-grade feature lifecycle on the <code>devops-runbook</code> repo: pre-commit hooks catch issues before they leave your machine, the feature goes through a PR, CI validates it, and a version tag triggers a release build.
  </ConceptBox>

  <TipBox title="📍 Where to run"> Terminal + GitHub UI. This is the final integration of everything in the guide.</TipBox>

<CodeBlock code={`# 1. Ensure pre-commit hooks are installed
cd devops-runbook
pip install pre-commit
pre-commit install
# Hooks are now active for every git commit

# 2. Create a feature branch following your team's naming convention
git switch main &amp;&amp; git pull
git switch -c feature/add-chaos-engineering-guide

# 3. Write meaningful, atomic commits
cat > chaos-engineering.md << 'EOF'
# Chaos Engineering Guide

## What it is
Deliberately introducing failures in production-like environments to
find weaknesses before they cause real incidents.

## Tools
- Chaos Monkey (Netflix) — randomly terminates EC2 instances
- Gremlin — controlled chaos via API
- k6 — load testing that simulates traffic spikes

## Relation to Kubernetes
In a Kubernetes environment (see kubernetes-basics.md), chaos tools
target pods and nodes to test self-healing behaviour.

## Before you run chaos tests
1. Have rollback procedures ready (see rollback.md)
2. Ensure Prometheus/Grafana dashboards are live
3. Run during low-traffic windows
4. Have the on-call engineer on standby (see incident-response.md)
EOF

git add chaos-engineering.md
git commit -m 'Add chaos engineering guide with tooling overview'
# pre-commit hooks run automatically here

# 4. Push and open PR
git push -u origin feature/add-chaos-engineering-guide
# On GitHub: open PR, add description, link to relevant docs

# 5. Simulate review feedback — address it
echo '' >> chaos-engineering.md
echo '## Monitoring during chaos tests' >> chaos-engineering.md
echo 'Watch key Prometheus metrics: error_rate, p99_latency, pod_restart_count' >> chaos-engineering.md
git add chaos-engineering.md
git commit -m 'Address review: add monitoring metrics to watch during chaos'
git push

# 6. After PR approved and CI passes — merge on GitHub
# Then locally:
git switch main &amp;&amp; git pull
git branch -d feature/add-chaos-engineering-guide

# 7. Tag the release
git tag -a v1.2.0 -m 'Release v1.2.0: add chaos engineering guide'
git push origin v1.2.0
# This tag push triggers the docker-build-and-push job in GitHub ActionsCopy`} title="Terminal"></CodeBlock>

  <div className="g-checklist"><ul classname="g-checklist"><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="git-cb-s5-l5-0" /><label htmlfor="git-cb-s5-l5-0">I can explain trunk-based development vs Gitflow and choose the right one for a given team context</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="git-cb-s5-l5-1" /><label htmlfor="git-cb-s5-l5-1">I have commit signing configured and understand why it matters</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="git-cb-s5-l5-2" /><label htmlfor="git-cb-s5-l5-2">Pre-commit hooks with gitleaks are installed and blocking secret commits in my repos</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="git-cb-s5-l5-3" /><label htmlfor="git-cb-s5-l5-3">I understand how Git events (push, PR, tag) trigger CI/CD pipelines</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="git-cb-s5-l5-4" /><label htmlfor="git-cb-s5-l5-4">I've completed the full feature lifecycle: hooks → branch → PR → CI → merge → tag</label></li></ul></div>

  

              </div>
            );
          case 'errors':
            return (
              <div>
                
  <h2>Master Error Reference</h2>
  <p className="subtitle">The errors you'll actually hit — searchable, skimmable, written for 2am</p>

  <ErrorCard error="1. detached HEAD state" meaning="HEAD detached at a3f5c8d" fix="What it means: HEAD points directly to a commit, not a branch. Commits you make here won't be on any branch and will be garbage-collected eventually.
      Fix: If you just want to look around: git switch main to get back. If you made commits you want to keep: git switch -c my-recovery-branch first to create a branch capturing those commits, then merge or rebase."></ErrorCard>

  <ErrorCard error="2. Cannot push to protected branch" meaning="! [remote rejected] main -> main (protected branch hook declined)
error: failed to push some refs to 'git@github.com:...'" fix="What it means: The repo has branch protection rules that require PRs for changes to main. This is working as intended.
      Fix: Push to a feature branch instead: git push origin HEAD:feature/your-change and open a PR. If you legitimately need to bypass (e.g. emergency hotfix): temporarily disable protection in GitHub Settings → Branches — but document why and re-enable immediately after."></ErrorCard>

  <ErrorCard error="3. Merge conflict on rebase" meaning="CONFLICT (content): Merge conflict in app.py
error: could not apply a3f5c8d... Add login endpoint
hint: Resolve all conflicts manually, mark them with `git add`, then run `git rebase --continue`" fix="What it means: During rebase, Git is replaying your commit on top of the updated main, and that commit conflicts with a change already in main. You need to resolve it for each conflicting commit in the replay sequence.
      Fix: Open the conflicted file, resolve the markers, git add <file>, git rebase --continue. Repeat for each conflicting commit. If it's getting too messy: git rebase --abort and merge instead."></ErrorCard>

  <ErrorCard error="4. fatal: refusing to merge unrelated histories" meaning="fatal: refusing to merge unrelated histories" fix="What it means: You're trying to merge two repos that have no common ancestor commit (e.g. you created a GitHub repo with a README, then tried to push an existing local repo to it).
      Fix: git pull origin main --allow-unrelated-histories — this forces Git to merge them. You'll likely get a conflict on README.md. Resolve it, commit, then push normally. Prevention: always create GitHub repos empty (no README/gitignore) when you have an existing local repo."></ErrorCard>

  <ErrorCard error="5. Your branch is ahead of 'origin/main' by N commits — but push is rejected" meaning="! [rejected] main -> main (non-fast-forward)
error: failed to push some refs" fix="What it means: Your local main has commits the remote doesn't, AND the remote has commits your local doesn't. The histories have diverged.
      Fix: git pull --rebase origin main to bring in the remote commits and replay yours on top. Then push normally. Don't use git push --force on shared branches — you'll overwrite teammates' work."></ErrorCard>

  <ErrorCard error="6. Permission denied (publickey)" meaning="git@github.com: Permission denied (publickey).
fatal: Could not read from remote repository." fix="What it means: SSH authentication to GitHub failed. Either no SSH key is configured, the key isn't added to GitHub, or the SSH agent isn't running.
      Fix: (1) Check your key: ssh -T git@github.com. (2) If no key: generate one (ssh-keygen -t ed25519), add public key to GitHub Settings → SSH Keys. (3) Start SSH agent: eval '$(ssh-agent -s)' &amp;&amp; ssh-add ~/.ssh/id_ed25519."></ErrorCard>

  <ErrorCard error="7. git stash pop — CONFLICT" meaning="CONFLICT (content): Merge conflict in app.py
The stash entry is kept in case you need it again." fix="What it means: The stashed changes conflict with the current state of the working tree. Git applied the stash but couldn't auto-merge everything.
      Fix: Resolve the conflicts in the file, then git add <file>. The stash entry is still in the stash list — once resolved, manually remove it with git stash drop stash@{0}."></ErrorCard>

  <ErrorCard error="8. Large file blocked by GitHub (100MB limit)" meaning="remote: error: File data/model-weights.bin is 245.00 MB; this exceeds GitHub's file size limit of 100.00 MB
remote: error: GH001: Large files detected. You may want to try Git Large File Storage" fix="What it means: You've committed a file larger than GitHub's 100MB limit. Even if you delete it in the next commit, it's still in the history and the push will fail.
      Fix: Remove it from history using git filter-repo --path data/model-weights.bin --invert-paths, add it to .gitignore, then force-push. For large assets you legitimately need versioned: use Git LFS (git lfs track '*.bin'). For build artifacts: use S3, Artifactory, or a container registry — not Git."></ErrorCard>

  <ErrorCard error="9. error: Your local changes would be overwritten by checkout" meaning="error: Your local changes to the following files would be overwritten by checkout:
    app.py
Please commit your changes or stash them before you switch branches." fix="What it means: You have uncommitted changes to a file that differs between your current branch and the branch you're switching to. Git won't discard your work silently.
      Fix: Either git stash push -m 'WIP: feature work' (save and restore later) or git commit -m 'WIP' (commit and amend/squash later). Never use git checkout -f to force — that discards your changes permanently."></ErrorCard>

  <ErrorCard error="10. Cannot rebase — dirty working tree" meaning="error: cannot rebase: You have unstaged changes.
error: Please commit or stash them." fix="What it means: Rebase rewrites commits and needs a clean working tree to do so safely. Unstaged changes would be ambiguous during the replay.
      Fix: git stash push -m 'WIP before rebase', then run the rebase, then git stash pop. Alternatively, if the changes are ready to commit: git add . &amp;&amp; git commit -m 'WIP' and squash it during the interactive rebase."></ErrorCard>

  

              </div>
            );
          default:
            return <div>Select a section from the sidebar.</div>;
        }
      }}
    </GuideWrapper>
  );
}
