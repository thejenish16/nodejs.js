const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Admin = require('../model/admin.model');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return done(null, false);
        }
        if (admin.password !== password) {
            return done(null, false);
        }
        return done(null, admin);
    } catch (error) {
        return done(error);
    }
}));

passport.serializeUser((admin, done) => {
    done(null, admin._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const admin = await Admin.findById(id);
        done(null, admin);
    } catch (error) {
        done(error);
    }
});

module.exports = passport;