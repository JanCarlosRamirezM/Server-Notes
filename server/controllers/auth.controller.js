require("../config/config");
const User = require('../models/user.model');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');


const { validationResult } = require('express-validator');
const { status } = require('../helpers/statusCode.helpers');

/**
   * Auth User
   * 
   * POST api/v1/auth
 */
exports.authUser = async (req, res) => {
    try {
        let { email, password } = req.body;
        let user;

        // validate
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(status.error).json({
                ok: false,
                error: errors.array()
            })
        }

        // validate if the email exists
        user = await User.findOne({ email });
        if (!user) {
            return res.status(status.error).json({
                ok: false,
                msg: `Usuario o contraseña incorrecto`
            })
        }
        if (!bcryptjs.compareSync(password, user.password)) {
            return res.status(status.error).json({
                ok: false,
                msg: `Usuario o contraseña incorrecto`
            })
        }

        // Generer token 
        const payload = {
            user: {
                _id: user._id
            }
        };

        jwt.sign(payload, process.env.SIGNATURE_TOKEN, {
            expiresIn: process.env.EXPIRE_TOKEN
        }, (error, token) => {
            if (error) throw error;
            res.status(status.created).json({
                ok: true,
                token,
                msg: "Generación del Token correctamente"
            })
        })

    } catch (error) {
        return res.status(status.error).json({
            ok: false,
            error
        })
    }
}

/**
   * Get authenticated user
   * 
   * POST api/v1/getAuthenticatedUser
 */
exports.getAuthenticatedUser = async (req, res) => {
    try {
        let { _id } = req.user;              
        let user = await User.findById(_id).select('-password');
        res.status(status.success).json({
            ok: true,
            user
        })
    } catch (error) {
        return res.status(status.error).json({
            ok: false,
            error
        })
    }
}