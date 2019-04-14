import * as mongoose from 'mongoose';
import * as moment from 'moment';

const birthDateValidator = (date: Date): boolean => {
  const m = moment(date);


  return m.diff(moment().subtract(18, 'year')) > 18;
};

export interface IPersonDoc extends mongoose.Document {
  firstname: string;
  lastname: string;
  money?: number;
  birthDate: Date;
}

export const personSchema = new mongoose.Schema<IPersonDoc>({
  firstname: {
    type: String,
    required: true,
    maxlength: 50,
  },
  lastname: {
    type: String,
    required: true,
    maxlength: 50,
  },
  money: {
    type: Number,
    required: false,
    min: 1,
  },
  birthDate: {
    type: Date,
    required: true,
    validate: [birthDateValidator, 'Person must 18 years old']
  }
});

export const personModel = mongoose.model<IPersonDoc>('people', personSchema);

