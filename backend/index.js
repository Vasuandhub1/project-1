const express=require("express")
const app=express()
const session= require("express-session")
require("dotenv").config()
const dbConnect= require("./config/dbconnect")
var MongoDBStore = require('connect-mongodb-session')(session);
const routes=require("./routes/userRoutes")
const clodinaryConnect= require("./config/cloudinaryConnect")
const fileUpload= require("express-fileupload")
const cors=require("cors")

// now use the middlewares
app.use(cors({
    origin:true,
    credentials:true
}))
app.use(express.json())

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));



// now connect the data base

dbConnect()
clodinaryConnect.clodinaryConnect()

// now setup the session store

var store = new MongoDBStore({
    uri: 'mongodb://127.0.0.1:27017/project-1',
    collection: 'mySessions'
  });

// now call the required middle ware 
app.use(session({
    secret:"authentication code",
    httpOnly:true,
    cookie:{
        sameSite:false,
        maxAge:1000*60*60*2,
        secure:false,
        httpOnly:true,
        credential:true
    },
    resave:false,
    secure:true, 
    store:store,  
    saveUninitialized:false,
   
}))

// now call the route
app.use("/app/v1",routes)
// app.get("/",(req,res)=>{

//     session.name="vasu"
    
         
    
//     res.send("hello vasu")
// })

app.listen(process.env.PORT,()=>{
    console.log(`the port is running at the ${process.env.PORT}`)
})