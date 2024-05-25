import express from "express";
import mongoose from "mongoose";
import { User } from "./models/User.js";

const app = express();
const port = 3000;

// MIDDLEWARE
app.use(express.json());

// database connectivity
mongoose
  .connect("mongodb://localhost:27017/LoginSignupPage")
  .then(() => {
    console.log("server is succesfully connected with the data base");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("This is the basic home endpoint");
});

app.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
     return  res.status(400).send("user already exists");
    }
    const user = new User({ username, password, email });
    await user.save();
    res.status(201).send("User registered successfully");
  } catch (err) {
    return res.status(400).send("Error registering user: " + err.message);
  }
});

app.post("/login", async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    try{
    const userExists= await User.findOne({username});
    if(!userExists){
        return res.status(401).send("User doesn't Exist or Check Your Username")
    }
    if(userExists.password!==password){
        return res.status(401).send("Enter the correct password")
    }else{
        return res.send("you have succesfully logged in")
    }
    }catch(err){
        res.status(500).send("Server error: " + err.message);
    }
})

app.listen(3000, () => {
  console.log("the server has started");
});
