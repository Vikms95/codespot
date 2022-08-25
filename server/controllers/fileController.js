const multer = require('multer')

const dirLinux = './public/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      console.log(file)
      cb(null, dirLinux);
    },
    filename: (req, file, cb) => {
      console.log(file)
        // Changed to just the original name so when the picture gets updated, if
        // the picture is not changed, it will not save a new one to /public
        
        cb(null, file.originalname)
    },
    
});

let upload = multer({
    storage: storage,
    onFileUploadStart : (file) => console.log(file.originalname+ ' is starting ...'),
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

module.exports = {upload}