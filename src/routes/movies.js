const moviesRouter = require('express').Router();

const { createMovieValidation, movieIdValidation } = require('../middlewares/validation');
const { getSavedMovies, createMovie, deleteMovie } = require('../controllers/movies');

moviesRouter.get('/', getSavedMovies);
moviesRouter.post('/', createMovieValidation, createMovie);
moviesRouter.delete('/:_id', movieIdValidation, deleteMovie);

module.exports = moviesRouter;
