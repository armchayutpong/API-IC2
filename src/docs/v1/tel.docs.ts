const paths = {
    "/tel/authenticate":{
        "post":{
            "tags":[
                "Tel"
            ],
            "summary": "Authenticate user by tel",
            "description": "Authenticate user by tel",
            "operationId": "postAuthenticate",
            "requestBody": {
                "description": "",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/TelAuthen"
                    }
                  },
                },
                "required": true
            },
            "responses":{
                "200":{
                    "description":"SUCCESS",
                }
            }
        }   
    },
}

const schemas = {
    "TelAuthen":{
        "type": "object",
        "properties": {
            "tel":{
                "type": "string",
                "example": "0982658743"
            },
            "lineId":{
                "type": "string",
                "example": ""
            }
        }
    },
}

export default {
    paths,
    schemas
}
