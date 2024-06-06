const express= require("express")
const routes= express.Router()
const auth= require("../middleware/auth")

const {register,login}=require("../controllers/usercontrollers")
const {imageUpload,showAllImages,showSpecificImage}=require("../controllers/imageController")

routes.post("/register",register)
routes.post("/login",login)
routes.post("/image",auth,imageUpload)
routes.get("/allimages",auth,showAllImages)
routes.get("/specific/:id",auth,showSpecificImage)

module.exports=routes