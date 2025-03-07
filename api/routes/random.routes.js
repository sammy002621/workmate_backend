const express = require("express");
const { authMiddleware } = require("../middleware/auth.middleware");
const router = express.Router();



router.post("/welcome",authMiddleware,(req,res)=>{
    const {email} = req.user;
    return res.send(`Welcome to the random api : ${email}`);
})




module.exports = router;