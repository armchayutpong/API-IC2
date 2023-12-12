const paths = {
    "/shop":{
        "get":{
            "tags":[
                "Shop"
            ],
            "summary":"Get all shop data",
            "description":"Get all shop data",
            "operationId":"getShop",
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
    "/shop/{ShopCode}":{
        "get":{
            "tags":[
                "Shop"
            ],
            "summary":"Get a shop data",
            "description":"Get a shop data",
            "operationId":"getShopCode",
            "parameters":[
                {
                    "name":"ShopCode",
                    "in":"path",
                    "description":"Shop code",
                    "required":"true",
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
    }
} 

const schema = {
    "Shop":{
        "type":"object",
        "properties":{
            "ShopCode":{
                "type":"string",
                "example":"S03"
            }
        }
    }
}

export default {
    paths,
    schema
}