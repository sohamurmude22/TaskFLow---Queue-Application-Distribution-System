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