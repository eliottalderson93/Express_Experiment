// Load the express module and store it in the variable express (Where do you think this comes from?)copy
var express = require("express");
//console.log("Let's find out what express is", express);
// invoke express and store the result in the variable app
var app = express();
//console.log("Let's find out what app is", app);
// use app's get method and pass it the base route '/' and a callback
app.use(express.static(__dirname + "/static"));
// tell the express app to listen on port 8000, always put this at the end of your server.js file
// this is the line that tells our server to use the "/static" folder for static content
// This sets the location where express will look for the ejs views
app.set('views', __dirname + '/views'); 
// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
app.set('view engine', 'ejs');
app.listen(8000, function() {
  console.log("listening on port 8000");
  console.log(__dirname);
})
app.get("/users", function (request, response){
    // hard-coded user data
    var users_array = [
        {name: "Michael", email: "michael@codingdojo.com"}, 
        {name: "Jay", email: "jay@codingdojo.com"}, 
        {name: "Brendan", email: "brendan@codingdojo.com"}, 
        {name: "Andrew", email: "andrew@codingdojo.com"}
    ];
    response.render('users', {users: users_array});
})
app.get("/dogs",function (request,response){
    response.render("dogs")
})
app.get("/pandas", function (request,response){
    response.render("pandas")
})

// two underscores before dirname
// try printing out __dirname using console.log to see what it is and why we use it