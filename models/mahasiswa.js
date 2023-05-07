const {Model, DataTypes} = require('sequelize')
const sequelize = require('../db.config')

class Mahasiswa extends Model { }

Mahasiswa.init({
    nim : {
        type : DataTypes.INTEGER,
        unique : true
    },
    nama : {
        type : DataTypes.STRING
    },
    password : {
        type : DataTypes.STRING
    }
},{
    sequelize,
    modelName : 'Mahasiswa'
})

module.exports = Mahasiswa