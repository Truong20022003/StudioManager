const { congviecModel } = require("../models/congviec_model");

exports.addcongviec = async (req, res, next) => {
    try {

        let obj = new congviecModel({
            tencongviec: req.body.tencongviec,
            idnhanvien: req.body.idnhanvien,
            ngaybatdau: req.body.ngaybatdau,
            ngayketthuc: req.body.ngayketthuc,
            trangthai: req.body.trangthai,
            mota: req.body.mota,
        });
        let result = await obj.save();
        res.json({ status: "add thanh cong", result: result });
    } catch (error) {
        res.json({ status: "add khong thanh cong", result: error });
    }
};
//getlistcongviec
exports.getListcongviec = async (req, res, next) => {
    try {
        let listcongviec = await congviecModel.find({});
        res.json(listcongviec);
    } catch (error) {
        res.json({ status: "not found", result: error });
    }
};
//editcongviec
exports.updatecongviec = async (req, res, next) => {
    try {
        let id = req.params.id;
        let obj = {};
        obj.tencongviec= req.body.tencongviec;
        obj.idnhanvien= req.body.idnhanvien;
        obj.ngaybatdau= req.body.ngaybatdau;
        obj.ngayketthuc= req.body.ngayketthuc;
        obj.trangthai= req.body.trangthai;
        obj.mota= req.body.mota;
       
        let result = await congviecModel.findByIdAndUpdate(id, obj, { new: true });
        res.json({ status: "update thanh cong", result: result });
    } catch (error) {
        res.json({ status: "update khong thanh cong", result: error });
    }
};
//deletecongviec
exports.deletecongviec = async (req, res, next) => {
    try {
        let id = req.params.id;
        let result = await congviecModel.findByIdAndDelete(id);
        res.json({ status: "delete thanh cong", result: result });
    } catch (error) {
        res.json({ status: "delete khong thanh cong", result: error });
    }
};
//getcongviecbyid
exports.getcongviec = async (req, res, next) => {
    try {
        let id = req.params.id;
        let result = await congviecModel.findById(id);
        res.json({ status: "ok", result: result });
    } catch (error) {
        res.json({ status: "not found", result: error });
    }
};
