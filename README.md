# edu-registry

## Prerequisites

- Docker and Docker Compose
- Java 21
- Node.js 20

## Quick Start with Docker

1. Clone the repository
2. Run the application:
```
docker-compose up -d
```

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080/api
   - Database: localhost:5432

## API Endpoints

- `GET /api/schools` - Get all schools with optional filters
- `POST /api/schools` - Create a new school
- `PATCH /api/schools/{id}/deactivate` - Deactivate a school
- `GET /api/schools/regions` - Get distinct regions

## Database Schema
![image](https://github.com/user-attachments/assets/47592831-b630-448f-b1a9-47960b8994ea)

The application uses a single `schools` table with the following columns:
- `id` - Primary key
- `name` - School name
- `edrpou` - Unique 8-digit identifier
- `region` - School region
- `type` - School type (GYMNASIUM, LYCEUM, GENERAL_SECONDARY)
- `is_active` - Active status
- `created_at` - Creation timestamp
- `updated_at` - Update timestamp

## Environment Variables

### Backend
- `SPRING_DATASOURCE_URL` - Database connection URL
- `SPRING_DATASOURCE_USERNAME` - Database username
- `SPRING_DATASOURCE_PASSWORD` - Database password

### Frontend
- `REACT_APP_API_URL` - Backend API URL (default: http://localhost:8080/api)
