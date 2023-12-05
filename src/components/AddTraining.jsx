import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useState } from 'react';
import { saveTraining } from '../FetchTrainings';
import TrainingDialogcontent from './TrainingDialogcontent';

const AddTraining = ({ customerdata, trainingAdded }) => {
    const [open, setOpen] = useState(false);

    const customerHref = customerdata.links[0].href;

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSaveTraining = (trainingData) => {
        console.log('Training data:', trainingData);
        console.log(customerHref)
        saveTraining(trainingData, customerHref)
            .then(() => {
                trainingAdded();
                handleClose();
            })
            .catch((error) => console.error(error));
    };

    return (
        <>
            <Button variant="outlined" color="primary" size="small" onClick={handleOpen}>
                Add Training
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Training</DialogTitle>
                <DialogContent>
                    <TrainingDialogcontent
                        trainingData={{ date: '', duration: '', activity: '' }} // Initial empty data
                        onSave={handleSaveTraining}
                        onClose={handleClose}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AddTraining;