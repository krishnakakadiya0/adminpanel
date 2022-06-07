import React from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function ListUi({data, columns}) {
  return (
    <>
      <div style={{ height: 400, width: "100%", marginBottom: "20px" }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </>
  );
}
