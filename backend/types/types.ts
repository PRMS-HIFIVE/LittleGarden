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