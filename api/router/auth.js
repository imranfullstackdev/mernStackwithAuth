const express = require("express");
const router = express.Router();
const USER = require("../userschema/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");
// register route
router.get("/", (req, res) => {
  res.send("Welcome to home page");
});
router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, Cpassword } = req.body;
  // to check verify i all the exist or not
  if (!name || !email || !phone || !work || !password || !Cpassword) {
    return res.status(401).json({ error: "PLZ Fill All the data" });
  }
  try {
    const userExit = await USER.findOne({ email: email });
    if (userExit) {
      return res.status(400).send({ err: "email already exist" });
    } else if (password != Cpassword) {
      res.status(400).json({ err: "password dont match" });
    }
    const user = new USER({ name, email, phone, work, password, Cpassword });
    await user.save();
    res.status(201).json({ sus: "user register sucessfully" });
    console.log(user);
  } catch (error) {
    console.log(error);
  }
});

// login post
router.post("/login", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;
    console.log(email, password);
    if (!email || !password) {
      return res.status(400).json({ mes: "please fill all the data" });
    }
    const userLogin = await USER.findOne({ email });
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      if (!isMatch) {
        res.status(401).json({ error: "invalid Credential" });
      } else {
        let token = jwt.sign({ _id: userLogin._id }, process.env.SECRET_KEY);
        res.cookie("jwtoken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });
        res.send({ ...userLogin, tokenset: token });
      }
    } else {
      res.status(401).json({ error: "invalid Credential" });
    }
  } catch (error) {
    console.log(error);
  }
});
// about us the page
router.get("/about", authenticate, (req, res) => {
  console.log("helo from the about page");
  res.send({ userdetails: req.rootUser });
});
router.get("/getData", authenticate, (req, res) => {
  console.log("helo from the about page");
  res.send(req.rootUser);
});
// Contact form
router.post("/contact", authenticate, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message) {
      res.status(401).send({ err: "please fill all the Data" });
    }
    const userContact = await USER.findOne({ _id: req.userId });
    console.log(userContact)
    if (userContact) {
      const userMessage = await userContact.addMessage(name, email, phone, message);
      console.log("USER MeSSAGE",userMessage)
      await userContact.save();
      res.send({message:'messages updated sucessfully'})
    }
  } catch (error) {
    console.log(error);
  }
});
router.get("/Logout", (req, res) => {
  console.log("helo from the logout page");
 
  req.send({succ:'logout sucessfully'})
});

module.exports = router;
