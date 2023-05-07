const express = require('express')
const router = express.Router()
const ModelMahasiswa = require('../models/mahasiswa')
const bycrypt = require('bcrypt')
const passwordCheck = require('../utils/passwordCheck')

//endpoint utama Method Get / Read Data
router.get('/', async(req, res) => {
    const mahasiswa = await ModelMahasiswa.findAll()
    res.status(200).json({
        data : mahasiswa,
        metadata : "Read all Data From Mahasiswa"
    })
})

//Endpoint Method Post / Create Data
router.post('/', async(req, res) => {
    
    const {nim, nama, password} = req.body
    
    const encryptedPassword = await bycrypt.hash(password, 10)

    const mahasiswa = await ModelMahasiswa.create({
        nim, nama, password: encryptedPassword
    })
    res.status(200).json({
        status : 200,
        data : mahasiswa,
        metadata : "Data Mahasiswa Added Successfuly"
    })
})

//endpoint method Post / Login Mahasiswa
router.post('/login', async(req, res) => {
    const {nim, password} = req.body

    const check = await passwordCheck(nim, password)
    
    if(check.compare === true){
        res.status(200).json({
            status : 200,
            users : check.dataMahasiswa,
            metadata: "Login Successfuly"
        })
    }else{
        res.status(400).json({
            error: "Data Invalid"
        })
    }
})

//Endpoint Method Put / Update Data Mahasiswa
router.put('/', async(req, res) => {
    
    const {nim, nama, password, passwordBaru} = req.body
  
    const check = await passwordCheck(nim, password)

    const encryptedPassword = await bycrypt.hash(passwordBaru, 10)

    // res.json({userData})
    if(check.compare === true){
        const users = await ModelMahasiswa.update({
            nama, password : encryptedPassword
        }, { where: { nim: nim }})    
        res.status(200).json({
            status : 200,
            users: {updated: users[0]},
            metadata: "Data Mahasiswa Updates Successfuly"
        })
    }else{
        res.status(400).json({
            "error": "data invalid"
        })
    }
 
})


//Endpoint Method Delete / Delete Data Mahawaswa
router.delete('/', async(req, res) => {
    
    const {nim} = req.body
  
    const list = await ModelMahasiswa.destroy({
      where: { nim : nim }
    }) 
    
    res.status(200).json({
        data: {Deleted: list[0]},
        metadata: "Data Mahasiswa Deleted Successfuly!"
    })
   
})



module.exports = router