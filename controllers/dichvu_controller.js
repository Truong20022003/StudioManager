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
/////getTop10DichVu
// exports.getTop10DichVu = async (req, res, next) => {
//   try {
//     const top10DichVu = await hoadonchitietModel.aggregate([
//       {
//         $group: {
//           _id: "$iddichvu", // Group theo ID dịch vụ

//           tongSoLuong: { $sum: "$soluong" }, // Tính tổng số lượng sử dụng cho mỗi dịch vụ
//         },
//       },
//       {
//         $sort: { tongSoLuong: -1 }, // Sắp xếp theo tổng số lượng giảm dần
//       },
//       {
//         $limit: 10, // Chỉ lấy top 10
//       },
//     ]);

//     res.json({ status: "success", top10DichVu: top10DichVu });
//   } catch (error) {
//     res.status(500).json({ status: "error", error: error.message });
//   }
// };
exports.getTop10DichVu = async (req, res, next) => {
  try {
    const top10DichVu = await hoadonchitietModel.aggregate([
      {
        $group: {
          _id: "$iddichvu", // Group theo ID dịch vụ

          tongSoLuong: { $sum: "$soluong" }, // Tính tổng số lượng sử dụng cho mỗi dịch vụ
        },
      },
      {
        $lookup: {
          from: "dichvuModel", // Tên bảng chứa thông tin về dịch vụ
          localField: "_id",
          foreignField: "_id",
          as: "dichvu", // Đặt tên cho mảng chứa thông tin của dịch vụ
        },
      },
      {
        $unwind: "$dichvu", // Tách các mảng dichvu thành các bản ghi độc lập
      },
      {
        $sort: { tongSoLuong: -1 }, // Sắp xếp theo tổng số lượng giảm dần
      },
      {
        $limit: 10, // Chỉ lấy top 10
      },
      {
        $project: {
          _id: 1,
          tenDichVu: "$dichvu.ten",
          tongSoLuong: 1,
        },
      },
    ]);

    res.json({ status: "success", top10DichVu: top10DichVu });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
