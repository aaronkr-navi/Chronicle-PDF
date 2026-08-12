# Chronicle‑PDF – Quick‑Start Setup Guide

This document lives **inside the repository** (`c:/Users/Aaron/Projects/Chronicle-PDF/SETUP.md`) so that any environment (including Antigravity on a fresh machine) can instantly know how to get the application up and running.

---

## 1️⃣ Prerequisites (install once)

| Tool | Install command (Windows) | Verify version |
|------|---------------------------|----------------|
| **Git** | `winget install Git.Git` | `git --version` |
| **Java JDK 25 (Temurin)** | `winget install Microsoft.OpenJDK.25` | `java -version` |
| **Node 24 + npm** | `winget install OpenJS.NodeJS` | `node -v` & `npm -v` |
| **Python 3.13+** | `winget install Python.Python.3.13` | `python --version` |
| **uv (Python package manager)** | `pip install uv` | `uv --version` |
| **Rust + Cargo** | `winget install Rustlang.Rustup` | `cargo -V` |
| **Taskfile runner** (optional, the repo ships a wrapper) | `winget install go-task.task` | `task --version` |
| **Docker Desktop** (optional, for containerised deployment) | Download from https://www.docker.com/products/docker-desktop | `docker version` |

> **Tip:** The first time you run any `task` command the wrapper will automatically download the needed binary if it isn’t already on the PATH.

---

## 2️⃣ Clone the repository

```powershell
git clone https://github.com/aaronkr-navi/Chronicle-PDF.git
cd Chronicle-PDF
```

If you are using a private fork, replace the URL with your own.

---

## 3️⃣ Install project‑wide dependencies

```powershell
# Backend – resolves Gradle wrapper and Java deps
./gradlew clean   # forces a fresh Gradle download

# Frontend – pulls npm packages
task frontend:install   # runs `npm ci` under the hood

# Python Engine – creates a virtual env and installs Python deps
task engine:install    # uses `uv sync` to lock versions
```

Each of these commands is idempotent – you can re‑run them safely if something fails.

---

## 4️⃣ Run the application locally

| Mode | Command | What you’ll see |
|------|---------|----------------|
| **Full dev stack** (backend + frontend + AI engine) | `task dev:all` | <ul><li>Backend Spring Boot on **http://localhost:8080**</li><li>Frontend Vite on **http://localhost:5173** (proxy→backend)</li><li>FastAPI engine on **http://localhost:5001**</li></ul> |
| **Backend + Frontend only** | `task dev` | Same as above but without the Python engine |
| **Desktop (Tauri) UI** | `task desktop:dev` | Launches the native Windows executable (requires Rust) |
| **Docker (no local deps)** | `task docker:build && task docker:up` | Starts a container exposing ports 8080 & 5173 |

The first run may take a few minutes while everything compiles. Subsequent runs start instantly.

---

## 5️⃣ Verify the installation

1. Open a browser and navigate to **http://localhost:5173** – you should see the Chronicle‑PDF UI.
2. Upload a small PDF; the request is proxied to the backend at **http://localhost:8080**.
3. (If you started the engine) API calls to `/api/v1/...` are served by FastAPI on **http://localhost:5001**.

If everything loads, the setup is complete!

---

## 6️⃣ Optional: Build production artefacts

```powershell
# Backend JAR (stand‑alone)
./gradlew :app:core:bootJar

# Frontend static assets (served by Spring Boot)
task frontend:build

# Desktop executable (Tauri)
task desktop:build
```

You can now ship the JAR, the `dist/` folder, or the `.exe` to end users.

---

## 7️⃣ FAQ & Common Pitfalls

- **"java –version failed"** – Make sure you installed **JDK 25** (Temurin) and that `java` points to that version (check `where java`).
- **Node modules missing** – Run `task frontend:install` again; it uses a clean `package-lock.json`.
- **Python virtual‑env not found** – Ensure `task engine:install` completed; it creates a `.venv` folder at the repo root.
- **Ports already in use** – Stop any existing dev servers or change the ports in `frontend/editor/.env` and `app/core/src/main/resources/application-dev-local.properties`.
- **Docker build fails** – Verify Docker Desktop is running and you have enough memory (≥4 GB) allocated.

---

## 8️⃣ Keep this file up‑to‑date

Whenever you add a new language runtime, change a port, or introduce a new build step, edit **SETUP.md** so future clones (including Antigravity) stay in sync.

---

*Happy hacking!* 🎉
