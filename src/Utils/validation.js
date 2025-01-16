const validator = require("validator");
const validateSignUpdata = (req) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  }
};
const validateProfileData = (req) => {
  const allowedEditFields = [
    ,
    "firstName",
    "lastName",
    "about",
    "photoUrl",
    "gender",
    "about",
    "skills",
  ];
  const isEditAllowed = Object.keys(req.body).every((field) => allowedEditFields.includes(field));
  return isEditAllowed
};
module.exports = { validateSignUpdata, validateProfileData };
