// middleware to check if user is signed in or signed up
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');


const authMiddleware = async (req,res,next) =>{
    try {

    const token = req.headers.bearer;
    // after getting token, check if token is valid
    if(!token){
        console.log({
            success:false,
            message:"Access denied, no token provided"
        })
        return res.status(403).send({
            success:false,
            message:"Access denied, no token provided"})
        
    }
    // verify the token
    const decoded = jwt.verify(token,process.env.SECRET);


    if(!decoded){
        console.log("User not found");
        return res.status(400).send({
            success:false,
            message: "User not found"
        })
    }
    req.user = decoded;
    next();  
    } catch (error) {
        return res.status(400).send({
            success:false,
            message:error.message,
        })
    }
}



module.exports = {authMiddleware};