// app/routes.js
module.exports = function(app, passport){

  // HOME PAGE with login links
  app.get('/', function(req, res){
    res.send("Welcome to homepage");
    //res.render('index.ejs');
  })
}
