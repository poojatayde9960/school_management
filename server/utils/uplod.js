
const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({        //diskStorage imbild fuction  
    filename: (req, file, cb) => {   // date.now second cout krt
        const fn = Date.now() + path.extname(file.originalname)
        cb(null, fn)
    }
})
exports.upload = multer({ storage }).single("profile")
exports.uploadImage = multer({ storage }).fields([
    { name: "images", maxCount: 5 },
    { name: "facilites", maxCount: 5 },
    { name: "eventimages", maxCount: 5 },
    { name: "studentDocument", maxCount: 5 },
])