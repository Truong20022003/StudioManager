var express = require("express");
var router = express.Router();
const KHCtl = require("../controllers/khachhang_controller");
router.post("/addkhachhang", KHCtl.addkhachhang);
router.get("/getListkhachhang", KHCtl.getListkhachhang);
router.put("/updatekhachhang/:id", KHCtl.updatekhachhang);
router.delete("/deletekhachhang/:id", KHCtl.deletekhachhang);
router.get("/getkhachhangById", KHCtl.getkhachhang);


module.exports = router;