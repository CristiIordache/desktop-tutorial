import React from 'react';
import PropTypes from 'prop-types'; // Importă PropTypes
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material';

const UserTable = ({
  users,
  isAdmin,
  currentUser,
  onDelete,
  onEdit,
  editingUser,
  editedData,
  onEditChange,
  onEditSubmit,
  onCloseEditDialog
}) => {
  return (
    <div>
      <TableContainer component={Paper} sx={{ marginTop: 10 }}>
        <Table aria-label="users table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Password</TableCell>
              {isAdmin && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.birthdate}</TableCell>
                <TableCell>{user.password}</TableCell>
                {isAdmin && (
                  <TableCell>
                    {!user.isAdmin && user.id !== currentUser.uid && (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => onDelete(user.id)}
                      >
                        Delete
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => onEdit(user)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={!!editingUser} onClose={onCloseEditDialog}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={editedData.email || ''}
            onChange={onEditChange}
          />
          <TextField
            margin="dense"
            name="firstName"
            label="First Name"
            type="text"
            fullWidth
            value={editedData.firstName || ''}
            onChange={onEditChange}
          />
          <TextField
            margin="dense"
            name="lastName"
            label="Last Name"
            type="text"
            fullWidth
            value={editedData.lastName || ''}
            onChange={onEditChange}
          />
          <TextField
            margin="dense"
            name="birthdate"
            label="Date of Birth"
            type="date"
            fullWidth
            value={editedData.birthdate || ''}
            onChange={onEditChange}
            sx={{ 
              height: '60px', // Set the height to 60px
              '& .MuiInputBase-root': { // Target the input base
                height: '130%', // Ensure the full height is utilized
                padding: '15px', // Adjust the padding as necessary
              },
            }}
          />
          <TextField
            margin="dense"
            name="password"
            label="Password"
            type="password"
            fullWidth
            value={editedData.password || ''}
            onChange={onEditChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseEditDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={onEditSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

// Adaugă validarea prop-urilor
UserTable.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      birthdate: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
      isAdmin: PropTypes.bool
    })
  ).isRequired,
  isAdmin: PropTypes.bool.isRequired,
  currentUser: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  editingUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    birthdate: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }),
  editedData: PropTypes.shape({
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    birthdate: PropTypes.string,
    password: PropTypes.string
  }).isRequired,
  onEditChange: PropTypes.func.isRequired,
  onEditSubmit: PropTypes.func.isRequired,
  onCloseEditDialog: PropTypes.func.isRequired
};

export default UserTable;
