const { nhanvienModel } = require("../models/nhanvien_model");
//cách 2: viết lại addnhanvien
exports.addnhanvien = async (req, res, next) => {
    try {
        //console.log(req.body);
        let obj = new nhanvienModel({
            hoten: req.body.hoten,
            sdt: req.body.sdt,
            diachi: req.body.diachi,
            email: req.body.email,
            ghichu: req.body.ghichu,
           
        });
        let result = await obj.save();
        res.json({ status: "add thanh cong", result: result });
    } catch (error) {
        res.json({ status: "add khong thanh cong", result: error });
    }
};
//getlistnhanvien
exports.getListnhanvien = async (req, res, next) => {
    try {
        let listnhanvien = await nhanvienModel.find({});
        res.json(listnhanvien);
    } catch (error) {
        res.json({ status: "not found", result: error });
    }
};
//editnhanvien
exports.updatenhanvien = async (req, res, next) => {
    try {
        let id = req.params.id;
        let obj = {};
        obj.hoten= req.body.hoten;
            obj.sdt= req.body.sdt;
            obj.diachi= req.body.diachi;
            obj.email= req.body.email;
            obj.ghichu= req.body.ghichu;
       
        let result = await nhanvienModel.findByIdAndUpdate(id, obj, { new: true });
        res.json({ status: "update thanh cong", result: result });
    } catch (error) {
        res.json({ status: "update khong thanh cong", result: error });
    }
};
//deletenhanvien
exports.deletenhanvien = async (req, res, next) => {
    try {
        let id = req.params.id;
        let result = await nhanvienModel.findByIdAndDelete(id);
        res.json({ status: "delete thanh cong", result: result });
    } catch (error) {
        res.json({ status: "delete khong thanh cong", result: error });
    }
};
//getnhanvienbyid
exports.getnhanvien = async (req, res, next) => {
    try {
        let id = req.params.id;
        let result = await nhanvienModel.findById(id);
        res.json({ status: "ok", result: result });
    } catch (error) {
        res.json({ status: "not found", result: error });
    }
};
