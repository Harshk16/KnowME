const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    handle: {
        type: String,
        required: true,
        max: 40
    },
    company: {
        type: String
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    bio: {
        type: String
    },
    github: {
        type: String
    },
    experience: [{
        title: {
            type: String,
            require: true
        },
        company: {
            type: String,
            require: true
        },
        location: {
            type: String,

        },
        from: {
            type: Date,
            require: true
        },
        to: {
            type: String,
        },
        current: {
            type: Boolean,
            default: true
        },
        description: {
            type: String,
        }
    }],
    education: [{
        school: {
            type: String,
            require: true
        },
        degree: {
            type: String,
            require: true
        },
        fieldofstudy: {
            type: String,

        },
        from: {
            type: Date,
            require: true
        },
        to: {
            type: Date,
        },
        current: {
            type: Boolean,
            default: true
        },
        description: {
            type: String,
        }
    }],
    social: {
        youtube: {
            type: String
        },
        facebook: {
            type: String
        },
        twitter: {
            type: String
        },
        linkedin: {
            type: String
        },
        instagram: {
            type: String
        },
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);