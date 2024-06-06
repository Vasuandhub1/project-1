const mongoose= require("mongoose")
require("dotenv").config()



const dbConnect= async ()=>{
    
    const connect=  mongoose.connect(process.env.URI,{family:4})
    .then(()=>console.log("connected sucessfully"))
    .catch(()=>console.log("error"))
    
   
}

module.exports=dbConnect