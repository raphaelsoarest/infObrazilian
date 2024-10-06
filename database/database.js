const Sequelize = require('sequelize');

const mysql = new Sequelize('infobrazilian', 'root', 'root',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: "-03:00"
});

module.exports = mysql;