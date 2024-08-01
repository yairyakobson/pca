import User from "../models/User.js";
import sendToken from "../utils/jwtToken.js";
import asyncErrors from "../middleware/asyncErrors.js";

export const register = asyncErrors(async(req, res) =>{
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ $or: [{ email }, { name }] });

  if(existingUser){
    const existingField = existingUser.email === email ? 'Email' : 'Username';
    return res.status(400).json({ message: `${existingField} already exists` });
  }

  const newUser = await User.create({
    name,
    email,
    password
  });
  sendToken(newUser, 201, res);
});