const express = require("express")
const router = express.Router()
const {getCars, createCar, getCar, deleteCar, updateCar} = require('../controllers/carController')

const {protect} = require('../middleware/authMiddleware')

router.route('/')
.get(protect, getCars)
.post(protect, createCar)

router.route("/:id")
.get(protect, getCar)
.delete(protect, deleteCar)
.put(protect, updateCar)

module.exports = router