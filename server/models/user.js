const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: [true, "user already exist"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    select: false,
  },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}
userSchema.methods.generateToken = async function(){
    return jwt.sign({_id:this._id}, process.env.JWT_SECRET)
}
const User = mongoose.model("User", userSchema);
module.exports = User;
