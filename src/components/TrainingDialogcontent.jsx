import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import 'dayjs/locale/de';
import React, { useState } from 'react';

const TrainingDialogcontent = ({ trainingData, onSave, onClose }) => {
    const [open, setOpen] = useState(true);
    const [editedTraining, setEditedTraining] = useState({
        ...trainingData,
        date: trainingData.date ? new Date(trainingData.date) : null,
    });

    const handleClose = () => {
        setOpen(false);
        onClose();
    };

    const handleFieldChange = (field, value) => {
        setEditedTraining((prevTraining) => ({
            ...prevTraining,
            [field]: value,
        }));
        const dateValue = field === 'date' ? (value instanceof Date ? value : new Date(value)) : value;

        setEditedTraining((prevTraining) => ({
            ...prevTraining,
            [field]: dateValue,
        }));
    };



    const handleSaveClick = () => {
        onSave(editedTraining);
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Training</DialogTitle>
            <DialogContent>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='de'>
                    <DateTimePicker
                        label="Date"
                        value={editedTraining.date}
                        onChange={(value) => handleFieldChange('date', value)}
                        fullWidth
                    />
                </LocalizationProvider>
                <TextField
                    label="Duration (minutes)"
                    type="number"
                    value={editedTraining.duration}
                    onChange={(e) => handleFieldChange('duration', e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Activity"
                    value={editedTraining.activity}
                    onChange={(e) => handleFieldChange('activity', e.target.value)}
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
};

export default TrainingDialogcontent;