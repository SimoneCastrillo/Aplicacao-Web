import styles from './Reservas.module.css'
import { BsCheck, BsClock, BsX } from 'react-icons/bs';
import pincel from '../../assets/Pencil.png'
import balao from '../../assets/CastrilloEventos (1) 1.png'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EventoSelecionado from './EventoSelecionado/EventoSelecionado';
import {orcamentosPorIdDoUuario, deletarOrcamento} from '../../api/api'	


const MinhasReservas = ({onCancelarReserva, openModalCacelarReserva}) => {
  const [orcamento, setOrcamento] = useState([]);
  const [reservaSelecionada, setReservaSelecionada] = useState('');
  const [idCancelar, setIdCancelar] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await orcamentosPorIdDoUuario();
        setOrcamento(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData(); 
  }, []);

  useEffect(()=>{
    // console.log(onCancelarReserva);
    const handleCancelarReserva = async (id) => {
      try {
        await deletarOrcamento(id);
        const response = await orcamentosPorIdDoUuario();
        setOrcamento(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    if(onCancelarReserva === true){
      handleCancelarReserva(idCancelar);
    }
  },[onCancelarReserva])
 

  return (
    <div>
        <div className={styles.containerHeader}>
           <h1 className='titulo-perfil'>Minhas reservas</h1>
           <Link to='/solicitar-orcamento' className='btn-default-bgRosa-perfil'>Novas reservas</Link>
        </div>
        <div className={styles.containerReservas}>
            <div className={styles.listaDeReservas}>
              <ul>
                {orcamento && orcamento.map((item) => (
                  <div 
                  key={item.id}
                  >
                    <li>
                      <div  className={styles.colIconName}>
                      {item.status === "PENDENTE" && <BsClock strokeWidth={1.1} className={styles.thickIcon}  />}
                      {item.status === "ABERTO" && <BsCheck strokeWidth={1} className={styles.thickIcon} />}
                      {item.status === "CANCELADO" && <BsX strokeWidth={1} className={styles.thickIcon} color='#c9c9c9' />}
                      <button
                      onClick={()=>{
                        setReservaSelecionada(item);
                      }} 
                      className={item.status === "CANCELADO" ? styles.canceladoText : ''} >{item.tipoEvento.nome} {item.usuario.nome}</button>
                      </div>
                      <p className={item.status === "Cancelado" ? styles.canceladoText : ''}>{item.dataEvento}</p>
                      {item.status !== "Cancelado" && (<div className={styles.acaoReserva}>
                        <button onClick={()=>{
                          setReservaSelecionada(item);
                        }}><img src={pincel} alt="editar" width={'18px'}/></button>
                        <button onClick={()=>{
                          openModalCacelarReserva()
                          setIdCancelar(item.id);
                        }} ><BsX size={16} className={styles.cancelarEvento}/></button>
                      </div>) }
                      {item.status === "Cancelado" && (<div className={styles.acaoReserva}>
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
    </div>
  )
}

export default MinhasReservas
