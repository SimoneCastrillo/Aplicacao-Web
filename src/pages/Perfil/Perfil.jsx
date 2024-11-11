import { useEffect, useState } from 'react';
import HeaderPerfil from '../../components/headerPerfil/HeaderPerfil'
import styles from './Perfil.module.css'
import Reservas from '../../components/Reservas/Reservas';
import MeusDados from '../../components/MeusDados/MeusDados';
import ModalFoto from '../../components/MeusDados/modalFoto/ModalFoto';
import ModalCancelarEditar from '../../components/MeusDados/modalCancelarEditar/ModalCancelarEditar';
import Calendario from '../../components/Calendario/Calendario';
import ModalCancelarReserva from '../../components/Reservas/ModalCancelarReserva/ModalCancelarReserva';

const Perfil = () => {
    const [modalFoto, setModalFoto] = useState(false);
    const [img, setImg] = useState('');

    const [modalCancelarEdit, setModalCancelarEdit] = useState(false);
    const [descartarAlteracoes, setDescartarAlteracoes] = useState(false);

    const [modalCancelarReserva, setModalCancelarReserva] = useState(false);
    const [cancelarReserva, setCancelarReserva] = useState(false);

    const [nomeUser, setNomeUser] = useState('');
    const [componenteParaExibir, setComponenteParaExibir] = useState('meus-dados');
    const [userRole, setUserRole] = useState('normal');

    const handleEscolherComponente = (componente) => {
    setComponenteParaExibir(componente);
    }

  return (
    <div className={styles.container}>
      {modalFoto && <ModalFoto onSetImg={setImg} onFoto={img} onCloseModalFoto={() => setModalFoto(false)}/>}
      {modalCancelarEdit && <ModalCancelarEditar onCloseModalEdit={() => setModalCancelarEdit(false)} onSetDescartarAlteracoes={setDescartarAlteracoes}/>}
      {modalCancelarReserva && <ModalCancelarReserva onCloseModalReserva={() => setModalCancelarReserva(false)} onSetCancelarReserva={setCancelarReserva}/>}
      <HeaderPerfil componenteAtivo={componenteParaExibir} onNomeUser={nomeUser} onEscolherComponente={handleEscolherComponente} onUserRole={userRole} />
      <div className={styles.box}>
        {componenteParaExibir === 'minhas-reservas' && <Reservas onCancelarReserva={cancelarReserva} openModalCacelarReserva={()=> setModalCancelarReserva(true)}/>}
        {componenteParaExibir === 'meus-dados' && <MeusDados onImg={img} 
        onSetImg={setImg} 
        onSetNomeUser={setNomeUser} 
        onSetUserRole={setUserRole}
        onOpenModalCancelarEditar={()=>setModalCancelarEdit(true)} onOpenModalFoto={()=> setModalFoto(true)} 
        onDescartarAlteracoes={descartarAlteracoes}
         />}
        {componenteParaExibir === 'calendario' && <Calendario/>}
      </div>
      
    </div>
  )
}

export default Perfil
