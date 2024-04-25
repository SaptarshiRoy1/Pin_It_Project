var express = require('express');
var router = express.Router();
var userModel=require("./users")
var postModel=require("./posts")
const localStrategy = require("passport-local");
const passport = require('passport');
passport.use(new localStrategy(userModel.authenticate()));
const upload = require("./multer")
// const upload = multer({dest: "uploads/"})

/* GET home page. */
// RENDER THE PAGES

router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/register', function(req, res, next) {
  res.render('index');
});
router.get('/login', function(req, res, next) {
  let errormassage =req.flash("error")
  console.log(errormassage)
  res.render('login',{errormassage});
});
router.get('/feed', function(req, res, next) {
  res.render('feed');
});

router.get('/profile',isLoggedIn,async function(req, res, next) {

  var user1 = await userModel.findOne({
    username: req.session.passport.user
  }).populate("posts")
  res.render("profile",{user1});
});




// MANAGE THE ROUTES AND USER LOGIN

router.post("/register",function(req,res){
  var userdata = new userModel({
    username:req.body.username,
    email:req.body.email,
    fullname:req.body.fullname,
  });

  userModel.register(userdata,req.body.password)
  .then(function (registereduser){
    passport.authenticate("local")(req,res,function(){
      res.redirect("/profile")
    })
  })
})

router.post("/login",passport.authenticate("local",{
  successRedirect:"/profile",
  failureFlash:true,
  failureRedirect:"/login",
}),function(){})

router.get("/logout",function (req,res,next) {
  req.logout(function(err){
    if(err){return next(err);}
    res.redirect("/");
  });  
});

// CHECKING FUNCTION FOR LOGIN------------

function isLoggedIn(req,res,next) {
if(req.isAuthenticated()){
  return next()
}else{res.redirect("/login")}  
}

//Multer---------

router.post("/upload",isLoggedIn,upload.single("file"),async (req,res,next)=>{
  if(!req.file){
    return res.status(404).send("No files were uploaded");
    
  }
  // console.log(req.body);

  // Now link Loggedin-user && post using data-association
   var user1 = await userModel.findOne({username: req.session.passport.user});
   const postdata = await postModel.create({
    image: req.file.filename,
    postText: req.body.filecaption,
    user: user1._id
   });

   user1.posts.push(postdata._id)
   await user1.save();
   
  //  res.send("File Uploaded Successfully");
   res.redirect("/profile")
});

module.exports = router;
