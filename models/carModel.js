const mongoose = require("mongoose");

const carSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    model: {
      type: String,
      required: [true, "Please select the car's model"],
      enum: [
        "765LT Spider",
        "720S Spider",
        "Artura",
        "600LT Spider",
        "570S Spider",
        "675LT Spider",
        "650S Spider",
        "12C Spider",
        "P1",
        "F1",
      ],
    },
    paint: {
      type: String,
      required: [true, "Please enter the color code"],
    },
    maxPower: {
      type: Number,
      default: 100,
    },
    maxSpeed: {
      type: Number,
      default: 100,
    },
    mileage: {
      type: Number,
      default: 100,
    },
    inService: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Car", carSchema);
