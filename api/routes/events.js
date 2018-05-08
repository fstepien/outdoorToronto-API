const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "events were fetched"
  });
});
router.post("/", (req, res, next) => {
  const event = {
    productId: req.body.locationId,
    data: req.body.date
  };
  res.status(201).json({
    message: "Event was created"
  });
});
router.get("/:eventId", (req, res, next) => {
  res.status(200).json({
    message: "Event detail",
    eventId: req.params.eventId,
    event: event
  });
});
router.delete("/:eventId", (req, res, next) => {
  res.status(200).json({
    message: "Event DELETED!!!",
    eventId: req.params.eventId
  });
});

module.exports = router;
