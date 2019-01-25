const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = require('../../config/keys');
const passport = require('passport');

const validateRegisterInput = require('../../validator/register');
const validateLoginInput = require('../../validator/login');


// Load User Model
const User = require('../../models/User');

// @route Get api/users/test
// @desc Tests post route
// @access Public
router.get('/test', (req, res) => res.json({
    msg: "User Works"
}));


// @route Get api/users/register
// @desc Register User
// @access Public
router.post('/register', (req, res) => {
    console.log(req.body)
    const {
        errors,
        isValid
    } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({
            email: req.body.email
        })
        .then(user => {
            if (user) {
                errors.email = 'Email already exists'
                return res.status(400).json(errors);
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200', // size
                    r: 'pg', // rating  
                    d: 'mm' //default
                })
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password

                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save().then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                })
            }
        })
});

// @route Get api/users/login
// @desc Login User / Return jwt token
// @access Public
router.post('/login', (req, res) => {
    const {
        errors,
        isValid
    } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // Find user by email Id
    User.findOne({
            email
        })
        .then(user => {
            if (!user) {
                errors.email = 'user not found'
                return res.status(404).json(errors);
            }

            // check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        // res.json({
                        //     msg: 'Sucess'
                        // });
                        const payload = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar
                        }

                        jwt.sign(payload, key.secretOrKey, {
                            expiresIn: 3600,
                        }, (err, token) => {
                            res.json({
                                sucess: true,
                                token: 'Bearer ' + token
                            })
                        });
                    } else {
                        errors.password = 'password incorrect'
                        return res.status(400).json(errors);
                    }
                })
        })

})
// @route Get api/users/current
// @desc Return Current User
// @access Private
router.get('/current', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});
module.exports = router;