const signupRouter = require('express').Router();
const { createUserValidation } = require('../middlewares/validation');
const { createUser } = require('../controllers/users');

signupRouter.post('/signup', createUserValidation, createUser);

module.exports = signupRouter;
