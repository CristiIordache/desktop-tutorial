import { Autocomplete, Button, TextField } from "@mui/material";
import { useState } from "react";
import { DataGrid } from "@mui/material";


function Home() {
  const options = [
    { label: "Buc" },
    { label: "Buasc" },
    { label: "asBuc" },
    { label: "Basuc" },
  ];

  const [newOptions, setOptions] = useState(options);

  const handleClick = () => {
    setOptions((oldOptions) => [...oldOptions, { label: "test" }]);
  };

  return (
    <div>
      <Button variant="contained" color="success" onClick={handleClick}>
        test
      </Button>
      <TextField
        required
        id="nume"
        label="nume"
        defaultValue={"cris"}
      ></TextField>

      <Autocomplete
        disablePortal
        id="combo-box"
        options={newOptions}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Orase:" />}
      />
    </div>
  );
}

export default Home;
