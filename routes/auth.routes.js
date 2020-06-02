const { Router } = require("express");
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const config = require('config');
const User = require('../models/User');
const router = Router();

// /api/auth/register
router.post(
    '/register',
    // validating email and password on the server side
    [
        check('email', 'incorrect email').isEmail(),
        check('password', 'minimum password lengths - 6 characters')
            .isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            // checking registration data
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'incorrect data (registration)'
                })
            }

            // here we take email and password from req body
            const { email, password } = req.body;

            // looking for email in our db
            const newUser = await User.findOne({ email })

            // if we have this user - our script stop
            if (newUser) {
                return res.status(400).json({ message: "This user is already exist" });
            }

            // encrypting user password and creating new one
            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({ email, password: hashedPassword });

            await user.save();

            res.status(201).json({ message: "user created" });

        } catch (e) {
            res.status(500).json({ message: "something went wrong. please try again" })
        }
    })

// /api/auth/login
router.post(
    '/login',
    // checking credentials
    [
        check('email', 'Please enter correct email address').isEmail(),
        check('password', 'Please enter password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            // checking entered data
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'incorrect data (login)'
                })
            }

            const { email, password } = req.body;

            // looking for user in db
            const user = await User.findOne({ email });

            // checking: are user exist?
            if (!user) {
                return res.status(400).json({ message: 'User doesn\'t exist' })
            }

            // checking: are password correct?
            const isPassword = await bcrypt.compare(password, user.password);

            if (!isPassword) {
                return res.status(400).json({ message: 'incorrect password' })
            }

            // added token
            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )

            res.json({ token, userId: user.id })

        } catch (e) {
            res.status(500).json({ message: "something went wrong. please try again" })
        }

    })

module.exports = router;