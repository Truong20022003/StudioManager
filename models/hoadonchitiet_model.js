const db = require("./db");
const hoadonchitiet_Schema = new db.mongoose.Schema(
  {

    idhoadon: {
        type: String,
        required: true
    },
    
    thanhtien: {
        type: Number,
        required: true
    },
    iddichvu: {
      type: String,
      required: true
  },
  },
  {
    collection: "hoadonchitiets",
  }
);
const hoadonchitietModel = db.mongoose.model("hoadonchitietModel", hoadonchitiet_Schema);
module.exports = { hoadonchitietModel };
