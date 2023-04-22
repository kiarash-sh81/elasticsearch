const { elasticClient } = require("../config/elastic.config");

const indexBlog = "blog"
async function getAllBlogs(req, res, next){
    try {
        const value = req.params.value
        const blogs = await elasticClient.search({
            index: indexBlog,
            q: value
        });
        return res.status(200).json({
            statusCode: 200,
            data: {
                blogs: blogs.hits.hits
            }
        })
    } catch (error) {
        next(error)
    }
}
async function createNewBlogs(req, res, next){
    try {
        const {title , author , text} = req.body;
        const createResualt = await elasticClient.index({
            index: indexBlog,
            document:{
                title,
                author,
                text
            }
        });
        return res.status(201).json({
            statusCode: 201,
            createResualt,
            message: "blog created successful"
        })
    } catch (error) {
        next(error)
    }
}
async function removeBlogs(req, res, next){
    try {
        const {id} = req.params;
        const deletedResualt = await elasticClient.deleteByQuery({
            index: indexBlog,
            query:{
                match:{
                    _id: id
                }
            }
        })
        return res.status(200).json({
            statusCode: 200,
            data: {
                deletedResualt
            }
        })
    } catch (error) {
        next(error)
    }
}
async function searchByTitle(req, res, next){
    try {
        
    } catch (error) {
        next(error)
    }
}
async function searchByMultiFields(req, res, next){
    try {
        
    } catch (error) {
        next(error)
    }
}
async function searchByRegexp(req, res, next){
    try {
        
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllBlogs,
    createNewBlogs,
    removeBlogs,
    searchByTitle,
    searchByMultiFields,
    searchByRegexp
}