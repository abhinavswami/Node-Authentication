// config/passport.js

// load all the settings we need
var LocalStrategy = require('passport-local').Strategy;

// load the user model
var User = require('../app/models/user');

// expose this function to our app using module.exports
module.exports = function(passport) {
  // ===========================================================================
  // passport session setup ====================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // ===========================================================================
  // LOCAL SIGNUP ==============================================================
  // ===========================================================================
  passport.use('local-signup', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },

    function(req, email, password, done) {
      // asynchronous
      // User.findOne wont fire unless the data is sent back
      process.nextTick(function() {
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists

        User.findOne({
          'local.email': email
        }, function(err, user) {
          if (err) {
            return done(err);
          }


          // check to see if there is already a user with that email
          if (user) {
            return done(null, false, req.flash('signupMessage', 'The email is already taken.'))
          } else {
            // if there are no user with that email
            // create the user
            var newUser = new User();

            // set the user's local credentials
            newUser.local.email = email;
            newUser.local.password = newUser.generateHash(password);

            // save the user
            newUser.save(function(err) {
              if (err)
                throw err
              return done(null, newUser);
            });
          }
        });
      });
    }));
}
