const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const { connectDB } = require('./config/database.config');


const app = express();




app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));


// import the auth routes
app.use('/workmate/v1/auth',require('./api/routes/auth.routes'));
app.use('/workmate/v1/otp',require('./api/routes/otp.routes'));
const port = process.env.PORT || 3000;

app.get('/',(req,res)=>{
    return res.send('welcome to workmate api');
})


app.listen(port,async ()=>{
    console.log(`Server is running on http://localhost:${port}`);
    // make connection to database
    await connectDB();
})





//NOTE: first create the model for the image you want to upload (properties : url , publicId , uploadedBy) , then create the cloudinary config (everything  that has something to do with api keys and secret keys should be in the .env file) , create the helper which has the logic to upload image to cloudinary ,then create the controller for the image (uploadImage: where the image will be created with the properties and saved in the database) , then create the routes for the image (uploadImage: where the image will be created with the properties and saved in the database) , then test the api to see if it is working now in the route  to upload the image there will be an uploadMiddleware : that uses multer to upload the image use fs.unlinkSync to delete image from local storage after it's uploaded to mongo db 