const { hoadonModel } = require("../models/hoadon_model");

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
