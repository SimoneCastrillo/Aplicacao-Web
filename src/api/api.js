import axios from 'axios';

const api = () => {
    return axios.create({
        baseURL: process.env.REACT_APP_API_URL
    });
}

const listarTipoEventosPorBuffet = async () => {
    const apiInstance = api();
  
    return await apiInstance.get('/tipos-evento', {
        params:{
            buffetId: process.env.REACT_APP_BUFFET_ID
        }
})}
const listarDecoracoesPorEvento = async (tipoEventoId) => {
    const apiInstance = api();
    return await apiInstance.get('/decoracoes/tipo-de-evento', {
        params: {
            tipoEventoId
        }});
}
const buscarBuffetPorId = async () => {
    const apiInstance = api();
    const token = sessionStorage.getItem('token');
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
    };
    return await apiInstance.get(`/enderecos`, {headers});
}
const criarUsuario = async (usuario) => {
    const apiInstance = api();
    return await apiInstance.post(`/usuarios/${process.env.REACT_APP_BUFFET_ID}`, usuario, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
const logar = async (usuario) => {
    const apiInstance = api();
    return await apiInstance.post(`/usuarios/login/${process.env.REACT_APP_BUFFET_ID}`, usuario, {
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
const criarAvaliacao = async (avaliacao) => {
    const apiInstance = api();

    const token = sessionStorage.getItem('token');

    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
    };

    return await apiInstance.post(`/avaliacoes`, avaliacao, { headers });
}

const atualizarAvaliacao = async (avaliacao, id) => {
    const apiInstance = api();

    const token = sessionStorage.getItem('token');

    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
    };

    return await apiInstance.put(`/avaliacoes/${id}`, avaliacao, { headers });
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
        }
    });
}
const criarOrcamento = async (orcamento) => {
    const apiInstance = api();
    const token = sessionStorage.getItem('token');

    return await apiInstance.post('/orcamentos', orcamento, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
}
const todosOrcamentos = async () => {
    const apiInstance = api();
    const token = sessionStorage.getItem('token');

    return await apiInstance.get(`/orcamentos`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
}
const orcamentosPorIdDoUuario = async () => {
    const apiInstance = api();
    const token = sessionStorage.getItem('token');

    return await apiInstance.get(`/orcamentos/usuario/${JSON.parse(sessionStorage.usuario).id}`, {
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

        return await apiInstance.put(`/orcamentos/${id}`, orcamento, {
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

    return await apiInstance.get(`/admin/dashboard/percentual-cancelados/${process.env.REACT_APP_BUFFET_ID}` , {
        headers: {
            'Authorization': `Bearer ${token}`, 
        },
    });
}
const resumoFinanceiro = async () => {
    const apiInstance = api();
    const token = sessionStorage.getItem('token');

    return await apiInstance.get(`/admin/dashboard/resumo-financeiro/${process.env.REACT_APP_BUFFET_ID}` , {
        headers: {
            'Authorization': `Bearer ${token}`, 
        },
    });
}
const listarTodasAvaliacoes = async () => {
    const apiInstance = api();
    const token = sessionStorage.getItem('token');

    return await apiInstance.get(`/avaliacoes`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })

}

const criarDecoracao = async (decoracao, tipoEvendoId, buffetId) => {
    const apiInstance = api();

    const token = sessionStorage.getItem('token');

    const params = {
        tipoEvendoId,
        buffetId
    }
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
    };

    return await apiInstance.post(`/decoracoes`, decoracao, { params ,headers });
}

const atualizarDecoracao = async (decoracao, id) => {
    const apiInstance = api();

    const token = sessionStorage.getItem('token');

    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
    };
    return await apiInstance.put(`/decoracoes/${id}`, decoracao, { headers });
}

const listarTodasDecoracoes = async () => {
    const apiInstance = api();
    const token = sessionStorage.getItem('token');

    return await apiInstance.get(`/decoracoes`, {
        params: {
            buffetId: process.env.REACT_APP_BUFFET_ID
        },
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })

}

const deleteDecoracoes = async (id) => {
    const apiInstance = api();
    const token = sessionStorage.getItem('token');

    return await apiInstance.delete(`/decoracoes/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
}

const deleteAvaliacoes = async (id) => {
    const apiInstance = api();
    const token = sessionStorage.getItem('token');

    return await apiInstance.delete(`/avaliacoes/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
}

const lucroPorTipoDeEvento1 = async () => {
    const apiInstance = api();
    const token = sessionStorage.getItem('token');

    return await apiInstance.get(`/admin/dashboard/lucro-por-tipo-evento/${process.env.REACT_APP_BUFFET_ID}` , {
        headers: {
            'Authorization': `Bearer ${token}`, 
        },
    });
}
const qtdPorMes = async () => {
    const apiInstance = api();
    const token = sessionStorage.getItem('token');

    return await apiInstance.get(`/admin/dashboard/quantidade-por-mes/${process.env.REACT_APP_BUFFET_ID}` , {
        headers: {
            'Authorization': `Bearer ${token}`, 
        },
    });
}
const faturamentDespesaMes = async () => {
    const apiInstance = api();
    const token = sessionStorage.getItem('token');

    return await apiInstance.get(`/admin/dashboard/faturamento-despesa-por-mes/${process.env.REACT_APP_BUFFET_ID}` , {
        headers: {
            'Authorization': `Bearer ${token}`, 
        },
    });
}
const tipoEventoContagem = async () => {
    const apiInstance = api();
    const token = sessionStorage.getItem('token');

    return await apiInstance.get(`/admin/dashboard/tipo-evento-contagem/${process.env.REACT_APP_BUFFET_ID}` , {
        
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
    
    listarTodasAvaliacoes,
    deleteAvaliacoes,
    criarAvaliacao,
    atualizarDecoracao,
    deleteDecoracoes,
    criarDecoracao,
    listarTipoEventosPorBuffet,
    resumoFinanceiro,
    atualizarCalendario,
    lucroPorTipoDeEvento1,
    downloadCSV,
    tipoEventoContagem,
    percentualCancelados,
    listarDecoracoesPorEvento, 
    buscarBuffetPorId,
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
    listarTodasDecoracoes,
    atualizarAvaliacao,
    editarOrcamento
};