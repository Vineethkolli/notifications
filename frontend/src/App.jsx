import React, { useState } from "react";
import "core-js/stable";
import "regenerator-runtime/runtime";

const App = () => {
  const [permission, setPermission] = useState(Notification.permission);

  const subscribeToNotifications = async () => {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js");

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(import.meta.env.VITE_PUBLIC_VAPID_KEY),
      });

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subscription),
      });

      if (response.ok) {
        setPermission(Notification.permission);
        alert("Notifications Enabled!");
      } else {
        alert("Failed to enable notifications.");
      }
    } catch (error) {
      console.error("Error subscribing:", error);
    }
  };

  const sendNotification = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/notify`, {
        method: "POST",
      });

      if (response.ok) {
        alert("Notification sent!");
      } else {
        alert("Failed to send notification.");
      }
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };

  const urlBase64ToUint8Array = (base64String) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
    const rawData = window.atob(base64);
    return new Uint8Array([...rawData].map((char) => char.charCodeAt(0)));
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Web Push Notifications</h1>
      <p>Notification Permission: {permission}</p>
      <button onClick={subscribeToNotifications}>Allow Notifications</button>
      <button onClick={sendNotification} style={{ marginLeft: "10px" }}>
        Send Notification
      </button>
    </div>
  );
};

export default App;
