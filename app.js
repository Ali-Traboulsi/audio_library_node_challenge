// import core dependencies
const path = require('path');

// import 3rd party dependencies
const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// import relative dependencies
const ErrorController = require('./controllers/error');
const {DB_NAME, PORT} = require('./config/constants');
// const adminRoutes = require('./routes/admin');
const albumRoutes = require('./routes/album')
const trackRoutes = require('./routes/track')
const categoryRoutes = require('./routes/category')

// initialize the express object in order to access all methods and props defined by express
const app = express();

app.use(cors());
// parse the incoming request through a middleware
app.use(bodyParser.urlencoded({extended: false}));

// serve the public directory statically by express so it becomes accessible by public users
// app.use(express.static(path.join(__dirname, 'public')));

// register route middleware to be excuted when a request is to be handled
// app.use('/admin', adminRoutes);

app.use(albumRoutes);
app.use(trackRoutes)
app.use(categoryRoutes);

// catch any error in the request
app.use(ErrorController.get404Error);

app.use((error, req, res, next) => {
    if (error) {
        res.send(error).status(500);
    }
})

// create and listen to the server
mongoose
    .connect(`mongodb+srv://ali2:123456789ali@node-cluster.jyvoo.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`)
    .then(() => {
        console.log("Connected!");
        app.listen(PORT)
    })
    .then(result => {
        console.log(`listening on port ${PORT}`)
    })
    .catch(err => console.log(err));


