const Vehicle = require("../models/Vehicle");

const getVehicle = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ Vehicle });
    const vehicleTypes = await Vehicle.distinct("type");
    res.json({
      vehicles,
      vehicleTypes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getVehicleDetails = async (req, res) => {
  try {
    const vehicles = await Vehicle.findById(req.params.id);
    res.json({
      vehicles,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updateVehicle = async (req, res) => {
  Vehicle.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedVehicle) => {
      if (err) {
        res.status(500).send({ error: err });
      } else {
        res.json({
          success: true,
          message: "Update Vehicle Success!",
          vehicle: updatedVehicle,
        });
      }
    }
  );
};

const createVehicle = async (req, res) => {
  const newVehicle = new Vehicle(req.body);

  newVehicle.save((err, savedVehicle) => {
    if (err) {
      res.status(500).send({ error: err });
    } else {
      res.json({
        success: true,
        message: "Add Vehicle Success!",
        vehicle: newVehicle,
      });
    }
  });
};

const searchVehicle = async (req, res) => {
  const model = req.query.model;
  try {
    const vehicles = await Vehicle.find({
      model: { $regex: new RegExp(model, "i") },
    });
    res.json(vehicles);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const deleteVehicle = async (req, res) => {
  Vehicle.findByIdAndRemove(req.params.id, (err, deletedVehicle) => {
    if (err) {
      res.status(500).send({ error: err });
    } else {
      res.json({
        success: true,
        message: "Delete Successfully",
        deletedVehicle,
      });
    }
  });
};
module.exports = {
  getVehicle,
  updateVehicle,
  createVehicle,
  deleteVehicle,
  getVehicleDetails,
  searchVehicle,
};
