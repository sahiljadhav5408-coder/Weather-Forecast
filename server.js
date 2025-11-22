const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/weatherDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define schema
const weatherSchema = new mongoose.Schema({
  city: String,
  temperature: Number,
  humidity: Number,
  windSpeed: Number,
  condition: String,
  timestamp: { type: Date, default: Date.now },
});

const Weather = mongoose.model("Weather", weatherSchema);

// POST endpoint to save weather data
app.post("/api/weather", async (req, res) => {
  try {
    const weather = new Weather(req.body);
    await weather.save();
    res.status(200).send("Weather data saved!");
  } catch (err) {
    res.status(500).send("Error saving data");
  }
});

// Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
