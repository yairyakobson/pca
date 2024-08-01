import jwt from "jsonwebtoken";

import asyncErrors from "./asyncErrors.js";
import User from "../models/User.js";

export const isAuthenticatedUser = asyncErrors(async (req, res, next) =>{
  const { token } = req.cookies

  if(!token){
    return next(new Error("Login to gain access to this resource", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the user's token
  req.user = await User.findById(decoded.id);
  next();
});