const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/user");
const { validateSignUpdata } = require("../Utils/validation");

const authRouter = express.Router();
authRouter.post("/signup", async (req, res) => {
  validateSignUpdata(req);
  const { firstName, lastName, password, email } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const user = await UserModel({
      firstName,
      lastName,
      password: passwordHash,
      email,
    });

    await user.save();
    res.status(200).send({ status: "Success", dataResponse: user });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      throw new Error("Email id is not present in DB");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      //create a JWT Token after offloading the task to
      //mongoose methods
      const token = await user.getJWT();
      console.log(token);
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("Login Successful");
    } else {
      res.send("Password is not coorect");
    }
  } catch (error) {
    res.status(404).send({ customError: error.message });
  }
});
module.exports = authRouter;
