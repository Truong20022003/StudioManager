const { hoadonchitietModel } = require("../models/hoadonchitiet_model");

exports.addhoadonchitiet = async (req, res, next) => {
    try {

        let obj = new hoadonchitietModel({
            idhoadon: req.body.idnhanvien,
            soluong: req.body.hoten,
            dongia: req.body.sdt,
            thanhtien: req.body.diachi,

        });
        let result = await obj.save();
        res.json({ status: "add thanh cong", result: result });
    } catch (error) {
        res.json({ status: "add khong thanh cong", result: error });
    }
};
//getlisthoadonchitiet
exports.getListhoadonchitiet = async (req, res, next) => {
    try {
        let listhoadonchitiet = await hoadonchitietModel.find({});
        res.json(listhoadonchitiet);
    } catch (error) {
        res.json({ status: "not found", result: error });
    }
};
//edithoadonchitiet
exports.updatehoadonchitiet = async (req, res, next) => {
    try {
        let id = req.params.id;
        let obj = {};

        obj.idhoadon = req.body.idnhanvien;
        obj.soluong = req.body.hoten;
        obj.dongia = req.body.sdt;
        obj.thanhtien = req.body.diachi;
        let result = await hoadonchitietModel.findByIdAndUpdate(id, obj, { new: true });
        res.json({ status: "update thanh cong", result: result });
    } catch (error) {
        res.json({ status: "update khong thanh cong", result: error });
    }
};
//deletehoadonchitiet
exports.deletehoadonchitiet = async (req, res, next) => {
    try {
        let id = req.params.id;
        let result = await hoadonchitietModel.findByIdAndDelete(id);
        res.json({ status: "delete thanh cong", result: result });
    } catch (error) {
        res.json({ status: "delete khong thanh cong", result: error });
    }
};
//gethoadonchitietbyid
exports.gethoadonchitiet = async (req, res, next) => {
    try {
        let id = req.params.id;
        let result = await hoadonchitietModel.findById(id);
        res.json({ status: "ok", result: result });
    } catch (error) {
        res.json({ status: "not found", result: error });
    }
};
