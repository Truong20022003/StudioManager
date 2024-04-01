const { dichvuModel } = require("../models/dichvu_model");

exports.adddichvu = async (req, res, next) => {
  try {
    let anh = req.body.anh;
    if (Array.isArray(anh)) {
      // Nếu là mảng, chuyển thành chuỗi bằng cách nối các đường dẫn cách nhau bằng dấu phẩy
      anh = anh.join(",");
    }
    let obj = new dichvuModel({
      ten: req.body.ten,
      gia: req.body.gia,
      trangthai: req.body.trangthai,
      mota: req.body.mota,
      anh: anh,
    });
    let result = await obj.save();
    res.json({ status: "add thanh cong", result: result });
  } catch (error) {
    res.json({ status: "add khong thanh cong", result: error });
  }
};
//getlistdichvu
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
    let obj = {};
    obj.ten = req.body.ten;
    obj.gia = req.body.gia;
    obj.trangthai = req.body.trangthai;
    obj.mota = req.body.mota;
    obj.anh = req.body.anh;
    let result = await dichvuModel.findByIdAndUpdate(id, obj, { new: true });
    res.json({ status: "update thanh cong", result: result });
  } catch (error) {
    res.json({ status: "update khong thanh cong", result: error });
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
