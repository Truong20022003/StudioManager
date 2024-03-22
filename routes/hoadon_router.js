var express = require("express");
var router = express.Router();
const HDCtl = require("../controllers/hoadon_controller");
router.post("/addhoadon", HDCtl.addhoadon);
router.get("/getListhoadon", HDCtl.getListhoadon);
router.put("/updatehoadon/:id", HDCtl.updatehoadon);
router.delete("/deletehoadon/:id", HDCtl.deletehoadon);
router.get("/gethoadonById", HDCtl.gethoadon);


module.exports = router;