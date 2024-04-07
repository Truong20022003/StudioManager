const db = require("./db");
const congviec_Schema = new db.mongoose.Schema(
  {

    tencongviec: {
        type: String,
        required: true
    },
    

    
    ngaybatdau: {
        type: String,
        required: true
    },
    
    ngayketthuc: {
        type: String,
        required: true
    },
    trangthai: {
        type: Boolean
    },
    mota: {
        type: String,
        required: true
    },

  },
  {
    collection: "congviecs",
  }
);
const congviecModel = db.mongoose.model("congviecModel", congviec_Schema);
module.exports = { congviecModel };


