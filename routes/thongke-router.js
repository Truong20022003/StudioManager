var express = require("express");
var router = express.Router();
const TKCTL = require("../controllers/thongke_controller");
router.get("/getthongke", TKCTL.getthongketongtien);
module.exports = router;
