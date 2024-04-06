var express = require("express");
var router = express.Router();
const HDCTCtl = require("../controllers/hoadonchitiet_controller");
router.post("/addhoadonchitiet", HDCTCtl.addhoadonchitiet);
router.get("/getListhoadonchitiet", HDCTCtl.getListhoadonchitiet);
router.put("/updatehoadonchitiet/:id", HDCTCtl.updatehoadonchitiet);
router.delete("/deletehoadonchitiet/:id", HDCTCtl.deletehoadonchitiet);
router.get("/gethoadonchitietById/:id", HDCTCtl.gethoadonchitiet);
router.get("/gethoadonchitietByIdHoaDon/:idhoadon",HDCTCtl.getListHoadonchitietByIdHoadon)

module.exports = router;