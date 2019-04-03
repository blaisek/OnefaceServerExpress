"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
exports.authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token)
        return res.status(401).json({ message: 'You need to be authorized to access this part of api', reason: 'Missing token' });
    try {
        const tokenContent = jwt.verify(token, '>>> SecretKey <<<');
        req.tokenContent = tokenContent;
        next();
    }
    catch (e) {
        res.status(401).json({ message: 'You need to be authorized to access this part of api', reason: 'Invalid or expired token' });
    }
};
