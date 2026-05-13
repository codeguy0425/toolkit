---
name: commit
description: Git commit workflow - Stage, commit, and push changes for the toolkit project
---

# Git Commit Skill

## When to Use
Use this skill when you need to commit changes and push them to GitHub.

---

## Commit Message Style

Follow the existing project convention:

```
<type> <description>
```

### Types Used in This Project
| Type | Example |
|------|---------|
| Add | `Add 'GuitarWorld' app to apps.json` |
| Update | `Update apps.json` |
| Change / Rename | `Change title from 'Toolbox' to 'Toolkit'` |
| Remove | `Remove empty line at the beginning of shopping.html` |

### App-related Commits
```
Add '{app name}' app to apps.json
Add '{app name}' app to apps.json under new {category} category
```

### Structural Commits
```
Update apps.json
Create apps.json for {description}
Rename {old} to {new}
```

---

## Commit Workflow

### Step 1: Analyze Changes
Run these in parallel:
```powershell
git status
git diff
git log --oneline -5
```

### Step 2: Stage & Commit
Only stage the relevant files (not untracked files like `.opencode/`, `.vscode/`, `AGENTS.md` unless explicitly requested):
```powershell
git add <files>
git commit -m "<message>"
```

### Step 3: Push to GitHub (if requested)
```powershell
git push
```

---

## Safety Rules
- Do NOT commit files that likely contain secrets (`.env`, `credentials.json`, etc.)
- Do NOT use `--force` push unless explicitly asked
- Do NOT use `--amend` unless the user explicitly requests it
- Do NOT stage untracked infrastructure files (`.opencode/`, `.vscode/`) unless the user asks
- Only commit what the user asks — if unclear, ask first
