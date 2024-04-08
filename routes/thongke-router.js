var express = require("express");
var router = express.Router();
const TKCTL = require("../controllers/thongke_controller");
router.get(
  "/getSoLuongDonHangTrangThaiTrueTatCa",
  TKCTL.getSoLuongDonHangTrangThaiTrueTatCa
);
router.get(
  "/getSoLuongDonHangTheoThangNamTrue",
  TKCTL.getSoLuongDonHangTheoThangNamTrue
);
router.get(
  "/getSoLuongDonHangTheoThangNamFalse",
  TKCTL.getSoLuongDonHangTheoThangNamFalse
);
router.get("/getThongKeTongTien_NamBieuDo", TKCTL.getThongKeTongTien_NamBieuDo);
router.get("/getHoaDonThangVaNam", TKCTL.getHoaDonThangVaNam);
module.exports = router;
