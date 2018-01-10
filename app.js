const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// connection to db through mongoose
mongoose.connect('mongodb://localhost/nodekb', { useMongoClient: true });
let db = mongoose.connection;

// check connection
db.once('open', function(){
  console.log('connected to mongodb');
});

//check for db error
db.on('error', function(err){
  console.log(err);
});

// Init app
const app = express();

// Bring in Models
let Article = require('./models/article');

// Load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Body Parser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Home route
app.get('/', function(req, res) {
  Article.find({}, function(err, articles){
    if(err){
      console.log();
    } else {
      res.render('index', {
        title:'Article',
        articles: articles
      });
    }
  });
});

// Add route
app.get('/articles/add', function(req, res){
  res.render('add_article', {
    title:'Add Article'
  });
});

// Add Submit POST route (submit button)
app.post('/articles/add', function(req, res){
  let article = new Article();
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;

  article.save(function(err){
    if(err){
      console.log(err);
      return;
    } else {
      res.redirect('/');
    }
  })
});

// Start server
app.listen(3003, function(){
  console.log('Server Started on port 3003...');
});
