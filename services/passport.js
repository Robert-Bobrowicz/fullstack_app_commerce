const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        console.log('access token: ', accessToken);
        console.log('refresh token: ', refreshToken);
        console.log('profile: ', profile);

        User.findOne({ googleId: profile.id })
            .then((exsistingUser) => {
                if (exsistingUser) {
                    //we already have a user record in DB
                    done(null, exsistingUser);
                } else {
                    new User({ googleId: profile.id })
                        .save()
                        .then(user => done(null, user));
                }
            })
    })
);