//starting point of the application
const express = require("express");
//now we are creating a new application using express server
//so this application is a new web server, so this server can listen
//to incoming request
const app = express(); //app = application

app.use("/dashboard", (req, res) => {
  res.send("Hello from the dashboard");
});
app.use("/test", (req, res) => {
  res.send("Hello from the slash");
});
app.use("/", (req, res) => {
  res.send("Hello fr?om the asd");
});
app.listen(3000, () => console.log("Server is listening on port 3000...."));
