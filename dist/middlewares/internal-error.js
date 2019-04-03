"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.internalErrorMiddleWare = (err, req, res, next) => {
    console.error(`Error: ${err}`);
    res.status(500).json({ code: 500, data: err, message: 'internal system error' });
};
