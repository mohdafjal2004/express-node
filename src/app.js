const express = require("express");
const { authAdmin, userAuth } = require("./middlewares/authAdmin");

const app = express();

//handle Auth Middleware for all request GET, POST using app.use()
app.use("/admin", authAdmin);
app.get("/admin/fetchAllData", (req, res) => {
  //logic for sending the data to the admin
  res.send("All Data Sent");
});
app.get("/admin/deleteUser", (req, res) => {
  //logic for delete the user
  res.send("Deleted a user");
});

// Another way of passing middleware
app.get("/user/data", userAuth, (req, res) => {
  res.send("User Data Sent");
});

app.listen(3000, () => console.log("Server is listening on port 3000...."));
