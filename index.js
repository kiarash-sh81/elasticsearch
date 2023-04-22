const express = require('express');
const app = express();
const server = require('http').createServer(app);
require('dotenv').config();
const {PORT} = process.env;
const expressEjsLayout = require('express-ejs-layouts');
const { AllRouters } = require('./router/router');
app.use(express.static("public"))
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.set("view engine" , "ejs");
app.use(expressEjsLayout);
app.set("views" , "views");
app.set("layout" , "./layouts/master");
app.use(AllRouters)
app.use((req, res, next) => {
    return res.status(404).json({
        statusCode: 404,
        message: "paeg not founded"

    })
});
app.use((err, req, res, next) => {
    return res.status(err.status || 500).json({
        statusCode: err.status || 500,
        message: err.message || "internal server error"

    })
});

server.listen(PORT , ()=>{
    console.log(`Server run : http://localhost:${PORT}`);
})