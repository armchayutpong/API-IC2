import { Request, Response } from "express";
import sql from "mssql"

// Config database
import { mssqlThanvasuInfo } from "../config/db.config";

const AddrDistrict = async (req:Request, res:Response) => {
    try {
        const { provinceName } = req.params;
        if(!provinceName) return res.status(400).json({"error": "invalid_request", "message": "Invalid province name."})

        const pool = await sql.connect(mssqlThanvasuInfo);
        const result = await pool.request()
            .input('ProvinceTH', sql.NVarChar, provinceName)
            .execute('Sp_CRM_AddrDistrict');

        if(!result) return res.status(500).json({"error": "invalid_response", "message":"Invalid response data."})

        if(result.recordset[0]){
            if(result.recordset){
                const data = result.recordset;
                return res.status(200).json({"data":data, "status":"SUCCESS"});
            }else{
                return res.status(500).json({"error": "invalid_response", "message":"Invalid response data"})
            }
        }else{
            return res.status(500).json({"error": "invalid_response", "message":"Invalid response data."})
        }
    } catch (error:any) {
        console.error(error);
        const errCode = error.code;
        const errInfo = error.originalError.info;
        res.status(500).json({"error": "error_request", "message": `[${errCode}] ${errInfo.message}`});
    }
}
const AddrProvince = async (req:Request, res:Response) => {
    try {
        const pool = await sql.connect(mssqlThanvasuInfo);
        const result = await pool.request()
            .execute('Sp_CRM_AddrProvince');

        if(!result) return res.status(500).json({"error": "invalid_response", "message":"Invalid response data."})

        if(result.recordset[0]){
            if(result.recordset){
                const data = result.recordset;
                return res.status(200).json({"data":data, "status":"SUCCESS"});
            }else{
                return res.status(500).json({"error": "invalid_response", "message":"Invalid response data"})
            }
        }else{
            return res.status(500).json({"error": "invalid_response", "message":"Invalid response data."})
        }
    } catch (error:any) {
        console.error(error);
        const errCode = error.code;
        const errInfo = error.originalError.info;
        res.status(500).json({"error": "error_request", "message": `[${errCode}] ${errInfo.message}`});
    }
}
const CheckExistedLineID = async (req:Request, res:Response) => {
    try {
        const { lineId } = req.params;
        if(!lineId) return res.status(400).json({"error": "invalid_request", "message": "Invalid lineId."})

        const pool = await sql.connect(mssqlThanvasuInfo);
        const result = await pool.request()
            .input('LineID', sql.NVarChar, lineId)
            .execute('Sp_CRM_CheckExistedLineID');

        if(!result) return res.status(500).json({"error": "invalid_response", "message":"Invalid response data."})

        if(result.recordset[0]){
            const data = result.recordset[0];
            return res.status(200).json({"data":data, "status":"SUCCESS"});
        }else{
            return res.status(500).json({"error": "invalid_response", "message":"Invalid response data."})
        }
    } catch (error:any) {
        console.error(error);
        const errCode = error.code;
        const errInfo = error.originalError.info;
        res.status(500).json({"error": "error_request", "message": `[${errCode}] ${errInfo.message}`});
    }
}
const CheckExistedTelNo = async (req:Request, res:Response) => {
    try {
        const {telNo, lineId} = req.query;

        const pool = await sql.connect(mssqlThanvasuInfo);
        const result = await pool.request()
            .input('TelNo', sql.NVarChar, telNo)
            .input('LineID', sql.NVarChar, lineId)
            .execute('Sp_CRM_CheckExistedTelNo')

        if(!result) return res.status(500).json({"error": "invalid_response", "message":"Invalid response data."})

        if(result.recordset[0]){
            const data = result.recordset[0];
            return res.status(200).json({"data":data, "status":"SUCCESS"});
        }else{
            return res.status(500).json({"error": "invalid_response", "message":"Invalid response data."})
        }

    } catch (error:any) {
        console.error(error);
        const errCode = error.code;
        const errInfo = error.originalError.info;
        res.status(500).json({"error": "error_request", "message": `[${errCode}] ${errInfo.message}`});
    }
}
const CheckOTP = async (req:Request, res:Response) => {
    try {
        const { memCardId, telNo, otpCode, otpType} = req.query;

        const pool = await sql.connect(mssqlThanvasuInfo);
        const result = await pool.request()
            .input('MemCardID', sql.NVarChar, memCardId)
            .input('TelNo', sql.NVarChar, telNo)
            .input('OTP', sql.NVarChar, otpCode)
            .input('OTPType', sql.NVarChar, otpType)
            .execute('Sp_CRM_CheckOTP')

        if(!result) return res.status(500).json({"error": "invalid_response", "message":"Invalid response data."})

        if(result.recordset[0]){
            const data = result.recordset[0];
            return res.status(200).json({"data":data, "status":"SUCCESS"});
        }else{
            return res.status(500).json({"error": "invalid_response", "message":"Invalid response data."})
        }
    } catch (error:any) {
        console.error(error);
        const errCode = error.code;
        const errInfo = error.originalError.info;
        res.status(500).json({"error": "error_request", "message": `[${errCode}] ${errInfo.message}`});
    }
}
const CheckShopID = async (req:Request, res:Response) => {
    try {
        const { shopId } = req.params;

        const pool = await sql.connect(mssqlThanvasuInfo);
        const result = await pool.request()
            .input('ShopCode', sql.NVarChar, shopId)
            .execute('Sp_CRM_CheckShopID')

        if(!result) return res.status(500).json({"error": "invalid_response", "message":"Invalid response data."})

        if(result.recordset[0]){
            const data = result.recordset[0];
            return res.status(200).json({"data":data, "status":"SUCCESS"});
        }else{
            return res.status(500).json({"error": "invalid_response", "message":"Invalid response data."})
        }
    } catch (error:any) {
        console.error(error);
        const errCode = error.code;
        const errInfo = error.originalError.info;
        res.status(500).json({"error": "error_request", "message": `[${errCode}] ${errInfo.message}`});
    }
}
const ExpPoint = async (req:Request, res:Response) => {
    try {
        const { memCardId, shopCode } = req.query;

        const pool = await sql.connect(mssqlThanvasuInfo);
        const result = await pool.request()
            .input('MEMCARDID', sql.NVarChar, memCardId)
            .input('ShopCode', sql.NVarChar, shopCode)
            .execute('Sp_CRM_ExpPoint')

        if(!result) return res.status(500).json({"error": "invalid_response", "message":"Invalid response data."})

        if(result.recordset[0]){
            if(result.recordset){
                const data = result.recordset;
                return res.status(200).json({"data":data, "status":"SUCCESS"});
            }else{
                return res.status(500).json({"error": "invalid_response", "message":"Invalid response data"})
            }
        }else{
            return res.status(500).json({"error": "invalid_response", "message":"Invalid response data."})
        }
    } catch (error:any) {
        console.error(error);
        const errCode = error.code;
        const errInfo = error.originalError.info;
        res.status(500).json({"error": "error_request", "message": `[${errCode}] ${errInfo.message}`});
    }
}
const InsertCouponByMemCard = async (req:Request, res:Response) => {
    try {
        const { memCardId, productId, shopCode, remark } = req.body;

        const pool = await sql.connect(mssqlThanvasuInfo);
        const result = await pool.request()
            .input('MemCardID', sql.NVarChar, memCardId)
            .input('ProductID', sql.Int, productId)
            .input('ShopCode', sql.NVarChar, shopCode)
            .input('Remark', sql.NVarChar, remark)
            .execute('Sp_CRM_InsertCouponByMemCard')

        if(!result) return res.status(500).json({"error": "invalid_response", "message":"Invalid response data"})

        if(result.recordset[0]){
            const data = result.recordset[0];
            return res.status(200).json({"data":data, "status":"SUCCESS"});
        }else{
            return res.status(500).json({"error": "invalid_response", "message":"Invalid response data"})
        }

    } catch (error:any) {
        console.error(error);
        const errCode = error.code;
        const errInfo = error.originalError.info;
        res.status(500).json({"error": "error_request", "message": `[${errCode}] ${errInfo.message}`});
    }
}
const InsertMemCard = async (req:Request, res:Response) => {
    try {
        const register = req.body;

        const pool = await sql.connect(mssqlThanvasuInfo);
        const result = await pool.request()
            .input('CardId', sql.NVarChar, register.cardId)
            .input('Name', sql.NVarChar, register.name)
            .input('Sex', sql.VarChar, register.sex)
            .input('BirthDate', sql.Date, register.birthDate)
            .input('Tel', sql.NVarChar, register.tel)
            .input('Address', sql.NVarChar, register.address)
            .input('Email', sql.NVarChar, register.email)
            .input('LineID', sql.NVarChar, register.lineId)
            .input('ShopCode', sql.NVarChar, register.shopCode)
            .input('Consent1', sql.Int, register.consent1)
            .input('Consent2', sql.Int, register.consent2)
            .input('CreateBy', sql.VarChar, register.createBy)
            .execute('Sp_CRM_InsertMemCard');

        if(!result) return res.status(500).json({"error": "invalid_response", "message":"Invalid response data"})

        if(result.recordset[0]){
            const data = result.recordset[0];
            return res.status(200).json({"data":data, "status":"SUCCESS"});
        }else{
            return res.status(500).json({"error": "invalid_response", "message":"Invalid response data"})
        }
    } catch (error:any) {
        console.error(error);
        const errCode = error.code;
        const errInfo = error.originalError.info;
        res.status(500).json({"error": "error_request", "message": `[${errCode}] ${errInfo.message}`});
    }
}
const InsertOTP = async (req:Request, res:Response) => {
    try {
        const {memCardID, tel, otpCode, otpType} = req.body;

        const pool = await sql.connect(mssqlThanvasuInfo);
        const result = await pool.request()
            .input('MemCardID', sql.NVarChar, memCardID)
            .input('TelNo', sql.NVarChar, tel)
            .input('OTP', sql.NVarChar, otpCode)
            .input('OTPType', sql.NVarChar, otpType)
            .execute('Sp_CRM_InsertOTP')

        if(!result) return res.status(500).json({"error": "invalid_response", "message":"Invalid response data"})

        if(result.recordset[0]){
            const data = result.recordset[0];
            return res.status(200).json({"data":data, "status":"SUCCESS"});
        }else{
            return res.status(500).json({"error": "invalid_response", "message":"Invalid response data"})
        }
    } catch (error:any) {
        console.error(error);
        const errCode = error.code;
        const errInfo = error.originalError.info;
        res.status(500).json({"error": "error_request", "message": `[${errCode}] ${errInfo.message}`});
    }
}
const MemCardCheckExists = async (req:Request, res:Response) => {
    try {
        const { tel, lineId } = req.query;

        const pool = await sql.connect(mssqlThanvasuInfo);
        const result = await pool.request()
            .input('Tel', sql.NVarChar, tel)
            .input('LineID', sql.NVarChar, lineId)
            .execute('Sp_CRM_MemCardCheckExists');

        if(!result) return res.status(500).json({"error": "invalid_response", "message":"Invalid response data"})

        if(result.recordset[0]){
            const data = result.recordset[0];
            return res.status(200).json({"data":data, "status":"SUCCESS"});
        }else{
            return res.status(500).json({"error": "invalid_response", "message":"Invalid response data"})
        }
    } catch (error:any) {
        console.error(error);
        const errCode = error.code;
        const errInfo = error.originalError.info;
        res.status(500).json({"error": "error_request", "message": `[${errCode}] ${errInfo.message}`});
    }
}
const PromotionList = async (req:Request, res:Response) => {
    try {
        const { memCardId, shopCode, cpType, productId } = req.query;

        const pool = await sql.connect(mssqlThanvasuInfo);
        const result = await pool.request()
            .input('MEMCARDID', sql.NVarChar, memCardId)
            .input('ShopCode', sql.NVarChar, shopCode)
            .input('CPType', sql.NVarChar, cpType)
            .input('ProductID', sql.NVarChar, productId)
            .execute('Sp_CRM_PromotionList');

        if(!result) return res.status(500).json({"error": "invalid_response", "message":"Invalid response data"})

        if(result.recordset){
            const data = result.recordset;
            return res.status(200).json({"data":data, "status":"SUCCESS"});
        }else{
            return res.status(500).json({"error": "invalid_response", "message":"Invalid response data"})
        }
    } catch (error:any) {
        console.error(error);
        const errCode = error.code;
        const errInfo = error.originalError.info;
        res.status(500).json({"error": "error_request", "message": `[${errCode}] ${errInfo.message}`});
    }
}
const SelectCashCard = async (req:Request, res:Response) => {
    try {
        const { memCardId } = req.params;

        const pool = await sql.connect(mssqlThanvasuInfo);
        const result = await pool.request()
            .input('MemCardID', sql.NVarChar, memCardId)
            .execute('Sp_CRM_SelectCashCard');

        if(!result) return res.status(500).json({"error": "invalid_response", "message":"Invalid response data"})

        if(result.recordset){
            const data = result.recordset;
            return res.status(200).json({"data":data, "status":"SUCCESS"});
        }else{
            return res.status(500).json({"error": "invalid_response", "message":"Invalid response data"})
        }
    } catch (error:any) {
        console.error(error);
        const errCode = error.code;
        const errInfo = error.originalError.info;
        res.status(500).json({"error": "error_request", "message": `[${errCode}] ${errInfo.message}`});
    }
}
const SelectMemCard = async (req:Request, res:Response) => {
    try {
        const { memCardId } = req.params;

        const pool = await sql.connect(mssqlThanvasuInfo);
        const result = await pool.request()
            .input('MemCardID', sql.NVarChar, memCardId)
            .execute('Sp_CRM_SelectMemCard');

        if(!result) return res.status(500).json({"error": "invalid_response", "message":"Invalid response data"})

        if(result.recordset){
            const data = result.recordset;
            return res.status(200).json({"data":data, "status":"SUCCESS"});
        }else{
            return res.status(500).json({"error": "invalid_response", "message":"Invalid response data"})
        }
    } catch (error:any) {
        console.error(error);
        const errCode = error.code;
        const errInfo = error.originalError.info;
        res.status(500).json({"error": "error_request", "message": `[${errCode}] ${errInfo.message}`});
    }
}
const ShopBanner = async (req:Request, res:Response) => {
    try {
        const { shopCode } = req.params;

        const pool = await sql.connect(mssqlThanvasuInfo);
        const result = await pool.request()
            .input('ShopCode', sql.NVarChar, shopCode)
            .execute('Sp_CRM_ShopBanner')

        if(!result) return res.status(500).json({"error": "invalid_response", "message":"Invalid response data"})

        if(result.recordset){
            const data = result.recordset;
            return res.status(200).json({"data":data, "status":"SUCCESS"});
        }else{
            return res.status(500).json({"error": "invalid_response", "message":"Invalid response data"})
        }
    } catch (error:any) {
        console.error(error);
        const errCode = error.code;
        const errInfo = error.originalError.info;
        res.status(500).json({"error": "error_request", "message": `[${errCode}] ${errInfo.message}`});
    }
}
const ShopCode = async (req:Request, res:Response) => {
    try {
        const { shopCode } = req.params;
        const pool = await sql.connect(mssqlThanvasuInfo);
        const result = await pool.request()
            .input('ShopCode', sql.NVarChar, shopCode)
            .execute('Sp_CRM_ShopCode');
        
        if(!result) return res.status(500).json({"error": "invalid_response", "message":"Invalid response data"})

        if(result.recordset){
            const data = result.recordset;
            return res.status(200).json({"data":data, "status":"SUCCESS"});
        }else{
            return res.status(500).json({"error": "invalid_response", "message":"Invalid response data"})
        }
    } catch (error:any) {
        console.error(error);
        const errCode = error.code;
        const errInfo = error.originalError.info;
        res.status(500).json({"error": "error_request", "message": `[${errCode}] ${errInfo.message}`});
    }
}
const ShopCPType = async (req:Request, res:Response) => {
    try {
        const { shopCode } = req.params;

        const pool = await sql.connect(mssqlThanvasuInfo);
        const result = await pool.request()
            .input('ShopCode', sql.NVarChar, shopCode)
            .execute('Sp_CRM_ShopCPType');
        
        if(!result) return res.status(500).json({"error": "invalid_response", "message":"Invalid response data"})

        if(result.recordset){
            const data = result.recordset;
            return res.status(200).json({"data":data, "status":"SUCCESS"});
        }else{
            return res.status(500).json({"error": "invalid_response", "message":"Invalid response data"})
        }
    } catch (error:any) {
        console.error(error);
        const errCode = error.code;
        const errInfo = error.originalError.info;
        res.status(500).json({"error": "error_request", "message": `[${errCode}] ${errInfo.message}`});
    }
}
const TrnPoint = async (req:Request, res:Response) => {
    try {
        const { memCardId } = req.params;

        const pool = await sql.connect(mssqlThanvasuInfo);
        const result = await pool.request()
            .input('MEMCARDID', sql.NVarChar, memCardId)
            .execute('Sp_CRM_TrnPoint');

        if(!result) return res.status(500).json({"error": "invalid_response", "message":"Invalid response data"})

        if(result.recordset){
            const data = result.recordset;
            return res.status(200).json({"data":data, "status":"SUCCESS"});
        }else{
            return res.status(500).json({"error": "invalid_response", "message":"Invalid response data"})
        }
    } catch (error:any) {
        console.error(error);
        const errCode = error.code;
        const errInfo = error.originalError.info;
        res.status(500).json({"error": "error_request", "message": `[${errCode}] ${errInfo.message}`});
    }
}
const UpdateMemCard = async (req:Request, res:Response) => {
    try {
        const member = req.body;

        const pool = await sql.connect(mssqlThanvasuInfo);
        const result = await pool.request()
            .input('MemCardID', sql.NVarChar, member.memCardId)
            .input('CardId', sql.NVarChar, member.cardId)
            .input('Name', sql.NVarChar, member.name)
            .input('Sex', sql.VarChar, member.sex)
            .input('BirthDate', sql.Date, member.birthDate)
            .input('Tel', sql.NVarChar, member.tel)
            .input('Address', sql.NVarChar, member.address)
            .input('Email', sql.NVarChar, member.email)
            .input('LineID', sql.NVarChar, member.lineId)
            .input('ShopCode', sql.NVarChar, member.shopCode)
            .input('Consent1', sql.Int, member.consent1)
            .input('Consent2', sql.Int, member.consent2)
            .input('CreateBy', sql.VarChar, member.createBy)
            .execute('Sp_CRM_UpdateMemCard');

        if(!result) return res.status(500).json({"error": "invalid_response", "message":"Invalid response data"})

        if(result.recordset[0]){
            const data = result.recordset[0];
            return res.status(200).json({"data":data, "status":"SUCCESS"});
        }else{
            return res.status(500).json({"error": "invalid_response", "message":"Invalid response data"})
        }
    } catch (error:any) {
        console.error(error);
        const errCode = error.code;
        const errInfo = error.originalError.info;
        res.status(500).json({"error": "error_request", "message": `[${errCode}] ${errInfo.message}`});
    }
}
const UpdateMemCard_Level = async (req:Request, res:Response) => {
    try {
        const { memCardId } = req.body;
        
        const pool = await sql.connect(mssqlThanvasuInfo);
        const result = await pool.request()
            .input('MemCardID', sql.NVarChar, memCardId)
            .execute('Sp_CRM_UpdateMemCard_Level');

        if(!result) return res.status(500).json({"error": "invalid_response", "message":"Invalid response data"})

        if(result.recordset){
            const data = result.recordset;
            return res.status(200).json({"data":data, "status":"SUCCESS"});
        }else{
            return res.status(500).json({"error": "invalid_response", "message":"Invalid response data"})
        }
    } catch (error:any) {
        console.error(error);
        const errCode = error.code;
        const errInfo = error.originalError.info;
        res.status(500).json({"error": "error_request", "message": `[${errCode}] ${errInfo.message}`});
    }
}

export default {
    AddrDistrict,
    AddrProvince,
    CheckExistedLineID,
    CheckExistedTelNo,
    CheckOTP,
    CheckShopID,
    ExpPoint,
    InsertCouponByMemCard,
    InsertMemCard,
    InsertOTP,
    MemCardCheckExists,
    PromotionList,
    SelectCashCard,
    SelectMemCard,
    ShopBanner,
    ShopCode,
    ShopCPType,
    TrnPoint,
    UpdateMemCard,
    UpdateMemCard_Level
}