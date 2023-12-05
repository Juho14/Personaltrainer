import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import { fetchTrainings } from '../FetchTrainings';

const ActivityDiagram = () => {
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

    const activityTotals = trainings.reduce((totals, training) => {
        const activity = training.activity;
        const duration = training.duration;

        if (!totals[activity]) {
            totals[activity] = 0;
        }

        totals[activity] += duration;
        return totals;
    }, {});

    const data = Object.keys(activityTotals).map(activity => ({
        activity,
        minutes: activityTotals[activity],
    }));

    return (
        <div>
            <h2>Activity Diagram</h2>
            <BarChart width={1300} height={400} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="activity" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="minutes" fill="#8884d8" />
            </BarChart>
        </div>
    )
}
export default ActivityDiagram;