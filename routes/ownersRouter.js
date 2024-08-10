        // *********** Owner Route ****************

const express = require('express'); // Import Express
const router = express.Router();  // Create router
const { User, Owner } = require('../models/userModel'); // Onwer Model
const { isLoggedIn, isLoggedIn2, userPicture , isAdmin } = require('../utils/isLoggedIn');
const productModel = require('../models/productModel');



// Define route for "/dashboard"
router.get('/dashboard', isLoggedIn, isAdmin, async (req, res) => {
   
    try {
       // Initialize total orders count
       let totalOrders = 0;

       // Find all users with orders and get the length of their orders
       let users = await User.find({ "order.0": { $exists: true } })
           .select('fullName email order')
           .lean(); // Use lean() to get plain JavaScript objects

       // Map through the users and add an orderCount property
       users = users.map(user => {
           const orderCount = user.order.length;
           totalOrders += orderCount; // Accumulate the total number of orders

           return {
               ...user,
               orderCount // Add the order count property to each user
           };
       });

         // Count total number of users, regardless of orders
         let totalUsers = await User.countDocuments({});

       // Find the admin and count the number of products they created
       let admin = await Owner.findOne({ email: req.owner.email })
           .select('products')
           .lean();

       if (admin) {
           admin.productCount = admin.products.length; // Count the number of products
       }

       // Render the dashboard with the users, admin, and total orders
       res.render('dashboard', { users, admin, totalOrders, totalUsers });
        
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Render the createProduct Page
router.get('/create', isLoggedIn, isAdmin, async (req, res) => {
    try {
        res.render('createProduct');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

//  Show the Products (Owner)
router.get('/products',isLoggedIn, isAdmin, async (req, res) => {
    try {
        //  Find the Loggined Owner
        let admin = await Owner.findOne({ email: req.owner.email }).populate('products');
        res.render('products', { admin });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Delete All Products 
router.get('/deleteAll', isLoggedIn, isAdmin, async (req, res) => {

    try {
        // Find the owner by email
        let owner = await Owner.findOne({ email: req.owner.email });

        // Clear the owner's products array
        owner.products = [];
        await owner.save();

        // Delete all products from the product schema
        await productModel.deleteMany({});

        res.redirect('/admin/products');

    } catch (err) {
        res.status(500).send("Server Error");
    }


   
});



 // Condition, this route work only in development phase
// if(process.env.NODE_ENV === 'development'){

//     router.post('/create', async (req, res) => {

//         let owner = await ownerModel.find();
//         if(owner.length > 0){
//             return res
//                 .status(503)
//                 .send('The owner already exists!');
//         }

//        let {fullName, email, password} = req.body;
       
//      let createdOwner = await ownerModel.create({
//             fullName,
//             email,
//             password
//         })
//          res.status(200).send(createdOwner);
//     });

// }

// Export route
module.exports = router;