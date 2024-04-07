const { dichvuModel } = require("../models/dichvu_model");
const { hoadonModel } = require("../models/hoadon_model");
const { hoadonchitietModel } = require("../models/hoadonchitiet_model");
exports.adddichvu = async (req, res, next) => {
  try {
    const { files } = req;
    console.log(files);
    if (files && files.length > 0) {
      const data = req.body;
      const urlsImage = files.map(
        (file) =>
          `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
      );
    
      const newdata = new dichvuModel({
        ten: data.ten,
        gia: data.gia,
        trangthai: data.trangthai,
        mota: data.mota,
        anh: urlsImage,
      });
      const result = await newdata.save();
      if (result) {
        return res.status(200).json({
          status: 200,
          message: "Thêm dịch vụ thành công",
          data: result,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Lỗi, không thể thêm dịch vụ",
          data: [],
        });
      }
    } else {
      return res.status(400).json({
        status: 400,
        message: "Không có tệp nào được tải lên",
        data: [],
      });
    }
  } catch (error) {
    console.error("Lỗi khi thêm dịch vụ:", error);
    return res.status(500).json({
      status: 500,
      message: "Lỗi server",
      data: [],
    });
  }
};

exports.getListdichvu = async (req, res, next) => {
  try {
    let listdichvu = await dichvuModel.find({});
    res.json(listdichvu);
  } catch (error) {
    res.json({ status: "not found", result: error });
  }
};
//editdichvu
exports.updatedichvu = async (req, res, next) => {
  try {
    let id = req.params.id;
    let existingDichVu = await dichvuModel.findById(id);
    if (!existingDichVu) {
      return res.status(404).json({
        status: 404,
        message: "Không tìm thấy dịch vụ",
        data: [],
      });
    }

    const { files } = req;
    console.log(files);
    const data = req.body;
    const urlsImage = files.map(
      (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
    );

    let updatedData = {
      ten: data.ten,
      gia: data.gia,
      trangthai: data.trangthai,
      mota: data.mota,
      anh: urlsImage,
    };

    let result = await dichvuModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (result) {
      return res.status(200).json({
        status: 200,
        message: "Cập nhật dịch vụ thành công",
        data: result,
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: "Không thể cập nhật dịch vụ",
        data: [],
      });
    }
  } catch (error) {
    console.error("Lỗi khi cập nhật dịch vụ:", error);
    return res.status(500).json({
      status: 500,
      message: "Lỗi server",
      data: [],
    });
  }
};

//deletedichvu
exports.deletedichvu = async (req, res, next) => {
  try {
    let id = req.params.id;
    let result = await dichvuModel.findByIdAndDelete(id);
    res.json({ status: "delete thanh cong", result: result });
  } catch (error) {
    res.json({ status: "delete khong thanh cong", result: error });
  }
};
//getdichvubyid
exports.getdichvu = async (req, res, next) => {
  try {
    let id = req.params.id;
    let result = await dichvuModel.findById(id);
    res.json({ status: "ok", result: result });
  } catch (error) {
    res.json({ status: "not found", result: error });
  }
};

exports.getTop10DichVu = async (req, res, next) => {
  try {
    const top10DichVu = await hoadonchitietModel.aggregate([
      {
        $group: {
          _id: "$iddichvu", // Group theo ID dịch vụ
          count: { $sum: 1 }, // Đếm số lần xuất hiện của mỗi dịch vụ
        },
      },
      {
        $sort: { count: -1 }, // Sắp xếp theo số lần xuất hiện giảm dần
      },
      {
        $limit: 10, // Chỉ lấy top 10
      },
    ]);

    const top10DichVuIds = top10DichVu.map((dichvu) => dichvu._id);

    // Lấy thông tin chi tiết của các dịch vụ trong top 10
    const top10DichVuDetails = await dichvuModel.find({
      _id: { $in: top10DichVuIds },
    });

    // Kết quả trả về
    res.json({ status: "success", top10DichVu: top10DichVuDetails });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
exports.getNewlyAddedDichVu = async (req, res, next) => {
  try {
    // Lấy danh sách dịch vụ và sắp xếp theo thời gian tạo mới nhất
    const newDichVu = await dichvuModel.aggregate([
      { $match: { trangthai: true } }, // Chỉ lấy các dịch vụ có trạng thái true
      { $sort: { createdAt: -1 } }, // Sắp xếp theo thời gian tạo mới nhất
      { $limit: 5 }, // Chỉ lấy top 5 dịch vụ mới nhất
    ]);

    // Kiểm tra nếu có dịch vụ mới được thêm
    if (newDichVu.length > 0) {
      return res.status(200).json({
        status: 200,
        message: "Danh sách 5 dịch vụ mới được thêm và có trạng thái true",
        newDV: newDichVu,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Không có dịch vụ mới được thêm và có trạng thái true",
        newDV: [],
      });
    }
  } catch (error) {
    console.error("Lỗi khi lấy danh sách dịch vụ mới:", error);
    return res.status(500).json({
      status: 500,
      message: "Lỗi server",
      newDV: [],
    });
  }
};

exports.searchDichVuByName = async (req, res, next) => {
  try {
    const { ten } = req.query;

    if (!ten) {
      return res.status(400).json({
        status: 400,
        message: "Vui lòng cung cấp tên dịch vụ để tìm kiếm",
        data: [],
      });
    }
    // Sử dụng regex để tìm kiếm không phân biệt hoa thường
    const searchedDichVu = await dichvuModel.find({
      ten: {
        $regex: new RegExp(ten.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"), "i"),
      }, // Tìm kiếm không phân biệt hoa thường
    });
    // Kiểm tra nếu có dịch vụ được tìm thấy
    if (searchedDichVu.length > 0) {
      return res.status(200).json({
        status: 200,
        message: `Danh sách dịch vụ có tên chứa "${ten}"`,
        timkiem: searchedDichVu,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: `Không tìm thấy dịch vụ có tên chứa "${ten}"`,
        timkiem: [],
      });
    }
  } catch (error) {
    console.error("Lỗi khi tìm kiếm dịch vụ theo tên:", error);
    return res.status(500).json({
      status: 500,
      message: "Lỗi server",
      timkiem: [],
    });
  }
};
