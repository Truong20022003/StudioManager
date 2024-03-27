var express = require("express");
var router = express.Router();
const TKCTL = require("../controllers/thongke_controller");
router.get("/getthongke", TKCTL.getthongketongtien);
router.get("/getthongketheongay", TKCTL.getThongKeTongTienTheoNgay);
module.exports = router;
