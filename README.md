# Modern Full-Stack Social Media Application

A production-ready, full-stack social media application built with modern technologies and best practices. This project demonstrates real-world application architecture, scalable design patterns.

## 🚀 Tech Stack

### Frontend
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Shadcn/UI** for beautiful, accessible components
- **Redux Toolkit** for state management
- **TailwindCSS** for styling

### Backend
- **Node.js** with Express
- **PostgreSQL** database
- **Prisma** as ORM
- **JWT** for authentication
- **Docker** for containerization

## ✨ Features

- 🔐 Secure Authentication & Authorization
- 👤 User Profiles with Image Upload
- 📱 Responsive Design
- 🎨 Modern UI/UX with Shadcn
- 🔄 Real-time Updates
- 🚀 Performance Optimized

## 🛠️ Prerequisites

- Node.js 18+
- PostgreSQL
- pnpm (recommended) or npm
- Docker & Docker Compose

## 📦 Installation

Install dependencies
1. cd frontend/backend
2. npm install
3. Environment Setup

## 🏗️ Project Structure

### frontend/

frontend/ ├── src/ │ ├── app/ # Next.js App Router pages │ ├── api/ # API services │ ├── assets/ # Static assets │ ├── components/ # Reusable components │ ├── constants/ # Constants │ ├── hooks/ # Custom hooks │ ├── schemas/ # Zod schemas │ ├── types/ # TypeScript types │ ├── utils/ # Utility functions │ └── redux/ # Redux store and slices └── public/ # Static assets

## .ENV FRONTEND

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_UPLOAD_URL=http://localhost:3000/uploads
DATABASE_URL="postgresql://username:password@localhost:5432/dbname"
```

### backend/

backend/ ├── src/ │ ├── controllers/ # Route controllers │ ├── services/ # Business logic │ ├── models/ # Database models │ ├── routes/ # API routes │ ├── middleware/ # Custom middleware │ ├── utils/ # Utility functions │ └── prisma/ # Database schema and migrations └── uploads/ # Uploaded files

## .ENV BACKEND

```env
DATABASE_URL="postgresql://XX:XX@localhost:XX/postgres?schema=mm16-webboard"
JWT_SECRET=XX
JWT_REFRESH_SECRET=XX

APP_PORT=XX
DB_USER=XX
DB_PASSWORD=XX
DB_NAME=XX
DB_PORT=XX
```

- MM16z
