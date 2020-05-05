require("../config/config");
const User = require('../models/user.model');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');


const { validationResult } = require('express-validator');
const { status } = require('../helpers/statusCode.helpers');

/**
   * Add A User
 */
exports.addUser = async (req, res) => {
    try {
        let { name, email, password } = req.body;
        let user;

        // validate
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                ok: false,
                error: errors.array()
            })
        }

        // validate if the email exists
        user = await User.findOne({ email });

        if (user) {
            return res.status(status.error).json({
                ok: false,
                msg: `Ya existe un usuario con email: ${email}`
            })
        }

        user = new User({
            name,
            email,
            password
        });


        // encode password
        let salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt)

        //save user
        await user.save();

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
                msg: "Usuario creado correctamente"
            })
        })

    } catch (error) {

    }
}