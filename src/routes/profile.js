const express = require("express");
const { userAuth } = require("../middlewares/authAdmin");
const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
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
module.exports = profileRouter;
