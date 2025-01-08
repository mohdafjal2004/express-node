//starting point of the application
const express = require("express");
//now we are creating a new application using express server
//so this application is a new web server, so this server can listen
//to incoming request
const app = express(); //app = application
app.get("/he*llo", (req, res) => res.send({ name: "Afjal" }));

app.get("/user", (req, res, next) => {
  console.log("Handling the 1st user route");
  
  next();
});
app.get("/user", (req, res) => {
  console.log("Handling the 2nd user route");

  res.send("2nd Response");
});

app.listen(3000, () => console.log("Server is listening on port 3000...."));
