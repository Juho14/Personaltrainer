import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Papa from 'https://cdn.skypack.dev/papaparse';
import React, { useState } from 'react';

const ExportData = ({ data, filename }) => {
    const [open, setOpen] = useState(false);

    const handleExport = () => {
        const csvData = Papa.unparse(data, {
            quotes: true,
            header: true,
        });

        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.href = url;
        link.setAttribute('download', `${filename}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                Export Data
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Confirm Export</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to export the data?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleExport} color="primary" autoFocus>
                        Export
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ExportData;
