const express = require("express");

const app = express(); 
require('dotenv').config(); 
const PORT = process.env.PORT || 4000


app.use(express.json()); 

//Db Connection function call 
require("./config/Database").connect();

// Route Import and mount

const user = require("./routes/user");  
app.use("/api/v1",user);

// activate servrer
app.listen(PORT,()=>{
    console.log(`App is listening at port ${PORT}`);
})