    //*******   Image Buffer (Default Images)  ***************
    
const fs = require('fs');
const path = require('path');

// Function to get the default image buffer based on entity type
function getDefaultImageBuffer(entity) {
    let imageName;

    switch (entity) {
        case 'user':
            imageName = 'DefaultUser.jpg';
            break;
        case 'owner':
            imageName = 'DefaultUser.jpg';
            break;
        case 'product':
            imageName = 'defaultImage.png';
            break;
        default:
            throw new Error('Invalid entity type');
    }

    const imagePath = path.join(__dirname, '../public/images', imageName);
    if (!fs.existsSync(imagePath)) {
        throw new Error(`Default image not found: ${imagePath}`);
    }
    return fs.readFileSync(imagePath);
}

module.exports = getDefaultImageBuffer;
