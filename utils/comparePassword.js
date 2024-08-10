                      //***********  Compare Password  ***********/
                      
const bcrypt = require('bcrypt');   // require 'bcrypt'
const { generateToken } = require('./generateToken'); // require 'generateToken'

//  Fucntion comparePasswordAndGenerateToken
async function comparePasswordAndGenerateToken(user, password, res) {
    
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, function(err, result) {
           if(err) return reject(err);

           if(result){
            const token = generateToken(user);
            res.cookie('token', token);
            resolve();
           } else {
            reject(new Error('Email or Password Incorrect!'));
           }

        });
    });

}

// Function to compare Password
async function comparePassword(password, storedPassword){
         try {
             return await bcrypt.compare(password, storedPassword);
         } catch (err) {
             throw err;
         }
}
//   Exporting the function
 module.exports = { comparePasswordAndGenerateToken, comparePassword };