const db = require("./db");
const nhanvien_Schema = new db.mongoose.Schema(
  {

    hoten: {
      type: String,
      required: true
  },
  
  sdt: {
      type: String,
      required: true
  },
 
  diachi: {
      type: String,
      required: true
  },

  email: {
      type: String,
      required: true
  },
  ghichu: {
      type: String,
      required: true

  },

  },
  {
    collection: "nhanviens",
  }
);
const nhanvienModel = db.mongoose.model("nhanvienModel", nhanvien_Schema);
module.exports = { nhanvienModel };
