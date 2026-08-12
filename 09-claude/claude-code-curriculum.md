# Claude Code: Zero to Hero — Complete Curriculum

A structured, self-contained curriculum for teaching Claude Code from absolute beginner to confident user. **19 lessons + 1 bonus lesson** total: 2 setup lessons, 16 teaching lessons (each with a 5-question quiz), 1 cumulative capstone exam, and a no-quiz bonus tour of the newest features.

> **Last verified against the official docs (code.claude.com/docs) in July 2026.** Claude Code moves fast — before each cohort, re-verify the exact flags, paths, and keystrokes against the docs and the changelog at github.com/anthropics/claude-code.

---

## How to use this document

**For instructors:** Read each lesson, then walk students through it using the analogies. The quizzes at the end of each lesson test specific knowledge — flag, file path, command, keystroke. Push students for *exact* answers, not vague descriptions. Model answers are included after each quiz.

**For students:** Read one lesson at a time. After the lesson, attempt the quiz before looking at the answers. The point is to internalize specific syntax — knowing roughly what a feature does isn't enough; you need to know the exact file path, the exact flag, the exact keystroke.

**Teaching style used throughout:**
- Everyday analogies *before* technical jargon
- Step by step, never table-dump
- Each new concept builds on the previous one (no forward references)
- Quizzes test *how*, not *what*

---

## Table of Contents

