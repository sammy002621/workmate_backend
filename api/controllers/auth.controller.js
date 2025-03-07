const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const OTP = require('../models/otp.model');
const { signupSchema,loginSchema } = require('../validations/auth.validation');

exports.signup = async (req, res) => {
  try {
    const { email,phone,compID, password, role, otp } = req.body;
    // Check if all details are provided
    if (!email ||!phone || !compID || !password || !otp) {
      return res.status(403).json({
        success: false,
        message: 'All fields are required',
      });
    }
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }
    // Find the most recent OTP for the email
    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    if (response.length === 0 || otp !== response[0].otp) {
      return res.status(400).json({
        success: false,
        message: 'The OTP is not valid',
      });
    }
    // Secure password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Hashing password error for ${password}: ` + error.message,
      });
    }
    const newUser = await User.create({
      email,
      phone,
      compID,
      password: hashedPassword,
      role,
    });
    
         token = jwt.sign(
            { id: newUser._id, email: newUser.email , role:newUser.role},
            process.env.SECRET,
            { expiresIn: process.env.EXPIRES_IN }
          );

    console.log('User registered successfully',{
        user: newUser,
        token
    });
    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: newUser,
      token:token,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: "signup error : " + error.message });
  }
};
exports.loginUser = async (req, res) => {
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


// 400 , 409 , 500 , 401

