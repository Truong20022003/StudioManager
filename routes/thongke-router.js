var express = require("express");
var router = express.Router();
const TKCTL = require("../controllers/thongke_controller");
router.get("/getthongketongtien", TKCTL.getthongketongtien);
router.get("/getTongTienVaHoadonTrongNam", TKCTL.getTongTienVaHoadonTrongNam);
router.get(
  "/getSoLuongDonHangTrangThaiTrue",
  TKCTL.getSoLuongDonHangTrangThaiTrue
);

// router.get(
//   "/getThongKeTongTienTheoNgayVaThangTraHang",
//   TKCTL.getThongKeTongTienTheoNgayVaThangTraHang
// );
// router.get("/doanhthu_thongso", TKCTL.getthongketdoanhthu);
// router.get("/doanhthu_in_date", TKCTL.doanhthu_in_date);
// router.get("/doanhthu_in_month", TKCTL.doanhthu_in_month);
module.exports = router;
