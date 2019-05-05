// import { Schema, Document, model } from 'mongoose';
import * as mongoose from 'mongoose';


// main interface
export interface Iidentifier {
  title: string;
  userName: string;
  password: string; 
  webSiteUrl: string ;
  user_id: mongoose.Types.ObjectId
  
}

// document interface, define custom methods here
export interface IidentifierDoc extends mongoose.Document, Iidentifier {
  
}

// model interface, define custom static methods here
 interface IidentifierModel extends mongoose.Model<IidentifierDoc> {
  
}

// schema definition
const identifierSchema = new mongoose.Schema<IidentifierDoc>({
  title: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  webSiteUrl: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    // required: true
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
export const IidentifierModel = mongoose.model<IidentifierDoc, IidentifierModel>('identifiers', identifierSchema);
