import * as express from "express";
import {Database} from './database';

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

// dotenv.config({path: '.env.Prod'})
dotenv.config()

// crate databse object

const database = new Database(
    process.env.DB_URI,
    process.env.DB_USER,
    process.env.DB_PASS,

);

database
.connect()
.then(()=>{

    const PORT = +process.env.PORT
    const HOST = process.env.HOST
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

    
    const server = app.listen(PORT, HOST);
    console.log(`Connected to ${HOST}:${PORT}`);
    // manage error

    server.on('error',(err:any)=> {
        switch (err.code){
            case 'EACCES':
            console.error(`${HOST}:${PORT} is already in use`);
            break; 
            default:
            console.error('Error connecting' + err);
            break
            
        }

        database.disconnect()
        .then(()=> console.log('Database connection closed'))
        .catch(err => console.error('Database disconnection error' + err))
        .then(()=> {
            console.error('Existing with code 1');
            process.exit(1)
            
        })
    })

    process.on('SIGINT',()=>{
        // close both express server and db connection without care
        server.close(_=>_);
        database.disconnect().then(_=>_).catch(_=>_);
    })
})
.catch(err =>{
    console.error('Failed to connect to database:');
    console.error(err);
    console.error('Existing with code 1');
    process.exit(1) 
})
