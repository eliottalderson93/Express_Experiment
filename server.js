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
app.set('views', __dirname + '\\views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
// require body-parser
var bodyParser = require('body-parser');
// use it!
app.use(bodyParser.urlencoded({extended: true}));
// new code:
var session = require('express-session');
// original code:
// more new code:
app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

app.listen(8000, function() {
  console.log("listening on port 8000");
  //console.log(__dirname);
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
    response.render("dogs");
})
app.get("/pandas", function (request,response){
    response.render("pandas");
})
app.get("/pandas/:whichPanda", function (request,response){
    console.log(request.params);
    var pandas_array = [
        {number:1,name: "Fred",age: "13",sleep:["rock","tree"],src:"/image/redpanda1.jpg"},
        {number:2,name: "Ricky",age: "3",sleep:["reeds","stream"],src:"/image/redpanda2.jpg"},
        {number:3,name: "The Goose",age: "9",sleep:["bush","hole"],src:"/image/redpanda3.jpg"}
    ]
    response.render("details",{panda:pandas_array[request.params.whichPanda]});
})
app.get('/home',function(req,res){
    if (req.session.count === null){
        req.session.count = 0;
    }
    var myCount = req.session.count;
    res.render("count.ejs",{Count:myCount})
})
app.get("/count", function(req,res){
    req.session.count += 1;
    res.redirect('/home');
})
app.post("/count",function (req,res){
    req.session.count += 1;
    res.redirect('/home');
})
app.post("/count/two",function (req,res){
    req.session.count += 2;
    res.redirect('/home');
})
app.post("/reset",function (req,res){
    req.session.count = 0;
    res.redirect('/count');
})

// two underscores before dirname
// try printing out __dirname using console.log to see what it is and why we use it