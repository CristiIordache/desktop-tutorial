
// import Exerciti1 from "./assets/exerciti/Exercise1";
// import Exerciti2 from "./assets/exerciti/Exercise2";
// import Exercise4 from "./assets/exerciti/Exercise4";
// const App = () => {
//   const user = {
//     name: "John Doe",
//     age: 30,
//     email: "john.doe@example.com"
// };

//     return (
//         <div>
//         <Exerciti1 />
//             <Exerciti2 name={user.name} age={user.age} email={user.email} />
//             <Exercise4 />
//         </div>
//     );
// };

// export default App;


import { useState, useEffect } from 'react';
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
  IconButton,
  TableSortLabel
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

function App() {
  // State pentru stocarea listei de studenți
  const [students, setStudents] = useState([]);
  
  // State pentru formularul de adăugare/editare student
  const [form, setForm] = useState({ firstName: '', lastName: '', faculty: '' });
  
  // State pentru gestionarea indexului de editare
  const [editIndex, setEditIndex] = useState(null);
  
  // State pentru gestionarea deschiderii/închiderii dialogului
  const [open, setOpen] = useState(false);
  
  // State pentru gestionarea configurației de sortare a tabelului
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Funcție pentru încărcarea datelor din localStorage la încărcarea componentei
  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem('students'));
    if (storedStudents) {
      setStudents(storedStudents);
    }
  }, []);

  // Funcție pentru salvarea datelor în localStorage ori de câte ori se modifică state-ul students
  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  // Funcție pentru actualizarea valorilor din formularul de adăugare/editare student
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Funcție pentru gestionarea adăugării sau editării unui student
  const handleSubmit = () => {
    if (editIndex !== null) {
      // Dacă editIndex nu este null, actualizăm studentul existent în listă
      const updatedStudents = [...students];
      updatedStudents[editIndex] = form;
      setStudents(updatedStudents);
      setEditIndex(null); // Resetăm editIndex după editare
    } else {
      // Dacă editIndex este null, adăugăm un student nou în listă
      setStudents([...students, form]);
    }
    // Resetăm formularul și închidem dialogul
    setForm({ firstName: '', lastName: '', faculty: '' });
    setOpen(false);
  };

  // Funcție pentru deschiderea dialogului de editare student
  const handleEdit = (index) => {
    setEditIndex(index); // Setăm indexul pentru editare
    setForm(students[index]); // Populăm formularul cu valorile studentului selectat
    setOpen(true); // Deschidem dialogul
  };

  // Funcție pentru ștergerea unui student din listă
  const handleDelete = (index) => {
    const updatedStudents = [...students];
    updatedStudents.splice(index, 1); // Ștergem studentul din listă
    setStudents(updatedStudents); // Actualizăm lista de studenți
  };

  // Funcție pentru închiderea dialogului de adăugare/editare student
  const handleClose = () => {
    setOpen(false); // Închidem dialogul
    setForm({ firstName: '', lastName: '', faculty: '' }); // Resetăm formularul
    setEditIndex(null); // Resetăm editIndex
  };

  // Funcție pentru gestionarea sortării tabelului după coloane
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    // Setăm configurația de sortare
    setSortConfig({ key, direction });
    // Sortăm lista de studenți în funcție de cheia selectată și direcția sortării
    setStudents((prevStudents) => {
      return [...prevStudents].sort((a, b) => {
        if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
        if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
        return 0;
      });
        
    });
  };

  // Renderizarea componentei
  return (
    <Container>
      <h1>Student Form</h1>
      {/* Formular pentru introducerea datelor studentului */}
      <TextField
        label="First Name"
        name="firstName"
        value={form.firstName}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        label="Last Name"
        name="lastName"
        value={form.lastName}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        label="Faculty"
        name="faculty"
        value={form.faculty}
        onChange={handleChange}
        margin="normal"
      />
      {/* Buton pentru submit-ul formularului */}
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>

      {/* Tabel pentru afișarea listei de studenți */}
      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              {/* Coloanele tabelului cu posibilitate de sortare */}
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'firstName'}
                  direction={sortConfig.key === 'firstName' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSort('firstName')}
                >
                  First Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'lastName'}
                  direction={sortConfig.key === 'lastName' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSort('lastName')}
                >
                  Last Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'faculty'}
                  direction={sortConfig.key === 'faculty' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSort('faculty')}
                >
                  Faculty
                </TableSortLabel>
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Rândurile tabelului cu datele fiecărui student */}
            {students.map((student, index) => (
              <TableRow key={index}>
                <TableCell>{student.firstName}</TableCell>
                <TableCell>{student.lastName}</TableCell>
                <TableCell>{student.faculty}</TableCell>
                <TableCell>
                  {/* Buton pentru editarea studentului */}
                  <IconButton onClick={() => handleEdit(index)}>
                    <Edit />
                  </IconButton>
                  {/* Buton pentru ștergerea studentului */}
                  <IconButton onClick={() => handleDelete(index)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog pentru adăugarea/editarea studentului */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editIndex !== null ? 'Edit Student' : 'Add Student'}</DialogTitle>
        <DialogContent>
          {/* Formular în dialog pentru adăugarea/editarea datelor studentului */}
          <TextField
            label="First Name"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            margin="normal"
            fullWidth
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            margin="normal"
            fullWidth
          />
          <TextField
            label="Faculty"
            name="faculty"
            value={form.faculty}
            onChange={handleChange}
            margin="normal"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          {/* Buton pentru anularea adăugării/editării */}
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {/* Buton pentru salvarea adăugării/editării */}
          <Button onClick={handleSubmit} color="primary">
            {editIndex !== null ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default App;

