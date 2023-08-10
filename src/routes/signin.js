const signinRouter = require('express').Router();
const { loginValidation } = require('../middlewares/validation');
const { login } = require('../controllers/users');

signinRouter.post('/signin', loginValidation, login);

module.exports = signinRouter;
