import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import API from "../services/api";

const ExampleTable = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await API.get("/flats"); // Replace with your endpoint
        const rowsWithIds = data.map((row, index) => ({
          ...row,
          _id: row._id || `generated-id-${index}`, // Ensure a unique ID for each row
        }));
        setRows(rowsWithIds);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = (id) => {
    const updatedRows = rows.map((row) =>
      row._id === id ? { ...row, rentPrice: row.rentPrice + 100 } : row
    );
    setRows(updatedRows);
  };

  const handleDelete = (id) => {
    const updatedRows = rows.filter((row) => row._id !== id);
    setRows(updatedRows);
    // Optionally make an API call to delete on the backend
    console.log(`Row with ID ${id} deleted`);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Example Table
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Flat Name</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Rent Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row._id}>
                <TableCell>{row.flatName}</TableCell>
                <TableCell>{row.city}</TableCell>
                <TableCell>${row.rentPrice}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdate(row._id)}
                    style={{ marginRight: "10px" }}
                  >
                    Update Rent
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(row._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ExampleTable;
