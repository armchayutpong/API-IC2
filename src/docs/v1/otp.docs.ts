const paths = {
  "/otp/sms/send":{
      "post": {
        "tags": [
          "OTP"
        ],
        "summary": "Send OTP to the specified number",
        "description": "Send OTP to the specified number",
        "operationId": "postOtpSmsSend",
        "requestBody": {
          "description": "",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/OtpSend"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "SUCCESS",
          }
        },
      }
  },
  "/otp/sms/verify":{
      "post": {
        "tags": [
          "OTP"
        ],
        "summary": "Verify  OTP to the specified number",
        "description": "Verify  OTP to the specified number",
        "operationId": "postOtpSmsVerify",
        "requestBody": {
          "description": "",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/OtpVerify"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "SUCCESS",
          }
        },
      }
  },
}
const schemas = {
  "OtpSend":{
    "type": "object",
    "properties": {
      "memCardID":{
        "type": "string",
        "example": ""
      },
      "tel":{
        "type": "string",
        "example": "0945678543"
      },
      "otpType":{
        "type": "string",
        "example": "Register"
      }
    }
  },
  "OtpVerify":{
    "type": "object",
    "properties": {
      "memCardID":{
        "type": "string",
        "example": ""
      },
      "tel":{
        "type": "string",
        "example": "0945678543"
      },
      "otpCode":{
        "type": "string",
        "example": "2459"
      },
      "otpType":{
        "type": "string",
        "example": "Register"
      }
    }
  },
}
export default {
  paths,
  schemas
}