// index.js
const express = require('express');  // Import Express module
const router = express.Router();  // Create router
const { isLoggedIn, isLoggedIn2, userPicture, isAdmin } = require('../utils/isLoggedIn'); // Requring the Functions
const productModel = require('../models/productModel');  // Requring the Product Model
const { User, Owner } = require('../models/userModel'); // Requiring the User & Owner Model
const upload = require('../config/multerConfig');  // Requiring the multerConfig
const  validateImage  = require('../utils/imageValidator'); // image validator
const { comparePassword } = require('../utils/comparePassword'); // comparePassword Function
const ObjectId = require('mongodb').ObjectId;

// Apply Header Picture globally to all routes
router.use(userPicture);  


// Index Route
router.get('/', async (req, res) => {

    try {
    let products = await productModel.find();
    res.render('index', { products }); // Send response
    } catch (err) {
        res.status(500).send("Server error");
    }
});

// Profile Route
router.get('/profile', isLoggedIn, async (req, res) => {
        
    try {

            let user = null;
            let owner = null;
    
            if (req.user) {
                user = await User.findOne({ email: req.user.email });
            }
            
            if (req.owner) {
                owner = await Owner.findOne({ email: req.owner.email });
            }
    
            if (user || owner) {
                res.render('profile', { user, owner });
            } else {
                res.status(404).send('User or Owner not found');
            }
    
        } catch (err) {
            res.status(500).send("Server error");
        }
});

//  Rendering the Login Page
router.get('/login', async (req, res) => {
    try {
        res.render('login');
    }
    catch (err) {
      res.status(500).send("Server error");
    }
});

// User Cart Route for add Products
router.get('/addtocart/:productid', isLoggedIn2, async (req, res) => {

    try {
        
        const userEmail = req.user.email;
        const productId = new ObjectId(req.params.productid); // the productId is an ObjectId

        // Aggregate pipeline to match user and check if product exists in cart
        const result = await User.aggregate([
            { $match: { email: userEmail } }, // Match the user by email
            {
                $project: {
                    cart: {
                        $filter: {
                            input: "$cart",
                            as: "item",
                            cond: { $eq: ["$$item", productId] }
                        }
                    }
                }
            },
            { $match: { "cart.0": { $exists: true } } } // Check if filtered cart array is not empty
        ]);

        if (result.length > 0) {
            return res.json({ success: false, message: 'The product is already in the cart' });
        }

        // If the product is not in the cart, add it
        await User.updateOne(
            { email: userEmail },
            { $push: { cart: productId } }
        );

        res.json({ success: true, message: 'Added to cart successfully' });

    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// Cart Route
router.get('/cart', isLoggedIn, async function (req, res) {
     try {
        // Find the User in Database
         let user = await User.findOne( { email: req.user.email }).populate('cart');
         res.render('cart', { user : user });
     }
     catch (err) {
      res.status(500).send("Server Error");
     }
    
});

// Update Cart (Removing the Cart Products of User)
router.post('/updateCart', isLoggedIn, async function (req, res) {
    try {
        // Find the User in Database
        let user = await User.findOne( { email: req.user.email });
       
        res.render('orderComplete');
        user.order.push(req.body);
        user.cart = [];  // Empty the Cart
        await user.save();
        
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

// Total Amount
router.post('/totalAmount', function(req, res) {
    res.send(req.body);
});

// Edit Route (Edit Page)
router.get('/edit', isLoggedIn, async function(req, res) {
    try {

        let user = null;
        let owner = null;

        // Checks if  the user is logged in find the user in the Database
        if (req.user) {
            user = await User.findOne({ email: req.user.email });
        }
        
        // Checks if  the Owner is logged in find the user in the Database
        if (req.owner) {
            owner = await Owner.findOne({ email: req.owner.email });
        }
         let messages = {
            imgError: req.flash('imageError'),
            passwordError: req.flash('passwordError')
             
         };

        if (user || owner) {
            res.render('edit', { user, owner, messages });
        } 
    
        } catch (err) {

            res.status(500).send("Server Error");
    }  
});

//  Update Route
 router.post('/update', upload.single('picture'), isLoggedIn, async function(req, res)  {
    try {
            //   Destructring 
    let { fullName, email, currentPassword, newPassword, address, contact} = req.body;
 
    let owner = null;


     // First, check if the email belongs to a user
    let user = await User.findOne({ email: email });

     // If not a user, check if it's an owner
     if(!user){
     owner = await Owner.findOne({ email: email });
     }

    if(user || owner){

        let entity = user ? user : owner;
        
        let updateData = { fullName };

        if(req.file){

            // Validate the file
            let validationResult = validateImage(req.file.buffer);
            if(!validationResult.ok){
                req.flash('imageError', "Only PNG, JPEG, and JPG files are allowed (1MB).")
                return res.redirect('/edit');
                
            }
            updateData.picture = req.file.buffer; 
        }

        if(currentPassword && newPassword){
            let isMatch = await comparePassword(currentPassword, entity.password);
            if(isMatch){
                
                    const salt = await bcrypt.genSalt(10);
                    const hash = await bcrypt.hash(newPassword, salt);
                    updateData.password = hash;
            } else {
                req.flash('passwordError', 'Passwords do not match!');
               return res.redirect('/edit');  
            }
        }
        if(address){
            updateData.address = address;

        } else if(contact){
            updateData.contact = contact;
        }

    // Update user data in the database
    if(user){
    await User.updateOne({ email: req.user.email }, { $set: updateData });
    } else if(owner) {
    await Owner.updateOne({ email: req.owner.email }, { $set: updateData });
    }
    //  Update the Data
    return res.redirect('/profile');
        
    } else {

        res.send(req.body.error);
    } 

   } catch(err) {
      res.status(500).send("Server Error");
   }
});

// Delete One Prduct from the User Cart
router.get('/delete/:productid', isLoggedIn, async function (req, res) {

    try {
        //  Delete One Product from the User Cart 
        const productId = new ObjectId(req.params.productid); // Ensure this line works without issues
        let user = await User.findOne({ email: req.user.email });
        
        if (!user) {
            return res.status(401).send('User not authenticated');
        }
        // Remove the product from the user's cart (assuming cart is an array of ObjectIds)
        user.cart = user.cart.filter(id => id.toString() !== productId.toString());

       
         // Save the updated user document
         await user.save();
         res.json('Product removed successfully');

    } catch (err) {
        res.status(500).send("Server Error");
    }
});

// Delete a Product (Owner)
router.get('/deleteProduct/:productid', isLoggedIn, isAdmin, async function (req, res) {
     
     try{
        // Find the Loggined Owner for the Database
        let owner = await Owner.findOne({ email: req.owner.email });
        const productId = new ObjectId(req.params.productid); 

       
        if(owner.products.length > 0){

        // Remove the product from the user's cart (assuming cart is an array of ObjectIds)
        owner.products = owner.products.filter(id => id.toString() !== productId.toString());

         // Save the updated user document
         await owner.save();

         // Delete the product from the product schema
         await productModel.deleteOne( { _id: productId } );
         res.json("Product deleted successfully");

        } else {
            res.status(404).json("Product not found in owner's products");
        }  

     } catch(err){
        res.status(500).json("Server Error");
     }
})

// Export the index file
module.exports = router;
