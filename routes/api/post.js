const express=require("express");
const router=express.Router();
const User=require('../../models/Users');
const Post=require('../../models/Post');
const auth=require('../../middleware/auth');
const { check, validationResult }=require('express-validator');

router.post('/',auth,
    [   
    check('text','text is required').not().isEmpty(),
    ],
    async(req,res)=>{

        const errors=validationResult(req);
        if(!errors.isEmpty())
        return res.status(400).json({errors:errors.array()});

        try {
            const user=await User.findById(req.user.id).select("-password");
            const newPost=new Post({
                text: req.body.text,
                name:user.name,
                avatar:user.avatar,
                user:req.user.id
            })
            const post=await newPost.save();
            res.json(post);
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({msg:"Server Error"})
        }
       
});

router.get("/",auth,async(req,res)=>{
    try {
        const post=await Post.find().sort({date: -1});
        res.json(post);
    } catch (error) {
        console.log(error.message);
        return res.status(500).message({msg:"Server Error"});
    }
   
})


router.get("/:id",auth,async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id);
        res.json(post);
        if(!post)
        return res.status(404).json({msg:"Post not found"});
    } catch (error) {
        if(error.kind=='ObjectId')
        return res.status(404).json({msg:"Post not found"});

        console.log(error.message);
        return res.status(500).json({msg:"Server Error"});
    }   
})


router.delete("/:id",auth,async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id);
        if(!post) return res.status(404).json({msg:"Post not found"});
        if(post.user.toString()!==req.user.id)
        return res.status(401).json({msg:"User not Authorized"});

        await post.deleteOne();
        res.json({msg:"post removed"});
    } catch (error) {
        if(error.kind=='ObjectId')
        return res.status(404).json({msg:"Post not found"});
        
        console.log(error.message);
        return res.status(500).json({msg:"Server Error"});
    } 
})

router.put("/like/:id",auth,async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        
        if(post.likes.filter(like=>like.user.toString()===req.user.id).length>0)
        return res.status(400).json({msg:"Post already liked"});

        post.likes.unshift({user: req.user.id});
        await post.save();
        res.json(post.likes);
    } catch (error) {
        if(error.kind=='ObjectId')
        return res.status(404).json({msg:"Post not found"});

        console.log(error.message);
        return res.status(500).json({msg:"Server Error"})
    }
})


router.put("/unlike/:id",auth,async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        
        if(post.likes.filter(like=>like.user.toString()===req.user.id).length===0)
        return res.status(400).json({msg:"Post has not liked yet"});

        const removeIndex= post.likes.map(like=>like.user.toString()).indexOf(req.user.id);
        post.likes.splice(removeIndex,1);
        await post.save();
        
        res.json(post.likes);
    } catch (error) {
        if(error.kind=='ObjectId')
        return res.status(404).json({msg:"Post not found"});

        console.log(error.message);
        return res.status(500).json({msg:"Server Error"})
    }
})


router.post('/comment/:id',auth,
    [   
    check('text','text is required').not().isEmpty(),
    ],
    async(req,res)=>{

        const errors=validationResult(req);
        if(!errors.isEmpty())
        return res.status(400).json({errors:errors.array()});

        try {
            const user=await User.findById(req.user.id).select("-password");
            const post=await Post.findById(req.params.id);
            const newComment=new Post({
                text: req.body.text,
                name:user.name,
                avatar:user.avatar,
                user:req.user.id
            })
            post.comments.unshift(newComment);
            await post.save();
            res.json(post.comments);
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({msg:"Server Error"})
        } 
});

router.delete("/comment/:id/:comment_id",auth,async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id);
        const comment=post.comments.find(comment=>comment.id===req.params.comment_id);
        if(!comment)
        return res.status(404).json({msg:"comment does not exist"});

        if(comment.user.toString()!==req.user.id)
        return res.status(404).json({msg:"user not authorized"});

        const removeIndex=post.comments.map(comment=>comment.user.toString()).indexOf(req.user.id);
        post.comments.splice(removeIndex,1);
        await post.save();
        res.json(post.comments);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({msg:"Server error"});
    }
})
module.exports=router;