const authAdmin = (req, res, next) => {
  //Logic for checking if the request is authorised
  const token = "token123";
  const isAdminAuthorised = token === "token123";
  if (isAdminAuthorised) {
    // and now logic for fetching all the data
    next();
  } else {
    res.status(401).send("Unauthorised request");
  }
};
const userAuth = (req, res, next) => {
  //Logic for checking if the request is authorised
  const token = "token123";
  const isAdminAuthorised = token === "token123";
  if (isAdminAuthorised) {
    // and now logic for fetching all the data
    next();
  } else {
    res.status(401).send("Unauthorised request");
  }
};
module.exports = { authAdmin, userAuth };
