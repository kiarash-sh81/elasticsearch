const { createNewBlogs, getAllBlogs, removeBlogs } = require('../controller/blog.controller');

const BlogRouters = require('express').Router();

BlogRouters.post("/create" , createNewBlogs)
BlogRouters.get("/list/:value?" , getAllBlogs)
BlogRouters.delete("/delete/:id" , removeBlogs)

module.exports = {
    BlogRouters
}