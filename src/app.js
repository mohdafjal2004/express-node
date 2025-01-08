const express = require("express");

const app = express();

//handle Auth Middleware for all request GET, POST using app.use()
app.use("/admin", (req, res, next) => {
  //Logic for checking if the request is authorised
  const token = "toke123";
  const isAdminAuthorised = token === "token123";
  if (isAdminAuthorised) {
    // and now logic for fetching all the data
    next();
  } else {
    res.status(401).send("Unauthorised request");
  }
});
app.get("/admin/fetchAllData", (req, res) => {
    //logic for sending the data to the admin
  res.send("All Data Sent");
});
app.get("/admin/deleteUser", (req, res) => {
  //logic for delete the user
  res.send("Deleted a user");
});

app.listen(3000, () => console.log("Server is listening on port 3000...."));
