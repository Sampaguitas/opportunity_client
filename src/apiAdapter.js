let API_URL

process.env.REACT_APP_STAGE === 'dev'
    ? API_URL = 'http://localhost:5000'
    : API_URL = 'https://opportunity-server.herokuapp.com'

export function getIndustries() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    return fetch(`${API_URL}/industry/findAll`, requestOptions).then(handleResponse);
}

export function getTerritories() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    return fetch(`${API_URL}/territory/findAll`, requestOptions).then(handleResponse);
}

export function createOpportunity(opportunity) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(opportunity)
    };
    return fetch(`${API_URL}/opportunity/create`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}