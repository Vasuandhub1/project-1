const session = require("express-session")
const userModel= require("../models/userModel")
const bcrypt= require("bcrypt")

exports.register=async(req,res)=>{
    // handle the errs
    try{
        // take the user details from the req body
        const {username,email,password}=req.body
        // check for the email availablity
        if(email&&username&&password){
        const isemail= await userModel.findOne({email})
        if(isemail){
            return res.status(406)
            .send("the user alredy exist")
        }else{
            // now ecrypt the password
            bcrypt.hash(password,10).then(async(secure)=>{
                // now store the credentials to the data base
               await userModel.create({username,email,password:secure})
               
               return res.status(200).send("sucessfully registered the user")

            })
        }
        }else{
            return res.staus(404)
            .send("please fill all the credentials")
        }

        

    }catch(err){
        return res.status(400)
        .send(err.message)
    }
}

exports.login=async (req,res)=>{
    // handle he err
    try{
        // now take the data from the req body 
        const {email,password}=req.body

        // now check of the credentials 
        if(email&&password){
            const isemail=await userModel.findOne({email})
            if(!isemail){
                return res.status(404).send("please register the user")
            }else{
                // if we found the email id then check for he password
                await bcrypt.compare(password,isemail.password).then(()=>{
                    req.session.isAuth=true
                    
                    return res.status(200).send(isemail.username)
                }).catch((err)=>{
                    console.log(err)
                })
            }
        }else{
            return res.status(406).send("please fill all the credentials")
        }
    }catch(err){
        return res.status(404).send(err.message)
    }
}
