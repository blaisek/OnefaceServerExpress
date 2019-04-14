// import { Schema, Document, model } from 'mongoose';
import * as mongoose from 'mongoose';


// main interface
export interface IMovie {
  name: string;
  year: number;
  language: string;
}

// document interface, define custom methods here
export interface IMovieDoc extends mongoose.Document, IMovie {
  setLanguage(language: string): void;
}

// model interface, define custom static methods here
interface IMovieModel extends mongoose.Model<IMovieDoc> {
  staticMethod(): void;
}

// scheam definition
const movieSchema = new mongoose.Schema<IMovieDoc>({
  name: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
    min: 1850,
  },
  language: {
    type: String,
    required: false
  },
});

// Model custom methods
//
// this is an instance IMovieDoc
//
// allow to do:
// const movie = new MovieModel({...});
// movie.setLanguage('Français');
movieSchema.method('setLanguage', function (this: IMovieDoc, language: string) {
  this.language = language;
  console.log('method setLanguage');
  console.log(this);
});

// Model custom static methods
//
// cannot use this here
//
// allow to do:
// MovieModel.staticMethod();
movieSchema.static('staticMethod', () => {
  console.log('method staticMethod');
});


// document middlewares
// this is an instance of IMovieDoc
movieSchema.pre<IMovieDoc>('remove', function (next) {
  console.log('pre remove ' + this.name);
  next();
});
movieSchema.pre<IMovieDoc>('save', function (next) {
  console.log('pre save ' + this.name);
  // next(new Error('message')); => generate error, go to catch after save
  next();
});
movieSchema.pre<IMovieDoc>('validate', function (next) {
  console.log('pre validate ' + this.name);
  next();
});

// query middlewares
// this is an instance of mongoose.Query
movieSchema.pre<mongoose.Query<any>>('findOneAndUpdate', function (next) {
  // Example:
  //
  // With: findOneAndUpdate({ year: { $lte: 1900 }}, { $set: { old: true } });
  //
  // this.getQuery() => { year: { $lte: 1900 } }
  // this.getUpdate() => { $set: { old: true } }
  console.log('pre findOneAndUpdate');
  console.log(this.getQuery());
  console.log(this.getUpdate());
  next();
});

// post middleware
// this is an instance of mongoose.Query and document is available
movieSchema.post('findOneAndDelete', function (this: mongoose.Query<any>, doc: IMovieDoc, next) {
  console.log('post findOneAndDelete');
  console.log(doc._id);
  next();
});

// model generation
export const MovieModel = mongoose.model<IMovieDoc, IMovieModel>('movies', movieSchema);
