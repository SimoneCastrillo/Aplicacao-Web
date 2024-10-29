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
          'Content-Type': 'application/json',
        },
      });
}
const logar = async (usuario) => {
    const apiInstance = api();
    return await apiInstance.post('/usuarios/login', usuario, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
const atualizarUsuario = async (id, usuario) => {
    const apiInstance = api();
    
    const token = sessionStorage.getItem('token');

    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`, 
    };

    return await apiInstance.patch(`/usuarios/${id}`, usuario, { headers });
}
const buscarUsuario = async (id) => {
    const apiInstance = api();
    const token = sessionStorage.getItem('token');
    const headers = {
        'Authorization': `Bearer ${token}`, 
    };
    return await apiInstance.get(`/usuarios/${id}`, { headers });
}
const ultimas5avalaicoes = async () => {
    const apiInstance = api();
    return await apiInstance.get('/avaliacoes/ultimos');
}
const avaliacoesPorTipoDeEvento = async (tipoDeEvento) => {
    const apiInstance = api();
    return await apiInstance.get('/avaliacoes/tipo-de-evento', {
        params: {
            nome: tipoDeEvento
        }});
}
const criarOrcamento = async (orcamento) => {
    const apiInstance = api();
    const token = sessionStorage.getItem('token');

    return await apiInstance.post('/orcamentos', orcamento , {
        headers: {
            'Authorization': `Bearer ${token}`, 
        },
    });
}

export  { listarDecoracoesPorEvento, criarUsuario, logar, atualizarUsuario, buscarUsuario, ultimas5avalaicoes, avaliacoesPorTipoDeEvento, criarOrcamento };