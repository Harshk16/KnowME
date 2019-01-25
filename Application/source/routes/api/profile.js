const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validateProfileInput = require('../../validator/profile')
const validateExperienceInput = require('../../validator/experience');
const validateEducationInput = require('../../validator/education');


// Load Profile Model
const Profile = require('../../models/Profile');

// Load User Profile
const User = require('../../models/User');


// @route Get api/posts/test
// @desc Tests post route
// @access Public
router.get('/test', (req, res) => res.json({
    msg: "Profile Works"
}));

// @route Get api/profile
// @desc Get Current User Prfile
// @access Private
router.get('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    const errors = {}

    Profile.findOne({
            user: req.user.id
        })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.nonProfile = "Invalid Request";
                return res.status(404).json({
                    errors
                });
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});

// @route   Get api/profile/all
// @desc    Get all profile
// @access  Public

router.get('/all', (req, res) => {
    Profile.find()
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.profile = 'Invalid Request'
                return res.status(400).json(errors);
            }
            res.json(profile)
        })
        .catch(err =>
            res.status(404).json({
                profile: 'Invalid Request'
            }));
})

// @route   Get api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public

router.get('/handle/:handle', (req, res) => {
    Profile.findOne({
            handle: req.params.handle
        })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.nonProfile = "Invalid Request"
                return res.status(404).json(errors);
            }
            res.json(profile)
        })
        .catch(err => res.status(404).json({
            profile: 'Invalid Request'
        }));
});

// @route   Get api/profile/user/:userId
// @desc    Get profile by UserId
// @access  Public

router.get('/user/:id', (req, res) => {
    Profile.findOne({
            handle: req.params.id
        })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.nonProfile = "Invalida Request"
                return res.status(404).json(errors);
            }
            res.json(profile)
        })
        .catch(err => res.status(404).json(err));
});


// @route Post api/profile
// @desc Create User or edit Profile
// @access Private
router.post('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const {
        errors,
        isValid
    } = validateProfileInput(req.body);

    // Check Validation
    if (!isValid) {
        // Return an errors with 400 status
        return res.status(400).json(errors);
    }

    // Get Field
    const userProfile = {};
    userProfile.user = req.user.id;

    if (req.body.handle) userProfile.handle = req.body.handle
    if (req.body.company) userProfile.company = req.body.company
    if (req.body.website) userProfile.website = req.body.website
    if (req.body.location) userProfile.location = req.body.location
    if (req.body.bio) userProfile.bio = req.body.bio
    if (req.body.status) userProfile.status = req.body.status
    if (req.body.githubusername) userProfile.githubusername = req.body.githubusername

    // Skill   Spilt into array
    if (typeof req.body.skills !== 'undefined') {
        userProfile.skills = req.body.skills.split(',');
    }
    // Socail
    userProfile.social = {}
    if (typeof req.body.youtube) userProfile.social.youtube = req.body.youtube
    if (typeof req.body.twitter) userProfile.social.twitter = req.body.twitter
    if (typeof req.body.facebook) userProfile.social.facebook = req.body.facebook
    if (typeof req.body.linkedin) userProfile.social.linkedin = req.body.linkedin

    Profile.findOne({
            user: req.user.id
        })
        .then(profile => {

            if (profile) {
                // Update
                Profile.findOneAndUpdate({
                        user: req.user.id
                    }, {
                        $set: userProfile
                    }, {
                        new: true
                    })
                    .then(profile => res.json(profile));
            } else {
                // Create and Check If handle exists
                Profile.findOne({
                    handle: userProfile.handle
                }).then(profile => {
                    if (profile) {
                        errors.handle = "There is some errors"
                        res.status(400).json(errors);
                    }

                    // Save New Profile
                    new Profile(userProfile).save().then(profile => res.json(profile))
                });
            }
        })
});

// @route   POST api/profile/experience
// @desc    Add exprience to  profile
// @access  Privata

router.post('/experience', passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    const {
        errors,
        isValid
    } = validateExperienceInput(req.body);

    // Check Validation
    if (!isValid) {
        // Return an errors with 400 status
        return res.status(400).json(errors);
    }

    Profile.findOne({
            user: req.user.id
        })
        .then(profile => {
            const userExp = {
                title: req.body.title,
                company: req.body.company,
                location: req.body.location,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description,
            }

            // Add to exp array
            profile.experience.unshift(userExp);

            profile.save().then(data => res.json(data));
        })
});

// @route   DELETE api/profile/experience/:id
// @desc    Delete experience from profile
// @access  Private

router.delete('/experience/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    Profile.findOne({
            user: req.user.id
        })
        .then(profile => {
            // Get remove index
            const index = profile.experience
                .map(item => item.id)
                .indexOf(req.params.id)

            // splice out of array
            profile.experience.splice(index, 1);

            profile.save().then(profile => res.json(profile));
        })
        .catch(err => res.status(404).json(err));
})

// @route   POST api/profile/education
// @desc    Add education to  profile
// @access  Private

router.post('/education', passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    const {
        errors,
        isValid
    } = validateEducationInput(req.body);

    // Check Validation
    if (!isValid) {
        // Return an errors with 400 status
        return res.status(400).json(errors);
    }

    Profile.findOne({
            user: req.user.id
        })
        .then(profile => {
            const userEdu = {
                school: req.body.school,
                degree: req.body.degree,
                fieldofstudy: req.body.fieldofstudy,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description,
            }

            // Add to exp array
            profile.education.unshift(userEdu);

            profile.save().then(data => res.json(data));
        })
})

// @route   DELETE api/profile/education/:id
// @desc    Delete education from profile
// @access  Private

router.delete('/education/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    Profile.findOne({
            user: req.user.id
        })
        .then(profile => {
            // Get remove index
            const index = profile.education
                .map(item => item.id)
                .indexOf(req.params.id)

            // splice out of array
            profile.education.splice(index, 1);

            profile.save().then(profile => res.json(profile));
        })
        .catch(err => res.status(404).json(err));
})

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private

router.delete('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    console.log("User Id", req.user.id);

    Profile.findOneAndRemove({
            user: req.user.id
        })
        .then(() => {
            User.findOneAndRemove({
                    id: req.user.id
                })
                .then(() => res.json({
                    sucess: true
                }))
            console.log("Profile after delete", req.user.id);
            // console.log("User after delete", User);
        })
})

module.exports = router;