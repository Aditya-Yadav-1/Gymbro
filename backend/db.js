const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGO_URL;
const dbconnect =  async () => {
    await mongoose.connect(url);
    console.log("Mongo connected Successfully");
}

module.exports = dbconnect;