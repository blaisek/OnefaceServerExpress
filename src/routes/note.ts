import * as express from 'express';
import * as mongoose from 'mongoose';
import {NoteModel, INoteDoc} from '../model/note';
import { authMiddleware } from '../middlewares';


export const noteRouter = express.Router()
.use(authMiddleware)
// get all notes
.get('/', (req, res) => {
  NoteModel.find({ user_id: mongoose.Types.ObjectId(req.tokenContent.userId) }) // find en fonction de user id
            .then((notes: INoteDoc[]) => res.json({ notes }))
            .catch(err => res.status(500).json({ code: 500, message: 'Internal server error', err }));
})

// get one note
.get('/:id', (req, res) => {
  // TODO: find also by user_id to be safe
  NoteModel.findById(mongoose.Types.ObjectId(req.param('id'))) // +userID 
            .then((note: INoteDoc) => {
              if (note)
                res.json({ note });
              else
                res.status(404).json({ code: 404, message: 'note not found' });
            })
            .catch(err => res.status(500).json({ code: 500, message: 'Internal server error', err }));
})

// create a new note
.post('/', (req: express.Request & { tokenContent?: any }, res, next) => {
  const note: INoteDoc = new NoteModel(req.body);
  const { tokenContent: {userId = null} = {} } = req;
  // if (! userId) {
  //   return next(new Error('No userId found in request' ));
  // }
  note.user_id = userId;
  note.validate()
        .then(() => note.save())
        .then((note: INoteDoc) => res.json({ note }))
        .catch(err => {
          console.error(err);
          res.status(500).json({ code: 500, message: 'Internal server error' });
        });
})

// update a note
.put('/:id', (req, res) => {
  // TODO: find also by user_id to be safe
  NoteModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.params['id'])}, { $set: req.body }, {new: true})
            .then((note: INoteDoc) => {
              if (note)
                res.json({ note });
              else
                res.status(404).json({ code: 404, message: 'note not found' });
            })
            .catch(err => res.status(500).json({ code: 500, message: 'Internal server error', err }));
})

// delete a note
.delete('/:id', (req, res) => {
  // TODO: find also by user_id to be safe
  NoteModel.findByIdAndDelete(mongoose.Types.ObjectId(req.param('id')))
            .then((note: INoteDoc) => {
              if (note)
                res.json({ note });
              else
                res.status(404).json({ code: 404, message: 'note not found' });
            })
            .catch(err => res.status(500).json({ code: 500, message: 'Internal server error', err }));
});
