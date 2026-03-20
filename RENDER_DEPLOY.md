# Deployment Instructions for Render

You have a multi-container application (Frontend + Backend). Render is the easiest platform to deploy this quickly.

## Prerequisites
1.  **Push to GitHub**: Ensure this entire folder is pushed to a GitHub repository.

## 1. Deploy Backend (Docker)
1.  Go to [Render Dashboard](https://dashboard.render.com/).
2.  Click **New +** -> **Web Service**.
3.  Connect your GitHub repository.
4.  **Name**: `portfolio-api`
5.  **Root Directory**: `.` (leave generic or specify `backend/Portfolio.API` if using a specific build context, but since Dockerfile is inside `backend/Portfolio.API`, set Root Directory to `backend/Portfolio.API` and select Docker runtime).
    *   *Alternative*: Point to the Dockerfile path: `./backend/Portfolio.API/Dockerfile`.
6.  **Runtime**: **Docker**.
7.  **Environment Variables**:
    *   `Gemini__ApiKey`: Your Google Gemini API Key (or use `mock` to rely on the simulation mode I built).
    *   `ConnectionStrings__DefaultConnection`: Use the **Internal Connection String** from a Render PostgreSQL database (create one if needed via **New +** -> **PostgreSQL**).
8.  **Deploy**.
9.  **Copy the Service URL**: It will look like `https://portfolio-api.onrender.com`.

## 2. Update Frontend Configuration
1.  Open `frontend/src/environments/environment.prod.ts`.
2.  Replace:
    ```typescript
    apiUrl: 'https://portfolio-api.onrender.com/api' 
    ```
    with your **actual Backend Service URL** + `/api`.
3.  Commit and push this change to GitHub.

## 3. Deploy Frontend (Static Site or Node)
1.  Click **New +** -> **Static Site** (Cheaper/Free) or **Web Service** (if using Docker).
    *   **Recommended**: Static Site.
2.  Connect your GitHub repository.
3.  **Root Directory**: `frontend`
4.  **Build Command**: `npm install && npm run build` (This builds using `environment.prod.ts`).
5.  **Publish Directory**: `dist/gpt-5-portfolio-frontend`
6.  **Deploy**.

## Troubleshooting
- **AI Services degraded**: Check your `Gemini__ApiKey` in Render Environment Variables. If invalid, the app will use the "Simulation Mode" I added.
- **Data missing**: Ensure your Database is connected. If database fails, the app will use "Offline Mode" (mock data).
