import React, { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import prop-types
import API from "../../services/api";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

const MessageList = ({ flatId }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await API.get(`/flats/${flatId}/messages`);
        if (data.message) {
          setMessages([]); // Dacă nu sunt mesaje
        } else {
          setMessages(data); // Mesajele primite
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, [flatId]);

  if (loading) return <Typography>Loading...</Typography>;

  if (messages.length === 0) {
    return <Typography>Nu aveți niciun mesaj.</Typography>;
  }

  return (
    <div>
      <Typography variant="h6">Mesaje:</Typography>
      <List>
        {messages.map((msg) => (
          <React.Fragment key={msg._id}>
            <ListItem>
              <ListItemText
                primary={msg.content}
                secondary={`De la: ${msg.senderId?.firstName || "Anonim"} ${
                  msg.senderId?.lastName || ""
                }`}
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

// Adaugă validarea proprietăților
MessageList.propTypes = {
  flatId: PropTypes.string.isRequired, // `flatId` trebuie să fie un string și este obligatoriu
};

export default MessageList;
