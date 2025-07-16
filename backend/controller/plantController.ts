import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import plantService from "../service/plantService";
import { IPlantData, TypedRequest } from '../types/types';
import geminiService from '../service/geminiService';

export interface IPlantRequestBody {
    cntntsNo : string;
    cntntsSj : string;
    imgUrl?: string;
    dlthtsCodeNm : string;
    fmlCodeNm : string;
    fmldeSeasonCodeNm : string;
    frtlzrInfo : string;
    growthAraInfo : string;
    growthHgInfo : string;
    grwhTpCodeNm : string;
    grwtveCodeNm : string;
    hdCodeNm : string;
    ignSeasonCodeNm : string;
    lighttdemanddoCodeNm : string;
    managedemanddoCodeNm : string;
    managelevelCodeNm : string;
    postngplaceCodeNm : string;
    winterLwetTpCodeNm : string;
    watercycleSprngCode : string;
    watercycleSummerCode : string;
    watercycleAutumnCode : string;
    watercycleWinterCode : string;
    watercycle? : number;
}

export const getPlants = async (req: Request, res: Response) : Promise<void> => {
    const userId = req.user?.id;
    const plantId = req.query.plantId ? Number(req.query.plantId) : undefined;

    try {
        const plants = await plantService.getPlants(userId, plantId)as unknown as IPlantData[];
        const comments = await Promise.all(
            plants.map(plant => geminiService.geminiComment(plant))
        );
        
        res.status(StatusCodes.OK).json(
            plants.map((plant, index) => ({
                ...plant,
                comment: comments[index]
            }))
        );
        return;
    } catch(err) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message : "서버에서 오류가 발생했습니다. 관리자에게 문의해주세요." });
        return;
    }
}

export const createPlant = async (req: TypedRequest<IPlantRequestBody>, res: Response) : Promise<void> => {
    const userId = req.user?.id;
    const plant = {
        cntntsNo: req.body.cntntsNo,
        cntntsSj: req.body.cntntsSj,
        imgUrl: req.body.imgUrl,
        dlthtsCodeNm: req.body.dlthtsCodeNm,
        fmlCodeNm: req.body.fmlCodeNm,
        fmldeSeasonCodeNm: req.body.fmldeSeasonCodeNm,
        frtlzrInfo: req.body.frtlzrInfo,
        growthAraInfo: req.body.growthAraInfo,
        growthHgInfo: req.body.growthHgInfo,
        grwhTpCodeNm: req.body.grwhTpCodeNm,
        grwtveCodeNm: req.body.grwtveCodeNm,
        hdCodeNm: req.body.hdCodeNm,
        ignSeasonCodeNm: req.body.ignSeasonCodeNm,
        lighttdemanddoCodeNm: req.body.lighttdemanddoCodeNm,
        managedemanddoCodeNm: req.body.managedemanddoCodeNm,
        managelevelCodeNm: req.body.managelevelCodeNm,
        postngplaceCodeNm: req.body.postngplaceCodeNm,
        winterLwetTpCodeNm: req.body.winterLwetTpCodeNm,
        watercycleSprngCode: req.body.watercycleSprngCode,
        watercycleSummerCode: req.body.watercycleSummerCode,
        watercycleAutumnCode: req.body.watercycleAutumnCode,
        watercycleWinterCode: req.body.watercycleWinterCode,
        watercycle: req.body.watercycle
    };
    
    try {
        await plantService.createPlant(userId, plant);
        res.status(StatusCodes.CREATED).json({ message : "닉네임이 변경되었습니다. "});
        return;
    } catch(err) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message : "서버에서 오류가 발생했습니다. 관리자에게 문의해주세요." });
        return;
    }
}

export const updatePlant = async (req: Request, res: Response) : Promise<void> => {
    const {plantId} = req.params;
    const {nickName, watering} = req.body;
    
    try {
        if(nickName) {
            await plantService.updatePlantNickName(plantId, nickName);
        } else {
            await plantService.updatePlantWatering(plantId, watering);
        }

        res.status(StatusCodes.OK).json({ message : "식물 상태가 업데이트되었습니다. "});
        return;
    } catch(err) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message : "서버에서 오류가 발생했습니다. 관리자에게 문의해주세요." });
        return;
    }
}

export const deletePlant = async (req: Request, res: Response) : Promise<void> => {
    const {plantId} = req.params;
    
    try {
        await plantService.deletePlant(plantId);
        res.status(StatusCodes.OK).json({ message : "화분 비우기가 완료되었습니다. "});
        return;
    } catch(err) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message : "서버에서 오류가 발생했습니다. 관리자에게 문의해주세요." });
        return;
    }
}