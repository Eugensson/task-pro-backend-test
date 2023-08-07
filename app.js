const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const authRouter = require('./routes/api/auth');
const usersRouter = require('./routes/api/users');
const boardsRouter = require('./routes/api/boards');
const helperRouter = require('./routes/api/helper');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/boards', boardsRouter);
app.use('/api/helper', helperRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'err.message' } = err;

  res.status(status).json({ message });
});

module.exports = app;
