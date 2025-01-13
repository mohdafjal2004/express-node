const mongoose = require("mongoose");

const connectDB = async () => {
  
  await mongoose.connect(
    "mongodb+srv://mohdafjalgci2018:mohdafjalgci2018@learnnamastenodedemo.8srks.mongodb.net/devTinder"
  );
  //mongodb+srv://mohdafjalgci2018:mohdafjalgci2018@learnnamastenodedemo.8srks.mongodb.net/devTinder
  //Remember here we directly edit in db string at the end due to which
  //we have another database in the cluster
};
 
module.exports = connectDB
 


   