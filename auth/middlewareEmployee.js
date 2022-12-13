const Employee = require("../models").employee;
const { toData } = require("./jwt");

async function auth(req, res, next) {
  const auth =
    req.headers.authorization && req.headers.authorization.split(" ");

  if (!auth || !(auth[0] === "Bearer") || !auth[1]) {
    return res.status(401).send({
      message:
        "This endpoint requires an Authorization header with a valid token",
    });
  }

  try {
    const data = toData(auth[1]);
    const employee = await Employee.findByPk(data.employeeId);
    if (!employee) {
      return res.status(404).send({ message: "employee does not exist" });
    }

    // add user object to request
    req.employee = employee;
    // next handler
    return next();
  } catch (error) {
    console.log("ERROR IN AUTH MIDDLEWARE", error);

    switch (error.fullName) {
      case "TokenExpiredError":
        return res
          .status(401)
          .send({ error: error.fullName, message: error.message });

      case "JsonWebTokenError":
        return res
          .status(400)
          .send({ error: error.fullName, message: error.message });

      default:
        return res.status(400).send({
          message: "Something went wrong, sorry",
        });
    }
  }
}

module.exports = auth;
