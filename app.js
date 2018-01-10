const express = require('express');
const path = require('path');

// Init app
const app = express();

// Load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Home route
app.get('/', function(req, res) {

  let articles = [
    {
      id:1,
      title:'article one',
      author:'Srini',
      body:'this is article one'
    },
    {
      id:2,
      title:'article two',
      author:'Maru',
      body:'this is article two'
    },
    {
      id:3,
      title:'article three',
      author:'Srini',
      body:'this is article three'
    },
  ]

  res.render('index', {
    title:'Article',
    articles: articles
  });
});

// Add route
app.get('/articles/add', function(req, res){
  res.render('add_article', {
    title:'Add Article'
  });
});

// Start server
app.listen(3003, function(){
  console.log('Server Started on port 3003...');
});
