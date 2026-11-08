# TaskFlow – Distributed Job Queue & Task Scheduling System

## Module-Wise Development Plan

### Module 1: Project Initialization & Configuration
**Objective:** Set up the Node.js backend project with a clean and modular architecture.

**Implementation:**
- Initialize Node.js project using npm.
- Install required dependencies.
- Create the complete folder structure.
- Set up Express.js application.
- Configure environment variables using dotenv.
- Create the main server entry point.
- Implement centralized error-handling middleware.
- Create a health-check API (`GET /api/health`).
- Configure CORS and JSON request parsing.

**Completion Criteria:**
- Express server starts successfully.
- Health-check API returns a successful response.
- Environment variables load correctly.
- Centralized error handling works.

---

### Module 2: MongoDB Database & Mongoose Models
**Objective:** Establish database connectivity and create the required database schemas.

**Implementation:**
- Connect MongoDB using Mongoose.
- Create User model.
- Create Job model.
- Create JobExecutionHistory model.
- Define schema validation and default values.
- Configure ObjectId references between collections.
- Add appropriate MongoDB indexes.
- Implement database connection error handling.

**Database Collections:**

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
- queueJobId
- maxAttempts

**JobExecutionHistory**
- jobId
- workerId
- status
- startedAt
- completedAt
- errorMessage

**Completion Criteria:**
- MongoDB connects successfully.
- All three models work correctly.
- Documents can be created and retrieved.
- Indexes and references work correctly.

---

### Module 3: User Authentication & Authorization
**Objective:** Implement secure user registration, login and protected API access.

**Implementation:**
- Create user registration API.
- Create user login API.
- Hash passwords using bcrypt.
- Verify passwords during login.
- Generate JWT tokens.
- Implement JWT authentication middleware.
- Protect private API routes.
- Validate user input.
- Prevent duplicate email registrations.
- Implement user-level authorization.

**API Endpoints:**
- POST `/api/auth/register`
- POST `/api/auth/login`

**Completion Criteria:**
- Users can register and log in.
- Passwords are stored in hashed format.
- JWT authentication works.
- Unauthorized requests are rejected.
- Users cannot access another user's protected resources.

---

### Module 4: Basic Job Management APIs
**Objective:** Implement REST APIs to create, retrieve and manage user-specific jobs.

**Implementation:**
- Create EMAIL jobs.
- Create REPORT jobs.
- Accept job payloads in JSON format.
- Assign jobs to authenticated users.
- Set default job status as WAITING.
- Support job priorities.
- Retrieve all jobs belonging to the authenticated user.
- Retrieve individual job details.
- Cancel pending jobs.
- Implement request validation.
- Implement job ownership authorization.

**API Endpoints:**
- POST `/api/jobs`
- GET `/api/jobs`
- GET `/api/jobs/:id`
- DELETE `/api/jobs/:id`

**Completion Criteria:**
- Users can create EMAIL and REPORT jobs.
- Jobs are stored in MongoDB.
- Users can retrieve only their own jobs.
- Pending jobs can be cancelled.
- Invalid requests return appropriate HTTP status codes.

---

### Module 5: Redis & BullMQ Queue Integration
**Objective:** Integrate Redis and BullMQ to manage asynchronous job execution.

**Implementation:**
- Configure Redis connection using ioredis.
- Create a BullMQ queue.
- Implement job producer functionality.
- Submit MongoDB job records to the Redis-backed queue.
- Store BullMQ job IDs in MongoDB.
- Configure job priority.
- Implement delayed job support.
- Handle Redis connection failures.
- Synchronize job information between MongoDB and BullMQ.

**Core Components:**
- Redis configuration.
- Queue initialization.
- Job producer.
- Queue service.

**Completion Criteria:**
- Redis connects successfully.
- Jobs are added to BullMQ.
- Jobs remain waiting until consumed by workers.
- Queue job IDs are stored in MongoDB.
- Priority and delayed job options work.

---

### Module 6: Background Workers & Job Processors
**Objective:** Implement independent worker processes to consume and execute queued jobs.

**Implementation:**
- Create independent worker entry point.
- Implement multiple worker instances.
- Connect workers to the shared BullMQ queue.
- Create EMAIL processor.
- Create REPORT processor.
- Dispatch jobs according to jobType.
- Simulate EMAIL processing.
- Simulate REPORT generation.
- Implement configurable worker concurrency.
- Generate unique worker IDs.
- Update MongoDB job status during execution.
- Store successful execution results.
- Handle worker errors.
- Implement graceful worker shutdown.

**Core Components:**
- Worker process.
- EMAIL processor.
- REPORT processor.
- Worker configuration.

**Completion Criteria:**
- Workers consume jobs from Redis.
- Multiple workers process jobs concurrently.
- EMAIL and REPORT jobs execute correctly.
- MongoDB reflects execution status.
- Results are stored successfully.

---

### Module 7: Priority-Based Execution & Delayed Scheduling
**Objective:** Implement priority-based job execution and scheduled processing.

**Implementation:**
- Support HIGH, MEDIUM and LOW priorities.
- Map application priorities to BullMQ priority values.
- Implement priority-based job execution.
- Support delayed job execution.
- Use scheduledAt to determine execution time.
- Configure BullMQ delay options.
- Validate scheduled dates.
- Prevent invalid scheduling requests.

**Completion Criteria:**
- High-priority jobs are prioritized over lower-priority jobs.
- Delayed jobs execute at their scheduled time.
- Jobs are processed according to queue scheduling rules.

