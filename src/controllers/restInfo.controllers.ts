import "dotenv/config"
import { Request, Response } from "express";

const REST_ID = process.env.REST_ID;
const BASE_URL_WEB_INFO_AUTH = process.env.BASE_URL_WEB_INFO_AUTH;

type RestInfo = {
    RestName: string,
    RestBranchNo: number,
    RestImgUrl_Logo: string,
    RestImgUrl_BannerRoot: string,
    RestImgUrl_BannerImg: string,
    RestImgUrl_BannerImgFull: string[],
    RestImgUrl_Banner1: string,
    RestImgUrl_Banner2: string,
    RestImgUrl_Banner3: string
    RestImgUrl_Product: string,
    RestConcentRow1: string,
    RestConcentRow2: string,
    RestConcentRegText: string,
    RestConcentRegText2: string,
}

const getRestInfo = async (req:Request, res:Response) => {
    try {
        const response = await fetch(`${BASE_URL_WEB_INFO_AUTH}/auth/rest`, {
            method: "POST",
            cache: 'force-cache',
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                "RestID": REST_ID
            })
        })
        const result = await response.json();

        // Check response
        if(!result && !result.data || result.data.length == 0) return res.status(401).json({error: "error", message: "Invalid rest id"});
    
        // Set response to user
        if(result.data[0]){
            const resData = result.data[0];
            const data:RestInfo = {
                "RestName": resData.RestName,
                "RestBranchNo": resData.RestBranchNo,
                "RestImgUrl_Logo": resData.RestImgUrl_Logo,
                "RestImgUrl_BannerRoot": resData.RestImgUrl_BannerRoot,
                "RestImgUrl_BannerImg": resData.RestImgUrl_BannerImg,
                "RestImgUrl_BannerImgFull": [],
                "RestImgUrl_Banner1": resData.RestImgUrl_Banner1,
                "RestImgUrl_Banner2": resData.RestImgUrl_Banner2,
                "RestImgUrl_Banner3": resData.RestImgUrl_Banner3,
                "RestImgUrl_Product": resData.RestImgUrl_Product,
                "RestConcentRow1": resData.RestConcentRow1,
                "RestConcentRow2": resData.RestConcentRow2,
                "RestConcentRegText" : resData.RestConcentRegText,
                "RestConcentRegText2" : resData.RestConcentRegText2
            }

            const bannerImg = data.RestImgUrl_BannerImg.split(",");
            bannerImg.map((value:string) => {
                data.RestImgUrl_BannerImgFull.push(data.RestImgUrl_BannerRoot + value);
            })
            return res.status(200).json({"data": data, "status":"SUCCESS"});
        }else{
            return res.status(200).json({"message": "Not found rest id", "status":"FAIL"});
        }
    } catch (error:any) {
        console.error(error);
        const errCode = error.code;
        const errInfo = error.originalError.info;
        res.status(500).json({"error": "error_request", "message": `[${errCode}] ${errInfo.message}`});
    }
}

export {
    getRestInfo
}