import { Request } from 'express';

export interface IUser {
    id : number,
    email : string,
    password : string,
    salt : string,
    nickName : string,
    createdAt : number
}

export interface post {
    userId : string,
    title: string,
    content: string,
    is_health?:string,
    state?:number,
    plantTag?: string[]
}

export interface IPlant {

}

export interface IComment {
    id: number;
    userId: number;
    postId: number;
    content: string;
    createdAt: Date;
}

export interface ICommnetWithUser extends IComment {
    nickName: string;
    isAuthor: boolean;
}

export interface TypedRequest<T> extends Request {
    body: T;
}