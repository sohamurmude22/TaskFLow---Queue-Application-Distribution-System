require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");
const env = require("./config/env");

const PORT = env.PORT;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`TaskFlow server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
};

startServer();
