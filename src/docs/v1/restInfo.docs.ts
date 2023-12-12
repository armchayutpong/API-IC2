const paths = {
    "/rest-info":{
        "get":{
            "tags":[
                "Rest"
            ],
            "summary": "Get rest info.",
            "description": "Get rest info.",
            "operationId":"getRestInfo",
            "responses":{
                "200":{
                    "description":"SUCCESS",
                }
            },

        }
    }
}
const schemas = {

}

export default {
    paths,
    schemas
}