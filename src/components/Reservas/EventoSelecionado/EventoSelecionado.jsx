import { InputLabel, MenuItem, Select, TextField } from '@mui/material'
import styles from './EventoSelecionado.module.css'
import { useEffect, useState } from 'react';
import { listarDecoracoesPorEvento, editarOrcamento, confirmarDadosOrcamento } from '../../../api/api';
import { toast } from 'react-toastify';
import { NumericFormat } from 'react-number-format';

const EventoSelecionado = ({ reservaSelecionada }) => {
  const [reserva, setReserva] = useState(reservaSelecionada);
  const [decoracoes, setDecoracoes] = useState([]);

  const [decoracao, setDecoracao] = useState('');
  const [data, setData] = useState('');
  const [qtdConvidados, setQtdConvidados] = useState('');
  const [inicio, setInicio] = useState('');
  const [fim, setFim] = useState('');
  const [valorTotal, setValorTotal] = useState('');
  const [lucro, setLucro] = useState('');
  const [despesas, setDespesas] = useState('');
  const [pratoPrincipal, setPratoPrincipal] = useState('');
  const [saborBolo, setSaborBolo] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [userAdmin, setUserAdmin] = useState(false);
  useEffect(() => {
    if (reservaSelecionada) {
      setReserva(reservaSelecionada);
      setDecoracao(reservaSelecionada.decoracao?.id || '');
      setData(reservaSelecionada.dataEvento || '');
      setQtdConvidados(reservaSelecionada.qtdConvidados || 0);
      setInicio(reservaSelecionada.inicio || '');
      setFim(reservaSelecionada.fim || '');
      setValorTotal(reservaSelecionada.faturamento || 0);
      setLucro(reservaSelecionada.lucro || 0);
      setDespesas(reservaSelecionada.despesa || 0);
      setPratoPrincipal(reservaSelecionada.pratoPrincipal || '');
      setSaborBolo(reservaSelecionada.saborBolo || '');
    }
  }, [reservaSelecionada]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await listarDecoracoesPorEvento(reservaSelecionada.tipoEvento.nome);
        setDecoracoes(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
    if(JSON.parse(sessionStorage.usuario).role === 'ADMIN'){
      setUserAdmin(true);
    }
  },[])

  const atulizarOrcamento = async () => {
    let orcamento;

    if(userAdmin) {
      orcamento = {
        "dataEvento": data,
        qtdConvidados,
        inicio,
        fim,
        saborBolo,
        pratoPrincipal,
        lucro,
        "faturamento": valorTotal,
        "despesa": despesas,
        "sugestao": reserva.sugestao,
        "tipoEventoId": reserva.tipoEvento.id,
        "decoracaoId": decoracao
      };
    } else {
      orcamento = {
        "dataEvento": data,
        qtdConvidados,
        inicio,
        fim,
        saborBolo,
        pratoPrincipal,
        lucro,
        "faturamento": valorTotal,
        "despesa": despesas,
        "sugestao": reserva.sugestao,
        "tipoEventoId": reserva.tipoEvento.id,
        "usuarioId": JSON.parse(sessionStorage.usuario).id,
        "decoracaoId": decoracao
      };
    }

    
  
    console.log(orcamento);
    const acao = userAdmin ? confirmarDadosOrcamento : editarOrcamento;
  
    setLoading(true);
  
    await acao(reserva.id, orcamento)
      .then((response) => {
        setLoading(false);
        toast.success('Orçamento atualizado com sucesso!', {
          autoClose: 700,
        });
        console.log(response);
      })
      .catch((error) => {
        setLoading(false);
        toast.error('Erro ao atualizar orçamento!', {
          autoClose: 700,
        });
        console.log(error);
      });
  };

  useEffect(() => {
    setLucro(parseFloat(valorTotal - despesas));
  }, [valorTotal, despesas])
  

  const styleInput = {
            
    "& .MuiOutlinedInput-notchedOutline": { 
        borderRadius: "5px",
        backgroundColor: '#D9D9D933',
      },
    "& .MuiInputBase-input": {
      padding: "7px 10px",
    },
  }

  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.tituloEventoSelecionado}>
          {reservaSelecionada.tipoEvento.nome} {reservaSelecionada.usuario.nome}
        </h2>
        <h3 className={styles.dataEventoSelecionado}>
          {reservaSelecionada.dataEvento} às {reservaSelecionada.inicio}
        </h3>
      </div>
      <div className={styles.form}>
        <div >
        <InputLabel className={styles.formInput}>Decorações</InputLabel>
        <Select
          fullWidth
          sx={styleInput}
          id="decoracoes"
          value={decoracao}
          label="Decorações"
          onChange={(e) => setDecoracao(e.target.value)}
        >
        {decoracoes && decoracoes.map((decoracao) =>(
          <MenuItem key={decoracao.id} value={decoracao.id}>{decoracao.nome}</MenuItem>
        )  )}
        </Select>
        <InputLabel className={styles.formInput}>Início</InputLabel>
        <TextField fullWidth  
        sx={styleInput}
        type='time' variant="outlined"
        value={inicio} 
        onChange={(e) => setInicio(e.target.value)}
        />
        <InputLabel className={styles.formInput}>Fim</InputLabel>
          <TextField 
          sx={{
            ...( 
              !userAdmin && {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  borderBottom: "none",
                },
              }
            ),
            "& .MuiInputBase-input": {
              padding: "7px 10px",
              backgroundColor: "#D9D9D933",
            },
            "& .MuiInputBase-root": {
              borderRadius: "5px",
            },
          }}
          value={fim} 
          fullWidth       
          disabled={!userAdmin}
          onChange={(e) => setFim(e.target.value)}
          type='time' variant="outlined" />
          {userAdmin && (
            <>
            <InputLabel className={styles.formInput}>Valor total</InputLabel>
          <NumericFormat 
            className={styles.inputValor}
            value={valorTotal}
            onValueChange={(values) => setValorTotal(values.floatValue)}
            disabled={!userAdmin}
            thousandSeparator="."
            decimalSeparator=","
            prefix="R$ "
            decimalScale={2}
            type="text" 
            variant="outlined" 
            />

              <InputLabel className={styles.formInput}>Lucro</InputLabel>
              <NumericFormat 
            className={styles.inputValor}
            value={lucro}
            disabled={!userAdmin}
            thousandSeparator="."
            decimalSeparator=","
            prefix="R$ "
            decimalScale={2}
            type="text" 
            variant="outlined" 
            />
              
            </>
          )}
        </div>
        <div >
        <InputLabel className={styles.formInput}>Data</InputLabel>
        <TextField fullWidth  
        sx={styleInput}
        type='date' variant="outlined"
        value={data} 
        onChange={(e) => setData(e.target.value)}
        />
        
        <InputLabel className={styles.formInput}>Quantidade de convidados</InputLabel>
        <TextField 
        sx={styleInput}
        type='number' variant="outlined" value={qtdConvidados} 
        onChange={(e) => setQtdConvidados(e.target.value)}
        />
        {!userAdmin && (
          <>
          <InputLabel className={styles.formInput}>Valor total</InputLabel>
          <TextField 
          sx={{
            ...( 
              !userAdmin && {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  borderBottom: "none",
                },
              }
            ),
            "& .MuiInputBase-input": {
              padding: "7px 10px",
              backgroundColor: "#D9D9D933",
            },
            "& .MuiInputBase-root": {
              borderRadius: "5px",
            },
          }}
                    
          disabled={!userAdmin}
          type='text' variant="outlined" />
          </>
        )}
        {userAdmin && (
          <>
            <InputLabel className={styles.formInput}>Sabor do bolo</InputLabel>
            <TextField 
              sx={styleInput}
              value={saborBolo}
              onChange={(e) => setSaborBolo(e.target.value)}
              type='text' variant="outlined" 
            />
            <InputLabel className={styles.formInput}>Prato principal</InputLabel>
            <TextField 
              sx={styleInput}
              value={pratoPrincipal}
              onChange={(e) => setPratoPrincipal(e.target.value)}
              type='text' variant="outlined" 
            />
            <InputLabel className={styles.formInput}>Despesas</InputLabel>
            <NumericFormat 
            className={styles.inputValor}
            value={despesas}
            onValueChange={(values) => setDespesas(values.floatValue)}
            disabled={!userAdmin}
            thousandSeparator="."
            decimalSeparator=","
            prefix="R$ "
            decimalScale={2}
            type="text" 
            variant="outlined" 
            />
          </>
        )}
        </div>
      </div>
      <div className={styles.btnSalvar}>
      {!loading && <button onClick={atulizarOrcamento} className='btn-default-bgRosa-perfil'>Salvar</button>}
      {loading && <button disabled style={{cursor: 'not-allowed', opacity: '0.5'}} className='btn-default-bgRosa-perfil'>Carregando...</button>}

      </div>
    </div>
  );
};

export default EventoSelecionado;
