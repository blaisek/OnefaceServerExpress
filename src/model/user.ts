import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

// main interface
export interface IUser {
  email: string;
  // password: string;
}

// document interface, define custom methods here
export interface IUserDoc extends mongoose.Document, IUser {
  compareEmail(email: string): boolean;
  getToken(): string;
}

// model interface, define custom static methods here
interface IUserModel extends mongoose.Model<IUserDoc> {
  hashemail(email: string): string;
}

// scheam definition
const userSchema = new mongoose.Schema<IUserDoc>({
  email: {
    type: String,
    required: true,
  }
});
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ email: 'hashed' });

// Model custom methods
//
// this is an instance IMovieDoc
//
// allow to do:
// const movie = new MovieModel({...});
// movie.setLanguage('Français');
userSchema.method('compareEmail', function (this: IUserDoc, email: string) {
  try {
    return bcrypt.compareSync(email, this.email);
  }
  catch (e) { }
  return false;
});

userSchema.method('getToken', function (this: IUserDoc) {
  return jwt.sign({ userId: this._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: '2h'
  });
});

// Model custom static methods
//
// cannot use this here
//
// allow to do:
// MovieModel.staticMethod();
userSchema.static('hashEmail', (email: string): string => {
  return bcrypt.hashSync(email);
});

// model generation
export const UserModel = mongoose.model<IUserDoc, IUserModel>('users', userSchema);
