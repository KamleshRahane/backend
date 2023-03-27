const { Router } = require("express");
const {PostModel} = require("../models/post");



const postRouter = Router();

postRouter.get("/",async(req,res)=>{
    try{
       const {userId} = req.body;
   
      const posts = await PostModel.find({userId:userId});
      res.send({posts,msg:"YOur Posts"});
     
    }catch(error){
        res.send(error.message);
    }
});

postRouter.get("/:id",async(req,res)=>{
    try{
        const id = req.params.id;
        const post = await PostModel.findById(id);
        res.send({post});
    }catch(error){
        res.send(error.message)
    }
});

postRouter.post("/",async(req,res)=>{
    try{
        const data = req.body;
        const newpost = new PostModel(data);
        await newpost.save();
        res.send({msg:"New Post Created",post:newpost})
    }catch(error){
        res.send({msg:error.message});
    }
});

postRouter.patch("/update/:id",async(req,res)=>{
    try{
        const data = req.body;
        const id = req.params.id;
        const updated = await PostModel.findByIdAndUpdate(id,data);
        res.send({msg:"Post updated",post:updated})
    }catch(error){
        res.send({msg:error.message})
    }
})

postRouter.delete("/delete/:id",async(req,res)=>{
    try{
        const id  = req.params.id;
        const deleted = await PostModel.findByIdAndDelete(id);
        if(deleted){
            res.send({msg:"Post Deleted",post:deleted});
        }else{
            res.send({msg:"Post not found"});
        }
    }catch(eror){
        res.send({msg:error.message})
}
});

module.exports ={
    postRouter
}