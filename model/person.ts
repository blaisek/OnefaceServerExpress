import * as mongoose from 'mongoose';

export interface IPersonDoc extends mongoose.Document{
    firstname: string;
    lastname: string;
    money?: number;
    birthDate: Date;
}

export const personSchema = new mongoose.Schema({

    firstname:{
        type: String,
        required: true,
        maxlength: 50,
    },
    lastname:{
        type: String,
        required: true,
        maxlength: 50,
    },
    money:{
        type: Number,
        required: false,
        min:1,
    },
    birthDate:{
        type: Date,
        required: true
    }
});



export const personModel = mongoose.model<IPersonDoc>('people',personSchema);
