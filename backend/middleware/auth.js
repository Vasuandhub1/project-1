const auth=async(req,res,next)=>{
    if(req.session.isAuth){
       
        next()
    }
    else{
        return res.status(404).send("please login first")
    }
}

module.exports=auth