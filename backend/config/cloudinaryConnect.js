const cloudinary= require("cloudinary").v2
require("dotenv").config()

exports.clodinaryConnect=async()=>{
    const sucess= await cloudinary.config({
        cloud_name:process.env.CLOUD_NAME,
        api_key:process.env.API_KEY,
        api_secret:process.env.API_SECRET
    })
    if(sucess){
        console.log("connected to cloudinary sucessful")
    }else{
        console.log("error in connectiong cloudinary")
    }
}