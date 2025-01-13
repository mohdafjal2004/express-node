const express = require("express");
const connectDB = require("./config/database.js");
const UserModel = require("./models/user.js");
const app = express();

app.use(express.json());

// Update a user
app.patch("/update", async (req, res) => {
  // Whatever the key passed in the body object use the same here
  const userId = req.body.userId;
  const data = req.body;
  try {
    const user = await UserModel.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
    });

    res.status(200).send({ status: "Success", dataResponse: user });
  } catch (error) {
    res.status(500).send({ status: "Something went wrong", response: error });
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
