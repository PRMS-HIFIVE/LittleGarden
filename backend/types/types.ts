import { Request } from 'express';

export interface IUser {
    id : number,
    email : string,
    password : string,
    salt : string,
    nickName : string,
    createdAt : number
}

export interface IPost {
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

export interface MailSendResult {
    success: boolean;
    message: string;
    result?: any;
}

export interface IPlantData {
    id?:number;
    cntntsSj?: string;
    dlthtsCodeNm?: string;
    fmlCodeNm?: string;
    fmldeSeasonCodeNm?: string;
    frtlzrInfo?: string;
    growthAraInfo?: string;
    growthHgInfo?: string;
    grwhTpCodeNm?: string;
    grwtveCodeNm?: string;
    hdCodeNm?: string;
    ignSeasonCodeNm?: string;
    lighttdemanddoCodeNm?: string;
    managedemanddoCodeNm?: string;
    managelevelCodeNm?: string;
    postngplaceCodeNm?: string;
    watercycleNm?: string;
}