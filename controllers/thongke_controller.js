const { hoadonModel } = require("../models/hoadon_model");
const moment = require("moment");

exports.getSoLuongDonHangTrangThaiTrueTatCa = async (req, res, next) => {
  try {
    const count = await hoadonModel.countDocuments({ trangthai: true });
    res.json({ status: "success", soLuongDonHang: count });
  } catch (error) {
    console.error("Lỗi khi thống kê số lượng đơn hàng", error);
    res.status(500).json({ status: "error", error: "Internal server error" });
  }
};
///
exports.getSoLuongDonHangTheoThangNamTrue = async (req, res, next) => {
  try {
    const year = parseInt(req.query.year) || new Date().getFullYear();
    const month = parseInt(req.query.month) || new Date().getMonth() + 1;
    // Nếu không có thông tin về năm và tháng từ client, sử dụng năm và tháng hiện tại

    if (isNaN(month) || month < 1 || month > 12) {
      return res
        .status(400)
        .json({ status: 400, message: "Tháng không hợp lệ" });
    }

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const onlineOrders = await hoadonModel
      .find({
        $and: [
          { ngaytrahang: { $gte: startDate.toISOString() } },
          { ngaytrahang: { $lte: endDate.toISOString() } },
          { trangthai: true },
        ],
      })
      .exec();

    res.json({
      status: 200,
      message: `Số lượng đơn hàng trực tuyến trong tháng ${month}/${year}`,
      tongsodon: onlineOrders.length,
      danhsach: onlineOrders,
    });
  } catch (error) {
    console.error("Lỗi khi thống kê số lượng đơn hàng trực tuyến:", error);
    res.status(500).json({
      status: 500,
      message: "Đã xảy ra lỗi khi thống kê số lượng đơn hàng trực tuyến",
    });
  }
};
/////false so luong don ko thanh cong
exports.getSoLuongDonHangTheoThangNamFalse = async (req, res, next) => {
  try {
    const year = parseInt(req.query.year) || new Date().getFullYear();
    const month = parseInt(req.query.month) || new Date().getMonth() + 1;
    // Nếu không có thông tin về năm và tháng từ client, sử dụng năm và tháng hiện tại

    if (isNaN(month) || month < 1 || month > 12) {
      return res
        .status(400)
        .json({ status: 400, message: "Tháng không hợp lệ" });
    }

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const onlineOrders = await hoadonModel
      .find({
        $and: [
          { ngaytrahang: { $gte: startDate.toISOString() } },
          { ngaytrahang: { $lte: endDate.toISOString() } },
          { trangthai: false },
        ],
      })
      .exec();

    res.json({
      status: 200,
      message: `Số lượng đơn hàng trực tuyến trong tháng ${month}/${year}`,
      tongsodon: onlineOrders.length,
      danhsach: onlineOrders,
    });
  } catch (error) {
    console.error("Lỗi khi thống kê số lượng đơn hàng trực tuyến:", error);
    res.status(500).json({
      status: 500,
      message: "Đã xảy ra lỗi khi thống kê số lượng đơn hàng trực tuyến",
    });
  }
};
///////chuatest  getSoLuongDonHangTheoThang
exports.getThongKeTongTien_NamBieuDo = async (req, res) => {
  try {
    const year = parseInt(req.query.year) || new Date().getFullYear();
    const monthlyRevenues = [];
    const monthlyOrders = []; // Mảng chứa các đơn hàng theo từng tháng

    const hoaDonData = await hoadonModel.find({}).exec();

    for (let month = 0; month < 12; month++) {
      const filteredHoaDon = hoaDonData.filter((hoaDon) => {
        const ngayTraHang = new Date(hoaDon.ngaytrahang);
        return (
          ngayTraHang.getFullYear() === year &&
          ngayTraHang.getMonth() === month &&
          hoaDon.trangthai === true
        );
      });

      const totalRevenue = filteredHoaDon.reduce(
        (acc, hoaDon) => acc + hoaDon.tongtien,
        0
      );

      monthlyRevenues.push({
        month: month + 1,
        revenue: totalRevenue,
      });

      monthlyOrders.push({
        month: month + 1,
        orders: filteredHoaDon,
      });
    }

    console.log(monthlyRevenues);

    res.json({
      status: 200,
      message: `Doanh thu trong năm ${year} theo từng tháng`,
      dulieu: monthlyRevenues,
      monthlyOrders: monthlyOrders, // Thêm mảng monthlyOrders vào phản hồi JSON
    });
  } catch (error) {
    console.error("Lỗi khi lấy doanh thu theo tháng:", error);
    res
      .status(500)
      .json({ status: 500, message: "Đã xảy ra lỗi khi lấy doanh thu" });
  }
};
////
exports.getHoaDonThangVaNam = async (req, res) => {
  try {
    const year = parseInt(req.query.year) || new Date().getFullYear();
    const month = parseInt(req.query.month) || new Date().getMonth() + 1;
    // Nếu không có thông tin về năm và tháng từ client, sử dụng năm và tháng hiện tại

    if (isNaN(month) || month < 1 || month > 12) {
      return res
        .status(400)
        .json({ status: 400, message: "Tháng không hợp lệ" });
    }

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const orders = await hoadonModel
      .find({
        $and: [
          { ngaytrahang: { $gte: startDate.toISOString() } },
          { ngaytrahang: { $lte: endDate.toISOString() } },
          { trangthai: true },
        ],
      })
      .exec();

    res.json({
      status: 200,
      message: `Các hóa đơn trong tháng ${month}/${year}`,
      orders: orders,
    });
  } catch (error) {
    console.error("Lỗi khi lấy các hóa đơn trong tháng:", error);
    res.status(500).json({
      status: 500,
      message: "Đã xảy ra lỗi khi lấy các hóa đơn trong tháng",
    });
  }
};
