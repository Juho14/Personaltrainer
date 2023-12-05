import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';


function CustomerDialogcontent({ open, handleClose, customerData, handleSave }) {
    const [editedCustomer, setEditedCustomer] = useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: '',
        ...customerData,
    });

    const handleFieldChange = (field, value) => {
        setEditedCustomer((prevCustomer) => ({
            ...prevCustomer,
            [field]: value,
        }));
    };

    const handleSaveClick = () => {
        handleSave(editedCustomer);
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Customer</DialogTitle>
            <DialogContent>
                <DialogContentText>Edit the customer details below:</DialogContentText>
                <TextField
                    label="First Name"
                    value={editedCustomer.firstname}
                    onChange={(e) => handleFieldChange('firstname', e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Last Name"
                    value={editedCustomer.lastname}
                    onChange={(e) => handleFieldChange('lastname', e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Street Address"
                    value={editedCustomer.streetaddress}
                    onChange={(e) => handleFieldChange('streetaddress', e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Postcode"
                    value={editedCustomer.postcode}
                    onChange={(e) => handleFieldChange('postcode', e.target.value)}
                    fullWidth
                />
                <TextField
                    label="City"
                    value={editedCustomer.city}
                    onChange={(e) => handleFieldChange('city', e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Email"
                    value={editedCustomer.email}
                    onChange={(e) => handleFieldChange('email', e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Phone"
                    value={editedCustomer.phone}
                    onChange={(e) => handleFieldChange('phone', e.target.value)}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSaveClick} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CustomerDialogcontent;