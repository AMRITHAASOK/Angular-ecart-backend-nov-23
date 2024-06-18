require('dotenv').config();

const express = require('express');
const cors = require('cors');
const router = require('./Router/router')
const db = require('./Connection/db')

const ecartServer = express();

ecartServer.use(cors())
ecartServer.use(express.json())
ecartServer.use(router)

const port = 3000 || process.env.PORT

ecartServer.listen(port,()=>{
    console.log('ecart server listening on port ' + port);
})

ecartServer.get('/',(req,res)=>{
    console.log('ecart server started');
})