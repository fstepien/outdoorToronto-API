const express = require("express");
const router = express.Router();
// will handle get requests, first arg is url
router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling GET requsts to /locations"
  });
});

router.post("/", (req, res, next) => {
  const location = {
    coords: req.body.coords,
    iconImage: req.body.iconImage,
    content: req.body.content
  };
  res.status(201).json({
    message: "Handling POST requsts to /locations",
    createdLocation: location
  });
});

router.get("/:locationId", (req, res, next) => {
  const id = req.params.locationId;
  if (id === "special") {
    res.status(200).json({
      mesage: "you discovered special ID",
      id: id
    });
  } else {
    res.status(200).json({
      message: "you passed an ID"
    });
  }
});

router.patch("/:locationId", (req, res, next) => {
  res.status(200).json({
    message: "Updated Location!!!"
  });
});
router.delete("/:locationId", (req, res, next) => {
  res.status(200).json({
    message: "Deleted Location!!!"
  });
});

module.exports = router;
