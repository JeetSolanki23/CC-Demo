# Hello World – Full-Stack Cloud Demo

## Purpose
This project is a simple full-stack “Hello World” application designed to demonstrate cloud deployment, frontend–backend separation, CI/CD, environment variables, and custom domain configuration. The application logic is intentionally minimal so the focus remains on deployment and cloud concepts.

---

## High-Level Architecture

Frontend (React) → Backend (Python FastAPI API)

- Frontend hosted on Vercel
- Backend hosted on Azure App Service
- CI/CD handled via GitHub Actions
- Frontend communicates with backend using environment variables

```

User Browser
↓
React Frontend (Vercel)
↓  (HTTP request using env variable)
Python Backend API (Azure)

```

---

## Functional Requirements

### Frontend (React)

#### Behavior
- Display a static frontend message
- Display a frontend version number
- Call backend API using an environment variable
- Display backend response on the UI

#### UI Example
```

Hello Students 👋

Frontend Version: v1.0

Message from Backend:
Hello from Azure 🚀
API Version: v1.0

```

#### Environment Variable (Mandatory)
The backend URL must NOT be hardcoded.

Vite:
```

VITE_BACKEND_URL=https://<azure-app-name>.azurewebsites.net

```

#### API Call
- Read backend URL from environment variable
- Call `GET /api/hello` on page load
- Handle loading and error states gracefully

---

### Backend (Python FastAPI API)

#### Behavior
- Expose a simple HTTP API endpoint
- Return JSON response with message, version, and status

#### Endpoint
```

GET /api/hello

````

#### Example Response
```json
{
  "message": "Hello from Azure 🚀",
  "version": "v1.0",
  "status": "success"
}
````

#### Scope

* No database
* No authentication
* No persistence
* No external integrations

---

## Project Structure

```
root/
│
├── frontend/
│   ├── src/
│   ├── .env.example
│   ├── package.json
│   └── README.md
│
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── README.md
│
├── .github/
│   └── workflows/
│       └── ci-cd.yml
│
└── README.md
```

---

## Environment Variables

### Frontend

`.env` (not committed to repo):

```
VITE_BACKEND_URL=https://<azure-backend-url>
```

### Backend (Optional)

```
ENV=production
```

---

## Run Locally

### Prereqs

- Node.js 18+ and npm
- Python 3.10+

### Backend (FastAPI)

From the repo root:

```
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

The API will be at:

```
http://localhost:8000/api/hello
```

### Frontend (Vite + React)

Open a new terminal at the repo root:

```
cd frontend
npm install
copy .env.example .env
```

Edit `.env` and set:

```
VITE_BACKEND_URL=http://localhost:8000
```

Then run:

```
npm run dev
```

Vite will print a local URL (usually `http://localhost:5173`).

---

## CI/CD Requirements

### Frontend

* Any push to `main` branch triggers:

  * Automatic build
  * Automatic deployment to Vercel

### Backend

* Any push to `main` branch triggers:

  * Automatic deployment to Azure App Service

---

## Versioning Requirement

Both frontend and backend must include a visible version string (e.g., `v1.0`, `v1.1`).
Changing the version and pushing to GitHub must trigger CI/CD and update the live application.

---

## Domain & DNS (Conceptual)

* Custom domain points to frontend hosting (Vercel)
* Frontend communicates with backend using environment variable
* HTTPS enabled by hosting provider

Example:

```
demo.example.com → Frontend (Vercel)
Frontend → Backend (Azure API)
```

---

## Success Criteria

* Frontend loads successfully via public URL
* Backend API responds correctly
* Frontend reads backend URL from environment variable
* CI/CD deploys changes automatically
* End-to-end flow works without manual server interaction


