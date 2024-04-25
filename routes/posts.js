const mongoose = require("mongoose")
// mongoose.connect("mongodb://127.0.0.1:27017/post")

var postschema = new mongoose.Schema({
    postText:{
        type:String,
        default:"New Post",
    },
    image:{
        type:String
    },
    Cdate:{
        type:Date,
        default:Date.now
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    },
    
    likes:{
        type:Number,
        default:0
    }

})

module.exports = mongoose.model("posts",postschema)