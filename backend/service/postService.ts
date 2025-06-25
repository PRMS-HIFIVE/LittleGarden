import { post } from './../common/types';
import { executeQuery } from '../utils/utils';

const posts = async (post: post) => {
    const sql = "INSERT INTO posts (userId, title, content, tag) VALUES (?, ?, ?, ?)";
    const values = [post.userId, post.title, post.content, JSON.stringify(post.tag)];
    return await executeQuery(sql, values);
};

const getPosts = async () => {
    const sql = "SELECT * FROM posts";
    return await executeQuery(sql, []);
};

const updateposts = async (post: post) => {

    const sql = "UPDATE plant SET ";
    const values = [post.userId, post.title, post.content, JSON.stringify(post.tag)];
    return await executeQuery(sql, values);
};

const deletePosts = async (postId:number) => {
    const sql = "DELETE FROM posts WHERE id = ?";
    return await executeQuery(sql, postId);
};


export default {
    posts,
    getPosts,
    updateposts,
    deletePosts
};