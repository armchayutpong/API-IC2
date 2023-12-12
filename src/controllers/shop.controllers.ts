import { Request, Response } from "express";
import sql from "mssql";

// Config DB
import { mssqlThanvasuInfo } from "../config/db.config";

const getShop = (req:Request, res:Response) =>{
    try {
        sql.connect(mssqlThanvasuInfo).then(pool=>{
            return pool.request()
                .input('ShopCode', sql.NVarChar, "0")
                .execute("Sp_CRM_ShopCode")
        }).then(result => {
            const { recordset } = result;
            if(recordset && recordset[0]){
                res.status(200).json({"data":recordset, "status":"SUCCESS"});
            }else{
                res.status(200).json({"message":"Shop not found", "status":"FAIL"});
            }
        }).catch(err => {
            console.error(err);
            const errCode = err.code;
            const errInfo = err.originalError.info;
            res.status(500).json({'error': errCode, message: errInfo.message });
        })
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}
const getShopCode = (req:Request, res:Response) => {
    const { ShopCode } = req.params;
    try {
        sql.connect(mssqlThanvasuInfo).then(pool =>{
            return pool.request()
            .input("ShopCode", sql.NVarChar, ShopCode)
            .execute("Sp_CRM_ShopCode")
        }).then(result =>{
            const { recordset } = result;
            if(recordset && recordset[0]){
                res.status(200).json({"data":recordset[0], "status":"SUCCESS"});
            }else{
                res.status(200).json({"message":"Shop not found", "status":"FAIL"});
            }
        }).catch(err=>{
            console.error(err);
            const errCode = err.code;
            const errInfo = err.originalError.info;
            res.status(500).json({'error': errCode, message: errInfo.message });
        })
    } catch (error) {
        res.status(500).json(error);
    }
}

export {
    getShop,
    getShopCode
}