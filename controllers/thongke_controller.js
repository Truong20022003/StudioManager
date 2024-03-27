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
// Thống kê tổng tiền của tất cả hóa đơn theo từng ngày
exports.getThongKeTongTienTheoNgay = async (req, res, next) => {
  try {
    // Tính ngày bắt đầu và kết thúc của ngày hiện tại
    const startDate = moment().startOf("day");
    const endDate = moment(startDate).endOf("day");

    const totalByDay = await hoadonModel.aggregate([
      {
        $match: {
          ngaydathang: {
            $gte: startDate.toDate(),
            $lte: endDate.toDate(),
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$ngaydathang" },
            month: { $month: "$ngaydathang" },
            day: { $dayOfMonth: "$ngaydathang" },
          },
          totalRevenue: { $sum: "$tongtien" },
        },
      },
    ]);

    const results = totalByDay.map((day) => ({
      date: new Date(day._id.year, day._id.month - 1, day._id.day),
      totalRevenue: day.totalRevenue,
    }));

    res.json({ status: "success", totalByDay: results });
  } catch (error) {
    console.error("Thống kê tổng doanh thu theo ngày thất bại", error);
    res.status(500).json({ status: "error", error: "Internal server error" });
  }
};
