import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { AgGridReact } from 'ag-grid-react';
import 'dayjs/locale/de';
import React, { useEffect, useState } from 'react';
import { deleteTraining, fetchTrainings } from '../FetchTrainings';
import ExportData from './ExportData';

function TrainingList() {
    const [trainings, setTrainings] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);


    const getTrainings = () => {
        fetchTrainings()
            .then((data) => {
                setTrainings(data);
            })
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        getTrainings();
    }, []);

    const handleDelete = (params) => {
        const trainingId = params.data.id;

        if (!trainingId) {
            console.error("Training ID is undefined:", params.data);
            return;
        }

        const url = `${import.meta.env.VITE_API_URL}/trainings/${trainingId}`;

        if (window.confirm('Are you sure?')) {
            deleteTraining(url)
                .then(() => {
                    setOpenSnackbar(true);
                    getTrainings();
                })
                .catch((err) => console.error(err));
        }
    };

    const columnDefs = [
        {
            field: 'date',
            headerName: 'Date',
            sortable: true,
            filter: true,
            width: 250,
            cellRenderer: (params) => {
                const date = new Date(params.value);
                const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
                return <span>{formattedDate}</span>;
            },
        },
        { field: 'duration', headerName: 'Duration', sortable: true, filter: true },
        { field: 'activity', headerName: 'Activity', sortable: true, filter: true },
        {
            field: 'customerName',
            headerName: 'Customer Name',
            sortable: true,
            filter: true,
            width: 250,
            valueGetter: (params) => params.data.customer ? `${params.data.customer.firstname} ${params.data.customer.lastname}` : '',
        },
        {
            headerName: 'Delete',
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
    ];

    return (
        <>
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <ExportData data={trainings} filename="training_data" />
            </Stack>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                <div className="ag-theme-material" style={{ width: '100%', height: '700px' }}>
                    <AgGridReact
                        rowData={trainings}
                        columnDefs={columnDefs}
                        pagination={true}
                        paginationAutoPageSize={true}
                    />
                </div>
                <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)} message="Training deleted successfully" />
            </LocalizationProvider>
        </>
    );
}

export default TrainingList;