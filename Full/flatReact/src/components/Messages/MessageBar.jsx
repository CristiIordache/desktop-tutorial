// C:\Users\Cristian Iordache\Desktop\Teme.html\githab\desktop-tutorial\Full\flatReact\src\components\Messages\MessageBar.jsx

import React, { useState, useEffect } from "react";
import API from "../../services/api";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";

const MessageBar = ({ flatId, currentUser }) => {
  const [messages, setMessages] = useState([]); // State pentru mesaje
  const [message, setMessage] = useState(""); // Mesajul curent introdus

  // Fetch mesaje la montarea componentului
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await API.get(`/flats/${flatId}/messages`);
        setMessages(data); // Actualizează mesaje cu cele primite din API
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, [flatId]);

  // Trimiterea unui mesaj nou
  const handleSend = async () => {
    if (!message.trim()) return; // Evită trimiterea mesajelor goale

    try {
      const { data } = await API.post(`/flats/${flatId}/messages`, { content: message });
      setMessages((prev) => [...prev, data]); // Adaugă mesajul nou în listă
      setMessage(""); // Resetează câmpul de introducere
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div>
      <Typography variant="h6">Messages</Typography>
      <Divider sx={{ my: 2 }} />

      {/* Lista mesajelor */}
      <List>
        {messages.map((msg) => (
          <ListItem key={msg._id} alignItems="flex-start">
            <ListItemText
              primary={
                <>
                  <Typography variant="body1" fontWeight="bold">
                    {msg.senderName || "Unknown User"}
                  </Typography>
                  {msg.content}
                </>
              }
              secondary={new Date(msg.timestamp).toLocaleString()} // Formatul datei
            />
          </ListItem>
        ))}
      </List>

      {/* Separator */}
      <Divider sx={{ my: 2 }} />

      {/* Input pentru trimiterea unui mesaj */}
      <TextField
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
        fullWidth
        multiline
        rows={3}
        variant="outlined"
        sx={{ mb: 2 }}
      />
      <Button onClick={handleSend} variant="contained" color="primary">
        Send
      </Button>
    </div>
  );
};

export default MessageBar;
