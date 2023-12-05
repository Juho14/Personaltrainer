import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { fetchTrainings } from '../FetchTrainings';

const localizer = momentLocalizer(moment);

const TrainingCalendar = () => {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchTrainings();
                setTrainings(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const events = trainings.map(training => ({
        title: `${training.activity} - ${training.customer.firstname} ${training.customer.lastname}`,
        start: new Date(training.date),
        end: moment(training.date).add(training.duration, 'minutes').toDate(),
    }));

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={events}
                step={15}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 700 }}
            />
        </div>
    );
};

export default TrainingCalendar;
