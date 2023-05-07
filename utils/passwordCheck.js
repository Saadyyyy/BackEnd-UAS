const bycrypt = require('bcrypt')   
const ModelMahasiswa = require('../models/mahasiswa')

const passwordCheck = async(nim, password) => {
    const dataMahasiswa  = await ModelMahasiswa.findOne({ where: { nim: nim } })  
    const compare = await bycrypt.compare(password, dataMahasiswa.password)
    return {compare, dataMahasiswa}
}

module.exports = passwordCheck 