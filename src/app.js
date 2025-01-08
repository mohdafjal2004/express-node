//starting point of the application
const express = require("express");
//now we are creating a new application using express server
//so this application is a new web server, so this server can listen
//to incoming request
const app = express(); //app = application
app.get("/he*llo", (req, res) => res.send({ name: "Afjal" }));

app.get(
  "/user",
  [
    (req, res, next) => {
      console.log("Handling the user route");
      next();
    },
    (req, res, next) => {
      console.log("Handling the  2nd user route");

      next();
    },
  ],
  (req, res, next) => {
    console.log("Handling the  𝟯𝗿d user route");

    // res.send("𝟯𝗿𝗱 Response");
    next();
  },
  (req, res, next) => {
    console.log("Handling the  𝟰𝘁𝗵 user route");

    res.send("𝟰𝘁𝗵 Response");
    next();
  }
);

app.listen(3000, () => console.log("Server is listening on port 3000...."));
