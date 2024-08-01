import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, FormControl, TextField } from "@mui/material";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [countryToEdit, setCountryToEdit] = useState(false);

  useEffect(() => {
    const getCountries = async () => {
      const response = await fetch(
        "https://getcountries-x7v2pbe4eq-nn.a.run.app"
      );
      const data = await response.json();
      setCountries(data);
    };
    getCountries();
  }, []);

  const columns = [
    {
      field: "name",
      headerName: "Country",
      width: 300,
    },
    {
      field: "edit",
      headerName: "Edit",
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            color="primary"
            width="40"
            onClick={() => {
              setCountryToEdit(cellValues.row);
            }}
          >
            Edit
          </Button>
        );
      },
    },
  ];

  const submitEdit = () => {
    console.log(countryToEdit);
  };

  return (
    <div>
      <Box sx={{ height: 300, width: "100%" }}>
        {!countryToEdit ? (
          <DataGrid
            getRowId={(row) => row.DOC_ID}
            rows={countries}
            columns={columns}
            editMode="row"
            disableRowSelectionOnClick
          />
        ) : (
          <FormControl>
            Updated Country Name:
            <TextField
              type="text"
              variant="outlined"
              name="name"
              value={countryToEdit.name}
              onChange={(e) =>
                setCountryToEdit({ ...countryToEdit, name: e.target.value })
              }
            />
            <Button onClick={submitEdit} type="submit">
              Save
            </Button>
            <Button onClick={() => setCountryToEdit(false)}>Cancel</Button>
          </FormControl>
        )}
      </Box>
    </div>
  );
};

export default Countries;
