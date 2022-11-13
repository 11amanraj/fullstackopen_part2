import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject);
    return request.then(response => response.data);
}

const deleteContact = (id) => {
    // return axios.delete(`${baseUrl}/${id}`);
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => console.log('success'));
}

const contactServices = { getAll, create, deleteContact };

export default contactServices;