# 🖥️ Terminal Portfolio

A highly interactive, Mac-terminal styled portfolio website built with the MERN stack. It features a command-line interface (CLI) for visitors to explore projects, education, and experience, coupled with a robust Admin Dashboard for content management.

---

## 🏗️ Architecture Overview

The project follows a classic **MERN Stack** architecture, decoupling the frontend and backend for scalability and maintainability.

```mermaid
graph TD
    User((Visitor/Admin)) -->|Interacts with| ReactFrontend[React Frontend (Vite)]
    ReactFrontend -->|API Requests| ExpressBackend[Express.js Backend]
    ExpressBackend -->|Mongoose Queries| MongoDB[(MongoDB Atlas)]
    
    subgraph "Frontend Components"
        ReactFrontend --> Terminal[Terminal UI]
        ReactFrontend --> Admin[Admin Dashboard]
    end
    
    subgraph "Backend Services"
        ExpressBackend --> Auth[Simple API Auth]
        ExpressBackend --> DataModels[Mongoose Models]
    end
```

### Key Components
- **Frontend (Client)**: Built with **React** and **Tailwind CSS**. Uses **Framer Motion** for terminal-like animations and transitions.
- **Backend (Server)**: A **Node.js**/ **Express** server handling RESTful API requests.
- **Database**: **MongoDB** used for persistent storage of projects, education details, tech stack, and experience.

---

## ✨ Features

- **Terminal Interface**: A unique, interactive CLI experience for users to run commands like `ls`, `cat`, `clear`, and more.
- **Admin Dashboard**: A secure, glassmorphic dashboard to manage all portfolio data without touching the code.
- **Dynamic Content**: All data (Projects, Education, Tech Stack, Experience) is fetched from the database in real-time.
- **Responsive Design**: Optimized for both desktop and mobile viewing.
- **Micro-animations**: Smooth, terminal-style text rendering and UI transitions.

---

## 🛠️ Tech Stack

**Frontend:**
- React 19 (Vite)
- Tailwind CSS 4
- Framer Motion
- Axios (API Calls)
- React Router 7

**Backend:**
- Node.js
- Express.js
- Mongoose (MongoDB ODM)
- CORS & Dotenv

---

## 📂 Project Structure

```text
Terminal-portfolio/
├── client/              # React Frontend (Vite)
│   ├── src/
│   │   ├── components/  # Terminal & Admin UI
│   │   ├── assets/      # Static files
│   │   └── App.jsx      # Main router and logic
│   └── package.json
├── server/              # Express Backend
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API endpoints
│   ├── server.js        # Entry point
│   └── package.json
└── README.md            # Root documentation
```

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account or local MongoDB instance

### 1. Clone the repository
```bash
git clone <repository-url>
cd Terminal-portfolio
```

### 2. Backend Setup
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
ADMIN_PASSWORD=your_admin_password
```
Start the server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../client
npm install
```
Start the frontend:
```bash
npm run dev
```

---

## 🛣️ API Endpoints

The backend provides a `/api` prefix for all routes:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/projects` | Fetch all projects |
| `POST` | `/projects` | Add a new project (Admin) |
| `GET` | `/education` | Fetch education history |
| `GET` | `/experience`| Fetch work experience |
| `GET` | `/techstack` | Fetch technology stack |
| `POST` | `/login` | Admin login |
| `POST` | `/seed` | Seed database with sample data |

---

## 📜 License
This project is licensed under the ISC License.
