var express = require("express");
var router = express.Router();
const NVCtl = require("../controllers/nhanvien_controller");
const upload = require("./upload");
router.post("/addnhanvien",upload.single("anh"), NVCtl.addnhanvien);
router.get("/getListnhanvien", NVCtl.getListnhanvien);
router.put("/updatenhanvien/:id", NVCtl.updatenhanvien);
router.delete("/deletenhanvien/:id", NVCtl.deletenhanvien);
router.get("/getnhanvienById/:id", NVCtl.getnhanvien);
router.post("/login", NVCtl.login);
router.post("/register", NVCtl.register);
module.exports = router;
