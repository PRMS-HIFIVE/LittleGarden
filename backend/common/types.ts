// 인터페이스 작성

export interface post {
    userId : string,
    title: string,
    content: string,
    is_health?:string,
    state?:number,
    tag?: string[]
}