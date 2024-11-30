import styles from './Reservas.module.css'
import { BsCheck, BsClock, BsX, BsCheckCircle } from 'react-icons/bs';
import pincel from '../../assets/Pencil.png'
import balao from '../../assets/CastrilloEventos (1) 1.png'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import loadingGift from '../../assets/loading-gif.gif'
import EventoSelecionado from './EventoSelecionado/EventoSelecionado';
import {orcamentosPorIdDoUuario, cancelarOrcamento, downloadCSV ,todosOrcamentos, aceitarOrcamento} from '../../api/api'	
import { toast } from 'react-toastify';


const MinhasReservas = ({onCancelarReserva, openModalCacelarReserva, onSetCancelarReserva}) => {
  const [orcamento, setOrcamento] = useState([]);
  const [reservaSelecionada, setReservaSelecionada] = useState('');
  const [idCancelar, setIdCancelar] = useState('');
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('Todos');
  const [resultadosFiltros, setResultadosFiltros] = useState([]);


  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        let response;
        if(JSON.parse(sessionStorage.usuario).role === "ADMIN"){
            setAdmin(true);
            response = await todosOrcamentos();
        }else {
          response = await orcamentosPorIdDoUuario();
        }
        
        setLoading(false)
        setOrcamento(response.data);
        setResultadosFiltros(response.data);

        console.log(response.data);
      } catch (error) {
        setLoading(false)
        console.log(error);
      }
    };
    console.log(admin)
    fetchData(); 
  }, []);
  const downloadDoCsv = async () => {
    console.log('chamando');
    
    try {
      const response = await downloadCSV();
      console.log(response);
      
      const csvContent = response.data;
      
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      
      link.download = 'dados.csv';
      
      link.click();
    } catch (error) {
      console.log('Erro ao baixar CSV:', error);
    }
  };
  
  useEffect(()=> {
    if(filtro === 'Pendentes'){
      setResultadosFiltros(orcamento.filter((item) => item.status === 'PENDENTE'))
    }else if(filtro === 'Abertos'){
      setResultadosFiltros(orcamento.filter((item) => item.status === 'CONFIRMADO'))
    }else if(filtro === 'Todos'){
      setResultadosFiltros(orcamento)
    }
    
  },[filtro])

  useEffect(()=>{
    setLoading(true)
    const handleCancelarReserva = async (id) => {
      let response;
      try {
        await cancelarOrcamento(id)
        .then((response) => {
          toast.success('Reserva cancelada com sucesso!', {
            autoClose: 700,
          });
  
        })
        .catch((error) => {
          toast.error('Erro ao cancelar reserva!', {
            autoClose: 700,
          })
          console.error(error)
  
        })
        if(!admin){
          response = await orcamentosPorIdDoUuario();
        }else {
          response = await todosOrcamentos();
        }
        setLoading(false)

        setOrcamento(response.data);
      } catch (error) {
        setLoading(false)

        console.log(error);
      }
    }
    if(onCancelarReserva === true){
      handleCancelarReserva(idCancelar);
    }
    onSetCancelarReserva()
  },[onCancelarReserva])
 
  const handleAceitarOrcamento = async (id) => {
    setLoading(true)
    await aceitarOrcamento(id)
    .then((response) => {
      toast.success('Orçamento aceito com sucesso!', {
        autoClose: 700,
      });
      setLoading(false)
    })
    .catch((error) => {
      toast.error('Erro ao aceitar orçamento!', {
        autoClose: 700,
      })
      setLoading(false)
    });
    await todosOrcamentos()
  }
  return (
    <div>
        <div className={styles.containerHeader}>
           <h1 className='titulo-perfil'>{admin ? "Reservas" : "Minhas reservas"}</h1>
          {!admin && <Link to='/solicitar-orcamento' className='btn-default-bgRosa-perfil'>Novo Orçamento</Link>}
          {admin && (
            <div style={{display: 'flex', gap: '10px' }}>
              <button onClick={()=>downloadDoCsv()} className={styles.btnFiltro}>Download CSV</button>
              <button onClick={()=>setFiltro('Pendentes')} className={styles.btnFiltro}>Orçamentos Pendentes</button>
              <button onClick={()=>setFiltro('Abertos')} className={styles.btnFiltro}>Orçamentos Abertos</button>
              <button onClick={()=>setFiltro('Todos')} className={styles.btnFiltro}>Todos Orçamentos</button>
            </div>
          )}
        </div>
        {loading && <div style={{textAlign: 'center'}}>
          <img src={loadingGift} width={50} alt='loading' />
          </div>}
        {!loading && (
          <div className={styles.containerReservas}>
          <div className={styles.listaDeReservas}>
            <ul>
              {resultadosFiltros && resultadosFiltros.map((item) => (
                <div 
                key={item.id}
                >
                  <li>
                    <div className={styles.colIconName}>
                    {item.status === "PENDENTE" && <BsClock  strokeWidth={1.1} className={styles.thickIcon}  />}
                    {item.status === "CONFIRMADO" && <BsCheck strokeWidth={1} className={styles.thickIcon} />}
                    {item.status === "CANCELADO" && <BsX strokeWidth={1} className={styles.thickIcon} color='#c9c9c9' />}
                    <button
                    disabled={item.status === "CANCELADO" ? true : false}
                    style={{cursor: item.status === "CANCELADO" ? 'not-allowed' : 'pointer'}}
                    onClick={()=>{
                      setReservaSelecionada(item);
                    }} 
                    className={item.status === "CANCELADO" ? styles.canceladoText : ''} >{item.tipoEvento.nome} {item.usuario.nome}</button>
                    </div>
                    <p className={item.status === "CANCELADO" ? styles.canceladoText : ''}>{item.dataEvento}</p>
                    {item.status !== "CANCELADO" && (<div className={styles.acaoReserva}>
                      
                      <button onClick={()=>{
                        setReservaSelecionada(item);
                      }}><img src={pincel} alt="editar" width={'18px'}/></button>
                      {admin && item.status === "PENDENTE" &&
                      (
                        <button onClick={()=>{
                          handleAceitarOrcamento(item.id)
                        }} style={{padding: '5px'}}><BsCheckCircle size={18} color='green'/></button>
                      )
                      }
                      <button onClick={()=>{
                        openModalCacelarReserva()
                        setIdCancelar(item.id);
                      }} ><BsX size={16} className={styles.cancelarEvento}/></button>
                    </div>) }
                    {item.status === "CANCELADO" && (<div className={styles.acaoReserva}>
                      <button disabled style={{cursor: 'not-allowed'}}><img src={pincel} className={styles.coloredIcon}  alt="editar" width={'18px'}/></button>
                      <button disabled style={{cursor: 'not-allowed'}}><BsX size={16} className={styles.cancelado}/></button>
                    </div>) }
                </li>
                </div>
              ))}
            </ul>
          </div>
          <div className={styles.visualizacaoReserva} 
          style={{backgroundColor: reservaSelecionada === '' ? '#F9F9F9' : '#fff'}}
          >
              {reservaSelecionada === '' && (
                <div className={styles.semReservaSelecionada}>
                  <img src={balao} alt="" />
                  <h3>Selecione uma Reserva para visualizar as informações aqui</h3>
                </div>
              )}
              {reservaSelecionada !== '' && (
                <EventoSelecionado reservaSelecionada={reservaSelecionada} />
              )}
          </div>
      </div>
        )}
    </div>
  )
}

export default MinhasReservas
