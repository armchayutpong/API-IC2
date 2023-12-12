const paths = {
    "/line/authenticate":{
        "post":{
            "tags":[
                "Line"
            ],
            "summary": "Authenticate user by line id or usere id of line",
            "description": "Authenticate user by line id or usere id of line",
            "operationId": "postAuthenticate",
            "requestBody": {
                "description": "",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/Line"
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
    "Line":{
        "type": "object",
        "properties": {
            "lineId":{
            "type": "string",
            "example": "U1ddc532730b19adcc2dfe8c887e71efa"
            }
        }
    },
}

export default {
    paths,
    schemas
}
