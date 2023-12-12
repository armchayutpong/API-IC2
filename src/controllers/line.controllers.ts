import "dotenv/config"
import { Request, Response } from "express";
import sql from "mssql";
import jwt from "jsonwebtoken";

// .end 
const ACCESS_TOKEN_SECRET:any = process.env.ACCESS_TOKEN_SECRET;
const JWT_EXPIRES:any = process.env.JWT_EXPIRES;
const BASE64_AUTH = 'Basic '+btoa(process.env.SMS_SERDER+':'+process.env.SMS_PASSWORD);

// Type 
type Register = {
    cardId: number,
    name: string,
    sex: string,
    birthDate: string,
    tel: string,
    address? :string,
    email: string,
    lineId: string,
    shopCode?: string,
    consent1: number,
    consent2? : number,
    createBy: string,
    otpId?:string,
    otpCode:string
}

// Config database
import { mssqlThanvasuInfo } from "../config/db.config";

// Route controllers
const postAuthenticate = async (req:Request, res:Response) => {
    try {
        const { lineId } = req.body;
        if(!lineId) return res.status(400).json({"error": "invalid_request", "message": "Invalid lineId."})

        const pool = await sql.connect(mssqlThanvasuInfo);
        const result = await pool.request()
            .input('LineID', sql.NVarChar, lineId)
            .execute('Sp_CRM_CheckExistedLineID')

        if(!result) return res.status(500).json({"error": "invalid_response", "message":"Invalid check user id."}) 

        if(result.recordset[0]){
            const data = result.recordset[0];
            if(data.StatusFlag == "Y") data.accessToken = jwt.sign({user: lineId}, ACCESS_TOKEN_SECRET, { expiresIn: JWT_EXPIRES });
            return res.status(200).json({"data":data, "status":"SUCCESS"});
        }else{
            return res.status(500).json({"error": "invalid_response", "message":"Invalid check user id."})
        }
    } catch (error:any) {
        console.error(error);
        const errCode = error.code;
        const errInfo = error.originalError.info;
        res.status(500).json({"error": "error_request", "message": `[${errCode}] ${errInfo.message}`});
    }
}

export default {
    postAuthenticate,
}