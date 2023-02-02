const router = require('express').Router();
const Product = require("../models/product");
router.get("/product",async(req,res)=>{
try {
    const products = await Product.find({})
    res.status(200).json({products});

} catch (error) {
    console.log(error);
}
})

router.put('/edit/:id',async(req,res)=>{
try {
    const{id:productID} = req.params;
    const newData = await Product.findByIdAndUpdate({_id:productID},req.body);
    res.status(200).json({newData})
} catch (error) {
    console.log(error);
}
})
module.exports = router
