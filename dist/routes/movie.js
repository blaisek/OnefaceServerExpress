"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const models_1 = require("../models");
exports.movieRouter = express.Router()
    .get('/', (req, res) => {
    models_1.MovieModel.find()
        .then((movies) => res.json({ movies }))
        .catch(err => res.status(500).json({ code: 500, message: 'Internal server error', err }));
})
    .get('/:id', (req, res) => {
    models_1.MovieModel.findById(mongoose.Types.ObjectId(req.param('id')))
        .then((movie) => {
        if (movie)
            res.json({ movie });
        else
            res.status(404).json({ code: 404, message: 'Movie not found' });
    })
        .catch(err => res.status(500).json({ code: 500, message: 'Internal server error', err }));
})
    .post('/', (req, res) => {
    const movie = new models_1.MovieModel(req.body);
    movie.validate()
        .then(() => movie.save())
        .then((movie) => res.json({ movie }))
        .catch(err => {
        console.error(err);
        res.status(500).json({ code: 500, message: 'Internal server error' });
    });
})
    .put('/:id', (req, res) => {
    models_1.MovieModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.params['id']) }, { $set: req.body }, { new: true })
        .then((movie) => {
        if (movie)
            res.json({ movie });
        else
            res.status(404).json({ code: 404, message: 'Movie not found' });
    })
        .catch(err => res.status(500).json({ code: 500, message: 'Internal server error', err }));
})
    .delete('/:id', (req, res) => {
    models_1.MovieModel.findByIdAndDelete(mongoose.Types.ObjectId(req.param('id')))
        .then((movie) => {
        if (movie)
            res.json({ movie });
        else
            res.status(404).json({ code: 404, message: 'Movie not found' });
    })
        .catch(err => res.status(500).json({ code: 500, message: 'Internal server error', err }));
});
