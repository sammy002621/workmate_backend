const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const { signupSchema,loginSchema } = require('../validations/auth.validation');







const createUser = async(req,res)=>{
    // get the user data from the request body 

// validate the request body 
// if the request body is not valid then send the error message to the client
// if the request body is valid then save the user data to the database

const {error} = signupSchema.validate(req.body);

if(error){
    console.log(error.details[0].message);
    return res.status(400).send(error.details[0].message);
}


    // valid body proceed to user creation
    const {email,phone,compID,password} = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('User already exists');
            return res.status(400).send('User already exists');
        }else{
// Hash the password
const hashedPassword = await bcrypt.hash(password, 10);

// Create the user
const newUser = await User.create({
    email,
    phone,
    compID,
    password: hashedPassword
});

// if any error occurs while creating user 
if(!newUser){
    console.log('Failed to create User');
    return res.status(400).send({message:'Failed to create User'});
}else{
// Generate a token
const token = jwt.sign({ id: newUser._id }, process.env.SECRET, { expiresIn: process.env.EXPIRES_IN });

// Return the new user with the created token
if(!token){
    console.log('Failed to create token');
    return res.status(400).send({message:'Failed to create token'});
}else{
    console.log('User created');
    return res.status(201).send({
        user: newUser,
        token: token,
        });
}
}
        }

        

        
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({
            error: error.message,
    });
    }  


    }



const loginUser = async(req,res)=>{
    // get the user data from the request body
    // validate the request body
    // if the request body is not valid then send the error message to the client
    // if the request body is valid then check if the user exists
    // if the user exists then check if the password is correct
    // if the password is correct then generate a token and return the user with the token
    // if the password is incorrect then send an error message to the client
    const {email,password} = req.body;

    const {error} = loginSchema.validate(req.body);

    if(error){
        console.log(error.details[0].message);
        return res.status(400).send(error.details[0].message);
    } else {
        // valid body proceed to check if user exists
          try {
            // check if user exists
            const userExists = await User.findOne({ email });
            if (!userExists) {
                console.log('User does not exist');
                return res.status(400).send('User does not exist');
            } else {
                // check if password is correct
                const validPassword = await bcrypt.compare(password, userExists.password);
                if (!validPassword) {
                    console.log('Invalid password');
                    return res.status(400).send('Invalid password');
                } else {
                    // generate token
                    const token = jwt.sign({ id: userExists._id }, process.env.SECRET, { expiresIn: process.env.EXPIRES_IN });
                    if (!token) {
                        console.log('Failed to create token');
                        return res.status(400).send({ message: 'Failed to create token' });
                    } else {
                        console.log('User logged in');
                        return res.status(200).send({
                            user: userExists,
                            token: token,
                        });
                    }
                }
            }
        } catch (error) {
            console.log(error.message);
            return res.status(500).send({
                error: error.message,
            });
        }
    }

         
}



    module.exports = {
        createUser,
        loginUser,
    }