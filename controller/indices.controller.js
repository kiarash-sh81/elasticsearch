const createHttpErrors = require('http-errors');
const { elasticClient } = require('../config/elastic.config');
async function createNewIndex(req, res, next){
    try {
        const {indexName} = req.body;
        if(!indexName) throw createHttpErrors.BadRequest("invalid value of index name");
        const resualt = await elasticClient.indices.create({index: indexName});
        return res.status(201).json({
            statusCode: 201,
            resualt,
            message: "index created !"
        })
    } catch (error) {
        next(error)
    }
}
async function removeIndex(req, res, next){
    try {
        const {indexName} = req.params;
        const resualt = await elasticClient.indices.delete({index: indexName});
        return res.status(200).json({
            statusCode:200,
            data:{
                resualt,
                message: "index deleted successfully"
            }
        })
    } catch (error) {
        next(error)
    }
}
async function getIndices(req, res, next){
    try {
        const indices = await elasticClient.indices.getAlias();
        const regexp = /^\.+/
        return res.status(200).json({
            statusCode: 200,
            data:{
                indices: Object.keys(indices).filter(index => !regexp.test(index))
            }
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createNewIndex,
    removeIndex,
    getIndices
}