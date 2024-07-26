// Requireds
const express = require('express');
const app = express();
const path = require('path');


// Middlewares
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));


//Routes
app.get('/', function (req, res) {
     res.render('index');
});

app.get('/page1', function (req, res) {
     res.render('page1');
});

app.get('/admin', function (req, res) {
     res.render('admin');
});

app.get('/create', function (req, res) {
     res.render('create');
});

app.get('/page3', function (req, res) {
     res.render('page3');
});

// Listeninig 
app.listen(4002);
