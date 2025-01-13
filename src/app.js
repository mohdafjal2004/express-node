const express = require("express");
const connectDB = require("./config/database.js");
const UserModel = require("./models/user.js");
const app = express();

app.use(express.json());

// GET all USERS
app.delete("/all", async (req, res) => {
  try {

    const user = await UserModel.findByIdAndDelete("6780060f853ec9621e948220");

    res.status(200).send("User deleted successfully");
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
