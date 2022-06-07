import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as yup from "yup";
import { Form, Formik, useFormik } from "formik";

export default function AddMedicine({ getDataHandler, edit, handleEditClose }) {
  const [open, setOpen] = useState(false);

  let schema = yup.object().shape({
    name: yup
      .string("Enter valid Medicine Name")
      .required("Medicine Name is Required"),
    price: yup
      .number("Enter Valid Price")
      .required("Medicine Price is Required")
      .positive()
      .integer(),
    quantity: yup
      .number("Enter Valid Quantity")
      .required("Medicine Quantity is Required")
      .positive()
      .integer(),
    expirydate: yup.date().required("Expiry Date is Required"),
    description: yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      quantity: "",
      expirydate: "",
      description: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = ({ name, price, quantity, expirydate, description }) => {
    let medicines = JSON.parse(localStorage.getItem("medicines"));

    if (medicines === null) {
      medicines = [];
    }

    let medicine = {
      id: Math.round(Math.random() * 1000),
      name,
      price,
      quantity,
      expirydate,
      description,
    };

    medicines.push(medicine);

    localStorage.setItem("medicines", JSON.stringify(medicines));

    handleClose();

    getDataHandler();
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
          <Formik values = {formik}>
            <Form onSubmit={formik.handleSubmit}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                name="name"
                label="Medicine Name"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
              />
              {formik.errors.name ? (
                <p style={{fontSize:"14px", color:"red"}}>
                  {formik.errors.name}
                </p>
              ) : null}
              <TextField
                autoFocus
                margin="dense"
                id="price"
                name="price"
                label="Medicine Price"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
              />
              {formik.errors.price ? (
                <p style={{fontSize:"14px", color:"red"}}>
                  {formik.errors.price}
                </p>
              ) : null}
              <TextField
                autoFocus
                margin="dense"
                id="quantity"
                name="quantity"
                label="Medicine Quantity"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
              />
              {formik.errors.quantity ? (
                <p style={{fontSize:"14px", color:"red"}}>
                  {formik.errors.quantity}
                </p>
              ) : null}
              <TextField
                autoFocus
                margin="dense"
                id="expirydate"
                name="expirydate"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
              />
              {formik.errors.expirydate ? (
                <p style={{fontSize:"14px", color:"red"}}>
                  {formik.errors.expirydate}
                </p>
              ) : null}
              <TextField
                autoFocus
                margin="dense"
                id="description"
                name="description"
                label="Description"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
              />
              {formik.errors.description ? (
                <p style={{fontSize:"14px", color:"red"}}>
                  {formik.errors.description}
                </p>
              ) : null}
              <div style={{textAlign : "end"}}>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Add</Button>
              </div>
            </Form>
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
}
