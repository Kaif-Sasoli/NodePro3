        //*********     Database Connection  ************
        
const mongoose = require('mongoose');
const dbgr = require('debug')('development:mongoose'); // Debugger

mongoose.connect('mongodb://127.0.0.1:27017/scatch')
.then(function(){
   dbgr("Connection established");
})
.catch(function(err){
    dbgr(err);
});

// Exporting the Connection
module.exports = mongoose.connection;