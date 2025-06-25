// 유틸리티, 사용 안할 시 삭제
import pool from '../db/mariadb';

// sql과 넣을 값을 가져와서 db작업을 해주는 util
export async function executeQuery(sql:string, values:any) {
    const connection = await pool.getConnection();
    try {
        const [results] = await connection.query(sql, values);

        return results;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
}
