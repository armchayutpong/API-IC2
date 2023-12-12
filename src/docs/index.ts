import "dotenv/config";
import {JsonObject} from "swagger-ui-express";

// .env
const BASE_PATH_ROOT = process.env.BASE_PATH_ROOT;
const PORT = process.env.PORT;
const REST_ID = process.env.REST_ID;

// V1 path and components for document
import restInfoDocs from "./v1/restInfo.docs";
import lineDocs from "./v1/line.docs";
import otpDocs from "./v1/otp.docs";
import resgisterDocs from "./v1/resgister.docs";
import memberDocs from "./v1/member.docs";
import shopDocs from "./v1/shop.docs";
import crmDocs from "./v1/crm.docs";
import telDocs from "./v1/tel.docs";

const swaggerSpec = (paths:any, schemas:any, security:any = false) => {
    const definition = {
        "openapi": "3.0.1",
        "info": {
            "title": "iChapter API Documentation Rest is "+REST_ID,
            "version": "1.0.0"
        },
        "servers": [
            { 
                "url": "http://localhost:"+PORT
            }
        ],
        "tags": [
            {
                "name": "Rest",
                "description": "API about thanvasu info"
            },
            {
                "name": "Line",
                "description": "API about your line login"
            },
            {
                "name": "Tel",
                "description": "API about your tel login"
            },
            {
                "name": "OTP",
                "description": ""
            },
            {
                "name": "Register",
                "description": ""
            },
            {
                "name":"Member",
                "description":""
            },
            
        ],
        "paths": paths,
        "components": {
            "schemas": schemas,
            // "securitySchemes":{
            //     "bearerAuth":{
            //         "type":"http",
            //         "scheme":"bearer",
            //         "bearerFormat":"JWT"
            //     }
            // }
        },
    }
    return definition;
}

const swaggerModifiy = (definition:JsonObject, security:any = false) => {
    // modify path api
    if(definition.paths){
        const arrDefinition = Object.entries(definition.paths);
        arrDefinition.map((value:any) => {
            const [ key, obj] = value;
            const newRootUrl = BASE_PATH_ROOT+key;
            const matRoot = new RegExp("^"+BASE_PATH_ROOT, "g");
            if(!matRoot.test(key)){
                delete definition.paths[key];
                definition.paths[newRootUrl] = obj;
            }
        })
    }

    if(security){
        definition.components.securitySchemes = {};
        let secSchemes:string;

        if(security == "bearerAuth"){
            secSchemes = { ...definition.components.securitySchemes, 
                "bearerAuth":{
                    "type":"http",
                    "scheme":"bearer",
                    "bearerFormat":"JWT"
                }
            }
            definition.components.securitySchemes = secSchemes;
        }
    }
    return definition;
}

// sum spec
const swaggerDocs = swaggerSpec(
    {
        ...restInfoDocs.paths,
        ...lineDocs.paths,
        ...telDocs.paths,
        ...otpDocs.paths,
        ...resgisterDocs.paths,
        ...memberDocs.paths,
        ...shopDocs.paths,
        ...crmDocs.paths,
    }, 
    {
        ...restInfoDocs.schemas,
        ...lineDocs.schemas,
        ...telDocs.schemas,
        ...otpDocs.schemas,
        ...resgisterDocs.schemas,
        ...memberDocs.schema,
        ...shopDocs.schema,
        ...crmDocs.schemas

    }
)

const swaggerV1 = swaggerModifiy(swaggerDocs, "bearerAuth");

export default {
    swaggerV1,
}

