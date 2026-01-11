# 🏢 Visitor Pass Management System

A full-stack **MERN** application for managing visitor access in organizations. Features role-based access control, real-time status tracking, audit logging, and comprehensive reporting.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Environment Variables](#️-environment-variables)
- [API Documentation](#-api-documentation)
- [Role Permissions](#-role-permissions)
- [Screenshots](#-screenshots)
- [Sample Data](#-sample-data)
- [Contributing](#-contributing)
- [Author](#-author)

---

## ✨ Features

### 🔐 Authentication & Authorization
- JWT-based secure authentication
- Role-Based Access Control (RBAC)
- Protected routes with middleware validation
- User registration and profile management

### 👥 Visitor Management
| Feature | Description |
|---------|-------------|
| Create Visitor | Employees/Security can register visitors |
| Approve/Reject | Admins can approve or reject visitor requests |
| Check-In | Security marks visitor arrival |
| Check-Out | Security marks visitor departure |
| Status Tracking | Real-time status updates |

### 📊 Dashboard Analytics
- Total visitors count
- Pending approvals
- Today's visitors
- Status-wise breakdown (Approved, Rejected, Checked-in, Checked-out)

### 🔍 Advanced Search & Filtering
- Search by name, phone, email, or purpose
- Filter by status
- Paginated results
- Real-time search updates

### 📈 Reports & History
- **Status Reports**: Filter visitors by status
- **Date Reports**: Get visitors within date range
- **Visitor History**: Complete timeline of status changes per visitor

### 🕵️ Audit Logs
- Track all critical actions
- User attribution for each action
- Timestamp and status transitions
- Compliance-ready logging

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| Vite | Build Tool |
| Redux Toolkit | State Management |
| React Router v6 | Navigation |
| Axios | HTTP Client |
| Tailwind CSS | Styling |
| Lucide React | Icons |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime |
| Express.js | Web Framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| bcryptjs | Password Hashing |
| Helmet | Security Headers |
| CORS | Cross-Origin Support |

---

## 📁 Project Structure

```
visitor-pass-management-system/
│
├── client/                     # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── api/                # API service functions
│   │   │   ├── authApi.js
│   │   │   ├── visitorApi.js
│   │   │   ├── dashboardApi.js
│   │   │   ├── auditApi.js
│   │   │   └── searchApi.js
│   │   ├── components/         # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── AuthLoader.jsx
│   │   ├── layouts/
│   │   │   └── MainLayout.jsx
│   │   ├── pages/              # Page components
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Visitors.jsx
│   │   │   ├── CreateVisitor.jsx
│   │   │   ├── AuditLogs.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Reports.jsx
│   │   │   └── VisitorHistory.jsx
│   │   ├── redux/
│   │   │   ├── store.js
│   │   │   └── slices/
│   │   │       ├── authSlice.js
│   │   │       ├── dashboardSlice.js
│   │   │       └── visitorSlice.js
│   │   ├── utils/
│   │   │   └── axiosInstance.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Node.js Backend
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── auth/
│   │   │   │   └── controller.js
│   │   │   └── visitor/
│   │   │       └── controller.js
│   │   ├── middlewares/
│   │   │   ├── errorHandler.js
│   │   │   ├── validate.js
│   │   │   └── auth/
│   │   │       ├── middleware.js
│   │   │       └── role.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Visitor.js
│   │   │   └── AuditLog.js
│   │   ├── routes/
│   │   │   ├── auth/
│   │   │   │   └── routes.js
│   │   │   └── visitor/
│   │   │       └── routes.js
│   │   ├── utils/
│   │   │   └── auditLogger.js
│   │   └── index.js
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## 🚀 Installation

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- npm or yarn

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/visitor-pass-management-system.git
cd visitor-pass-management-system
```

### 2️⃣ Backend Setup

```bash
cd server
npm install
```

Create `.env` file in `/server`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/visitor-management
JWT_SECRET=your_super_secret_key_here
```

Start the server:

```bash
npm run dev
```

### 3️⃣ Frontend Setup

```bash
cd client
npm install
```

Create `.env` file in `/client`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Start the client:

```bash
npm run dev
```

### 4️⃣ Access Application

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

---

## ⚙️ Environment Variables

### Backend (`/server/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/visitor-db` |
| `JWT_SECRET` | JWT signing secret | `your_secret_key` |

### Frontend (`/client/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API URL | `http://localhost:5000/api` |

---

## 📚 API Documentation

### Authentication Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `POST` | `/api/auth/register` | Register new user | Public |
| `POST` | `/api/auth/login` | User login | Public |
| `GET` | `/api/auth/profile` | Get user profile | Protected |
| `GET` | `/api/auth/admin` | Admin access check | Admin only |
| `GET` | `/api/auth/admin-security` | Admin/Security check | Admin, Security |

### Visitor Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `POST` | `/api/visitors` | Create visitor | Employee, Security |
| `GET` | `/api/visitors` | Get all visitors | Admin, Security |
| `PATCH` | `/api/visitors/:id/status` | Approve/Reject | Admin, Security |
| `PATCH` | `/api/visitors/:id/check-in` | Check-in visitor | Security |
| `PATCH` | `/api/visitors/:id/check-out` | Check-out visitor | Security |
| `GET` | `/api/visitors/:id/history` | Get visitor history | Admin, Security |

### Dashboard & Reports

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `GET` | `/api/visitors/dashboard` | Dashboard stats | Admin, Security |
| `POST` | `/api/visitors/search` | Search visitors | Admin, Security |
| `POST` | `/api/visitors/reports/status` | Report by status | Admin, Security |
| `POST` | `/api/visitors/reports/date` | Report by date range | Admin, Security |
| `GET` | `/api/visitors/audit/logs` | Audit logs | Admin |

---

## 🧑‍💼 Role Permissions

| Feature | ADMIN | SECURITY | EMPLOYEE |
|---------|:-----:|:--------:|:--------:|
| View Dashboard | ✅ | ✅ | ❌ |
| Create Visitor | ❌ | ✅ | ✅ |
| Approve/Reject | ✅ | ✅ | ❌ |
| Check-in | ❌ | ✅ | ❌ |
| Check-out | ❌ | ✅ | ❌ |
| View Audit Logs | ✅ | ❌ | ❌ |
| Generate Reports | ✅ | ✅ | ❌ |
| View Visitor History | ✅ | ✅ | ❌ |
| View Profile | ✅ | ✅ | ✅ |

---

## 📸 Screenshots

### Dashboard
> Real-time analytics with status cards showing total visitors, pending approvals, and today's check-ins

### Visitor Management
> Search, filter, and manage visitors with one-click actions

### Audit Logs
> Timeline view of all security actions with user attribution

### Reports
> Generate reports filtered by status or custom date ranges

### Visitor History
> Complete timeline showing all status changes for a specific visitor

---

## 🧪 Sample Data

### Test Users

#### ADMIN
```json
{
  "name": "Admin User",
  "email": "admin@test.com",
  "password": "123456",
  "role": "ADMIN"
}
```

#### SECURITY
```json
{
  "name": "Security Guard",
  "email": "security@test.com",
  "password": "123456",
  "role": "SECURITY"
}
```

#### EMPLOYEE
```json
{
  "name": "Employee User",
  "email": "employee@test.com",
  "password": "123456",
  "role": "EMPLOYEE"
}
```

### Sample Visitor
```json
{
  "name": "Amit Kumar",
  "phone": "9123456789",
  "email": "amit.kumar@gmail.com",
  "purpose": "Technical Interview"
}
```

---

## 🔄 Visitor Flow

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   PENDING   │───▶│  APPROVED   │───▶│ CHECKED_IN  │───▶│ CHECKED_OUT │
│  (Created)  │    │  (Admin)    │    │ (Security)  │    │ (Security)  │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │
       │           ┌─────────────┐
       └──────────▶│  REJECTED   │
                   │  (Admin)    │
                   └─────────────┘
```

---

## 🎯 Learning Outcomes

- ✅ Real-world backend architecture patterns
- ✅ JWT authentication & RBAC implementation
- ✅ Middleware-based security patterns
- ✅ Audit logging & compliance tracking
- ✅ MongoDB schema design with relationships
- ✅ Redux state management with async thunks
- ✅ Search, filter & pagination patterns
- ✅ Error handling best practices
- ✅ RESTful API design principles

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👨‍💻 Author

**Rishiprasad Raut**  
MERN Stack Developer

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/your-username)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/your-profile)

---

## ⭐ Support

If you found this project helpful, please give it a ⭐ on GitHub!

---

## 📄 License

This project is licensed under the MIT License.

---

<p align="center">Made with ❤️ using MERN Stack</p>
