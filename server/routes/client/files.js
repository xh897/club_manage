const express = require("express")
const router = express.Router()
const path = require("path")
// 文件上传模块
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, "../../uploads")); // 存放图片文件夹
    },
    filename: function (req, file, cb) {
        const fileFormat = file.originalname.split("."); // 文件名
        cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})
const upload = multer({ storage });

// 图片上传 并将拼接好的图片url返回给前端
router.post("/uploads/images", upload.single("file"), async (req, res) => {
    const { filename } = req.file;
    return res.send({ filename });
});
module.exports = router;


