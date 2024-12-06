const express = require("express");
const mongoose = require("mongoose");
const webPush = require("web-push");
const bodyParser = require("body-parser");
const cors = require("cors");
const Subscription = require("./models/Subscription");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

// Set VAPID keys
webPush.setVapidDetails(
  "mailto:example@domain.com",
  publicVapidKey,
  privateVapidKey
);

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Subscribe Route
app.post("/subscribe", async (req, res) => {
  const subscription = req.body;

  try {
    // Save subscription in DB
    const newSubscription = new Subscription(subscription);
    await newSubscription.save();
    res.status(201).json({ message: "Subscription saved successfully." });
  } catch (error) {
    if (error.code === 11000) {
      res.status(200).json({ message: "Subscription already exists." });
    } else {
      res.status(500).json({ error: "Failed to save subscription." });
    }
  }
});

// Send Notification
app.post("/notify", async (req, res) => {
  const payload = JSON.stringify({
    title: "Device Notification",
    body: "You have a new notification!",
  });

  try {
    const subscriptions = await Subscription.find();
    await Promise.all(
      subscriptions.map((sub) =>
        webPush.sendNotification(sub, payload).catch((err) => {
          console.error("Failed to send notification:", err);
        })
      )
    );
    res.status(200).json({ message: "Notifications sent successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to send notifications." });
  }
});

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
