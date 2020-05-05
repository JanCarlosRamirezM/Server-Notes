require("./config/config");
const connectDB = require('./config/db');
const express = require('express');
const colors = require('colors');
const bodyParser = require('body-parser');

// -------------------------------
// Create APP - Connection DB
// -------------------------------
const app = express();
connectDB();

// -------------------------------
// Habiilitar BodyParser  
// -------------------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// -------------------------------
// Routes
// -------------------------------
app.use("/", require("./routes/config.router"));

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
