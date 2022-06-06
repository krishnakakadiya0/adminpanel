import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import AddMedicine from "../../containers/AddMedicine/AddMedicine";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";

export default function ListUi() {
  const [data, setData] = useState([]);
  const [del, setDel] = useState(false);
  const [rowref, setRowref] = useState();
  const [edit, setEdit] = useState(false);

  const handleClose = () => {
    setDel(false);
    setEdit(false);
  };

  const handleDelete = (params) => {
    setDel(true);
    setRowref(params);
  };


  const handleEdit = (params) => {
    setEdit(true);
    setRowref(params);
  }

  const handleFinalDelete = () => {
    let localData = JSON.parse(localStorage.getItem("medicines"));
    let filterData = localData.filter((d, i) => d.id !== rowref.id);

    localStorage.setItem("medicines", JSON.stringify(filterData));
    handleClose();
    setRowref();
    getData();
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Medicine Name", width: 130 },
    { field: "price", headerName: "Price", width: 130 },
    { field: "quantity", headerName: "Quantity", width: 130 },
    { field: "expirydate", headerName: "Expiry Date", width: 130 },
    { field: "description", headerName: "Description", width: 130 },
    {
      field: "action",
      headerName: "Remove / Action",
      width: 130,
      renderCell: (params) => {
        return (
          <>
            <IconButton
              aria-label="delete"
              onClick={() => handleDelete(params)}
            >
              <DeleteIcon />
            </IconButton>
            <span style={{ fontSize: "22px", margin: "0px 10px 0px 10px"}}> | </span>
            <IconButton
              aria-label="delete"
              onClick={() => handleEdit(params)}
            >
              <EditIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  let getData = () => {
    let localData = JSON.parse(localStorage.getItem("medicines"));

    if (localData !== null) {
      setData(localData);
    }

    
  };

  useEffect(() => {
    getData();
  }, []);

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  console.log(data);
  
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
      <AddMedicine getDataHandler={getData} edit={edit} handleEditClose={handleClose}/>
      <Dialog
        open={del}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are you sure ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Do you really want to delete these medicine data? This process
            cannot be undone
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleFinalDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
