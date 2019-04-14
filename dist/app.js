"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const dotenv = require("dotenv");
const routes_1 = require("./routes");
const routes_2 = require("./routes");
const middlewares_1 = require("./middlewares");
const database_1 = require("./database");
const morgan = require("morgan");
const helmet = require("helmet");
const hpp = require("hpp");
const cors = require("cors");
const compress = require("compression");
const cookieParser = require("cookie-parser");
dotenv.config();
const database = new database_1.Database(process.env.DB_URI, process.env.DB_USER, process.env.DB_PASS);
database
    .connect()
    .catch(err => {
    console.error('Failed to connect to database:');
    console.error(err);
    console.error('Exiting with code 1');
    process.exit(1);
})
    .then(() => {
    const PORT = +process.env.PORT;
    const HOST = process.env.HOST;
    const app = express();
    app.use(helmet())
        .use(express.json())
        .use(morgan('dev'))
        .use(hpp())
        .use(compress())
        .use(cors({ optionsSuccessStatus: 200 }))
        .use(cookieParser())
        .use(middlewares_1.tokenMiddleware);
    app.get('/', (req, res) => res.json({ message: 'Please use /api/' }))
        .use('/api/', routes_1.indexRouter)
        .use('/api/note/', routes_2.noteRouter);
    app.use(middlewares_1.internalErrorMiddleware)
        .use(middlewares_1.notFoundMiddleware);
    const server = app.listen(PORT, HOST);
    console.log(`Listenning on ${HOST}:${PORT}...`);
    server.on('error', (err) => {
        switch (err.code) {
            case 'EACCES':
                console.error(`${HOST}:${PORT} requires elevated privileges`);
                break;
            case 'EADDRINUSE':
                console.error(`${HOST}:${PORT} is already in use`);
                break;
            default:
                console.error('Error connecting ' + err);
                break;
        }
        database.disconnect()
            .then(() => console.log('Database connection closed'))
            .catch(err => console.error('Database disconnection error ' + err))
            .then(() => {
            console.error('Exiting with code 1');
            process.exit(1);
        });
    });
    const closeServers = (sig) => {
        console.log(`Closing servers (${sig}) ...`);
        server.close(_ => console.log('Express server closed'));
        database.disconnect()
            .then(_ => console.log('Database connection closed'))
            .catch(err => console.log('Database disconnection error ' + err));
    };
    process.on('SIGTERM', () => closeServers('SIGTERM'));
    process.on('SIGINT', () => closeServers('SIGINT'));
})
    .catch(err => {
    console.error('An error occurs while running express:');
    console.error(err);
    console.error('Exiting with code 1');
    process.exit(1);
});
