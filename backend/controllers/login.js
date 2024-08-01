import User from "../models/User.js";
import asyncErrors from "../middleware/asyncErrors.js";
import sendToken from "../utils/jwtToken.js";

export const login = asyncErrors(async(req, res, next) =>{
  const { email, password } = req.body;

  if(!email || !password){
    return res.status(400).json({ message: "Please enter Email and/or Password" });
  }

  const user = await User.findOne({ email }).select("+password");

  if(!user){
    return res.status(400).json({ message: "Invalid Email" });
  }

  const isMatch = await user.comparePassword(password);
  
  if(!isMatch){
    return res.status(400).json({ message: "Invalid Password" });
  };

  sendToken(user, 200, res);
});