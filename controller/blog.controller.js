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
async function updateBlog(req, res, next){
    try {
        const {id} = req.params;
        const data = req.body;
        Object.keys(data).forEach(key => {
            if(!data[key]) delete data[key]
        })
        const blog = (await elasticClient.search({index : indexBlog , query: {match: {_id : id}}})).hits.hits?.[0] || {};
        const payload = blog?._source || {}
        const updateResualt = await elasticClient.index({
            index: indexBlog,
            id,
            body: {...payload , ...data}
        })

        return res.status(200).json({
            statusCode:200,
            data:{
                updateResualt   
            }
        })
    } catch (error) {
        next(error)
    }
}
async function updateBlog2(req, res, next){
    try {
        const {id} = req.params;
        const data = req.body;
        Object.keys(data).forEach(key => {
            if(!data[key]) delete data[key]
        })
        const updateResualt = await elasticClient.update({
            index: indexBlog,
            id,
            doc: data
        })

        return res.status(200).json({
            statusCode:200,
            data:{
                updateResualt   
            }
        })
    } catch (error) {
        next(error)
    }
}
async function searchByTitle(req, res, next){
    try {
        const {title} = req.query
        const resualt = await elasticClient.search({
            index: indexBlog,
            query:{
                match:{
                    title
                }
            }
        })
        return res.status(200).json({
            statusCode:200,
            data:{
                blog: resualt.hits.hits
            }
        })
    } catch (error) {
        next(error)
    }
}
async function searchByMultiFields(req, res, next){
    try {
        const {search} = req.query;
        const resualt = await elasticClient.search({
            index: indexBlog,
            query:{
                multi_match:{
                    query: search,
                    fields: ['auhtor' , 'text' , 'title']
                }
            }
        })
        const blog = resualt.hits.hits;
        return res.status(200).json({
            statusCode: 200,
            data:{
                blog
            }
        })
    } catch (error) {
        next(error)
    }
}
async function searchByRegexp(req, res, next){
    try {
        const {search} = req.query;
        const resualt = await elasticClient.search({
            index: indexBlog,
            query:{
                regexp:{
                    title: `.*${search}.*`
                }
            }
        })
        const blog = resualt.hits.hits;
        return res.status(200).json({
            statusCode: 200,
            data:{
                blog
            }
        })
    } catch (error) {
        next(error)
    }
}
async function findBlogByMultiFields(req, res, next){
    try {
        const {search} = req.query;
        const resualt = await elasticClient.search({
            index: indexBlog,
            query:{
                bool:{
                    should:[
                        {
                            regexp: {title : `.*${search}.*`}
                        },
                        {
                            regexp: {text : `.*${search}.*`}
                        },
                        {
                            regexp: {author : `.*${search}.*`}
                        }
                    ]
                }
            }
        })
        const blog = resualt.hits.hits;
        return res.status(200).json({
            statusCode: 200,
            data:{
                blog
            }
        })
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
    searchByRegexp,
    updateBlog,
    updateBlog2,
    findBlogByMultiFields
}