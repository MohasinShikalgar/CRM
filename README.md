# CRM Application Monorepo

This repository contains both the frontend (React) and backend (Spring Boot) code for the CRM application.

## 📁 Project Structure

```text
CRM/
├── frontend/   # React project (Vite)
├── backend/    # Spring Boot project (Maven)
└── README.md   # This file
```

## 🚀 Environment Variables

### Backend (`backend/src/main/resources/application.properties` or `.env`)
Ensure that your database configurations, mail server settings, and JWT configurations are secured and excluded from source control where appropriate. 

### Frontend (`frontend/.env`)
Any environment-specific configurations (like the backend base URL) should be placed here, e.g., `VITE_API_BASE_URL`. Do not commit sensitive secrets to the frontend environment variables.

## 🔧 Deployment Configs

**Backend (e.g., Render, Railway):**
- **Root Directory:** `backend`
- **Build command:** `./mvnw clean package -DskipTests`
- **Start command:** `java -jar target/*.jar`

**Frontend (e.g., Vercel, Netlify):**
- **Root Directory:** `frontend`
- **Build command:** `npm run build`
- **Output / Publish Directory:** `dist`
