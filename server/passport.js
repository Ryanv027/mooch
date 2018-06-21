const passport = require('passport');
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require('dotenv');

// const users = require('../models').users;

const GoogleCreds = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CB_URL
}

passport.use(new GoogleStrategy(GoogleCreds,
    (accessToken, refreshToken, profile, cb) => {
             return cb(null, profile)
    }))

passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((obj, cb) => cb(null, obj));

module.exports = passport;