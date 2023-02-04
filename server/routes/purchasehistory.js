const express = require("express");
const router = express.Router();
const PurchaseHistory = require("../models/purchasehistory");
const User = require("../models/user");
router.post("/purchase", async (req, res) => {
  try {
    const { username } = req.body;
    let user = await User.findOne({ username });
    const { pdf } = req.body;
    const property = await PurchaseHistory.create({pdf,...req.body });
    user.properties.push(property);
    await user.save();
    res.status(200).send({ property });
  } catch (error) {
    console.log(error);
  }
});

router.get("/history/:id", async (req, res) => {
  try {
    const { id: userId } = req.params;
    const purchasehistory = await User.find({ _id: userId }).populate("properties" );
    if (!purchasehistory) {
      return res.status(400).json({
        success: false,
        message: "no purchase history",
      });
    }
    //res.status(200).send({ history });
    if (purchasehistory) {
      res.status(200).json({
        success: true,
        purchasehistory,
      });
    }
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
