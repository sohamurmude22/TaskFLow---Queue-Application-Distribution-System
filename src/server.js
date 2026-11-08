const app = require('./app');
const env = require('./config/env');
const connectDB = require('./config/db');

// Connect to Database
connectDB();

// Start Server
app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});
