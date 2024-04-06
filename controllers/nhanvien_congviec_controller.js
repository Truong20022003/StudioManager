const {nhanvien_congviec_model} = require('../models/nhanvien_congviec_models')


exports.addnhanvien_congviec = async (req, res, next) => {
    try {
        let obj = new nhanvien_congviec_model({
            id_nhanvien: req.body.id_nhanvien,
            id_congviec: req.body.id_congviec,
        })
        let result = await obj.save();
        res.json({status: 'add thành công', result: result})
    } catch (error) {
        res.json({status: 'add không thành công',result: error})
        console.log(error)
    }
}

exports.getListByIdNhanVien = async (req, res, next) => {
    try {
        let id_nhanvien = req.params.id_nhanvien; // Lấy id nhân viên từ request params

        // Tìm danh sách giao việc có idhoadon trùng với idHoadon
        let list = await nhanvien_congviec_model.find({ id_nhanvien: id_nhanvien });

        if (list.length > 0) {
            res.json({ status: "ok", result: list });
        } else {
            res.json({ status: "not found", result: "Không tìm thấy giao việc cho nhân viên có ID này" });
        }
    } catch (error) {
        res.json({ status: "error", result: error });
    }
  
};

exports.getListByIdCongViec = async (req, res, next) => {
    try {
        let id_congviec = req.params.id_congviec; // Lấy id nhân viên từ request params

        // Tìm danh sách giao việc có idhoadon trùng với idHoadon
        let list = await nhanvien_congviec_model.find({ id_congviec: id_congviec });

        if (list.length > 0) {
            res.json({ status: "ok", result: list });
        } else {
            res.json({ status: "not found", result: "Không tìm thấy giao việc cho nhân viên có ID này" });
        }
    } catch (error) {
        res.json({ status: "error", result: error });
    }
};

