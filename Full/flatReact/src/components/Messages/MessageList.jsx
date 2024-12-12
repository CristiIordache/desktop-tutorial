// C:\Users\Cristian Iordache\Desktop\Teme.html\githab\desktop-tutorial\Full\flatReact\src\components\Messages\MessageList.jsx

import React, { useState, useEffect } from "react";
import API from "../../services/api";
import { Container, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";
import { toast } from "react-toastify";

const MessageList = ({ flatId }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await API.get(`/flats/${flatId}/messages`);
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
        toast.error("Failed to load messages.");
      }
    };
    fetchMessages();
  }, [flatId]);

  return (
    <Container>
      <Typography variant="h6">Messages</Typography>
      <List>
        {messages.map((msg) => (
          <React.Fragment key={msg._id}>
            <ListItem>
              <ListItemText primary={msg.content} secondary={msg.senderName} />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Container>
  );
};

export default MessageList;
