import asyncErrors from "../middleware/asyncErrors.js";

export const logout = asyncErrors(async(req, res, next) =>{
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true
  });

  res.status(200).json({
    message: "Logged out",
  });
});