import * as express from 'express';
import * as mongoose from 'mongoose';
import {NoteModel, INoteDoc} from '../models/note';
import { authMiddleware } from '../middlewares';


export const noteRouter = express.Router()
.use(authMiddleware)
// get all notes
.get('/', (req, res) => {
  NoteModel.find()
            .then((notes: INoteDoc[]) => res.json({ notes }))
            .catch(err => res.status(500).json({ code: 500, message: 'Internal server error', err }));
})

// get one note
.get('/:id', (req, res) => {
  NoteModel.findById(mongoose.Types.ObjectId(req.param('id')))
            .then((note: INoteDoc) => {
              if (note)
                res.json({ note });
              else
                res.status(404).json({ code: 404, message: 'note not found' });
            })
            .catch(err => res.status(500).json({ code: 500, message: 'Internal server error', err }));
})

// create a new note
.post('/', (req: express.Request & { tokenContent?: any }, res) => {
  const note: INoteDoc = new NoteModel(req.body);
  note.user_id = req.tokenContent.userId;
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
  NoteModel.findByIdAndDelete(mongoose.Types.ObjectId(req.param('id')))
            .then((note: INoteDoc) => {
              if (note)
                res.json({ note });
              else
                res.status(404).json({ code: 404, message: 'note not found' });
            })
            .catch(err => res.status(500).json({ code: 500, message: 'Internal server error', err }));
});
