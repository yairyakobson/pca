import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
});

// Hash Password
UserSchema.pre("save", async function(next){
  if(!this.isModified("password")){
    next();
  };
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.generateToken = function(){
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME
  });
};

UserSchema.methods.comparePassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password);
}

export default mongoose.model("User", UserSchema);