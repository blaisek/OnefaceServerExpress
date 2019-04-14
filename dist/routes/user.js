"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const model_1 = require("../model");
exports.userRouter = express.Router()
    .post('/signup', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ code: 400, message: 'Missing data for signup' });
    }
    model_1.UserModel.findOne({ email })
        .then(user => user !== null)
        .then(found => {
        if (!found) {
            const user = new model_1.UserModel(req.body);
            user.password = model_1.UserModel.hashPassword(password);
            return user.save();
        }
        return null;
    })
        .then(user => {
        if (user)
            res.json({ user, token: user.getToken() });
        else
            res.status(400).json({ code: 400, message: 'User already exists' });
    })
        .catch(err => {
        console.error('Erreur while signup');
        console.error(req.body);
        console.error(err);
        res.status(500).json({ code: 500, message: 'Internal server error' });
    });
})
    .post('/signin', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ code: 400, message: 'Missing data for signin' });
    }
    model_1.UserModel.findOne({ email })
        .then(user => {
        if (user && user.comparePassword(password)) {
            const userModel = user.toJSON();
            delete userModel.password;
            res.json({ user: userModel, token: user.getToken() });
        }
        else {
            res.status(400).json({ code: 400, message: 'Email or password incorrect' });
        }
    })
        .catch(err => {
        console.error('Error while signin');
        console.error(req.body);
        console.error(err);
        res.status(500).json({ code: 500, message: 'Internal server error' });
    });
});
