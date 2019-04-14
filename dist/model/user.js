"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    }
});
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ email: 'hashed' });
userSchema.method('compareEmail', function (email) {
    try {
        return bcrypt.compareSync(email, this.email);
    }
    catch (e) { }
    return false;
});
userSchema.method('getToken', function () {
    return jwt.sign({ userId: this._id.toString() }, process.env.JWT_SECRET, {
        expiresIn: '2h'
    });
});
userSchema.static('hashEmail', (email) => {
    return bcrypt.hashSync(email);
});
exports.UserModel = mongoose.model('users', userSchema);
