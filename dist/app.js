"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
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
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
