// import core dependencies
const path = require("path");

// import 3rd party dependencies
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");

// import relative dependencies
const ErrorController = require("./controllers/error.controller");
const albumRoutes = require("./albums/album.routes");
const trackRoutes = require("./tracks/track.routes");
const categoryRoutes = require("./categories/category.routes");
const authRoutes = require("./users-authentication/auth.routes");
const userRoutes = require("./users-authentication/user.routes");
const { server, mongodb } = require("./config");

// initialize the express object in order to access all methods and props defined by express
const app = express();

// compress using gzip to reduce file sizes before sending them to the browser
// app.use(compression());

// // configure multer
// const fileStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${new Date().toISOString()}-${file.originalname}`);
//   },
// });
//
// const fileFilter = (req, file, cb) => {
//   const mimetypes = [
//     "image/png",
//     "image/jpg",
//     "image/jpeg",
//     "image/svg",
//     "image/gif",
//   ];
//   if (mimetypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

app.use(cors());

// parse the incoming request through a middleware
app.use(bodyParser.json());

// parse incoming x-www-formdata requests
app.use(bodyParser.urlencoded({extended: true}));

// // register the multer middleware
// app.use(
//   multer({
//     storage: fileStorage,
//     fileFilter: fileFilter,
//   }).single("image")
// );

// server images statically for req going to /images
// app.use("/images", express.static(path.join(__dirname, "images")));

// serve the public directory statically by express so it becomes accessible by public users
app.use(express.static(path.join(__dirname, "public")));

// register route middleware to be excuted when a request is to be handled
// app.use('/admin', adminRoutes);

app.use(albumRoutes);
app.use(trackRoutes);
app.use(categoryRoutes);
app.use("/auth", authRoutes);
app.use(userRoutes);

// catch any error in the request
app.use(ErrorController.get404Error);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  res.status(status).send(error);
});

mongoose
  .connect(`mongodb://127.0.0.1:27017/${mongodb.dbName}`)
  .then(() => {
    console.log("Connected!");
    return app.listen(server.port);
  })
  .then((httpServer) => {
    console.log(`listening on port ${server.port}`);
      const io = require('./socket').initIo(httpServer);
      io.on("connection", socket => {
          console.log("Client Connected!")
      })
  })
  .catch((err) => console.log(err));
// create and listen to the server