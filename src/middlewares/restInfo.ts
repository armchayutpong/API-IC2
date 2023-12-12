import "dotenv/config"
import { Request, Response, NextFunction } from "express"
import { mssqlThanvasuInfo } from "../config/db.config";

const BASE_URL_WEB_INFO_AUTH = process.env.BASE_URL_WEB_INFO_AUTH;
const REST_ID = process.env.REST_ID;

const getServerName_DataSource = (dataSource:string) => {
    const strStart = "Data Source=";
    const strEnd = ";";
    let pointDataSource:number = dataSource.search(strStart);

    if(pointDataSource === 0){ //Found is 0 , not found is -1
        const positionStart = strStart.length;
        const positionEnd = dataSource.search(strEnd);
        return dataSource.substring(positionStart, positionEnd);
    }
}

const validationRestInfo = async (req:Request, res:Response, next:NextFunction) => {
    const session:any = req.session;
    if(!session.store){
        const response = await fetch(`${BASE_URL_WEB_INFO_AUTH}/auth/rest`, {
            method: "POST",
            cache: 'force-cache',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                "RestID": REST_ID
            })
        });
        const result = await response.json();
        const data = result.data[0];

        if(!data) return res.status(401).json({error: "error", message: "Invalid rest id"});

        // Setting config
        let serverName;
        if(data.RestServerName === "." || data.RestServerName2 === "."){
            serverName = getServerName_DataSource(data.RestStrConn);
        }else{
            data.RestServerName === "."? serverName = data.RestServerName2 : serverName = data.RestServerName;
        }
        mssqlThanvasuInfo.server = serverName,
        mssqlThanvasuInfo.user = data.RestUserName;
        mssqlThanvasuInfo.password = data.RestPassword,
        mssqlThanvasuInfo.database = data.RestDBName,

        // Setting session store
        session.store = data;
        console.log("No Store")
        next();
    }else{
        console.log("The Store already exists")
        next();
    }
}

export {
    validationRestInfo
}