"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
        min: 1850,
    },
    language: {
        type: String,
        required: false
    },
});
movieSchema.method('setLanguage', function (language) {
    this.language = language;
    console.log('method setLanguage');
    console.log(this);
});
movieSchema.static('staticMethod', () => {
    console.log('method staticMethod');
});
movieSchema.pre('remove', function (next) {
    console.log('pre remove ' + this.name);
    next();
});
movieSchema.pre('save', function (next) {
    console.log('pre save ' + this.name);
    next();
});
movieSchema.pre('validate', function (next) {
    console.log('pre validate ' + this.name);
    next();
});
movieSchema.pre('findOneAndUpdate', function (next) {
    console.log('pre findOneAndUpdate');
    console.log(this.getQuery());
    console.log(this.getUpdate());
    next();
});
movieSchema.post('findOneAndDelete', function (doc, next) {
    console.log('post findOneAndDelete');
    console.log(doc._id);
    next();
});
exports.MovieModel = mongoose.model('movies', movieSchema);
