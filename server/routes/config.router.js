const express = require('express');
const router = express.Router();
const { check } = require('express-validator');


// controllers
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');

// Middlewares 
const authMiddleware = require('../middlewares/auth.middlewares');

// -------------------------------
// Router - Users 
// -------------------------------
router.post('/api/v1/user',
    [
        check('name', 'El nombre es obligatorio').notEmpty(),
        check('email', 'Agregar un email valido').isEmail(),
        check('password', 'El password debe ser minimo de 6 caracteres').isLength({ min: 6 })
    ],
    userController.addUser);

// -------------------------------
// Router - Auth
// -------------------------------
router.post('/api/v1/auth',
    [
        check('email', 'Agregar un email valido').isEmail(),
        check('password', 'El password debe ser minimo de 6 caracteres').isLength({ min: 6 })
    ],
    authController.authUser);

router.get('/api/v1/auth',
    authMiddleware,
    authController.getAuthenticatedUser);

module.exports = router;
