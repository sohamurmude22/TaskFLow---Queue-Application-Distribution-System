
const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
    },

    workerId: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: [
            "ACTIVE",
            "COMPLETED",
            "FAILED"
        ],
        required: true
    },

    startedAt: {
        type: Date,
        default: Date.now
    },

    completedAt: {
        type: Date,
        default: null
    },

    errorMessage: {
        type: String,
        default: null
    }
});

historySchema.index({ jobId: 1, startedAt: -1 });

module.exports = mongoose.model(
    "JobExecutionHistory",
    historySchema
);
