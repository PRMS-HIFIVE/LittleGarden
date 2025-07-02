import { ResultSetHeader, RowDataPacket } from "mysql2";
import { executeQuery } from "../utils/executeQuery";
import { IPlantRequestBody } from "../controller/plantController";

const getPlants = async (userId : number) => {
    const month = new Date().getMonth() + 1; 
    let watercycleColumn = '';

    if (month >= 3 && month <= 5) {
        watercycleColumn = 'watercycleSprngCode'; // 봄: 3~5월
    } else if (month >= 6 && month <= 8) {
        watercycleColumn = 'watercycleSummerCode'; // 여름: 6~8월
    } else if (month >= 9 && month <= 11) {
        watercycleColumn = 'watercycleAutumnCode'; // 가을: 9~11월
    } else {
        watercycleColumn = 'watercycleWinterCode'; // 겨울: 12~2월
    }

    const sql = `
        SELECT P.*, W.watercycleNm
        FROM plants P
        LEFT JOIN watercycle W
            ON P.${watercycleColumn} = W.watercycleCode
        WHERE P.user_id = ?
    `;
    const values = [userId];
    return await executeQuery<RowDataPacket[]>(sql, values);
}

const createPlant = async (userId: number, plant: IPlantRequestBody) => {
    const sql = `
        INSERT INTO plants (
            user_id, cntntsNo, cntntsSj, imgUrl, dlthtsCodeNm, fmlCodeNm, fmldeSeasonCodeNm, frtlzrInfo,
            growthAraInfo, growthHgInfo, grwhTpCodeNm, grwtveCodeNm, hdCodeNm, ignSeasonCodeNm,
            lighttdemanddoCodeNm, managedemanddoCodeNm, managelevelCodeNm, postngplaceCodeNm,
            winterLwetTpCodeNm, watercycleSprngCode, watercycleSummerCode, watercycleAutumnCode, watercycleWinterCode
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

const updatePlantWatering = async (plantId : string, watering : number) => {
    const sql = `UPDATE plants SET watering = ? WHERE id = ?`;
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