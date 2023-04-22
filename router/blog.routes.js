const { createNewBlogs } = require('../controller/blog.controller');

const BlogRouters = require('express').Router();

BlogRouters.post("/create" , createNewBlogs)

module.exports = {
    BlogRouters
}