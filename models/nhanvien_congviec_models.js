const db = require("./db");
const nhanvien_congviec_Schema = new db.mongoose.Schema(
  {
    id_nhanvien: {
      type: String,
      required: true,
    },

    id_congviec: {
      type: String,
      required: true,
    },
   
  },
  {
    collection: "nhanviencongviecs",
  }
);
const nhanvien_congviec_model = db.mongoose.model("nhanvien_congviec_model", nhanvien_congviec_Schema);
module.exports = { nhanvien_congviec_model };
