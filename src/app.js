const express = require("express");
const connectDB = require("./config/database.js");
const UserModel = require("./models/user.js");
const { validateSignUpdata } = require("./Utils/validation.js");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
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
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      //create a JWT Token
      //add the token to cookie and send the resoponse back to the user
      res.cookie("token", "gWHFEUKYALS4kjg5jh34v5jh34v");
      res.send("Login Successful");
    } else {
      res.send("Password is not coorect");
    }
  } catch (error) {
    res.status(404).send({ customError: error.message });
  }
});

app.get("/profile", async (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);
  const { token } = cookies;
  //Validate the token
  res.send("Reading cookies");
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

connectDB()
  .then(() => {
    console.log("Datbase connection established...");
    app.listen(3000, () => console.log("Server is listening on port 3000...."));
  })
  .catch((err) => {
    console.error("Database connection cannot be established", err);
  });
