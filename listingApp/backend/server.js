const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
// const taskRoutes = require('./routes/taskRoutes');
// const authMiddleware = require('./middlewares/authMiddleware');
// const validationMiddleware = require('./middlewares/validationMiddleware');

const app = express();

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
    host: 'sql7.freesqldatabase.com',
    user: 'sql7731579',
    password: '4QiUGFnWPL',
    database: 'sql7731579',
    port: 3306,
});

db.connect((err) => {
  if (err) {
    console.log('Error connecting to database');
    return;
  }
  console.log('Connected to database');
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});