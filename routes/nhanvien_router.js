var express = require("express");
var router = express.Router();
const NVCtl = require("../controllers/nhanvien_controller");
router.post("/addnhanvien", NVCtl.addnhanvien);
router.get("/getListnhanvien", NVCtl.getListnhanvien);
router.put("/updatenhanvien/:id", NVCtl.updatenhanvien);
router.delete("/deletenhanvien/:id", NVCtl.deletenhanvien);
router.get("/getnhanvienById", NVCtl.getkhachhang);
router.post("/login", NVCtl.login);

module.exports = router;