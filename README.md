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

3. To fully purge from history (optional, rewrites history), use `git-filter-repo` or BFG. Coordinate with collaborators before force-pushing.

## 📝 Contributing

- Please open issues or PRs for improvements. Keep secrets out of PRs.

## 📄 License

MIT

---

If you want, I can commit and push this `README.md` for you, or also purge `.env` from history now.