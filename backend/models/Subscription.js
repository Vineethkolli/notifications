const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  endpoint: { type: String, required: true, unique: true },
  keys: {
    auth: { type: String, required: true },
    p256dh: { type: String, required: true },
  },
});

module.exports = mongoose.model("Subscription", subscriptionSchema);
