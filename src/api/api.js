import axios from 'axios';

const api = () => {
    return axios.create({
        baseURL: process.env.REACT_APP_API_URL
    });
}

const listarDecoracoesPorEvento = async (tipoEventoId) => {
    const apiInstance = api();
    return await apiInstance.get('/decoracoes/tipo-de-evento', {
        params: {
            tipoEventoId
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
const todosOrcamentos = async () => {
    const apiInstance = api();
    const token = sessionStorage.getItem('token');

    return await apiInstance.get(`/orcamentos` , {
        headers: {
            'Authorization': `Bearer ${token}`, 
        },
    });
}
const orcamentosPorIdDoUuario = async () => {
    const apiInstance = api();
    const token = sessionStorage.getItem('token');

    return await apiInstance.get(`/orcamentos/usuario/${JSON.parse(sessionStorage.usuario).id}` , {
        headers: {
            'Authorization': `Bearer ${token}`, 
        },
    });
}
const cancelarOrcamento = async (id) => {
    const apiInstance = api();
    const token = sessionStorage.getItem('token');

    return await apiInstance.patch(`/orcamentos/${id}/cancelamento`,null, {
        headers: {
            'Authorization': `Bearer ${token}`, 
        },
    });
}
const aceitarOrcamento = async (id) => {
    const apiInstance = api();
    const token = sessionStorage.getItem('token');

    return await apiInstance.patch(`/orcamentos/${id}/confirmar`, null, {
        headers: {
            'Authorization': `Bearer ${token}`, 
        },
    });
}
const editarOrcamento = async (id, orcamento) => {
    const apiInstance = api();
    const token = sessionStorage.getItem('token');

    return await apiInstance.put(`/orcamentos/${id}`, orcamento , {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
}
const confirmarDadosOrcamento = async (id, orcamento) => {
    const apiInstance = api();
    const token = sessionStorage.getItem('token');

    return await apiInstance.put(`orcamentos/${id}/confirmar-dados`, orcamento , {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
}
const percentualCancelados = async () => {
    const apiInstance = api();
    const token = sessionStorage.getItem('token');

    return await apiInstance.get(`/admin/dashboard/percentual-cancelados` , {
        headers: {
            'Authorization': `Bearer ${token}`, 
        },
    });
}
const resumoFinanceiro = async () => {
    const apiInstance = api();
    const token = sessionStorage.getItem('token');

    return await apiInstance.get(`/admin/dashboard/resumo-financeiro` , {
        headers: {
            'Authorization': `Bearer ${token}`, 
        },
    });
}

const lucroPorTipoDeEvento1 = async () => {
    const apiInstance = api();
    const token = sessionStorage.getItem('token');

    return await apiInstance.get(`/admin/dashboard/lucro-por-tipo-evento` , {
        headers: {
            'Authorization': `Bearer ${token}`, 
        },
    });
}
const qtdPorMes = async () => {
    const apiInstance = api();
    const token = sessionStorage.getItem('token');

    return await apiInstance.get(`/admin/dashboard/quantidade-por-mes` , {
        headers: {
            'Authorization': `Bearer ${token}`, 
        },
    });
}
const faturamentDespesaMes = async () => {
    const apiInstance = api();
    const token = sessionStorage.getItem('token');

    return await apiInstance.get(`/admin/dashboard/faturamento-despesa-por-mes` , {
        headers: {
            'Authorization': `Bearer ${token}`, 
        },
    });
}
const tipoEventoContagem = async () => {
    const apiInstance = api();
    const token = sessionStorage.getItem('token');

    return await apiInstance.get(`/admin/dashboard/tipo-evento-contagem` , {
        headers: {
            'Authorization': `Bearer ${token}`, 
        },
    });
}
const downloadCSV = async () => {
    const apiInstance = api();
    const token = sessionStorage.getItem('token');

    return await apiInstance.get(`/csv/download` , {
        headers: {
            'Authorization': `Bearer ${token}`, 
        },
    });
}

const atualizarCalendario = async () => {
    const apiInstance = api();
    const token = sessionStorage.getItem('token');

    return await apiInstance.patch(
        `/orcamentos/atualizar-status-expirados`,
        {}, 
        {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        }
    );
};
export  { 
    resumoFinanceiro,
    atualizarCalendario,
    lucroPorTipoDeEvento1,
    downloadCSV,
    tipoEventoContagem,
    percentualCancelados,
    listarDecoracoesPorEvento, 
    criarUsuario, 
    logar, 
    qtdPorMes,
    faturamentDespesaMes,
    todosOrcamentos,
    confirmarDadosOrcamento,
    atualizarUsuario, 
    buscarUsuario, 
    ultimas5avalaicoes, 
    avaliacoesPorTipoDeEvento, 
    criarOrcamento, 
    orcamentosPorIdDoUuario,
    aceitarOrcamento,
    cancelarOrcamento,
    editarOrcamento
 };