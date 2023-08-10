const router = require('express').Router();
const userRoutes = require('./users');
const moviesRoutes = require('./movies');
const signinRoutes = require('./signin');
const signupRoutes = require('./signup');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

router.use('/', signinRoutes);
router.use('/', signupRoutes);
router.use(auth);
router.use('/users', userRoutes);
router.use('/movies', moviesRoutes);
router.use('/*', (req, res, next) => {
  next(new NotFoundError('404: Страница не найдена'));
});

module.exports = router;
