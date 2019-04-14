"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
exports.indexRouter = express.Router()
    .get('/', (req, res) => {
    res.json({ message: 'Welcome to Awesome Project API 🎉' });
})
    .post('/signup', (req, res) => {
    res.json({ message: 'Thanks for your registration' });
})
    .post('/signin', (req, res) => {
    res.json({ message: 'Welcome back' });
})
    .post('/secured', (req, res) => {
    res.json({ message: 'You are in a secured api' });
});
__export(require("./note"));
__export(require("./user"));
