const paths = {
    "/member/{MemCardID}":{
        "get":{
            "tags":[
                "Member"
            ],
            "summary": "Get member information by member crad id",
            "description": "Get member information by member crad id",
            "operationId": "getMember",
            "parameters":[
                {
                    "name":"MemCardID",
                    "in":"path",
                    "description":"Member card id",
                    "required":true,
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
            ]
        }   
    }
}
const schema = {
    "Member":{
        "type":"object",
        "properties":{
            "MemCardID": {
                "type":"string",
                "example":"M1000000"
            }
        }
    }
}
export default {
    paths,
    schema
}