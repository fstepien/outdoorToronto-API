const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Location = require("../models/location");

// will handle get requests, first arg is url
router.get("/", (req, res, next) => {
  Location.find()
    .select("name content _id")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        locations: docs.map(doc => {
          return {
            name: doc.name,
            content: doc.content,
            _id: doc._id,
            request: {
              type: "GET",
              url: `http://localhost:3000/locations/${doc._id}`
            }
          };
        })
      };
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.post("/", (req, res, next) => {
  const location = new Location({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    content: req.body.content
  });
  location
    .save()
    .then(result => {
      res.status(201).json({
        message: "Created location succesfully",
        createdLocation: {
          name: result.name,
          content: result.content,
          request: {
            type: "GET",
            url: `http://localhost:3000/locations/${result._id}`
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.get("/:locationId", (req, res, next) => {
  const id = req.params.locationId;
  Location.findById(id)
    .select("name content _id")
    .exec()
    .then(doc => {
      const response = {
        location: doc,
        requestAll: {
          type: "GET",
          url: `http://localhost:3000/locations/`
        }
      };
      // sent response here because async
      if (doc) {
        res.status(200).json({
          response
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:locationId", (req, res, next) => {
  const id = req.params.locationId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Location.update(
    { _id: id },
    {
      $set: updateOps
    }
  )
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: "Product Updated",
        request: {
          type: "GET",
          url: " http://localhost:3000/locations/" + id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});
router.delete("/:locationId", (req, res, next) => {
  const id = req.params.locationId;
  Location.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Location deleted",
        request: {
          type: "POST",
          url: "localhost:3000/locations",
          data: { name: "String", conent: "Number" }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
