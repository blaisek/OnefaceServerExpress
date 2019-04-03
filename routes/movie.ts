import * as express from 'express'
import * as movies from '../movie.json'

// Get movie listing routes

export const movieRouter = express.Router()

// get all movie

.get('/',(req, res) => {
    res.json({movies: movies});
})
.get('/:id',(req,res) => {
    res.json({ movie: {title: 'Movie' + req.param('id')}});
})
.post('/',(req, res) => {
    res.json({message: 'Movie created', movie: {title: 'NewMovie'}});
})
.put('/:id',(req, res) => {
    res.json({message: 'Movie created'});
})
.delete('/delete',(req,res) =>{
    res.json({message: 'Movie deleted'});
})