# Acta

A modern full-stack application built with NestJS and React.

## Project Structure

```
acta/
├── backend/         # NestJS backend application
├── frontend/        # React frontend application
└── docker-compose.yml  # Docker configuration
```

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git
- Docker and Docker Compose

## Getting Started

### Database Setup

1. Start the PostgreSQL container:
   ```bash
   docker-compose up -d
   ```

2. Check if the container is running:
   ```bash
   docker ps
   ```

3. The database will be available at:
   - Host: localhost
   - Port: 5432
   - User: acta_user
   - Password: acta_password
   - Database: acta_db

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run start:dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Technologies Used

### Backend
- NestJS
- TypeScript
- PostgreSQL
- TypeORM

### Frontend
- React
- TypeScript
- Chakra UI
- React Query

## Docker Commands

- Start containers:
  ```bash
  docker-compose up -d
  ```

- Stop containers:
  ```bash
  docker-compose down
  ```

- View logs:
  ```bash
  docker-compose logs -f
  ```

- Reset database:
  ```bash
  docker-compose down -v
  docker-compose up -d
  ```

## Environment Variables

Copy `.env.example` to `.env` and update the values as needed:
```bash
cp .env.example .env
```

## License

MIT 