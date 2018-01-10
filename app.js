const express = require('express');
const path = require('path');

// Init app
const app = express();

// Load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Home route
app.get('/', function(req, res) {
  res.render('index', {
    title:'Article'
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
