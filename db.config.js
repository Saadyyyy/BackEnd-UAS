const {Sequelize } = require('sequelize')

const sequelize = new Sequelize('todo_list','root','',{
    dialect: 'mysql',
    host : 'localhost'
})

module.exports = sequelize