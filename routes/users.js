const mongoose = require('mongoose');
require("dotenv").config()

//connect with local mongoDB database
// mongoose.connect("mongodb://127.0.0.1:27017/PinterestData")

//For MongoDB Atlass Database connect
mongoose.connect(process.env.DB_URL)

const plm = require("passport-local-mongoose")

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, },
  posts:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"posts"
  }],
  dp:{
    type:String    //assuming dp is stored as a url() file path
  },
  fullname:{
    type:String,
    required:true
  },
  // You can add more fields as per your requirements
});

userSchema.plugin(plm);

const user = mongoose.model('user', userSchema);

module.exports = user;
