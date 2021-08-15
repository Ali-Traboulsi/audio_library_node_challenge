const fs = require("fs");
const path = require("path");

exports.deleteFile = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlinkSync(filePath, (err) => {
    if (err) {
      throw new Error(err);
    }
  });
};
