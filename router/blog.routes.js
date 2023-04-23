const { createNewBlogs, getAllBlogs, removeBlogs, updateBlog, updateBlog2, searchByTitle, searchByMultiFields, searchByRegexp, findBlogByMultiFields } = require('../controller/blog.controller');

const BlogRouters = require('express').Router();

BlogRouters.post("/create" , createNewBlogs)
BlogRouters.get("/list/:value?" , getAllBlogs)
BlogRouters.delete("/delete/:id" , removeBlogs)
BlogRouters.put("/update/:id" , updateBlog)
BlogRouters.put("/update2/:id" , updateBlog2)
BlogRouters.get("/findByTitle" , searchByTitle)
BlogRouters.get("/multi-fields" , searchByMultiFields)
BlogRouters.get("/regexp-search" , searchByRegexp)
BlogRouters.get("/multiFieldsSearch" , findBlogByMultiFields)

module.exports = {
    BlogRouters
}