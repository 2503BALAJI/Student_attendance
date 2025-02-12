// authentication , isStudent, isAdmin these two for athorization

const jwt = require("jsonwebtoken");
require("dotenv").config(); // .env file handle karyasathi

exports.auth = (req, res, next) => {
  try {
    // extract jwt token
    // pending other ways to fetch token 1. req.cookie.token
    const token = req.body.token;
    // if token is not present
    if (!token) {
      res.status(401).json({
        success: false,
        message: "Token missing ",
      });

      // verify the Token
      try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Printing decoded data", decode);
        req.user = decode;

      } catch (error) {
        return res.status(401).json({
          success: false,
          message: "token is Invalid ",
        });
      }
    }

    next();  // This is for next middleware which we have to hit to authorization 

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "something went wrong while verifying the token",
    });
  }
};

// 2. middleware

exports.isStudent = (req, res, next) => {
  try {
    if (req.user.role !== "Student") {
      return res.status(401).json({
        success: false,
        message: "this is Protected Routes",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "user Role is not matching ",
    });
  }
};

// 3 rd middleware

exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is a protected Routes for admin ",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User Role is Not Matching ",
    });
  }
};

// isStudent and IsAdmin la Authorzation sathi use kele ahe v

exports.auth = (req, res, next) => {
    try {
      // Extract JWT token
      const token = req.body.token 
      
      // Check if the token is present
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Token missing",
        });
      }
  
      // Verify the token
      try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Printing decoded data", decode);
  
        
        req.user = decode;
      } catch (error) {
        return res.status(401).json({
          success: false,
          message: "Token is invalid",
        });
      }
  
      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong while verifying the token",
      });
    }
  };
  