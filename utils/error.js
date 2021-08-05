module.exports = (status, message) => {
  const error = {
    statusCode: status,
    message: message,
  };
  return error;
};


