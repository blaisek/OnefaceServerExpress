"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    },
});
exports.NoteModel = mongoose.model('notes', noteSchema);
