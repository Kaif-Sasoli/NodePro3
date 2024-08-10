        //*********      isLoggedIN Middleware   *******************

const JWT = require('jsonwebtoken');  // Requring the JWT (Json Web Token)
const { User, Owner } = require('../models/userModel'); // Requring the User & Owner Model

module.exports.isLoggedIn = async function (req, res, next) {

    // check is Cookies are set
     if(!req.cookies.token){
        req.flash("Error",  "You need login first!");
        return res.redirect('/login');
     }

      try {
        // Decode the cookies
          let decoded = JWT.verify(req.cookies.token, process.env.JWT_KEY);

          let user = await User.findOne({ email: decoded.email }).select('-password');
          if(user){
          req.user = user;
          return next();
          }

           // Check for owner in Owner model if user not found
        let owner = await Owner.findOne({ email: decoded.email }).select('-password');
        if (owner) {
            req.owner = owner;
            return next();
        }
        
      }
       catch (err) {
        req.flash("error","Error while verifying");
        res.redirect('/login');
       }
}

// Logged In2 
module.exports.isLoggedIn2 = async function (req, res, next) {
   
    //  Check is the cookies are set
    if(!req.cookies.token){
       req.flash("Error",  "You need login first!");
       return res.json({ success: false, message: "You need to login first!"});
    }

     try {
        // Decode the cookies
         let decoded = JWT.verify(req.cookies.token, process.env.JWT_KEY);
         let user = await User.findOne({ email: decoded.email }).select('-password');
         req.user = user;
         next();

       
     }
      catch (err) {
       req.flash("error","Error while verifying");
       return res.json({ success: false, message: "Error while verifying!"});
      }
}

// User or Owner Picture for the Header
module.exports.userPicture = async function (req, res, next) {

    try {
    //   Check is the Cookies are Set
    if(req.cookies.token){

        let decoded = JWT.verify(req.cookies.token, process.env.JWT_KEY);

        let user = await User.findOne({ email: decoded.email }).select('-password');
        let owner = await Owner.findOne({ email: decoded.email }).select('-password');
        
        if(user){
            res.locals.userPicture = user.picture;
        }
         else if(owner) {
            res.locals.userPicture = owner.picture;
         }
       } else {
         res.locals.userPicture = null;
    }
        } catch(e) {
            res.locals.userPicture = null;
        }

    next();
}
 
//  isAdmin Middleware
module.exports.isAdmin = function(req, res, next) {
    if (req.owner && req.owner.isAdmin) {
        next();
    } else {
        res.status(403).send("Access denied");
    }
}

