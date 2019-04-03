"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const auth_1 = require("../middlewares/auth");
exports.indexRouter = express.Router()
    .get('/', (req, res) => {
    res.json({ message: 'Welcome to the API 2' });
})
    .post('/signUp', (req, res) => {
    res.json({ message: 'thanks for your registration' });
})
    .use(auth_1.authMiddleware)
    .post('/signIn', (req, res) => {
    res.json({ message: 'you are sign In' });
});
