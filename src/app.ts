import * as express from 'express';
import * as dotenv from 'dotenv';

import {indexRouter, identifierRouter, noteRouter, userRouter} from './routes';
import { notFoundMiddleware, internalErrorMiddleware, tokenMiddleware } from './middlewares';
import { Database } from './database';

import * as morgan from 'morgan';
import * as helmet from 'helmet';
import * as hpp from 'hpp';
import * as cors from 'cors';
import * as compress from 'compression';
import * as cookieParser from 'cookie-parser';

// MUST be first instruction
// load .env file
dotenv.config();

// Create database object
const database = new Database(
   process.env.DB_URI,
   process.env.DB_USER,
   process.env.DB_PASS
);

database
.connect()
.catch(err => {
   console.error('Failed to connect to database:');
   console.error(err);
   console.error('Exiting with code 1');
   process.exit(1);
})
.then(() => {
   // Constants
   const PORT = +process.env.PORT;
   const HOST = process.env.HOST;

   // Create App
   const app = express();

   // middlewares
   // use Helmet to help secure Express apps with various HTTP headers
   app.use(helmet())
      // parse json content
      .use(express.json())
      // use morgan to log requests to the console
      .use(morgan('dev'))
      // use HPP to protect against HTTP Parameter Pollution attacks
      .use(hpp())
      // enable gzip compression
      .use(compress())
      // cross domain origin
      .use(cors({optionsSuccessStatus: 200}))
      // parse cookies
      .use(cookieParser())
      // generate token on the fly
      .use(tokenMiddleware);

   // routes
   app.use('/api', indexRouter)
      .use('/api/signin', userRouter)
      .use('/api/signup', userRouter)
      .use('/api/notes/', noteRouter)
      .use('/api/identifiers', identifierRouter)
   // add error handlers
   app.use(internalErrorMiddleware)
      .use(notFoundMiddleware);

   // start server
   const server = app.listen(PORT, HOST);
   console.log(`Listenning on ${HOST}:${PORT}...`);

   // manage error
   server.on('error', (err: any) => {
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
      // gracefully stop database connection
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
      // close both express server and db connnection without care
      server.close(_ => console.log('Express server closed'));
      database.disconnect()
            .then(_ => console.log('Database connection closed'))
            .catch(err => console.log('Database disconnection error ' + err));
   };

   // gracefully stop the server in case of SIGINT (Ctrl + C) or SIGTERM (Process stopped)
   process.on('SIGTERM', () => closeServers('SIGTERM'));
   process.on('SIGINT', () => closeServers('SIGINT'));
})
.catch(err => {
   console.error('An error occurs while running express:');
   console.error(err);
   console.error('Exiting with code 1');
   process.exit(1);
});
