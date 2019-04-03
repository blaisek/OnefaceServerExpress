import *as express from 'express';
import { authMiddleware } from '../middlewares/auth';


export const indexRouter = express.Router()


.get('/',(req, res) => {

    res.json({message: 'Welcome to the API 2'})
})

.post('/signUp',(req, res) => {

    res.json({message: 'thanks for your registration'})
})
.use(authMiddleware)
.post('/signIn',(req,res) =>{
    res.json({message: 'you are sign In' })
}) 