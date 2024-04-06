const db = require("./db");
const hoadon_Schema = new db.mongoose.Schema(
  {
    idkhachhang: {
      type: String,
      required: true,
    },

    ngaydathang: {
      type: String,
      required: true,
    },
    tongtien: {
      type: Number,
      required: true,
    },

    trangthai: {
      type: Boolean,
      required: true,
    },
    ngaytrahang: {
      type: String,
      required: true,
    },
  },
  {
    collection: "hoadons",
    timestamps: true,
  }
);
const hoadonModel = db.mongoose.model("hoadonModel", hoadon_Schema);
module.exports = { hoadonModel };
