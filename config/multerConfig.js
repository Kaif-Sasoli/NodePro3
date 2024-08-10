      //***************** Multer Config  ************/
      
const multer = require('multer');

const storage = multer.memoryStorage(); // create memory storage to upload
const upload = multer({ storage: storage }); // by default upload

module.exports = upload;


