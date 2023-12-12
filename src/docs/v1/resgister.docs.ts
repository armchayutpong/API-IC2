const paths = {
    "/register":{
        "post": {
          "tags": [
            "Register"
          ],
          "summary": "Save member.",
          "description": "Save member.",
          "operationId": "postRegister",
          "requestBody": {
            "description": "",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Register"
                }
              },
            },
            "required": true
          },
          "responses": {
            "200": {
              "description": "SUCCESS",
            }
          },
        }
      }
}
const schemas = {
    "Register":{
        "type": "object",
        "properties": {
          "cardId":{
            "type": "string",
            "example": ""
          },
          "name":{
            "type": "string",
            "example": "Ice"
          },
          "sex":{
            "type": "string",
            "example": "M"
          },
          "birthDate":{
            "type": "string",
            "format": "date",
            "example": "1996-10-11"
          },
          "tel":{
            "type": "string",
            "example": "0982658743"
          },
          "address":{
            "type": "string",
            "example": ""
          },
          "email":{
            "type": "string",
            "example": "phongnatee.tho@thanvasu.com"
          },
          "lineId":{
            "type": "string",
            "example": "U1ddc532730b19adcc2dfe8c887e71efa"
          },
          "consent1":{
            "type": "integer",
            "format": "int64",
            "example": "1"
          },
          "consent2":{
            "type": "integer",
            "format": "int64",
            "example": "1"
          },
          "createBy":{
            "type": "string",
            "example": "LINE/WEB"
          },
          "otpCode":{
            "type": "string",
            "example": "1568"
          },
        }
      }
}
export default {
    paths,
    schemas
}