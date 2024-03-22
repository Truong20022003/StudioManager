var express = require("express");
var router = express.Router();
const CVCtl = require("../controllers/congviec_controller");
router.post("/addcongviec", CVCtl.addcongviec);
router.get("/getListcongviec", CVCtl.getListcongviec);
router.put("/updatecongviec/:id", CVCtl.updatecongviec);
router.delete("/deletecongviec/:id", CVCtl.deletecongviec);
router.get("/getcongviecById", CVCtl.getcongviec);


module.exports = router;