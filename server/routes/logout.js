const express = require('express');
const router = express.Router();

router.get("/logout",async(req,res)=>{
   try {
   await res.status(200).cookie("token",null,{expires:new Date(Date.now()),httpOnly: true}).json({message : 'signout'})
   } catch (error) {
    console.log(error);
   }
})

module.exports = router;