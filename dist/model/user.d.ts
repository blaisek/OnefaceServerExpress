import * as mongoose from 'mongoose';
export interface IUser {
    email: string;
    password: string;
}
export interface IUserDoc extends mongoose.Document, IUser {
    comparePassword(password: any): any;
    compareEmail(email: string): boolean;
    getToken(): string;
}
interface IUserModel extends mongoose.Model<IUserDoc> {
    hashPassword(password: any): string;
    hashemail(email: string): string;
}
export declare const UserModel: IUserModel;
export {};
