require("./config/config");
const connectDB = require('./config/db');
const express = require('express');
const colors = require('colors');

// -------------------------------
// Create APP - Connection DB
// -------------------------------
const app = express();
connectDB();

// -------------------------------
// Routes
// -------------------------------
app.get('/', (req, res) => {
    res.send('hola mundo')
})


// -------------------------------
// Run APP
// -------------------------------
app.listen(process.env.PORT, (err, res) => {
    if (err) {
        console.log(colors.bgRed.black("Server error!!!", err));
        process.exit(1)
    }
    console.log(colors.bgGreen.black("Server ONLINE!!!"));
});
