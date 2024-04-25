const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/PinterestData")
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
