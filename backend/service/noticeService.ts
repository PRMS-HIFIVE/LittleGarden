import { executeQuery } from "../utils/executeQuery";


const addnotice = async (userId:number,type:string) => {
    let title = "";
    let message = "";
    switch(type){
        case("watering"):
            title = "물주기 알림";
            message = "물을 줄 때가 돼었습니다.";
            break;
        case("comment"):
            title = "댓글 알림";
            message = "작성글에 댓글이 달렸습니다.";
            break;
        default:
            throw new Error('알림 타입을 지정해주세요') 
    }

    const sql = `INSERT INTO notice (user_id,is_read,title,message) VALUES(?,0,?,?)`;
    const values = [userId,title,message];

    return await executeQuery(sql, values);
};

//여기의 userID 게시물유저의 ID로 받아야한다.
// is_read = 0 일때 안본 것 1일때 본것
const CommentAddNotice = async (postId:number) => {
    const title = "댓글 알림";
    const message = "작성글에 댓글이 달렸습니다.";
    const sql = `INSERT INTO notice (user_id,is_read,title,message) VALUES((SELECT user_id FROM posts WHERE posts.id=?),0,?,?)`;
    const values = [postId,title,message];

    return await executeQuery(sql, values);
};

//

const getnotice = async (userId:number) => {
    const sql = `SELECT * FROM notice WHERE user_id = ?`;
    const values = [userId];

    return await executeQuery(sql, values);
};

const readnotice = async (noticeId:number, userId:number) => {
    const sql = `UPDATE notice SET is_read = 1 WHERE user_id = ? AND id = ? `;
    const values = [userId, noticeId];

    return await executeQuery(sql, values);
};

const delnotice  = async (noticeId:number, userId:number) => {
    const sql = `DELETE FORM notice WHERE user_id = ? AND id = ?, is_read = ?`;
    const values = [userId, noticeId];

    return await executeQuery(sql, values);
};

const noticeService = {
    addnotice,
    getnotice,
    readnotice,
    delnotice,
    CommentAddNotice
};

export default noticeService;