import axios from 'axios';

const api = () => {
    return axios.create({
        baseURL: process.env.REACT_APP_API_URL
    });
}

const listarDecoracoesPorEvento = async (nome) => {
    const apiInstance = api();
    return await apiInstance.get('/decoracoes/tipo-de-evento', {
        params: {
            nome
        }});
}
export  { listarDecoracoesPorEvento };