"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.personSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        maxlength: 50,
    },
    lastname: {
        type: String,
        required: true,
        maxlength: 50,
    },
    money: {
        type: Number,
        required: false,
        min: 1,
    },
    birthDate: {
        type: Date,
        required: true
    }
});
exports.personModel = mongoose.model('people', exports.personSchema);
