const express = require("express");
const connectDB = require("./config/database.js");
const UserModel = require("./models/user.js");
const app = express();

app.use(express.json());

// Update a user
app.post("/signup", async (req, res) => {
  const data = req.body;
  try {
    const user = await UserModel(data);
    await user.save();
    res.status(200).send({ status: "Success", dataResponse: user });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//findByIdAndUpdate but enabling the validation by default
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
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
