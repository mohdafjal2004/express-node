//starting point of the application
const express = require("express");
//now we are creating a new application using express server
//so this application is a new web server, so this server can listen
//to incoming request
const app = express(); //app = application

app.use("/dashboard/123", (req, res) => {
  res.send("Hello from the dashboard 123");
});
app.use("/dashboard", (req, res) => {
  res.send("Hello from the dashboard");
});
app.use("/test", (req, res) => {
  res.send("Hello from the slash");
});

//this will only handle GET  calls to "/user"
app.get("/user", (req, res) => {
  res.send({ name: "Afjal", age: 100 });
});
//this will only handle POST  calls to "/user"
app.post("/user", (req, res) => {
  res.send("Data saved successfully");
});
app.use("/", (req, res) => {
  res.send("Hello fr?om the asd");
});
app.listen(3000, () => console.log("Server is listening on port 3000...."));
