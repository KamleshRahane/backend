const express = require("express")
const {connection} = require("./config/db");
const {authenticator} = require("./middleware/authentication");
const {postRouter} = require("./routes/post");
const {userRouter} = require("./routes/user");
const cors = require("cors")
require("dotenv").conf


const app = express();
app.use(express.json());
app.use(cors());

app.use("/users",userRouter);
 app.use("/posts",authenticator);
 app.use("/posts",postRouter);




app.listen(process.env.port,async(req,res)=>{
    try{
        await connection
        console.log("Connected to DB")
    }catch(err){
        console.log(err.message)
    }
       
        console.log(`Server is running at port ${process.env.port}`)
    
   
})