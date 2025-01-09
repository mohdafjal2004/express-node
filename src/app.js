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
connectDB()
  .then(() => {
    console.log("Datbase connection established...");
    app.listen(3000, () => console.log("Server is listening on port 3000...."));
  })
  .catch((err) => {
    console.error("Database connection cannot be established");
  });
