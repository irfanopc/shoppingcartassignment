const User = require('../models/user');
const router = require("express").Router();

router.post("/login",async(req,res)=>{
    try {
        const{username,password} = req.body;
        let user = await User.findOne({username}).select('+password');
        if(!user){
            return res.status(400).json({message:'user doesnot exist'})
        }

       const isMatch = await user.matchPassword(password)
       if(!isMatch){
        return res.status(401).json({message:'incorrect password'})
       }
       const token = await user.generateToken();
       const expiryDate = {
        expires : new Date(Date.now()+90*24*60*60*1000),
        httpOnly : true

       }
       res.status(200).cookie("token",token,expiryDate).json({user ,token})
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;

