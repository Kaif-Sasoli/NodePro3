        //********** User Route ************/

const express = require('express'); // Import Express
const router = express.Router();   // Create router
const { registerUser, loginUser, logout, edit } = require('../controllers/authController');
// Define route for "/"

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/logout', logout);



// Export route
module.exports = router;