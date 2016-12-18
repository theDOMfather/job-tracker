var User = require('../models/userModel.js');
var passport = require('passport');
var CustomStrategy = require('passport-custom');

passport.use(new CustomStrategy(
  function(_id, done) {
    User.findOne({ _id: _id }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = passport;
