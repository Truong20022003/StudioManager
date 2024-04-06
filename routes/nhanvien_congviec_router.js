var express = require("express");
var router = express.Router();
const NVCVCtl = require("../controllers/nhanvien_congviec_controller");
router.post('/addNhanVienCongViec', NVCVCtl.addnhanvien_congviec);
router.get('/getNvCvByIdNhanVien/:id_nhanvien',NVCVCtl.getListByIdNhanVien);
router.get('/getNvCvByIdCongViec/:id_congviec',NVCVCtl.getListByIdCongViec);
module.exports = router;