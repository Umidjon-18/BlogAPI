const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './images')
    },
    filename: function (req, file, cb) {
        const extension = file.originalname.split(".")[1];
        const filename = req.body.username + '-' + Date.now() + "." + extension;
        cb(null, filename);
    }
  })
  
  const upload = multer({ storage: storage });

  module.exports = upload;