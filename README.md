# FixKo

FixKo is a modern service marketplace platform that connects skilled workers (such as plumbers, electricians, cleaners, and construction workers) with customers who need their services.

It is designed as a scalable, production-ready full-stack system built using a modular monorepo architecture.


## Overview

FixKo solves the gap between service providers and customers by enabling:

- Workers to offer services and manage bookings
- Customers to find and book trusted professionals
- A structured booking lifecycle (request → accept → complete)
- Ratings and reviews to build trust in the platform

The system is built with a focus on scalability, maintainability, and clean architecture principles.


## Platform Users

### Customers
- Search for services (plumbing, cleaning, etc.)
- Book available workers
- Track booking status
- Leave reviews and ratings

### Workers
- Create service profiles
- Receive booking requests
- Accept or reject jobs
- Manage availability and services offered

### Admin
- Moderate platform activity
- Monitor system analytics


## Key Features

- Authentication system (JWT-ready)
- Role-based access control (Customer / Worker / Admin)
- Worker service listing and profiles
- Booking and scheduling system
- Rating and review system
- (Future) Real-time chat between users
- (Future) Location-based worker discovery
- Fully containerized development environment
- Modular monolithic backend architecture
- Fast API communication between frontend and backend

## Tech Stack
Web:
- Next.js
- TypeScript
- Tailwind CSS

API:
- NestJS
- TypeScript

Database:
- PostgreSQL (via Docker)
- Supabase

DevOps / Infrastructure:
- Docker
- Docker Compose


## Project Structure

```bash
fixko/
├── apps/
│   ├── web/            # Web (Next.js)
│   └── api/            # API (NestJS)
│
├── docker/
│   └── web.Dockerfile  # Dockerfile for web
│   └── api.Dockerfile   # Dockerfile for api
│
├── docker-compose.dev.yml
└── README.md
```

## Running the Project (Development)

Prerequisites

- Node.js >= 18
- pnpm
- Docker

Install dependencies

```bash
pnpm install
```

Run using Docker (Recommended)

```bash
docker compose -f docker-compose.dev.yml up --build -d
```

Run manually (without Docker)

Web:

```bash
cd apps/web
pnpm dev
```

API:

```bash
cd apps/api
pnpm start:dev
```

Services

| Service     | URL                  |
|-------------|----------------------|
| Web         | http://localhost:3000|
| API         | http://localhost:3001|
| Database    | localhost:5432       |