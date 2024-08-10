//            *************** Genereate Token    *********************

const JWT = require('jsonwebtoken');

// Function for Generating Token
const generateToken = (user) => {
                                                        // Secret Key
    return JWT.sign({ email: user.email, id: user._id}, process.env.JWT_KEY, { expiresIn: '1h' });
}
module.exports.generateToken = generateToken;