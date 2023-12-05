import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from 'react';
import { deleteCustomer, fetchCustomers } from '../FetchCustomers';
import AddCustomer from './AddCustomer';
import AddTraining from './AddTraining';
import EditCustomer from './EditCustomer';
import ExportData from './ExportData';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

function Customerlist() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);

    const getCustomers = () => {
        fetchCustomers()
            .then(data => {
                setCustomers(data);
            })
            .catch(error => console.error(error));
    }

    useEffect(() => {
        getCustomers();
    }, []);

    const handleDelete = (params) => {
        const url = params.data.links[0].href;

        if (!url) {
            console.error("URL is undefined:", params.data.links.customer);
            return;
        }

        if (window.confirm('Are you sure?')) {
            deleteCustomer(url)
                .then(() => {
                    setOpen(true);
                    getCustomers();
                })
                .catch((err) => console.error(err));
        }
    };



    const updateCustomers = () => {
        fetchCustomers()
            .then(data => setCustomers(data))
            .catch(error => console.error(error));
    };

    const [columnDefs] = useState([
        { field: 'firstname', sortable: true, filter: true, width: 150 },
        { field: 'lastname', sortable: true, filter: true, width: 150 },
        { field: 'streetaddress', sortable: true, filter: true, width: 200 },
        { field: 'postcode', sortable: true, filter: true, width: 160 },
        { field: 'city', sortable: true, filter: true, width: 120 },
        { field: 'email', sortable: true, filter: true, width: 220 },
        { field: 'phone', sortable: true, filter: true, width: 160 },
        {
            headerName: 'Add Training',
            cellRenderer: params => (
                <AddTraining
                    customerdata={params.data}
                    link={params.data.links.customer?.href}
                    trainingAdded={updateCustomers}
                />
            ),
            width: 180
        },
        {
            headerName: 'Edit customer',
            cellRenderer: params => (
                <EditCustomer
                    customerdata={params.data}
                    link={params.data.links.customer?.href}
                    customerUpdated={updateCustomers}
                />
            ),
            width: 160
        },
        {
            headerName: 'Delete customer',
            cellRenderer: params => (
                <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(params)}
                >
                    Delete
                </Button>
            ),
            width: 150
        },

    ]);

    return (
        <>
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>

                <AddCustomer onSubmit={getCustomers} />
                <ExportData data={customers} filename="customer_data" />
            </Stack>
            <div className='ag-theme-material' style={{ width: '100%', height: '700px' }}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationAutoPageSize={true}
                />
            </div>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message="Customer deleted successfully"
            />
        </>
    );
}

export default Customerlist;
