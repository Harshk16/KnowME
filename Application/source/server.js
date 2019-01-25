const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const post = require('./routes/api/post');
const cors = require('cors')
const app = express();

// Cors Enable
app.use(cors())
var allowCrossDomain = app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Body Parser middleware
app.use(bodyParser.urlencoded({
    extended: true  
}));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDb 
mongoose
    .connect(db)
    .then(() => console.log('Connected'))
    .catch(err => console.log(err))

// app.get('/', (req, res) => res.send("Hello world To User"));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);
// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', post);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server running on port ${port}'));