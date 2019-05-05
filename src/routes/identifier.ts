import * as express from 'express';
import * as mongoose from 'mongoose';
import {IidentifierModel , IidentifierDoc} from '../model/identifier';
import { authMiddleware } from '../middlewares';


export const identifierRouter = express.Router()
// .use(authMiddleware)
// get all identifiers
.get('/', (req, res) => {
  IidentifierModel.find({})//user_id: mongoose.Types.ObjectId(req.tokenContent.userId) }) // find en fonction de user id
            .then((identifiers: IidentifierDoc[]) => res.json({ identifiers }))
            .catch(err => res.status(500).json({ code: 500, message: 'Internal server error', err }));
})

// get one identifier
.get('/:id', (req, res) => {
  // TODO: find also by user_id to be safe
  IidentifierModel.findById(mongoose.Types.ObjectId(req.param('id'))) // +userID 
            .then((identifier: IidentifierDoc) => {
              if (identifier)
                res.json({ identifier });
              else
                res.status(404).json({ code: 404, message: 'identifier not found' });
            })
            .catch(err => res.status(500).json({ code: 500, message: 'Internal server error', err }));
})

// create a new identifier
.post('/', (req: express.Request & { tokenContent?: any }, res, next) => {
  const identifier: IidentifierDoc = new IidentifierModel(req.body);
  const { tokenContent: {userId = null} = {} } = req;
  // if (! userId) {
  //   return next(new Error('No userId found in request' ));
  // }
  identifier.user_id = userId;
  identifier.validate()
        .then(() => identifier.save())
        .then((identifier: IidentifierDoc) => res.json({ identifier }))
        .catch(err => {
          console.error(err);
          res.status(500).json({ code: 500, message: 'Internal server error' });
        });
})

// update a identifier
.put('/:id', (req, res) => {
  // TODO: find also by user_id to be safe
  IidentifierModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.params['id'])}, { $set: req.body }, {new: true})
            .then((identifier: IidentifierDoc) => {
              if (identifier)
                res.json({ identifier });
              else
                res.status(404).json({ code: 404, message: 'identifier not found' });
            })
            .catch(err => res.status(500).json({ code: 500, message: 'Internal server error', err }));
})

// delete a identifier
.delete('/:id', (req, res) => {
  // TODO: find also by user_id to be safe
  IidentifierModel.findByIdAndDelete(mongoose.Types.ObjectId(req.param('id')))
            .then((identifier: IidentifierDoc) => {
              if (identifier)
                res.json({ identifier });
              else
                res.status(404).json({ code: 404, message: 'identifier not found' });
            })
            .catch(err => res.status(500).json({ code: 500, message: 'Internal server error', err }));
});
