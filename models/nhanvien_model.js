const db = require("./db");
const nhanvien_Schema = new db.mongoose.Schema(
  {
    hoten: {
      type: String,
    },
    idnhanvien: {
      type: String,
      required: false,
    },

    sdt: {
      type: String,
    },

    diachi: {
      type: String,
    },

    email: {
      type: String,
    },
    ghichu: {
      type: String,
    },
    tentaikhoan: {
      type: String,
      require: true,
    },
    matkhau: {
      type: String,
      require: true,
    },
    loaitaikhoan: {
      type: Number,
      require: true,
    },
  },
  {
    collection: "nhanviens",
  }
);
const nhanvienModel = db.mongoose.model("nhanvienModel", nhanvien_Schema);
module.exports = { nhanvienModel };
