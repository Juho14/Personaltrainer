export const fetchCustomers = () => {
  return fetch(import.meta.env.VITE_API_URL + '/customers')
    .then(response => {
      if (!response.ok)
        throw new Error("Something went wrong: " + response.statusText);

      return response.json();
    })
    .then(data => {
      if (data && Array.isArray(data.content)) {
        return data.content;
      } else {
        throw new Error("Invalid data format received");
      }
    })
    .catch(err => console.error(err));
}

export const fetchSpecificCustomer = (link) => {
  return fetch(link)
    .then(response => {
      if (!response.ok)
        throw new Error("Something went wrong: " + response.statusText);

      return response.json();
    })
    .then(data => {
      if (data && Array.isArray(data.content)) {
        return data.content;
      } else {
        throw new Error("Invalid data format received");
      }
    })
    .catch(err => console.error(err));
}


export const saveCustomer = (customer) => {
  return fetch(import.meta.env.VITE_API_URL + '/customers', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(customer)
  })
    .then(response => {
      if (!response.ok)
        throw new Error("Addition failed: " + response.statusText);

      return response.json();
    })
    .catch(err => console.error(err))
}

export const updateCustomers = (customer, link) => {
  return fetch(link, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(customer)
  })
      .then(response => {
          if (!response.ok)
              throw new Error("Error in edit: " + response.statusText);

          return response.json();
      })
      .then(data => {
          console.log("Updated customer data:", data);
          return data;
      })
      .catch(err => console.error(err));
};



export const deleteCustomer = (url) => {
  return fetch(url, {
    method: 'DELETE'
  })
    .then(response => {
      if (!response.ok)
        throw new Error("Error in delete: " + response.statusText);
    })
    .catch(err => console.error(err))
}