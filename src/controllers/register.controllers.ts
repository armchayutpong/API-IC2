import "dotenv/config"
import { Request, Response } from "express";
import sql from "mssql";
import jwt from "jsonwebtoken";

// .end 
const ACCESS_TOKEN_SECRET:any = process.env.ACCESS_TOKEN_SECRET;
const JWT_EXPIRES:any = process.env.JWT_EXPIRES;

// Config database
import { mssqlThanvasuInfo } from "../config/db.config";
import { baseOtpVerify } from "../config/otp.config";

//Uitility
import { validationRegister } from "../utility/validationRequstData";

// Type Register
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
    otpId?: string,
    otpCode: string
}

// [CANCEL] Register by ants OTP
const CANCEL_postRegister = async (req:Request, res:Response) => {
    try {
        const register:Register = req.body;
        const validation = Object.entries(register).filter(([key, value]) => validationRegister(key, value));

        // validation check requst body
        if(validation && validation.length > 0) return res.status(400).json({ "error": "invalid_request", "message": `Invalid '${validation.map((value)=>value[0])}'.`});

        // Set value
        const session:any = req.session;
        const smsUser = btoa(session.store.BulkSms_USER+':'+session.store.BulkSms_PASS);
        // baseOtpVerify.otpId = register.otpId;
        // baseOtpVerify.otpCode = register.otpCode;

        const response = await fetch('https://api-service.ants.co.th/otp/verifyOTP', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${smsUser}`
                },
            body: JSON.stringify(baseOtpVerify),
        })
        const data = await response.json();
        if(data.result == true){
            const pool = await sql.connect(mssqlThanvasuInfo);
            const resultMem = await pool.request()
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
                .execute('Sp_CRM_InsertMemCard')

            if(resultMem && resultMem.recordset[0]){
                const MEMCARDID = resultMem.recordset[0].MEMCARDID;
                if(MEMCARDID == "0"){
                    return res.status(200).json({...resultMem.recordset[0], "status": "FAIL"});
                }else{
                    const accessToken  = jwt.sign({user: register.lineId}, ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
                    return res.status(200).json({...resultMem.recordset[0], "status": "SUCCESS", "accessToken":accessToken});
                }
            } 
            res.status(500).json({"error": "invalid_response", "message": "Invalid response resgister"});
        
        }else if(data.result == false){
            res.status(200).json({
                "data": data,
                "message": "Invalid OTP.",
                "status": "FAIL"
            })
        }else{
            res.status(500).json({"error": "invalid_response", "message": "The response of the SMS service provider is incorrect."});
        }
    } catch (error:any) {
        console.error(error);
        const errCode = error.code;
        const errInfo = error.originalError.info;
        res.status(500).json({"error": "error_request", "message": `[${errCode}] ${errInfo.message}`});
    }
}
const postRegister = async (req:Request, res:Response) => {
    try {
        const validation = Object.entries(req.body).filter(([key, value]) => validationRegister(key, value));
        if(validation && validation.length > 0) return res.status(400).json({ "error": "invalid_request", "message": `Invalid '${validation.map((value)=>value[0])}'.`}).end();
        
        const register:Register = req.body;
        
        // Get SP check check OTP
        const pool = await sql.connect(mssqlThanvasuInfo);
        const resultOTP = await pool.request()
            .input('MemCardID', sql.NVarChar, '')
            .input('TelNo', sql.NVarChar, register.tel)
            .input('OTP', sql.NVarChar, register.otpCode)
            .input('OTPType', sql.NVarChar, 'Register')
            .execute('Sp_CRM_CheckOTP')

        if(!resultOTP) return res.status(500).json({"error": "invalid_response", "message": "Invalid OTP response"});
        
        if(resultOTP.recordset[0]){
            const dataOTP = resultOTP.recordset[0];
            
            if(dataOTP.Result == "Fail"){
                res.status(200).json({"data": resultOTP.recordset[0], "status":"FAIL"});
            }else if(dataOTP.Result == "Success"){
                const resultMem = await pool.request()
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
                    .execute('Sp_CRM_InsertMemCard')

                if(!resultMem) return res.status(500).json({"error": "invalid_response", "message": "Invalid register"});

                const MEMCARDID = resultMem.recordset[0].MEMCARDID;
                if(MEMCARDID == "0"){
                    return res.status(200).json({data:resultMem.recordset[0], "status": "FAIL"});
                }else{
                    const accessToken  = jwt.sign({user: register.lineId}, ACCESS_TOKEN_SECRET, { expiresIn: JWT_EXPIRES });
                    return res.status(200).json({data: {...resultMem.recordset[0], "accessToken": accessToken}, "status": "SUCCESS"});
                }
            }
        }else{
            res.status(500).json({ "error": "invalid_response", "message": "Invalid response otp"});
        }
    } catch (error:any) {
        console.error(error);
        const errCode = error.code;
        const errInfo = error.originalError.info;
        res.status(500).json({"error": "error_request", "message": `[${errCode}] ${errInfo.message}`});
    }
}

export default {
    postRegister
}