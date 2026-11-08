
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("MongoDB Connection Failed:", error.message);
        process.exit(1);
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB Disconnected");
});
//tell what happening inside the database

mongoose.connection.on("error", (error) => {
    console.error("MongoDB Error:", error.message);
});

module.exports = connectDB;
