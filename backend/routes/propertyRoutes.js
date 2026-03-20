const express = require("express");
const multer = require("multer");
const Property = require("../models/Property");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

router.post("/", upload.array("images"), async (req, res) => {
  try {
    const images = req.files.map(file => file.filename);

    const property = await Property.create({
      title: req.body.title,
      address: req.body.address,
      price: Number(req.body.price),
      agentEmail: req.body.agentEmail,
      agentPhone: req.body.agentPhone,
      images
    });

    res.status(201).json({
      msg: "Property added successfully",
      property
    });

  } catch (err) {
    res.status(500).json({ msg: "Failed to add property" });
  }
});

router.get("/", async (req, res) => {
  const properties = await Property.find().sort({ createdAt: -1 });
  res.json(properties);
});

router.delete("/", async (req, res) => {
  await Property.findByIdAndDelete(req.params.id);
  res.json({ msg: "Property deleted" });
});


module.exports = router;

