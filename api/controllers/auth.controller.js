const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const { signupSchema,loginSchema } = require('../validations/auth.validation');

const createUser = async (req, res) => {
    try {
        console.log(`user obtained from the frontend for signup:`, req.body);
        const { error } = signupSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ 
                message: error.details[0].message 
            });
        } 
        const { email, phone, compID, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ 
                message: 'Email already registered' 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = await User.create({
            email,
            phone,
            compID,
            password: hashedPassword
        });

        const token = jwt.sign(
            { id: newUser._id, email: newUser.email },
            process.env.SECRET,
            { expiresIn: process.env.EXPIRES_IN }
        );
        
        console.log("Response sent to frontend:", {
            "user": newUser,
            "token":token
          });
        return res.status(201).json({
            "user": newUser,
            "token":token,
        });

    } catch (e) {
        console.error(e); // Log the error for debugging
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};

const loginUser = async (req, res) => {
    try {
        console.log(`user obtained from the frontend for login : ${req.body}`)
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email }, 
            process.env.SECRET, 
            { expiresIn: process.env.EXPIRES_IN }
        );
        console.log(user)
        return res.status(200).json({
            user,
            token
        });

    } catch (e) {
        return res.status(500).json({ 
            message: `Internal server error : ${e.message}` 
        });
    }
};


    module.exports = {
        createUser,
        loginUser,
    }

// 400 , 409 , 500 , 401