module.exports = (data = undefined, message = undefined) => {
    return {
        serverDate: new Date(),
        result: data,
        message: message,
    }

}