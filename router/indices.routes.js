const { createNewIndex, getIndices, removeIndex } = require('../controller/indices.controller');

const IndicesRouters = require('express').Router();

IndicesRouters.post("/create" , createNewIndex);
IndicesRouters.get("/list" , getIndices);
IndicesRouters.delete("/delete/:indexName" , removeIndex);

module.exports = {
    IndicesRouters
}