const express = require('express')
const sequelize = require('../db.config')
const router = express.Router()
const ModelList = require('../models/list')

//endpoint utama Method Get / Read Data
// router.get('/all', async(req, res) => {
    
//     const list = await ModelList.findAll()
//     res.status(200).json({
//         data : list,
//         metadata : "Read All Data on the List"
//     })
// })

//Endpoint Method GET / Search data


router.get('/aktif',async (req, res) => {
  const nim = req.query.nim;
   const { Op } = require("sequelize");
  const list = await ModelList.findAll({ 
    where: {
        [Op.and] : [
            {nim : nim},
            {status : 'aktif'}
        ]
        }
})
  res.status(200).json({
    status : 200,
    data : list,
    metadata : `menampilkan ${nim} on the List`
})

})

router.get('/selesai',async (req, res) => {
  const nim = req.query.nim;
   const { Op } = require("sequelize");
  const list = await ModelList.findAll({ 
    where: {
        [Op.and] : [
            {nim : nim},
            {status : 'selesai'}
        ]
        }
})
  res.status(200).json({
    status : 200,
    data : list,
    metadata : `menampilkan ${nim} on the List`
})

})

//SELECT * FROM `lists` a INNER JOIN mahasiswas b ON a.nim = b.nim;
router.post('/searchAktif', async(req, res) => {
    
    const {cari} = req.body
    const nim  = req.query.nim

    const { Op } = require("sequelize");
    const list = await ModelList.findAll({ 
        where: {
                    [Op.and] : [
                        { nim : nim },
                        {
                            kegiatan : {
                                [Op.like]: `%${cari}%`
                            }
                        },
                        {status : 'aktif'}
                    ]
                }
    })
    res.status(200).json({
        status: 200,
        data : list,
        metadata : `Search ${cari} on the List`
    })
})

router.post('/searchSelesai', async(req, res) => {
    
    const {cari} = req.body
    const nim  = req.query.nim

    const { Op } = require("sequelize");
    const list = await ModelList.findAll({ 
        where: {
                    [Op.and] : [
                        { nim : nim },
                        {
                            kegiatan : {
                                [Op.like]: `%${cari}%`
                            }
                        },
                        {status : 'selesai'}
                    ]
                }
    })
    res.status(200).json({
        status: 200,
        data : list,
        metadata : `Search ${cari} on the List`
    })
})
    

    //Versi Raw Query
    // const list = await sequelize.query(`SELECT * FROM lists WHERE kegiatan LIKE'%${search}%' AND nama = '${nama}'`)

    //Versi Sequelize
    // const { Op } = require("sequelize");
    // const list = await ModelList.findAll({
    //     where: {
    //         [Op.and] : [
    //             { nama : nama },
    //             {
    //                 kegiatan : {
    //                     [Op.like]: `%${search}%`
    //                 }
    //             }
    //         ]
    //     }
    // })
    // Search Kegiatan aja
    


//Endpoint Method Post / Create Data
router.post('/', async(req, res) => {
    
    const {nim, kegiatan,tanggal} = req.body
    
    const list = await ModelList.create({
        nim, kegiatan, status: "aktif",tanggal
    })

    res.status(200).json({
        status : 200,
        data : list,
        metadata : "List Added Successfully"
    })
})

//Endpoint Method Put / Update Data
router.put('/', async(req, res) => {

    const id = req.query.id

    const {kegiatan,status,tanggal} = req.body
  
    const list = await ModelList.update({
         kegiatan, status,tanggal
    }, 
    { where: { id : id }})    
    
    res.status(200).json({
        status : 200,
        data: {updated: list[0]},
        metadata: "List Updated Successfuly!"
    })
   
})

router.put('/done', async(req, res) => {
    
    const id = req.query.id
  
    const list = await ModelList.update({
        status:'selesai'
    }, 
    { where: { id : id }})    
    
    res.status(200).json({
        status : 200,
        data: {updated: list[0]},
        metadata: "List Updated Successfuly!"
    })
   
})


//Endpoint Method Delete / Delete Data
router.delete('/', async(req, res) => {
    
    const id = req.query.id
  
    const list = await ModelList.destroy({
      where: { id : id }
    })    
    
    res.status(200).json({
        status : 200,
        data: list,
        metadata: "List Deleted Successfuly!"
    })
   
})




module.exports = router 