// app/routes.js
module.exports = function(app, passport){

  // HOME PAGE with login links
  app.get('/', function(req, res){
    // res.send("Welcome to homepage");
    res.render('index.ejs');  // load the index.ejs file
  });

  // LOGIN page
  app.get('/login', function(req,res) {

    // render the page and pass in any flash data if exists
    res.render('login.ejs', { mesage : req.flash('loginMesage')});
  });

  // process the login form
  // app.post('/login', do all our passport stuff here);


  // SIGNUP page - show the sign up forms
  app.get('/signup', function(req, res){

    // render the page and pas in any flash datya if any
    res.render('signup.ejs', {mesage : req.flash('signupMessage') });
  });

  // process the signup forms
  // app.post('/signup', do all our passport stuff here);

  // PROFILE SECTION
  // we will want this to be protected so you have to be logged in to visit
  // we will use router middleware to verify this (the isLoggedIn function)

  app.get('/profile', isLoggedIn, function(req,res){
    res.render('profile.ejs', {
      user : req.user   // get the user out of sesion and pass to template
    });
  });

  app.get('/logout', function(req,res){
    req.logout();
    res.redirect('/');
  });
};

function isLoggedIn(req,res,next){

  // if user is authenticated in the session, carry on
  if(req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}
