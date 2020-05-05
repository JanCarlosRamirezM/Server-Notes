const express = require('express');
const router = express.Router();

// -------------------------------
// Router Users 
// -------------------------------
router.use('/api/v1/user', require("./user.route"));


module.exports = router;
