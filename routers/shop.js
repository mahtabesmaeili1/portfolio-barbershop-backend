const { Router } = require("express");
const User = require("../models/").user;
const Service = require("../models/").service;
const Appointments = require("../models/").appointment;
const router = new Router();
const authMiddleware = require("../auth/middleware");

//get all of the artworks
//http :4000/shop/
router.get("/", async (request, response, next) => {
  try {
    const services = await Service.findAll();
    response.send(services);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

//get all the appointments if you are loged in

//   http :4000/shop/appointments Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3MTc5NTA5OSwiZXhwIjoxNjcxODAyMjk5fQ.S_fkPs8LfJE9IOMbefvtCwTkHiD1WFTrZqo0ulaRZmo"
router.get("/appointments", authMiddleware, async (request, response, next) => {
  try {
    const appointment = await Appointments.findAll({
      include: [{ model: User }, { model: Service }],
    });
    response.send(appointment);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

//toggle paid and done for the appointments from employee side
//http put :4000/shop/appointments/1 Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzExMTI0NzcsImV4cCI6MTY3MTEyNjg3N30.FI5bQ7rtGTqdwHtH70sKJgRPMLEFSyP6N3bugCU6y9I" done=false

router.put("/appointments/:id", authMiddleware, async (req, res, next) => {
  try {
    const id = req.params.id;
    const appointment = await Appointments.findByPk(id);
    const { paid, done } = req.body;
    console.log(req.body);
    const togglePaid = await appointment.update({ paid, done });

    return res.status(200).send(togglePaid);
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});
//http :4000/auth/login email=parhamesmaeili@gmail.com password=parham
//make appointment
//http POST :4000/shop/makeappointment Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImlhdCI6MTY3MTIyNTEyOCwiZXhwIjoxNjcxMjMyMzI4fQ.ovIG8Td_iKcwwbZV42KiPIryNwlp3AoWHKY0Naknvg0" date=2017-09-01 time="12:12" serviceId=3
router.post("/makeappointment", authMiddleware, async (req, res, next) => {
  try {
    // console.log(req, "useeeer");
    const { id } = req.user;

    const { date, time, serviceId } = req.body;
    const newAppointment = await Appointments.create({
      date,
      time,
      userId: id,
      serviceId,
    });
    return res.status(201).send({
      message: " appointment made",
      newAppointment,
    });
  } catch (e) {
    console.log(e);
    next();
  }
});
//http DELETE :4000/shop/cancelation/6 Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImlhdCI6MTY3MTg4NTE5MywiZXhwIjoxNjcxODkyMzkzfQ.BLvy8us3Wr_p9HfN1-SRnyKYLLnJ2t8n-fRZ1r10yFw"

//to remove an appointment
router.delete("/cancelation/:id", authMiddleware, async (req, res, next) => {
  const id = req.params.id;
  try {
    const { isEmployee } = req.user;

    if (!isEmployee) {
      return res.status(400);
    }
    const appointment = await Appointments.findByPk(id);

    if (appointment.userId !== req.user.id) {
      return res
        .status(401)
        .send("You're not authorized to cancell this appointment");
    }

    await appointment.destroy();

    res.status(200).send({ message: "succesfully cancelled", id });
  } catch (e) {
    next(e.message);
  }
});

module.exports = router;
