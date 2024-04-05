var express = require("express");
var router = express.Router();
const Upload = require("./upload");
const DVCtl = require("../controllers/dichvu_controller");
router.post("/adddichvu", Upload.array("anh", 5), DVCtl.adddichvu);
router.get("/getListdichvu", DVCtl.getListdichvu);
router.put("/updatedichvu/:id", Upload.array("anh", 5), DVCtl.updatedichvu);
router.delete("/deletedichvu/:id", DVCtl.deletedichvu);
router.get("/getdichvuById/:id", DVCtl.getdichvu);
router.get("/getTop10DichVu", DVCtl.getTop10DichVu);

module.exports = router;
