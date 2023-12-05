export const fetchTrainings = () => {
    return fetch(import.meta.env.VITE_CUSTOMERTRAININGS_URL)
        .then(response => {
            if (!response.ok)
                throw new Error("Something went wrong: " + response.statusText);

            return response.json();
        })
        .catch(err => console.error(err))
}

export const saveTraining = (training, customerHref) => {
    const trainingWithCustomer = {
        ...training,
        customer: customerHref,
    };

    return fetch(import.meta.env.VITE_API_URL + '/trainings', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(trainingWithCustomer),
    })
        .then(response => {
            if (!response.ok)
                throw new Error("Addition failed: " + response.statusText);

            return response.json();
        })
        .catch(err => console.error(err));
}


export const updateTrainings = (training, url) => {
    return fetch(url, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(training)
    })
        .then(response => {
            if (!response.ok)
                throw new Error("Error in edit: " + response.statusText);

            return response.json();
        })
        .catch(err => console.error(err))
}

export const deleteTraining = (url) => {
    return fetch(url, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok)
                throw new Error("Error in delete: " + response.statusText);
        })
        .catch(err => console.error(err))
}