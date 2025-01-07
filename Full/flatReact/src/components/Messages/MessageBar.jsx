import React, { useState } from "react";
import PropTypes from "prop-types"; // Import prop-types
import { TextField, Button } from "@mui/material";
import API from "../../services/api";

const MessageBar = ({ flatId }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    try {
      await API.post(`/flats/${flatId}/messages`, { content: message });
      setMessage("");
      alert("Mesaj trimis cu succes!");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Eroare la trimiterea mesajului.");
    }
  };

  return (
    <div>
      <TextField
        fullWidth
        label="Scrie un mesaj"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSendMessage}
        style={{ marginTop: "10px" }}
      >
        Trimite
      </Button>
    </div>
  );
};

// Definește tipurile de proprietăți așteptate
MessageBar.propTypes = {
  flatId: PropTypes.string.isRequired, // Validare pentru flatId ca string necesar
};

export default MessageBar;
