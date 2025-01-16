const express = require("express");
const { userAuth } = require("../middlewares/authAdmin");
const { validateProfileData } = require("../Utils/validation");
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
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateProfileData(req)) {
      throw new Error("Invalid EDIT Request");
    }
    const loggedInUser = req.user;

    console.log("Logged in user ", loggedInUser);
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();

    res
      .send(loggedInUser.firstName + " your profile Updated Successfully")
      .json({ message: "Success" });
  } catch (error) {
    res.status(400).send("Error => " + error.message);
  }
});
module.exports = profileRouter;
