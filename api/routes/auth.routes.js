// import the router from express
const express = require('express');
const router = express.Router();
const { createUser, loginUser } = require('../controllers/auth.controller');





// use the router to define the auth routes
router.post('/sign-up',createUser);
router.post('/sign-in',loginUser);






module.exports = router;

