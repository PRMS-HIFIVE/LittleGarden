import pool from '../db/mariadb';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

// sql과 넣을 값을 가져와서 db작업을 해주는 util
export async function executeQuery<T extends RowDataPacket[] | ResultSetHeader = any>(sql: string, values: any): Promise<T> {
    const connection = await pool.getConnection();
    try {
        const [results] = await connection.query(sql, values);
        return results as T;
    } finally {
        connection.release();
    }
}