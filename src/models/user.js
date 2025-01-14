const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email Address" + email);
        }
      },
    },
    password: {
      type: String,
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default: "https://images.app.goo.gl/GJ13tsrjSDwazxGE8",
    },
    about: {
      type: String,
      default: "This is the default description ",
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

//Direct DB access methods
// Always use the regular function in the mongoose methods
userSchema.methods.getJWT = async function () {
  //here "this" will refer to a specific document on whom operating
  const token = await jwt.sign({ _id: this._id }, "AFJALSECRETKEY");
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  //here "this" will refer to a specific document on whom operating
  const hashPassword = await bcrypt.compare(passwordInputByUser, this.password);
  return hashPassword;
};

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
