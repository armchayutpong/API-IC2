import { Request, Response } from "express";
import sql from "mssql";

// Config DB
import { mssqlThanvasuInfo } from "../config/db.config";

const getMember = (req:Request, res:Response) => {
    try {
        const memCardId = req.params.id;
        if(!memCardId) return res.json({error:"error", message:"Invalid member id"})

        sql.connect(mssqlThanvasuInfo).then(pool => {
            return pool.request()
                .input('MemCardID', sql.NVarChar, memCardId)
                .execute('Sp_CRM_SelectMemCard')
        }).then(result => {
            const { recordset } = result;
            if(recordset && recordset[0]){
                res.status(200).json({"data":recordset[0], "status":"SUCCESS"});
            }else{
                res.status(200).json({"message":"Member not found", "status":"FAIL"});
            }
        }).catch(err => {
            console.error(err);
            const errCode = err.code;
            const errInfo = err.originalError.info;
            res.status(500).json({'error': errCode, message: errInfo.message });
        })
    } catch (error) {
        console.error(error)
        res.status(500).json(error);
    }
}

export {
    getMember
}