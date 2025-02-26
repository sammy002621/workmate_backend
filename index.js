const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const { connectDB } = require('./config/database.config');


const app = express();




app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));


// import the auth routes
app.use('/workmate/v1/auth',require('./api/routes/auth.routes'));

const port = process.env.PORT || 3000;

app.get('/',(req,res)=>{
    return res.send('welcome to workmate api');
})


app.listen(port,async ()=>{
    console.log(`Server is running on http://localhost:${port}`);
    // make connnection to database
    await connectDB();
})


//NOTE: REQUIREMENTS TO MAKE a signup and a sign in : body -> body-parser , database -> mongodb , password encryption -> bcryptjs , token -> jsonwebtoken , validation -> joi, local variables -> dotenv


//NOTE:setting up server:done,connection to database:done,creating a new user 


//NOTE: use the best practices for naming api paths for example: /workmate/v1/auth -> authentication 


//NOTE: test to see if the api to sign up the user is working