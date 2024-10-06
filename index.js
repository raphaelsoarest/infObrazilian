const express = require("express");
const app = express();



const Category = require("./categories/Category");
const Category_model = require("./categories/Category_model")
const Article = require("./articles/Article");
const Article_model = require("./articles/Article_model");

//view engine the project
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//database
const mysql = require("./database/database");
mysql
    .authenticate()
    .then(() =>{
        console.log("Conexão com o banco de dados OK!");
    }).catch((error) =>{
        console.log(error);
    });

app.use("/", Category);
app.use("/", Article);
app.get("/",(req, res) => {
    res.render("index");
});





app.listen(4000, () => {
    console.log("SERVIDOR RODANDO!");
});