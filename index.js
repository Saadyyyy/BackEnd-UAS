const express = require('express')
const cors = require('cors')
const port = 3800

const sequelize = require('./db.config')
sequelize.sync().then(() => console.log('database ready!'))

const mahasiswaEndpoint = require('./routes/mahasiswa')
const listEndpoint = require('./routes/list')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/mahasiswa', mahasiswaEndpoint)
app.use('/list', listEndpoint)

app.listen(port,  () => console.log(`running server on port ${port}`))