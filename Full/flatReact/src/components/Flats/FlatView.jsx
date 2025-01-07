import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Typography,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Badge,
  IconButton,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import SendIcon from "@mui/icons-material/Send";
import API from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Import useAuth

const FlatView = () => {
  const [flats, setFlats] = useState([]);
  const [selectedFlat, setSelectedFlat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(new Set());
  const navigate = useNavigate();

  const { currentUser } = useAuth(); // Access currentUser from AuthContext

  // Fetch flats on load
  useEffect(() => {
    const fetchFlats = async () => {
      try {
        const { data } = await API.get("/flats");
        setFlats(data);
      } catch (error) {
        console.error("Error fetching flats:", error);
        toast.error("Failed to fetch flats.");
      }
    };
    fetchFlats();
  }, []);

  // Fetch messages for a flat
  const fetchMessages = async (flatId) => {
    try {
      const { data } = await API.get(`/flats/${flatId}/messages`);
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to fetch messages.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/flats/${id}`);
      setFlats(flats.filter((flat) => flat._id !== id));
      toast.success("Flat deleted successfully!");
    } catch (error) {
      console.error("Error deleting flat:", error);
      toast.error("Failed to delete flat.");
    }
  };

  const handleOpenDialog = (flat) => {
    setSelectedFlat(flat);
    fetchMessages(flat._id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedFlat(null);
    setMessages([]);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) {
      toast.error("Message cannot be empty.");
      return;
    }
    try {
      await API.post(`/flats/${selectedFlat._id}/messages`, { content: newMessage });
      toast.success("Message sent successfully!");
      setNewMessage("");
      fetchMessages(selectedFlat._id); // Refresh the messages
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message.");
    }
  };

  const handleReplyMessage = async (messageId) => {
    const replyContent = prompt("Enter your reply:");

    if (!replyContent || !replyContent.trim()) {
      toast.error("Reply cannot be empty.");
      return;
    }

    try {
      await API.post(`/messages/reply/${messageId}`, { content: replyContent });
      toast.success("Reply sent successfully!");
      fetchMessages(selectedFlat._id);
    } catch (error) {
      console.error("Error replying to message:", error);
      toast.error("Failed to send reply.");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        All Flats
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Flat Name</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Street Name</TableCell>
              <TableCell>Street Number</TableCell>
              <TableCell>Year Built</TableCell>
              <TableCell>Date Available</TableCell>
              <TableCell>Rent Price</TableCell>
              <TableCell>Messages</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {flats.map((flat) => (
              <TableRow key={flat._id}>
                <TableCell>{flat.flatName}</TableCell>
                <TableCell>{flat.city}</TableCell>
                <TableCell>{flat.streetName}</TableCell>
                <TableCell>{flat.streetNumber}</TableCell>
                <TableCell>{flat.yearBuilt}</TableCell>
                <TableCell>{new Date(flat.dateAvailable).toISOString().split("T")[0]}</TableCell>
                <TableCell>{flat.rentPrice}</TableCell>
                <TableCell>
                  {flat.ownerId === currentUser?._id ? (
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenDialog(flat)}
                    >
                      <Badge
                        badgeContent={unreadMessages.has(flat._id) ? "!" : null}
                        color="secondary"
                      >
                        <MailIcon />
                      </Badge>
                    </IconButton>
                  ) : (
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenDialog(flat)}
                    >
                      <SendIcon />
                    </IconButton>
                  )}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => navigate(`/flats/${flat._id}/edit`)}
                  >
                    🖉
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(flat._id)}
                  >
                    🗑️
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for messages */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Messages for {selectedFlat?.flatName}</DialogTitle>
        <DialogContent>
          <Typography variant="h6">Messages:</Typography>
          {messages.map((msg) => (
            <Paper key={msg._id} style={{ padding: "10px", margin: "10px 0" }}>
              <Typography>
                <b>From:</b> {msg.senderId?.firstName} {msg.senderId?.lastName}
              </Typography>
              <Typography>{msg.content}</Typography>
              {selectedFlat?.ownerId === currentUser?._id && (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleReplyMessage(msg._id)}
                >
                  Reply
                </Button>
              )}
            </Paper>
          ))}
          {selectedFlat?.ownerId !== currentUser?._id && (
            <TextField
              fullWidth
              label="New Message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              style={{ marginTop: "10px" }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Close
          </Button>
          <Button
            onClick={handleSendMessage}
            color="primary"
            disabled={selectedFlat?.ownerId === currentUser?._id}
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default FlatView;
