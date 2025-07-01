import { ResultSetHeader, RowDataPacket } from "mysql2";
import { executeQuery } from "../utils/executeQuery";

const getComments = async (postId : number, userId : number) => {
    const sql = `SELECT C.id, C.user_id as userId, C.post_id as postId, C.content, C.created_at As createdAt, U.nickName, 
    (C.user_id = ?) AS isAuthor
    FROM comments C
    JOIN users U ON C.user_id = U.id
    WHERE C.post_id = ?`;
    const values = [userId, postId];
    return await executeQuery<RowDataPacket[]>(sql, values);
}

const createComment = async (postId : number, userId : number, content : string) => {
    const sql = `INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)`;
    const values = [postId, userId, content];
    return await executeQuery<ResultSetHeader>(sql, values);
};

const updateComment = async (commentId : string, content : string) => {
    const sql = `UPDATE comments SET content = ? WHERE id = ?`;
    const values = [content, commentId];
    return await executeQuery<ResultSetHeader>(sql, values);
};

const deleteComment = async (commentId : string) => {
    const sql = `DELETE FROM comments WHERE id = ?`;
    const values = [commentId];
    return await executeQuery<ResultSetHeader>(sql, values);
};

const commentService = {
    getComments,
    createComment,
    updateComment,
    deleteComment
};

export default commentService;