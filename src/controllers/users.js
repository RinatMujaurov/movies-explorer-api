const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const ConflictError = require('../errors/ConflictError');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      // Отправить ответ с токеном в теле
      res.send({ token });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      const UserDeletePassword = user.toObject();
      delete UserDeletePassword.password;
      res.status(201).send({ data: UserDeletePassword });
    })
    .catch((error) => {
      if (error.code === 11000) {
        return next(new ConflictError('Email уже существует'));
      }
      if (error.name === 'ValidationError') {
        return next(new ValidationError('Некорректные данные пользователя'));
      }
      return next(error);
    });
};

module.exports.getUserInfo = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .select('-password')
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send(user);
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const userId = req.user._id;
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    userId,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new ValidationError('Некорректные данные пользователя', 400));
      }
      next(error);
    });
};
