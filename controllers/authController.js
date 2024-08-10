        //*********  Authentication  *********/

   const { User, Owner } = require('../models/userModel'); // requiring the User & Owner model
    const bcrypt = require('bcrypt');  // require the bcrypt package
    const { generateToken } = require('../utils/generateToken'); // require the generateToken function
    const { comparePasswordAndGenerateToken } = require('../utils/comparePassword'); // require the comparePasswordAndGenerateToken function



    //  Exporting the Regisester module
    module.exports.registerUser = async function (req, res) {
        
        // Destructuring 
        const {fullName, email , password} = req.body;

        if(fullName && email && password){ // check is Fields are empty

            try {
                let user = await User.findOne({ email }); // finding the email

                if(user){  // Condition is email already exists
                res.json({ error: 'User already Exists!' });
                return;
                }
                else {
                    // Encrypting the password
                    bcrypt.genSalt(10, function(err, salt){
                        bcrypt.hash(password, salt, async function(err, hash){
                            if(err) return res.json({ error: 'Something went wrong!' });

                            else{
                                // Creating a User
                                let createdUser =  await User.create({
                                    fullName,
                                    email,
                                    password: hash
                                });
                                // Setting Cookies
                                let token = generateToken(createdUser);
                                res.cookie('token', token);
                                res.json({ redirect: '/', message: 'Registration successful' }); 
                            }
                        });
                    }); 
                }
            } catch (err) {
                res.json({ error: 'Something went wrong!' });
            }
        }
        else {
            res.json({ error: 'All fields are required'}); 
        }
    };

    // Login Module
    module.exports.loginUser = async function (req, res){
        
        // Destructuring
        let { email, password } = req.body;

        // Check if email & password exist
        if(email && password){

            try {
            // Find them in the database
            let user = await User.findOne({ email: email});
            let owner = await Owner.findOne({ email: email });
            
            if(user) {
            await comparePasswordAndGenerateToken(user, password, res);
            return res.json({ redirect: user.isAdmin ? '/admin/dashboard' : '/'});

            } else if(owner) {

            await comparePasswordAndGenerateToken(owner, password, res);
            return res.json({ redirect: '/admin/dashboard'});
            } else {

                return res.json({ error: "Email or Password are Incorrect!"});
            }
            }
            catch(err){
                res.json({ error: err.message });
            }
        }else{
            res.json({ error: "All Fields are required!"});
        }
    }

    // Logout Module
    module.exports.logout = function(req, res){

        // Empty the Cookie
        res.cookie('token', '');
        res.redirect('/');
    }

    
 