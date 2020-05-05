
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');


// controllers
const userController = require('../controllers/user.controller');

// Routers  
router.post('/',
    [
        check('name', 'El nombre es obligatorio').notEmpty(),
        check('email', 'Agregar un email valido').isEmail(),
        check('password', 'El password debe ser minimo de 6 caracteres').isLength({ min: 6 })
    ],
    userController.addUser);

module.exports = router;
