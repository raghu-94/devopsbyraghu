"use client";

import GuideWrapper from "@/components/guide/GuideWrapper";
import { CodeBlock, ConceptBox, TipBox, WarningBox, ErrorCard, Quiz } from "@/components/guide/GuideComponents";

export default function GithubActionsMastery() {
  const navGroups = [
    {
        "title": "Stage 1 · Foundations",
        "items": [
            {
                "id": "s1l1",
                "title": "1.1 Why a CI/CD runner at all"
            },
            {
                "id": "s1l2",
                "title": "1.2 Anatomy of a workflow file"
            },
            {
                "id": "s1l3",
                "title": "1.3 Your first workflow"
            },
            {
                "id": "s1l4",
                "title": "1.4 Using marketplace actions"
            },
            {
                "id": "s1l5",
                "title": "1.5 Capstone: real CI for an app"
            }
        ]
    },
    {
        "title": "Stage 2 · Triggers & Logic",
        "items": [
            {
                "id": "s2l1",
                "title": "2.1 Trigger types & events"
            },
            {
                "id": "s2l2",
                "title": "2.2 Contexts & expressions"
            },
            {
                "id": "s2l3",
                "title": "2.3 Job dependencies & outputs"
            },
            {
                "id": "s2l4",
                "title": "2.4 Matrix builds"
            },
            {
                "id": "s2l5",
                "title": "2.5 Capstone: multi-version CI"
            }
        ]
    },
    {
        "title": "Stage 3 · Secrets & Environments",
        "items": [
            {
                "id": "s3l1",
                "title": "3.1 Secrets: repo, env, org"
            },
            {
                "id": "s3l2",
                "title": "3.2 GITHUB_TOKEN & permissions"
            },
            {
                "id": "s3l3",
                "title": "3.3 Environments & protection rules"
            },
            {
                "id": "s3l4",
                "title": "3.4 Variables & per-env config"
            },
            {
                "id": "s3l5",
                "title": "3.5 Capstone: staging → prod gate"
            }
        ]
    },
    {
        "title": "Stage 4 · Reusable Workflows",
        "items": [
            {
                "id": "s4l1",
                "title": "4.1 Composite actions"
            },
            {
                "id": "s4l2",
                "title": "4.2 Reusable workflows"
            },
            {
                "id": "s4l3",
                "title": "4.3 Sharing across an org"
            },
            {
                "id": "s4l4",
                "title": "4.4 Caching dependencies"
            },
            {
                "id": "s4l5",
                "title": "4.5 Capstone: DRY pipeline library"
            }
        ]
    },
    {
        "title": "Stage 5 · Production Patterns",
        "items": [
            {
                "id": "s5l1",
                "title": "5.1 OIDC: no more static cloud keys"
            },
            {
                "id": "s5l2",
                "title": "5.2 Self-hosted runners"
            },
            {
                "id": "s5l3",
                "title": "5.3 Debugging a failed run at 2am"
            },
            {
                "id": "s5l4",
                "title": "5.4 Real deployment patterns"
            },
            {
                "id": "s5l5",
                "title": "5.5 Capstone: production pipeline"
            }
        ]
    },
    {
        "title": "Reference",
        "items": [
            {
                "id": "error-reference",
                "title": "🧯 Master Error Reference"
            },
            {
                "id": "cleanup",
                "title": "🧹 Cleanup & Cost Control"
            },
            {
                "id": "capstone",
                "title": "🏁 Final Capstone Project"
            }
        ]
    }
];

  return (
    <GuideWrapper 
      title="GitHub Actions Mastery" 
      subtitle="From just wanting tests to run automatically to running your production deploy pipeline."
      navGroups={navGroups}
    >
      {(activeSection) => {
        switch (activeSection) {
          case 'overview':
            return (
              <div>
                
  <h1>⚙️ GitHub Actions Mastery Guide</h1>
  <p className="subtitle">From "I just want my tests to run automatically" to "I run our production deploy pipeline."</p>

  <ConceptBox title="The problem this solves">
    
    Before: you write code, push it, and then manually run tests on your laptop, manually SSH into a box to deploy, and find out something broke in production because your laptop's Node version wasn't the same as the server's. Every release depends on someone remembering every step, in the right order, every single time. After: you push to GitHub, and a machine you don't own checks out your exact commit, runs your exact test suite, builds your exact artifact, and — if everything passes — deploys it, the same way, every time, with a full log of what happened. GitHub Actions is GitHub's built-in automation engine for that "after" — it reacts to events in your repo (a push, a pull request, a schedule, a manual click) and runs jobs defined in plain YAML files sitting right next to your code.
  </ConceptBox>

  <p>If you've used <strong>Jenkins</strong>, the mental model isn't new: you're still defining jobs that run steps on triggers. The difference is where the pipeline definition lives and who manages the servers. Jenkins needs a server you patch, secure, and keep alive. GitHub Actions ships the runner for you (GitHub-hosted runners) and the pipeline definition lives as version-controlled YAML inside the same repo it builds — so a pipeline change goes through the same pull request review as a code change.</p>

  <h3>Cost &amp; infrastructure options</h3>
  <TipBox title="💰 What this guide will actually cost you">
    
    <p>GitHub-hosted runners are <strong>free</strong> for public repositories, and private repos get 2,000 free minutes/month on the free plan — every lab in Stages 1–4 runs entirely on GitHub-hosted runners and costs you <strong>$0</strong>. Stage 5's capstone optionally deploys a static site to <strong>AWS S3</strong> to demonstrate a real-world OIDC deployment. S3 static hosting for a tiny site is a fraction of a cent per month, and there is no EC2 instance, no NAT Gateway, and no load balancer anywhere in this guide — the three things that actually rack up surprise AWS bills. If you skip the AWS portion entirely, you can still complete every lab and the core capstone using GHCR (GitHub Container Registry) instead, which is also free for the image sizes used here.</p>
  </TipBox>

  <h3>Prerequisites</h3>

  <div className="g-step">
    <div>1</div>
    <div>
      <h4>A GitHub account and Git installed locally</h4>
      <TipBox title="Where to run this"> — WSL2 Ubuntu terminal (Windows) or Terminal app (Mac/Linux).</TipBox>
      <CodeBlock code={`git --version
# If missing on Ubuntu/WSL2:
sudo apt update &amp;&amp; sudo apt install -y git
# If missing on Mac:
brew install git`} title="A GitHub account and Git installed locally"></CodeBlock>
    </div>
  </div>

  <div className="g-step">
    <div>2</div>
    <div>
      <h4>GitHub CLI (optional but used throughout this guide to trigger workflows and read logs from the terminal)</h4>
      <CodeBlock code={`# WSL2 Ubuntu / Linux
type -p curl >/dev/null &amp;&amp; sudo apt install curl -y
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
sudo chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg
echo 'deb [arch=\$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main' | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
sudo apt update &amp;&amp; sudo apt install gh -y

# Mac
brew install gh

# Authenticate
gh auth login`} title="GitHub CLI (optional but used throughout this guide to trigger workflows and read logs from the terminal)"></CodeBlock>
    </div>
  </div>

  <ErrorCard error="⚠️ Most common setup failure: gh: command not found after install" meaning="bash: gh: command not found" fix="Scenario: You installed the GitHub CLI via apt or a manual binary download, but your shell's PATH doesn't include the install directory yet — common on WSL2 when the package manager installs to a location your current shell session loaded before the install happened.
      Fix: Open a brand new terminal tab/window so your shell re-reads its PATH, or run source ~/.bashrc in the current one. If it still fails, run which gh to confirm it actually installed, and echo $PATH to confirm the binary's folder (often /usr/bin or /usr/local/bin) is listed."></ErrorCard>

  <div className="g-step">
    <div>3</div>
    <div>
      <h4>Verify you're ready</h4>
      <CodeBlock code={`git --version
gh --version
gh auth status`} title="Verify you're ready"></CodeBlock>
      <p>You should see a Git version, a <code className="inline">gh</code> version, and "Logged in to github.com" before moving to Stage 1.</p>
    </div>
  </div>

  <h3>The roadmap</h3>
  <table>
    <tbody><tr><th>Stage</th><th>Focus</th><th>What you'll build</th></tr>
    <tr><td><strong>1. Foundations</strong></td><td>What GitHub Actions replaces, your first workflow file, the Actions tab</td><td>A workflow that runs on every push and prints a real status</td></tr>
    <tr><td><strong>2. Triggers &amp; Logic</strong></td><td>Events, expressions, job dependencies, matrix builds</td><td>A CI pipeline that only runs the right jobs at the right time, across multiple Node versions</td></tr>
    <tr><td><strong>3. Secrets &amp; Environments</strong></td><td>Credentials, environment protection rules, least privilege</td><td>A workflow that deploys to staging automatically and to production only after manual approval</td></tr>
    <tr><td><strong>4. Reusable Workflows</strong></td><td>Composite actions, <code className="inline">workflow_call</code>, dependency caching</td><td>A shared pipeline library other repos in your org can call instead of copy-pasting YAML</td></tr>
    <tr><td><strong>5. Production Patterns</strong></td><td>OIDC auth, self-hosted runners, debugging failures, real incidents</td><td><strong>Capstone:</strong> a full CI/CD pipeline that lints, tests, builds a Docker image to GHCR, and deploys to AWS S3 via OIDC behind a protected environment</td></tr>
  </tbody></table>

  

              </div>
            );
          case 's1l1':
            return (
              <div>
                
  <h2>1.1 Why a CI/CD runner at all <span className="badge beginner">Beginner</span></h2>
  <p className="subtitle">Stage 1 · Foundations — the problem before the tool</p>

  <ConceptBox title="Why this matters">
    
    Every team eventually hits the same wall: "it works on my machine." The fix isn't a better laptop — it's removing the laptop from the equation entirely. CI/CD (Continuous Integration / Continuous Delivery) means a neutral, disposable machine does the build and test every single time, using only what's declared in your repo, so the result doesn't depend on who pushed it or what they forgot to do locally.
  </ConceptBox>

  <p>You've used Jenkins before, so compare the two directly:</p>
  <table>
    <tbody><tr><th></th><th>Jenkins</th><th>GitHub Actions</th></tr>
    <tr><td>Where the server lives</td><td>You provision, patch, and secure it</td><td>GitHub-hosted runners — provisioned per job, destroyed after</td></tr>
    <tr><td>Where the pipeline is defined</td><td>Groovy, often edited in the Jenkins UI</td><td>YAML files in <code className="inline">.github/workflows/</code>, versioned with your code</td></tr>
    <tr><td>Review process for pipeline changes</td><td>Separate from code review unless you enforce Jenkinsfile-in-repo</td><td>Same pull request as the code change — naturally enforced</td></tr>
    <tr><td>Triggers</td><td>Webhooks you configure manually</td><td>Native events: push, pull_request, schedule, manual, and more</td></tr>
  </tbody></table>

  <CodeBlock code={`WITHOUT CI                              WITH GITHUB ACTIONS
─────────────                           ───────────────────
you  ─▶ git push ─▶ ??? ─▶ prod         you ─▶ git push ─▶ GitHub event
         (manual test,                          │
          manual build,                         ▼
          'looks fine to me')           ┌─────────────────────┐
                                         │ Runner spins up     │
                                         │ checkout → install  │
                                         │ → test → build      │
                                         └─────────┬───────────┘
                                                    ▼
                                          pass/fail visible to
                                          everyone, every time`} title="Architecture"></CodeBlock>

  <TipBox title="Where you'll work"> Every lab in this guide assumes a real GitHub repository you push to — either an existing one or a fresh <code className="inline">test-repo</code> you create just for this guide. Create one now from your WSL2/Mac terminal or via github.com before continuing.</TipBox>

  <Quiz question="Q: Your teammate says 'we don't need GitHub Actions, we just run tests before merging manually.' What's the actual risk in that approach?" answer="It depends entirely on human memory and discipline, every single time, with no record. 'Manually' means someone has to remember to do it, do it the same way as last time, and not skip it under deadline pressure — and there's no audit trail proving it actually happened before that commit was merged. CI doesn't make your tests better; it makes running them non-optional and provable."></Quiz>

  

              </div>
            );
          case 's1l2':
            return (
              <div>
                
  <h2>1.2 Anatomy of a workflow file <span className="badge beginner">Beginner</span></h2>
  <p className="subtitle">Stage 1 · Foundations — reading YAML before writing it</p>

  <ConceptBox title="Why this matters">
    
    Every GitHub Actions workflow is one YAML file describing three things: <em>when</em> to run (the trigger), <em>where</em> to run it (the runner), and <em>what</em> to run (the steps). If you can read those three pieces in any workflow file, you can read every workflow file — the rest of this guide is variations on this same shape.
  </ConceptBox>

  <TipBox title="Where this file lives"> Workflow files must sit in <code className="inline">.github/workflows/</code> at the root of your repo. The folder name is not configurable — GitHub only scans that exact path.</TipBox>

  <CodeBlock code={`name: CI                      # shows up as the workflow's name in the Actions tab

on: push                      # WHEN: run on every push to any branch

jobs:                         # WHAT: one or more jobs, each runs on its own fresh machine
  build:                      # job id — your choice, lowercase, no spaces
    runs-on: ubuntu-latest     # WHERE: which runner image to use

    steps:                    # ordered list of commands/actions this job executes
      - name: Print a message
        run: echo 'Hello from the runner'`} title="Terminal"></CodeBlock>

  <p>Break that down piece by piece:</p>
  <ul>
    <li><code className="inline">on</code> — the event(s) that trigger this workflow. Stage 2 covers the full list.</li>
    <li><code className="inline">jobs</code> — a workflow can have multiple jobs; by default they all run in parallel on separate machines (Stage 2 covers making them depend on each other).</li>
    <li><code className="inline">runs-on</code> — the OS image for that job's machine: <code className="inline">ubuntu-latest</code>, <code className="inline">windows-latest</code>, or <code className="inline">macos-latest</code> are the GitHub-hosted options.</li>
    <li><code className="inline">steps</code> — run in order, top to bottom, on the same machine, sharing the same filesystem. A step is either <code className="inline">run:</code> (a shell command) or <code className="inline">uses:</code> (a pre-built action, covered in 1.4).</li>
  </ul>

  <WarningBox><strong>Common but dangerous mistake</strong> YAML is whitespace-sensitive. A step indented one space differently than its siblings won't error clearly — it'll either silently not run, or GitHub will reject the whole file with a vague "workflow file is not valid" message in the Actions tab and the job won't even appear. Use a YAML-aware editor (VS Code's default YAML support is enough) and never mix tabs and spaces.</WarningBox>

  

              </div>
            );
          case 's1l3':
            return (
              <div>
                
  <h2>1.3 Your first workflow <span className="badge beginner">Beginner</span></h2>
  <p className="subtitle">Stage 1 · Foundations — push it and watch it run</p>

  <ConceptBox title="Why this matters">
    
    Reading YAML in the abstract doesn't build intuition — watching a file you wrote actually trigger a run, on GitHub's infrastructure, within seconds of a push, is what makes the trigger → runner → steps model click.
  </ConceptBox>

  <TipBox title="Where to run this"> Inside your repo's local clone, in your WSL2/Mac terminal.</TipBox>

  <div className="g-step">
    <div>1</div>
    <div>
      <h4>Create the workflows folder and file</h4>
      <CodeBlock code={`mkdir -p .github/workflows
touch .github/workflows/hello.yml`} title="Create the workflows folder and file"></CodeBlock>
    </div>
  </div>

  <div className="g-step">
    <div>2</div>
    <div>
      <h4>Paste this into <code className="inline">hello.yml</code></h4>
      <CodeBlock code={`name: Hello GitHub Actions

on: push

jobs:
  greet:
    runs-on: ubuntu-latest
    steps:
      - name: Say hello
        run: echo 'This workflow ran on commit \$\{\{ github.sha \}\}'

      - name: Show the event that triggered it
        run: echo 'Triggered by a push to branch \$\{\{ github.ref_name \}\}'`} title="Paste this into hello.yml"></CodeBlock>
    </div>
  </div>

  <div className="g-step">
    <div>3</div>
    <div>
      <h4>Commit and push it</h4>
      <CodeBlock code={`git add .github/workflows/hello.yml
git commit -m 'Add first GitHub Actions workflow'
git push`} title="Commit and push it"></CodeBlock>
    </div>
  </div>

  <div className="g-step">
    <div>4</div>
    <div>
      <h4>Watch it run</h4>
      <p>Open your repo on github.com and click the <strong>Actions</strong> tab — you'll see "Hello GitHub Actions" listed with a yellow dot (running) then a green check (passed). Click into it, click the <strong>greet</strong> job, and expand each step to see the exact output. Or, from your terminal:</p>
      <CodeBlock code={`gh run list --limit 5
gh run watch`} title="Watch it run"></CodeBlock>
    </div>
  </div>

  <ErrorCard error="⚠️ Workflow doesn't appear in the Actions tab at all" meaning="(no run listed — Actions tab shows 'Get started with GitHub Actions' templates instead)" fix="Scenario: You created the file but it's at .github/workflow/hello.yml (missing the trailing 's' on 'workflows'), or it's not on the default branch, or the YAML has a syntax error severe enough that GitHub can't even parse the trigger.
      Fix: Double-check the exact folder name is .github/workflows/ (plural), confirm you pushed to the branch GitHub considers default (usually main), and run cat .github/workflows/hello.yml locally to eyeball the indentation before pushing again."></ErrorCard>

  

              </div>
            );
          case 's1l4':
            return (
              <div>
                
  <h2>1.4 Using marketplace actions <span className="badge beginner">Beginner</span></h2>
  <p className="subtitle">Stage 1 · Foundations — stop reinventing checkout scripts</p>

  <ConceptBox title="Why this matters">
    
    A fresh runner is a blank Ubuntu (or Windows/macOS) VM with nothing on it — not even your code. Every workflow needs the same handful of setup steps (get the code, install a language runtime, restore a cache), and the GitHub Actions Marketplace exists so you don't hand-write that boilerplate in shell every time. An action is just a packaged, reusable step — referenced with <code className="inline">uses:</code> instead of <code className="inline">run:</code>.
  </ConceptBox>

  <CodeBlock code={`steps:
  - name: Check out the repo
    uses: actions/checkout@v4        # without this, your job has NO code to work with

  - name: Set up Node.js
    uses: actions/setup-node@v4
    with:
      node-version: '20'`} title="Terminal"></CodeBlock>

  <p><code className="inline">actions/checkout</code> is so universal it's effectively step one of almost every job you'll ever write — a runner starts with an empty disk, and without this step, <code className="inline">npm install</code> or any reference to your files will simply fail because they don't exist on that machine yet.</p>

  <TipBox title="Where to check this"> The Marketplace tab on github.com (or directly at github.com/marketplace/actions) shows every public action with usage stats and verified-publisher badges — prefer actions published by the tool's own org (e.g. <code className="inline">actions/*</code>, <code className="inline">docker/*</code>) over random third-party ones for anything touching credentials.</TipBox>

  <WarningBox><strong>Common but dangerous mistake</strong> Pinning an action to a moving tag like <code className="inline">@v4</code> means the underlying code can change without your review — GitHub tags are mutable, not immutable like Docker image digests. For anything beginner-stage this is an acceptable tradeoff for convenience, but Stage 5 covers pinning to a commit SHA for production pipelines, the same way you wouldn't run <code className="inline">FROM node:latest</code> in a production Dockerfile.</WarningBox>

  

              </div>
            );
          case 's1l5':
            return (
              <div>
                
  <h2>1.5 Capstone: real CI for a sample app <span className="badge beginner">Beginner</span></h2>
  <p className="subtitle">Stage 1 · Foundations — putting it all together</p>

  <ConceptBox title="Why this matters">
    
    A "hello world" workflow proves the trigger works. This capstone proves the actual point of CI: catching a real test failure before it reaches <code className="inline">main</code>, using nothing but checkout, setup-node, and npm — the exact pattern that powers a huge share of real-world Node.js pipelines.
  </ConceptBox>

  <TipBox title="Where to run this"> Same repo, local terminal for setup, GitHub for the result.</TipBox>

  <div className="g-step">
    <div>1</div>
    <div>
      <h4>Create a minimal Node app with one test</h4>
      <CodeBlock code={`mkdir -p sample-app &amp;&amp; cd sample-app
npm init -y
npm install --save-dev jest`} title="Create a minimal Node app with one test"></CodeBlock>
      <p>Create <code className="inline">sample-app/sum.js</code>:</p>
      <CodeBlock code={`function sum(a, b) \{ return a + b; \}
module.exports = sum;`} title="Create a minimal Node app with one test"></CodeBlock>
      <p>Create <code className="inline">sample-app/sum.test.js</code>:</p>
      <CodeBlock code={`const sum = require('./sum');
test('adds 2 + 3 to equal 5', () => \{
  expect(sum(2, 3)).toBe(5);
\});`} title="Create a minimal Node app with one test"></CodeBlock>
      <p>Add a test script in <code className="inline">sample-app/package.json</code> under <code className="inline">"scripts"</code>: <code className="inline">"test": "jest"</code></p>
    </div>
  </div>

  <div className="g-step">
    <div>2</div>
    <div>
      <h4>Write the CI workflow at <code className="inline">.github/workflows/ci.yml</code></h4>
      <CodeBlock code={`name: CI

on: push

jobs:
  test:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: sample-app
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test`} title="Write the CI workflow at .github/workflows/ci.yml"></CodeBlock>
    </div>
  </div>

  <div className="g-step">
    <div>3</div>
    <div>
      <h4>Push it, watch it pass, then break it on purpose</h4>
      <CodeBlock code={`git add sample-app .github/workflows/ci.yml
git commit -m 'Add sample app with CI'
git push
gh run watch`} title="Push it, watch it pass, then break it on purpose"></CodeBlock>
      <p>Now change <code className="inline">expect(sum(2, 3)).toBe(5)</code> to <code className="inline">toBe(6)</code>, commit, and push again. Watch the run go red — that red X is the entire point of this lab. A teammate opening a pull request with this change would see it fail before anyone merges it.</p>
    </div>
  </div>

  <ErrorCard error="⚠️ npm ci fails on a fresh checkout" meaning="npm error The `npm ci` command can only install with an existing package-lock.json" fix="Scenario: You ran npm init -y and npm install locally but never committed the generated package-lock.json — locally npm install tolerates that, but npm ci (the version CI should always use, because it installs exactly what's locked, not 'whatever resolves now') requires the lockfile to exist.
      Fix: Run git add sample-app/package-lock.json and commit it. Lockfiles belong in version control — they're what makes 'works in CI' mean the same dependency versions every single run."></ErrorCard>

  <Quiz question="Q: Why does this workflow use npm ci instead of npm install in CI?" answer="npm install can update package-lock.json and resolve slightly different transitive dependency versions over time. npm ci deletes node_modules and installs the exact versions pinned in the lockfile, failing loudly if the lockfile and package.json disagree — which is exactly the determinism CI exists to guarantee."></Quiz>

  <div className="g-checklist"><ul classname="g-checklist"><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="gha-cb-s1l5-0" /><label htmlfor="gha-cb-s1l5-0">I can explain the trigger → runner → steps shape of any workflow file</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="gha-cb-s1l5-1" /><label htmlfor="gha-cb-s1l5-1">My repo has a workflow that runs on every push</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="gha-cb-s1l5-2" /><label htmlfor="gha-cb-s1l5-2">I used actions/checkout and actions/setup-node from the Marketplace</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="gha-cb-s1l5-3" /><label htmlfor="gha-cb-s1l5-3">I watched a CI run go from green to red on a real test failure</label></li></ul></div>

  

              </div>
            );
          case 's2l1':
            return (
              <div>
                
  <h2>2.1 Trigger types &amp; events <span className="badge intermediate">Intermediate</span></h2>
  <p className="subtitle">Stage 2 · Triggers &amp; Logic — controlling exactly when a workflow fires</p>

  <ConceptBox title="Why this matters">
    
    <code className="inline">on: push</code> firing on every single push to every single branch is fine for a toy example, but in a real repo it wastes runner minutes and creates noisy, irrelevant runs — you don't want a full test suite running because someone pushed a typo fix to a draft branch nobody's reviewing yet. Knowing the actual trigger vocabulary is what lets you make CI run exactly when it's useful and nowhere else.
  </ConceptBox>

  <table>
    <tbody><tr><th>Trigger</th><th>Fires when</th><th>Typical use</th></tr>
    <tr><td><code className="inline">push</code></td><td>Commits pushed to matching branches</td><td>Run tests on every commit to <code className="inline">main</code></td></tr>
    <tr><td><code className="inline">pull_request</code></td><td>PR opened, synced, or reopened</td><td>Run tests + lint before allowing a merge</td></tr>
    <tr><td><code className="inline">schedule</code></td><td>Cron expression, UTC time</td><td>Nightly dependency audits, scheduled reports</td></tr>
    <tr><td><code className="inline">workflow_dispatch</code></td><td>Manual click in the Actions tab (or <code className="inline">gh workflow run</code>)</td><td>On-demand deploys, one-off scripts</td></tr>
    <tr><td><code className="inline">release</code></td><td>A GitHub release is published</td><td>Build and publish artifacts on tagged releases</td></tr>
  </tbody></table>

  <CodeBlock code={`on:
  push:
    branches: [main]            # only main, not every branch
    paths-ignore:
      - '**.md'                 # don't run CI for docs-only changes
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 3 * * *'         # 3 AM UTC, every day
  workflow_dispatch: \{\}          # adds a 'Run workflow' button in the Actions tab`} title="Terminal"></CodeBlock>

  <TipBox title="Where to test this"> After adding <code className="inline">workflow_dispatch</code>, go to the Actions tab → select the workflow on the left → you'll see a "Run workflow" dropdown button appear. Or from the terminal: <code className="inline">gh workflow run ci.yml</code>.</TipBox>

  

              </div>
            );
          case 's2l2':
            return (
              <div>
                
  <h2>2.2 Contexts &amp; expressions <span className="badge intermediate">Intermediate</span></h2>
  <p className="subtitle">Stage 2 · Triggers &amp; Logic — the <code className="inline">{"${{ }}"}</code> syntax, demystified</p>

  <ConceptBox title="Why this matters">
    
    Every <code className="inline">{"${{ ... }}"}</code> block you've copy-pasted so far is an <strong>expression</strong> evaluating against a <strong>context</strong> — structured data GitHub exposes about the run, the event, your repo, and your secrets. Once this clicks, you stop treating workflow YAML as magic incantations and start reading it like a small, predictable scripting language.
  </ConceptBox>

  <table>
    <tbody><tr><th>Context</th><th>Holds</th><th>Example</th></tr>
    <tr><td><code className="inline">github</code></td><td>Repo, commit, actor, event payload</td><td><code className="inline">github.actor</code>, <code className="inline">github.event_name</code></td></tr>
    <tr><td><code className="inline">env</code></td><td>Environment variables you've set</td><td><code className="inline">env.NODE_ENV</code></td></tr>
    <tr><td><code className="inline">secrets</code></td><td>Encrypted secrets (Stage 3)</td><td><code className="inline">secrets.AWS_ROLE_ARN</code></td></tr>
    <tr><td><code className="inline">needs</code></td><td>Outputs of jobs this job depends on</td><td><code className="inline">needs.build.outputs.image_tag</code></td></tr>
    <tr><td><code className="inline">matrix</code></td><td>Current value in a matrix build (2.4)</td><td><code className="inline">matrix.node-version</code></td></tr>
  </tbody></table>

  <CodeBlock code={`jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Only run this step on main
        if: github.ref_name == 'main'
        run: echo 'Deploying because this is main'

      - name: Show who triggered this and how
        run: |
          echo 'Actor: \$\{\{ github.actor \}\}'
          echo 'Event: \$\{\{ github.event_name \}\}'
          echo 'Branch: \$\{\{ github.ref_name \}\}'`} title="Terminal"></CodeBlock>

  <TipBox title="Where to explore this"> Add a temporary step <code className="inline">{"run: echo '${{ toJSON(github) }}'"}</code> to any job and look at its log output in the Actions tab — it dumps the entire <code className="inline">github</code> context as JSON so you can see exactly what's available instead of guessing field names.</TipBox>

  <ErrorCard error="⚠️ if: condition silently never matches" meaning="(step shows as 'skipped' every single run, even on main)" fix="Scenario: You wrote if: ${{ github.ref_name == 'main' }} — wrapping an if: condition in ${{ }} is actually valid, but a far more common bug is comparing github.ref (which is the full refs/heads/main string) against just 'main', which will never be equal.
      Fix: Use github.ref_name (just the branch name, e.g. main) when you want a plain comparison, and reserve github.ref for cases where you specifically need the full ref path, like distinguishing branches from tags."></ErrorCard>

  <Quiz question="Q: What's the difference between env.MY_VAR and secrets.MY_VAR from the workflow's perspective at runtime?" answer="Functionally, both resolve to a string value you can reference. The difference is handling: secrets are encrypted at rest, GitHub automatically redacts their value from logs (replacing it with *** if it ever appears in output), and they can't be referenced in a pull_request trigger from a fork for security reasons. env values are plain text, fully visible in logs, with no such restrictions."></Quiz>

  

              </div>
            );
          case 's2l3':
            return (
              <div>
                
  <h2>2.3 Job dependencies &amp; outputs <span className="badge intermediate">Intermediate</span></h2>
  <p className="subtitle">Stage 2 · Triggers &amp; Logic — making jobs talk to each other</p>

  <ConceptBox title="Why this matters">
    
    By default every job in a workflow runs in parallel, on its own isolated machine — which means a "deploy" job has no idea whether a "test" job passed unless you explicitly tell it to wait. <code className="inline">needs</code> creates that dependency, and job <code className="inline">outputs</code> let one job hand a value (like a build's version tag) to the next one, since separate jobs don't share filesystem or memory the way steps within one job do.
  </ConceptBox>

  <CodeBlock code={`jobs:
  build:
    runs-on: ubuntu-latest
    outputs:
      version: \$\{\{ steps.set_version.outputs.version \}\}
    steps:
      - id: set_version
        run: echo 'version=1.2.\$\{\{ github.run_number \}\}' >> '\$GITHUB_OUTPUT'

  deploy:
    needs: build                       # waits for build to finish successfully
    runs-on: ubuntu-latest
    if: needs.build.result == 'success'
    steps:
      - run: echo 'Deploying version \$\{\{ needs.build.outputs.version \}\}'`} title="Terminal"></CodeBlock>

  <p>Notice the output flows two levels: a <em>step</em> writes to <code className="inline">$GITHUB_OUTPUT</code> and is captured by the job via <code className="inline">steps.set_version.outputs.version</code>, then the <em>job</em> re-exposes it under <code className="inline">jobs.build.outputs.version</code> so a downstream job can read it as <code className="inline">needs.build.outputs.version</code>.</p>

  <TipBox title="Where to verify this"> In the Actions tab, click into the run, and you'll see <code className="inline">build</code> and <code className="inline">deploy</code> as separate boxes in the visual graph at the top, with an arrow showing the dependency — that arrow is exactly what <code className="inline">needs</code> draws.</TipBox>

  

              </div>
            );
          case 's2l4':
            return (
              <div>
                
  <h2>2.4 Matrix builds <span className="badge intermediate">Intermediate</span></h2>
  <p className="subtitle">Stage 2 · Triggers &amp; Logic — one job definition, many parallel runs</p>

  <ConceptBox title="Why this matters">
    
    "It passed on Node 20" doesn't tell you it'll pass on the Node 18 your production servers actually run, or the Node 22 a teammate has locally. Copy-pasting the same job three times with one line changed is exactly the kind of repetition a matrix exists to eliminate — define the variation once, and GitHub spins up one parallel job per combination.
  </ConceptBox>

  <CodeBlock code={`jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false              # let every version finish even if one fails
      matrix:
        node-version: [18, 20, 22]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: \$\{\{ matrix.node-version \}\}
      - run: npm ci
      - run: npm test`} title="Terminal"></CodeBlock>

  <p>This produces three jobs — <code className="inline">test (18)</code>, <code className="inline">test (20)</code>, <code className="inline">test (22)</code> — running simultaneously, each on its own runner. Add a second matrix dimension (e.g. <code className="inline">os: [ubuntu-latest, windows-latest]</code>) and GitHub runs every combination: 3 Node versions × 2 OSes = 6 parallel jobs, from the same handful of lines.</p>

  <WarningBox><strong>Common but dangerous mistake</strong> <code className="inline">fail-fast: true</code> is the default — the moment any one matrix combination fails, GitHub cancels all the others mid-run. That's fine for "stop wasting minutes on a doomed build," but it means you won't find out Node 22 also has a problem if Node 18 fails first and cancels it. Set <code className="inline">fail-fast: false</code> when you specifically want full visibility across every combination, like right before a major version bump.</WarningBox>

  

              </div>
            );
          case 's2l5':
            return (
              <div>
                
  <h2>2.5 Capstone: multi-version CI pipeline <span className="badge intermediate">Intermediate</span></h2>
  <p className="subtitle">Stage 2 · Triggers &amp; Logic — combining everything in this stage</p>

  <ConceptBox title="Why this matters">
    
    This is the shape of a real-world open-source or internal library pipeline: run on PRs and pushes to main, test across multiple Node versions in parallel, and only run a separate "notify" job once every matrix combination has reported back — exactly the kind of pipeline you'd be expected to write cold in a DevOps interview.
  </ConceptBox>

  <TipBox title="Where to run this"> Same <code className="inline">sample-app</code> repo from Stage 1, editing <code className="inline">.github/workflows/ci.yml</code>.</TipBox>

  <div className="g-step">
    <div>1</div>
    <div>
      <h4>Replace <code className="inline">ci.yml</code> with the multi-job version</h4>
      <CodeBlock code={`name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch: \{\}

jobs:
  test:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: sample-app
    strategy:
      fail-fast: false
      matrix:
        node-version: [18, 20, 22]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: \$\{\{ matrix.node-version \}\}
      - run: npm ci
      - run: npm test

  notify:
    needs: test
    runs-on: ubuntu-latest
    if: always()
    steps:
      - name: Report result
        run: |
          if [ '\$\{\{ needs.test.result \}\}' = 'success' ]; then
            echo '✅ All Node versions passed'
          else
            echo '❌ At least one Node version failed — check the matrix'
          fi`} title="Replace ci.yml with the multi-job version"></CodeBlock>
    </div>
  </div>

  <div className="g-step">
    <div>2</div>
    <div>
      <h4>Push and confirm the matrix fans out</h4>
      <CodeBlock code={`git add .github/workflows/ci.yml
git commit -m 'Multi-version matrix CI'
git push
gh run watch`} title="Push and confirm the matrix fans out"></CodeBlock>
      <p>You should see three parallel <code className="inline">test</code> jobs in the run graph, followed by <code className="inline">notify</code> after all three finish.</p>
    </div>
  </div>

  <Quiz question="Q: Why does notify need if: always()?" answer="By default, a job with a needs dependency only runs if every dependency succeeded. Without if: always(), if any matrix combination fails, notify would be skipped entirely — and you'd lose the chance to actually report the failure. always() overrides the default and forces the job to run regardless of upstream success or failure."></Quiz>

  <div className="g-checklist"><ul classname="g-checklist"><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="gha-cb-s2l5-0" /><label htmlfor="gha-cb-s2l5-0">I scoped triggers to specific branches instead of "every push, everywhere"</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="gha-cb-s2l5-1" /><label htmlfor="gha-cb-s2l5-1">I can read a {"${{ }}"} expression against the right context</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="gha-cb-s2l5-2" /><label htmlfor="gha-cb-s2l5-2">I used needs to pass an output from one job to another</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="gha-cb-s2l5-3" /><label htmlfor="gha-cb-s2l5-3">I ran a matrix build and watched it fan out into parallel jobs</label></li></ul></div>

  

              </div>
            );
          case 's3l1':
            return (
              <div>
                
  <h2>3.1 Secrets: repo, environment, and org-level <span className="badge advanced">Advanced</span></h2>
  <p className="subtitle">Stage 3 · Secrets &amp; Environments — this tool's hard part</p>

  <ConceptBox title="Why this matters">
    
    A deploy job needs credentials — an AWS role, a Docker registry token, an API key — and the single biggest beginner mistake in CI/CD across every tool is hardcoding that value directly into a YAML file. GitHub Actions Secrets exist so credentials live encrypted, outside your code, and are injected only at runtime into the specific job that needs them.
  </ConceptBox>

  <table>
    <tbody><tr><th>Scope</th><th>Visible to</th><th>Use for</th></tr>
    <tr><td>Repository secret</td><td>Every workflow in this one repo</td><td>A credential only this project uses</td></tr>
    <tr><td>Environment secret</td><td>Only jobs targeting that named environment (3.3)</td><td>Different AWS account per environment — staging secret can't leak into a prod job by accident</td></tr>
    <tr><td>Organization secret</td><td>Selected repos across your whole GitHub org</td><td>A shared registry token every team's pipeline needs</td></tr>
  </tbody></table>

  <TipBox title="Where to add one"> Repo → Settings → Secrets and variables → Actions → "New repository secret." Never via a workflow file, never via a pull request — secrets are added through the GitHub UI or API, not committed text.</TipBox>

  <CodeBlock code={`jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Use a secret
        env:
          API_KEY: \$\{\{ secrets.MY_API_KEY \}\}
        run: curl -H 'Authorization: Bearer \$API_KEY' https://api.example.com/deploy`} title="Terminal"></CodeBlock>

  <WarningBox><strong>Common but dangerous mistake</strong> Pasting a real API key or AWS secret access key directly into a workflow YAML file "just to test it quickly" and pushing it — even to a private repo, even if you delete it in the very next commit. Git history keeps every prior version forever; the secret is now compromised and must be rotated, full stop, deleting the commit doesn't undo the exposure once it's been pushed to a remote.</WarningBox>

  

              </div>
            );
          case 's3l2':
            return (
              <div>
                
  <h2>3.2 GITHUB_TOKEN &amp; permissions <span className="badge advanced">Advanced</span></h2>
  <p className="subtitle">Stage 3 · Secrets &amp; Environments — the token you never set up but always have</p>

  <ConceptBox title="Why this matters">
    
    Every workflow run automatically gets a short-lived <code className="inline">GITHUB_TOKEN</code> — scoped to that one run, expiring when it ends — that lets steps interact with your repo's API (commenting on a PR, creating a release, pushing to GHCR) without you ever generating or storing a personal access token. The catch: by default it can have broad permissions, and least-privilege means explicitly narrowing it to only what each workflow actually needs.
  </ConceptBox>

  <CodeBlock code={`permissions:
  contents: read         # only needs to read code, not write to it
  pull-requests: write   # this workflow comments on PRs, so it needs write here

jobs:
  comment:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Comment on the PR
        run: gh pr comment \$\{\{ github.event.pull_request.number \}\} --body 'CI passed ✅'
        env:
          GH_TOKEN: \$\{\{ secrets.GITHUB_TOKEN \}\}`} title="Terminal"></CodeBlock>

  <p>Setting <code className="inline">permissions</code> at the top level of a workflow restricts the <code className="inline">GITHUB_TOKEN</code> for every job in that file to exactly what's declared — the same least-privilege instinct as scoping an IAM policy down to specific actions instead of attaching <code className="inline">AdministratorAccess</code> because it's easier.</p>

  <TipBox title="Where to check the default"> Repo → Settings → Actions → General → "Workflow permissions" shows whether new workflows default to read-only or read/write — organizations handling sensitive code should set this to read-only org-wide and have individual workflows opt into more access explicitly.</TipBox>

  <Quiz question="Q: Your workflow needs to push a Docker image to GHCR. What's the minimum permissions block for that, and why not just leave permissions unset?" answer="At minimum packages: write (plus contents: read to check out the code). Leaving permissions unset means the job runs with whatever the repo's default is — which might be broader read/write access than this particular job needs, and if that workflow is ever compromised via a malicious dependency or a poisoned third-party action, the blast radius is everything the token can touch, not just package publishing."></Quiz>

  

              </div>
            );
          case 's3l3':
            return (
              <div>
                
  <h2>3.3 Environments &amp; protection rules <span className="badge advanced">Advanced</span></h2>
  <p className="subtitle">Stage 3 · Secrets &amp; Environments — the gate between "tested" and "live"</p>

  <ConceptBox title="Why this matters">
    
    Tests passing doesn't mean a human has decided it's safe to actually deploy to production right now. A GitHub <strong>environment</strong> is a named deployment target (like <code className="inline">staging</code> or <code className="inline">production</code>) that can carry its own secrets, its own variables, and — critically — protection rules like "require a specific person to manually approve before this job runs."
  </ConceptBox>

  <div className="g-step">
    <div>1</div>
    <div>
      <h4>Create the environment</h4>
      <p>Repo → Settings → Environments → "New environment" → name it <code className="inline">production</code>. Under "Deployment protection rules," check "Required reviewers" and add yourself (or a teammate). Add an environment secret here too — it will only be visible to jobs that target this environment.</p>
    </div>
  </div>

  <div className="g-step">
    <div>2</div>
    <div>
      <h4>Target it from a job</h4>
      <CodeBlock code={`jobs:
  deploy-prod:
    runs-on: ubuntu-latest
    environment: production    # this one line ties the job to the gate
    steps:
      - run: echo 'Deploying to production using \$\{\{ secrets.PROD_API_KEY \}\}'`} title="Target it from a job"></CodeBlock>
    </div>
  </div>

  <TipBox title="Where to see the gate in action"> Push a workflow with a job targeting <code className="inline">production</code> — the run will pause at that job with a yellow "Waiting" status and a "Review deployments" button visible to anyone with repo write access, until an approved reviewer clicks approve.</TipBox>

  <ErrorCard error="⚠️ Real production incident: deploy job ran with the wrong environment's secret" meaning="Deployed build 47 to https://api.staging.internal — but the on-call engineer thought this was the prod deploy job and didn't notice the URL in the logs until customers reported the production API was unreachable, because a previous prod deploy never actually completed." fix="Scenario: A team had one job named deploy reused for both staging and production by changing a workflow input, but only staging had an environment: field set — so the 'production' run never actually required approval, looked identical in the Actions tab to a staging run, and a teammate approved what they assumed was routine staging traffic.
      Fix: Give staging and production deploys clearly separate job names (deploy-staging / deploy-production) each with their own environment: field, so the run graph and the approval prompt make the target unmistakable — never rely on a value buried in logs to communicate something this consequential."></ErrorCard>

  

              </div>
            );
          case 's3l4':
            return (
              <div>
                
  <h2>3.4 Variables &amp; per-environment config <span className="badge advanced">Advanced</span></h2>
  <p className="subtitle">Stage 3 · Secrets &amp; Environments — not everything needs to be a secret</p>

  <ConceptBox title="Why this matters">
    
    Not every piece of config is sensitive — an API base URL, a feature flag, a region name don't need encryption, and treating them as secrets just makes them harder to read and debug in logs for no security benefit. GitHub Actions <strong>variables</strong> (the <code className="inline">vars</code> context) are the plain-text counterpart to secrets, with the same repo/environment/org scoping.
  </ConceptBox>

  <CodeBlock code={`# Settings → Secrets and variables → Actions → Variables tab
# Repository variable: API_BASE_URL = https://api.example.com
# Environment variable (on 'staging'): API_BASE_URL = https://staging-api.example.com

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - run: echo 'Calling \$\{\{ vars.API_BASE_URL \}\}'   # resolves to the staging value here`} title="Terminal"></CodeBlock>

  <p>The same variable name can be defined differently per environment — when a job targets <code className="inline">staging</code>, <code className="inline">vars.API_BASE_URL</code> resolves to the staging value; the identical line of YAML targeting <code className="inline">production</code> resolves to the production value. This is what lets one workflow file safely serve multiple environments without copy-pasted, hardcoded URLs scattered through your YAML.</p>

  <TipBox title="Where to decide secret vs. variable"> Ask: "if this leaked into a public log right now, would it matter?" A region name or feature flag — no. An API key, a database connection string, a signing certificate — yes, always a secret.</TipBox>

  

              </div>
            );
          case 's3l5':
            return (
              <div>
                
  <h2>3.5 Capstone: staging → production gate <span className="badge advanced">Advanced</span></h2>
  <p className="subtitle">Stage 3 · Secrets &amp; Environments — automatic staging, gated production</p>

  <ConceptBox title="Why this matters">
    
    This is the actual day-to-day shape of a responsible deploy pipeline: every merge to main deploys to staging automatically (fast feedback, low risk), and production only happens after a human explicitly approves — combining everything from this stage into one realistic flow.
  </ConceptBox>

  <TipBox title="Where to run this"> Same repo. First create both environments (<code className="inline">staging</code>, no protection rules; <code className="inline">production</code>, with a required reviewer) in Settings → Environments, each with a variable named <code className="inline">DEPLOY_TARGET_URL</code> set to a distinct placeholder value.</TipBox>

  <div className="g-step">
    <div>1</div>
    <div>
      <h4>Add <code className="inline">.github/workflows/deploy.yml</code></h4>
      <CodeBlock code={`name: Deploy

on:
  push:
    branches: [main]

permissions:
  contents: read

jobs:
  test:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: sample-app
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm test

  deploy-staging:
    needs: test
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - run: echo 'Deployed to \$\{\{ vars.DEPLOY_TARGET_URL \}\}'

  deploy-production:
    needs: deploy-staging
    runs-on: ubuntu-latest
    environment: production    # this is the line that forces manual approval
    steps:
      - run: echo 'Deployed to \$\{\{ vars.DEPLOY_TARGET_URL \}\}'`} title="Add .github/workflows/deploy.yml"></CodeBlock>
    </div>
  </div>

  <div className="g-step">
    <div>2</div>
    <div>
      <h4>Push and observe the gate</h4>
      <CodeBlock code={`git add .github/workflows/deploy.yml
git commit -m 'Add staged deploy pipeline with production gate'
git push
gh run watch`} title="Push and observe the gate"></CodeBlock>
      <p>You'll see <code className="inline">test</code> and <code className="inline">deploy-staging</code> complete automatically, then <code className="inline">deploy-production</code> sit in "Waiting" until you (or your configured reviewer) approve it from the run's page on github.com.</p>
    </div>
  </div>

  <Quiz question="Q: If test fails, does deploy-production ever get a chance to wait for approval?" answer="No. deploy-production needs deploy-staging, which needs test — by default a job only runs if every upstream job in its needs chain succeeded. A failing test stops the entire chain before it ever reaches the approval gate, which is exactly the point: nothing untested should ever be a single approval click away from production."></Quiz>

  <div className="g-checklist"><ul classname="g-checklist"><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="gha-cb-s3l5-0" /><label htmlfor="gha-cb-s3l5-0">I added a secret through the GitHub UI, never hardcoded in YAML</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="gha-cb-s3l5-1" /><label htmlfor="gha-cb-s3l5-1">I scoped a workflow's GITHUB_TOKEN permissions explicitly instead of leaving the default</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="gha-cb-s3l5-2" /><label htmlfor="gha-cb-s3l5-2">I created an environment with a required reviewer and watched a run pause for approval</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="gha-cb-s3l5-3" /><label htmlfor="gha-cb-s3l5-3">I used vars to resolve different config per environment from one workflow file</label></li></ul></div>

  

              </div>
            );
          case 's4l1':
            return (
              <div>
                
  <h2>4.1 Composite actions <span className="badge advanced">Advanced</span></h2>
  <p className="subtitle">Stage 4 · Reusable Workflows — bundling steps you keep repeating</p>

  <ConceptBox title="Why this matters">
    
    The moment you have two workflow files both doing "checkout, setup-node, npm ci, restore cache" as their first four steps, you have duplication that will drift — someone updates the Node version in one file and forgets the other. A <strong>composite action</strong> packages a sequence of steps into a single reusable <code className="inline">uses:</code> line, the same instinct as pulling repeated shell logic into a function.
  </ConceptBox>

  <TipBox title="Where this lives"> A folder anywhere in your repo (commonly <code className="inline">.github/actions/&lt;name&gt;/</code>) containing an <code className="inline">action.yml</code>.</TipBox>

  <CodeBlock code={`# .github/actions/setup-app/action.yml
name: 'Setup App'
description: 'Checkout, install Node, install deps'
inputs:
  node-version:
    description: 'Node version to use'
    default: '20'
runs:
  using: 'composite'
  steps:
    - uses: actions/setup-node@v4
      with:
        node-version: \$\{\{ inputs.node-version \}\}
    - run: npm ci
      shell: bash
      working-directory: sample-app`} title="Terminal"></CodeBlock>

  <p>Use it from any workflow in the same repo:</p>
  <CodeBlock code={`steps:
  - uses: actions/checkout@v4
  - uses: ./.github/actions/setup-app
    with:
      node-version: '20'
  - run: npm test
    working-directory: sample-app`} title="Terminal"></CodeBlock>

  <WarningBox><strong>Common but dangerous mistake</strong> Forgetting <code className="inline">shell: bash</code> on every <code className="inline">run:</code> step inside a composite action — unlike a normal workflow job (where <code className="inline">runs-on</code> implies a default shell), composite action steps require you to declare the shell explicitly every time, or the action fails to even validate.</WarningBox>

  

              </div>
            );
          case 's4l2':
            return (
              <div>
                
  <h2>4.2 Reusable workflows <span className="badge advanced">Advanced</span></h2>
  <p className="subtitle">Stage 4 · Reusable Workflows — calling an entire workflow, not just a step</p>

  <ConceptBox title="Why this matters">
    
    Composite actions reuse steps within a job. <strong>Reusable workflows</strong> go a level higher — an entire multi-job pipeline (test → build → deploy) defined once and called from other workflow files with <code className="inline">workflow_call</code>, the way a Terraform module gets called with different inputs from multiple root configs instead of copy-pasted.
  </ConceptBox>

  <CodeBlock code={`# .github/workflows/reusable-deploy.yml
name: Reusable Deploy

on:
  workflow_call:
    inputs:
      environment-name:
        required: true
        type: string
    secrets:
      deploy-key:
        required: true

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: \$\{\{ inputs.environment-name \}\}
    steps:
      - run: echo 'Deploying to \$\{\{ inputs.environment-name \}\} with a provided secret'
        env:
          KEY: \$\{\{ secrets.deploy-key \}\}`} title="Terminal"></CodeBlock>

  <p>Call it from another workflow:</p>
  <CodeBlock code={`# .github/workflows/deploy.yml
jobs:
  call-deploy:
    uses: ./.github/workflows/reusable-deploy.yml
    with:
      environment-name: staging
    secrets:
      deploy-key: \$\{\{ secrets.STAGING_DEPLOY_KEY \}\}`} title="Terminal"></CodeBlock>

  <TipBox title="Where the boundary is"> Notice secrets aren't automatically inherited into a called reusable workflow — you pass them explicitly (or use <code className="inline">secrets: inherit</code> to pass everything), which is a deliberate security boundary so a reusable workflow can't silently read secrets its caller never intended to share.</TipBox>

  

              </div>
            );
          case 's4l3':
            return (
              <div>
                
  <h2>4.3 Sharing across an org <span className="badge advanced">Advanced</span></h2>
  <p className="subtitle">Stage 4 · Reusable Workflows — one pipeline, every repo</p>

  <ConceptBox title="Why this matters">
    
    A composite action or reusable workflow only solves duplication <em>within</em> one repo until you reference it across repos — at which point twenty microservices can all call the same centrally-maintained CI pipeline, and a security fix or a new compliance step gets added once and takes effect everywhere on the next run, instead of needing twenty separate pull requests.
  </ConceptBox>

  <CodeBlock code={`# Any repo in your org can now call a workflow that lives in a shared repo:
jobs:
  ci:
    uses: my-org/shared-workflows/.github/workflows/node-ci.yml@v1
    with:
      node-version: '20'`} title="Terminal"></CodeBlock>

  <TipBox title="Where to set this up for real"> Create a dedicated repo (e.g. <code className="inline">my-org/shared-workflows</code>), put reusable workflows in its <code className="inline">.github/workflows/</code>, tag releases (<code className="inline">v1</code>, <code className="inline">v1.2.0</code>) so consuming repos pin to a stable version instead of a moving branch, and grant other repos access via that repo's visibility settings (public, or "available to this organization" if private).</TipBox>

  <WarningBox><strong>Common but dangerous mistake</strong> Pointing every consuming repo at <code className="inline">@main</code> on the shared workflows repo instead of a tagged version. A breaking change pushed to the shared workflow's main branch then silently breaks every single repo across the org simultaneously, all at once, with no warning — exactly the "blast radius" problem version pinning exists to prevent.</WarningBox>

  

              </div>
            );
          case 's4l4':
            return (
              <div>
                
  <h2>4.4 Caching dependencies <span className="badge intermediate">Intermediate</span></h2>
  <p className="subtitle">Stage 4 · Reusable Workflows — the boring step that saves real minutes and money</p>

  <ConceptBox title="Why this matters">
    
    Every job starts on a brand-new machine with nothing installed — <code className="inline">npm ci</code> re-downloading every package from scratch, every single run, adds up fast across dozens of runs a day. <code className="inline">actions/cache</code> persists a folder (like <code className="inline">node_modules</code> or npm's download cache) between runs, keyed by a hash of your lockfile, so unchanged dependencies are restored instantly instead of re-fetched.
  </ConceptBox>

  <CodeBlock code={`steps:
  - uses: actions/checkout@v4
  - uses: actions/setup-node@v4
    with:
      node-version: '20'
      cache: 'npm'                          # built-in shortcut for the common case
      cache-dependency-path: sample-app/package-lock.json
  - run: npm ci
    working-directory: sample-app`} title="Terminal"></CodeBlock>

  <p>For tools without a built-in <code className="inline">cache:</code> shortcut, use <code className="inline">actions/cache</code> directly:</p>
  <CodeBlock code={`- uses: actions/cache@v4
  with:
    path: ~/.cache/pip
    key: \$\{\{ runner.os \}\}-pip-\$\{\{ hashFiles('**/requirements.txt') \}\}
    restore-keys: |
      \$\{\{ runner.os \}\}-pip-`} title="Terminal"></CodeBlock>

  <TipBox title="Where to verify it's working"> Expand the setup step's log in the Actions tab — you'll see "Cache restored from key:" on a hit, or "Cache not found for input keys" on a miss (expected on the very first run, or right after a lockfile change).</TipBox>

  

              </div>
            );
          case 's4l5':
            return (
              <div>
                
  <h2>4.5 Capstone: DRY pipeline library <span className="badge advanced">Advanced</span></h2>
  <p className="subtitle">Stage 4 · Reusable Workflows — refactor everything so far into reusable pieces</p>

  <ConceptBox title="Why this matters">
    
    This capstone takes the staging→production pipeline from Stage 3 and refactors its repeated setup logic into a composite action — the same kind of refactor a senior engineer would push back and request in code review on a sprawling, copy-pasted workflow file.
  </ConceptBox>

  <TipBox title="Where to run this"> Same repo, building on Stage 3's <code className="inline">deploy.yml</code>.</TipBox>

  <div className="g-step">
    <div>1</div>
    <div>
      <h4>Create the composite action: <code className="inline">.github/actions/setup-app/action.yml</code></h4>
      <CodeBlock code={`name: 'Setup App'
description: 'Checkout, install Node with caching, install deps'
inputs:
  node-version:
    default: '20'
runs:
  using: 'composite'
  steps:
    - uses: actions/setup-node@v4
      with:
        node-version: \$\{\{ inputs.node-version \}\}
        cache: 'npm'
        cache-dependency-path: sample-app/package-lock.json
    - run: npm ci
      shell: bash
      working-directory: sample-app`} title="Create the composite action: .github/actions/setup-app/action.yml"></CodeBlock>
    </div>
  </div>

  <div className="g-step">
    <div>2</div>
    <div>
      <h4>Rewrite <code className="inline">deploy.yml</code> to use it</h4>
      <CodeBlock code={`name: Deploy

on:
  push:
    branches: [main]

permissions:
  contents: read

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: ./.github/actions/setup-app
      - run: npm test
        working-directory: sample-app

  deploy-staging:
    needs: test
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - run: echo 'Deployed to \$\{\{ vars.DEPLOY_TARGET_URL \}\}'

  deploy-production:
    needs: deploy-staging
    runs-on: ubuntu-latest
    environment: production
    steps:
      - run: echo 'Deployed to \$\{\{ vars.DEPLOY_TARGET_URL \}\}'`} title="Rewrite deploy.yml to use it"></CodeBlock>
    </div>
  </div>

  <div className="g-step">
    <div>3</div>
    <div>
      <h4>Push and confirm caching kicks in on the second run</h4>
      <CodeBlock code={`git add .github/actions .github/workflows/deploy.yml
git commit -m 'Refactor setup steps into a composite action with caching'
git push
gh run watch`} title="Push and confirm caching kicks in on the second run"></CodeBlock>
      <p>Push a second, trivial commit right after — the <code className="inline">test</code> job's setup step should now show "Cache restored," noticeably faster than the first run.</p>
    </div>
  </div>

  <div className="g-checklist"><ul classname="g-checklist"><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="gha-cb-s4l5-0" /><label htmlfor="gha-cb-s4l5-0">I built a composite action and called it with uses: ./.github/actions/...</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="gha-cb-s4l5-1" /><label htmlfor="gha-cb-s4l5-1">I understand the difference between a composite action (steps) and a reusable workflow (whole jobs)</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="gha-cb-s4l5-2" /><label htmlfor="gha-cb-s4l5-2">I added dependency caching and confirmed a cache hit on a repeat run</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="gha-cb-s4l5-3" /><label htmlfor="gha-cb-s4l5-3">I know why org-shared workflows should be tag-pinned, not pointed at a moving branch</label></li></ul></div>

  

              </div>
            );
          case 's5l1':
            return (
              <div>
                
  <h2>5.1 OIDC: no more static cloud keys <span className="badge expert">Expert</span></h2>
  <p className="subtitle">Stage 5 · Production Patterns — security hardening</p>

  <ConceptBox title="Why this matters">
    
    A long-lived AWS access key sitting in GitHub Secrets is a permanent liability — if it ever leaks (a misconfigured log, a compromised dependency, a careless debug step), it works forever until someone notices and rotates it. OpenID Connect (OIDC) lets GitHub Actions request a short-lived, auto-expiring AWS credential at runtime by proving "I am this specific repo, this specific workflow, right now" — no stored AWS secret ever exists in GitHub at all.
  </ConceptBox>

  <CodeBlock code={`WITHOUT OIDC                                  WITH OIDC
─────────────                                ──────────
GitHub Secret: AWS_ACCESS_KEY_ID              GitHub workflow run starts
GitHub Secret: AWS_SECRET_ACCESS_KEY                    │
        │                                                ▼
        │ (valid forever, until you             Requests a token from GitHub's
        │  manually rotate it)                  OIDC provider, proving repo +
        ▼                                       branch + workflow identity
   AWS API calls                                         │
                                                           ▼
                                                AWS IAM trusts that identity,
                                                issues a credential valid for
                                                this ONE run, then it expires`} title="Architecture"></CodeBlock>

  <div className="g-step">
    <div>1</div>
    <div>
      <h4>One-time AWS setup: trust GitHub as an OIDC provider</h4>
      <TipBox title="Where to run this"> AWS CLI, configured with an admin/IAM-capable identity, from your local terminal — this is one-time infrastructure setup, not part of every pipeline run.</TipBox>
      <CodeBlock code={`aws iam create-open-id-connect-provider \\
  --url https://token.actions.githubusercontent.com \\
  --client-id-list sts.amazonaws.com \\
  --thumbprint-list 6938fd4d98bab03faadb97b34396831e3780aea1`} title="One-time AWS setup: trust GitHub as an OIDC provider"></CodeBlock>
      <p>Then create an IAM role with a trust policy scoped to your exact repo and branch (not "any GitHub repo can assume this role"):</p>
      <CodeBlock code={`\{
  'Effect': 'Allow',
  'Principal': \{ 'Federated': 'arn:aws:iam::123456789012:oidc-provider/token.actions.githubusercontent.com' \},
  'Action': 'sts:AssumeRoleWithWebIdentity',
  'Condition': \{
    'StringEquals': \{ 'token.actions.githubusercontent.com:aud': 'sts.amazonaws.com' \},
    'StringLike': \{ 'token.actions.githubusercontent.com:sub': 'repo:your-org/sample-app:ref:refs/heads/main' \}
  \}
\}`} title="One-time AWS setup: trust GitHub as an OIDC provider"></CodeBlock>
    </div>
  </div>

  <div className="g-step">
    <div>2</div>
    <div>
      <h4>Use it from a workflow — no stored AWS secret anywhere</h4>
      <CodeBlock code={`permissions:
  id-token: write     # required — this is what lets the job request an OIDC token
  contents: read

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123456789012:role/github-actions-deploy
          aws-region: us-east-1
      - run: aws s3 ls   # now authenticated, with a credential that expires when this job ends`} title="Use it from a workflow — no stored AWS secret anywhere"></CodeBlock>
    </div>
  </div>

  <WarningBox><strong>Common but dangerous mistake</strong> Scoping the IAM trust policy's <code className="inline">sub</code> condition too loosely — e.g. <code className="inline">repo:your-org/*</code> instead of one specific repo and branch — means <em>any</em> workflow in <em>any</em> repo in your org can assume that production deploy role. Scope it to the exact repo and branch that should have this access, the same least-privilege instinct as IAM policies in general.</WarningBox>

  

              </div>
            );
          case 's5l2':
            return (
              <div>
                
  <h2>5.2 Self-hosted runners <span className="badge expert">Expert</span></h2>
  <p className="subtitle">Stage 5 · Production Patterns — when GitHub's machines aren't enough</p>

  <ConceptBox title="Why this matters">
    
    GitHub-hosted runners are disposable, free (within limits), and zero-maintenance — but they can't reach a private VPC, don't have GPUs, and have hard time/resource limits. A <strong>self-hosted runner</strong> is a machine you control (a server, a Kubernetes pod, an EC2 instance) that registers itself to your repo and picks up jobs — the same tradeoff as choosing between Jenkins's managed agents and on-prem build boxes.
  </ConceptBox>

  <table>
    <tbody><tr><th></th><th>GitHub-hosted</th><th>Self-hosted</th></tr>
    <tr><td>Maintenance</td><td>None — GitHub manages it</td><td>You patch, secure, and scale it</td></tr>
    <tr><td>Network access</td><td>Public internet only</td><td>Can reach your private VPC, internal services</td></tr>
    <tr><td>Cost model</td><td>Free tier + per-minute billing after</td><td>You pay for the underlying compute, no per-minute Actions billing</td></tr>
    <tr><td>Persistent state between runs</td><td>Never — fresh VM every time</td><td>Possible (and a security risk) unless you clean up explicitly</td></tr>
  </tbody></table>

  <WarningBox><strong>Common but dangerous mistake</strong> Using a self-hosted runner on a <em>public</em> repository. Anyone can open a pull request containing a workflow that runs arbitrary code on your machine — GitHub explicitly warns against this because a malicious PR can turn your self-hosted runner into a foothold inside your network. Self-hosted runners are safe primarily for private repos where you control who can open PRs and trigger workflows.</WarningBox>

  <TipBox title="Where you'd register one"> Repo (or org) → Settings → Actions → Runners → "New self-hosted runner" gives you a registration token and a short install script to run on the target machine — out of scope to actually provision here since it requires infrastructure this guide doesn't assume you have, but know it exists for when GitHub-hosted runners can't reach what you need.</TipBox>

  

              </div>
            );
          case 's5l3':
            return (
              <div>
                
  <h2>5.3 Debugging a failed run at 2am <span className="badge expert">Expert</span></h2>
  <p className="subtitle">Stage 5 · Production Patterns — this tool's version of <code className="inline">docker logs</code></p>

  <ConceptBox title="Why this matters">
    
    A red X in the Actions tab with a generic "Process completed with exit code 1" tells you almost nothing on its own. Knowing where to actually look — step logs, re-runs with debug logging, and artifact uploads for anything that doesn't fit in a log line — is the difference between a five-minute diagnosis and an hour of guessing.
  </ConceptBox>

  <div className="g-step">
    <div>1</div>
    <div>
      <h4>Start with the step logs, expanded</h4>
      <p>Click the failed job, then the failed step — GitHub auto-scrolls to the first error line and highlights it red. Read the actual command that ran (GitHub echoes it before output), not just the error, since the failure is often in an earlier step's side effect rather than the one that shows red.</p>
    </div>
  </div>

  <div className="g-step">
    <div>2</div>
    <div>
      <h4>Re-run with debug logging when the normal log isn't enough</h4>
      <p>On the failed run's page, click "Re-run jobs" → "Enable debug logging." This sets <code className="inline">ACTIONS_STEP_DEBUG=true</code> behind the scenes and exposes verbose internals — exact environment variables, every action's internal steps — normally hidden to keep logs readable.</p>
      <CodeBlock code={`# Equivalent if triggering via the API/CLI instead of the UI button:
gh run rerun <run-id> --debug`} title="Re-run with debug logging when the normal log isn't enough"></CodeBlock>
    </div>
  </div>

  <div className="g-step">
    <div>3</div>
    <div>
      <h4>Upload artifacts for anything a log line can't show</h4>
      <p>Screenshots from a failed end-to-end test, a generated coverage report, a core dump — these need <code className="inline">actions/upload-artifact</code>, not <code className="inline">echo</code>.</p>
      <CodeBlock code={`- name: Upload test results on failure
  if: failure()
  uses: actions/upload-artifact@v4
  with:
    name: test-results
    path: sample-app/coverage/`} title="Upload artifacts for anything a log line can't show"></CodeBlock>
    </div>
  </div>

  <ErrorCard error="⚠️ Real production incident: deploy passed CI but broke prod anyway" meaning="CI run #1842: ✅ all green. Production error rate spiked to 40% nine minutes after the deploy completed." fix="Scenario: The test job used a matrix that only tested against a mocked database, while the actual production deploy connected to a real Postgres instance with a schema migration the tests never exercised — CI being green only proves the things you actually tested passed, not that production behaves identically.
      Fix: The team added a post-deploy smoke test job (hitting a real health-check endpoint against the just-deployed environment, with automatic rollback on failure) as a required step after deploy-production, not just before it — closing the gap between 'tests passed' and 'the live system actually works.'"></ErrorCard>

  

              </div>
            );
          case 's5l4':
            return (
              <div>
                
  <h2>5.4 Real deployment patterns <span className="badge expert">Expert</span></h2>
  <p className="subtitle">Stage 5 · Production Patterns — connecting to the rest of your stack</p>

  <ConceptBox title="Why this matters">
    
    In a real pipeline, GitHub Actions is rarely the final destination — it's the orchestrator that hands off to the tools that actually run your software. The most common handoff: build a Docker image, push it to a registry, and either deploy it directly or trigger something else (Kubernetes, an EC2 deploy script) to pull the new image.
  </ConceptBox>

  <CodeBlock code={`jobs:
  build-and-push:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write          # needed to push to GHCR
    steps:
      - uses: actions/checkout@v4

      - name: Log in to GHCR
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: \$\{\{ github.actor \}\}
          password: \$\{\{ secrets.GITHUB_TOKEN \}\}

      - name: Build and push
        uses: docker/build-push-action@v6
        with:
          context: ./sample-app
          push: true
          tags: ghcr.io/\$\{\{ github.repository \}\}:\$\{\{ github.sha \}\}`} title="Terminal"></CodeBlock>

  <p>Just like you tagged Docker images locally with a version before pushing to a registry, this tags every image with the exact commit SHA that built it — so "what's actually running in production" is always traceable back to one specific commit, never a vague "latest."</p>

  <TipBox title="Where this connects to Kubernetes"> A common next step (not built in this guide) is a final job that runs <code className="inline">{"kubectl set image deployment/app app=ghcr.io/...:${{ github.sha }}"}</code> against a cluster, or — more safely for production — updates a GitOps repo that a tool like Argo CD watches, so the actual cluster change goes through its own review and reconciliation rather than a direct push from CI.</TipBox>

  

              </div>
            );
          case 's5l5':
            return (
              <div>
                
  <h2>5.5 Capstone: production-grade pipeline <span className="badge expert">Expert</span></h2>
  <p className="subtitle">Stage 5 · Production Patterns — every lesson from this stage, in one workflow</p>

  <ConceptBox title="Why this matters">
    
    This combines least-privilege permissions, version-pinned actions, environment-gated deployment, and a real artifact handoff (a Docker image with a traceable tag) into the shape of a pipeline you could defend, line by line, in a production readiness review.
  </ConceptBox>

  <TipBox title="Where to run this"> Same repo. This lab is the direct precursor to the Final Capstone Project section at the end of this guide, which adds the AWS S3/OIDC deployment step on top of this.</TipBox>

  <CodeBlock code={`name: Production Pipeline

on:
  push:
    branches: [main]

permissions:
  contents: read

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: ./.github/actions/setup-app
      - run: npm test
        working-directory: sample-app

  build-and-push:
    needs: test
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    outputs:
      image-tag: \$\{\{ steps.meta.outputs.tag \}\}
    steps:
      - uses: actions/checkout@v4
      - id: meta
        run: echo 'tag=ghcr.io/\$\{\{ github.repository \}\}:\$\{\{ github.sha \}\}' >> '\$GITHUB_OUTPUT'
      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: \$\{\{ github.actor \}\}
          password: \$\{\{ secrets.GITHUB_TOKEN \}\}
      - uses: docker/build-push-action@v6
        with:
          context: ./sample-app
          push: true
          tags: \$\{\{ steps.meta.outputs.tag \}\}

  deploy-production:
    needs: build-and-push
    runs-on: ubuntu-latest
    environment: production
    steps:
      - run: echo 'Promoting \$\{\{ needs.build-and-push.outputs.image-tag \}\} to production'`} title="Terminal"></CodeBlock>

  <Quiz question="Q: Why does build-and-push declare its own permissions block separately from the top-level one, instead of relying on the workflow-level permissions: contents: read?" answer="A job-level permissions block overrides the workflow-level default for that job only. test only ever reads code, so it stays at the minimal top-level default — but build-and-push additionally needs packages: write to push to GHCR, and granting that at the workflow level would hand write access to every job, including ones that never need it."></Quiz>

  <div className="g-checklist"><ul classname="g-checklist"><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="gha-cb-s5l5-0" /><label htmlfor="gha-cb-s5l5-0">I understand how OIDC replaces long-lived cloud credentials</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="gha-cb-s5l5-1" /><label htmlfor="gha-cb-s5l5-1">I know when a self-hosted runner is justified, and why never on a public repo</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="gha-cb-s5l5-2" /><label htmlfor="gha-cb-s5l5-2">I can re-run a failed workflow with debug logging enabled</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="gha-cb-s5l5-3" /><label htmlfor="gha-cb-s5l5-3">I built a pipeline that pushes a SHA-tagged Docker image and gates the final deploy behind an environment</label></li></ul></div>

  

              </div>
            );
          case 'error-reference':
            return (
              <div>
                
  <h1>🧯 Master Error Reference</h1>
  <p className="subtitle">The most common real GitHub Actions errors — searchable, not meant to be read top to bottom. If you landed here mid-panic, use Ctrl+F or the sidebar search.</p>

  <ErrorCard error="'remote: Permission to your-org/repo.git denied to github-actions[bot]'" meaning="remote: Permission to your-org/repo.git denied to github-actions[bot].
fatal: unable to access 'https://github.com/your-org/repo.git/': The requested URL returned error: 403" fix="What it means: A step is trying to git push back to the repo using the default GITHUB_TOKEN, but that token's permissions don't include write access to repo contents.
      Fix: Add permissions: contents: write at the workflow or job level. If you're pushing to a protected branch with required status checks, the bot token still can't bypass branch protection rules the way an admin can — you may need a personal access token or a dedicated deploy key for that specific case."></ErrorCard>

  <ErrorCard error="'Error: Resource not accessible by integration'" meaning="RequestError [HttpError]: Resource not accessible by integration" fix="What it means: A step is calling the GitHub API (often via actions/github-script or gh) to do something — comment on an issue, create a release — that the current GITHUB_TOKEN permissions don't allow.
      Fix: Check exactly which API call failed in the log, then add the matching scope to the workflow's permissions: block — e.g. issues: write for commenting, contents: write for creating releases. Don't default to write-all; add only what that specific call needs."></ErrorCard>

  <ErrorCard error="'denied: installation not allowed to Write organization package'" meaning="ERROR: failed to push: denied: installation not allowed to Write organization package" fix="What it means: A job is trying to push a Docker image to GHCR but either the workflow's permissions doesn't include packages: write, or — for org-owned repos — the organization's package creation settings restrict which repos/workflows can publish packages.
      Fix: Add packages: write to the job's permissions first. If that doesn't resolve it, check the organization's Settings → Packages → 'Package creation' policy, which can independently block this regardless of the workflow's own permissions."></ErrorCard>

  <ErrorCard error="'Error: Input required and not supplied: node-version'" meaning="Error: Input required and not supplied: node-version" fix="What it means: An action (often a composite action you wrote, or a strict marketplace action) has a required input that wasn't passed in the with: block of the step calling it.
      Fix: Open the action's action.yml (or its README on the Marketplace) and check which inputs are marked required: true with no default — those must always be passed explicitly, every time the action is used."></ErrorCard>

  <ErrorCard error="'Unable to resolve action `your-org/your-action@v1`, repository not found'" meaning="Error: Unable to resolve action `your-org/setup-thing@v1`, repository not found" fix="What it means: Either there's a typo in the action reference, the tag/branch @v1 doesn't exist, or — very commonly when referencing a private action repo from another repo — the calling workflow's token doesn't have access to that private repo.
      Fix: Double-check the exact org/repo name and tag spelling first (it's almost always this). If the action repo is genuinely private, confirm both repos are in the same organization and that cross-repo access is actually enabled, since a private action repo isn't automatically visible to every other repo in the org by default."></ErrorCard>

  <ErrorCard error="Workflow stuck on 'Waiting for approval' forever" meaning="This workflow is awaiting approval from a required reviewer before running." fix="What it means: A job targets an environment with required reviewers configured, and the listed reviewer either hasn't seen the notification, doesn't have write access to the repo anymore, or the environment has zero remaining valid reviewers (e.g. the only configured reviewer left the org).
      Fix: Check Settings → Environments → that environment's 'Required reviewers' list is current and that listed reviewers still have at least write access to the repo. Anyone with write access (not just the configured reviewers) can also see and approve from the run's page if reviewers were misconfigured — but the long-term fix is keeping that list accurate."></ErrorCard>

  <ErrorCard error="'fatal: could not read Username for 'https://github.com': No such device or address'" meaning="fatal: could not read Username for 'https://github.com': No such device or address" fix="What it means: A step is running a raw git command (clone, fetch, submodule update) against a private repo or private submodule without authentication — actions/checkout handles auth for the main repo automatically, but it doesn't automatically extend to separately-cloned private submodules or external private repos.
      Fix: For private submodules, add submodules: true (or recursive) to your actions/checkout step and ensure the token has access. For a separate private repo entirely, authenticate explicitly with a token that has access before the clone, e.g. via https://x-access-token:${{ secrets.TOKEN }}@github.com/...."></ErrorCard>

  <ErrorCard error="'Error: Process completed with exit code 1' (no other context)" meaning="Error: Process completed with exit code 1" fix="What it means: This is GitHub's generic wrapper message when any run: step's underlying command exits non-zero — it's not itself the error, it's the summary. The actual cause is always a few lines above it in the same step's expanded log.
      Fix: Scroll up within the same failed step rather than reading this line as the answer. If the real cause still isn't clear from the log, re-run with debug logging enabled (Stage 5.3) before assuming the tool itself is broken — it almost never is."></ErrorCard>

  

              </div>
            );
          case 'cleanup':
            return (
              <div>
                
  <h1>🧹 Cleanup &amp; Cost Control</h1>
  <p className="subtitle">Tear down everything this guide's AWS portions created. Skip this section entirely if you never did the OIDC/S3 labs in Stage 5 — GitHub-hosted runner usage within the free tier costs nothing to "clean up."</p>

  <WarningBox><strong>Why this section exists</strong> The single most common "I thought I deleted it but I'm still being billed" mistake with S3 is forgetting that <strong>versioned</strong> buckets keep every prior version of every object — deleting an object just adds a "delete marker," it doesn't free the storage. If you ever enabled versioning while testing, you must also purge the old versions, not just the visible objects.</WarningBox>

  <div className="g-step">
    <div>1</div>
    <div>
      <h4>Empty and delete the S3 bucket (including old versions)</h4>
      <TipBox title="Where to run this"> AWS CLI, local terminal.</TipBox>
      <CodeBlock code={`# Delete all current objects
aws s3 rm s3://your-capstone-bucket-name --recursive

# If versioning was ever enabled, also purge old versions and delete markers
aws s3api list-object-versions --bucket your-capstone-bucket-name \\
  --query '\{Objects: Versions[].\{Key:Key,VersionId:VersionId\}\}' --output json > /tmp/versions.json
aws s3api delete-objects --bucket your-capstone-bucket-name --delete file:///tmp/versions.json

# Now the bucket itself
aws s3 rb s3://your-capstone-bucket-name`} title="Empty and delete the S3 bucket (including old versions)"></CodeBlock>
    </div>
  </div>

  <div className="g-step">
    <div>2</div>
    <div>
      <h4>Remove the IAM OIDC role and provider</h4>
      <CodeBlock code={`aws iam delete-role-policy --role-name github-actions-deploy --policy-name s3-deploy
aws iam delete-role --role-name github-actions-deploy
aws iam delete-open-id-connect-provider \\
  --open-id-connect-provider-arn arn:aws:iam::123456789012:oidc-provider/token.actions.githubusercontent.com`} title="Remove the IAM OIDC role and provider"></CodeBlock>
      <p>The IAM role and OIDC provider aren't billed resources themselves, but leaving them in place is a standing security liability — an unused role with deploy access is exactly the kind of forgotten permission that turns into an incident a year later.</p>
    </div>
  </div>

  <div className="g-step">
    <div>3</div>
    <div>
      <h4>Delete the GHCR container image (optional, but tidy)</h4>
      <CodeBlock code={`# Via the GitHub UI: your profile → Packages → select the package → 'Delete this version' (or whole package)
# Or via gh:
gh api -X DELETE /user/packages/container/sample-app`} title="Delete the GHCR container image (optional, but tidy)"></CodeBlock>
      <p>GHCR storage for small private images is free within generous limits, so this step is about keeping your packages list clean, not avoiding a bill.</p>
    </div>
  </div>

  <ErrorCard error="⚠️ 'I deleted the bucket's objects but I'm still being billed'" meaning="(S3 bucket shows 0 visible objects, but the AWS Cost Explorer S3 line item hasn't dropped to zero)" fix="Scenario: Versioning was enabled on the bucket at some point during testing, and a plain aws s3 rm --recursive only removes the latest version of each object (or adds a delete marker) — every prior version, and every delete marker itself, is still sitting in storage being billed.
      Fix: Run the version-purging command from Step 1 above before deleting the bucket — aws s3api list-object-versions followed by delete-objects targeting every VersionId, not just the current object list."></ErrorCard>

  <div className="g-checklist"><ul classname="g-checklist"><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="gha-cb-cleanup-0" /><label htmlfor="gha-cb-cleanup-0">S3 bucket is fully deleted (including all object versions)</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="gha-cb-cleanup-1" /><label htmlfor="gha-cb-cleanup-1">IAM role and OIDC provider removed</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="gha-cb-cleanup-2" /><label htmlfor="gha-cb-cleanup-2">GHCR test images deleted (optional)</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="gha-cb-cleanup-3" /><label htmlfor="gha-cb-cleanup-3">Checked the AWS Billing dashboard's Cost Explorer to confirm no lingering charge from this guide</label></li></ul></div>

  

              </div>
            );
          case 'capstone':
            return (
              <div>
                
  <h1>🏁 Final Capstone Project <span className="badge expert">Expert</span></h1>
  <p className="subtitle">Build a complete CI/CD pipeline for a small Node.js app: lint and test on every pull request, build and push a Docker image to GHCR on every merge to main, and deploy the static frontend to AWS S3 via OIDC, gated behind a protected production environment.</p>

  <ConceptBox title="The scenario">
    
    You're the only DevOps-minded person on a small team shipping a tiny internal tool. Right now someone tests changes locally, builds a Docker image by hand, and uploads a static page to S3 through the console "when they remember." It works until it doesn't — a teammate forgot to run tests once and broke the staging tool for two days. Your job in this capstone: replace every manual step with a pipeline that runs the same way, every time, with a human approval gate before anything touches production.
  </ConceptBox>

  <h3>Step 0 — One-time AWS setup (skip if you already completed Stage 5.1)</h3>
  <div className="g-step">
    <div>1</div>
    <div>
      <h4>Create the S3 bucket for the static frontend</h4>
      <TipBox title="Where to run this"> AWS CLI, local terminal. Pick a globally-unique bucket name.</TipBox>
      <CodeBlock code={`aws s3 mb s3://your-capstone-bucket-name --region us-east-1
aws s3 website s3://your-capstone-bucket-name --index-document index.html

# Public read policy scoped only to this bucket — needed for static website hosting
aws s3api put-bucket-policy --bucket your-capstone-bucket-name --policy '\{
  'Version': '2012-10-17',
  'Statement': [\{
    'Sid': 'PublicReadGetObject',
    'Effect': 'Allow',
    'Principal': '*',
    'Action': 's3:GetObject',
    'Resource': 'arn:aws:s3:::your-capstone-bucket-name/*'
  \}]
\}'`} title="Create the S3 bucket for the static frontend"></CodeBlock>
      <p><strong>Do not</strong> enable versioning on this bucket unless you intend to follow the Cleanup section's version-purge steps later — versioning on a throwaway capstone bucket is exactly how the "still being billed" mistake from the Cleanup section happens.</p>
    </div>
  </div>

  <div className="g-step">
    <div>2</div>
    <div>
      <h4>Set up the OIDC trust and IAM role (full detail in Stage 5.1)</h4>
      <CodeBlock code={`aws iam create-open-id-connect-provider \\
  --url https://token.actions.githubusercontent.com \\
  --client-id-list sts.amazonaws.com \\
  --thumbprint-list 6938fd4d98bab03faadb97b34396831e3780aea1

aws iam create-role --role-name github-actions-deploy --assume-role-policy-document '\{
  'Version': '2012-10-17',
  'Statement': [\{
    'Effect': 'Allow',
    'Principal': \{ 'Federated': 'arn:aws:iam::YOUR_ACCOUNT_ID:oidc-provider/token.actions.githubusercontent.com' \},
    'Action': 'sts:AssumeRoleWithWebIdentity',
    'Condition': \{
      'StringEquals': \{ 'token.actions.githubusercontent.com:aud': 'sts.amazonaws.com' \},
      'StringLike': \{ 'token.actions.githubusercontent.com:sub': 'repo:YOUR_ORG/sample-app:ref:refs/heads/main' \}
    \}
  \}]
\}'

aws iam put-role-policy --role-name github-actions-deploy --policy-name s3-deploy --policy-document '\{
  'Version': '2012-10-17',
  'Statement': [\{
    'Effect': 'Allow',
    'Action': ['s3:PutObject', 's3:DeleteObject', 's3:ListBucket'],
    'Resource': ['arn:aws:s3:::your-capstone-bucket-name', 'arn:aws:s3:::your-capstone-bucket-name/*']
  \}]
\}'`} title="Set up the OIDC trust and IAM role (full detail in Stage 5.1)"></CodeBlock>
    </div>
  </div>

  <div className="g-step">
    <div>3</div>
    <div>
      <h4>Configure the GitHub side</h4>
      <p>In Settings → Environments → <code className="inline">production</code> (create it if it doesn't exist from Stage 3): add a required reviewer (yourself), an environment <strong>secret</strong> named <code className="inline">AWS_DEPLOY_ROLE_ARN</code> set to the role ARN from Step 2, and an environment <strong>variable</strong> named <code className="inline">CAPSTONE_BUCKET_NAME</code> set to your bucket name.</p>
    </div>
  </div>

  <h3>Files to create</h3>
  <p>All paths are relative to your repo root — the same <code className="inline">sample-app</code> repo used throughout this guide.</p>

  <div className="g-step">
    <div>1</div>
    <div>
      <h4>Replace <code className="inline">sample-app/package.json</code></h4>
      <CodeBlock code={`\{
  'name': 'sample-app',
  'version': '1.0.0',
  'description': 'Capstone sample app for the GitHub Actions guide',
  'main': 'server.js',
  'scripts': \{
    'start': 'node server.js',
    'test': 'jest',
    'lint': 'node --check server.js &amp;&amp; node --check sum.js'
  \},
  'devDependencies': \{
    'jest': '^29.7.0'
  \}
\}`} title="Replace sample-app/package.json"></CodeBlock>
      <p><code className="inline">lint</code> here is a plain Node syntax check, not a full ESLint setup — it's a deliberately small stand-in so this capstone stays achievable without extra config, but it occupies the same pipeline position a real ESLint/Prettier step would in production.</p>
    </div>
  </div>

  <div className="g-step">
    <div>2</div>
    <div>
      <h4>Create <code className="inline">sample-app/server.js</code></h4>
      <CodeBlock code={`const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => \{
  const safePath = req.url === '/' ? 'index.html' : req.url;
  const filePath = path.join(__dirname, 'public', safePath);

  fs.readFile(filePath, (err, content) => \{
    if (err) \{
      res.writeHead(404, \{ 'Content-Type': 'text/plain' \});
      res.end('Not found');
      return;
    \}
    res.writeHead(200, \{ 'Content-Type': 'text/html' \});
    res.end(content);
  \});
\});

server.listen(PORT, () => console.log(\`Listening on port \$\{PORT\}\`));`} title="Create sample-app/server.js"></CodeBlock>
    </div>
  </div>

  <div className="g-step">
    <div>3</div>
    <div>
      <h4>Create <code className="inline">sample-app/public/index.html</code></h4>
      <CodeBlock code={`<!DOCTYPE html>
<html lang='en'>
<head>
  <meta charset='UTF-8'>
  <title>Capstone App</title>
</head>
<body>
  <h1>Deployed entirely by GitHub Actions</h1>
  <p>Lint → test → Docker build → push to GHCR → manual approval → S3 deploy. No manual step.</p>
</body>
</html>`} title="Create sample-app/public/index.html"></CodeBlock>
    </div>
  </div>

  <div className="g-step">
    <div>4</div>
    <div>
      <h4>Create <code className="inline">sample-app/Dockerfile</code></h4>
      <CodeBlock code={`FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY server.js ./
COPY public ./public
EXPOSE 3000
CMD ['node', 'server.js']`} title="Create sample-app/Dockerfile"></CodeBlock>
    </div>
  </div>

  <div className="g-step">
    <div>5</div>
    <div>
      <h4>Create <code className="inline">.github/workflows/capstone.yml</code></h4>
      <CodeBlock code={`name: Capstone Pipeline

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

permissions:
  contents: read

jobs:
  lint-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: ./.github/actions/setup-app
      - name: Lint
        run: npm run lint
        working-directory: sample-app
      - name: Test
        run: npm test
        working-directory: sample-app

  build-and-push:
    if: github.event_name == 'push' &amp;&amp; github.ref_name == 'main'
    needs: lint-and-test
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    outputs:
      image-tag: \$\{\{ steps.meta.outputs.tag \}\}
    steps:
      - uses: actions/checkout@v4
      - id: meta
        run: echo 'tag=ghcr.io/\$\{\{ github.repository \}\}:\$\{\{ github.sha \}\}' >> '\$GITHUB_OUTPUT'
      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: \$\{\{ github.actor \}\}
          password: \$\{\{ secrets.GITHUB_TOKEN \}\}
      - uses: docker/build-push-action@v6
        with:
          context: ./sample-app
          push: true
          tags: \$\{\{ steps.meta.outputs.tag \}\}

  deploy-production:
    if: github.event_name == 'push' &amp;&amp; github.ref_name == 'main'
    needs: build-and-push
    runs-on: ubuntu-latest
    environment: production
    permissions:
      id-token: write
      contents: read
    steps:
      - uses: actions/checkout@v4
      - uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: \$\{\{ secrets.AWS_DEPLOY_ROLE_ARN \}\}
          aws-region: us-east-1
      - name: Sync static frontend to S3
        run: aws s3 sync sample-app/public s3://\$\{\{ vars.CAPSTONE_BUCKET_NAME \}\} --delete
      - name: Confirm deployment
        run: |
          echo 'Deployed image: \$\{\{ needs.build-and-push.outputs.image-tag \}\}'
          echo 'Site live at: http://\$\{\{ vars.CAPSTONE_BUCKET_NAME \}\}.s3-website-us-east-1.amazonaws.com'`} title="Create .github/workflows/capstone.yml"></CodeBlock>
    </div>
  </div>

  <h3>Build → run → verify</h3>

  <div className="g-step">
    <div>1</div>
    <div>
      <h4>Verify the pull request gate</h4>
      <CodeBlock code={`git checkout -b capstone-pipeline
git add sample-app .github/workflows/capstone.yml
git commit -m 'Add capstone CI/CD pipeline'
git push -u origin capstone-pipeline
gh pr create --fill`} title="Verify the pull request gate"></CodeBlock>
      <p><strong>Expected result:</strong> The PR shows a single <code className="inline">lint-and-test</code> check running and going green. <code className="inline">build-and-push</code> and <code className="inline">deploy-production</code> do not run at all on a PR — confirm this in the Actions tab, since their <code className="inline">if:</code> condition restricts them to direct pushes on <code className="inline">main</code>.</p>
    </div>
  </div>

  <div className="g-step">
    <div>2</div>
    <div>
      <h4>Merge and watch the full pipeline run</h4>
      <CodeBlock code={`gh pr merge --squash
gh run watch`} title="Merge and watch the full pipeline run"></CodeBlock>
      <p><strong>Expected result:</strong> <code className="inline">lint-and-test</code> and <code className="inline">build-and-push</code> complete automatically. <code className="inline">deploy-production</code> shows "Waiting" in the run graph until you approve it on the run's page on github.com.</p>
    </div>
  </div>

  <div className="g-step">
    <div>3</div>
    <div>
      <h4>Approve and verify the live result</h4>
      <CodeBlock code={`# After approving in the GitHub UI, confirm the image landed in GHCR:
gh api /user/packages/container/sample-app/versions --jq '.[0].metadata.container.tags'

# And confirm the static site is live:
curl -s http://your-capstone-bucket-name.s3-website-us-east-1.amazonaws.com | grep 'Deployed entirely'`} title="Approve and verify the live result"></CodeBlock>
      <p><strong>Expected output:</strong> The <code className="inline">gh api</code> call returns a tag matching your latest commit SHA, and the <code className="inline">curl</code> command prints the line containing "Deployed entirely by GitHub Actions" — proof the exact file from your repo is what's actually being served.</p>
    </div>
  </div>

  <div className="g-checklist"><ul classname="g-checklist"><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="gha-cb-capstone-0" /><label htmlfor="gha-cb-capstone-0">A pull request triggers lint + test only — never a deploy</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="gha-cb-capstone-1" /><label htmlfor="gha-cb-capstone-1">Merging to main builds and pushes a SHA-tagged Docker image to GHCR</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="gha-cb-capstone-2" /><label htmlfor="gha-cb-capstone-2">Production deployment pauses for manual approval every time</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="gha-cb-capstone-3" /><label htmlfor="gha-cb-capstone-3">The deploy step authenticates to AWS via OIDC — no AWS access key stored in GitHub anywhere</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="gha-cb-capstone-4" /><label htmlfor="gha-cb-capstone-4">The live S3 site reflects the exact commit that was approved</label></li></ul></div>

  <ConceptBox title="What this guide does NOT cover">
    
    Being upfront about scope: this guide does not cover GitHub Actions' container action type (a third action format alongside composite and JavaScript actions), large-scale self-hosted runner orchestration (autoscaling runner pools via Actions Runner Controller on Kubernetes), advanced GHES (GitHub Enterprise Server) configuration differences, or workflow security hardening against supply-chain attacks in third-party actions beyond SHA-pinning (full dependency-review and CodeQL integration deserve their own guide). If you're prepping for an interview and these come up, know they exist and that this guide intentionally scoped them out rather than covering them thinly.
  </ConceptBox>

  

              </div>
            );
          default:
            return <div>Select a section from the sidebar.</div>;
        }
      }}
    </GuideWrapper>
  );
}
