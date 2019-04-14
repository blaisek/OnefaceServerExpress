import * as mongoose from 'mongoose';
export interface INote {
    title: string;
    content: string;
    user_id: mongoose.Types.ObjectId;
}
export interface INoteDoc extends mongoose.Document, INote {
}
interface INoteModel extends mongoose.Model<INoteDoc> {
}
export declare const NoteModel: INoteModel;
export {};
