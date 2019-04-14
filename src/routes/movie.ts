import * as express from 'express';
import * as mongoose from 'mongoose';
import { MovieModel, IMovieDoc } from '../models';


export const movieRouter = express.Router()
// get all movies
.get('/', (req, res) => {
  MovieModel.find()
            .then((movies: IMovieDoc[]) => res.json({ movies }))
            .catch(err => res.status(500).json({ code: 500, message: 'Internal server error', err }));
})

// get one movie
.get('/:id', (req, res) => {
  MovieModel.findById(mongoose.Types.ObjectId(req.param('id')))
            .then((movie: IMovieDoc) => {
              if (movie)
                res.json({ movie });
              else
                res.status(404).json({ code: 404, message: 'Movie not found' });
            })
            .catch(err => res.status(500).json({ code: 500, message: 'Internal server error', err }));
})

// create a new movie
.post('/', (req, res) => {
  const movie: IMovieDoc = new MovieModel(req.body);
  movie.validate()
        .then(() => movie.save())
        .then((movie: IMovieDoc) => res.json({ movie }))
        .catch(err => {
          console.error(err);
          res.status(500).json({ code: 500, message: 'Internal server error' });
        });
})

// update a movie
.put('/:id', (req, res) => {
  MovieModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.params['id'])}, { $set: req.body }, {new: true})
            .then((movie: IMovieDoc) => {
              if (movie)
                res.json({ movie });
              else
                res.status(404).json({ code: 404, message: 'Movie not found' });
            })
            .catch(err => res.status(500).json({ code: 500, message: 'Internal server error', err }));
})

// delete a movie
.delete('/:id', (req, res) => {
  MovieModel.findByIdAndDelete(mongoose.Types.ObjectId(req.param('id')))
            .then((movie: IMovieDoc) => {
              if (movie)
                res.json({ movie });
              else
                res.status(404).json({ code: 404, message: 'Movie not found' });
            })
            .catch(err => res.status(500).json({ code: 500, message: 'Internal server error', err }));
});
