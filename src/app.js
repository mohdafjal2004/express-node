const express = require("express");

const app = express();



// Another way of passing middleware
app.get("/user/data", (req, res) => {
  try {
    throw new Error("THis is error generated");
  } catch (error) {
    res.status(500).send("Some Error contact support team");
  }
});

//This middleware is only called "After" the error is not handled in trycatch
// in controlller of route of "/user/data"
app.use("/", (err, req, res, next) => {
  if (err) {
    //log your error and also handle the errror
    res.status(500).send("Something went wrong");
  }
});


app.listen(3000, () => console.log("Server is listening on port 3000...."));
