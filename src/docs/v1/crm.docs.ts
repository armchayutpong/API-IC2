const paths = {
    "/crm/sp/addr-district/{province}":{
        "get":{
            "tags":[
                "CRM"
            ],
            "summary":"Get district.",
            "description":"Get district.",
            "operationId":"getAddrDistrict",
            "parameters":[
                {
                    "name":"province",
                    "in":"path",
                    "description":"Thai province.",
                    "required": true,
                    "schema":{
                        "type":"string"
                    }
                }
            ],
            "responses":{
                "200":{
                    "description":"SUCCESS",
                }
            },
            "security": [
                {
                   "bearerAuth": []
                }
            ],
        }
    },
    "/crm/sp/addr-province":{
        "get":{
            "tags":[
                "CRM"
            ],
            "summary":"Get province.",
            "description":"Get province.",
            "operationId":"getAddrProvince",
            "responses":{
                "200":{
                    "description":"SUCCESS",
                }
            },
            "security": [
                {
                   "bearerAuth": []
                }
            ],
        }
    },
    "/crm/sp/check-existed-line-id/{lineId}":{
        "get":{
            "tags":[
                "CRM"
            ],
            "summary":"Check member from line id.",
            "description":"Check member from line id.",
            "operationId":"getCheckExistedLineId",
            "parameters":[
                {
                    "name":"lineId",
                    "in":"path",
                    "description":"Line id",
                    "required":true,
                    "schema":{
                        "type":"string"
                    }
                }
            ],
            "responses":{
                "200":{
                    "description":"SUCCESS",
                }
            },
            "security": [
                {
                   "bearerAuth": []
                }
            ],
        }
    },
    "/crm/sp/check-existed-tel-no":{
        "get":{
            "tags":[
                "CRM"
            ],
            "summary":"Check tel.",
            "description":"Check tel.",
            "operationId":"getCheckExistedTelNo",
            "parameters":[
                {
                    "name":"telNo",
                    "in":"query",
                    "description":"Phone number 10 digit",
                    "required": false,
                    "schema":{
                        "type":"string"
                    }
                },
                {
                    "name":"lineId",
                    "in":"query",
                    "description":"Line id",
                    "required": false,
                    "schema":{
                        "type":"string"
                    }
                },
            ],
            "responses":{
                "200":{
                    "description":"Successful"
                }
            },
            "security": [
                {
                   "bearerAuth": []
                }
            ],
        }
    },
    "/crm/sp/check-otp":{
        "get":{
            "tags":[
                "CRM"
            ],
            "summary":"Check otp.",
            "description":"Check otp.",
            "operationId":"getCheckOTP",
            "parameters":[
                {
                    "name":"memCardId",
                    "in":"query",
                    "description":"Member card id of customer",
                    "required": false,
                    "schema":{
                        "type":"string"
                    }
                },
                {
                    "name":"telNo",
                    "in":"query",
                    "description":"Phone number 10 digit",
                    "required": true,
                    "schema":{
                        "type":"string"
                    }
                },
                {
                    "name":"otpCode",
                    "in":"query",
                    "description":"OTP Code",
                    "required": true,
                    "schema":{
                        "type":"string"
                    }
                },
                {
                    "name":"otpType",
                    "in":"query",
                    "description":"OTP type ex: Register or Login",
                    "required": true,
                    "schema":{
                        "type":"string"
                    }
                },
            ],
            "responses":{
                "200":{
                    "description":"SUCCESS",
                }
            },
            "security": [
                {
                   "bearerAuth": []
                }
            ],
        }
    },
    "/crm/sp/check-shop-id/{shopId}":{
        "get":{
            "tags":[
                "CRM"
            ],
            "summary":"Check shop.",
            "description":"Check shop.",
            "operationId":"getCheckShopId",
            "parameters":[
                {
                    "name":"shopId",
                    "in":"path",
                    "description":"Shop ID.",
                    "required": false,
                    "schema":{
                        "type":"string"
                    }
                }
            ],
            "responses":{
                "200":{
                    "description":"SUCCESS"
                }
            },
            "security": [
                {
                   "bearerAuth": []
                }
            ],
        }
    },
    "/crm/sp/exp-point":{
        "get":{
            "tags":[
                "CRM"
            ],
            "summary":"Check expire point.",
            "description":"Check expire point.",
            "operationId":"getExpPoint",
            "parameters":[
                {
                    "name":"memCardId",
                    "in":"query",
                    "description":"Member card id of customer",
                    "required": false,
                    "schema":{
                        "type":"string"
                    }
                },
                {
                    "name":"shopCode",
                    "in":"query",
                    "description":"Shop code.",
                    "required": true,
                    "schema":{
                        "type":"string"
                    }
                },
            ],
            "responses":{
                "200":{
                    "description":"SUCCESS",
                }
            },
            "security": [
                {
                   "bearerAuth": []
                }
            ],
        }
    },
    "/crm/sp/insert-coupon-by-mem-card":{
        "post":{
            "tags":[
                "CRM"
            ],
            "summary":"Insert coupon by member.",
            "description":"Insert coupon by member.",
            "operationId":"postInsertCouponByMemCard",
            "requestBody": {
                "description": "",
                "content": {
                    "application/json": {
                      "schema": {
                        "$ref": "#/components/schemas/CrmSpCoupon"
                      }
                    },
                  },
                  "required": true
            },
            "responses":{
                "200":{
                    "description":"SUCCESS",
                }
            },
            "security": [
                {
                   "bearerAuth": []
                }
            ],
        }
    },
    "/crm/sp/insert-mem-card":{
        "post":{
            "tags":[
                "CRM"
            ],
            "summary":"Save member.",
            "description":"Save member.",
            "operationId":"postInsertMemCard",
            "requestBody": {
                "description": "",
                "content": {
                    "application/json": {
                      "schema": {
                        "$ref": "#/components/schemas/CrmSpInsertMemCard"
                      }
                    },
                  },
                  "required": true
            },
            "responses":{
                "200":{
                    "description":"SUCCESS",
                }
            },
            "security": [
                {
                   "bearerAuth": []
                }
            ],
        }
    },
    "/crm/sp/insert-otp": {
        "post":{
            "tags":[
                "CRM"
            ],
            "summary":"Save OTP.",
            "description":"Save OTP.",
            "operationId":"postInsertOTP",
            "requestBody": {
                "description": "",
                "content": {
                    "application/json": {
                      "schema": {
                        "$ref": "#/components/schemas/CrmSpInsertOTP"
                      }
                    },
                  },
                  "required": true
            },
            "responses":{
                "200":{
                    "description":"SUCCESS",
                }
            },
            "security": [
                {
                   "bearerAuth": []
                }
            ],
        }
    },
    "/crm/sp/mem-card-check-exists":{
        "get":{
            "tags":[
                "CRM"
            ],
            "summary":"Check shop.",
            "description":"Check shop.",
            "operationId":"getMemCardCheckExists",
            "parameters":[
                {
                    "name":"tel",
                    "in":"query",
                    "description":"Phone number 10 digit.",
                    "required": false,
                    "schema":{
                        "type":"string"
                    }
                },
                {
                    "name":"lineId",
                    "in":"query",
                    "description":"Line ID.",
                    "required": false,
                    "schema":{
                        "type":"string"
                    }
                }
            ],
            "responses":{
                "200":{
                    "description":"SUCCESS"
                }
            },
            "security": [
                {
                   "bearerAuth": []
                }
            ],
        }
    },
    "/crm/sp/promotion-list":{
        "get":{
            "tags":[
                "CRM"
            ],
            "summary":"Check shop.",
            "description":"Check shop.",
            "operationId":"getPromotionList",
            "parameters":[
                {
                    "name":"memCardId",
                    "in":"query",
                    "description":"Member card id",
                    "required": true,
                    "schema":{
                        "type":"string"
                    }
                },
                {
                    "name":"shopCode",
                    "in":"query",
                    "description":"Shop code.",
                    "required": true,
                    "schema":{
                        "type":"string"
                    }
                },
                {
                    "name":"cpType",
                    "in":"query",
                    "description":"CP Type. example: 1 = In Store , 2 = Delivery , 3 = For You",
                    "required": true,
                    "schema":{
                        "type":"string"
                    }
                },
                {
                    "name":"productId",
                    "in":"query",
                    "description":"Product id. example: 0 = All , ProductID ตัวนั้นจะได้ Info ไป",
                    "required": true,
                    "schema":{
                        "type":"string"
                    }
                },
            ],
            "responses":{
                "200":{
                    "description":"SUCCESS"
                }
            },
            "security": [
                {
                   "bearerAuth": []
                }
            ],
        }
    },
    "/crm/sp/select-cash-card/{memCardId}":{
        "get":{
            "tags":[
                "CRM"
            ],
            "summary":"Get cash card.",
            "description":"Get cash card.",
            "operationId":"getSelectCashCard",
            "parameters":[
                {
                    "name":"memCardId",
                    "in":"path",
                    "description":"Member card id example:M1000017",
                    "required": true,
                    "schema":{
                        "type":"string"
                    }
                },
            ],
            "responses":{
                "200":{
                    "description":"SUCCESS"
                }
            },
            "security": [
                {
                   "bearerAuth": []
                }
            ],
        }
    },
    "/crm/sp/select-mem-card/{memCardId}":{
        "get":{
            "tags":[
                "CRM"
            ],
            "summary":"Get member card",
            "description":"Get member card.",
            "operationId":"getSelectMemCard",
            "parameters":[
                {
                    "name":"memCardId",
                    "in":"path",
                    "description":"Member card id",
                    "required": true,
                    "schema":{
                        "type":"string"
                    }
                },
            ],
            "responses":{
                "200":{
                    "description":"SUCCESS"
                }
            },
            "security": [
                {
                   "bearerAuth": []
                }
            ],
        }
    },
    "/crm/sp/shop-banner/{shopCode}":{
        "get":{
            "tags":[
                "CRM"
            ],
            "summary":"Get shop banner",
            "description":"Get shop banner.",
            "operationId":"getShopBanner",
            "parameters":[
                {
                    "name":"shopCode",
                    "in":"path",
                    "description":"Shop code ex. 0 = All, S03 = select shop to S03",
                    "required": true,
                    "schema":{
                        "type":"string"
                    }
                },
            ],
            "responses":{
                "200":{
                    "description":"SUCCESS"
                }
            },
            "security": [
                {
                   "bearerAuth": []
                }
            ],
        }
    },
    "/crm/sp/shop-code/{shopCode}":{
        "get":{
            "tags":[
                "CRM"
            ],
            "summary":"Get shop.",
            "description":"Get shop.",
            "operationId":"getShopCode",
            "parameters":[
                {
                    "name":"shopCode",
                    "in":"path",
                    "description":"Shop code ex. 0 = All, S03 = select shop to S03",
                    "required": true,
                    "schema":{
                        "type":"string"
                    }
                },
            ],
            "responses":{
                "200":{
                    "description":"SUCCESS"
                }
            },
            "security": [
                {
                   "bearerAuth": []
                }
            ],
        }
    },
    "/crm/sp/shop-cp-type/{shopCode}":{
        "get":{
            "tags":[
                "CRM"
            ],
            "summary":"Get CP type.",
            "description":"Get CP type.",
            "operationId":"getShopCPType",
            "parameters":[
                {
                    "name":"shopCode",
                    "in":"path",
                    "description":"Shop code ex. 0 = All, S03 = select shop to S03",
                    "required": true,
                    "schema":{
                        "type":"string"
                    }
                },
            ],
            "responses":{
                "200":{
                    "description":"SUCCESS"
                }
            },
            "security": [
                {
                   "bearerAuth": []
                }
            ],
        }
    },
    "/crm/sp/trn-point/{memCardId}":{
        "get":{
            "tags":[
                "CRM"
            ],
            "summary":"Get point.",
            "description":"Get point.",
            "operationId":"getTrnPoint",
            "parameters":[
                {
                    "name":"memCardId",
                    "in":"path",
                    "description":"Member card id example M1000017",
                    "required": true,
                    "schema":{
                        "type":"string"
                    }
                },
            ],
            "responses":{
                "200":{
                    "description":"SUCCESS"
                }
            },
            "security": [
                {
                   "bearerAuth": []
                }
            ],
        }
    },
    "/crm/sp/update-mem-card":{
        "put":{
            "tags":[
                "CRM"
            ],
            "summary":"Update member.",
            "description":"Update member.",
            "operationId":"putUpdateMemCard",
            "requestBody": {
                "description": "",
                "content": {
                    "application/json": {
                      "schema": {
                        "$ref": "#/components/schemas/CrmSpUpdateMemCard"
                      }
                    },
                  },
                  "required": true
            },
            "responses":{
                "200":{
                    "description":"SUCCESS",
                }
            },
            "security": [
                {
                   "bearerAuth": []
                }
            ],
        }
    },
    "/crm/sp/update-mem-card-level":{
        "put":{
            "tags":[
                "CRM"
            ],
            "summary":"Update member level.",
            "description":"Update member level.",
            "operationId":"putUpdateMemCardLevel",
            "requestBody": {
                "description": "",
                "content": {
                    "application/json": {
                      "schema": {
                        "$ref": "#/components/schemas/Member"
                      }
                    },
                  },
                  "required": true
            },
            "responses":{
                "200":{
                    "description":"SUCCESS",
                }
            },
            "security": [
                {
                   "bearerAuth": []
                }
            ],
        }
    },
} 

