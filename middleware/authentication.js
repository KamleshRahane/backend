const jwt = require("jsonwebtoken")


const authenticator =(req,res,next)=>{
    const token=req.headers.as
if(token){
        jwt.verify(token,'masai',(err,decode)=>{
if(decode){
    req.body.userId =decode.userId
    next()
}else{
    res.send({"msg":"please login first"})
}
     })
    }else{
        res.send({"msg":"plz login"})
    }
}

module.exports={
    authenticator
}