import { baseURL, apiKey, endPoint } from './config';

const fetchAPI = (apiName, method, queryParam, payLoad) => {
    const url = `${baseURL}${endPoint[apiName]}?apiKey=${apiKey}&${queryParam}`
    return fetch(url, {
        method: method,
        body: payLoad
    });
}

export default fetchAPI;