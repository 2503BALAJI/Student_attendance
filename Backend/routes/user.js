const express = require("express");
const router = express.Router(); // Creates a router instance

// Import controllers (functions that handle requests)
const { login, signup } = require("../Controllers/Auth");


//...................... middleware la  import kele .......................................................
const {auth, isStudent,isAdmin} = require("../middlewares/auth")

// testing protected routes for single middleware
router.get("/test",auth,(req,res)=>{
    console.log(" Test chi Route hit zali")
    res.json({
        success:true,
        message:'welcome to the Test protected Routes '
    })
})

// ...................protected Routes -- visibility for UI on basis of ROLE...................

router.get("/student",auth,isStudent,(req,res)=>{
    res.json({
        success:true,
        message: 'welcome to the protected routes for student '
    })
}) 
// admin wali request 
router.get("/admin",auth,isAdmin,(req,res)=>{
    res.json({
        success:true,
        message:'welcome to protected routes for  admin Routes'
    })
})



// Define routes with corresponding handlers
router.post("/signup", signup);
router.post("/login", login);   


module.exports = router;
