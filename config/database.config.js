const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.uri);
        console.log(`database connected successfully`);
    } catch (error) {
        if (error.name === 'MongoNetworkError') {
            console.error('Network error: Unable to reach MongoDB server. Please check your internet connection.');
        } else if (error.message.includes('ETIMEDOUT')) {
            console.error('Connection timeout: Unable to connect to MongoDB server. Please check your network settings.');
        } else if (error.message.includes('ENOTFOUND')) {
            console.error('DNS error: Unable to resolve MongoDB server address. Please check your DNS settings.');
        } else {
            console.error(`Error: ${error.message}`);
        }
        process.exit(1);
    }

}



module.exports = {connectDB};