const schemas = {
    "Crm":{
        "type":"object",
        "properties":{
            "memCardId":{
                "type":"string",
                "example":"M1000026"
            },
            "productId":{
                "type":"integer",
                "format": "int64",
                "example":"20"
            },
            "shopCode":{
                "type":"string",
                "example":"S01"
            },
            "remark":{
                "type":"string",
                "example":"xx"
            },
        }
    },
    "CrmSpCoupon":{
        "type":"object",
        "properties":{
            "memCardId":{
                "type":"string",
                "example":"M1000003"
            },
            "productId":{
                "type":"integer",
                "format": "int64",
                "example":"101"
            },
            "shopCode":{
                "type":"string",
                "example":"S01"
            },
            "remark":{
                "type":"string",
                "example":"xx"
            },
        }
    },
    "CrmSpInsertOTP":{
        "type": "object",
        "properties": {
          "memCardID":{
            "type": "string",
            "example": ""
          },
          "tel":{
            "type": "string",
            "example": "0982658743"
          },
          "otpCode":{
            "type": "string",
            "example": "1234"
          },
          "otpType":{
            "type": "string",
            "example": "Register"
          }
        }
    },
    "CrmSpInsertMemCard":{
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
          "shopCode":{
            "type": "string",
            "example": ""
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
        }
    },
    "CrmSpUpdateMemCard":{
        "type": "object",
        "properties": {
          "memCardId":{
            "type": "string",
            "example": "M1000026"
          },
          "cardId":{
            "type": "string",
            "example": ""
          },
          "name":{
            "type": "string",
            "example": "IceCy"
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
          "shopCode":{
            "type": "string",
            "example": ""
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
        }
    }
}

export default {
    paths,
    schemas
}