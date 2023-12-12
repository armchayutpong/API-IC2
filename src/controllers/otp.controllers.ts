import "dotenv/config"
import { Request, Response } from "express";
import sql from 'mssql';

// Config database
import { mssqlThanvasuInfo } from "../config/db.config";
import { baseOtpVerify, baseOtpResend, baseOtpSend, smsOtpSend } from "../config/otp.config";

//Uitility
import { validationOTP } from "../utility/validationRequstData";

// Gennerate OTP
import generateOTP from "../utility/generateOtp";

// Type 
type GenOTP = {
    otpCode:string,
    otpRef:string,
}

// Ants OTP
const postOtpSend = async (req:Request, res:Response) => {
    try {
        const { tel } = req.body;
        if(!tel) return res.status(400).json({ "error": "invalid_request", "message": `Invalid tel.`});

        // Set value
        const session:any = req.session;
        const smsUser = btoa(session.store.BulkSms_USER+':'+session.store.BulkSms_PASS);
        baseOtpSend.mobile = tel;

        const response = await fetch('https://api-service.ants.co.th/otp/requestOTP', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${smsUser}`
              },
            body: JSON.stringify(baseOtpSend),
        })
        const data = await response.json();
        if(data.success.message === "Success"){
            delete data.otcId;
            return res.status(200).json({
                "data": data,
                "message": "The OTP has been sent successfully.",
                "status": "SUCCESS",
            });
        }else{
            return res.status(200).json({
                "error": "invalid_response",
                "message": "The response of the SMS service provider is incorrect.",
                "status": "FAIL"
            });
        }
    } catch (error:any) {
        console.error(error);
        const errCode = error.code;
        const errInfo = error.originalError.info;
        res.status(500).json({"error": "error_request", "message": `[${errCode}] ${errInfo.message}`});
    }
}
const postOtpResend = async (req:Request, res:Response) => {
    try {
        const { otpId } = req.body;
        if(!otpId) return res.status(400).json({ "error": "invalid_request", "message": 'Invalid otpId'});

        // Set value
        const session:any = req.session;
        const smsUser = btoa(session.store.BulkSms_USER+':'+session.store.BulkSms_PASS);
        baseOtpResend.otpId = otpId;

        const response = await fetch('https://api-service.ants.co.th/otp/resendOTP', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${smsUser}`
              },
            body: JSON.stringify(baseOtpResend),
        })
        const data = await response.json();
        if(!data || data.error){
            return res.status(200).json({
                "data": data,
                "message": "The response of the SMS service provider is incorrect.",
                "status": "FAIL"
            });
        }else if(data.success.message == "Success"){
            delete data.otcId;
            return res.status(200).json({
                "data": data,
                "message": "The OTP has been resent successfully.",
                "status": "SUCCESS",
            });
        }
    } catch (error:any) {
        console.error(error);
        const errCode = error.code;
        const errInfo = error.originalError.info;
        res.status(500).json({"error": "error_request", "message": `[${errCode}] ${errInfo.message}`});
    }
}
const postOtpVerify = async (req:Request, res:Response) => {
    try {
        const {otpId, otpCode} = req.body;
        if(!otpId || !otpCode) return res.status(400).json({ "error": "invalid_request", "message": 'Invalid otpId or otpCode'});

        // Set value
        const session:any = req.session;
        const smsUser = btoa(session.store.BulkSms_USER+':'+session.store.BulkSms_PASS);
        baseOtpVerify.otpId = otpId;
        baseOtpVerify.otpCode = otpCode;


        const response = await fetch('https://api-service.ants.co.th/otp/verifyOTP', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${smsUser}`
                },
            body: JSON.stringify(baseOtpVerify),
        })
        const data = await response.json();
        if(data){
            return res.status(200).json({
                "data": data,
                "message": "OTP verified successfully.",
                "status": "SUCCESS",
            });
        }else{
            return res.status(500).json({"error": "invalid_response", "message": "The response of the SMS service provider is incorrect."});
        }
    } catch (error:any) {
        console.error(error);
        const errCode = error.code;
        const errInfo = error.originalError.info;
        res.status(500).json({"error": "error_request", "message": `[${errCode}] ${errInfo.message}`});
    }
}
// Ants SMS set from OTP
const postOtpSmsSend = async (req:Request, res:Response) => {
    try {
        // Validation request body
        const validation = Object.entries(req.body).filter(([key, value]) => validationOTP(key, value));
        if(validation && validation.length > 0) return res.status(400).json({"error":"invalid_request", "message": `Invalid ${validation.map((value)=>value[0])}.`});

        const { memCardID, tel, otpType} = req.body;

        // Generate OTP
        const otp:GenOTP = generateOTP();
        const otpCode = otp.otpCode;

        // Set value
        const session:any = req.session;
        const smsUser = btoa(session.store.BulkSms_USER+':'+session.store.BulkSms_PASS);
        smsOtpSend.messages[0].from = session.store.OTPSenderName;
        smsOtpSend.messages[0].text = `รหัส OTP คือ ${otpCode} สำหรับยืนยันเป็นสมาชิก CRM iChapter`;
        smsOtpSend.messages[0].destinations[0].to = "66"+tel.slice(1);

        if(otpCode){
            const pool = await sql.connect(mssqlThanvasuInfo);
            const result = await pool.request()
                .input('MemCardID', sql.NVarChar, memCardID)
                .input('TelNo', sql.NVarChar, tel)
                .input('OTP', sql.NVarChar, otpCode)
                .input('OTPType', sql.NVarChar, otpType)
                .execute('Sp_CRM_InsertOTP')

            if(!result) return res.status(500).json({"error": "invalid_response", "message": "Invalid OTP response"});

            if(result.recordset[0]){
                const response = await fetch('https://api-service.ants.co.th/sms/send', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Basic ${smsUser}`
                    },
                    body: JSON.stringify(smsOtpSend)
                })
                const data = await response.json();
                if(data){
                    if(data.error) return res.status(200).json({"data": data, "status": "FAIL" });
                    return res.status(200).json({"data": data.details[0].status, "status": "SUCCESS" });
                }
            }else{
                return res.status(500).json({"error": "invalid_response", "message": "Invalid OTP response"});
            }
        }
    } catch (error:any) {
        console.error(error);
        const errCode = error.code;
        const errInfo = error.originalError.info;
        res.status(500).json({"error": "error_request", "message": `[${errCode}] ${errInfo.message}`});
    }
}
const postOtpSmsVerify = async (req:Request, res:Response) => {
    try {
        // Validation request body
        const validation = Object.entries(req.body).filter(([key, value]) => validationOTP(key, value));
        if(validation && validation.length > 0) return res.status(400).json({"error": "invalid_request", "message": `Invalid ${validation.map((value)=>value[0])}.`});
    
        const { memCardID, tel, otpCode, otpType} = req.body;

        const pool = await sql.connect(mssqlThanvasuInfo);
        const result = await pool.request()
            .input('MemCardID', sql.NVarChar, memCardID)
            .input('TelNo', sql.NVarChar, tel)
            .input('OTP', sql.NVarChar, otpCode)
            .input('OTPType', sql.NVarChar, otpType)
            .execute('Sp_CRM_CheckOTP')

        if(!result) return res.status(500).json({"error": "invalid_response", "message": "Invalid OTP response"});

        if(result.recordset[0]){
            return res.status(200).json({"data": result.recordset[0], "status": "SUCCESS"});
        }else{
            return res.status(500).json({"error": "invalid_response", "message": "Invalid OTP response"});
        }
    } catch (error:any) {
        console.error(error);
        const errCode = error.code;
        const errInfo = error.originalError.info;
        res.status(500).json({"error": "error_request", "message": `[${errCode}] ${errInfo.message}`});
    }
}

export default {
    postOtpSmsSend,
    postOtpSmsVerify
}