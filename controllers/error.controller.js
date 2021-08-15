exports.get404Error = (req, res, next) => {
    res.send('Page Not Found!').status(404);
}

exports.handleError = (err, next) => {
    // const error = new Error(err);
    if (!err.statusCode) {
        err.statusCode = 500;
    }
    return next(err); // to execute the error middleware
}
