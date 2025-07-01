import { post } from '../types/types';
import { executeQuery } from '../utils/executeQuery';

interface IFilterPost {
    plantTag?: string;
    state?: number
}

const posts = async (post: post) => {
    const sql = "INSERT INTO posts (user_id, title, content, state) VALUES (?, ?, ?, ?)";
    const values = [post.userId, post.title, post.content, post.state];
    return await executeQuery(sql, values);
};

const getPosts = async (plantTag?:IFilterPost,state?:IFilterPost) => {
    let sql;
    let values=[];
    if(plantTag && state){
        sql = "SELECT * FROM plant.posts INNER JOIN posts_tag ON posts.id = posts_tag.post_id WHERE plant_id = ? AND state = ?;";
        values.push(plantTag,state);
        return await executeQuery(sql, values);
    }if(plantTag){
        sql = "SELECT * FROM plant.posts INNER JOIN posts_tag ON posts.id = posts_tag.post_id WHERE plant_id = ?;";
        values.push(plantTag);
        return await executeQuery(sql, values);
    }if(state){
        sql = "SELECT * FROM plant.posts INNER JOIN posts_tag ON posts.id = posts_tag.post_id WHERE state = ?;";
        values.push(state);
        return await executeQuery(sql, values);
    }
    else{
        sql = "SELECT * FROM posts";
        return await executeQuery(sql, []);
    }
};

const updatePosts = async (postId:number,post: post) => {
    const sql = "UPDATE posts SET user_id=?,title=?,content=?,state=? WHERE id=?";
    const values = [post.userId, post.title, post.content,post.state,postId];
    return await executeQuery(sql, values);
};

const deletePosts = async (postId:number) => {
    const sql = "DELETE FROM posts WHERE id = ?";
    return await executeQuery(sql, postId);
};

const tags = async (postId : number,plantTag:string[]) => {
    // 1. plant_id가 있는지 살펴본다.
    const plantsql = `SELECT * FROM plants WHERE name IN (${plantTag.map(() => '?').join(',')})`;
    const resultPlants = await executeQuery(plantsql, plantTag);
    
    // 2-1. 있을 때 post_tags 테이블에 추가
    if(Array.isArray(resultPlants) && resultPlants.length > 0){
        const insertSql = `INSERT INTO post_tags (post_id,plant_id) VALUES ${resultPlants.map(() => '(?,?)').join(',')}`
        const values = resultPlants.flatMap((plant: any) => [postId, plant.id]);
        return await executeQuery(insertSql, values);
    }
    // 2-2. 없을 때 없으니 리턴 
    else {
        throw new Error('해당하는 식물 태그가 없습니다.');
    }
    
};

const updateTags = async (postId : number,plantTag:string[]) => {
    // 1. post_tags테이블에서 post_id를 전부 삭제
    const deleteTagSql = `DELETE FROM post_tags WHERE post_id = ?`;
    const resultDelete = await executeQuery(deleteTagSql,postId);
    
    // 2. 처음 만들때와 같이 진행 ( => 전체 삭제만 하고 다시 작성한다. )
    const plantsql = `SELECT * FROM plants WHERE name IN (${plantTag.map(() => '?').join(',')})`;
    const resultPlants = await executeQuery(plantsql, plantTag);

    // 2-1. 있을 때 post_tags 테이블에 추가
    if(Array.isArray(resultPlants) && resultPlants.length > 0){
        const insertSql = `INSERT INTO post_tags (post_id,plant_id) VALUES ${resultPlants.map(() => '(?,?)').join(',')}`
        const values = resultPlants.flatMap((plant: any) => [postId, plant.id]);
        return await executeQuery(insertSql, values);
    }
    // 2-2. 없을 때 없으니 리턴 
    else {
        throw new Error('해당하는 식물 태그가 없습니다.');
    }
    
};


export default {
    posts,
    getPosts,
    updatePosts,
    deletePosts,
    tags,
    updateTags
};