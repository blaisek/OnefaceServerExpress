import * as express from 'express';
import { authMiddleware } from '../middlewares/auth';
// GET index listing routes.
export const indexRouter = express.Router()

.get('/', (req, res) => {
  res.json({ message: 'Welcome to Awesome Project API 🎉'});
})
.post('/signup', (req, res) => {
  // appel de l'api enroll methode
  
  res.json({ message: 'Thanks for your registration' });
})
.post('/signin', (req, res) => {
  // appel de l'api verify methode
  // gen jwt
  res.json({code: 200,  message: 'Welcome back' });
})

.post('/secured', (req, res) => {
  res.json({ message: 'You are in a secured api' });
});

export * from './note';
export * from './user';
