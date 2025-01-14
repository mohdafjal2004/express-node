const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
const userAuth = async (req, res, next) => {
  try {
    //read the token from the req.cookies
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Token is not found");
    }
    //validate the token
    const decodedObj = await jwt.verify(token, "AFJALSECRETKEY");
    const { _id } = decodedObj;
    //Find the user
    const user = await UserModel.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    //** 𝗔𝘁𝘁𝗮𝗰𝗵𝗶𝗻𝗴 𝘁𝗵𝗲 𝘂𝘀𝗲𝗿 𝗱𝗮𝘁𝗮 𝗯𝗮𝗰𝗸 𝗶𝗻 𝘁𝗵𝗲 𝗿𝗲𝗾 𝗼𝗯𝗷𝗲𝗰𝘁 𝘀𝗼 𝘁𝗵𝗮𝘁
    //** 𝗰𝗼𝗻𝘁𝗿𝗼𝗹𝗹𝗲𝗿 𝗳𝘂𝗻𝗰𝘁𝗶𝗼𝗻 𝗰𝗮𝗻 𝗮𝗰𝗰𝗲𝘀𝘀 𝗶𝘁 , 𝗦𝗺𝗮𝗿𝘁 𝗠𝗼𝘃𝗲 */ */
    req.user = user;
    next();
  } catch (error) {
    console.log("Error => ", error.message);
    res.status(404).send("Error : " + error.message);
  }
};
module.exports = { userAuth };
