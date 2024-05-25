import mongoose from "mongoose";

// Define the schema
const userSchema = new mongoose.Schema({
  username:String,
  password:String,
  email:String
});

// Create the model
export const User = mongoose.model('User', userSchema);

