const express=require("express");
const router=express.Router();
const auth=require("../../middleware/auth");
const Profile=require("../../models/Profile");
const User=require("../../models/Users");
const Post=require('../../models/Post');
const {check, validationResult}=require("express-validator");
const request=require("request");
// const config=require("config");
const { deleteMany } = require("../../models/Profile");
//@api/profile/me
router.get('/me',auth, async(req,res)=>{
    try{
    const profile=await Profile.findOne({user: req.user.id}).populate('user',['name','avatar']);
    if(!profile){
        return res.status(400).json({msg:"There is no profile for this user"});
    }
    res.json(profile)
    }catch(err){
        console.error(err.message)
        res.status(500).json({msg:"Server error"});
    }
});

router.post("/",auth,
[check('status','status is required').not().isEmpty(),
check('skills','skills is required').not().isEmpty()],
    async (req,res)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }

        const {
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            instagram,
            twitter,
            linkedin
        }=req.body;

        const ProfileFields={};
      
        ProfileFields.user=req.user.id;
        if(company) ProfileFields.company=company;
        if(location) ProfileFields.location=location;
        if(bio) ProfileFields.bio=bio;
        if(website) ProfileFields.website=website;
        if(status) ProfileFields.status=status;
        if(githubusername) ProfileFields.githubusername=githubusername;

        if(skills) {
            ProfileFields.skills=skills.split(',').map(skill=>skill.trim());
        }

        ProfileFields.social={};
        if(youtube) ProfileFields.social.youtube=youtube;
        if(instagram) ProfileFields.social.instagram=instagram;
        if(linkedin) ProfileFields.social.linkedin=linkedin;
        if(twitter) ProfileFields.social.twitter=twitter;
        if(facebook) ProfileFields.social.facebook=facebook;
        
        try{
            let profile=await Profile.findOne({user:req.user.id});
            if(profile)
            {
                //update
                profile=await Profile.findOneAndUpdate(
                    {user:req.user.id},
                    {$set: ProfileFields},
                    {new: true}
                );
                return res.json(profile)
            }
            //create
            profile=new Profile(ProfileFields);
            await profile.save();
            res.json(profile);

        }catch(err){
            console.error(err.message);
            return res.status(500).json({msg:"Server error"})
        }

    })

router.get("/", async(req,res)=>{
    try {
        const profiles= await Profile.find().populate('user',["name","avatar"]);
        res.json(profiles);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({msg:"server not found"});
    }
})

router.get("/user/:user_id", async(req,res)=>{
    try {
        const profile= await Profile.findOne({user: req.params.user_id}).populate('user',["name","avatar"]);
        res.json(profile);
        if(!profile)
        return res.status(500).json({msg:'there is no profile for this user'});
    } catch (error) {
        if(error.kind=='ObjectId')
        res.status(500).json({msg:"There is no profile for this user"})
        console.log(error.message);
        res.status(500).json({msg:"server not found"});

    }
})


router.delete("/", auth,async(req,res)=>{
    try {
        await Post.deleteMany({user: req.user.id});
        const profile= await Profile.findOneAndRemove({user: req.user.id});
       await User.findOneAndRemove({ _id: req.user.id })
        if(!profile)
        return res.status(500).json({msg:'there is no profile for this user'});
        else
        res.json({msg:"User is deleted"});

    } catch (error) {
        if(error.kind=='ObjectId')
        res.status(500).json({msg:"There is no profile for this user"})
        console.log(error.message);
        res.status(500).json({msg:"server not found"});

    }
})

router.put("/experience",auth,
[
    check('title','title is required')
    .not()
    .isEmpty(),
    check('company','Company required')
    .not()
    .isEmpty(),
    check('from','Add start date')
    .not()
    .isEmpty()
],


async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).status({msg:errors.array})
    }

    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }=req.body;
    const NewExp={
        title,
        company,
        location,
        from,
        to,
        current,
        description
    };

    try {
        const profile=await Profile.findOne({user:req.user.id})
        profile.experience.unshift(NewExp);
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(400).send("Server error");
    }
})

router.put("/education",auth,
[
    check('school','School is required')
    .not()
    .isEmpty(),
    check('degree','degree is required')
    .not()
    .isEmpty(),
    check('fieldofstudy','Field of study is required')
    .not()
    .isEmpty(),
    check('from','Add start date')
    .not()
    .isEmpty()
],


async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).status({msg:errors.array})
    }

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }=req.body;
    const NewExp={
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    };

    try {
        const profile=await Profile.findOne({user:req.user.id})
        profile.education.unshift(NewExp);
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(400).send("Server error");
    }
})


router.delete("/experience/:exp_id",auth,async(req,res)=>{
 try {
    const profile=await Profile.findOne({user:req.user.id});
    const removeIndex=profile.experience.map(item=>item.id).indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex,1);
    await profile.save();
    res.json(profile);
 } catch (error) {
    console.log(error.message);
    res.status(500).json({msg:"Server not found"})
 }
})


router.delete("/education/:edu_id",auth,async(req,res)=>{
    try {
       const profile=await Profile.findOne({user:req.user.id});
       const removeIndex=profile.education.map(item=>item.id).indexOf(req.params.edu_id);
   
       profile.education.splice(removeIndex,1);
       await profile.save();
       res.json(profile);
    } catch (error) {
       console.log(error.message);
       res.status(500).json({msg:"Server not found"})
    }
   })

router.get("/github/:username", (req,res)=>{
    try{
        const options={
            uri:`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${process.env.githubClientId}&client_secret=${process.env.githubClientSecret}`,
            method:"GET",
            headers:{'user-agent':'node.js'}
        };
        request(options,(error, response, body)=>{
            if(error) console.error(error);
            if(response.statusCode!==200)
            res.status(404).json({msg:'No github profile found'});
            res.json(JSON.parse(body));
        })
    }catch(err){
        console.log(err.message);
        res.status(500).json({msg:"server error"});
    }
})
   
module.exports=router;