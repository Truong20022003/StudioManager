const { hoadonModel } = require("../models/hoadon_model");

exports.addhoadon = async (req, res, next) => {
    try {
        //console.log(req.body);
        let obj = new hoadonModel({
            idkhachhang: req.body.idkhachhang,
            ngaydathang: req.body.ngaydathang,
            tongtien: req.body.tongtien,
            trangthai: req.body.trangthai,
            ngaytrahang: req.body.ngaytrahang,
            
        });
        let result = await obj.save();
        res.json({ status: "add thanh cong", result: result });
    } catch (error) {
        res.json({ status: "add khong thanh cong", result: error });
    }
};
//getlisthoadon
exports.getListhoadon = async (req, res, next) => {
    try {
        let listhoadon = await hoadonModel.find({});
        res.json(listhoadon);
    } catch (error) {
        res.json({ status: "not found", result: error });
    }
};
//edithoadon
exports.updatehoadon = async (req, res, next) => {
    try {
        let id = req.params.id;
        let obj = {};
        obj.idkhachhang= req.body.idkhachhang;
            obj.ngaydathang= req.body.ngaydathang;
            obj.tongtien= req.body.tongtien;
            obj.trangthai= req.body.trangthai;
            obj.ngaytrahang= req.body.ngaytrahang;
       
        let result = await hoadonModel.findByIdAndUpdate(id, obj, { new: true });
        res.json({ status: "update thanh cong", result: result });
    } catch (error) {
        res.json({ status: "update khong thanh cong", result: error });
    }
};
//deletehoadon
exports.deletehoadon = async (req, res, next) => {
    try {
        let id = req.params.id;
        let result = await hoadonModel.findByIdAndDelete(id);
        res.json({ status: "delete thanh cong", result: result });
    } catch (error) {
        res.json({ status: "delete khong thanh cong", result: error });
    }
};
//gethoadonbyid
exports.gethoadon = async (req, res, next) => {
    try {
        let id = req.params.id;
        let result = await hoadonModel.findById(id);
        res.json({ status: "ok", result: result });
    } catch (error) {
        res.json({ status: "not found", result: error });
    }
};
