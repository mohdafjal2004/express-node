const express = require("express");
const connectDB = require("./config/database.js");
const UserModel = require("./models/user.js");
const { validateSignUpdata } = require("./Utils/validation.js");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { userAuth } = require("./middlewares/authAdmin.js");
const app = express();

app.use(express.json());
app.use(cookieParser());

// Using a helper function to add to validation
app.post("/signup", async (req, res) => {
  const data = req.body;

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

app.post("/login", async (req, res) => {
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

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    console.log("User data after login is ", user);
    if (!user) {
      throw new Error("No user found");
    }

    res.status(200).send("Reading cookies" + user);
  } catch (error) {
    res.status(400).send("Error => " + error.message);
  }
});

//API level validation
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;
  const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];

  try {
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    const user = await UserModel.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(user);
    res.send("User updated successfully");
  } catch (error) {
    res.status(400).send({
      message: "UPDATE FAILED",
      error: error,
    });
  }
});

app.post("/connectionRequest", userAuth, (req, res) => {
  const { user } = req;
  console.log("Sending a connection");
  res.send(user.firstName + " send the Connection Request");
});

connectDB()
  .then(() => {
    console.log("Datbase connection established...");
    app.listen(3000, () => console.log("Server is listening on port 3000...."));
  })
  .catch((err) => {
    console.error("Database connection cannot be established", err);
  });
