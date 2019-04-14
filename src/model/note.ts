// import { Schema, Document, model } from 'mongoose';
import * as mongoose from 'mongoose';


// main interface
export interface INote {
  title: string;
  content: string;
  user_id: mongoose.Types.ObjectId
  
}

// document interface, define custom methods here
export interface INoteDoc extends mongoose.Document, INote {
  
}

// model interface, define custom static methods here
interface INoteModel extends mongoose.Model<INoteDoc> {
  
}

// schema definition
const noteSchema = new mongoose.Schema<INoteDoc>({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
    
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
});

// Model custom methods
//

// Model custom static methods
//


// document middlewares
//

// query middlewares
//

// post middleware
//


// model generation
export const NoteModel = mongoose.model<INoteDoc, INoteModel>('notes', noteSchema);
