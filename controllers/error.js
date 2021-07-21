exports.get404Error = (req, res, next) => {
    res.status(404).json({
        message: "Page Not found",
        pageTitle: "Page Not Found",
        path: ""
    })
}
