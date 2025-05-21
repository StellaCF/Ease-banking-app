const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/routes/auth.routes');
const userRoutes = require('./src/routes/user.routes');
const transactionRoutes = require('./src/routes/transaction.routes');
const loanRoutes = require('./src/routes/loan.routes')
const saveRoutes = require('./src/routes/save.routes')
const notFound = require('./src/middlewares/error');
const errorHandler = require('./src/middlewares/errorHandler');
const emptyReqBody = require('./src/middlewares/emptyReqBody');

const app = express();

app.use(cors({
  //  origin: "http://localhost:5173",
   origin: "https://easebank-drab.vercel.app",
   credentials: true,
 }));
app.use(express.json());

app.get("/", (req, res) => {
   res.send("Welcome to the Ease Banking API 🚀");
 });
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api/user', transactionRoutes);
app.use('/api/user', loanRoutes);
app.use('/api/user', saveRoutes)

app.use(emptyReqBody);
app.all("*", notFound);
app.use(errorHandler);

module.exports = app;