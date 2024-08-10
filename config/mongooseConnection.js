        //*********     Database Connection  ************
        
const mongoose = require('mongoose');
const dbgr = require('debug')('development:mongoose'); // Debugger
require('dotenv').config();

mongoose.connect(process.env.DB_CONNECTION)
.then(function(){
   dbgr("Connection established");
})
.catch(function(err){
    dbgr(err);
});

// Exporting the Connection
module.exports = mongoose.connection;