const { khachhangModel } = require("../models/khachhang_model");

exports.addkhachhang = async (req, res, next) => {
    try {

        let obj = new khachhangModel({
            idnhanvien: req.body.idnhanvien,
            anh: req.body.anh,
            hoten: req.body.hoten,
            sdt: req.body.sdt,
            diachi: req.body.diachi,
            email: req.body.email,
            dsdichvu: req.body.dsdichvu,
        });
        let result = await obj.save();
        res.json({ status: "add thanh cong", result: result });
    } catch (error) {
        res.json({ status: "add khong thanh cong", result: error });
    }
};
//getlistkhachhang
exports.getListkhachhang = async (req, res, next) => {
    try {
        let listkhachhang = await khachhangModel.find({});
        res.json(listkhachhang);
    } catch (error) {
        res.json({ status: "not found", result: error });
    }
};
//editkhachhang
exports.updatekhachhang = async (req, res, next) => {
    try {
        let id = req.params.id;
        let obj = {};
        
        obj.idnhanvien = req.body.idnhanvien;
        obj.anh = req.body.anh;
        obj.hoten = req.body.hoten;
        obj.sdt = req.body.sdt;
        obj.diachi = req.body.diachi;
        obj.email = req.body.email;
        obj.dsdichvu = req.body.dsdichvu;
        let result = await khachhangModel.findByIdAndUpdate(id, obj, { new: true });
        res.json({ status: "update thanh cong", result: result });
    } catch (error) {
        res.json({ status: "update khong thanh cong", result: error });
    }
};
//deletekhachhang
exports.deletekhachhang = async (req, res, next) => {
    try {
        let id = req.params.id;
        let result = await khachhangModel.findByIdAndDelete(id);
        res.json({ status: "delete thanh cong", result: result });
    } catch (error) {
        res.json({ status: "delete khong thanh cong", result: error });
    }
};
//getkhachhangbyid
exports.getkhachhang = async (req, res, next) => {
    try {
        let id = req.params.id;
        let result = await khachhangModel.findById(id);
        res.json({ status: "ok", result: result });
    } catch (error) {
        res.json({ status: "not found", result: error });
    }
};
