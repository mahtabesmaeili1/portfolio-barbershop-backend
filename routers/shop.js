const { Router } = require("express");

const Service = require("../models/").service;

const router = new Router();

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

module.exports = router;
