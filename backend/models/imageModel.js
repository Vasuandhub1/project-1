const mongoose = require("mongoose")

const imageSchema= new mongoose.Schema({
    imageurl:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    publicId:{
        type:String,
        required:true
    },
    views:{
        type:Number,
        default:0
    }
}) 

module.exports=mongoose.model("imageSchema",imageSchema)