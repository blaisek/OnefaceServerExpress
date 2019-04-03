import * as express from "express";

import * as morgan from 'morgan'
import * as helmet from 'helmet'
import * as hpp from 'hpp'
import * as cors from 'cors'
import * as compress from 'compression'
import * as cookieParser from 'cookie-parser'
import * as dotenv from 'dotenv';

import {indexRouter} from './routes'
import { movieRouter } from "./routes/movie";
import { internalErrorMiddleWare } from "./middlewares/internal-error";
import { notFoundMiddleware } from "./middlewares/not-found";

dotenv.config()
// Constants
const PORT = +process.env.PORT;
const HOST = process.env.HOST;




// App
const app = express()

// middleware 
app.use(helmet())
.use(express.json())
.use(morgan('dev'))
.use(hpp())
.use(compress())
.use(cors({optionSucessStatus: 200}))
.use(cookieParser()); 


app.use('/api',indexRouter)
app.use('/movie',movieRouter)

app.use(internalErrorMiddleWare)
.use(notFoundMiddleware)

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);