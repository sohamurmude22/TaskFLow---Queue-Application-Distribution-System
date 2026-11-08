
const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    jobType: {
        type: String,
        required: true,
        trim: true
    },

    payload: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        default: {}
    },
    // input

    status: {
        type: String,
        enum: [
            "PENDING",
            "QUEUED",
            "ACTIVE",
            "COMPLETED",
            "FAILED",
            "CANCELLED"
        ],
        default: "PENDING"
    },

    priority: {
        type: Number,
        default: 1,
        min: 0
    },

    attempts: {
        type: Number,
        default: 0,
        min: 0
    },

    scheduledAt: {
        type: Date,
        default: Date.now
    },

    result: {
        type: mongoose.Schema.Types.Mixed,
        default: null
    },

    errorMessage: {
        type: String,
        default: null
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    startedAt: {
        type: Date,
        default: null
    },

    completedAt: {
        type: Date,
        default: null
    },

    queueJobId: {
        type: String,
        default: null
    },

    maxAttempts: {
        type: Number,
        default: 3,
        min: 1
    }
});

// MongoDB indexes
jobSchema.index({ userId: 1, createdAt: -1 });
jobSchema.index({ status: 1 });
jobSchema.index({ queueJobId: 1 }, { sparse: true });
jobSchema.index({ scheduledAt: 1, priority: -1 });

module.exports = mongoose.model("Job", jobSchema);
