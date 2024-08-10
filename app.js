// Requireds
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const db = require('./config/mongooseConnection'); // Requring the Database
const expressSession = require('express-session');
const flash = require('connect-flash');
const JWT =  require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const multer = require('multer');  
const { Owner } = require('./models/userModel');
const PORT = process.env.PORT || 4005;


//Routes
const indexRouter = require('./routes/index');
const ownersRouter = require('./routes/ownersRouter');
const userRouter = require('./routes/userRouter');
const productsRouter = require('./routes/productsRouter');
const isLoggedIn = require('./utils/isLoggedIn');
const { render } = require('ejs');

// Middlewares
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded( {extended: true} ));
app.use(cookieParser());

// Set session
app.use(
     expressSession ({
          resave: false,
          saveUninitialized: false,
          secret: process.env.EXPRESS_SESSION_SECRET,
     })
);

// Use the Flash
app.use(flash());

// Routes Use
app.use('/', indexRouter);  // Index Route
app.use('/admin', ownersRouter); // Admin Route
app.use('/users', userRouter); // User Route
app.use('/products', productsRouter); // Products Route


// Listeninig 
app.listen(PORT, (req, res) => {
     try{
      console.log("SERVER is listening on port");
     }
      catch(err){
         res.status(500).send('Server Error: ');
      }

});
     