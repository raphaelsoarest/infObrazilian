const Sequelize = require("sequelize");
const mysql = require("../database/database")

const Category_model = mysql.define("categories", {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

//Category_model.sync({force: true});

module.exports = Category_model;