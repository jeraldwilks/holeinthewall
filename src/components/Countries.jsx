import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";

const Countries = () => {
  const [countries, setCountries] = useState([]);

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
            // onClick={() => {
            //   editCountry(cellValues);
            // }}
          >
            Edit
          </Button>
        );
      },
    },
  ];

  return (
    <div>
      <Box sx={{ height: 300, width: "100%" }}>
        <DataGrid
          getRowId={(row) => row.DOC_ID}
          rows={countries}
          columns={columns}
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
};

export default Countries;
