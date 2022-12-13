const bcrypt = require("bcrypt");
const { Router } = require("express");
const { toJWT } = require("../auth/jwt");
const authMiddleware = require("../auth/middleware");
const Employee = require("../models/").employee;
const Customer = require("../models/").customer;
const { SALT_ROUNDS } = require("../config/constants");

const router = new Router();

//login for employee
//http :4000/auth/login email=parhamesmaeili@gmail.com password=parham

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Please provide both email and password" });
    }

    const employee = await Employee.findOne({ where: { email } });

    if (!employee || !bcrypt.compareSync(password, employee.password)) {
      return res.status(400).send({
        message: "employee with that email not found or password incorrect",
      });
    }

    delete employee.dataValues["password"]; // don't send back the password hash
    const token = toJWT({ employeeId: Employee.id });
    return res.status(200).send({ token, employee: Employee.dataValues });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

// login for customers
//http :4000/auth/login/customer email=bahareh@gmail.com password=bahare
router.post("/login/customer", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Please provide both email and password" });
    }

    const customer = await Customer.findOne({ where: { email } });

    if (!customer || !bcrypt.compareSync(password, customer.password)) {
      return res.status(400).send({
        message: "customer with that email not found or password incorrect",
      });
    }

    delete customer.dataValues["password"]; // don't send back the password hash
    const token = toJWT({ customerId: Customer.id });
    return res.status(200).send({ token, customer: Customer.dataValues });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

//signup as employee
//http :4000/auth/signup email=nm@m1 password=1238456 fullName=rmmm phoneNumber=91118
router.post("/signup", async (req, res) => {
  const { email, password, fullName, phoneNumber } = req.body;
  if (!email || !password || !fullName || !phoneNumber) {
    return res
      .status(400)
      .send("Please provide an email, password and a name ");
  }
  try {
    const newEmployee = await Employee.create({
      email,
      password: bcrypt.hashSync(password, SALT_ROUNDS),
      fullName,
      phoneNumber,
    });
    delete newEmployee.dataValues["password"]; // don't send back the password hash
    const token = toJWT({ employeeId: newEmployee.id });
    res.status(201).json({ token, employee: newEmployee.dataValues });
  } catch (error) {
    if (error.fullName === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .send({ message: "There is an existing account with this email" });
    }
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

//signup as customer
// http :4000/auth/signup/customer email=nm@m1 password=1238456 fullName=rmmm phoneNumber=91118
router.post("/signup/customer", async (req, res) => {
  const { email, password, fullName, phoneNumber } = req.body;
  if (!email || !password || !fullName || !phoneNumber) {
    return res.status(400).send("Please provide an email, password and a name");
  }

  try {
    const newCustomer = await Customer.create({
      email,
      password: bcrypt.hashSync(password, SALT_ROUNDS),
      fullName,
      phoneNumber,
    });

    delete newCustomer.dataValues["password"]; // don't send back the password hash

    const token = toJWT({ customerId: newCustomer.id });

    res.status(201).json({ token, customer: newCustomer.dataValues });
  } catch (error) {
    if (error.fullName === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .send({ message: "There is an existing account with this email" });
    }

    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

// The /me endpoint can be used to:
// - get the users email & name using only their token
// - checking if a token is (still) valid
router.get("/me", authMiddleware, async (req, res) => {
  // don't send back the password hash
  delete req.employee.dataValues["password"];
  res.status(200).send({ ...req.employee.dataValues });
});

//for customer

router.get("/me/customer", authMiddleware, async (req, res) => {
  // don't send back the password hash
  delete req.customer.dataValues["password"];
  res.status(200).send({ ...req.customer.dataValues });
});

module.exports = router;
