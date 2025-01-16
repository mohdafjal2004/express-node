const express = require("express");
const { userAuth } = require("../middlewares/authAdmin");
const requestRouter = express.Router();

requestRouter.post("/connectionRequest", userAuth, (req, res) => {
  const { user } = req;
  console.log("Sending a connection");
  res.send(user.firstName + " send the Connection Request");
});
module.exports = requestRouter;
