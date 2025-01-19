const express = require("express");
const UserModel = require("../models/user");
const { userAuth } = require("../middlewares/authAdmin");
const ConnectionRequest = require("../models/connectionRequest");
const userRouter = express.Router();
//API level validation
userRouter.patch("/user/:userId", async (req, res) => {
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

// Get all the pending conection request for the loggedin User
userRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", ["firstName", "lastName"]);
    res.json({ message: "Data fetched successfully", connectionRequests });
  } catch (error) {
    res.status(400).send("ERROR:" + error.message);
  }
});

module.exports = userRouter;
