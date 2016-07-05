var employeeHandler = require('../employee/employee-handlers');
module.exports = function(app, routes, passport) {

    app.get('/home', function(req, res) {
        var session = req.session;
        if(session.username){
            //routes.get('/', employeeHandler.getIndexPage);    
            res.render('/index.html');
        }
        else{
            res.send("sessioni is expired, pls login");
        }
        
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/unAuthorizedUser', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.send('unAuthorizedUser entry'); 
    });

    /*app.post('/login', passport.authenticate('local-login'), function(req, res) {
        console.log(req);
        res.header("Content-Type", "application/json");
        //res.json(req.user);
        res.json({ user: 'tobi' });
    });*/


    app.post('/signup', function(req, res) {
      passport.authenticate('local-signup', function(err, info, user) {
        if (err) {
             res.send('backend error')
        }
        if (info) {
            res.send('That username is already taken')
        }
        if(user){
         res.send(user);   
        }

      })(req, res);
    });

    app.post('/login', function(req, res) {
      passport.authenticate('local-login', function(err, info, user) {
        if (err) {
             res.send('backend error')
        }
        if (info) {
            res.send('invalid username or password')
        }
        if(user){
        var session =  req.session;
         session.username = req.body.username;
         //session.sessionId = req.session;
         res.send(user);  
        }

      })(req, res);
    });


    // process the login form
    // app.post('/login', do all our passport stuff here);

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.post('/signupNewUser', function(req, res) {

        
        res.send('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.send('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}