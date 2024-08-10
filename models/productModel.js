         //***********  Product Model ************/

const mongoose = require('mongoose');   // requiring the mongoose module
const getDefaultImageBuffer = require('../utils/imgBuffer'); //require the default image buffer

// Product Schema
const prodectSchema = mongoose.Schema({
      
     name: String,
     price: Number,
     discount: { 
        type: Number,
        default: 0
     },
     image: {
      type: Buffer,
      default: getDefaultImageBuffer('product'),
     },
     bgcolor: String,
     panelcolor: String,
     panelcolor2: String,
     textcolor: String
});

// Exoriting the model
module.exports = mongoose.model('product', prodectSchema);