import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import sql from "mssql"

// Config database
import { mssqlThanvasuInfo } from "../config/db.config";

// .end 
const ACCESS_TOKEN_SECRET:any = process.env.ACCESS_TOKEN_SECRET;
const JWT_EXPIRES:any = process.env.JWT_EXPIRES;

//Uitility
import { validationTel } from "../utility/validationRequstData"

const postTelAuthen = async (req:Request, res:Response) => {
    try {
        const validation = Object.entries(req.body).filter(([key, value]) => validationTel(key, value));

        // validation check requst body
        if(validation && validation.length > 0) return res.status(400).json({ "error": "invalid_request", "message": `Invalid '${validation.map((value)=>value[0])}'.`});

        const {tel, lineId} = req.body;

        const pool = await sql.connect(mssqlThanvasuInfo);
        const resultCehckTel = await pool.request()
            .input('TelNo', sql.NVarChar, tel)
            .input('LineID', sql.NVarChar, lineId)
            .execute('Sp_CRM_CheckExistedTelNo')

        if(!resultCehckTel) return res.status(500).json({"error": "invalid_response", "message":"Invalid Tel response."})

        console.log(Boolean(resultCehckTel.recordset[0]))

        if(resultCehckTel.recordset[0]){
            const dataTel = resultCehckTel.recordset[0];

            if(dataTel.StatusFlag == "N"){
                return res.status(200).json({"data": dataTel, "status":"SUCCESS"});
            }else if(dataTel.StatusFlag == "Y"){
                const accessToken = jwt.sign({tel: tel}, ACCESS_TOKEN_SECRET, { expiresIn: JWT_EXPIRES });
                return res.status(200).json({"data": {...dataTel, accessToken}, "status":"SUCCESS"});
            }
        }
        return res.status(500).json({"error": "invalid_response", "message":"Invalid response data."})

    } catch (error:any) {
        console.error(error);
        const errCode = error.code;
        const errInfo = error.originalError.info;
        res.status(500).json({"error": "error_request", "message": `[${errCode}] ${errInfo.message}`});
    }
}

export default {
    postTelAuthen
}