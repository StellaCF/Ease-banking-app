const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/routes/auth.routes');
const userRoutes = require('./src/routes/user.routes');
const transactionRoutes = require('./src/routes/transaction.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api/user', transactionRoutes);

module.exports = app;