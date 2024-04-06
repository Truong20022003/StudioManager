const db = require("./db");
const dichvu_Schema = new db.mongoose.Schema(
  {
    ten: {
      type: String,
      required: true,
    },

    gia: {
      type: Number,
      required: true,
    },
    trangthai: {
      type: Boolean,
      required: true,
    },

    mota: {
      type: String,
      required: true,
    },
    anh: {
      type: Array,
      // required: true,
    },
  },
  {
    collection: "dichvus",
    timestamps: true,
  }
);
const dichvuModel = db.mongoose.model("dichvuModel", dichvu_Schema);
module.exports = { dichvuModel };
