const express = require("express");
const connectDB = require("./config/database.js");
const UserModel = require("./models/user.js");
const app = express();

app.use(express.json());
app.post("/signup", async (req, res) => {
  console.log(req.body);

  //Creating a new instance of the user model
  const user = new UserModel(req.body);
  await user.save();
  res.send({ status: "User Saved Successfully", data: user });
});

// GET user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.email;
  console.log("Email is ", userEmail);
  try {
    const user = await UserModel.find({ email: userEmail });
    if (user.length > 0) {
      res.send(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send("Somethi ng went wrong");
  }
});
// GET all USERS
app.get("/all", async (req, res) => {
  try {
    const user = await UserModel.find({});
    if (user.length > 0) {
      res.send(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send("Somethi ng went wrong");
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
