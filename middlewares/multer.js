const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/avatars");
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()} - ${file.originalname}`;
    cb(null, filename);
  },
});

//agregar sharp para automáticamente resizear la foto

const upload = (formName) => {
  return multer({ storage: storage }).single(formName);
};

module.exports = {
  upload,
};
