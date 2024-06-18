const mongoose = require('mongoose');

const connectionString = process.env.database

mongoose.connect(connectionString).then((res)=>{
    console.log("MongoDB connection established...");
}).catch((err)=>{
    console.log(err.message);
})