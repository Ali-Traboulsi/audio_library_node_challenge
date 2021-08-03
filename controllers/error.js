exports.get404Error = (req, res, next) => {
    res.send('Page Not Found!').status(404);
}

exports.handle500Error = (err, next) => {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error); // to execute the error middleware
}
