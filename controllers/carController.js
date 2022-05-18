const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Car = require("../models/carModel");

// GET user cars /api/cars
const getCars = asyncHandler(async (req, res) => {
  // get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  console.log(req.user.id);

  const cars = await Car.find({ user: req.user.id });

  res.status(200).json(cars);
});

// POST create new user car /api/cars
const createCar = asyncHandler(async (req, res) => {
  const { model, paint, maxPower, maxSpeed, mileage, inService } = req.body;
  if (!model || !paint) {
    res.status(400);
    throw new Error("Please provide car details");
  }

  // get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const car = await Car.create({
    model,
    paint,
    maxPower,
    maxSpeed,
    mileage,
    inService,
    user: req.user.id,
  });

  res.status(201).json(car);
});

// GET a car's info
const getCar = asyncHandler(async (req, res) => {
  // get the user with id from jwt
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const car = await Car.findById(req.params.id);

  if (!car) {
    res.status(404);
    throw new Error("Car not found");
  }

  if (car.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  res.status(200).json(car);
});

// DELETE a car
const deleteCar = asyncHandler(async (req, res) => {
  // get the user with id from jwt
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const car = await Car.findById(req.params.id);

  if (!car) {
    res.status(404);
    throw new Error("Car not found");
  }

  if (car.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  await car.remove();

  res.status(200).json({ success: true });
});

// PUT an update on a car's info
const updateCar = asyncHandler(async (req, res) => {
  // get the user with id from jwt
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const car = await Car.findById(req.params.id);

  if (!car) {
    res.status(404);
    throw new Error("Car not found");
  }

  if (car.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body);

  res.status(200).json(updatedCar);
});

module.exports = {
  getCars,
  createCar,
  getCar,
  deleteCar,
  updateCar,
};
