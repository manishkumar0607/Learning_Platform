# LearnOS 📚

> A free, open-source learning resource hub — curated links with descriptions, zero paywalls.

![Stack](https://img.shields.io/badge/Stack-MERN-00e5a0?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-5b8fff?style=flat-square)
![Status](https://img.shields.io/badge/Status-Live-00e5a0?style=flat-square)

---

## 🌐 Live Demo

| Service | URL |
|---------|-----|
| Frontend | https://learnos.vercel.app |
| Backend API | https://learnos-api.onrender.com |

---

## 📖 About

LearnOS is a full-stack MERN web application where anyone can discover free and open-source learning resources across programming, design, databases, DevOps, AI/ML, and more.

- 🔍 Search resources instantly
- 🗂️ Filter by category
- 👤 Create an account and log in
- 🔐 Secure JWT authentication
- 📦 MongoDB database backend

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML, CSS, Vanilla JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcrypt |
| Frontend Host | Vercel |
| Backend Host | Render |
| DB Host | MongoDB Atlas |

---

## 📁 Project Structure

```
learnos/
├── backend/
│   ├── middleware/
│   │   └── auth.js          # JWT verification
│   ├── models/
│   │   ├── User.js          # User schema
│   │   └── Resource.js      # Resource schema
│   ├── routes/
│   │   ├── auth.js          # Register / Login
│   │   └── resources.js     # CRUD for resources
│   ├── seed.js              # Populate DB with starter data
│   ├── server.js            # Express entry point
│   └── package.json
│
└── frontend/
    ├── index.html           # Home — browse resources
    ├── register.html        # Register page
    ├── login.html           # Login page
    ├── css/
    │   └── style.css
    └── js/
        ├── auth.js          # Auth helpers
        └── resources.js     # Fetch, search, filter
```

---

## 🚀 Run Locally

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)

### 1 — Clone the repo
```bash
git clone https://github.com/manishkumar0607/learnos.git
cd learnos
```

### 2 — Setup backend
```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:
```
MONGO_URI=mongodb://localhost:27017/learnos
JWT_SECRET=your_secret_key_here
PORT=5000
```

### 3 — Seed the database
```bash
node seed.js
```

### 4 — Start the server
```bash
node server.js
```

Server runs at `http://localhost:5000`

### 5 — Open frontend
Open `frontend/index.html` with **Live Server** in VS Code.

---

## 🌐 API Endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | `/api/resources` | ❌ | Get all resources |
| GET | `/api/resources/:id` | ❌ | Get one resource |
| POST | `/api/resources` | ✅ | Add a resource |
| DELETE | `/api/resources/:id` | ✅ | Delete a resource |
| POST | `/api/auth/register` | ❌ | Create account |
| POST | `/api/auth/login` | ❌ | Login, get JWT |

---

## ☁️ Deployment

| Service | Purpose | Free Tier |
|---------|---------|-----------|
| MongoDB Atlas | Cloud database | 512MB |
| Render | Node.js API hosting | ✅ |
| Vercel | Frontend hosting | ✅ |

---

## 📸 Features

- ✅ Browse 10+ curated free learning resources
- ✅ Search in real time
- ✅ Filter by category (Programming, Design, DevOps, AI/ML...)
- ✅ User registration and login
- ✅ JWT token based authentication
- ✅ Passwords hashed with bcrypt
- ✅ Fully responsive design
- ✅ Dark theme UI

---

## 👨‍💻 Author

**Manish Kumar**
- GitHub: [@manishkumar0607](https://github.com/manishkumar0607)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).