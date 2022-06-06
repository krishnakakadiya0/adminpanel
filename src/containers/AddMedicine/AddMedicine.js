import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";



export default function AddMedicine({ getDataHandler, edit, handleEditClose }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expirydate, setExpirydate] = useState("");
  const [description, setDescription] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    let medicines = JSON.parse(localStorage.getItem("medicines"));

    if (medicines === null) {
      medicines = [];
    }

    let medicine = {
      id: Math.round(Math.random() * 1000),
      name,
      expirydate,
      price,
      quantity,
      description,
    };

    medicines.push(medicine);

    localStorage.setItem("medicines", JSON.stringify(medicines));

    setName("");
    setPrice("");
    setQuantity("");
    setExpirydate("");
    setDescription("");

    handleClose();

    getDataHandler();
    console.log("jhkjbmbm");
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Add Medicine
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Medicine</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add Medicine Name, Price, Expiry Date and it's use
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Medicine Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="price"
            name="price"
            label="Medicine Price"
            type="number"
            fullWidth
            variant="standard"
            onChange={(e) => setPrice(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="quantity"
            name="quantity"
            label="Medicine Quantity"
            type="number"
            fullWidth
            variant="standard"
            onChange={(e) => setQuantity(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="expirydate"
            name="expirydate"
            type="date"
            fullWidth
            variant="standard"
            onChange={(e) => setExpirydate(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
