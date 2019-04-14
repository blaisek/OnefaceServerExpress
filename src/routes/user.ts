import * as express from 'express';
import { UserModel, IUser } from '../models';


export const userRouter = express.Router()

// registration
.post('/signup', (req, res) => {
  // validation
  const { email, password} = req.body;
  if (!email || !password ) {
    return res.status(400).json({ code: 400, message: 'Missing data for signup' });
  }
  // check user alreaqdy exists
  UserModel.findOne({ email })
           .then(user => user !== null)
           .then(found => {
             if (!found) {
              const user = new UserModel(req.body);
              user.password = UserModel.hashPassword(password); // if an exception is thrown there, we go to the catch
              return user.save();
             }
             return null;
           })
           .then(user => {
             if (user)
                res.json({ user, token: user.getToken() });
             else
                res.status(400).json({ code: 400, message: 'User already exists'});
           })
           .catch(err => {
             console.error('Erreur while signup');
             console.error(req.body);
             console.error(err);
             res.status(500).json({ code: 500, message: 'Internal server error' });
           });
})

// login
.post('/signin', (req, res) => {
  // validation
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ code: 400, message: 'Missing data for signin' });
  }

  UserModel.findOne({ email })
           .then(user => {
             if (user && user.comparePassword(password)) {
               const userModel: IUser = user.toJSON();
               delete userModel.password;
               res.json({ user: userModel, token: user.getToken() });
             }
             else {
               res.status(400).json({ code: 400, message: 'Email or password incorrect'});
             }
           })
           .catch(err => {
              console.error('Error while signin');
              console.error(req.body);
              console.error(err);
              res.status(500).json({ code: 500, message: 'Internal server error' });
          });
});
