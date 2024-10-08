import styles from './Reservas.module.css'
import { BsCheck, BsClock, BsX } from 'react-icons/bs';
import pincel from '../../assets/Pencil.png'
import balao from '../../assets/CastrilloEventos (1) 1.png'
import { useState } from 'react';
const orcamento = [
  {
    id: 1,
    tipoDeEvento: "Casamento",
    nomeContratante: "João Silva",
    data: "2024-12-15",
    horarioInicio: "16:00",
    status: "Pendente"
  },
  {
    id: 2,
    tipoDeEvento: "Aniversário",
    nomeContratante: "Maria Oliveira",
    data: "2024-11-20",
    horarioInicio: "18:30",
    status: "Aprovado"
  },
  {
    id: 3,
    tipoDeEvento: "Corporate",
    nomeContratante: "Empresa XYZ",
    data: "2024-10-30",
    horarioInicio: "09:00",
    status: "Cancelado"
  },
  {
    id: 4,
    tipoDeEvento: "Formatura",
    nomeContratante: "Faculdade ABC",
    data: "2025-01-10",
    horarioInicio: "19:00",
    status: "Pendente"
  },
  {
    id: 5,
    tipoDeEvento: "Batizado",
    nomeContratante: "Ana Santos",
    data: "2024-11-05",
    horarioInicio: "10:00",
    status: "Aprovado"
  },
  {
    id: 6,
    tipoDeEvento: "Festa Infantil",
    nomeContratante: "Carlos Souza",
    data: "2024-12-20",
    horarioInicio: "15:00",
    status: "Cancelado"
  },
  {
    id: 7,
    tipoDeEvento: "Conferência",
    nomeContratante: "Tech Group",
    data: "2024-10-15",
    horarioInicio: "08:30",
    status: "Aprovado"
  },
  {
    id: 8,
    tipoDeEvento: "Chá de Bebê",
    nomeContratante: "Juliana Pereira",
    data: "2024-12-08",
    horarioInicio: "14:00",
    status: "Cancelado"
  }
];

const Reservas = () => {
  const [reservaSelecionada, setReservaSelecionada] = useState('');
  return (
    <div>
        <div className={styles.containerHeader}>
           <h1 className='titulo-perfil'>Minhas reservas</h1>
           <button  className='btn-default-bgRosa-perfil'>Novas reservas</button>
        </div>
        <div className={styles.containerReservas}>
            <div className={styles.listaDeReservas}>
              <ul>
                {orcamento.map((item) => (
                  <button onClick={()=>{
                    setReservaSelecionada(item);
                  }}
                  disabled={item.status === "Cancelado"}
                  style={{cursor: item.status === "Cancelado" ? 'not-allowed' : 'pointer'}}
                  >
                    <li key={item.id}>
                      <div style={{display: 'flex', gap: '20px', width: '45%'}}>
                      {item.status === "Pendente" && <BsClock className={styles.thickIcon}  />}
                      {item.status === "Aprovado" && <BsCheck strokeWidth={1} className={styles.thickIcon} />}
                      {item.status === "Cancelado" && <BsX strokeWidth={1} className={styles.thickIcon} />}
                      <p >{item.tipoDeEvento} {item.nomeContratante}</p>
                      </div>
                      <p>{item.data}</p>
                      {item.status !== "Cancelado" && (<div className={styles.acaoReserva}>
                        <button><img src={pincel} alt="editar" width={'18px'}/></button>
                        <button><BsX size={16} className={styles.cancelarEvento}/></button>
                      </div>) }
                      {item.status === "Cancelado" && (<div className={styles.acaoReserva}>
                        <button disabled style={{cursor: 'not-allowed'}}><img src={pincel} className={styles.coloredIcon}  alt="editar" width={'18px'}/></button>
                        <button disabled style={{cursor: 'not-allowed'}}><BsX size={16} className={styles.cancelado}/></button>
                      </div>) }
                  </li>
                  </button>
                ))}
              </ul>
            </div>
            <div className={styles.visualizacaoReserva}>
                {reservaSelecionada === '' && (
                  <div className={styles.semReservaSelecionada}>
                    <img src={balao} alt="" />
                    <h3>Selecione uma Reserva para visualizar as informações aqui</h3>
                  </div>
                )}
                {reservaSelecionada !== '' && (
                  <div>
                    <h2>{reservaSelecionada.tipoDeEvento}  {reservaSelecionada.nomeContratante}</h2>
                    <h3>{reservaSelecionada.data} ás {reservaSelecionada.horarioInicio}</h3>
                    <p>Nome do Contratante: {reservaSelecionada.nomeContratante}</p>
                    <p>Tipo de Evento: {reservaSelecionada.tipoDeEvento}</p>
                    <p>Data: {reservaSelecionada.data}</p>
                    <p>Status: {reservaSelecionada.status}</p>
                  </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default Reservas
