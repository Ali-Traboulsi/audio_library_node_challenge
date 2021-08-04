// import core dependencies
const path = require("path");

// import 3rd party dependencies
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");

// import relative dependencies
const ErrorController = require("./controllers/error");
const { DB_NAME, PORT } = require("./config/constants");
// const adminRoutes = require('./routes/admin');
const albumRoutes = require("./routes/album");
const trackRoutes = require("./routes/track");
const categoryRoutes = require("./routes/category");
const authRoutes = require("./routes/auth");
const testRoutes = require("./routes/test");

// initialize the express object in order to access all methods and props defined by express
const app = express();

// configure multer
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().toISOString()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const mimetypes = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/svg",
    "image/gif",
  ];
  if (mimetypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(cors());
// parse the incoming request through a middleware
app.use(bodyParser.json());

// register the multer middleware
app.use(
  multer({
    storage: fileStorage,
    fileFilter: fileFilter,
  }).single("image")
);

// server images statically for req going to /images
app.use("/images", express.static(path.join(__dirname, "images")));

// serve the public directory statically by express so it becomes accessible by public users
// app.use(express.static(path.join(__dirname, 'public')));

// register route middleware to be excuted when a request is to be handled
// app.use('/admin', adminRoutes);

app.use(albumRoutes);
app.use(trackRoutes);
app.use(categoryRoutes);
app.use('/auth', authRoutes);
app.use(testRoutes);

// catch any error in the request
app.use(ErrorController.get404Error);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  res.status(status).send(error);
});

// create and listen to the server
mongoose
  .connect(
    `mongodb+srv://ali2:123456789ali@node-cluster.jyvoo.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connected!");
    app.listen(PORT);
  })
  .then((result) => {
    console.log(`listening on port ${PORT}`);
  })
  .catch((err) => console.log(err));
