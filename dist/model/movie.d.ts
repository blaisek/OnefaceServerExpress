import * as mongoose from 'mongoose';
export interface IMovie {
    name: string;
    year: number;
    language: string;
}
export interface IMovieDoc extends mongoose.Document, IMovie {
    setLanguage(language: string): void;
}
interface IMovieModel extends mongoose.Model<IMovieDoc> {
    staticMethod(): void;
}
export declare const MovieModel: IMovieModel;
export {};
