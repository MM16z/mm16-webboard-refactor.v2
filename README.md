# Modern Full-Stack Social Media Application

A production-ready social platform with modern architecture and best practices.

![Tech Stack](https://img.shields.io/badge/Next.js-14.2.3-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-blue?logo=react)
![Prisma](https://img.shields.io/badge/Prisma-5.18.0-2D3748?logo=prisma)

## 🚀 Enhanced Tech Stack

### Frontend
- **Core**: Next.js 14 (App Router), React 19, TypeScript
- **State**: Redux Toolkit, React Query 5, Zustand (future)
- **UI**: Shadcn/UI, Framer Motion 11, React Masonry
- **Styling**: TailwindCSS 3.4, CSS Modules, Gradient Animations
- **Utils**: Day.js, Lodash, React Paginate
- **Auth**: JWT Cookies, Next-Auth (future)

### Backend
- **Runtime**: Node.js 18, Express 4.19
- **ORM**: Prisma 5.18 with PostgreSQL
- **Auth**: BcryptJS, JWT with refresh tokens
- **File Handling**: Multer 1.4, FS module
- **DevOps**: PM2, Docker, NGINX

### DevOps
- **Containerization**: Docker + Docker Compose
- **Orchestration**: PM2 Cluster Mode
- **Infra**: AWS EC2, S3 (future)
- **Monitoring**: PM2 Logs, Custom Metrics
- **CI/CD**: GitHub Actions / CD -> (TODO)

## ✨ Key Features
- **Real-time UI**  
  Split panels with resizable gutters, masonry layouts, draggable components
- **Auth System**  
  JWT cookie auth with refresh rotation, protected routes
- **Rich Interactions**  
  Heart animations, gradient text effects, smooth transitions
- **Dashboard**  
  System monitoring with live metrics, post management
- **Optimizations**  
  Dynamic imports, React.memo, CSS containment
- **Error Handling**  
  Unified error boundaries, Sonner toasts

## 🛠️ Development Setup

```bash
# Frontend
cd frontend
npm install
cp .env.example .env.local

# Backend
cd ../backend
npm install
cp .env.example .env

# Start both
npm run dev
```

## 🌐 Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_URL=http://localhost:xxxx
NEXT_PUBLIC_API_URL=http://localhost:xxxx/api
```

### Backend (.env)
```env
DATABASE_URL="postgresql://user:pass@localhost:5432/mm16-webboard"
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
UPLOAD_DIR=./uploads
```

## 🏗️ Project Structure

### Frontend Architecture
```
frontend/
├── src/
│   ├── app/               # App router pages
│   ├── components/        # Reusable components
│   │   ├── (appPages)     # Feature sections
│   │   ├── masonry/       # Layout components
│   │   └── ui/           # Shadcn components
│   ├── redux/            # Store configuration
│   ├── styles/           # CSS modules
│   │   ├── homepage/     # Page-specific styles
│   │   └── components/   # Component styles
│   ├── types/            # TypeScript definitions
│   └── services/         # API clients
```

### Backend Services
```
backend/
├── src/
│   ├── controllers/      # Route handlers
│   ├── middleware/       # Auth, uploads, error
│   ├── prisma/           # Schema + migrations
│   ├── routes/           # Express endpoints
│   ├── services/         # Business logic layer
│   └── utils/            # Helpers + configs
├── uploads/              # User-generated content
└── Dockerfile            # Production build

## 📜 License
MIT License - See [LICENSE](LICENSE) for details.

---
