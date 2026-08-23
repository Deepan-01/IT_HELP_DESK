# IT Help Desk Management System

A full-stack, modern, and professional IT Help Desk Management System designed for colleges and organizations. This application allows users to easily report IT issues and enables administrators/IT support staff to track, manage, and resolve them efficiently.

## 🚀 Features

- **User Authentication:** Secure login and registration for both Users and Administrators using JWT.
- **Role-Based Access:** Dedicated dashboards and functionalities for Users and Admins.
- **Issue Tracking:** Users can raise issues (e.g., Software, Hardware, Network) and track their status in real-time.
- **Admin Management:** Admins can view all raised tickets, update their status (Open, In Progress, Resolved), and provide resolution responses.
- **Premium UI:** A sleek, responsive, Dark Mode glassmorphism design built with custom CSS.

## 💻 Tech Stack

- **Frontend:** React.js, Vite, Axios, React Router, custom CSS variables.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB, Mongoose.
- **Authentication:** JSON Web Tokens (JWT), bcryptjs for password hashing.

## 🛠️ Local Setup Instructions

### 1. Prerequisites
- Node.js installed on your machine.
- A local MongoDB instance or a MongoDB Atlas cloud URI.

### 2. Clone the Repository
```bash
git clone https://github.com/Deepan-01/IT_HELP_DESK.git
cd IT_HELP_DESK
```

### 3. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory and add the following:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```
Start the backend server:
```bash
npm run dev
```

### 4. Frontend Setup
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
The frontend will be running on `http://localhost:5173`.

## 🌐 Deployment
This project is configured to be easily deployed to modern cloud platforms:
- **Frontend:** Deployed via [Vercel](https://vercel.com).
- **Backend:** Deployed via [Render](https://render.com) (Ensure `MONGO_URI` and `JWT_SECRET` are set in the Render environment variables).
