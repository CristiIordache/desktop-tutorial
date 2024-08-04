import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, query, where, orderBy } from "firebase/firestore";
import { db, auth } from "../../services/firebase";
import { TextField, Button, List, ListItem, Typography, Divider } from "@mui/material";

const MessageBar = ({ flatId }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [replyContent, setReplyContent] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (flatId && currentUser) {
      fetchMessages();
    }
  }, [flatId, currentUser]);

  const handleSendMessage = async () => {
    if (!message.trim()) {
      alert("Message content cannot be empty");
      return;
    }

    if (!flatId || !currentUser) {
      console.error("No flatId or current user");
      return;
    }

    try {
      await addDoc(collection(db, "userMessages"), {
        flatId,
        fullName: currentUser.displayName,
        senderEmail: currentUser.email,
        receiverUid: selectedMessage?.receiverUid || "",
        timestamp: new Date(),
        content: message,
        parentMessageId: null // No parent for new messages
      });
      setMessage(""); // Clear the input field
      fetchMessages(); // Refresh messages
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  const handleReplyMessage = async () => {
    if (!replyContent.trim() || !selectedMessage) {
      alert("Reply content cannot be empty or no message selected");
      return;
    }

    if (!flatId || !currentUser) {
      console.error("No flatId or current user");
      return;
    }

    try {
      await addDoc(collection(db, "userMessages"), {
        flatId,
        fullName: currentUser.displayName,
        senderEmail: currentUser.email,
        receiverUid: selectedMessage.receiverUid,
        timestamp: new Date(),
        content: replyContent,
        parentMessageId: selectedMessage.id // Link reply to parent message
      });
      setReplyContent(""); // Clear the input field
      setSelectedMessage(null); // Deselect message
      fetchMessages(); // Refresh messages
    } catch (error) {
      console.error("Error sending reply: ", error);
    }
  };

  const fetchMessages = async () => {
    if (!flatId || !currentUser) {
      console.error("No flatId or current user provided");
      return;
    }

    try {
      const q = query(
        collection(db, "userMessages"),
        where("receiverUid", "==", currentUser.uid),
        orderBy("timestamp", "asc")
      );
      const querySnapshot = await getDocs(q);
      setMessages(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching messages: ", error);
    }
  };

  return (
    <div>
      <TextField
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        fullWidth
        placeholder="Type a message"
      />
      <Button onClick={handleSendMessage} variant="contained" color="primary">
        Send Message
      </Button>
      <Divider sx={{ my: 2 }} />
      {selectedMessage && (
        <div>
          <Typography variant="h6">Reply to:</Typography>
          <Typography>
            <strong>{selectedMessage.fullName} ({selectedMessage.senderEmail}):</strong> {selectedMessage.content}
          </Typography>
          <TextField
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            fullWidth
            placeholder="Type a reply"
            multiline
            rows={4}
          />
          <Button onClick={handleReplyMessage} variant="contained" color="secondary">
            Reply
          </Button>
        </div>
      )}
      <List>
        {messages.map((msg) => (
          <div key={msg.id}>
            <ListItem>
              <strong>{msg.fullName} ({msg.senderEmail}):</strong> {msg.content}
              <Button
                onClick={() => setSelectedMessage(msg)}
                variant="outlined"
                sx={{ ml: 2 }}
              >
                Reply
              </Button>
            </ListItem>
            {messages.filter(reply => reply.parentMessageId === msg.id).map(reply => (
              <ListItem key={reply.id} sx={{ pl: 4 }}>
                <Typography variant="body2">
                  <strong>{reply.fullName} ({reply.senderEmail}):</strong> {reply.content}
                </Typography>
              </ListItem>
            ))}
            <Divider sx={{ my: 1 }} />
          </div>
        ))}
      </List>
    </div>
  );
};

export default MessageBar;
