const mongoose = require("mongoose");

const EmotionRecordedSchema = new mongoose.Schema({
  videoId: {
    type: String,
    required: true,
  },
  emotion: {
    type: String,
    enum: [
      "neutral",
      "happy",
      "sad",
      "angry",
      "fearful",
      "disgusted",
      "surprised",
    ],
    required: true,
  },
  videoTimestamp: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Emotion", EmotionRecordedSchema);
