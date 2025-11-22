const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


// ✅ MongoDB connection (already done in your code probably)
mongoose.connect("mongodb://localhost:27017/weatherDB");

// ✅ Schema
const weatherSchema = new mongoose.Schema({
  city: String,
  temperature: Number,
  humidity: Number,
  windSpeed: Number,
  condition: String,
});

const Weather = mongoose.model("Weather", weatherSchema);

// ✅ Existing POST route (already in your code)
app.post("/api/weather", async (req, res) => {
  const weatherData = new Weather(req.body);
  await weatherData.save();
  res.send("Weather data saved");
});

// ✅ 🔥 NEW GET route for showing weather history
app.get("/api/weather", async (req, res) => {
  try {
    const history = await Weather.find().sort({ _id: -1 }).limit(50); // optional: limit results
    res.json(history);
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).send("Server error");
  }
});
console.log("hellooo")
// Start the server
app.listen(3000, () => {
  console.log(`Server running at http://localhost:3000`);
});

  