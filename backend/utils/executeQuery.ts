import pool from '../db/mariadb';
import type { ResultSetHeader } from 'mysql2/promise';

// sql과 넣을 값을 가져와서 db작업을 해주는 util
export async function executeQuery(sql: string, values: any): Promise<ResultSetHeader> {
    const connection = await pool.getConnection();
    try {
        const [results] = await connection.query<ResultSetHeader>(sql, values);
        return results;
    } finally {
        connection.release();
    }
}