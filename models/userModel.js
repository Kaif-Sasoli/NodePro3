                // **********  User & Owner Model *****************

const mongoose = require('mongoose'); // Requiring Mongoose module
const getDefaultImageBuffer = require('../utils/imgBuffer'); // Requiring default image buffer

// User Schema
const userSchema = mongoose.Schema({
    
    fullName: {
        type: String,
        minLength: 3,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        default: '',
    },
    password: {
        type: String,
        trim: true,
        minLength: 8,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    contact: {
        type: Number,
        trim: true
    },
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
    }, 
   ],
    order: {
        type: Array,
        default: []  
    },
    picture: {
        type: Buffer,
        default: getDefaultImageBuffer('user')
       },
});

  // Middleware to empty the order array if it exceeds 50 orders
  userSchema.pre('save', function (next) {
      if (this.order.length > 100) {
          this.order = []; // Empty the order array
      }
      next();
  });


// Owner Schema
const ownerSchema = mongoose.Schema({
    
    fullName: {
        type: String,
        minLength: 3,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim: true,
        minLength: 8,
    },
    contact: {
        type: Number,
        trim: true
    },
    isAdmin: Boolean,
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
    }],
    picture: {
        type: Buffer,
        default: getDefaultImageBuffer('owner')
    },
    gstin: String,
});
      
    const User = mongoose.model('User', userSchema);
    const Owner = mongoose.model('Owner', ownerSchema);

    //  Exporting the Model
   module.exports = { User, Owner };
