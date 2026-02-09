# Deployment Guide (Vercel + Azure)

This guide shows how to deploy the React frontend to Vercel and the FastAPI backend to Azure App Service.

## Frontend: Vercel

### 1) Push to GitHub

- Create a GitHub repo and push this project.

### 2) Import into Vercel

- Go to Vercel and import the repo.
- Select the `frontend` folder as the root.
- Framework preset: Vite.

### 3) Set environment variable

Add the backend URL in Vercel project settings:

```
VITE_BACKEND_URL=https://<your-azure-app>.azurewebsites.net
```

### 4) Deploy

- Vercel will build and deploy automatically on every push to `main`.

---

## Backend: Azure App Service (FastAPI)

### 1) Create App Service

- Create a resource group.
- Create a Linux App Service (Python 3.10+).

### 2) Deploy from GitHub

- Connect the same repo.
- Set the app root to `backend`.

### 3) Set startup command

In the App Service configuration, set startup command:

```
uvicorn main:app --host 0.0.0.0 --port 8000
```

### 4) Check API

Your API should respond at:

```
https://<your-azure-app>.azurewebsites.net/api/hello
```

---

## Notes

- Make sure CORS is allowed. The backend already allows all origins.
- If you change versions in the code, push to `main` to redeploy.

---

## Demo: Fail Tests to Block Deploy

This repo includes a CI gate you can toggle to demonstrate a failed deployment.

1) Set the flag to fail:

```
backend/ci_flags.json
{
	"force_fail": true
}
```

2) Push to `main`.

3) The `Backend CI` workflow will fail the test job and the deploy job will not run.

To restore the pipeline, set `force_fail` back to `false` and push again.
