import multer, { FileFilterCallback } from "multer";
import { Request } from "express";
const dirLinux = "./public/";

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
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

  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

export { upload };
