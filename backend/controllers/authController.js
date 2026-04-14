const User = require("../models/User")
const jwt = require("jsonwebtoken")

exports.register = async (req,res)=>{
  const user = await User.create(req.body)
  res.json({ success:true, user })
}

exports.login = async (req,res)=>{
  const user = await User.findOne({ email:req.body.email })

  if(!user) return res.json({ message:"User not found" })

  const token = jwt.sign({ id:user._id }, process.env.JWT_SECRET)

  res.json({ token })
}
