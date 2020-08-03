const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const User = mongoose.model("User");

const authRoute = express.Router();

authRoute.post("/signup", async (req, res) => {
  console.log(req.body);

  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = new User({ email, password });
    const userSaved = await user.save();

    const token = jwt.sign({ userId: userSaved._id }, "MY_SECRET_KEY");

    res.send({ token });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

authRoute.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: "must provide email  or password " });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).send({ error: "Email or password not found" });
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");

    console.log("password matched successfully" + token);

    res.send({ token });
  } catch (err) {
    return res.status(422).send({ error: "Invalid email or password" });
  }
});
module.exports = authRoute;
