const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Attraction = require("../models/attraction");

router.get("/", (req, res, next) => {
  Attraction.find()
    .select("location nameAttr _id")
    .exec()
    .then(docs =>
      res.status(200).json({
        count: docs.length,
        attractions: docs.map(doc => {
          return {
            _id: doc._id,
            location: doc.location,
            nameAttr: doc.nameAttr,
            request: {
              type: "GET",
              url: "http://localhost:3000/" + doc._id
            }
          };
        })
      })
    )
    .catch(err => {
      res.status(500).json({ error: err });
    });
});
router.post("/", (req, res, next) => {
  const attraction = new Attraction({
    _id: mongoose.Types.ObjectId(),
    nameAttr: req.body.nameAttr,
    location: req.body.locationId
  });
  attraction
    .save()
    .then(result => {
      console.log(result);
      res.status(200).json({
        count: docs.length,
        attractions: docs.map(doc => {
          return {
            _id: result._id,
            location: result.location,
            nameAttr: result.nameAttr,
            request: {
              type: "GET",
              url: "http://localhost:3000/" + result._id
            }
          };
        })
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});
router.get("/:attractionId", (req, res, next) => {
  res.status(200).json({
    message: "attraction detail",
    attractionId: req.params.attractionId,
    attraction: attraction
  });
});
router.delete("/:attractionId", (req, res, next) => {
  res.status(200).json({
    message: "attraction DELETED!!!",
    attractionId: req.params.attractionId
  });
});

module.exports = router;
