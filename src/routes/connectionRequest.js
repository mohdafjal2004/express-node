const express = require("express");
const { userAuth } = require("../middlewares/authAdmin");
const ConnectionRequest = require("../models/connectionRequest");
const UserModel = require("../models/user");
const requestRouter = express.Router();

// Here Both the APIs are giving the access of same document
requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      //fromUserId is from the user logged, getting data from cookie
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).send("Invalid Staus Type " + status);
      }

      //Check whether the toUserId exists in the dataabse, if exist go on, else
      //not allowed
      const toUser = await UserModel.findById(toUserId);
      if (!toUser) {
        return res.status(400).json({
          message: "User not found",
        });
      }

      //If there is an existing connectionRequest
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        return res
          .status(400)
          .send({ message: "Connection Request Already sent" });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connectionRequest.save();
      res.json({
        message:
          req.user.firstName + " is " + status + " in " + toUser.firstName,
        data,
      });
    } catch (error) {
      res.status(400).send("ERROR:" + error.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      // Afjal -> Elon
      // If Elon is logged in, means here he is getting the request after
      //logged in, so loggedinUser = toUserId
      const loggedInUser = req.user;
      const { requestId, status } = req.params;
      // Validate the Status
      const allowedInterested = ["accepted", "rejected"];
      if (!allowedInterested.includes(status)) {
        return res.status(400).json({ message: "Status not allowed" });
      }

      //So elon can only accepted or rejected only if the connection request
      // status is in "interested" state
      //   request id should be valid
      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });

      if (!connectionRequest) {
        return res
          .status(400)
          .json({ message: "Connection request not found" });
      }

      connectionRequest.status = status;
      const data = await connectionRequest.save();
      res.json({ message: "Connection Request" + status, data });
    } catch (error) {
      res.status(400).send("Error :" + error.message);
    }
  }
);
module.exports = requestRouter;
