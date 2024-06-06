const imageModel=require("../models/imageModel")
const cloudinary= require("cloudinary").v2

const fileUpload=async(file,folder)=>{
    const option={folder}
    return await cloudinary.uploader.upload(file.tempFilePath,option)
}

exports.imageUpload=async(req,res)=>{
    try{
        // now take the data from the req body
        const {title}=req.body
        const file=req.files.files
        console.log(file,title)
        if(title&& file){
            const fileType=file.name?.split(".")[1].toLowerCase()
            const supported=["jpg","jpeg","png","svg"]
            if(true){
                // now upload the file to cloud
                const folder="project-1"
                const uploded=await fileUpload(file,folder)
                // now update the image to the databse
                
                await imageModel.create({
                    imageurl:uploded.url,
                    title:title,
                    publicId:uploded.public_id
                })

            return res.status(200).send("image uploded sucessfully")
            }else{
                return res.status(406).send("file type does not supported")
            }
        }else{
            return res.status(406).send("please fill all the credentials")
        }
    }catch(err){
        return res.status(404).send(err.message)
    }
}
exports.showAllImages=async(req,res)=>{
    try{
        const imageData=await imageModel.find()
        return res.status(200).send(imageData)
    }catch(err){
        return res.status(400).send(err.message)
    }
}

exports.showSpecificImage=async(req,res)=>{
    try{
        const {id}=req.params

        if(id){
            const isimage=await imageModel.findById(id)
            let newvalue=isimage.views+1
            await imageModel.findByIdAndUpdate(id,{views:newvalue})
            const newdata=await imageModel.findById(id)
            return res.status(200).send(newdata)
        }else{
            return res.status(406).send("error")
        }

    }catch(err){
        return res.status(400).send(err.message)
    }
}