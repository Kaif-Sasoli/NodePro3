            // ************** Product Route *****************

const express = require('express');
const router = express.Router();
const productModel = require('../models/productModel');
const upload = require('../config/multerConfig');
const  validateImage  = require('../utils/imageValidator'); // image validator
const { isLoggedIn } = require('../utils/isLoggedIn');
const { Owner } = require('../models/userModel');

router.get('/admin', (req, res) => {
    res.render('createProduct');
});

// Define route for "/create" for creating products
router.post('/create',isLoggedIn, upload.single('productImage'), async (req, res) => {
    
    try {

        let admin = await Owner.findOne({ email: req.owner.email });

        if(admin){

        let { name, price, discount, bgcolor, panelcolor, panelcolor2, textcolor } = req.body;

        if(name && price && discount && bgcolor && panelcolor && panelcolor2 && textcolor && req.file) {

        //  Image Validator
        let result = validateImage(req.file);
        if (!result.ok) {
            return res.json( { errorImg: result.errorImg });
        }

        let product = await productModel.create({
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            panelcolor2,
            textcolor,
            image: req.file.buffer
        });
        
        // Push the created product's ID into the Admin's product Array
        admin.products.push(product._id);
        await admin.save();

        res.json({  success: "Product created successfully" });

    } else {
        res.json({  error: "All fields are required" });
    }
  } else {
     throw new Error("The Admin only can create products");
  }
    } catch (err) {
        res.json({  error: "Something went wrong!" });
        
    }
});

module.exports = router;
