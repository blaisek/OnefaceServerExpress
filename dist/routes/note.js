"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const note_1 = require("../model/note");
const middlewares_1 = require("../middlewares");
exports.noteRouter = express.Router()
    .use(middlewares_1.authMiddleware)
    .get('/', (req, res) => {
    note_1.NoteModel.find()
        .then((notes) => res.json({ notes }))
        .catch(err => res.status(500).json({ code: 500, message: 'Internal server error', err }));
})
    .get('/:id', (req, res) => {
    note_1.NoteModel.findById(mongoose.Types.ObjectId(req.param('id')))
        .then((note) => {
        if (note)
            res.json({ note });
        else
            res.status(404).json({ code: 404, message: 'note not found' });
    })
        .catch(err => res.status(500).json({ code: 500, message: 'Internal server error', err }));
})
    .post('/', (req, res) => {
    const note = new note_1.NoteModel(req.body);
    note.user_id = req.tokenContent.userId;
    note.validate()
        .then(() => note.save())
        .then((note) => res.json({ note }))
        .catch(err => {
        console.error(err);
        res.status(500).json({ code: 500, message: 'Internal server error' });
    });
})
    .put('/:id', (req, res) => {
    note_1.NoteModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.params['id']) }, { $set: req.body }, { new: true })
        .then((note) => {
        if (note)
            res.json({ note });
        else
            res.status(404).json({ code: 404, message: 'note not found' });
    })
        .catch(err => res.status(500).json({ code: 500, message: 'Internal server error', err }));
})
    .delete('/:id', (req, res) => {
    note_1.NoteModel.findByIdAndDelete(mongoose.Types.ObjectId(req.param('id')))
        .then((note) => {
        if (note)
            res.json({ note });
        else
            res.status(404).json({ code: 404, message: 'note not found' });
    })
        .catch(err => res.status(500).json({ code: 500, message: 'Internal server error', err }));
});
