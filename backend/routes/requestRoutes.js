const express = require("express");
const Request = require("../models/Request");

const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
});

router.post("/create", async (req, res) => {
  try {
    const request = await Request.create(req.body);

    res.status(201).json({
      message: "Request submitted successfully",
      request
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
});
router.put("/update-status/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const updatedRequest = await Request.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({
        message: "Request not found"
      });
    }

    res.status(200).json({
      message: "Status updated successfully",
      request: updatedRequest
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
});
router.get("/user/:email", async (req, res) => {
  try {
    const requests = await Request.find({
      email: req.params.email
    }).sort({ createdAt: -1 });

    res.status(200).json(requests);

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
});
module.exports = router;