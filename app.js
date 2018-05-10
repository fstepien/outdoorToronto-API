const express = require("express");

const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const locationRoutes = require("./api/routes/locations");
const attractionRoutes = require("./api/routes/attractions");

mongoose.connect(
  "mongodb+srv://filip:" +
    process.env.MONGO_ATLAS_PW +
    "@otoapi-7lw9k.mongodb.net/test"
);
mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//THIS ELIMINATES CORS ERRORS - Security mechanizm for the browser.
// you can restrict star and https:oto.filipstepien.com instead look at vid 5
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  // browser always sends an options request
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// this forwars all url/locations to locations.js to handle requests
app.use("/locations", locationRoutes);
app.use("/attractions", attractionRoutes);
// handles every requrest that reaches this line
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
// database failure will throw an error so will skip the above middleware, instead we will use the following to catch their error
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
