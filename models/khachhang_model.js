const db = require("./db");
const khachhang_Schema = new db.mongoose.Schema(
  {
    idnhanvien: {
      type: String,
      required: false,
    },
    anh: {
      type: String,
      required: false,
    },

    hoten: {
      type: String,
      required: true,
    },
    sdt: {
      type: String,
      required: true,
    },

    diachi: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },
    dsdichvu: {
      type: Array,
    },
  },
  {
    collection: "khachhangs",
  }
);
const khachhangModel = db.mongoose.model("khachhangModel", khachhang_Schema);
module.exports = { khachhangModel };
