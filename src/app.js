const express = require('express');
const cors = require('cors');

const healthRoutes = require('./routes/health.routes');
const authRoutes = require('./routes/authroutes');
const errormiddleware = require('./middleware/error.middleware');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', healthRoutes); // health route

app.use('/api/auth', authRoutes); // auth route

//404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

app.use(errormiddleware);

module.exports = app;

