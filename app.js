require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const routes = require('./src/routes/index');
const apiLimiter = require('./src/middlewares/rateLimiter');
const errorHandler = require('./src/middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./src/middlewares/logger');

const { DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb', PORT = 3000 } = process.env;

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
  })
  .then(() => {

  });

const app = express();

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server is about to crash');
  }, 0);
});

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(apiLimiter);

app.use(requestLogger);

app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {

});
