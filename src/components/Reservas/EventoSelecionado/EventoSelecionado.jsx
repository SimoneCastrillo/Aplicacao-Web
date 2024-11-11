import { InputLabel, MenuItem, Select, TextField } from '@mui/material'
import styles from './EventoSelecionado.module.css'
import { useEffect, useState } from 'react';
import { listarDecoracoesPorEvento, editarOrcamento } from '../../../api/api';
import { toast } from 'react-toastify';
const EventoSelecionado = ({ reservaSelecionada }) => {
  const [decoracao, setDecoracao] = useState('');
  const [data, setData] = useState('');
  const [qtdConvidados, setQtdConvidados] = useState('');
  const [inicio, setInicio] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setReserva(reservaSelecionada);
    setDecoracao(reservaSelecionada.decoracao.id);
    setData(reservaSelecionada.dataEvento);
    setQtdConvidados(reservaSelecionada.qtdConvidados);
    setInicio(reservaSelecionada.inicio);
  },[reservaSelecionada])

  const [reserva, setReserva] = useState(reservaSelecionada);
  const [decoracoes, setDecoracoes] = useState([]);

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
  },[])

  const atulizarOrcamento = async () => {
    const orcamento = {
      "dataEvento": data,
      qtdConvidados,
      inicio,
      "sugestao": reserva.sugestao,
      "tipoEventoId": reserva.tipoEvento.id,
      "usuarioId": reserva.usuario.id,
      "decoracaoId": decoracao
    }
    setLoading(true);
    console.log(JSON.stringify(orcamento));
    await editarOrcamento(reserva.id ,orcamento)
    .then((response) => {
      setLoading(false);
      toast.success('Orçamento atualizado com sucesso!', {
        autoClose: 700,
      });
      console.log(response);
    }).catch((error) => {
      setLoading(false);
      toast.error('Erro ao atualizar orçamento!', {
        autoClose: 700,
      });
      console.log(error);
    })
  }

  const styleInput = {
            
    "& .MuiOutlinedInput-notchedOutline": { 
        borderRadius: "10px",
        backgroundColor: '#D9D9D933',
      },
    "& .MuiInputBase-input": {
      padding: "7px 10px",
    },
  }

  console.log(reservaSelecionada);
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
          <InputLabel className={styles.formInput}>Valor total</InputLabel>
          <TextField 
          sx={{
            "& .MuiOutlinedInput-notchedOutline": { 
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              borderBottom: 'none',
            },
            "& .MuiInputBase-input": {
              padding: "7px 10px",
              backgroundColor: '#D9D9D933',
            },
            "& .MuiInputBase-root": {
              borderRadius: "10px",
            }
          }}
          disabled={JSON.parse(sessionStorage.usuario).role !== 'ADMIN'}
          type='text' variant="outlined" />

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