---

### Module 8: Failure Handling & Retry Mechanism
**Objective:** Implement reliable job execution with automatic retries and failure recovery.

**Implementation:**
- Configure maximum retry attempts.
- Implement automatic job retries.
- Configure exponential backoff.
- Track processing attempts.
- Store failure reasons.
- Update MongoDB status after final failure.
- Implement manual retry API.
- Prevent duplicate job processing where practical.
- Implement idempotent processing where practical.
- Handle permanent and temporary processing errors.

**API Endpoint:**
- POST `/api/jobs/:id/retry`

**Completion Criteria:**
- Failed jobs retry automatically.
- Exponential backoff works correctly.
- Maximum retry attempts are enforced.
- Failure reasons are stored.
- Failed jobs can be manually retried.
- Duplicate business operations are prevented where practical.

---

### Module 9: Job Execution History
**Objective:** Maintain detailed records of every job execution attempt.

**Implementation:**
- Create execution history records.
- Record job ID.
- Record worker ID.
- Track execution status.
- Record execution start time.
- Record execution completion time.
- Store failure messages.
- Track individual retry attempts.
- Calculate execution duration.
- Retrieve complete job execution history.

**API Endpoint:**
- GET `/api/jobs/:id/history`

**Completion Criteria:**
- Every processing attempt is recorded.
- Worker information is stored.
- Failed and successful attempts are distinguishable.
- Execution duration is calculated correctly.
- Users can retrieve their job history.

---

### Module 10: Job Monitoring & Queue Statistics
**Objective:** Implement APIs to monitor job status and overall queue activity.

**Implementation:**
- Retrieve individual job status.
- Retrieve waiting job count.
- Retrieve active job count.
- Retrieve completed job count.
- Retrieve failed job count.
- Calculate job processing duration.
- Track processing timestamps.
- Retrieve queue statistics using BullMQ.
- Handle temporary differences between MongoDB and Redis states.

**API Endpoint:**
- GET `/api/queue/stats`

**Expected Response:**

{
  "waiting": 10,
  "active": 2,
  "completed": 25,
  "failed": 3
}

**Completion Criteria:**
- Queue statistics are retrieved correctly.
- Job statuses are accurate.
- Execution duration is available.
- Monitoring APIs work with authenticated users.

---

### Module 11: Docker & Docker Compose
**Objective:** Containerize the application and run all components together.

**Implementation:**
- Create Dockerfile for the backend API.
- Configure worker execution in Docker.
- Configure MongoDB container.
- Configure Redis container.
- Create docker-compose.yml.
- Configure container networking.
- Configure environment variables.
- Add persistent volumes for MongoDB and Redis where appropriate.
- Implement service dependencies and health checks.
- Verify inter-container communication.

**Services:**
- Backend API.
- Background Worker.
- MongoDB.
- Redis.

**Completion Criteria:**
- All services start using Docker Compose.
- API connects to MongoDB and Redis.
- Workers connect to both required services.
- Jobs can be submitted and processed inside containers.

---

### Module 12: Final Testing, Documentation & Integration
**Objective:** Verify the complete application and prepare it for GitHub and placement interviews.

**Implementation:**
- Test all authentication APIs.
- Test all job management APIs.
- Test queue integration.
- Test multiple worker execution.
- Test priority-based scheduling.
- Test delayed jobs.
- Test automatic retries.
- Test manual retries.
- Test failure handling.
- Test job execution history.
- Test queue statistics.
- Test authorization and validation.
- Create complete Postman collection.
- Write professional README.md.
- Add architecture diagram.
- Document database schemas.
- Document API endpoints and example responses.
- Document installation and execution commands.
- Document Docker setup.

**Completion Criteria:**
- All modules work together.
- All APIs return appropriate responses.
- Existing functionality remains unaffected.
- Docker setup works.
- README documentation is complete.
- Project is ready for GitHub presentation.

---

## Final Module Sequence

| Module | Name |
|---|---|
| 1 | Project Initialization & Configuration |
| 2 | MongoDB Database & Mongoose Models |
| 3 | User Authentication & Authorization |
| 4 | Basic Job Management APIs |
| 5 | Redis & BullMQ Queue Integration |
| 6 | Background Workers & Job Processors |
| 7 | Priority-Based Execution & Delayed Scheduling |
| 8 | Failure Handling & Retry Mechanism |
| 9 | Job Execution History |
| 10 | Job Monitoring & Queue Statistics |
| 11 | Docker & Docker Compose |
| 12 | Final Testing, Documentation & Integration |

## Development Rules

1. Implement the project strictly module by module.
2. Do not generate the entire project at once.
3. Explain the concepts before implementing each module.
4. Provide complete code with correct file paths.
5. Maintain the agreed architecture and technology stack.
6. Do not unnecessarily modify previously completed modules.
7. Test every feature before proceeding to the next module.
8. Verify that previous functionality continues working after every integration.
9. Use meaningful variable names and maintain clean, beginner-friendly code.
10. Avoid unnecessary features and dependencies.
11. Keep API server and worker processes independently executable.
12. Use Git commits after completing each module.

**Final Goal:** Build a fully functional, modular Distributed Job Queue & Task Scheduling System demonstrating asynchronous processing, Redis-based queue distribution, concurrent workers, priority scheduling, automatic retries, failure recovery, MongoDB persistence and Docker containerization.