import { ResultSetHeader, RowDataPacket } from "mysql2";
import { IPost } from "../types/types";
import { executeQuery } from "../utils/executeQuery";
import { platform } from "os";

interface IFilterPost {
  plantTag?: string;
  state?: number;
}

const posts = async (post: IPost) => {
  const sql =
    "INSERT INTO posts (user_id, title, content, state,is_health) VALUES (?, ?, ?, ?,?)";
  const values = [
    post.userId,
    post.title,
    post.content,
    post.state,
    post.isHealth,
  ];
  return await executeQuery(sql, values);
};

const getPosts = async (plantTag?: IFilterPost, state?: IFilterPost) => {
  let sql;
  let values = [];
  sql = `
        SELECT 
            posts.*, 
            plants.cntntsSj AS plantTag
        FROM 
            posts
        INNER JOIN post_tags ON posts.id = post_tags.post_id
        INNER JOIN plants ON post_tags.plant_id = plants.id
    `;

  if (plantTag && state) {
    sql += " WHERE plants.cntntsSj = ? AND posts.state = ?";
    values.push(plantTag, state);
  } else if (plantTag) {
    sql += " WHERE plants.cntntsSj = ?";
    values.push(plantTag);
  } else if (state) {
    sql += " WHERE posts.state = ?";
    values.push(state);
  }

  sql += " ORDER BY posts.created_at DESC";

  return await executeQuery<RowDataPacket[]>(sql, values);
};



const updatePosts = async (postId: number, post: IPost) => {
  const sql =
    "UPDATE posts SET user_id=?,title=?,content=?,state=?,is_health=? WHERE id=?";
  const values = [
    post.userId,
    post.title,
    post.content,
    post.state,
    post.isHealth,
    postId,
  ];
  return await executeQuery(sql, values);
};

const deletePosts = async (postId: number) => {
  const sql = "DELETE FROM posts WHERE id = ?";
  return await executeQuery<ResultSetHeader>(sql, postId);
};

const tags = async (postId : number,plantTag:string[]) => {
    // 1. plant_id가 있는지 살펴본다.
    const plantsql = `SELECT * FROM plants WHERE id IN (${plantTag.map(() => '?').join(',')})`;
    const resultPlants = await executeQuery<RowDataPacket[]>(plantsql, plantTag);
    
    // 2-1. 있을 때 post_tags 테이블에 추가
    if(resultPlants && resultPlants.length > 0){
        const insertSql = `INSERT INTO post_tags (post_id,plant_id) VALUES ${resultPlants.map(() => '(?,?)').join(',')}`
        const values = resultPlants.flatMap((plant: any) => [postId, plant.id]);
        return await executeQuery<ResultSetHeader>(insertSql, values);
    }
    // 2-2. 없을 때 없으니 리턴 
    else {
        throw new Error('해당하는 식물 태그가 없습니다.');
    }
    
};

const getPostDetail = async (postId: number) => {
  const sql = `
    SELECT 
      posts.*,
      users.nickname,
      GROUP_CONCAT(plants.cntntsSj) AS plantTags
    FROM posts
    LEFT JOIN users ON posts.user_id = users.id
    LEFT JOIN post_tags ON posts.id = post_tags.post_id
    LEFT JOIN plants ON post_tags.plant_id = plants.id
    WHERE posts.id = ?
    GROUP BY posts.id, users.nickname
  `;
  const result = await executeQuery<RowDataPacket[]>(sql, [postId]);
  return result.length > 0 ? result[0] : null;
};



const updateTags = async (postId: number, plantTag: string[]) => {
  // 1. post_tags테이블에서 post_id를 전부 삭제
  const deleteTagSql = `DELETE FROM post_tags WHERE post_id = ?`;
  const resultDelete = await executeQuery<ResultSetHeader>(
    deleteTagSql,
    postId
  );

  // 2. 처음 만들때와 같이 진행 ( => 전체 삭제만 하고 다시 작성한다. )
  const plantsql = `SELECT * FROM plants WHERE cntntsSj IN (${plantTag
    .map(() => "?")
    .join(",")})`;
  const resultPlants = await executeQuery<RowDataPacket[]>(plantsql, plantTag);

  // 2-1. 있을 때 post_tags 테이블에 추가
  if (resultPlants && resultPlants.length > 0) {
    const insertSql = `INSERT INTO post_tags (post_id,plant_id) VALUES ${resultPlants
      .map(() => "(?,?)")
      .join(",")}`;
    const values = resultPlants.flatMap((plant: any) => [postId, plant.id]);
    return await executeQuery<ResultSetHeader>(insertSql, values);
  }
  // 2-2. 없을 때 없으니 리턴
  else {
    throw new Error("해당하는 식물 태그가 없습니다.");
  }
};

export default {
  posts,
  getPosts,
  getPostDetail,
  updatePosts,
  deletePosts,
  tags,
  updateTags,
};
