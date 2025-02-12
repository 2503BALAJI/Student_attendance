const bcrypt = require("bcrypt");

const User = require("../models/user");
const jwt = require("jsonwebtoken"); 
require("dotenv").config() 


// signup route handler 
exports.signup = async (req,res)=>{
    try{
        // get data from request body
        const {name,email,password,role} = req.body;
        console.log('request chya body madhu data baher kadhala',email)
        // check if user already exits
        const existing_user = await User.findOne({email});
        if(existing_user){
            return res.status(400).json({  
                success: false,
                message:"User or email is already exist "
            })
        }

        // user registered already sathi status code 201 use kartat 

        //secure password
        let hashedPassword ;
        try {
            // hashed function madhe 2 argument pathavtat ---, password and no.of round of hashing
            hashedPassword = await bcrypt.hash(password,10)
        } catch (error) {
            return res.status(500).json({
                success:false,
                message:"Error in Password Hashing"  
            })
        }

        //  create entry  अँड insert in database 
        const user = await User.create({   // User he model ahe 
            name,email,password:hashedPassword,role
        })
        return res.status(200).json({
            success:true,
            message:"user Registered in Db SuceeFully"
        })
    }
    catch(error) {
        console.error(error);
        res.status(500).json({
            success:false,
            message:"user cannot be registered , Please try again later "
        })
    }
}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Basic validation for empty fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the details carefully"
            });
        }

        // Check if user exists in database

        let user = await User.findOne({ email }); 
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User does not exist"
            });
        }

        //console.log("Database madhe save zalela password -- ", user.password);

        // Verify password ---  compare entered password with hased-password in database
        const ismatched = await bcrypt.compare(password, user.password);

        if (!ismatched) {
            return res.status(403).json({
                success: false,
                message: "Password is incorrect, enter valid password"
            });
        }

        // Create JWT token payload
        const payload = {
            email: user.email,
            id: user.id,
            role: user.role
        };

        // .....................Generate JWT-- token............................................

        let token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "2h" // Token expiry
        });

        user = user.toObject();         // user la  object madhe convert kela 
        user.token = token;        
        user.password=undefined;   
      


        // .......................Create cookei  ....................................

        // Cookie options maadhe expiray aste cookie chi 
        const options = {
            expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days
            httpOnly: true
        };


        // data madhe cookie madhe kay data store kraycha ahe te aste 
        const data = {
            email:user.email,
            password:user.password,        // cookie madhe password nahi takaycha security issue 
            role:user.role
        }

        console.log("Cookie madhe pathale la data", data)

            // cookie madhe cookie che nav(name), data , ani option,  pathvave lagte 

        // Send response with cookie and success message
        res.cookie("token", token, options).status(200).json({
            success: true,
            message: "Login successful",
            token,  // Optional: Send token if needed in response
            user        // cookie madhe user send kela        
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
