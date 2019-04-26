import * as express from 'express';
import { UserModel, IUser } from '../model';
import {enroll} from '../kairosApi/enroll'
import {verify} from '../kairosApi/verify'
import { detect } from '../kairosApi/detect';
export const userRouter = express.Router()

// registration
.post('/signup', (req, res) => {
  
  const { email, image } = req.body;
  if (!email || !image ) {
    return res.status(400).json({ code: 400, message: 'Missing data for signup' });
  }
  // Steps
  // 0. Check all data are present
  // 1. Check email exists
  // 2. Save user
  // 3. Verify image is a face
  // 4. Register with kairos

  let newuser = null;
  // validation
  // post enroll api kairos
  // check user alreaqdy exists
  // appel à l'api externe enroll req.body 
  UserModel.findOne({ email })
           .then(user => user !== null)
           .then(found => {
             if (found)
              throw new Error('User already exists');
             const user = new UserModel({ email });
             return user.save();
           })
           .then(user => {
            newuser = user;
            // verify image is a face
            return detect.getFaces(image);
           })
           .then(res => {
             const { Errors, images } = res;
             if (Errors || (images && images.length !== 1))
              throw new Error(Errors || images.length === 0 ? 
                                'No face detected' : 
                                'Too many faces detected');
             return enroll.register(image, newuser._id)
           })
           .then(res => {
            const { Errors, images } = res;
            if (Errors || (images && images.length !== 1))
              throw new Error('Unable to register to kairos');
            res.json({ user: newuser, token: newuser.getToken() });
           })
           .catch(err => {
             console.error('Erreur while signup');
             console.error(req.body);
             console.error(err);
             res.status(400).json({ code: 400, message: err.message});
             // res.status(500).json({ code: 500, message: 'Internal server error' });
           });
})

// login
.post('/signin', (req, res) => {
  // validation
  // post verify api kairos
  const { email, image } = req.body;
  if (!email || !image) {
    return res.status(400).json({ code: 400, message: 'Missing data for signin' });
  }
  let myuser = null;
  UserModel.findOne({ email })
           .then(user => {
             if (!user)
              throw new Error('User not found');
            myuser = user;
            return verify.verifyFace(image, user._id);
           })
           .then(res => {
             const { Errors, images } = res;
             if (Errors || images.length !== 1 || images[0].transaction.confidence < 0.6)
              throw new Error('User not reconized')
             res.json({ user: myuser, token: myuser.getToken() });
           })
           .catch(err => {
              console.error('Error while signin');
              console.error(req.body);
              console.error(err);
              res.status(400).json({ code: 400, message: err.message});
          });
});
