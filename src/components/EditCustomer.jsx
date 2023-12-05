import Button from '@mui/material/Button';
import React, { useState } from 'react';
import { updateCustomers } from '../FetchCustomers';
import CustomerDialogcontent from './CustomerDialogcontent';

const EditCustomer = ({ customerdata, customerUpdated }) => {
    const [open, setOpen] = useState(false);
    const [editedCustomer, setEditedCustomer] = useState({ ...customerdata });

    const handleUpdate = (updatedCustomer) => {

        const customerHref = customerdata.links[0].href;

        if (!customerHref) {
            console.error("Customer href is undefined");
            setOpen(false);
            return;
        }

        updateCustomers(updatedCustomer, customerHref)
            .then(data => {
                setEditedCustomer(data);
                customerUpdated();
            })
            .catch(err => console.error(err));

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
            <Button variant="outlined" color="primary" onClick={handleDialogOpen}>
                Edit
            </Button>

            <CustomerDialogcontent
                open={open}
                handleClose={handleDialogClose}
                customerData={editedCustomer}
                handleSave={handleUpdate}
            />
        </>
    );
};

export default EditCustomer;