# Build TaskFlow – Distributed Job Queue & Task Scheduling System

## Project Objective
Build a medium-sized, placement-oriented backend project that demonstrates practical backend engineering skills, asynchronous job processing, queue distribution, concurrent workers and failure handling.

The project must be fully functional, cleanly structured, easy to understand and suitable for GitHub and resume presentation.

## 1. Technology Stack

Use ONLY the following technologies:

- Runtime: Node.js
- Backend: Express.js
- Database: MongoDB
- ODM: Mongoose
- Queue Management: BullMQ
- Queue Storage: Redis
- Authentication: JWT
- Password Hashing: bcrypt
- API Testing: Postman
- Containerization: Docker


## 2. Core Modules

### Module 1: Authentication
- User registration and login.
- JWT-based authentication.
- Password hashing using bcrypt.
- Authentication middleware.
- Users should only access their own jobs.

### Module 2: Job Management
- Create and submit jobs through REST APIs.
- Retrieve all jobs belonging to the authenticated user.
- Retrieve individual job details.
- Cancel pending jobs.
- Support EMAIL and REPORT job types.
- Accept job payloads in JSON format.
- Support job priorities.

### Module 3: Queue Distribution
- Integrate Redis with BullMQ.
- Add submitted jobs to a Redis-backed queue.
- Support priority-based job execution.
- Implement delayed job scheduling.
- Maintain job states: WAITING, ACTIVE, COMPLETED and FAILED.
- Store job metadata in MongoDB.

### Module 4: Background Workers
- Create independent worker processes.
- Allow multiple workers to consume jobs from the same Redis queue.
- Implement separate EMAIL and REPORT processors.
- Simulate job processing instead of using external services.
- Update job status in MongoDB.
- Store execution results.

### Module 5: Failure Handling
- Implement automatic retries.
- Use exponential backoff.
- Set maximum retry attempts.
- Record job failure reasons.
- Allow manual retry of failed jobs.
- Prevent duplicate job processing where practical.

### Module 6: Job Monitoring
- Check individual job status.
- View job execution history.
- Track processing start and completion times.
- Calculate job processing duration.
- Display queue statistics:
  - Waiting jobs
  - Active jobs
  - Completed jobs
  - Failed jobs

## 3. Database Design

Use MongoDB with Mongoose.

Create three collections:

**User**
- name
- email
- password
- createdAt

**Job**
- userId
- jobType
- payload
- status
- priority
- attempts
- scheduledAt
- result
- errorMessage
- createdAt
- startedAt
- completedAt

**JobExecutionHistory**
- jobId
- workerId
- status
- startedAt
- completedAt
- errorMessage

Add appropriate MongoDB indexes and references.

## 4. REST API Endpoints

Authentication:
- POST /api/auth/register
- POST /api/auth/login

Job Management:
- POST /api/jobs
- GET /api/jobs
- GET /api/jobs/:id
- DELETE /api/jobs/:id
- POST /api/jobs/:id/retry
- GET /api/jobs/:id/history

Monitoring:
- GET /api/queue/stats

Implement proper validation, error handling and HTTP status codes.

## 5. Architecture and Folder Structure

Use a modular architecture with separate folders for:

- config
- models
- controllers
- services
- routes
- middleware
- queues
- workers
- processors
- utils

Keep the Express API server and background worker processes independently executable.

Use clean code and maintain separation of concerns.

## 6. Important Engineering Requirements

- Use environment variables for configuration.
- Implement centralized error handling.
- Validate all incoming API requests.
- Implement proper MongoDB indexing.
- Handle Redis connection failures.
- Implement graceful shutdown.
- Ensure user-level job authorization.
- Keep MongoDB responsible for persistent storage and Redis responsible for queue operations.
- Handle job status consistency between BullMQ and MongoDB.

## 7. Docker Setup

Create Docker configuration for:
- Backend API
- Worker process
- MongoDB
- Redis

Use Docker Compose to run the complete application locally.

## 8. Documentation

Create a professional README.md containing:
- Project overview
- Problem statement
- Features
- Technology stack
- Architecture diagram
- Database design
- Folder structure
- API documentation
- Environment setup
- Installation instructions
- Execution commands
- Worker execution instructions
- Example API requests and responses

## 9. Strict Scope Restrictions

Do NOT implement:
- React frontend or dashboard.
- TypeScript.
- Jest.
- Kubernetes.
- Microservices architecture.
- Payment gateway.
- External email integration.
- Machine learning.
- Complex analytics.
- Unnecessary features.

Keep the project medium-sized and focused on backend engineering.

## 10. Development Instructions

Build the project module by module.

First, provide:
1. Proposed architecture.
2. Complete folder structure.
3. Required dependencies.
4. Database schema.
5. Implementation roadmap.

Then start with project initialization.

After completing each module:
- Explain what was implemented.
- List created and modified files.
- Provide commands to run it.
- Explain how to test it using Postman.
- Verify that previously implemented functionality still works.

Do not generate the entire project in one response.

Do not unnecessarily rewrite existing modules or change the agreed architecture.

## Final Deliverable

A fully functional Distributed Job Queue & Task Scheduling System demonstrating:

- Asynchronous job processing.
- Redis-based queue distribution.
- Multiple concurrent background workers.
- Priority-based job scheduling.
- Automatic retry and failure handling.
- REST API development.
- MongoDB database management.
- Docker-based deployment.

The final project must be understandable, testable, properly documented and suitable for backend developer and SDE placement interviews.
