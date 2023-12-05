import { Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import ActivityDiagram from './ActivityDiagram';
import CustomerList from './Customerlist';
import TrainingCalendar from './TrainingCalendar';
import TrainingList from './Traininglist';

function Navigation() {
    const [currentNavigation, setCurrentNavigation] = useState(0);

    const handleNavigationChange = (event, newValue) => {
        setCurrentNavigation(newValue);
    };

    return (
        <div>
            <Tabs value={currentNavigation} onChange={handleNavigationChange}>
                <Tab label="Customer List" />
                <Tab label="Training List" />
                <Tab label="Calendar" />
                <Tab label="Activity Diagram" />
            </Tabs>
            <div>
                {currentNavigation === 0 && <CustomerList />}
                {currentNavigation === 1 && <TrainingList />}
                {currentNavigation === 2 && <TrainingCalendar />}
                {currentNavigation === 3 && <ActivityDiagram />}
            </div>
        </div>
    );
}

export default Navigation;