1. [Lesson 1: What is Claude Code?](#lesson-1-what-is-claude-code) *(no quiz)*
2. [Lesson 2: Getting Started](#lesson-2-getting-started) *(no quiz)*
3. [Lesson 3: Talking to Claude](#lesson-3-talking-to-claude)
4. [Lesson 4: Tools](#lesson-4-tools)
5. [Lesson 5: Working with Code](#lesson-5-working-with-code)
6. [Lesson 6: Git & GitHub](#lesson-6-git--github)
7. [Lesson 7: Settings & Customization](#lesson-7-settings--customization)
8. [Lesson 8: Hooks & Automation](#lesson-8-hooks--automation)
9. [Lesson 9: MCP Servers](#lesson-9-mcp-servers)
10. [Lesson 10: Agent SDK](#lesson-10-agent-sdk)
11. [Lesson 11: Permission Modes & Safety Controls](#lesson-11-permission-modes--safety-controls)
12. [Lesson 12: Checkpointing, Rewind & Session Management](#lesson-12-checkpointing-rewind--session-management)
13. [Lesson 13: Memory Deep Dive](#lesson-13-memory-deep-dive)
14. [Lesson 14: Skills & Custom Slash Commands](#lesson-14-skills--custom-slash-commands)
15. [Lesson 15: Subagents in Practice](#lesson-15-subagents-in-practice)
16. [Lesson 16: Plugins & Marketplaces](#lesson-16-plugins--marketplaces)
17. [Lesson 17: Headless Mode, Output Styles & CI/CD](#lesson-17-headless-mode-output-styles--cicd)
18. [Lesson 18: IDE Integration, Extended Thinking & Polish](#lesson-18-ide-integration-extended-thinking--polish)
19. [Lesson 19: Capstone — Cumulative Final Exam](#lesson-19-capstone--cumulative-final-exam)
20. [Bonus Lesson 20: What's New in Claude Code (2026 Tour)](#bonus-lesson-20-whats-new-in-claude-code-2026-tour) *(no quiz)*

---

# Lesson 1: What is Claude Code?

## A simple way to think about it

Imagine you're a chef in your kitchen. You have all your ingredients, all your knives, all your pots — but you're alone. You do everything yourself.

Now imagine someone walks in and says: "I'm a really good sous chef. Tell me what you want to cook, and I'll help. I can chop, I can stir, I can read recipes, I can taste, I can suggest improvements. You're still in charge — but you're not alone anymore."

That's Claude Code. It's a sous chef for software developers.

## What Claude Code actually is

Claude Code is an AI coding assistant built by Anthropic. It runs on your computer (in your terminal, or in your code editor) and helps you write, fix, refactor, and understand code. You talk to it in plain English (or any other language) and it does the work — reading files, making edits, running commands, even pushing code to GitHub.

It's not a chatbot in a browser. It's a tool that lives **inside** your development environment and actually touches your files.

## What it can do

- Read and understand your codebase
- Fix bugs (you describe the bug, it finds and fixes the cause)
- Add new features (you describe what you want, it writes the code)
- Refactor messy code into clean code
- Write tests
- Run shell commands (install packages, run servers, run tests)
- Work with git (commit, push, create pull requests)
- Connect to other tools through plugins and MCP servers

## What it is *not*

- Not magic — it makes mistakes, sometimes confidently
- Not a replacement for understanding your code
- Not always right — always review changes before accepting them

## Where Claude Code lives

You can use Claude Code in five places:
1. **Terminal** — the classic command line interface (this course focuses here)
2. **VS Code extension** — a graphical panel inside your code editor
3. **JetBrains plugin** — same idea, for IntelliJ / PyCharm / WebStorm
4. **Desktop app** — a standalone app (Mac/Windows/Linux) for people who don't like the terminal
5. **Web & mobile** — claude.ai/code runs sessions in the cloud; the mobile app can even remote-control your local machine

The terminal, IDE extensions, and desktop app share the same settings and memory files (CLAUDE.md, settings.json). Conversation sessions, however, are independent — each terminal window or editor panel starts its own session with no shared context.

## Why this course exists

By the end of these lessons, you'll be able to use Claude Code as a real day-to-day tool — not just chat with it, but actually configure it, customize it, build your own workflows, and integrate it into your projects.

*(No quiz for this lesson — it's just orientation.)*

---

# Lesson 2: Getting Started

## Step 1: Installing Claude Code

The **recommended** way to install Claude Code is the native installer — no Node.js needed:

**macOS / Linux / WSL:**
```bash
curl -fsSL https://claude.ai/install.sh | bash
```

**Windows PowerShell:**
```powershell
irm https://claude.ai/install.ps1 | iex
```

The native install **auto-updates in the background**, so you always have the latest version.

Alternative installs (these do *not* auto-update by default):
- **Homebrew:** `brew install --cask claude-code`
- **npm:** `npm install -g @anthropic-ai/claude-code` (requires Node.js 22+; installs the same native binary)

After installing, verify it works:

```bash
claude --version
```

To update manually at any time: `claude update`. To diagnose a broken setup: `claude doctor`.

## Step 2: Logging in

The very first time you run Claude Code, you need to log in. Just type:

```bash
claude
```

It opens a browser window where you authenticate with your Anthropic account. Once you log in, you don't need to do it again — Claude Code remembers.

You can have two kinds of accounts:
- **Subscription** (Pro, Max, Team, Enterprise) — flat monthly fee, includes Claude Code usage
- **Console (API) account** — pay-as-you-go, you get billed per token

⚠️ The **free** Claude.ai plan does **not** include Claude Code — you need one of the paid options above. For most learners, a Pro or Max subscription is the easiest path.

## Step 3: Your first session

Navigate to a project folder in your terminal:

```bash
cd ~/projects/my-app
```

Then start Claude Code:

```bash
claude
```

A prompt appears. Type something simple to test it:

```
Hello Claude, what files are in this folder?
```

Claude will use its tools to list the files and respond.

That's a **session**. A session is one continuous conversation. When you close the terminal, the session is saved. You can come back to it later.

## Step 4: Ending a session

To exit a session, type:

```
/exit
```

Or just close the terminal. The session is saved automatically — nothing is lost.

## Step 5: Coming back

The next time you want to continue where you left off, run:

```bash
claude --continue
```

This resumes the most recent session in the current folder. Your conversation history comes back, and you pick up where you stopped.

## A quick note about VS Code

If you prefer working in VS Code, install the **Claude Code** extension from the VS Code marketplace. It gives you the same Claude Code, but as a panel inside your editor — no terminal needed.

The terminal and VS Code extension share the same settings and memory files (CLAUDE.md, settings.json) — but not conversation sessions. Each is its own independent session with no shared context.

*(No quiz for this lesson — it's setup.)*

---

# Lesson 3: Talking to Claude

## How Claude understands what you're talking about

When you start a session in a project folder, Claude doesn't automatically know everything about your project. It has to gather context as you talk. The clearer you are about what you want, the better the answer.

Think of it like asking a contractor about your house: "fix the thing" gets you nothing useful. "The kitchen faucet is leaking at the base — please fix the seal" gets you the actual repair.

## Slash commands — built-in shortcuts

Inside Claude Code, certain words starting with `/` are special — they're commands the system understands directly, not messages for Claude.

Examples:
- `/help` — show all available commands
- `/clear` — start fresh
- `/compact` — summarize the conversation to save space

Slash commands are typed in the chat just like a message, but they're acted on by Claude Code itself.

## The most important pair: `/clear` vs `/compact`

These two sound similar but do very different things.

**`/clear`** — wipes the slate clean.

When you type `/clear`, your current conversation is set aside (still saved as a session you can resume later, but no longer active in front of you). A brand new conversation starts. Claude has zero memory of what you were just discussing.

Use `/clear` when:
- You finished one task and want to start a completely different one
- The current conversation has become messy or off-topic
- You want a fresh perspective on something

**`/compact`** — keeps the conversation but shrinks it.

When you type `/compact`, Claude takes everything you've discussed so far and writes a short summary of it. The full back-and-forth is replaced by that summary. Claude still remembers what you were talking about (in summary form), but the conversation now takes up much less space.

Use `/compact` when:
- You're working on a long task and Claude is running out of context space
- You want to keep the gist of the conversation but cut the noise

**The key difference:** `/clear` forgets, `/compact` summarizes.

## Why context matters

Every Claude model has a limit on how much it can "see" at once — this is called the **context window**. The longer your conversation, the more space it eats. Eventually, Claude can't fit everything anymore.

This is why `/compact` exists. It buys you more room without losing the thread.

Want to *see* what's eating your context? Type **`/context`** — it shows a visual map of your context window: how much is taken by the system prompt, your CLAUDE.md, the conversation, tool results, and how much room is left.

One more handy trick: **`/btw <question>`** asks a quick side question ("what was that config file called again?") in a popup overlay — it sees your whole conversation but its answer never enters the history, so it doesn't eat context or derail Claude.

## How to talk to Claude effectively

Some practical tips:

1. **Be specific.** "Fix this" is bad. "Fix the bug in the login function where it crashes when the email is empty" is good.

2. **Give context.** If you're working on a tricky piece of code, tell Claude what you've already tried. Saves it from suggesting things you've ruled out.

3. **Ask follow-up questions.** Claude isn't always right on the first answer. Ask "why did you do it that way?" or "is there a simpler approach?" to refine.

4. **Don't be afraid to redirect.** If Claude goes down the wrong path, say "stop, let's restart this thread" or even `/clear` and try again.

5. **A common gotcha — hallucinations.** Sometimes Claude makes things up confidently. Function names that don't exist, library APIs that aren't real. Always verify before trusting.

## Quiz — Lesson 3

1. What is the difference between `/clear` and `/compact`? What does each one do to your conversation?

2. Why does the context window matter, and which command helps you manage it?

3. Name two things you should do to make your messages to Claude more effective.

4. What is a "hallucination" in this context, and what should you do about it?

5. Are slash commands sent to Claude as messages, or are they handled by Claude Code itself?

## Ideal Answers — Lesson 3

1. **`/clear`** wipes the current conversation completely — Claude has no memory of what you discussed. The previous conversation is saved as a session you can resume, but a brand new one starts. **`/compact`** summarizes the current conversation into a short version — Claude still knows what you were talking about (in summary form), but the conversation takes much less space. The key: `/clear` forgets, `/compact` summarizes.

2. The context window is the limit on how much Claude can "see" at once. Long conversations fill it up, and eventually Claude runs out of room. **`/compact`** helps by shrinking the conversation while keeping its essence.

3. Two examples: **be specific** ("fix the login bug where empty emails crash" beats "fix this"); **give context** (tell Claude what you've already tried so it doesn't repeat dead ends). Other valid answers: ask follow-up questions, redirect when Claude goes wrong.

4. A **hallucination** is when Claude confidently invents something that doesn't exist — a function name, an API, a library. You should **always verify** before trusting — check the docs, check the file, run the code.

5. Slash commands are **handled by Claude Code itself**, not sent to Claude. They're system shortcuts (like `/clear`, `/help`), interpreted directly by the application.

---

# Lesson 4: Tools

## What tools are

Claude is just a language model — by itself, it can only produce text. It can't actually open a file, run a command, or change anything on your computer. So how does Claude Code edit your files?

The answer: **tools**. Tools are the bridge between Claude (which only generates text) and your computer (where actual things happen).

Think of Claude as a brain in a jar. Smart, but no hands. Tools are the hands.

When Claude wants to do something — read a file, edit a file, run a command — it asks for the right tool. The tool runs, gets a result, and gives that result back to Claude.

## The six core tools

Claude Code gives Claude these tools:

**`Read`** — opens and reads a file.

When Claude wants to know what's in a file, it asks the Read tool: "give me the contents of `src/auth.js`." The tool reads the file and hands the text back.

**`Edit`** — makes targeted changes to an existing file.

When Claude wants to change one specific part of a file — like rename a variable or fix a bug on line 42 — it uses Edit. It tells the tool: "find this exact text, replace it with this new text." Surgical, precise.

**`Write`** — creates a brand new file, *or* fully overwrites an existing one.

When Claude wants to create a new file from scratch, it uses Write. The tool takes the full file content and creates it. If the file already exists, Write replaces the whole thing. (Don't confuse Write with Edit — Edit is for small changes inside a file, Write is for the whole file.)

**`Bash`** — runs a shell command.

Anything you could type into the terminal — `npm install`, `ls`, `git status`, `python script.py` — Claude can run through the Bash tool. It runs the command, captures the output, and gives the output to Claude to read.

**`Search`** (often called `Grep` or `Glob`) — finds things across many files.

When Claude needs to search a whole project for a piece of text or a file pattern, it uses Search. "Find every file containing the word `useState`" or "find every `.test.js` file." Much faster than reading files one by one.

**`WebFetch`** — fetches content from a URL.

When Claude needs information from the web — documentation, a GitHub README, a blog post — it uses WebFetch. It downloads the page and reads it.

## How Claude decides which tool to use

Claude reads your message, figures out what you're asking for, and decides which tool fits. You don't usually pick the tool yourself — Claude picks. You can see what tool it's using because Claude Code shows you in the interface.

## A common confusion: Write vs Edit

This is the trap. Some people think Write is only for new files. It isn't.

- **Edit** = find specific text in a file, replace it. Keeps the rest of the file intact.
- **Write** = put this entire content into this file. If the file exists, it gets completely replaced.

So if Claude wants to refactor a huge file completely, it can either:
- Use many small Edits, or
- Use Write once with the whole new content

Both work. Edit is usually safer (smaller changes are easier to review).

## Quiz — Lesson 4

1. Name the six main tools Claude Code can use.

2. Which tool can both create a brand new file AND fully overwrite an existing one?

3. What is the difference between Edit and Write? When would you use each?

4. Why does Claude need tools at all? Why can't it just edit files directly?

5. If Claude wants to find every file in your project that contains the word `password`, which tool does it use?

## Ideal Answers — Lesson 4

1. **`Read`, `Edit`, `Write`, `Bash`, `Search`** (or Grep/Glob), and **`WebFetch`**.

2. **`Write`** — it creates new files and completely overwrites existing ones.

3. **`Edit`** finds a specific piece of text in a file and replaces it — used for targeted changes that keep the rest of the file intact. **`Write`** puts an entire content into a file, replacing everything that was there. Use Edit for small, surgical changes; use Write when you want to replace the whole file (or create a new one).

4. Claude is just a language model — it only produces text. It can't actually touch your filesystem, run commands, or change anything by itself. Tools are the bridge — they take Claude's instructions and actually execute them on your computer.

5. The **`Search`** tool (also called Grep or Glob). It searches across many files much faster than opening each one with Read.

---

# Lesson 5: Working with Code

## The four common code tasks

Most of what people do with Claude Code falls into four categories:

1. **Fixing bugs** — something is broken, make it work
2. **Adding features** — build something new
3. **Refactoring** — code works but is messy; clean it up
4. **Writing tests** — make sure the code actually does what it should

We'll go through each.

## Fixing bugs

The most common pattern: you describe the bug, Claude finds the cause, Claude fixes it.

Best practices:
- **Describe the symptom precisely.** "The login page crashes" is too vague. "When I submit the login form with an empty email field, the page crashes with a TypeError about reading 'split' of undefined" is gold.
- **Tell Claude what you've already tried.** "I checked the form validation and it looks fine" — saves Claude from re-checking.
- **If you have an error message, paste the whole thing.** Stack traces are gold for diagnosis.

## Adding features

The pattern: you describe what you want, Claude builds it.

Best practices:
- **Start with the goal, not the implementation.** "Add user notifications" lets Claude suggest the best approach. "Add a new file called notifications.js with an event emitter" forces a specific design that may be wrong.
- **Tell Claude about constraints.** "We use React and Tailwind." "No external libraries." "Must work offline."
- **Build incrementally.** Don't ask for the whole feature in one shot. Ask for the data layer, test it, then ask for the UI on top.

## Refactoring

The pattern: you point at messy code, Claude rewrites it cleaner.

Best practices:
- **Be specific about what "better" means.** "More readable"? "Faster"? "Easier to test"? Each goal leads to different refactoring choices.
- **Refactor in small batches.** Big refactors are risky. Better to do one function at a time and verify nothing broke.
- **Ask Claude to explain its changes.** This catches mistakes early and helps you learn.

## Writing tests

The pattern: you have a function, Claude writes tests for it.

Best practices:
- **Tell Claude what framework you use.** Jest? Pytest? Vitest?
- **Tell it the testing style.** Unit tests? Integration tests? End-to-end?
- **Ask for edge cases explicitly.** "Test the happy path AND empty inputs, AND error cases."

## Why Claude sometimes gives wrong answers

This is important. Claude is fast and smart but not infallible. Common reasons it goes wrong:

1. **It made something up (hallucination).** It invented a function or API. Fix: verify before trusting.

2. **It didn't see enough context.** You asked it to fix code without showing it the rest of the project. Fix: give it the related files (with the Read tool or `@` mentions).

3. **Your prompt was vague.** "Fix this" leads to a guess. Fix: be specific.

4. **It assumed something wrong.** It thought you were using one library but you use another. Fix: state your stack explicitly.

5. **The problem is genuinely hard.** Some bugs need deep thought. Fix: ask Claude to "think hard about this" or use extended thinking (covered in Lesson 18).

## When to redirect Claude vs start over

**~10% wrong (small detail off):** Redirect — correct the specific error in-context. "No, that breaks the existing X. Try a different approach."

**10%–80% wrong (partially off-track):** Redirect + restate — correct the error AND remind Claude of the overall goal and constraints. "No, that breaks X. Remember — we're building Y, using Z library, and the output needs to be W." If you've redirected twice and it's still not improving, move to `/clear`.

**~80%+ wrong (fundamentally off):** Stop, `/clear`, start fresh with a better prompt. You'll waste more time fighting Claude than restarting.

## Quiz — Lesson 5

1. Name the four most common tasks people use Claude Code for.

2. You ask Claude to fix a bug and it gives a wrong answer. Name three specific reasons this could happen.

3. When adding a new feature, why is it better to describe the goal rather than the exact implementation?

4. When should you `/clear` and start over vs just redirect Claude in the current conversation?

5. You're asking Claude to write tests. What three pieces of context should you give it?

## Ideal Answers — Lesson 5

1. **Fixing bugs**, **adding features**, **refactoring**, and **writing tests**.

2. Three reasons (any three):
   - **Hallucination** — Claude invented a function or API that doesn't exist
   - **Missing context** — Claude didn't see the related files in the project
   - **Vague prompt** — you said "fix this" instead of describing the actual problem
   - **Wrong assumption** — Claude assumed a different library or stack
   - **Genuinely hard problem** — needs deeper reasoning than a quick answer
   
   Fix each by: verifying output, giving more context, being specific, stating your stack, asking Claude to think hard.

3. Because describing the goal lets Claude suggest the best approach. If you pre-specify the implementation, you might lock in a bad design when a better one exists. The goal "add user notifications" is more useful than "create notifications.js with an event emitter" — Claude might know a cleaner pattern.

4. Three cases:
   - **~10% wrong (small detail off):** Redirect — correct the specific error in-context. Example: "We use JWT, not sessions."
   - **10%–80% wrong (partially off-track):** Redirect + restate — correct the error AND remind Claude of the overall goal and constraints. Example: "We use JWT, not sessions. Remember — we're building a REST API with Express and the token needs to include the user's role." If you've redirected twice and it's still not improving, move to /clear.
   - **~80%+ wrong (fundamentally off):** `/clear` and restart — fighting it costs more time than starting fresh with a sharper, more detailed prompt.

5. Three things to tell Claude:
   - **Which test framework** you use (Jest, Pytest, Vitest, etc.)
   - **What kind of tests** (unit, integration, end-to-end)
   - **What cases to cover** (happy path, edge cases, error cases — be explicit)


# Lesson 6: Git & GitHub

## Two different tools

`git` and `gh` look similar but they're not the same thing.

**`git`** is the version control program. It manages your code history — commits, branches, merges, diffs. It works **locally** on your computer. It doesn't know about GitHub specifically. You could use `git` with GitLab, Bitbucket, or no remote at all.

**`gh`** is GitHub's command line tool. It talks to GitHub's servers specifically. It handles things `git` doesn't — pull requests, issues, GitHub-specific features. Without GitHub, `gh` is useless.

Think of it like this:
- `git` is your filing cabinet (organizes documents locally)
- `gh` is your mailroom (sends/receives stuff from the office building, which is GitHub)

## What Claude Code does with git

Claude can run any git command through the Bash tool. Common things:

- `git status` — what changed?
- `git diff` — show me the actual changes
- `git add .` — stage changes
- `git commit -m "message"` — commit them
- `git push` — push to the remote
- `git pull` — pull latest changes
- `git checkout -b new-branch` — create a new branch

You can just say to Claude: "commit these changes with a message describing what we did" — and Claude will figure out the right git commands.

## What Claude Code does with `gh`

For GitHub-specific things:

- `gh pr create` — open a pull request
- `gh pr list` — list pull requests
- `gh pr view 42` — view PR #42
- `gh issue create` — create an issue
- `gh issue list` — list issues
- `gh repo clone owner/repo` — clone a GitHub repo

You can say "open a pull request for this branch" and Claude will use `gh` to do it.

## Safety rules for git operations

Some git commands are **destructive** — they can lose work permanently. Claude Code is designed to be cautious about these, but you should know them too:

**Always safe:**
- `git status`, `git diff`, `git log` — just looking
- `git add`, `git commit` — local, reversible

**Care needed:**
- `git push` — sends to remote, affects others
- `git checkout some-file` — discards local changes to that file
- `git reset --hard` — throws away local changes

**Dangerous:**
- `git push --force` — overwrites the remote, can destroy teammates' work
- `git reset --hard HEAD~5` — deletes the last 5 commits locally
- `git branch -D some-branch` — force-deletes a branch (can't undo if nothing else points to it)

**Rules of thumb:**
- Never `--force` push to main or master without explicit permission
- Always commit your work before doing anything destructive
- If unsure, ask first — Claude can explain what a command will do before running it

## Commit message style

Good commits are tiny stories. Each one tells what changed and why.

Examples:
- ✗ "fixes" — useless
- ✗ "Updated stuff" — useless
- ✓ "Fix login crash on empty email field"
- ✓ "Add password reset endpoint to API"
- ✓ "Refactor user model to use TypeORM"

Claude will follow your repo's commit style if you ask it to look at recent commits first. "Match the style of the last 10 commits" is a good prompt.

## Pull requests via `gh`

When you tell Claude "create a pull request", here's what it does:

1. Checks that your branch is pushed
2. Looks at all the commits on the branch
3. Drafts a title (short, under 70 chars)
4. Drafts a body (a summary, often with test checklist)
5. Runs `gh pr create --title "..." --body "..."`
6. Returns the PR URL

You can always edit the PR description afterward.

## Quiz — Lesson 6

1. What is the difference between `git` and `gh`? Give one thing each can do that the other cannot.

2. Why is `git push --force` considered dangerous?

3. You want Claude to create a pull request on GitHub. Which tool will it use, and roughly what steps will it take?

4. Name two git commands that are completely safe (just looking) and two that are potentially dangerous.

5. What makes a good commit message? Give one example of a bad commit message and one example of a good one.

## Ideal Answers — Lesson 6

1. **`git`** is local version control — manages commits, branches, history on your machine. Works with any git host (GitHub, GitLab, etc.) or no host. **`gh`** is GitHub's CLI specifically — talks to GitHub servers, handles PRs, issues, GitHub-specific features. `git` can commit and branch (gh can't); `gh` can create pull requests (git can't).

2. `--force` overwrites the remote branch with whatever's on your local machine — if your teammates have pushed commits you don't have, those commits get **destroyed**. There's no easy recovery. Never force push to shared branches like main/master.

3. Claude uses the **`gh`** tool. Steps: (a) make sure the branch is pushed to remote, (b) read the commits on the branch, (c) draft a short title (under 70 chars), (d) draft a body summarizing the changes, often with a test plan, (e) run `gh pr create --title "..." --body "..."`, (f) return the PR URL.

4. **Safe (just looking):** `git status`, `git diff`, `git log`. **Dangerous:** `git push --force`, `git reset --hard`, `git branch -D`, `git checkout some-file` (discards local changes).

5. A good commit message describes **what changed and why** in a clear sentence. **Bad:** "fixes" or "updates stuff" (tells you nothing). **Good:** "Fix login crash on empty email field" or "Add password reset endpoint to API."

---

# Lesson 7: Settings & Customization

## Three settings files

Claude Code has three settings files that control how it behaves:

**Your personal settings (user level):**
```
~/.claude/settings.json
```

This file applies to *every* project you open on your machine. It's just for you. Put preferences here — theme, default model, your personal API key.

**Project settings (project level):**
```
.claude/settings.json
```

This file lives **inside** a specific project folder. It applies only to that project. It's typically committed to git and shared with your team. Put project-wide rules here — pre-approved tools for this codebase, hooks, MCP server configs.

**Local project settings (personal, per-project):**
```
.claude/settings.local.json
```

Same location as project settings, but **automatically gitignored** — your teammates never see it. Use it for personal overrides on this project: your machine-specific paths, permissions you're testing before sharing.

When files conflict, the more specific one wins. Precedence from strongest to weakest: **managed (org) → local → project → user**. (Organizations can also deploy "managed settings" that nobody can override.)

## What goes in settings.json

A typical settings.json looks like this:

```json
{
  "theme": "dark",
  "model": "opus",
  "effortLevel": "high",
  "cleanupPeriodDays": 600,
  "permissions": {
    "defaultMode": "acceptEdits",
    "allow": [
      "Bash(npm test)",
      "Bash(git status)"
    ],
    "deny": [
      "Bash(rm -rf:*)",
      "Bash(git push --force:*)"
    ]
  }
}
```

Each setting controls a specific behavior:
- **`theme`** — light or dark colors
- **`model`** — which Claude model to use by default
- **`effortLevel`** — how hard Claude should think
- **`cleanupPeriodDays`** — how long to keep saved sessions
- **`permissions`** — what Claude is allowed to do without asking

## CLAUDE.md — instructions for Claude

`settings.json` controls how Claude Code behaves. `CLAUDE.md` controls how **Claude itself** behaves on your project.

`CLAUDE.md` is a plain markdown file where you write instructions in English (or any language) for Claude to follow.

Example contents:

```markdown
# Project Rules

- This project uses TypeScript, not JavaScript
- All API responses must be wrapped in a try/catch
- Never use the `any` type
- Tests live in `__tests__/` folders next to the code
- Use the existing logger in `utils/logger.ts` — don't add console.logs
```

Claude reads `CLAUDE.md` every time a session starts and follows the rules.

`CLAUDE.md` lives in similar places to `settings.json`:
- **`~/.claude/CLAUDE.md`** — your global rules (apply to every project)
- **`CLAUDE.md`** (project root) or **`.claude/CLAUDE.md`** — project rules (shared with team via git; both locations work)
- **`CLAUDE.local.md`** (project root) — your personal notes for this project only. ⚠️ You must add it to `.gitignore` yourself (it is *not* ignored automatically) — then teammates never see it. Use it for reminders, shortcuts, or context that's only relevant to you.

## Permissions — what Claude can do without asking

Claude doesn't ask permission for everything every time. You can pre-approve common actions and block dangerous ones.

In `settings.json`:

```json
{
  "permissions": {
    "allow": ["Bash(npm test)", "Bash(npm install)"],
    "deny": ["Bash(rm -rf:*)"]
  }
}
```

- `allow` — Claude can use this tool without asking
- `deny` — Claude is blocked from using this, even if asked

We'll go much deeper into permissions in Lesson 11.

## Choosing a model

Claude Code lets you pick which Claude model handles your requests. Use an **alias** (recommended — always points at the latest version) or a full model ID:

- **`fable`** — Fable 5, the most capable model, for the hardest and longest tasks
- **`opus`** — Opus (currently 4.8), for complex reasoning
- **`sonnet`** — Sonnet (currently 5), fast and smart, the daily workhorse
- **`haiku`** — fastest and cheapest, simple tasks
- **`opusplan`** — a smart combo: Opus while planning, Sonnet while executing

Set it in `settings.json`:
```json
{
  "model": "opus"
}
```

Or change it mid-session with `/model` (which also saves your pick as the new default).

## Environment variables

Some settings live in environment variables (system-level configuration outside the settings.json file):

- **`ANTHROPIC_API_KEY`** — your API key (needed if not using a subscription account)
- **`ANTHROPIC_MODEL`** — default model
- **`CLAUDE_CONFIG_DIR`** — override the default `~/.claude` location

You set them in your shell's config (`.zshrc`, `.bashrc`, etc.) or pass them when running Claude.

⚠️ *Which* config file your shell actually reads is a classic trap — for example, bash login shells on macOS read `~/.bash_profile`, **not** `~/.bashrc`. Lesson 9 covers this in depth ("Storing tokens safely — the shell config trap").

## Quiz — Lesson 7

1. There are three settings files. Give the exact path of each and explain what each one controls. Which one is automatically gitignored?

2. What is the difference between `settings.json` and `CLAUDE.md`?

3. Where in `settings.json` do you set which model Claude uses by default? Write the exact key.

4. What does the `permissions.allow` field do? Give an example of something you might put there.

5. Name one environment variable that affects Claude Code, and what it controls.

## Ideal Answers — Lesson 7

1. **`~/.claude/settings.json`** — your personal user-level settings. Applies to every project on your machine, just for you. **`.claude/settings.json`** (inside a project folder) — project-level settings. Applies only to that project, typically shared with teammates via git. **`.claude/settings.local.json`** — personal overrides for this project only; this is the one that's **automatically gitignored**.

2. **`settings.json`** controls how Claude Code (the app) behaves — theme, model, permissions, hooks. **`CLAUDE.md`** is plain English (or Hebrew, etc.) instructions for Claude itself — coding style, project rules, things to avoid. Settings.json = tool config. CLAUDE.md = instructions for the AI.

3. The key is **`model`** at the top level: `"model": "opus"` (an alias) or a full ID like `"claude-opus-4-8"`.

4. The **`permissions.allow`** field pre-approves specific tool actions so Claude doesn't have to ask permission every time. Example: `"Bash(npm test)"` lets Claude run `npm test` without prompting.

5. Examples (any one):
   - **`ANTHROPIC_API_KEY`** — your Anthropic API key for authentication
   - **`ANTHROPIC_MODEL`** — default Claude model
   - **`CLAUDE_CONFIG_DIR`** — override where Claude stores its config (default is `~/.claude`)

---

# Lesson 8: Hooks & Automation

## What hooks are

Hooks are commands that run **automatically** at specific moments in a Claude Code session. You don't run them — they fire by themselves when something happens.

Think of hooks like motion sensors in a smart home. You don't press a button to turn the lights on — when you walk into the room, the sensor fires and the lights come on. Hooks are the same: a trigger fires, your hook runs.

## Hooks vs permissions — the critical distinction

These two sound similar but do completely different things.

**Permissions** decide *whether* Claude is allowed to do something.
- "Claude, may I run `npm install`?"
- Permission rule says yes → it runs
- Permission rule says no → it doesn't

**Hooks** run *in response to* things happening.
- Claude is about to run `npm install`
- A `PreToolUse` hook fires *before* it runs (could log, validate, or even block)
- The command runs
- A `PostToolUse` hook fires *after* it runs (could log the result, notify, do follow-up)

Permission = a gate (yes/no). Hook = an action (do this thing automatically).

You can use both together. Permissions decide if Claude can run a command; hooks run side-effects around it.

## A crucial subtlety: hooks bypass the permissions system

Here's a surprising behavior worth understanding. Look at this `settings.json`:

```json
{
  "permissions": {
    "deny": ["Bash(touch:*)"]
  },
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit",
        "hooks": [{ "type": "command", "command": "touch /tmp/hook_fired.txt" }]
      }
    ]
  }
}
```

The `deny` rule blocks Claude from running any `touch` command. But the `PostToolUse` hook also runs `touch /tmp/hook_fired.txt` — and it fires anyway, even though `touch` is denied.

Why? Because **hooks are not Claude's actions**. The permission system controls what *Claude* is allowed to do. Hooks are commands *you* configured, running on your behalf directly through the harness. The harness trusts them unconditionally and executes them outside the permission check pipeline.

Think of it like this: permissions are rules you give to your assistant (Claude). Hooks are automations you set up yourself in your own home. Your assistant can't disable the alarm you set — it runs regardless of what the assistant is or isn't allowed to do.

**Practical implications:**
- A hook can do things Claude is explicitly denied — because hooks run as you, not as Claude
- Hooks run with full system access, so be careful what you put in them
- If a hook does something unexpected, it's your own automation — not a permission bypass by Claude

This is why hooks are powerful but also why you should only put trusted commands in them.

## The main hook events

**`PreToolUse`** — fires right *before* Claude uses a tool.

Use cases:
- Log every tool use to a file
- Run a custom validation
- Block the tool use if conditions aren't met

**`PostToolUse`** — fires right *after* Claude uses a tool successfully.

Use cases:
- Auto-format code after every edit
- Run tests after every file write
- Notify Slack when a deploy command runs

**`UserPromptSubmit`** — fires when you submit a message to Claude.

Use cases:
- Auto-include current git status
- Pre-process your prompt
- Log all prompts for review

**`Stop`** — fires when Claude finishes its response.

Use cases:
- Show a desktop notification
- Run cleanup tasks
- Log session stats

**`SessionStart`** — fires when you start or resume a session.

Use cases:
- Print a welcome message with project status
- Refresh some cache
- Check for project updates

**These five are the core events — but there are ~30 in total.** Others worth knowing: `PostToolUseFailure` (a tool call failed), `SubagentStart` / `SubagentStop` (a subagent spawned/finished), `Notification` (Claude Code sends a notification), `PreCompact` / `PostCompact` (around context compaction), and `SessionEnd` (session terminates). The full list is in the hooks docs.

Hooks also support handler types beyond shell commands: `type: "prompt"` (ask a model a yes/no question), `type: "agent"` (spawn a subagent to verify a condition), and `type: "http"` (POST to a URL). For this course we stick to `type: "command"` — the rest work the same way, just with a different action.

## Where hooks are configured

In `settings.json`, under a `hooks` key:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit",
        "hooks": [
          {
            "type": "command",
            "command": "npm run format"
          }
        ]
      }
    ]
  }
}
```

This says: after Claude uses the `Edit` tool, run `npm run format`.

The **matcher** lets you scope the hook to specific tools (e.g., only fire for `Edit`, or for `Bash` commands matching a pattern).

## A practical example

Say every time Claude edits a TypeScript file, you want to auto-run the type checker. Hook config:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit",
        "hooks": [
          {
            "type": "command",
            "command": "tsc --noEmit"
          }
        ]
      }
    ]
  }
}
```

Now `tsc --noEmit` runs automatically after every edit. You catch type errors instantly.

## Why hooks matter for teams

Hooks let you bake project rules into the workflow. New developer joins your team? They clone the repo, the `.claude/settings.json` is already there — they get the same automatic checks, the same auto-formatting, the same workflows you do.

No "did you remember to run the linter?" — it just runs.

## Quiz — Lesson 8

1. What is the difference between a hook and a permission rule? Give one specific thing a hook can do that a permission rule cannot.

2. Name three hook events and explain when each one fires.

3. You want to auto-format your code every time Claude edits a file. Which hook event do you use, and roughly what does the configuration look like?

4. Where are hooks configured? Give the exact key in `settings.json`.

5. What is a "matcher" in a hook configuration, and why is it useful?

## Ideal Answers — Lesson 8

1. **Permissions** decide *whether* Claude is allowed to do something — yes/no gate. **Hooks** are actions that run *automatically* in response to events. A permission rule cannot run an arbitrary command — it can only allow or deny. A hook can do anything: log to a file, send a notification, auto-format code, run tests, post to Slack.

2. Three examples (any three):
   - **`PreToolUse`** — fires right before Claude uses a tool
   - **`PostToolUse`** — fires right after Claude uses a tool successfully
   - **`UserPromptSubmit`** — fires when you submit a message
   - **`Stop`** — fires when Claude finishes its response
   - **`SessionStart`** — fires when a session starts or resumes

3. Use **`PostToolUse`** with a matcher for the `Edit` tool. Configuration:
   ```json
   {
     "hooks": {
       "PostToolUse": [
         {
           "matcher": "Edit",
           "hooks": [{"type": "command", "command": "npm run format"}]
         }
       ]
     }
   }
   ```

4. Hooks are configured in **`settings.json`** under the top-level **`hooks`** key.

5. A **matcher** scopes the hook to specific tools or patterns — e.g., only fire for `Edit`, or only for `Bash` commands matching a certain pattern. Useful because you don't want every hook firing for every tool — you want targeted automation.

---

# Lesson 9: MCP Servers

## The problem MCP solves

Claude has tools built in: Read, Edit, Write, Bash, Search, WebFetch. But what if you want Claude to talk to your database directly? Or to your Jira board? Or to a custom internal API?

The built-in tools can't do that. You need a way to *add* new tools that connect to your specific systems.

That's what MCP solves.

## What MCP is

**MCP** stands for **Model Context Protocol**. It's an open standard (designed by Anthropic, but anyone can implement it) for connecting AI models to external tools and data sources.

Think of MCP like a power outlet. Different appliances (databases, Jira, Slack, your custom API) can all plug into the same outlet shape. Once plugged in, Claude can use them like built-in tools.

## Two kinds of MCP servers

**Pre-built MCP servers** — someone already built them. You install them and use them.

Examples:
- Filesystem MCP — gives Claude direct file access
- GitHub MCP — read/write GitHub issues and PRs
- Slack MCP — send messages, read channels
- Postgres MCP — query a Postgres database
- Memory MCP — give Claude persistent memory

A directory of available MCP servers lives at the official MCP marketplace (you can browse it from Claude Code).

**Custom MCP servers** — you build your own.

If you have an internal tool or API at your company, you can write your own MCP server that exposes it to Claude. The MCP protocol defines how to do this — there are SDKs in TypeScript, Python, etc.

## Adding an MCP server

The command to add a new MCP server to Claude Code:

```bash
claude mcp add
```

This walks you through an interactive setup — pick a name, pick a transport type (stdio for local servers, http/sse for remote ones), provide any required arguments or environment variables.

You can also add MCP servers by editing a config file directly. The file depends on the **scope** you choose (`claude mcp add --scope user|project|local`):

- **Project scope** — `.mcp.json` inside your project folder (committed to git, shared with your team)
- **User scope** — stored in `~/.claude.json` (personal, applies across your projects; note: this is a *file* in your home folder, not inside the `~/.claude/` directory)

A typical `.mcp.json` looks like:

```json
{
  "mcpServers": {
    "github": {
      "type": "stdio",
      "command": "npx",
      "args": ["@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "your-token-here"
      }
    }
  }
}
```

## Storing tokens safely — the shell config trap

Look at the example above — the token is written directly into the file: `"GITHUB_TOKEN": "your-token-here"`. For project scope that's a real problem: `.mcp.json` is committed to git and shared with your team, so your secret token gets shared too (and pushed to GitHub).

The right way: keep the token in an **environment variable**, and reference it from `.mcp.json` with `${...}`:

```json
{
  "mcpServers": {
    "github": {
      "type": "http",
      "url": "https://api.githubcopilot.com/mcp/",
      "headers": {
        "Authorization": "Bearer ${GITHUB_TOKEN}"
      }
    }
  }
}
```

Claude Code expands `${GITHUB_TOKEN}` when it starts, reading the value from its own environment. The file itself contains no secret — safe to commit.

### Where does the environment variable come from?

You put an export line in your shell's startup file:

```bash
export GITHUB_TOKEN=github_pat_xxxxxxxxxxxx
```

But **which file?** This is where almost everyone gets burned. Different shells read different files:

| Shell | Startup files it reads |
|---|---|
| **zsh** (macOS default) | `~/.zshenv` (always), `~/.zshrc` (interactive) |
| **bash** — login shell (macOS Terminal.app windows) | `~/.bash_profile` — **not** `.bashrc`! |
| **bash** — non-login interactive shell | `~/.bashrc` |

The classic Mac trap: your default shell is zsh, so you put the token in `~/.zshrc` — but your VS Code integrated terminal is configured to run **bash**. Bash never reads any zsh file. You launch `claude` from that terminal → the variable doesn't exist → `${GITHUB_TOKEN}` expands to nothing → the MCP server fails to authenticate. And you sit there insisting "but the token is definitely in my `.zshrc`!" — which is true, and irrelevant.

**The safe move: put the same export line in all three** — `~/.zshenv`, `~/.bash_profile`, and `~/.bashrc`. One line each, and every shell on your machine finds the token no matter how it was started.

### Three rules that save hours of debugging

1. **Environment is inherited at launch — once.** When you run `claude`, it gets a *copy* of the launching shell's variables at that moment. Editing a config file changes nothing for shells and Claude sessions that are already open. After editing: open a **new** terminal (or run `source ~/.bash_profile` in the current one), then **restart** `claude`. Reconnecting via `/mcp` isn't enough — the running process's environment never changes.

2. **Verify before launching.** In the terminal where you're about to run `claude`:

   ```bash
   echo ${GITHUB_TOKEN:+found}
   ```

   Prints `found` → this shell has the token. Prints nothing → it doesn't, and any `claude` you launch from here won't have it either.

3. **Check the connection from outside.** Run `claude mcp list` — it starts a *fresh* process and shows every server's health (`✔ Connected` / `✘ Failed`). If `claude mcp list` connects but your open session doesn't, the session was started with a stale environment — restart it.

## Sandboxing — why MCP is safer than just letting Claude run anything

When you give Claude access to a tool through MCP, the tool runs in its own isolated process. It only does what the MCP server explicitly exposes — no more, no less.

For example, the Postgres MCP server might expose just `query` and `list_tables`. Claude can use those, but it can't suddenly start running shell commands or modifying files outside what the MCP server allows.

This is much safer than just giving Claude `Bash` access and letting it run `psql` directly.

## Managing MCP servers — the `/mcp` command

Type `/mcp` in Claude Code to:
- See all currently active MCP servers
- Enable or disable a server
- Reconnect a server that dropped
- See available tools from each server

## Calling MCP tools

Once an MCP server is connected, its tools become available to Claude. Tool names follow this pattern:

```
mcp__<server-name>__<tool-name>
```

For example, the GitHub MCP server might expose `mcp__github__create_issue` and `mcp__github__list_repos`.

You don't usually call these directly — Claude picks them based on your request. But you can reference them in permission rules:

```json
{
  "permissions": {
    "allow": ["mcp__github__list_repos"],
    "deny": ["mcp__github__create_issue"]
  }
}
```

## Quiz — Lesson 9

1. What does MCP stand for? In one sentence, what problem does it solve?

2. What is the difference between pre-built and custom MCP servers?

3. What command do you run to add a new MCP server interactively? Where is the configuration file stored?

4. Why is using an MCP server safer than just giving Claude `Bash` access to run any command?

5. What is the naming pattern for MCP tools in Claude Code? Give an example.

## Ideal Answers — Lesson 9

1. **MCP = Model Context Protocol**. It's an open standard for connecting AI models like Claude to external tools and data sources (databases, APIs, internal services). It solves the problem that Claude's built-in tools can't reach into systems they weren't designed for.

2. **Pre-built MCP servers** are already written by Anthropic, the community, or third parties — you install and use them (Filesystem, GitHub, Slack, Postgres, Memory, etc.). **Custom MCP servers** are ones you build yourself, typically to expose an internal tool or API at your company. The MCP protocol defines how, with SDKs in TypeScript, Python, and others.

3. Run **`claude mcp add`** for an interactive setup. The configuration file depends on scope: **`.mcp.json`** in your project folder (project scope, shared via git), or **`~/.claude.json`** (user scope, personal).

4. Because MCP servers run in their own **isolated process** and only expose specific tools — the server defines exactly what Claude can do. Giving Claude `Bash` access would let it run *any* shell command; MCP sandboxes access to only the operations the server explicitly allows.

5. The pattern is **`mcp__<server-name>__<tool-name>`**. Example: `mcp__github__create_issue` is the `create_issue` tool from the `github` MCP server.

---

# Lesson 10: Agent SDK

## API vs Agents — two different things

When people say "Claude," they often mean two different things:

**The Claude API** — a raw text-in, text-out interface. You send Claude a prompt, you get a response. That's it. The API is the foundation.

**An Agent** — a program that uses the API in a loop. It sends a prompt, gets a response, *does something* with the response (like call a tool), feeds the result back into a new prompt, and continues. Agents *do* things. The API just *answers*.

Claude Code is itself an agent. It wraps the Claude API with tools, file access, a session manager, hooks — all the stuff that turns "an AI chatbot" into "an AI that actually changes your code."

## The tool use loop

This is the core pattern that every agent follows. Four steps, repeated:

1. **Claude thinks** — receives a prompt, reasons about what to do
2. **Claude calls a tool** — decides which tool fits and what arguments to pass
3. **The tool runs** — actual code executes on your computer (read a file, run bash, etc.)
4. **The result goes back to Claude** — the tool's output is added to the conversation; Claude reads it and continues

Then it loops. Claude might think again, call another tool, get another result, and keep going until the task is done.

Example: you ask Claude "find all TODO comments in the project."
1. Claude thinks: "I need to search the codebase."
2. Claude calls the Search tool: `Grep("TODO", "**/*.js")`
3. The tool runs, returns a list of file paths with matches.
4. Claude reads the result, thinks: "Now I should show these to the user."
5. Claude responds with the formatted list.

## Sub-agents (briefly — full coverage in Lesson 15)

Sometimes a task is so big that one Claude can't keep all of it in context. So Claude spawns a **sub-agent** — a separate Claude instance dedicated to a specific sub-task.

The sub-agent runs its own loop, finishes, and reports back to the main Claude. The main Claude doesn't have to hold all the sub-agent's context — just the result.

This is how Claude Code handles really big tasks like "search this entire 50,000-file codebase" — it delegates to sub-agents.

## Prompt caching — making it cheaper and faster

Every time Claude responds, it has to read everything you've sent so far — your CLAUDE.md, your conversation history, your tool results. That's a lot of text to re-read every turn.

**Prompt caching** is an optimization where the API stores chunks of your conversation server-side. Next turn, instead of sending the whole thing again, Claude just references the cache. Faster, cheaper, same result.

Claude Code uses prompt caching automatically. You don't have to do anything. But it's good to know it exists — it's why long sessions stay fast and cost-effective.

## When to use the Agent SDK directly

You might want to build your own agent (not Claude Code, but your own custom agent) when:
- You need a specialized agent for a specific workflow
- You want to integrate Claude into a custom application
- You need to deploy an agent as a service

This is what the **Claude Agent SDK** (Python, TypeScript) is for — it gives you the same engine Claude Code runs on (the loop, the tools, context management, permissions) as a library you embed in your own application. You write the product; the SDK provides the agent machinery.

For 99% of users, just using Claude Code is enough — you don't need to build your own agent.

## Quiz — Lesson 10

1. What is the difference between the Claude API and an agent?

2. Describe the tool use loop in order. What are the four steps that happen every time Claude uses a tool?

3. Why do sub-agents exist? When would Claude Code spawn one?

4. What is prompt caching, and why does it matter?

5. When would you want to build your own custom agent instead of just using Claude Code?

## Ideal Answers — Lesson 10

1. **The Claude API** is a raw text-in, text-out interface — you send a prompt, you get a response, that's all. **An agent** is a program that uses the API in a loop — it gets a response, does something with it (like call a tool), feeds the result back, and continues. The API just answers; agents do things. Claude Code is itself an agent built on top of the API.

2. Four steps: (1) **Claude thinks** — reasons about what to do. (2) **Claude calls a tool** — picks a tool and arguments. (3) **The tool runs** — actual code executes on your computer. (4) **The result goes back to Claude** — tool output is added to context; Claude reads it and continues. Then it loops.

3. **Sub-agents** exist because some tasks are too big to keep in one Claude's context. The main Claude spawns a sub-agent to handle a specific sub-task; the sub-agent runs its own loop, finishes, and reports back the result. The main Claude only holds the result, not all the sub-agent's work. Useful for searching huge codebases, parallel tasks, or anything that would blow the main context.

4. **Prompt caching** is an optimization where the API stores parts of your conversation server-side. Next turn, instead of re-sending everything (CLAUDE.md, history, tool results), Claude references the cache. Result: **faster and cheaper** for the same output. Claude Code uses it automatically.

5. Build your own custom agent when: you need a specialized agent for a specific workflow, you want to integrate Claude into a custom application, or you want to deploy an agent as a service. For typical day-to-day coding, Claude Code is enough — you don't need to build your own.

---

# Lesson 11: Permission Modes & Safety Controls

## A story to start

Imagine you hired a helper to renovate your house. This helper is very capable — they can paint walls, move furniture, rewire electricity, even demolish things. But you're not sure how much you trust them yet.

So you give them a set of **instructions** for how much they should check with you before doing things.

That's exactly what **permission modes** are in Claude Code. Claude can edit your files, run commands, push code to GitHub. Permission modes are how you tell Claude: *"Before you do stuff — how much should you check with me first?"*

## The 6 modes

**`default`** — labeled **Manual** in the UI. Reads run freely; Claude asks before edits and commands. When you approve, it can remember your answer for the rest of the session. Think: *"Ask before touching anything, but remember my answer."*

**`acceptEdits`** — Claude edits files without asking, and also runs common filesystem commands (`mkdir`, `touch`, `mv`, `cp`, even `rm`) — but **only inside your working directory**. Everything else (other Bash commands, network, paths outside the project) still prompts. Think: *"Free hands inside the project folder, ask for anything beyond it."*

**`plan`** — Claude can only look and think — it reads files and explores, but makes no edits. It writes up a plan, shows it to you, and only acts after you approve. When you approve, you choose how it executes (auto, accept edits, or manual review). Think: *"Show me the blueprint first."* Tip: prefix a single prompt with `/plan` to plan just that one request.

**`auto`** — Claude works without routine prompts, but a separate **safety classifier** model reviews every risky action in the background — blocking things like `curl | bash`, force pushes, production deploys, or sending your data to strange places. Think: *"Work freely; a guard watches everything."*

**`dontAsk`** — If an action isn't pre-approved by a rule, it's automatically denied. Never prompts. Think: *"If it's not on the list, the answer is no."* Made for CI and scripts.

**`bypassPermissions`** — Skips all checks. Claude does anything without asking. There's a tiny safety net for catastrophic commands (like wiping your home folder) — that's it. Only for isolated containers/VMs. Think: *"Full trust, no guardrails. Use carefully."*

## Three ways to switch modes

**Way 1 — Keyboard shortcut: `Shift+Tab`**
Cycles **Manual (default) → acceptEdits → plan** while you're in a session. The current mode shows in the status bar. Two catches:
- `auto` and `bypassPermissions` appear in the cycle only when enabled (`bypassPermissions` requires starting Claude with `--permission-mode bypassPermissions` or `--allow-dangerously-skip-permissions`)
- `dontAsk` **never** appears in the cycle — you must start with `claude --permission-mode dontAsk`

**Way 2 — CLI flag at startup:**
```bash
claude --permission-mode plan
claude --permission-mode acceptEdits
```

**Way 3 — `settings.json`:**
```json
{
  "permissions": {
    "defaultMode": "acceptEdits"
  }
}
```

Put it in `~/.claude/settings.json` for all projects, or `.claude/settings.json` for one project.

## The `/permissions` command

Type `/permissions` mid-session to see and manage every rule — what's allowed, asked, denied, and where each rule came from (your settings, project settings, org settings). It's shown as four tabs: **Allow / Ask / Deny / Workspace**.

**To add a rule without hand-editing `settings.json`:** open `/permissions`, choose **"Add a new rule..."**, pick the type (**Allow** = auto-approve, **Deny** = always block, **Ask** = force a confirmation even if an allow rule would otherwise match), then enter the pattern — e.g. `Bash(npm test:*)`, `Bash(git push:*)`, `Read(./.env)`. Claude Code writes it into the right `settings.json` for you.

## When do `settings.json` changes actually take effect?

Permission config loads at **session startup** — Claude Code doesn't watch `.claude/settings.json` for live changes while a session is already running. If you create or edit the file *after* a session has started, that session keeps operating on whatever permission state existed when it launched. The new or changed rule sits in the file correctly, but nothing in the running session has read it.

This has a sneaky failure mode. Claude can still *look* like it's honoring a rule it never actually loaded — it can read the file itself and voluntarily choose not to run a matching command, purely on its own judgment. That looks identical to real enforcement, right up until you phrase the same request more insistently and Claude complies anyway, because nothing was actually blocking it at the tool-permission level in the first place. A genuinely loaded `deny` rule can't be talked past no matter how the request is worded — the block happens before Claude has any say in it, not because Claude decided to comply.

**Rule of thumb:** after creating or editing `.claude/settings.json`, start a fresh session before trusting any rule in it — especially a `deny` rule you're relying on for safety. Don't mistake "Claude complied with the rule once" for "the rule is enforced."

## How modes and rules work together

Imagine you set the mode to `acceptEdits` so Claude can edit files freely. But you also wrote a deny rule: `"deny": ["Bash(git push:*)"]`.

What happens when Claude tries to run `git push`?

1. Claude checks the **rules** first
2. Finds a `deny` rule matching `git push`
3. **Stops. Denies.** The rule wins.

The mode is the general setting; individual rules override it. If there's a stop sign, you stop — even if the road is normally a highway. Deny rules apply in **every** mode — even `bypassPermissions`.

## Protected paths — the extra safety net

Regardless of mode (except `bypassPermissions`), writes to a small set of sensitive paths are **never auto-approved**: `.git/`, `.claude/`, `.vscode/`, shell config files like `.zshrc` and `.bashrc`, `.mcp.json`, and similar. This protects your repository state and Claude's own configuration from accidental (or malicious) modification — even an `allow` rule in settings can't pre-approve these.

## Quiz — Lesson 11

1. You're about to do a major refactor. You want Claude to show you a written plan before touching any file. Which permission mode do you pick? Name two ways to switch to it.

2. What's the difference between `acceptEdits` mode and `default` mode? What does each one ask you about, and what does each one do automatically?

3. You set the mode to `acceptEdits`. But you also have a deny rule for `Bash(git push:*)`. Claude tries to run `git push`. Walk through what happens step by step.

4. What is the exact key in `settings.json` to set the default permission mode? Write it as a path (e.g., `parent.child`). And what are the two files you could put it in — what's the difference?

5. What does `dontAsk` mode do when Claude tries an action that isn't on the approved list?

6. You add a new `deny` rule to `.claude/settings.json` while a Claude Code session is already running. You ask Claude to run the now-denied command and it refuses, explaining that the command matches your deny rule. Is that proof the rule is actually being enforced? Why or why not — and what would actually prove it?

## Ideal Answers — Lesson 11

1. Mode: **`plan`**. Two ways to switch: (a) press **`Shift+Tab`** during a session to cycle modes, (b) start Claude with the flag: **`claude --permission-mode plan`**.

2. **`default`** mode (labeled **Manual**): reads run freely, but Claude asks before file edits and commands; approvals can be remembered for the session. **`acceptEdits`** mode: file edits and common filesystem commands (`mkdir`, `touch`, `mv`, `cp`, `rm`) run without asking — but only inside the working directory; everything else still prompts. Key difference: in default, edits are asked about; in acceptEdits, edits inside the project never are.

3. (1) Claude tries to run the command. (2) Claude checks the rules first. (3) Finds a **deny** rule matching `Bash(git push:*)`. (4) Stops right there — no further checks. (5) **Denied.** Rules always take priority over the mode.

4. Key: **`permissions.defaultMode`**. Two files: **`~/.claude/settings.json`** (applies to every project on your machine, just for you) and **`.claude/settings.json`** (inside a project folder, applies only to that project, typically shared with teammates).

5. In `dontAsk` mode, Claude **never asks**. If an action isn't on the pre-approved list, it's **automatically denied** with no prompt.

6. **No — not proof by itself.** Permission config loads at session startup; a rule added mid-session isn't loaded into that session's enforcement state yet. Claude refusing and citing the rule can just be Claude reading the file and voluntarily choosing to comply — which is easy to mistake for real enforcement, but can be talked out of by asking more insistently, since nothing is actually blocking the tool call at the system level. **What would actually prove it:** start a fresh session (so the rule is loaded at startup this time) and try the same command again. A genuinely enforced deny rule produces a flat system-level denial no rephrasing can get around — not a reasoned, talkable-into-it refusal.

---

# Lesson 12: Checkpointing, Rewind & Session Management

## A story to start

Imagine playing a video game. You're deep into a level — lots of work done, things unlocked. Then you make a bad move and everything goes wrong. You wish you had a **save point** to go back to.

Claude Code has exactly that. It's called **checkpointing**, and it runs automatically — you didn't set it up, it's always on.

## What checkpoints save

Every time you send a message, Claude Code snapshots:
- Your conversation up to that point
- Your files (before Claude's next edits)

If Claude edits 5 files and the approach turns out wrong, you can rewind to before those edits. Files come back, conversation comes back.

**Two important caveats:**
1. Checkpoints only track files Claude edited *through its editing tools* (Edit/Write). If you edited a file manually in your editor, that's outside Claude's tracking — won't be restored.
2. **Bash commands are not tracked.** If Claude runs `rm file.txt` or `mv old.txt new.txt` through the shell, rewind can't undo it. Only direct file edits are checkpointed.

Checkpoints are "local undo," not a backup — git is still your permanent history.

## The two Escape keys

**`Esc` once** — stop what Claude is doing right now. In-progress work stops, finished work stays.

**`Esc` twice** (with an **empty** prompt box) — open the **rewind menu**.

⚠️ If you've typed text in the prompt box, `Esc Esc` clears the draft instead (it's saved to history — press `Up` to get it back). Empty box → rewind menu.

## The rewind menu

You see a list of all your recent messages. Pick a point in time. Then choose an action:

1. **Restore code and conversation** — files go back, conversation rewinds. Like it never happened.
2. **Restore code** — files go back, conversation stays. Useful when Claude said something worth keeping but made bad edits.
3. **Restore conversation** — conversation rewinds, files stay. Useful when you want a different angle from a certain message but don't want to lose file changes.
4. **Summarize from here** / **Summarize up to here** — compresses (not reverts) the conversation after or before the selected point. Like a targeted `/compact`.
5. **Never mind** — back out without changing anything.

Same menu opens by typing `/rewind`.

## Sessions — what they are

Every conversation in a project folder is a **session**. Claude Code saves them automatically to:

```
~/.claude/projects/<your-project-name>/<session-id>.jsonl
```

They survive your terminal closing. Come back tomorrow, open Claude Code, sessions are still there.

By default, sessions are kept for **30 days** then auto-deleted. To keep them longer, add to `settings.json`:

```json
{
  "cleanupPeriodDays": 600
}
```

## Resuming a session

Two ways:

**`claude --continue`** — resume the most recent session in the current folder, no questions asked.

**`claude --resume`** — open a picker showing all your saved sessions. Scroll, search, pick one. You can also resume directly by name or ID: `claude --resume "fixing the login bug"`.

## Naming a session

By default, sessions have auto-generated IDs (like `abc123`). Give it a real name when you start:

```bash
claude -n "fixing the login bug"
```

Now the session shows up in the picker as "fixing the login bug" instead of `abc123`.

Forgot to name it? Use `/rename` inside the session. (Bonus: when you approve a plan in plan mode, the session names itself from the plan automatically.)

## Branching a session

Want to try two approaches without losing either? **Branch** the session.

Inside the session: type `/branch` — creates a copy you can experiment on; the original stays intact.

At startup: `claude --continue --fork-session` (or `claude --resume <name> --fork-session`) — resumes a session but under a **new** session ID, so the original is untouched.

Think tree: trunk = original, branch = copy going a different direction. Both exist.

## Exporting

Type `/export` (in the terminal) to dump the conversation as text to your clipboard or a file. *(Note: this is terminal-only — the VS Code extension doesn't expose a clean export button.)*

## Quiz — Lesson 12

1. Claude just edited 8 files and you realize the whole approach was wrong. Walk me through the steps to undo everything — both the file edits and the conversation. What do you press? What do you see? What do you choose?

2. What is the difference between `claude --continue` and `claude --resume`? When would you use each one?

3. Where does Claude Code save your sessions on your computer? Give the exact path pattern (use `<placeholders>` for parts that change).

4. You're in a session and want to try two different solutions to the same problem without losing either one. What command do you run inside the session?

5. What is the difference between "restore code only" and "restore code and conversation" in the rewind menu? Give an example of when you'd choose each.

## Ideal Answers — Lesson 12

1. Press **`Esc` twice** (with an empty prompt box) or type **`/rewind`** to open the rewind menu. You see a list of your recent messages. Scroll up, pick a point before the bad edits. Options appear: Restore code and conversation, Restore code, Restore conversation, Summarize from here / up to here, Never mind. Choose **"Restore code and conversation"** — files and conversation both rewind, like it never happened.

2. **`claude --continue`** resumes the most recent session in the current folder with no questions asked. **`claude --resume`** opens a picker of all your saved sessions (or resumes directly by name/ID: `claude --resume "my-session"`). Use `--continue` to jump back into the last thing you were doing; use `--resume` to pick a specific older session.

3. **`~/.claude/projects/<your-project-name>/<session-id>.jsonl`**

4. Type **`/branch`** inside the session. It creates a copy you can try a different approach on while the original stays intact.

5. **Restore code and conversation** rewinds both — files go back AND the conversation rewinds. Example: Claude went down a completely wrong design path and you want to start that conversation over fresh. **Restore code** rewinds just the files; the conversation stays. Example: Claude made bad file edits but said something useful in the conversation you still want to keep visible.

---

# Lesson 13: Memory Deep Dive

## Quick recap

In Lesson 7 you learned `CLAUDE.md` is where you write instructions for Claude. Today we go deeper — the full memory system has multiple layers, multiple file types, and a feature called Auto Memory that runs quietly in the background.

## The CLAUDE.md hierarchy — four levels

Like a company with four levels of rules:

**Level 1 — Managed (org-wide)**
Some organizations push a `CLAUDE.md` that applies to every employee's machine (on macOS it lives at `/Library/Application Support/ClaudeCode/CLAUDE.md`). You can't override it. Most individuals don't have this.

**Level 2 — User (your personal global)**
```
~/.claude/CLAUDE.md
```
Applies to every project you ever open. Put personal preferences here.

**Level 3 — Project (shared)**
```
CLAUDE.md        (project root)
.claude/CLAUDE.md    (also works)
```
Inside a project folder. Shared with teammates via git. Project-wide rules.

**Level 4 — Local (personal project notes)**
```
CLAUDE.local.md    (project root)
```
Yours alone, only for this project. ⚠️ **You must add it to `.gitignore` yourself** — it is not ignored automatically (though `/init`'s "personal" option will do it for you).

All four are active simultaneously. Claude reads all of them when a session starts; the rules stack.

## `@path` imports

When `CLAUDE.md` gets long, split it. In your `CLAUDE.md`, write:

```
@docs/coding-standards.md
@docs/api-rules.md
```

Claude Code opens those files and treats their content as if it was written directly inline. Like `#include` in C. Imports can nest up to 4 levels deep. To *mention* a path without importing it, wrap it in backticks: `` `@README` `` stays literal.

**Bonus — AGENTS.md interop:** if your repo uses `AGENTS.md` for other coding agents, don't duplicate it — make your `CLAUDE.md` just say `@AGENTS.md` and both tools read the same instructions.

## `.claude/rules/` — scoped rules

**What "rules" means here:** A rule file is exactly like `CLAUDE.md` — plain text instructions for Claude written in English. The difference is *when* it loads.

`CLAUDE.md` always loads, for every session. Rules files load *conditionally* — only when Claude is working on files that match a specific path pattern.

**Why does this exist?**

Imagine your project has a backend API, a frontend, and a database layer. Each area has different rules:
- API files: always validate input, never expose raw errors
- Frontend files: use Tailwind classes only, never inline styles
- Database files: always use transactions for writes

If you put all of these in `CLAUDE.md`, Claude reads all of them all the time — even when it's only editing a CSS file and the database rules are completely irrelevant. It wastes context and can confuse Claude.

With `.claude/rules/`, you split the rules by area. Each rule file loads only for the files it applies to.

**How to set it up:**

Create a folder `.claude/rules/` inside your project. Each file inside is a mini rule-set with an optional `paths:` field that says *"only load me when Claude is working on matching files."*

Example: `.claude/rules/api-rules.md`

```
---
paths:
  - "src/api/**"
---

Always validate input at the API boundary.
Never return raw database errors to the client.
```

Example: `.claude/rules/frontend-rules.md`

```
---
paths:
  - "src/components/**"
  - "src/pages/**"
---

Use Tailwind classes only — no inline styles.
All interactive elements must have an aria-label.
```

**What happens at runtime:**

When Claude is about to edit `src/api/auth.js`, it loads `api-rules.md` — because the file path matches `src/api/**`. It does *not* load `frontend-rules.md` because the path doesn't match.

When Claude edits `src/components/Button.tsx`, the opposite happens: `frontend-rules.md` loads, `api-rules.md` doesn't.

**A rule file without `paths:` loads always** — same behavior as `CLAUDE.md`. So you can use `.claude/rules/` as a way to organize your rules into multiple files even when they're not scoped to a path.

**Personal rules also exist:** `~/.claude/rules/` works the same way but applies to every project on your machine — your personal preferences, loaded before project rules (so project rules win).

**Important: the context trade-off**

`CLAUDE.md` is loaded **once at session start** and stays in context — its cost is paid once and then cached for the whole session.

`.claude/rules/` files are loaded **dynamically mid-session** — when Claude touches a file that matches a rule's `paths:` pattern, that rule file is pulled into context at that moment.

This means rule files can *accumulate* during a long session: if Claude works across multiple areas of your codebase, each area's rule file gets added to context one by one as you go. In a long session that spans frontend, API, and database work, all three rule files end up in context anyway.

**So when are scoped rules actually useful?**

When you have rules that apply to a *small, focused part* of the codebase that you rarely touch. For example: migration rules for `src/db/migrations/` — you only touch those occasionally, so loading those rules only when needed keeps them out of most sessions entirely.

For rules that apply broadly (coding style, error handling, naming conventions) — just keep those in `CLAUDE.md`. They're cheap to load once and relevant everywhere.

**Keep rule files short.** A rule file that's 500 lines long compounds the problem — each time it loads mid-session it adds all that text to context. The best rule files are 5–15 concise lines: specific, actionable, non-redundant.

## The `/memory` command

Type `/memory` for an interactive menu showing:
- Your user-level `CLAUDE.md`
- Your project-level `CLAUDE.md`
- Your local file
- All your rules files
- Your auto memory files

Open and edit any of them from the menu.

## `/init` — generate a starter CLAUDE.md

New project, blank page? Type `/init`. Claude looks at the project (files, structure, stack) and writes a starter `CLAUDE.md` at the project root. First draft — edit from there. If a `CLAUDE.md` already exists, `/init` suggests improvements instead of overwriting. It even reads an existing `AGENTS.md` or `.cursorrules` and folds the relevant parts in.

## Auto Memory

The hidden feature: after certain conversations, Claude Code writes notes to itself in a separate location — not in CLAUDE.md, but in:

```
~/.claude/projects/<your-project-path>/memory/
```

Two parts:

**`MEMORY.md`** — the **index file**. A short list of pointers: "there's a file called `user_profile.md` about who this person is." Every session start, Claude reads this index (only the first 200 lines / 25KB load automatically) to know what to look up.

**The topic files** — like `user_profile.md`, `lesson_grades.md`. Each one holds the actual content about a specific topic. They are *not* loaded at startup — Claude reads the relevant ones on demand based on what you're working on.

This is why a new Claude can pick up a course a different Claude taught — the relevant context is on disk in these files. One memory directory is shared per git repository (all worktrees and subfolders included), and it's machine-local.

You can browse them with `/memory` (which also has an on/off toggle). To disable auto memory in settings: `"autoMemoryEnabled": false`.

## Quiz — Lesson 13

1. Name the four levels of `CLAUDE.md` in order from highest to lowest. For each, give the exact file path and say who can see it.

2. You have a rule — "always add JSDoc comments to functions" — that should only apply when Claude is working on files inside `src/utils/`. What file do you create, where, and what does the content look like (show the `paths:` field)?

3. What does `/init` do, and what file does it create? Give the exact path.

4. What is auto memory? Where are the files stored? Name the two parts and explain what each one does.

5. You want to add a personal note to your project — only you see, not your teammates — without touching shared `CLAUDE.md`. What file do you use and where does it live?

## Ideal Answers — Lesson 13

1. From highest to lowest:
   - **Managed** — `CLAUDE.md` pushed by org (e.g., `/Library/Application Support/ClaudeCode/CLAUDE.md` on macOS) — **everyone in the org**
   - **User** — `~/.claude/CLAUDE.md` — **only you, all projects**
   - **Project** — `CLAUDE.md` at project root (or `.claude/CLAUDE.md`) — **you + teammates** (committed to git)
   - **Local** — `CLAUDE.local.md` at project root — **only you, this project** (add it to `.gitignore` yourself)

2. Create `.claude/rules/utils-rules.md`:
   ```
   ---
   paths:
     - "src/utils/**"
   ---

   Always add JSDoc comments to functions.
   ```

3. **`/init`** looks at your project (files, structure, stack) and writes a starter `CLAUDE.md` for you. It creates the file at the **project root (`CLAUDE.md`)**. If one already exists, it suggests improvements instead of overwriting.

4. **Auto memory** is Claude Code's automatic note-taking: after certain conversations, Claude quietly writes notes to itself about your preferences, project context, and working style — separately from CLAUDE.md. Stored at **`~/.claude/projects/<project>/memory/`**. Two parts: **`MEMORY.md`** is the **index** — a short list of pointers Claude reads at session start to know what to look up. **Topic files** (like `user_profile.md`, `lesson_grades.md`) hold the actual content Claude reads based on what you're working on.

5. **`CLAUDE.local.md`** at the project root — loads alongside CLAUDE.md but is yours alone. Add it to `.gitignore` (it's not ignored automatically) so teammates never see it.

---

# Lesson 14: Skills & Custom Slash Commands

## The problem

You find yourself typing the same prompt over and over:

*"Review this file for security issues. Check for SQL injection, exposed API keys, hardcoded passwords. List problems as bullets."*

Wouldn't it be nice to type `/security-check` and have Claude run that prompt automatically?

That's what **skills** are. A skill is a saved, reusable prompt with a name. Type the name → Claude runs the prompt. And it works in both directions: **Claude can also invoke your skills automatically** when its `description` matches what you're asking about — you don't always have to type the slash command.

## Where skills live

```
.claude/skills/<skill-name>/SKILL.md
```

For a skill called `security-check`:
```
.claude/skills/security-check/SKILL.md
```

**The directory name is the command name** — `security-check/` becomes `/security-check`. (There's also `~/.claude/skills/` for personal skills that work in every project.)

`SKILL.md` has two parts: **frontmatter** (config) and the **prompt** (what Claude runs). The skill folder can also hold supporting files — templates, examples, scripts — that Claude loads only when needed.

## The simplest skill

```
---
name: security-check
description: Review a file for common security issues
---

Review the current file for security issues.
Check for SQL injection, exposed API keys, and hardcoded passwords.
Give me a bullet list of every problem you find.
```

Now type `/security-check` and Claude runs that prompt.

## Arguments — making skills flexible

Use `$ARGUMENTS` as a placeholder. It gets replaced with whatever you type after the skill name.

You type:
```
/security-check src/api/auth.js
```

Your skill says:
```
Review $ARGUMENTS for security issues...
```

Claude receives:
```
Review src/api/auth.js for security issues...
```

**Important:** `$ARGUMENTS` is text substitution — it inserts what you typed, *not* the contents of any file you mentioned. Claude then decides what to do (read the file, etc.) with that text.

**Splitting into individual arguments: `$0`, `$1`, `$2`, etc. — zero-based!**

If your skill needs separate pieces rather than the whole string, use `$0`, `$1`, `$2`... (`$N` is shorthand for `$ARGUMENTS[N]`). ⚠️ Counting starts at **zero** — `$0` is the *first* argument. Splitting is **whitespace-based**, with **shell-style quoting** to group multi-word arguments:

- `/deploy staging v2.1` → `$0 = staging`, `$1 = v2.1`
- `/deploy "us east" v2.1` → quotes group it, so `$0 = us east` (one argument), `$1 = v2.1`

**`$ARGUMENTS` and `$0`/`$1` coexist** — `$ARGUMENTS` always holds the *entire original string as typed*, no matter how many `$0`, `$1`, etc. you also use. And if your skill has **no** `$ARGUMENTS` placeholder at all, your input isn't lost — Claude Code appends `ARGUMENTS: <what you typed>` to the end of the skill content so Claude still sees it.

**Example:**

```
Deploy $0 as $1 with options: $ARGUMENTS
```

You type:
```
/deploy staging v2.1 --health-check
```

Claude receives:
```
Deploy staging as v2.1 with options: staging v2.1 --health-check
```

- `$0` → `staging`
- `$1` → `v2.1`
- `$ARGUMENTS` → the full original string, `staging v2.1 --health-check`

**Named arguments** also exist: declare `arguments: [env, version]` in the frontmatter, then write `$env` and `$version` in the prompt — same positions, friendlier names.

## Frontmatter options

**`name`** — the *display label* shown in skill listings. ⚠️ It does **not** set the command — the **directory name** does. A skill at `.claude/skills/deploy-staging/SKILL.md` is `/deploy-staging` regardless of what `name` says.

**`description`** — the most important field. Claude reads it to decide **when to auto-invoke** the skill. Write it like a trigger: *"Use when the user asks what changed or wants a commit message."*

**`allowed-tools`** — **pre-approves** tools while the skill runs, so Claude can use them *without permission prompts*. ⚠️ It does NOT restrict — every other tool is still available, just subject to normal permission checks. Accepts a YAML list or a space/comma-separated string:
```yaml
allowed-tools: Bash(git add *) Bash(git commit *)
```

**`disallowed-tools`** — this is the field that actually *removes* tools from Claude's pool while the skill is active. Use it when a skill must never touch something (e.g., an audit skill that must not Edit).

**`user-invocable: false`** — hides the skill from the `/` menu; only Claude can invoke it. Use for background knowledge that isn't a meaningful command (e.g., "how our legacy billing system works").

**`disable-model-invocation: true`** — the mirror image: only *you* can invoke it (Claude won't auto-trigger it). Use for skills with side effects where you control the timing — `/deploy`, `/commit`, `/send-message`. You don't want Claude deciding to deploy just because the code looks ready.

**`context: fork`** — running this skill creates a separate sub-session (a subagent). Result comes back, main conversation stays clean. Pair it with **`agent: Explore`** to pick which agent type runs it. Useful for long research tasks. If `agent` is omitted, it defaults to `general-purpose`.

*Why hard-code the agent instead of letting Claude pick each time?* Unlike the `Agent` tool — where Claude chooses a subagent type live, per call, based on the task in front of it — a skill's `agent:` is set once, when the skill is authored, and reused identically on every future invocation. That's deliberate: it keeps the skill's behavior consistent run after run, and it's a real guardrail — e.g. `agent: Explore` is read-only by construction, so a research skill genuinely can't Edit/Write files, instead of just hoping Claude behaves that way each time.

Other useful fields: **`argument-hint`** (autocomplete hint like `[filename]`), **`model`** / **`effort`** (override for the duration of the skill), and **`paths`** (only auto-load the skill when working on matching files).

## Dynamic content with `` !`command` ``

Sometimes the skill needs to know something *right now* — the current git branch, today's date, the latest commit — before Claude even starts thinking.

The syntax is **bang-backtick**: `` !`command` ``. Put a shell command inside the backticks, anywhere in your SKILL.md prompt.

**What happens, step by step:**

1. You type `/myskill foo`
2. *Before* Claude sees anything, Claude Code runs every `` !`command` `` in the file and replaces it with that command's output (plain text)
3. `$ARGUMENTS` is substituted too, with whatever you typed (`foo`)
4. The fully-substituted text is what Claude actually receives — it never sees the `` !`command` `` syntax itself, only the result

**Example — `.claude/skills/review-branch/SKILL.md`:**

```
---
name: review-branch
description: Review changes on the current branch
---

You are reviewing code on branch: !`git branch --show-current`

Review $ARGUMENTS for issues.
```

You type:
```
/review-branch the auth module
```

Claude actually receives this as its prompt:
```
You are reviewing code on branch: main

Review the auth module for issues.
```

**Note on permissions:** this substitution does *not* require an `allowed-tools` entry — it runs regardless, since it happens before Claude (and the permission system) is even involved.

**Multiple commands at once:** use a fenced block starting with `` ```! `` instead of inline backticks.

## The old `.claude/commands/` system

Before skills, there were **commands**: `.claude/commands/<name>.md` → `/<name>`. Today, **commands have been merged into skills** — a file at `.claude/commands/deploy.md` and a skill at `.claude/skills/deploy/SKILL.md` both create `/deploy`, support the same frontmatter, and work the same way. Skills add the extras: a directory for supporting files, and automatic loading when relevant. For new work, use skills; existing commands keep working, no migration needed. (If a command and a skill share a name, the skill wins.)

Fun fact: skills follow the **Agent Skills open standard** (agentskills.io) — the same SKILL.md format works across multiple AI tools, not just Claude Code.

## Quiz — Lesson 14

1. You want to create a skill called `summarize`. What is the exact file path you need to create?

2. Your skill prompt contains `Summarize $ARGUMENTS`. You type `/summarize README.md in one paragraph`. What does Claude actually receive as the prompt?

3. Two frontmatter fields sound similar: `allowed-tools` and `disallowed-tools`. What does each one actually do? If you want a skill that must NEVER edit files, which one do you use?

4. What is the difference between `user-invocable: false` and `disable-model-invocation: true`? Give one example use case for each.

5. What is the relationship today between `.claude/commands/` and skills? Should you migrate old commands?

## Ideal Answers — Lesson 14

1. **`.claude/skills/summarize/SKILL.md`** — substituted with the actual skill name.

2. **`Summarize README.md in one paragraph`** — `$ARGUMENTS` is replaced with the literal text you typed after the skill name. It's pure text substitution; Claude reads it and then decides what to do (e.g., read the README file).

3. **`allowed-tools`** *pre-approves* the listed tools — Claude can use them without permission prompts while the skill runs; every other tool is still available (with normal prompting). **`disallowed-tools`** *removes* tools from Claude's pool while the skill is active. To make a skill that must never edit files, use **`disallowed-tools: Edit, Write`** — allowed-tools would not prevent anything.

4. **`user-invocable: false`** — hides the skill from the `/` menu; only Claude can invoke it. Use for background knowledge that isn't an action (e.g., a `legacy-system-context` skill). **`disable-model-invocation: true`** — Claude can't auto-trigger it; only you can, by typing `/name`. Use for side-effect workflows where timing matters — `/deploy`, `/commit`.

5. **Commands have been merged into skills** — `.claude/commands/deploy.md` and `.claude/skills/deploy/SKILL.md` both create `/deploy` and support the same frontmatter. Skills add supporting files and automatic invocation. **No need to migrate** existing commands; use skills for new work. If both define the same name, the skill wins.

---

# Lesson 15: Subagents in Practice

## You learned the theory; now use it

Lesson 10 covered what agents are conceptually. This lesson is about using and creating them in Claude Code.

Think of it like this: Claude (the one you're talking to) is a project manager. Subagents are specialists it hires for specific jobs. The PM doesn't do everything itself.

## The three built-in agents

**`Explore`** — the investigator.
Read-only — cannot edit files or run state-changing commands. But unlike the `Read` and `Search` tools (which each do one thing in one step), `Explore` is a full sub-Claude that **reasons and chains operations**: it plans a search, reads a file, finds a reference, reads another file, and so on — until it has a complete answer to bring back.

Use it for questions that span the whole codebase: "how does the auth system work?", "where is this feature implemented?", "what touches this database table?" — tasks that require multiple reads and judgment, not just a single lookup. Safe to let run freely since it can't change anything.

**`Plan`** — the architect.
Thinks before acting. Designs an approach for complex tasks (big refactors, architecture decisions). Hands the plan back to you for approval before acting.

**`general-purpose`** — the all-rounder.
Default. Can read, edit, run commands. Used when Claude needs a subagent to handle a complete subtask end-to-end.

## How Claude uses them

Often automatically. You'll see "launching Explore agent to search the codebase" pop up in responses. In fact, subagents now run **in the background by default** — Claude keeps working and collects their results when ready.

To see what's currently running (shells and subagents), use **`/tasks`**. (Note: `/agents` used to open an interactive wizard for creating agents — that wizard was removed. Now `/agents` just reminds you to ask Claude to create one, or to edit the files directly.)

## Foreground vs background

**Foreground** — runs in front of you. You see its work in the main conversation, and Claude waits for it to finish before doing anything else.

**Background** — runs on its own while you keep talking to Claude. Claude stops waiting, and gets notified when the work completes.

### `Ctrl+B` — background a running command

Press **`Ctrl+B`** to send a **running Bash command** to the background.

**When it works:** only while a Bash command is actually executing.

**When it does nothing:** while Claude is thinking, while Claude is writing its response, or at an idle prompt. There's no error and no message — the keypress is simply ignored. This is the number one reason people report "`Ctrl+B` is broken." It isn't; there was nothing running to background.

**What it backgrounds:** the *command*, not Claude. Claude still handles one turn at a time, and anything you type mid-turn is **queued**, not run in parallel. `Ctrl+B` does not give you a second Claude.

### Live demo

Ask Claude to run something slow:

```
run ping -c 60 127.0.0.1
```

While it's running, press **`Ctrl+B`**. It detaches immediately:

```
Command was manually backgrounded by user with ID: bqrtlruk6
Output is being written to: .../tasks/bqrtlruk6.output
```

Now ask Claude something unrelated — *"what's in this folder?"* — and it answers right away while the ping keeps counting.

About a minute later, with no action from you, the result arrives on its own:

```
60 packets transmitted, 60 packets received, 0.0% packet loss
```

Backgrounding is **not** fire-and-forget: when the command finishes, Claude is notified automatically and reads the output. You don't poll and you don't open the file.

### Running work in the background

`Ctrl+B` is the escape hatch for something you already started. These are the deliberate ways:

| Approach | How | What you get |
|---|---|---|
| **Ask upfront** | *"run the tests in the background"* | Claude starts it detached — best default, no keystroke |
| **Subagents** | Claude delegates automatically | Background by default; real parallel work |
| **Second session** | Open another terminal, run `claude` | Two genuinely independent Claudes |
| **`claude --bg "prompt"`** | Starts a detached session | Manage it later with `claude agents` |

Subagents are the important row: they are the only thing here that makes *Claude's own reasoning* run in parallel. Claude launches an `Explore` agent, keeps working, and collects the result when it lands.

### Managing what's running

**`/tasks`** — see everything in flight (background shells and subagents) plus their output.

**Kill all background subagents:** `Ctrl+X` then `Ctrl+K` (press twice within 3 seconds to confirm).

## Creating your own agent

Custom agents are single markdown files:

```
.claude/agents/<agent-name>.md        (this project)
~/.claude/agents/<agent-name>.md      (all your projects)
```

Frontmatter + system prompt below. The easiest way to create one: just ask Claude — *"Create a python-reviewer subagent in .claude/agents/ that..."* — Claude Code watches the agents folder, so new/edited agents load within seconds, no restart. Example:

```
---
name: python-reviewer
description: Reviews Python files for PEP 8 compliance and type safety. Use after writing or modifying Python code.
model: sonnet
tools: Read, Grep, Bash
---

You are a Python code reviewer.
When given a file, read it carefully and check for:
- PEP 8 style violations
- Missing type hints
- Functions without docstrings

Report issues as a numbered list.
```

## Frontmatter fields explained

Only `name` and `description` are required.

**`name`** — what Claude calls this agent when delegating (lowercase-with-hyphens; the filename doesn't have to match).

**`description`** — **the most important field**. Claude reads it to decide *when* to use this agent. Write it like you're telling Claude exactly when to call this specialist. Vague descriptions = Claude never knows to use it. Good: *"Specializes in reviewing Python files for PEP 8 compliance and type safety."* Bad: *"Python agent."*

**`model`** — which Claude model the agent uses: `sonnet`, `opus`, `haiku`, `fable`, a full ID, or `inherit` (the default — same model as your conversation). Pick a cheaper one (like `haiku`) for repetitive background work.

**`tools`** — an **allowlist** of what the agent can use (comma-separated: `tools: Read, Grep, Glob`). If omitted, the agent inherits all tools. The mirror field **`disallowedTools`** removes specific tools while inheriting the rest (e.g., `disallowedTools: Write, Edit` for a read-only agent).

**`skills`** — preload specific skills into the agent's context at startup (full content, not just descriptions).

Power extras worth knowing: **`isolation: worktree`** (the agent works on an isolated git copy of your repo — can't disturb your working tree), **`memory`** (the agent keeps its own persistent auto-memory across sessions), **`maxTurns`** (hard stop), **`permissionMode`**, and **`color`** (how it appears in the task list).

## Agent `tools` vs skill `allowed-tools` — not the same thing!

This trips everyone up, because the names sound alike but the behavior is opposite in spirit:

- **Agent's `tools`** is a **restriction** — an allowlist. The agent can use those tools and nothing else, wherever it goes.
- **Skill's `allowed-tools`** is a **pre-approval** — the listed tools skip permission prompts while the skill runs. It doesn't take anything away; other tools remain available with normal prompting.

Think of it this way: the agent's `tools` is the **toolbox you hand the contractor** — if the hammer isn't in the box, they don't have a hammer. The skill's `allowed-tools` is a **signed permission slip** — "no need to call me to approve these specific actions." (To actually *remove* tools during a skill, that's `disallowed-tools`.)

## Skill or agent — how to choose

A skill and an agent can often do the same task. The choice comes down to four things:

| | Skill | Agent |
|---|---|---|
| **What it is** | Instructions injected into the conversation | A separate worker with its own system prompt |
| **Invocation** | You type `/name`, or Claude auto-loads it when relevant | Claude delegates based on the `description` |
| **Steps** | Guides the current conversation | Runs its own multi-step reasoning loop |
| **Context** | Runs inside your conversation | Isolated — its own context window |
| **Model** | Same as your session (unless `model:` set) | Any model (`model:` field), inherits by default |

**Same task, two implementations — "review this Python file"**

As a **skill** — perfectly fine for a quick manual review:

```
# .claude/skills/python-review/SKILL.md
---
name: python-review
description: Review a Python file for PEP 8 and type safety
allowed-tools:
  - Read
---

Review $ARGUMENTS for PEP 8 violations, missing type hints, and functions without docstrings.
Report as a numbered list.
```

You type `/python-review src/main.py`. The main Claude reads the file and responds. Clean and simple.

As an **agent** — better when you want three things the skill can't give you:

```
# .claude/agents/python-reviewer.md
---
name: python-reviewer
description: Review Python files for PEP 8 compliance and type safety. Use whenever Python code is written or modified.
model: haiku
tools: Read, Bash
---

You are a Python code reviewer.
When given a file, read it carefully and check for:
- PEP 8 style violations
- Missing type hints
- Functions without docstrings

Report issues as a numbered list.
```

1. **Auto-invocation** — Claude reads the `description` and can delegate to this agent automatically whenever Python code is touched. You don't type `/python-review` every time.
2. **Isolation** — the review work (reading files, running checks) happens in a separate context. Your main conversation stays clean.
3. **Cheaper model** — the review runs on `haiku` while your main conversation stays on `opus`. Same quality, lower cost for repetitive work.

**Rule of thumb:** start with a skill. Upgrade to an agent when you want Claude to trigger it automatically, when the task spans many files, or when you want it running on a different model in the background.

## Quiz — Lesson 15

1. What are the three built-in agents in Claude Code? For each, describe in one sentence what it does and what it's used for.

2. Claude is running `npm test` and it's taking four minutes. You want your prompt back so you can ask about something else. What do you press, and what exactly does it background — the command, or Claude itself? A classmate presses the same keys while Claude is *thinking* and reports "nothing happened." Why?

3. You want to create a custom agent called `docs-writer` that can only read files (no editing, no bash). What is the exact file path you create, and write the frontmatter section showing `name`, `description`, and `tools`.

4. Why is the `description` field so important? What happens if it's vague?

5. What is the difference between an agent's `tools` field and a skill's `allowed-tools` field? Which one restricts, and which one pre-approves?

## Ideal Answers — Lesson 15

1. **`Explore`** — read-only agent that reads files but cannot edit or run state-changing commands. Used for searching large codebases. **`Plan`** — designs an approach for complex tasks, writes up the plan, hands it back for approval before acting. **`general-purpose`** — the default, can read/edit/run anything. Used for complete subtasks end-to-end.

2. **`Ctrl+B`** — it backgrounds the **command** (`npm test`), not Claude. The test keeps running, Claude stops waiting for it, your prompt frees up, and when the command finishes Claude is notified automatically and reads the output. The classmate saw nothing because **`Ctrl+B` only does something while a Bash command is actively executing** — while Claude is thinking there is nothing to background, so the keypress is silently ignored (no error, no message). Note also that backgrounding a command does *not* let you run a second prompt in parallel: Claude still handles one turn at a time, and anything typed mid-turn is queued. For real parallelism, use subagents (background by default), a second `claude` session, or `claude --bg`.

3. Path: **`.claude/agents/docs-writer.md`** (a single markdown file, not a folder). Frontmatter:
   ```yaml
   ---
   name: docs-writer
   description: Reads files and generates documentation without modifying the codebase
   tools: Read, Grep, Glob
   ---
   ```

4. The **`description`** field is what Claude reads to decide *when* to use this agent. If it's vague (like "code agent"), Claude won't know when to call it — the agent essentially never gets used. Write it like you're explicitly telling Claude when to delegate to this specialist.

5. **Agent `tools`** is a **restriction** (an allowlist) — the agent can use those tools and nothing else. **Skill `allowed-tools`** is a **pre-approval** — the listed tools skip permission prompts while the skill runs, but nothing is taken away. Analogy: the agent's `tools` is the toolbox you hand the contractor; the skill's `allowed-tools` is a signed permission slip. (To remove tools during a skill, use `disallowed-tools`.)

---

# Lesson 16: Plugins & Marketplaces

## The problem plugins solve

You built a `security-check` skill, a `docs-writer` agent, and some hooks. Your teammate wants all of it. Telling them "create this folder, put this here, add this to settings.json..." is fragile.

A **plugin** bundles everything into one shareable package. Your teammate runs one install command, gets everything.

## What's inside a plugin

```
my-plugin/
├── .claude-plugin/
│   └── plugin.json        ← the manifest (required)
├── skills/
│   └── security-check/
│       └── SKILL.md
├── agents/
│   └── docs-writer.md
├── hooks/
├── .mcp.json
└── settings.json
```

Every folder you've already learned. The only new piece: `.claude-plugin/plugin.json`.

## The manifest — `plugin.json`

```json
{
  "name": "security-toolkit",
  "description": "Security review tools for Claude Code",
  "version": "1.0.0",
  "author": "Yossi"
}
```

The fields:
- **`name`** — the identifier used when installing. **This is the only required field.**
- **`description`** — what it does (shown in the marketplace) — recommended
- **`version`** — so users know if they have the latest — recommended
- **`author`** — who made it — recommended

In fact, the whole manifest is optional — a folder with a `skills/` directory already works as a plugin (the folder name becomes the plugin name). But writing the manifest is good practice: it's your plugin's face in the marketplace.

## Namespacing — no conflicts

Your plugin has a skill called `review`. Claude Code has a built-in `/review`. Which runs?

Plugins solve this with **namespacing**. Plugin skills get prefixed with the plugin name:

```
/security-toolkit:review
```

Format: **`/plugin-name:skill-name`** — no space.

## Installing a plugin

Type `/plugin` to open the plugin menu. From there: browse, install, enable/disable, manage marketplaces.

When you install, you pick a **scope**:
- **User scope** — installed for you across all projects
- **Project scope** — installed for the whole project (shared via config)
- **Local scope** — just for you on this project (not shared)

## Marketplaces

Where plugins live:

**Public marketplace** — Anthropic's official directory at claude.ai. Anyone can submit and install.

**Private marketplace** — a GitHub repo with plugin folders. Your team hosts it, controls access, puts internal tools there.

To add a marketplace, point Claude Code at the repo:

```
/plugin marketplace add owner/repo
```

(Also accepts a full URL or a local path.) Then `/plugin` → browse → install.

## Building and testing locally

When developing a plugin, don't publish until ready. Load locally:

```bash
claude --plugin-dir ./my-plugin
```

Edit, test, iterate — all local. When ready, push to a GitHub repo as a marketplace.

## Reloading during development

Changed plugin files while Claude Code is running? Type:

```
/reload-plugins
```

Re-reads all plugin files. No restart needed.

## Quiz — Lesson 16

1. What is the plugin manifest file? Give its exact path inside the plugin folder, name its only *required* field, and three recommended ones.

2. You installed a plugin called `code-tools` that has a skill called `lint`. How do you run that skill? Type the exact command.

3. What is the difference between user scope, project scope, and local scope when installing a plugin?

4. You're building a plugin locally and want to test it without publishing. What flag do you use, and what does the command look like?

5. You made a change to a plugin's skill file while Claude Code is already running. What do you type to pick it up without restarting?

## Ideal Answers — Lesson 16

1. The manifest file is at **`.claude-plugin/plugin.json`** inside the plugin folder. The only **required** field is **`name`** (the identifier). Recommended: **`description`** (what it does), **`version`** (so users see updates), **`author`** (who made it). The manifest itself is technically optional — components are auto-discovered — but good practice.

2. **`/code-tools:lint`** — no space between the plugin name, the colon, and the skill name.

3. **User scope** — installed for you across every project on your machine. **Project scope** — installed for everyone working on the project (saved in project config, shared via git). **Local scope** — installed for you on this project only, not shared.

4. Use the **`--plugin-dir`** flag: **`claude --plugin-dir ./my-plugin`**. Loads from the local folder so you can edit and test without publishing.

5. **`/reload-plugins`** — re-reads all plugin files, picks up changes without restarting Claude Code.

---

# Lesson 17: Headless Mode, Output Styles & CI/CD

## Two ways to use Claude Code

So far, every interaction has been a conversation — you talk, Claude responds, back and forth. This is **interactive mode**.

There's a completely different way: **headless mode** (or non-interactive mode). Claude runs once, does the task, prints the result, exits. No conversation. No waiting.

Analogy:
- Interactive = a restaurant (sit down, chat, order, eat, dessert)
- Headless = a vending machine (push button, get output, walk away)

Use interactive when working on something with iteration and follow-ups. Use headless for automation — like CI/CD pipelines running on every commit.

## The `-p` flag

`-p` is short for `--print`. It's the switch that flips to headless mode.

```bash
claude -p "Review this file for bugs and list them"
```

Claude reads the prompt, does the work, prints the result, exits. No interactive session.

**Important:** in headless mode, Claude cannot ask follow-up questions. Your prompt must be completely self-contained — include everything Claude needs upfront, either in the prompt text or via piped input.

Combine with shell:
```bash
claude -p "Review this for security issues" < src/auth.js
```

The file contents are sent as part of the prompt.

## `--output-format` — structured output

Three options:

**`text`** — default, plain readable text.

**`json`** — Claude's response wrapped in a JSON object plus metadata (cost, tokens used). Useful when a script needs to parse the output.

**`stream-json`** — same as JSON but arrives piece by piece as Claude generates it, instead of all at once.

```bash
claude -p "List the 3 main bugs" --output-format json < app.js
```

Now a script can parse the JSON and do something with it — post to Slack, create a GitHub issue, etc.

## `--allowedTools` — pre-approve tools

In headless mode there's no human to ask permission. Pre-approve tools with the flag:

```bash
claude -p "Read main.js and summarize" --allowedTools "Read"
```

Multiple tools, comma-separated:
```bash
claude -p "Fix the bug" --allowedTools "Read,Edit,Bash"
```

## `--bare` — minimal mode

Skip auto-discovery of skills, plugins, hooks, MCP, memory — pure Claude:

```bash
claude --bare -p "What is 2+2?"
```

Use for: testing/debugging, locked-down environments, when custom config might interfere. One caveat: `--bare` also skips subscription OAuth tokens — authenticate with `ANTHROPIC_API_KEY` when using it in scripts.

## `--append-system-prompt` — one-time instructions

Add an instruction for just one run, not permanently:

```bash
claude -p "Review this" --append-system-prompt "Respond in French"
```

Like a sticky note for one task.

## GitHub Actions — Claude in your CI/CD

CI/CD (Continuous Integration / Continuous Deployment) runs tasks automatically when you push to GitHub — tests, linting, deploys. You can add Claude to this.

The recommended way is the **official GitHub Action** — it installs Claude Code on the runner and handles the plumbing for you:

```yaml
name: Claude Code Review
on: [pull_request]

jobs:
  review:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write
    steps:
      - uses: actions/checkout@v4
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          prompt: "Review the changed files for bugs and comment on the PR"
```

(You *can* also install the CLI on the runner yourself and call `claude -p ...` directly — same headless mode you just learned — but the action saves you the setup.)

**Two things needed for authentication:**
1. Store your **API key as a GitHub secret** (in repo Settings → Secrets)
2. **Pass it into the workflow**: `anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}` (or as an `ANTHROPIC_API_KEY` env var if running the CLI directly)

Without that, the secret exists but Claude can't see it.

**On a subscription instead of an API key?** Run `claude setup-token` once on your machine — it prints a long-lived OAuth token. Store it as a secret and set it as `CLAUDE_CODE_OAUTH_TOKEN` in CI.

GitLab CI works the same way, just with `.gitlab-ci.yml` instead.

## Other automation patterns

GitHub Actions is one place headless mode runs. Here are three more common patterns — all have the same rule: **no human present, so your prompt must be self-contained**, and `ANTHROPIC_API_KEY` must be set as an environment variable.

---

**1. Pre-commit git hook — runs before every `git commit`**

Create `.git/hooks/pre-commit`:

```bash
#!/bin/bash
git diff --staged | claude -p "Check this code diff for hardcoded secrets or obvious security issues. Print any problems you find." --allowedTools "Bash"
```

Make it executable:
```bash
chmod +x .git/hooks/pre-commit
```

Now every `git commit` automatically runs Claude on your staged changes before they're committed.

---

**2. Shell script — capture Claude's output and use it**

```bash
#!/bin/bash
RESULT=$(claude -p "List all TODO comments in this file" --output-format json < src/auth.js)
echo $RESULT | jq '.result' >> todo_report.txt
echo "Report saved."
```

`--output-format json` wraps Claude's answer in a JSON object. `jq '.result'` extracts just the text. Now the output can be piped, saved, or processed by the rest of the script.

---

**3. Python script — call Claude as a subprocess**

```python
import subprocess, json

result = subprocess.run(
    ["claude", "-p", "Extract all function names from this file", "--output-format", "json"],
    stdin=open("src/auth.js"),
    capture_output=True,
    text=True
)

output = json.loads(result.stdout)
print(output["result"])
```

Claude runs as a child process. Your Python code gets the result as a string, parses the JSON, and does whatever it wants with it — save to a database, post to Slack, feed into another tool.

---

**4. Cron job — runs on a schedule automatically**

Add to crontab (`crontab -e`):

```bash
# Every night at midnight — summarize today's errors
0 0 * * * claude -p "Summarize the errors in this log file" < /var/log/app.log > /reports/$(date +%Y%m%d).txt
```

`0 0 * * *` = midnight every day. Claude runs, reads the log, writes the summary to a file named with today's date. No one touches it.

---

**The pattern across all four:** pipe input in with `<`, use `--output-format json` when a script needs to parse the result, and always make sure `ANTHROPIC_API_KEY` is available in the environment where the script runs.

## Output styles

Change how Claude communicates — not what it knows, but how. Built-in styles: Default, Explanatory (more context), Learning (collaborative tone).

Create a custom one at:
```
.claude/output-styles/<name>.md
```

Example:
```
---
name: concise
description: Short, no preamble, no summaries
---

Always respond in the fewest words possible.
Skip preamble, skip summaries, skip pleasantries.
```

Switch with `/config` → Output style, or set `"outputStyle": "concise"` in `settings.json`.

## Quiz — Lesson 17

1. What is the difference between interactive mode and headless mode? Give an example of when you'd use each one.

2. Write the exact command to run Claude in headless mode, asking it to "find all TODO comments", allowing only `Read` and `Bash` tools, and outputting as JSON.

3. What does `--bare` do, and when would you use it?

4. You want Claude to automatically review pull requests on GitHub. What two things do you need to set up for Claude to authenticate?

5. You want to create a custom output style called `teacher` that makes Claude explain everything like to a beginner. What is the exact file path?

## Ideal Answers — Lesson 17

1. **Interactive mode** = back-and-forth conversation (restaurant analogy); use when actively working on something with follow-ups. **Headless mode** = run once, get output, exit (vending machine); use for automation like CI/CD review on every push, scheduled jobs, scripts.

2. **`claude -p "find all TODO comments" --output-format json --allowedTools "Read,Bash"`**

3. **`--bare`** skips all auto-discovery — no skills, plugins, hooks, MCP, memory. Just pure Claude with your prompt. Use for testing/debugging, locked-down environments, or when you want to make sure custom config isn't affecting Claude's behavior.

4. (1) Store your **API key as a GitHub secret** in repo Settings → Secrets. (2) **Pass it to Claude as an env var** in the workflow file: `env: ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}`. Without the env var, the secret exists but Claude can't read it.

5. **`.claude/output-styles/teacher.md`**

---

# Lesson 18: IDE Integration, Extended Thinking & Polish

## IDE Integration — Claude inside your editor

### The VS Code extension

Claude Code in VS Code = a chat panel inside your editor.

**`@` mentions — point Claude at specific things:**
- `@filename.js` — includes that file's contents
- `@src/utils/` — includes a folder
- `@filename.js#5-20` — includes lines 5–20 only

No space between `@` and the filename.

**`@browser` — Claude inside Chrome:**
With the Claude Code Chrome extension installed, `@browser` lets Claude read what's on your active Chrome tab.

### Connecting terminal to VS Code: `/ide`

Normally the terminal Claude Code and VS Code panel Claude Code are separate sessions.

`/ide` doesn't merge the sessions. What it *does*: when Claude in the terminal edits a file, VS Code highlights the change in your editor view. Links the terminal's *actions* to VS Code's *display*.

To share the same conversation: in the terminal, run `claude --resume` and pick the VS Code session.

### JetBrains

Same idea, plugin for IntelliJ/PyCharm/WebStorm. Install from the JetBrains marketplace.

## Extended Thinking

Normally Claude responds fast. **Extended thinking** = Claude takes more time to reason through hard problems before answering. You see the final answer (can expand to see the reasoning).

Analogy: normal Claude = student who knows the material. Extended thinking Claude = student who reads the question three times, works it out on scratch paper, then writes the final answer.

**Three ways to enable:**

**1. `Option+T` (Mac) / `Alt+T` (Windows)** — toggles for the whole session.

**2. `/config`** menu → Extended thinking → on.

**3. The `ultrathink` keyword** — type the word `ultrathink` anywhere in a single message. Extended thinking applies just to that one message, not the session.

Key difference: `Option+T` = session-wide toggle. `ultrathink` = just this one message.

(One exception: **Fable 5 always uses extended thinking** — the toggle has no effect on it.)

## Switching models and effort

**`/model`** — opens a picker of available Claude models. Your pick is also saved as the default for new sessions (press `s` in the picker to switch for this session only).

Models (aliases):
- **`fable`** — Fable 5, most capable, for the hardest and longest tasks
- **`opus`** — deep reasoning (currently Opus 4.8)
- **`sonnet`** — balanced daily workhorse (currently Sonnet 5)
- **`haiku`** — fastest, cheapest
- **`opusplan`** — Opus for planning, Sonnet for execution

**Effort levels** — how hard Claude tries. Five levels:
- `low` — quick, minimal reasoning
- `medium` — balanced
- `high` — more careful
- `xhigh` — very thorough
- `max` — full effort, slowest

(Which levels are available depends on the model.)

Change mid-session: **`/effort high`**.

Set permanently: `"effortLevel": "high"` in `settings.json`.

## Fast mode

**`/fast`** (or `Option+O` / `Alt+O`) toggles **fast mode** — Opus with much faster output speed. It's the same intelligence, not a downgrade to a smaller model; great for interactive back-and-forth where waiting hurts.

## Utility commands

**`/usage`** — token usage and costs, with usage bars for your plan limits (session + week). `/cost` and `/stats` are aliases.

**`/context`** — visual map of your context window: what's taking up space and suggestions to optimize.

**`/status`** — account info, current model, plan tier.

**`/doctor`** — diagnostic checkup of your setup. Checks installation, config issues, duplicate agents/skills — and can fix some issues itself. First stop when something's broken.

## Keyboard shortcuts

| Shortcut | What it does |
|---|---|
| `Esc` once | Stop Claude mid-response |
| `Esc` twice | Rewind menu (empty prompt box) / clear draft (text in box) |
| `Shift+Tab` | Cycle permission modes (Manual → acceptEdits → plan) |
| `Ctrl+B` | Background a running task/agent |
| `Ctrl+X Ctrl+K` | Kill background subagents (press twice to confirm) |
| `Option+T` / `Alt+T` | Toggle extended thinking |
| `Option+O` / `Alt+O` | Toggle fast mode |
| `Option+P` / `Alt+P` | Switch model without clearing prompt |
| `Ctrl+O` | Open transcript viewer (detailed tool usage) |
| `Ctrl+T` | Toggle Claude's task checklist |
| `Ctrl+G` | Edit your prompt (or a plan) in your text editor |
| `Ctrl+V` | Paste image (`Cmd+V` in iTerm2, `Alt+V` on Windows/WSL) |
| `Ctrl+R` | Search history |
| `Ctrl+L` | Redraw screen |
| `Shift+Enter` | New line without sending |
| `!` at start of prompt | Shell mode — run a command directly, output lands in context |

## Vim mode

For vim users: `/config` → Editor mode → Vim. Now the input box supports vim keybindings (`i`, `Esc`, `dd`, etc.). Ignore if you're not a vim user.

## Quiz — Lesson 18

1. You want Claude to look at lines 10 to 30 of a file called `server.js`. How do you reference it in your message?

2. Name three ways to turn on extended thinking. What is the difference between `Option+T` and the `ultrathink` keyword?

3. What are the five effort levels in order from least to most? What command do you use to change the effort level mid-session?

4. Something feels wrong — Claude can't connect to one of your MCP servers. What command do you run first to diagnose?

5. You're typing a long multi-line prompt and want to add a new line without sending. What key do you press?

## Ideal Answers — Lesson 18

1. **`@server.js#10-30`** — no space between `@` and the filename.

2. Three ways: (1) **`Option+T` / `Alt+T`** keyboard shortcut, (2) **`/config`** menu → Extended thinking, (3) include the **`ultrathink`** keyword anywhere in your message. **Difference:** `Option+T` toggles extended thinking for the whole session (stays on until you turn it off). `ultrathink` enables it for just that one message — the next message goes back to normal.

3. From least to most: **`low`, `medium`, `high`, `xhigh`, `max`**. Change mid-session: **`/effort high`** (or whatever level).

4. **`/doctor`** — runs diagnostic checks on API key, MCP connections, config issues. First stop when something's broken.

5. **`Shift+Enter`** — adds a new line without sending the message.

---

# Lesson 19: Capstone — Cumulative Final Exam

This is the final exam. 20 questions pulled from Lessons 3–18. 5 points each, 100 total. Mix of: name-the-flag, name-the-file, name-the-keystroke, scenario judgment, and conceptual.

**Pass = 85+/100** with no completely reversed concepts.

---

### The 20 Questions

**Q1 (Lesson 3):** What is the difference between `/clear` and `/compact`? What does each one do to your conversation?

**Q2 (Lesson 4):** Name the six main tools Claude Code can use. Which one can both create a brand new file AND fully overwrite an existing one?

**Q3 (Lesson 5):** Claude keeps giving you wrong answers while debugging. Name two specific reasons this happens and one thing you should do differently for each.

**Q4 (Lesson 6):** What is the difference between `git` and `gh`? Give one concrete example of something each one can do that the other cannot.

**Q5 (Lesson 7):** There are two `settings.json` files. Give the exact path of each and explain what each one controls.

**Q6 (Lesson 8):** What is the difference between a hook and a permission rule? Give one specific thing a hook can do that a permission rule cannot.

**Q7 (Lesson 9):** What command do you run to add a new MCP server to Claude Code? What problem does MCP solve in one sentence?

**Q8 (Lesson 10):** Describe the tool use loop in the correct order. What are the four steps that happen every time Claude uses a tool?

**Q9 (Lesson 11):** You're in `acceptEdits` mode with a deny rule for `Bash(git push:*)`. Claude tries to run `git push origin main`. Walk through what happens step by step.

**Q10 (Lesson 11):** Name all six permission modes. Which one auto-denies anything not pre-approved, and which one skips all checks entirely?

**Q11 (Lesson 12):** Claude just edited 8 files and the whole approach is wrong. What do you press, what do you see, and what option do you choose to undo both the files and the conversation?

**Q12 (Lesson 12):** What is the difference between `claude --continue` and `claude --resume`? Give the exact path pattern where sessions are stored.

**Q13 (Lesson 13):** Name the four CLAUDE.md levels from highest to lowest. For each, give the exact file path and who can see it.

**Q14 (Lesson 13):** What is auto memory? Where does it live (exact path pattern)? What are the two files that make it up, and what does each one do?

**Q15 (Lesson 14):** Create a skill called `deploy` where: (a) Bash commands run without permission prompts, (b) Claude can never auto-trigger it — only you can. Write the complete frontmatter section with correct YAML syntax.

**Q16 (Lesson 14):** Your skill prompt says `"Running deploy on $ARGUMENTS"`. You type `/deploy production v3.2`. What exact text does Claude receive? What do `$0` and `$1` equal?

**Q17 (Lesson 15):** What is the difference between the `Explore` agent and the `general-purpose` agent? What keyboard shortcut sends a running agent to the background?

**Q18 (Lesson 16):** What file makes a folder a plugin — give its exact path inside the plugin folder. You installed a plugin called `linter` that has a skill called `check`. What do you type to run it?

**Q19 (Lesson 17):** Write the exact command to run Claude headlessly, prompting it to "list all console.log statements", using only the `Read` tool, with output as JSON.

**Q20 (Lesson 18):** What is the difference between `Option+T` and typing `ultrathink` for extended thinking? What command do you run if Claude can't connect to an MCP server?

---

### Ideal Answers

**Q1.** **`/clear`** wipes the conversation — Claude has no memory of what was discussed (previous conversation is saved as a resumable session, but a brand new one starts). **`/compact`** summarizes the conversation into a short version so Claude still knows what you were talking about but in much less space. `/clear` forgets; `/compact` summarizes.

**Q2.** Six tools: **`Read`**, **`Edit`**, **`Write`**, **`Bash`**, **`Search`** (Grep/Glob), **`WebFetch`**. The one that both creates new files AND fully overwrites existing ones: **`Write`**.

**Q3.** Any two of these reasons + fix:
- **Hallucination** — Claude invented a function or API that doesn't exist. Fix: verify before trusting.
- **Missing context** — Claude couldn't see the related files. Fix: give more files via `@` mentions or Read.
- **Vague prompt** — you said "fix this" instead of describing the actual problem. Fix: be specific.
- **Wrong assumption** — Claude assumed a different stack. Fix: state your stack explicitly.

**Q4.** **`git`** = local version control, works with any host or no host. **`gh`** = GitHub's CLI, talks to GitHub specifically. Example: `git commit` (only git can do — it's local). `gh pr create` (only gh can do — GitHub-specific feature).

**Q5.** **`~/.claude/settings.json`** — your personal user-level settings, applies to every project on your machine, just for you. **`.claude/settings.json`** (in a project folder) — project-level, applies only to that project, typically shared with teammates via git.

**Q6.** **Permission rules** decide *whether* an action is allowed (yes/no gate). **Hooks** are commands that run *automatically in response to events* (PreToolUse, PostToolUse, etc.). A permission rule cannot run a custom command — only allow or deny. A hook can do anything: log to a file, send a Slack message, auto-format code, run tests.

**Q7.** Run **`claude mcp add`** to add an MCP server interactively. **MCP solves** the problem of connecting Claude to external tools and data sources (databases, internal APIs, services) that the built-in tools can't reach.

**Q8.** Four steps: (1) **Claude thinks** — receives prompt, reasons about what to do. (2) **Claude calls a tool** — picks which tool and what arguments. (3) **The tool runs** — actual code executes on your computer. (4) **The result goes back to Claude** — added to context; Claude reads it and continues (or finishes).

**Q9.** (1) Claude tries to run `git push origin main`. (2) Before doing anything, Claude Code checks the **rules** first. (3) Finds a **deny** rule matching `Bash(git push:*)`. (4) Stops right there — no further checks. (5) **Denied.** The deny rule beats the `acceptEdits` mode because rules always take priority over the mode.

**Q10.** Six modes: **`default`**, **`acceptEdits`**, **`plan`**, **`auto`**, **`dontAsk`**, **`bypassPermissions`**. Auto-denies anything not pre-approved: **`dontAsk`**. Skips all checks: **`bypassPermissions`**.

**Q11.** Press **`Esc` twice** with an empty prompt box (or type `/rewind`). You see a list of your recent messages — every prompt you've sent. Scroll up, pick a point before the bad edits. Options appear: Restore code and conversation, Restore code, Restore conversation, Summarize from here / up to here, Never mind. Choose **"Restore code and conversation"** to rewind both the files and the conversation.

**Q12.** **`claude --continue`** resumes the most recent session in the current folder with no questions asked. **`claude --resume`** opens a picker of all your saved sessions (or resumes directly by name/ID). Sessions are stored at **`~/.claude/projects/<your-project-name>/<session-id>.jsonl`**.

**Q13.** From highest to lowest:
- **Managed** — `CLAUDE.md` deployed by org — **everyone in the org**
- **User** — **`~/.claude/CLAUDE.md`** — **only you, all projects**
- **Project** — **`CLAUDE.md`** at project root (or `.claude/CLAUDE.md`) — **you + teammates** (committed to git)
- **Local** — **`CLAUDE.local.md`** at project root — **only you, this project** (add to `.gitignore` yourself)

**Q14.** **Auto memory** is Claude Code's automatic note-taking: after certain conversations, Claude writes notes to itself about your preferences, project context, and working style. Stored at **`~/.claude/projects/<project>/memory/`**. Two parts: **`MEMORY.md`** is the **index** — a short list of pointers Claude reads at session start to know what to look up. **Topic files** (like `user_profile.md`, `lesson_grades.md`) hold the actual content Claude reads based on what you're working on.

**Q15.**
```yaml
---
name: deploy
description: Deploys the application to production
allowed-tools: Bash
disable-model-invocation: true
---
```
(`allowed-tools: Bash` pre-approves Bash so deployment commands don't prompt; `disable-model-invocation: true` means only the human can trigger it.)

**Q16.** Claude receives: **`Running deploy on production v3.2`** — `$ARGUMENTS` is replaced with the literal text after the skill name. Positional arguments are **zero-based**: **`$0`** = `production`, **`$1`** = `v3.2`.

**Q17.** **`Explore`** is read-only — can read files and search, but cannot edit or run state-changing commands. Used for searching large codebases safely. **`general-purpose`** is the full-access default — can read, edit, run commands. Used for complete subtasks end-to-end. Background shortcut: **`Ctrl+B`**.

**Q18.** Plugin manifest: **`.claude-plugin/plugin.json`** inside the plugin folder (only `name` is required; the manifest itself is optional but good practice). To run the skill: **`/linter:check`** — no space between plugin name, colon, and skill name.

**Q19.** **`claude -p "list all console.log statements" --output-format json --allowedTools "Read"`**

**Q20.** **`Option+T`** toggles extended thinking for the **whole session** (stays on until you turn it off). **`ultrathink`** in a message enables extended thinking for **just that one message** (next message goes back to normal). For an MCP connection problem, run **`/doctor`** — it diagnoses API key, MCP connections, and config issues.

---

# Bonus Lesson 20: What's New in Claude Code (2026 Tour)

*(No quiz — this is a guided tour. Teach it as "look how far this tool goes" inspiration after the exam.)*

Claude Code stopped being "a CLI tool" and became a platform. Here's what's new beyond the core curriculum — each item is one demo in class.

## Claude Code everywhere

- **Desktop app** (Mac/Windows/Linux) — full Claude Code without a terminal. Great for students intimidated by the shell.
- **Claude Code on the web** — claude.ai/code runs sessions on cloud VMs connected to your GitHub repos. Start a task from the browser, resume it later in VS Code.
- **Remote Control** — run `claude remote-control` on your machine, then drive that session from your phone via the Claude mobile app. You can literally approve edits from the bus.

## Background agents & parallel work

One session isn't the limit anymore:

- **`claude agents`** — a dashboard of parallel background sessions. Dispatch work, monitor it, attach when needed.
- **`claude attach <id>` / `claude logs <id>`** — jump into or peek at a background session.
- **Git worktrees: `claude --worktree feature-x`** (or `-w`) — starts Claude in an isolated copy of your repo with its own branch. Run three Claudes on three features with zero file conflicts. Subagents can do the same via `isolation: worktree`.
- **Agent teams** — multiple sessions that talk to *each other*, coordinating on one task like a small dev team.

## Safety got serious

- **Sandboxing (`/sandbox`)** — Bash commands run inside an OS-level sandbox with filesystem and network isolation. Claude can work freely inside the walls; anything outside triggers a request.
- **Auto mode's classifier** (Lesson 11) — a separate model reviews risky actions in the background: no `curl | bash`, no force push, no leaking secrets into PRs.

## Quality-of-life features students love

- **`/btw <question>`** — quick side question in an overlay; doesn't pollute the conversation.
- **Session recap** — step away, come back, and Claude Code shows a one-line "here's what happened" (`/recap` on demand).
- **Prompt suggestions** — a grayed-out suggested next prompt appears in the input; `Tab` accepts it.
- **Voice dictation** — hold `Space` and talk to Claude instead of typing (enable via `/voice`).
- **`@terminal:name`** (VS Code) — reference terminal output in a prompt without copy-pasting.
- **`!` shell mode** — prefix any prompt with `!` to run a shell command yourself; output lands in context and Claude responds to it.

## The ecosystem

- **LSP plugins** — install language servers via `/plugin` (search "lsp") so Claude sees real-time type errors and diagnostics as it edits.
- **Chrome integration** — the Claude in Chrome extension lets Claude drive a real browser: click, fill forms, read console logs. In VS Code, type `@browser go to localhost:3000 and check for errors`.
- **Bundled skills** — Claude Code ships with skills like `/code-review`, `/security-review`, and `/run` out of the box. Type `/` and browse.
- **Scheduled tasks** — recurring cloud agents on a cron schedule ("every morning at 8, check my repo's open issues and summarize").

**Teaching close:** the theme of all of this — Claude Code is moving from "an assistant you watch" to "a workforce you manage." The skills in Lessons 3–18 (context, permissions, memory, verification) are exactly the management skills that transfer.

---

## End of Curriculum

By this point, students should be able to:
- Talk to Claude effectively (Lessons 3, 5)
- Use the full toolset (Lessons 4, 9)
- Manage git and GitHub through Claude (Lesson 6)
- Configure Claude Code for their workflow (Lessons 7, 11, 13)
- Build custom automation (Lessons 8, 14, 15, 16)
- Use Claude in CI/CD pipelines (Lesson 17)
- Recover from mistakes (Lesson 12)
- Use the IDE integrations effectively (Lesson 18)

The capstone (Lesson 19) verifies retention across the whole curriculum.

**Grading suggestion for instructors:** Score each capstone question 0–5. Total /100. Pass = 85+. Flag any answer where the student fully reverses concepts (e.g., swapping hooks and permissions) — that's a sign the foundational concept needs to be retaught, not just patched.

Good luck.
