const mongoose = require('mongoose');

 const connectMongoose = ()=>{
     mongoose.connect("mongodb://localhost:27017/task")
     .then((e)=>console.log("connected to database")).catch((e)=>console.log("connection to DB failed"))
 };
 module.exports = connectMongoose;

