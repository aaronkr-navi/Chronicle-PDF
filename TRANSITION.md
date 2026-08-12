# Transition Guide 🚀

This document complements **SETUP.md** and provides a quick‑check list for anyone pulling the repository onto a new machine.

## 1️⃣ Clone the repository
```bash
# Use SSH or HTTPS – pick whichever you prefer
git clone https://github.com/aaronkr-navi/Chronicle-PDF.git
cd Chronicle-PDF
```

## 2️⃣ Prerequisites (run once)
- **Java 25** (or the version specified in `README.md`).
- **Node 24** and **npm 11**.
- **Task** (≥ 3.52.0). Install via:
  ```bash
  curl -s https://taskfile.dev/install.sh | sudo sh
  ```
- **Docker** (for CI‑related workflows). Optional for local dev.
- **Python** (≥ 3.11) **uv** package manager. Install with:
  ```bash
  pip install uv
  ```
- **Rust toolchain** (for the Tauri desktop app) – run:
  ```bash
  winget install Rustlang.Rustup
  winget install Microsoft.VisualStudio.2022.BuildTools --override "--passive --add Microsoft.VisualStudio.Workload.VCTools --includeRecommended"
  ```
  *(Make sure the VS build tools finish before proceeding.)*

> **⚠️** On Windows PowerShell, `cargo build` will always report exit code 1. Look for the word **Finished** in the output to confirm success.

## 3️⃣ Run the **setup** script
All environment‑specific steps are captured in **SETUP.md**. Execute:
```bash
# From the repository root
task install      # Installs backend, frontend, and engine deps
```
If you prefer a manual approach, follow the sections in `SETUP.md` for each language stack.

## 4️⃣ Start the development stack
```bash
# One‑liner – launches backend, frontend and AI engine concurrently
task dev
```
- Backend: `http://localhost:8080`
- Frontend (editor): `http://localhost:5173`
- AI Engine: `http://localhost:5001`

## 5️⃣ Verify the installation
- Open the frontend URL and confirm the UI loads.
- Run a simple PDF operation (e.g., split, merge) from the UI.
- Run the backend health endpoint:
  ```bash
  curl http://localhost:8080/actuator/health
  ```
  Expect a JSON response with `"status":"UP"`.

## 6️⃣ Optional – Desktop build (Tauri)
```bash
cd frontend/editor
task desktop:build   # Produces a native installer for Windows/macOS/Linux
```
See the `frontend/editor/README.md` for platform‑specific notes.

## 7️⃣ Keep the repo up‑to‑date
```bash
git pull origin main   # Or your default branch
```
Run `task check` after pulling to ensure the quality gate passes.

---
### What to commit / push
- **`SETUP.md`** – newly added documentation (already in the repo root).
- **`TRANSITION.md`** – this guide (new file you are reading now).
- Any other files you modify locally (code, configs, etc.) should follow the normal Git workflow.

> The internal **completeness_report.md** lives in the Antigravity brain folder and is **not** part of the repository; you can keep it locally for reference.

---
### Quick Git commands
```bash
# Stage and commit the docs
git add SETUP.md TRANSITION.md
git commit -m "Add SETUP.md and TRANSITION.md for easy onboarding"
git push origin main   # Adjust branch name if needed
```

That’s all you need to make the transition smooth for any new developer or CI environment.
