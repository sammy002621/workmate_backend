// import the router from express
const express = require('express');
const router = express.Router();
const { signup, loginUser } = require('../controllers/auth.controller');





// use the router to define the auth routes
router.post('/sign-up',signup);
router.post('/sign-in',loginUser);

// export the router
module.exports = router;

