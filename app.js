const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const authRouter = require('./routes/api/auth');
const usersRouter = require('./routes/api/users');
const boardsRouter = require('./routes/api/boards');
const emailRouter = require('./routes/api/email');
const swaggerRouter = require('./routes/api/swagger')

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/boards', boardsRouter);
app.use('/api/email', emailRouter);
app.use('/api/swagger', swaggerRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'err.message' } = err;

  res.status(status).json({ message });
});

module.exports = app;
