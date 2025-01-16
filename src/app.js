const express = require("express");
const connectDB = require("./config/database.js");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth.js");
const connectionRouter = require("./routes/connectionRequest.js");
const profileRouter = require("./routes/profile.js");
const userRouter = require("./routes/user.js");

app.use("/", authRouter)
app.use("/", connectionRouter);
app.use("/", profileRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("Datbase connection established...");
    app.listen(3000, () => console.log("Server is listening on port 3000...."));
  })
  .catch((err) => {
    console.error("Database connection cannot be established", err);
  });
