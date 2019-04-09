"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const database_1 = require("./database");
const morgan = require("morgan");
const helmet = require("helmet");
const hpp = require("hpp");
const cors = require("cors");
const compress = require("compression");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const routes_1 = require("./routes");
const movie_1 = require("./routes/movie");
const internal_error_1 = require("./middlewares/internal-error");
const not_found_1 = require("./middlewares/not-found");
dotenv.config();
const database = new database_1.Database(process.env.DB_URI, process.env.DB_USER, process.env.DB_PASS);
database
    .connect()
    .then(() => {
    const PORT = +process.env.PORT;
    const HOST = process.env.HOST;
    const app = express();
    app.use(helmet())
        .use(express.json())
        .use(morgan('dev'))
        .use(hpp())
        .use(compress())
        .use(cors({ optionSucessStatus: 200 }))
        .use(cookieParser());
    app.use('/api', routes_1.indexRouter);
    app.use('/movie', movie_1.movieRouter);
    app.use(internal_error_1.internalErrorMiddleWare)
        .use(not_found_1.notFoundMiddleware);
    const server = app.listen(PORT, HOST);
    console.log(`Connected to ${HOST}:${PORT}`);
    server.on('error', (err) => {
        switch (err.code) {
            case 'EACCES':
                console.error(`${HOST}:${PORT} is already in use`);
                break;
            default:
                console.error('Error connecting' + err);
                break;
        }
        database.disconnect()
            .then(() => console.log('Database connection closed'))
            .catch(err => console.error('Database disconnection error' + err))
            .then(() => {
            console.error('Existing with code 1');
            process.exit(1);
        });
    });
    process.on('SIGINT', () => {
        server.close(_ => _);
        database.disconnect().then(_ => _).catch(_ => _);
    });
})
    .catch(err => {
    console.error('Failed to connect to database:');
    console.error(err);
    console.error('Existing with code 1');
    process.exit(1);
});
