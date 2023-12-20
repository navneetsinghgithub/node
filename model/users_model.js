const mongoose = require("mongoose")
 const usersschema = new mongoose.Schema({
  name:{type:String},
  lastname:{type:String},
  email:{type:String},
  password:{type:String},
  contact:{type:String},
  token:{type:String},
  contact:{type:String},
  logintime:{type:String},
 },{timestamps:true});

 const users = mongoose.model('users',usersschema);

 module.exports = users;