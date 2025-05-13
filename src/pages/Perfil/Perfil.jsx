import { useEffect, useState } from 'react';
import HeaderPerfil from '../../components/headerPerfil/HeaderPerfil'
import styles from './Perfil.module.css'
import Reservas from '../../components/Reservas/Reservas';
import MeusDados from '../../components/MeusDados/MeusDados';
import ModalFoto from '../../components/MeusDados/modalFoto/ModalFoto';
import ModalCancelarEditar from '../../components/MeusDados/modalCancelarEditar/ModalCancelarEditar';
import Calendario from '../../components/Calendario/Calendario';
import ModalCancelarReserva from '../../components/Reservas/ModalCancelarReserva/ModalCancelarReserva';
import DecoracoesEdicao from '../../components/DecoracoesEdicao/DecoracoesEdicao';
import Metricas from '../../components/Metricas/Metricas';
import { useParams } from 'react-router-dom';


const Perfil = () => {
  const [modalFoto, setModalFoto] = useState(false);
  const [img, setImg] = useState('');

  const [modalCancelarEdit, setModalCancelarEdit] = useState(false);
  const [descartarAlteracoes, setDescartarAlteracoes] = useState(false);

  const [modalCancelarReserva, setModalCancelarReserva] = useState(false);
  const [cancelarReserva, setCancelarReserva] = useState(false);

  const [nomeUser, setNomeUser] = useState('');
  const { abaPerfil } = useParams();
  const [userRole, setUserRole] = useState('USUARIO');

  useEffect(()=>{
    setUserRole(JSON.parse(sessionStorage.getItem('usuario')).role)
    setImg(sessionStorage.getItem('img') === 'null' ? '' : sessionStorage.getItem('img'))
    setNomeUser(JSON.parse(sessionStorage.getItem('usuario')).nome)
  },[])

  return (
    <div
      className={styles.container}
      style={abaPerfil === 'metricas' ? { backgroundColor: '#EEEEEE', important: true } : {}}
    >
      {modalFoto && <ModalFoto onSetImg={setImg} onFoto={img} onCloseModalFoto={() => setModalFoto(false)} />}
      {modalCancelarEdit && <ModalCancelarEditar onCloseModalEdit={() => setModalCancelarEdit(false)} onSetDescartarAlteracoes={setDescartarAlteracoes} />}
      {modalCancelarReserva && <ModalCancelarReserva onCloseModalReserva={() => setModalCancelarReserva(false)} onSetCancelarReserva={setCancelarReserva} />}
      <HeaderPerfil componenteAtivo={abaPerfil} onNomeUser={nomeUser} onUserRole={userRole} />
      <div
        style={
          abaPerfil === 'metricas'
            ? { padding: '20px 20px' }
            : { padding: '20px 120px' }
        }
      >
        {abaPerfil === 'minhas-reservas' && <Reservas onSetCancelarReserva={() => setCancelarReserva(false)} onCancelarReserva={cancelarReserva} openModalCacelarReserva={() => setModalCancelarReserva(true)} />}
        {abaPerfil === 'meus-dados' && <MeusDados onImg={img}
          onSetImg={setImg}
          onSetNomeUser={setNomeUser}
          onSetUserRole={setUserRole}
          onOpenModalCancelarEditar={() => setModalCancelarEdit(true)} onOpenModalFoto={() => setModalFoto(true)}
          onDescartarAlteracoes={descartarAlteracoes}
        />}
        {abaPerfil === 'decoracao' && <DecoracoesEdicao />}
        {abaPerfil === 'calendario' && <Calendario />}
        {abaPerfil === 'metricas' && <Metricas />}
        {abaPerfil === 'reservas' && <Reservas onCancelarReserva={cancelarReserva} onSetCancelarReserva={() => setCancelarReserva(false)} openModalCacelarReserva={() => setModalCancelarReserva(true)} />}
      </div>

    </div>
  )
}

export default Perfil
