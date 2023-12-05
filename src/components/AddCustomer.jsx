import Button from '@mui/material/Button';
import React, { useState } from 'react';
import { saveCustomer } from '../FetchCustomers';
import CustomerDialogcontent from './CustomerDialogcontent';

function AddCustomer({ onSubmit }) {
    const [open, setOpen] = useState(false);
    const [newCustomer, setNewCustomer] = useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: '',
    });

    const handleSave = (editedCustomer) => {
        setNewCustomer(editedCustomer);
        saveCustomer(editedCustomer)
            .then((data) => {
                console.log('Added customer data:', data);
                onSubmit();
            })
            .catch((err) => console.error(err));

        setOpen(false);
    };

    const handleDialogOpen = () => {
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button variant="contained" color="primary" onClick={handleDialogOpen}>
                Add Customer
            </Button>

            <CustomerDialogcontent
                open={open}
                handleClose={handleDialogClose}
                customerData={newCustomer}
                handleSave={handleSave}
                title="Add Customer"
                contentText="Enter the new customer details:"
            />
        </>
    );
}

export default AddCustomer;