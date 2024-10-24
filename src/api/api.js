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
const criarUsuario = async (usuario) => {
    const apiInstance = api();
    return await apiInstance.post('/usuarios', usuario, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}
const logar = async (usuario) => {
    const apiInstance = api();
    return await apiInstance.post('/usuarios/login', usuario);
}
const atualizarUsuario = async (id, usuario) => {
    const apiInstance = api();

    const token = sessionStorage.getItem('token');

    const headers = {
        
        'Authorization': `Bearer ${token}`, 
    };

    return await apiInstance.put(`/usuarios/${id}`, usuario, { headers });
}

export  { listarDecoracoesPorEvento, criarUsuario, logar, atualizarUsuario };