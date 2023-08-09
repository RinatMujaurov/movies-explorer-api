const mongoose = require('mongoose');
const validator = require('validator');

// схема карточки
const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: validator.isURL, // Используем валидатор isURL для проверки URL-адреса
        message: 'Некорректный URL для изображения',
      },
    },
    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator: validator.isURL,
        message: 'Некорректный URL для трейлера',
      },
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator: validator.isURL,
        message: 'Некорректный URL для миниатюры',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
    },
    nameRU: {
      type: String,
      required: true,
    },
    nameEN: {
      type: String,
      required: true,
    },
  },
  { versionKey: false },
);

// Модель карточки
module.exports = mongoose.model('Movie', movieSchema);
