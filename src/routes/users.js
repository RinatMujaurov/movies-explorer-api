const usersRouter = require('express').Router();
const { getUserInfo, updateProfile } = require('../controllers/users');
const { updateProfileValidation } = require('../middlewares/validation');

usersRouter.get('/me', getUserInfo);
usersRouter.patch('/me', updateProfileValidation, updateProfile);

module.exports = usersRouter;
