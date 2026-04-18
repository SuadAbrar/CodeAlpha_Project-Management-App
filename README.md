# 📊 MERN Project Management App

<p align="center">

<img src="https://img.shields.io/badge/Stack-MERN-3C873A?style=for-the-badge" />
<img src="https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge" />
<img src="https://img.shields.io/badge/Backend-Express.js-000000?style=for-the-badge" />
<img src="https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge" />
<img src="https://img.shields.io/badge/Runtime-Node.js-339933?style=for-the-badge" />
<img src="https://img.shields.io/badge/UI-TailwindCSS-38BDF8?style=for-the-badge" />
<img src="https://img.shields.io/badge/Responsive-Design-FF6F61?style=for-the-badge" />
<img src="https://img.shields.io/badge/UI-Modern%20Interface-8A2BE2?style=for-the-badge" />
<img src="https://img.shields.io/badge/Auth-JWT-FFB400?style=for-the-badge" />
<img src="https://img.shields.io/badge/Password-BCrypt-0A66C2?style=for-the-badge" />
<img src="https://img.shields.io/badge/Realtime-Socket.IO-black?style=for-the-badge" />
<img src="https://img.shields.io/badge/API%20Testing-Postman-F76935?style=for-the-badge" />
<img src="https://img.shields.io/badge/Editor-VSCode-007ACC?style=for-the-badge" />
<img src="https://img.shields.io/badge/Version%20Control-Git-F1502F?style=for-the-badge" />

</p>

A modern **full-stack collaborative project management application** inspired by tools like Trello and Asana, built using the **MERN Stack (MongoDB, Express.js, React, Node.js)** with **TailwindCSS** for a clean, responsive, and interactive user experience.

The platform enables teams to **create projects, organize tasks using Kanban boards, assign responsibilities, communicate through task-level discussions, and collaborate in real time**.

This project demonstrates **professional full-stack architecture**, **scalable system design**, **real-time communication**, and **modern UI/UX principles**.

---

# 📑 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [System Architecture](#-system-architecture)
- [Project Structure](#-project-structure)
- [Database Design](#-database-design)
- [API Endpoints](#-api-endpoints)
- [Getting Started](#-getting-started)
- [Future Enhancements](#-future-enhancements)

---

# 📌 Overview

This application is a **collaborative task management system** that allows teams to organize and track their work using a **Kanban-style workflow**.

**Users can:**
- Create and manage projects
- Organize tasks into structured boards
- Assign tasks to team members
- Communicate through comments
- Receive updates in real time

The system follows a **clean client-server architecture**, ensuring separation of concerns between frontend, backend, and database layers.

---

# 🧩 Key Features

## 👤 Authentication System
- Secure user registration and login
- Password hashing using bcrypt
- JWT-based authentication
- Protected routes and secure access control

## 📁 Project Management
- Create and manage multiple projects
- Add and manage team members
- Organized project dashboards

## 📋 Kanban Board System
- Dynamic task boards with columns:
  - To Do
  - In Progress
  - Done
- Create, update, and delete tasks
- Drag-and-drop task movement between columns

## 👥 Task Assignment & Management
- Assign tasks to specific users
- Set task priorities and due dates
- Track task progress visually

## 💬 Collaboration
- Task-level comments and discussions
- Real-time updates for collaborative workflows
- Activity tracking for team actions

## ⚡ Real-Time Features
- Live task updates across users
- Real-time comments
- Online/offline user presence
- Built using Socket.IO

## 🔔 Notifications System
- In-app notifications
- Task assignment alerts
- Comment notifications

## 🎨 UI/UX Design
- Clean and modern interface
- Smooth drag-and-drop interactions
- Responsive design for all devices
- Animated transitions and loading states

---

# 🧰 Technology Stack

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

## Frontend
- React.js
- TailwindCSS
- React Router
- Context API / Redux

## Realtime
- Socket.IO

---

## 🏗 System Architecture

```text
React Frontend
      │
      │ HTTP Requests / WebSockets
      ▼
Express.js REST API
      │
      │ Database Queries
      ▼
MongoDB Database
```

---

## 🗂 Project Structure

### Backend
```text
backend/
├─ controllers/
├─ models/
├─ routes/
├─ middleware/
├─ sockets/
├─ config/
└─ server.js
```

### Frontend
```text
frontend/
├─ components/
├─ pages/
├─ features/
├─ services/
├─ hooks/
├─ socket/
├─ utils/
└─ App.jsx
```

---

## 🗃 Database Design

### User
```text
_id
name
email
password
avatar
```

### Project
```text
_id
title
description
owner
members[]
createdAt
```

### Task
```text
_id
title
description
status
assignedTo
projectId
dueDate
priority
comments[]
```

### Comment
```text
_id
userId
taskId
text
createdAt
```

### Notification
```text
_id
userId
type
message
read
createdAt
```

---

## 🔗 API Endpoints

### Auth
```http
POST /api/auth/register
POST /api/auth/login
```

### Projects
```http
POST /api/projects
GET /api/projects
PUT /api/projects/:id
DELETE /api/projects/:id
```

### Tasks
```http
POST /api/tasks
PUT /api/tasks/:id
GET /api/tasks/project/:projectId
DELETE /api/tasks/:id
```

### Comments
```http
POST /api/comments
GET /api/comments/task/:taskId
```
---

## 🚀 Getting Started

### Clone the Repository
```bash
git clone https://github.com/SuadAbrar/CodeAlpha_Project-Management-App.git
cd CodeAlpha_Project-Management-App
```

---

### Install & Run Backend
```bash
cd backend
npm install
npm run dev
```
Backend runs at: http://localhost:5000

---

### Install & Run Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at: http://localhost:5173

---

### Configure Environment Variables

Create a `.env` file in the **backend** folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## 🚀 Future Enhancements

- Role-based access control  
- File attachments for tasks  
- Advanced filtering and search  
- Performance optimizations  
- Mobile-first enhancements  
- Dark mode support  
- Export/Import project data  
- Calendar view for tasks  
- Time tracking feature  

---

## 📜 License

This project is developed for educational and internship purposes and demonstrates advanced full-stack MERN development with real-time collaborative system design.
