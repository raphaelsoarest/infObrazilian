const Sequelize = require("sequelize");
const mysql = require("../database/database");
const Category = require("../categories/Category_model");

const Article_model = mysql.define("articles", {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: false
    },
    body:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Category.hasMany(Article_model);//UMA CATEGORIA TEM MUITOS ARTIGOS
Article_model.belongsTo(Category);// UM ARTIGO PERTENCE A UMA CATEGORIA

//Article_model.sync({force: true});

module.exports = Article_model;