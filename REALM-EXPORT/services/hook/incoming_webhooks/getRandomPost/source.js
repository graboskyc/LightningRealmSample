// This function is the webhook's request handler.
exports = async function(payload, response) {
    var conn = context.services.get("mongodb-atlas").db("ig").collection("media");
    
    response.setHeader("Content-Type","application/json");
    
    var pipeline = [{$match:{type:"picture"}},{$sample:{size:1}}];
    
    var docs = await conn.aggregate(pipeline).toArray();
    
    response.setBody(JSON.stringify(docs[0]));    
    return(JSON.stringify(docs[0]));
};