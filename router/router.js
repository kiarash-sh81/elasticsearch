const { BlogRouters } = require('./blog.routes');
const { IndicesRouters } = require('./indices.routes');

const AllRouters = require('express').Router();

AllRouters.get("/" , (req, res)=>{
    return res.render("pages/index" , {
        message: "Hello Express"
    });
});

AllRouters.use("/index" , IndicesRouters);
AllRouters.use("/blog" , BlogRouters);

module.exports = {
    AllRouters
}