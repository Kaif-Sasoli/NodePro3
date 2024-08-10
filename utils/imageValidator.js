//************    Image Validator **************

const validateImage = (buffer) => {

    const maxSize = 1 * 1024 * 1024; // 1MB calcuating the size
    let ext = buffer.mimetype;  // buffer type
    let allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];  // allowed mime types
    
     if(!allowedMimeTypes.includes(ext)) {

        return { ok: false, errorImg: "Only PNG, JPEG, and JPG files are allowed." };
     }
     
    if(buffer.size > maxSize){
        return { ok: false, errorImg: "Image is too large! (1MB)" };
    }

     // If all checks pass, return success
     return { ok: true, successImg: "Successfully validated" };

}

module.exports = validateImage;