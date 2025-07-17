import { ResultSetHeader, RowDataPacket } from "mysql2";
import { executeQuery } from "../utils/executeQuery";
import { IPlantRequestBody } from "../controller/plantController";
import { getWatercycleColumn } from "../utils/utils";

const getPlants = async (userId : number, plantId : number | undefined) => {
    const currentMonth = new Date().getMonth() + 1;
    const watercycleColumn = getWatercycleColumn(currentMonth);

    let sql = `
        SELECT P.*, W.watercycleNm
        FROM plants P
        LEFT JOIN watercycle W
            ON P.${watercycleColumn} = W.watercycleCode
        WHERE P.user_id = ?
    `;

    const values = [userId];
    
    if (plantId) {
        sql += ' AND P.id = ?';
        values.push(plantId);
    }
    
    return await executeQuery<RowDataPacket[]>(sql, values);
}

const createPlant = async (userId: number, plant: IPlantRequestBody) => {
    const sql = `
        INSERT INTO plants (
            user_id, cntntsNo, cntntsSj, imgUrl, dlthtsCodeNm, fmlCodeNm, fmldeSeasonCodeNm, frtlzrInfo,
            growthAraInfo, growthHgInfo, grwthTpCodeNm, grwtveCodeNm, hdCodeNm, ignSeasonCodeNm,
            lightdemanddoCodeNm, managedemanddoCodeNm, managelevelCodeNm, postngplaceCodeNm,
            winterLwetTpCodeNm, watercycle, watercycleSpringCode, watercycleSummerCode, watercycleAutumnCode, watercycleWinterCode
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
        userId,
        plant.cntntsNo,
        plant.cntntsSj,
        plant.imgUrl ?? null,
        plant.dlthtsCodeNm,
        plant.fmlCodeNm,
        plant.fmldeSeasonCodeNm,
        plant.frtlzrInfo,
        plant.growthAraInfo,
        plant.growthHgInfo,
        plant.grwhTpCodeNm,
        plant.grwtveCodeNm,
        plant.hdCodeNm,
        plant.ignSeasonCodeNm,
        plant.lighttdemanddoCodeNm,
        plant.managedemanddoCodeNm,
        plant.managelevelCodeNm,
        plant.postngplaceCodeNm,
        plant.winterLwetTpCodeNm,
        plant.watercycle,
        plant.watercycleSprngCode,
        plant.watercycleSummerCode,
        plant.watercycleAutumnCode,
        plant.watercycleWinterCode
    ];
    return await executeQuery<ResultSetHeader>(sql, values);
}

const updatePlantNickName = async (plantId : string, nickName : string) => {
    const sql = `UPDATE plants SET nickName = ? WHERE id = ?`;
    const values = [nickName, plantId];
    return await executeQuery<ResultSetHeader>(sql, values);
};

const updatePlantWatering = async (plantId : string, watering : string) => {
    const sql = `UPDATE plants SET last_watering = ? WHERE id = ?`;
    const values = [watering, plantId];
    return await executeQuery<ResultSetHeader>(sql, values);
};

const deletePlant = async (plantId : string) => {
    const sql = `DELETE FROM plants WHERE id = ?`;
    const values = [plantId];
    return await executeQuery<ResultSetHeader>(sql, values);
};

const plantService = {
    getPlants,
    createPlant,
    updatePlantNickName,
    updatePlantWatering,
    deletePlant,
};

export default plantService;