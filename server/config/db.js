require('./config');
const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.URL_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });

        console.log(colors.bgGreen.black("DATABASE ONLINE!!!"));
    } catch (error) {
        console.log(colors.bgRed.black("DATABASE ERROR!!!", error));

    }
}

module.exports = connectDB;