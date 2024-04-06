const { hoadonModel } = require("../models/hoadon_model");
const moment = require("moment");
// Thống kê tổng tiền của tất cả hóa đơn
exports.getthongketongtien = async (req, res, next) => {
  try {
    const total = await hoadonModel.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$tongtien" },
        },
      },
    ]);
    // Kiểm tra nếu không có dữ liệu trả về từ aggregate
    if (total.length === 0) {
      return res.json({ status: "Tổng doanh thu: ", totalRevenue: 0 });
    }
    res.json({
      status: "Thống kê tổng tiền:",
      Tong: total[0].totalRevenue,
    });
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error("Thống kê tổng doanh thu thất bại", error);
    res.status(500).json({ status: "error", error: "Internal server error" });
  }
};
// Thống kê tổng tiền của tất cả hóa đơn theo từng ngày
exports.getTongTienVaHoadonTrongNam = async (req, res, next) => {
  try {
    const { year } = req.query;

    // Kiểm tra xem năm được cung cấp có hợp lệ không
    if (!year || isNaN(year)) {
      return res.status(400).json({ status: "error", error: "Invalid year" });
    }

    // Tính ngày bắt đầu và kết thúc của năm được cung cấp
    const startDate = moment(`${year}-01-01`, "YYYY-MM-DD").toDate();
    const endDate = moment(`${year}-12-31`, "YYYY-MM-DD").toDate();

    // Lấy tất cả hóa đơn được cập nhật trong năm được cung cấp
    const hoadons = await hoadonModel.find({
      trangthai: true,
      updatedAt: { $gte: startDate, $lte: endDate },
    });

    // Tính tổng tiền của tất cả hóa đơn
    let totalTongTien = 0;
    for (const hoadon of hoadons) {
      totalTongTien += hoadon.tongtien;
    }
    // Trả về thông tin của tất cả hóa đơn và tổng tiền
    res.json({
      status: "success",
      hoadons: hoadons,
      tongTienTrongNam: totalTongTien,
    });
  } catch (error) {
    console.error("Lỗi khi lấy hóa đơn và tính tổng tiền trong năm", error);
    res.status(500).json({ status: "error", error: "Internal server error" });
  }
};

exports.getSoLuongDonHangTrangThaiTrue = async (req, res, next) => {
  try {
    const count = await hoadonModel.countDocuments({ trangthai: true });
    res.json({ status: "success", soLuongDonHang: count });
  } catch (error) {
    console.error("Lỗi khi thống kê số lượng đơn hàng", error);
    res.status(500).json({ status: "error", error: "Internal server error" });
  }
};
