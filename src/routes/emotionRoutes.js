const express = require("express");
const Emotion = require("../models/emotion");
const router = express.Router();

// Create a new emotion record
router.post("/", async (req, res) => {
  try {
    const { videoId, emotion, videoTimestamp } = req.body;
    const emotionRecord = new Emotion({ videoId, emotion, videoTimestamp });
    await emotionRecord.save();
    res.status(201).json(emotionRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all emotion records
router.get("/", async (req, res) => {
  try {
    const emotions = await Emotion.find();
    res.json(emotions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get an emotion record by ID
router.get("/:id", getEmotion, (req, res) => {
  res.json(res.emotionRecord);
});

// Update an emotion record by ID
router.patch("/:id", getEmotion, async (req, res) => {
  if (req.body.videoId != null) {
    res.emotionRecord.videoId = req.body.videoId;
  }
  if (req.body.emotion != null) {
    res.emotionRecord.emotion = req.body.emotion;
  }
  if (req.body.videoTimestamp != null) {
    res.emotionRecord.videoTimestamp = req.body.videoTimestamp;
  }
  try {
    const updatedEmotionRecord = await res.emotionRecord.save();
    res.json(updatedEmotionRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an emotion record by ID
router.delete("/:id", getEmotion, async (req, res) => {
  try {
    await res.emotionRecord.remove();
    res.json({ message: "Emotion record deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to retrieve a specific emotion record by ID
async function getEmotion(req, res, next) {
  let emotionRecord;
  try {
    emotionRecord = await Emotion.findById(req.params.id);
    if (emotionRecord == null) {
      return res.status(404).json({ message: "Emotion record not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.emotionRecord = emotionRecord;
  next();
}

module.exports = router;
