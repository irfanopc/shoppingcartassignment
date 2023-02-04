const User = require("../models/user");
const router = require("express").Router();
router.post("/register", async (req, res) => {
  try {
    const { username, password, confirmpassword } = req.body;
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "user already exist" });
    }
    if (password !== confirmpassword) {
      return res.status(400).json({ message: "password doesnot match" });
    }
    user = await User.create({ username, password });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
});

module.exports = router;
