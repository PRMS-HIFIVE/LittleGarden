import pool from "../db/mariadb";
import { ICommnetWithUser } from "../types/types";

const getComments = async (postId : number, userId : number) => {
    const sql = `SELECT C.id, C.user_id as userId, C.post_id as postId, C.content, C.created_at As createdAt, U.nickName, 
                        (C.user_id = ?) AS isAuthor
                 FROM comments C
                 JOIN users U ON C.user_id = U.id
                 WHERE C.post_id = ?`;
    const values = [userId, postId];
    
    const connection = await pool.getConnection();
    try {
        const [results] = await connection.query(sql, values);
        console.log(results)
        return results as ICommnetWithUser[];
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
}

const createComment = async (postId : number, userId : number, content : string) => {
    const sql = `INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)`;
    const values = [postId, userId, content];
    
    const connection = await pool.getConnection();
    try {
        const [results] = await connection.query(sql, values);
        return results;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
};

const updateComment = async (commentId : string, content : string) => {
    const sql = `UPDATE comments SET content = ? WHERE id = ?`;
    const values = [content, commentId];
    
    const connection = await pool.getConnection();
    try {
        const [results] = await connection.query(sql, values);
        return results;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
};

const deleteComment = async (commentId : string) => {
    const sql = `DELETE FROM comments WHERE id = ?`;
    const connection = await pool.getConnection();
    try {
        const [results] = await connection.query(sql, commentId);
        return results;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
};

const commentService = {
    getComments,
    createComment,
    updateComment,
    deleteComment
};

export default commentService;