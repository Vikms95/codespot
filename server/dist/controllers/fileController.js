import multer from "multer";
const dirLinux = "./public/";
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, dirLinux);
    },
    filename: (req, file, cb) => {
        // Use just the original name so when the picture gets updated, if
        // the picture is not changed, it will not save a new one to /public
        cb(null, file.originalname);
    },
});
const upload = multer({
    storage,
    //   TODO check if this is required
    //   onFileUploadStart: (file: any) =>
    //     console.log(file.originalname + " is starting ..."),
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg") {
            cb(null, true);
        }
        else {
            cb(null, false);
            return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
        }
    },
});
export { upload };
