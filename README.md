# 🏢 Visitor Pass Management System (MERN)

---

## 🚀 Live Features

### 🔐 Authentication & Authorization

* JWT based login
* Role Based Access Control (RBAC)
* Roles:

  * **ADMIN**
  * **SECURITY**
  * **EMPLOYEE**

---

### 👥 Visitor Management

* Create visitor requests
* Approve / Reject visitors
* Check-In / Check-Out flow
* Status tracking:

  * `PENDING`
  * `APPROVED`
  * `REJECTED`
  * `CHECKED_IN`
  * `CHECKED_OUT`

---

### 📊 Dashboard (Admin / Security)

* Total visitors
* Pending approvals
* Checked-in visitors
* Checked-out visitors

---

### 🔍 Search & Pagination

* Search visitors by:

  * Name
  * Phone
  * Email
  * Purpose
* Filter by status
* Pagination (page & limit support)

---

### 🕵️ Audit Logs (Admin)

* Track critical actions:

  * Approvals
  * Check-ins
  * Check-outs
* Helps in security & compliance

---

## 🧑‍💼 Role Permissions

| Role     | Permissions                               |
| -------- | ----------------------------------------- |
| ADMIN    | View dashboard, approve/reject, view logs |
| SECURITY | Approve/reject, check-in, check-out       |
| EMPLOYEE | Create visitor request                    |

---

## 🛠 Tech Stack

### Frontend

* React (Vite)
* Redux Toolkit
* React Router DOM
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* Role-based Middleware

---

## 📁 Project Structure

```
visitor-pass-management-system/
│
├── client/                # React Frontend
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── layoyts/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── utils/
│
├── server/                # Node Backend
│   ├── src/
│   │   └── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   |── utils/  
│   │   └── index.js 
│
│── .env 
└── README.md
```

---

## ⚙️ Environment Variables

### Backend `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
```

### Frontend `.env`

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## ▶️ Run Project Locally

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/visitor-pass-management-system.git
cd visitor-pass-management-system
```

---

### 2️⃣ Backend Setup

```bash
cd server
npm install
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## 🔐 API Routes (Sample)

```
POST   /api/auth/login
GET    /api/auth/profile

POST   /api/visitors
GET    /api/visitors
PATCH  /api/visitors/:id/status
PATCH  /api/visitors/:id/check-in
PATCH  /api/visitors/:id/check-out

POST   /api/visitors/search
POST   /api/visitors/reports/status
POST   /api/visitors/reports/date
```

---

## 🧪 Testing

* Tested via Postman
* Protected routes verified with roles
* Redux DevTools used for state validation


## 👨‍💻 Author

**Rishiprasad Raut**
MERN Stack Developer
📧 [](mailto:admin@test.com)

---

## ⭐ If you like this project

Give it a ⭐ on GitHub — it helps a lot!

---



## 🔐 Sample Users (for Testing)

### ADMIN

```json
{
  "name": "Admin User",
  "email": "admin@test.com",
  "password": "123456",
  "role": "ADMIN"
}
```

### SECURITY

```json
{
  "name": "Security Guard",
  "email": "security@test.com",
  "password": "123456",
  "role": "SECURITY"
}
```

### EMPLOYEE

```json
{
  "name": "Employee User",
  "email": "employee@test.com",
  "password": "123456",
  "role": "EMPLOYEE"
}
```

---

## 🧪 Sample Visitor Data

```json
{
  "name": "Amit Kumar",
  "phone": "9123456789",
  "email": "amit.kumar@gmail.com",
  "purpose": "Technical Interview"
}
```

---

## 🔑 API Flow (Important)

1. Login → Get JWT Token
2. Create Visitor (EMPLOYEE / SECURITY)
3. Approve / Reject (ADMIN)
4. Check-in (SECURITY)
5. Check-out (SECURITY)
6. View History & Audit Logs

---

## 🎯 Learning Outcomes

* Real-world backend architecture
* JWT authentication & RBAC
* Middleware-based security
* Audit logging & history tracking
* MongoDB schema design
* Search, filter & pagination
* Debugging production issues

---
