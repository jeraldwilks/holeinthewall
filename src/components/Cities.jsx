import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";

const Cities = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");
  const [cities, setCities] = useState([]);

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
      headerName: "City",
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
            // onClick={() => {
            //   editCity(cellValues);
            // }}
          >
            Edit
          </Button>
        );
      },
    },
  ];

  const updateCountry = (c) => {
    const getCities = async () => {
      const response = await fetch(
        "https://getcities-x7v2pbe4eq-nn.a.run.app?country=" + c.DOC_ID
      );
      const data = await response.json();
      setCities(data);
    };
    getCities();
    setCountry(c);
  };

  return (
    <div>
      <Box sx={{ width: 400 }}>
        <FormControl fullWidth>
          <InputLabel id="Country-label">Country</InputLabel>
          {countries.length > 0 && (
            <Select
              labelId="Country-label"
              id="Country"
              value={country}
              label="Country"
              onChange={(e) => {
                updateCountry(e.target.value);
              }}
            >
              {countries.map((c) => (
                <MenuItem key={c.name} value={c}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>
          )}
        </FormControl>
        {cities.length > 0 && (
          <Box sx={{ height: 300, width: "100%" }}>
            {" "}
            <DataGrid
              getRowId={(row) => row.DOC_ID}
              rows={cities}
              columns={columns}
              disableRowSelectionOnClick
            />
          </Box>
        )}
      </Box>
    </div>
  );
};

export default Cities;
