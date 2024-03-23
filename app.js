var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var khachhangRouter = require("./routes/khachhang_router");
var hoadonchitietRouter = require("./routes/hoadonchitiet_router");
var hoadonRouter = require("./routes/hoadon_router");
var dichvuRouter = require("./routes/dichvu_router");
var nhanvienRouter = require("./routes/nhanvien_router");
var thongkeRoter = require("./routes/thongke-router");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/khachhang", khachhangRouter);
app.use("/hoadonchitiet", hoadonchitietRouter);
app.use("/hoadon", hoadonRouter);
app.use("/dichvu", dichvuRouter);
app.use("/nhanvien", nhanvienRouter);
app.use("/thongke", thongkeRoter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
