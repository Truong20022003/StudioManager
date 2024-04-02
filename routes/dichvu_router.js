var express = require("express");
var router = express.Router();
const DVCtl = require("../controllers/dichvu_controller");
router.post("/adddichvu", DVCtl.adddichvu);
router.get("/getListdichvu", DVCtl.getListdichvu);
router.put("/updatedichvu/:id", DVCtl.updatedichvu);
router.delete("/deletedichvu/:id", DVCtl.deletedichvu);
router.get("/getdichvuById/:id", DVCtl.getdichvu);


module.exports = router;