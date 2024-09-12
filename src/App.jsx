import React, { useState, useEffect } from "react";
import mqtt from "mqtt";

function App() {
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const client = mqtt.connect("ws://broker.mqtt-dashboard.com:8000/mqtt");

    client.on("connect", () => {
      setConnected(true);
      console.log("successfully");

      client.subscribe("arppp9090", (err) => {
        if (!err) {
          console.log("subscribed");
        }
      });
    });

    client.on("message", (topic, payload) => {
      const data = payload.toString();
      console.log(data)
      setMessages((m) => [...m, data]);
    });

    return () => {
      client.end();
    };
  }, []);

  return (
    <div>
      <h1>MQTT Subsriber</h1>
      <p>Status: {connected ? "Connected" : "Disconnected"}</p>
      <ol>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ol>
    </div>
  );
}

export default App;
