var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var User = require('../user/user-schema');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

module.exports = function(app, passport) {

    // required for passport
    
    app.use(flash()); // use connect-flash for flash messages stored in session
    app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findOne({
            _id: id
        }, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-login',
        new LocalStrategy({
                // by default, local strategy uses username and password, we will override with username
                usernameField: 'username',
                passwordField: 'password',
                passReqToCallback: true // allows us to pass back the entire request to the callback
            },
            function(req, username, password, done) { // callback with username and password from our form

                // find a user whose username is the same as the forms username
                // we are checking to see if the user trying to login already exists
                User.findOne({
                    'username': username
                }, function(err, user) {
                    // if there are any errors, return the error before anything else
                    if (err) {
                        return done(err);
                    }

                    // if no user is found, return the message
                    if (!user) {
                        return done(null, "user is not found");
                    }


                    // if the user is found but the password is wrong
                    if (!user.validPassword(password)) {
                        return done(null, "invalid password"); // create the loginMessage and save it to session as flashdata
                    }

                    // all is well, return successful user
                    //res.send(user);
                    user.authenticated = true;
                    return done(null, null, user);
                });

            }));

    passport.use('local-signup',
        new LocalStrategy({
                // by default, local strategy uses username and password, we will override with username
                usernameField: 'username',
                passwordField: 'password',
                passReqToCallback: true // allows us to pass back the entire request to the callback
            },
            function(req, username, password, done) {
                User.findOne({
                        'username': username
                    },
                    function(err, user) {
                        if (err) {
                            return done(err);
                        }
                        if (user) {
                            return done(null, 'That username is already taken');
                        } else {
                            var newUser = new User();
                            newUser.username = username;
                            newUser.password = newUser.generateHash(password);
                            newUser.save(
                                function(userObj) {
                                    console.log("created a new user::" + userObj);
                                    return done(null, null, newUser);
                                });
                        }
                    });

            }
        ));
};