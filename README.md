# Visitor Pass Management System

**Visitor Pass Management System** is a simple Express + MongoDB application for managing visitor passes, users, and authentication.

## 🔧 Features

- User registration & login (JWT)
- Role-based users (ADMIN, SECURITY, EMPLOYEE)
- MongoDB (Mongoose) backend

## ⚙️ Prerequisites

- Node.js (>=16)
- MongoDB running locally or accessible via connection string

## 🚀 Quickstart

1. Install dependencies:

```bash
cd server
npm install
```

2. Create a `.env` file from the example and set values:

```bash
cp .env.example .env
# Or create .env and add:
# PORT=5000
# MONGO_URI=mongodb://127.0.0.1:27017/visitor_pass_db
# JWT_SECRET=your_jwt_secret_here
```

3. Run in development:

```bash
cd server
npm run dev
```

The app listens on `PORT` (default from `.env` or 3000).

## 🗄️ Environment Variables

- `PORT` — Port for the server
- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — Secret used to sign JWTs

<<<<<<< HEAD
=======
> **Important:** Do NOT commit `.env` to git. This repository includes `server/.env.example` and `.gitignore` to prevent `.env` from being committed.

## 🔒 Security & Secrets

If a secret was committed by mistake:

1. **Rotate** the compromised secrets immediately (JWT secret, DB passwords, API keys).
2. Remove the file from the repository index (already done):

```bash
git rm --cached server/.env
git commit -m "Remove server/.env"
git push origin main
```



{
  "name": "Rishiprasad Raut",
  "email": "admin@test.com",
  "password": "123456",
  "role": "ADMIN"
}

{
  "name": "Security Guard",
  "email": "security@test.com",
  "password": "123456",
  "role": "SECURITY"
}

{
  "name": "om",
  "email": "om@12.com",
  "password": "123456",
  "role": "EMPLOYEE"
}

Visitor Details
---DONE---
{
  "name": "Rahul Sharma",
  "phone": "9876543210",
  "email": "rahul@gmail.com",
  "purpose": "Interview"
}

{
  "name": "Amit Kumar",
  "phone": "9123456789",
  "email": "amit.kumar@gmail.com",
  "purpose": "Technical Interview"
}
>>>>>>> 574c9ac (Initial commit: Visitor Pass Management System backend)
