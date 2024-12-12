import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import API from '../services/api'; // Adjust the path to your API service

const ExampleGrid = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await API.get('/flats'); // Replace '/flats' with your endpoint
        const rowsWithIds = data.map((row, index) => ({
          ...row,
          _id: row._id || `generated-id-${index}`, // Ensure every row has a unique ID
        }));
        console.log('Processed rows:', rowsWithIds); // Debugging output
        setRows(rowsWithIds);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { field: 'flatName', headerName: 'Flat Name', flex: 1 },
    { field: 'city', headerName: 'City', flex: 1 },
    { field: 'rentPrice', headerName: 'Rent Price', flex: 1, editable: true },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <button
          onClick={() => handleUpdate(params.row._id)}
          style={{ cursor: 'pointer' }}
        >
          Update
        </button>
      ),
    },
  ];

  const handleUpdate = (id) => {
    const updatedRows = rows.map((row) =>
      row._id === id ? { ...row, rentPrice: row.rentPrice + 100 } : row
    );
    setRows(updatedRows);
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        getRowId={(row) => row._id} // Use _id as the row identifier
      />
    </div>
  );
};

export default ExampleGrid;
