This is E-Commerce website, Where we sell eatable things


PACKAGES:
Express
Mongoose
Ejs (view Engine)
JWT (Json Web Token)
Bcrypt
Cookie-Parser
Multer
dotenv
Debug
config
express-session 
connect-flash
validate-image-type

dotenv {
    1: Set environment variables in .env file
       Development=mongoose
    2: Require the dotenv configuration
       const dotenv = require('dotenv').config();
    3: Print 
       console.log(process.env.Development);
}

Debug 
SET Envourment Variables like this debbuger on windows
$env:DEBUG="development:mongoose"; npx nodemon  app.js

Models
In models we store database files

Config
In this folder our database relted configuration will be

Views
In views file we store the html files

Utils
Functions which help us to store the repeated things

Routes

Controllers

.Env 
contains environment variables we store keys

usermodel
fullName - String
email    - Stting
password - String
cart     - Array
isAdmin  - Boolean
order    - Array
contact  - number
picture  - String db


product
image 
name 
price 
discount 
bg-color
panel-color
text-color

Router express.js


