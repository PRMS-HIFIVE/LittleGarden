import { executeQuery } from "../utils/executeQuery";


const likePost = async (postId:number, userId:number) => {
    const sql = `INSERT INTO like_post (user_id,post_id) VALUES (?, ?)`;
    const values = [userId, postId];

    return await executeQuery(sql, values);
};

const deleteLikePost = async (postId:number, userId:number) => {
    const sql = `DELETE FROM like_post WHERE post_id = ? AND user_id = ?;`;
    const values = [postId, userId];

    return await executeQuery(sql, values);
};

const likeService = {
    likePost,
    deleteLikePost
};

export default likeService;