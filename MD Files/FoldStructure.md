TaskFlow/
│
├── src/
│   │
│   ├── config/
│   │   ├── db.js
│   │   ├── redis.js
│   │   └── env.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Job.js
│   │   └── JobExecutionHistory.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── job.controller.js
│   │   └── queue.controller.js
│   │
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── job.service.js
│   │   └── queue.service.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── job.routes.js
│   │   ├── queue.routes.js
│   │   └── health.routes.js
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   ├── validate.middleware.js
│   │   └── error.middleware.js
│   │
│   ├── queues/
│   │   ├── job.queue.js
│   │   └── job.producer.js
│   │
│   ├── workers/
│   │   └── worker.js
│   │
│   ├── processors/
│   │   ├── email.processor.js
│   │   └── report.processor.js
│   │
│   ├── validators/
│   │   ├── auth.validator.js
│   │   └── job.validator.js
│   │
│   ├── utils/
│   │   ├── generateToken.js
│   │   ├── ApiError.js
│   │   └── asyncHandler.js
│   │
│   ├── app.js
│   └── server.js
│
├── tests/
│   └── postman/
│       └── TaskFlow.postman_collection.json
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── Dockerfile
├── docker-compose.yml
└── README.md

Folder	Purpose
config	        Database and Redis connection configuration
controllers	    Handle incoming API requests and send responses
models	        Define MongoDB schemas using Mongoose
routes	        Define API endpoints
middleware	    Authentication, authorization and request checks
services	    Contain the main business logic
utils	        Store reusable helper functions
queues	        Configure and manage BullMQ queues
workers	        Process background jobs
jobs	        Define job-related processing functions, if needed
validators	    Validate API request data
logs	        Store application or job-processing logs, if needed