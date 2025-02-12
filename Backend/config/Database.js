const mongoose = require("mongoose"); 
require("dotenv").config(); 
exports.connect = () =>{
    mongoose.connect(process.env.MONGODB_URL)

    .then(()=>{console.log("Db Connected sucessfully")})
    .catch((err)=>{
        console.log("Error in DB Connection");
        console.log(err);
        process.exit(1) 
    })
}
