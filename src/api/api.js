import axios from 'axios';

const api = () => {
    return axios.create({
        baseURL: process.env.REACT_APP_API_URL
    });
}

const listarEventos = async () => {
    const apiInstance = api();
    return await apiInstance.get('/eventos');
}

export default listarEventos;