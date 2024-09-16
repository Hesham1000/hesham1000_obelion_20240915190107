const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoutes = require('./routes/authRoutes');
// const taskRoutes = require('./routes/taskRoutes');
// const authMiddleware = require('./middlewares/authMiddleware');
// const validationMiddleware = require('./middlewares/validationMiddleware');

const app = express();

dotenv.config({path: 'config.env'});

app.use(bodyParser.json());
app.use(
    cors({
        origin: "http://localhost:3000"
    })
);
// app.use(authMiddleware);
// app.use(validationMiddleware);

app.use('/auth', authRoutes);
// app.use('/tasks', taskRoutes);

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

db.connect((err) => {
  if (err) {
    console.log('Error connecting to database');
    return;
  }
  console.log('Connected to database');
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});