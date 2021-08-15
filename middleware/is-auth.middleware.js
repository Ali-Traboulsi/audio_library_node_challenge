const jwt = require("jsonwebtoken");

const { handleError } = require("../controllers/error.controller");
const { jwtCredentials } = require("../config");

// verify for the existence and validity of the token
module.exports = (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      throw { statusCode: 401, message: "You are not authenticated!" };
    }
    // extract the token from the Authorization header
    const token = req.get("Authorization").split(" ")[1];
    if (!token) {
      throw { statusCode: 401, message: "You are not authenticated!" };
    }

    // decode and verify the token if found
    const decodedToken = jwt.verify(token, jwtCredentials.secretKey);
    if (!decodedToken) {
      throw { statusCode: 401, message: " Not Authenticated!" };
    }

    // store the decoded information inside the req
    req.userId = decodedToken.userId;

    //execute the nex middleware
    next();
  } catch (err) {
    handleError(err, next);
  }
};
