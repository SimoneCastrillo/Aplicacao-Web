import { useState } from 'react';
import HeaderPerfil from '../../components/headerPerfil/HeaderPerfil'
import styles from './Perfil.module.css'
import Reservas from '../../components/Reservas/Reservas';
import MeusDados from '../../components/MeusDados/MeusDados';
import ModalFoto from '../../components/MeusDados/modalFoto/ModalFoto';
import DecoracoesEdicao from '../../components/DecoracoesEdicao/DecoracoesEdicao';

const Perfil = () => {
    const [modalFoto, setModalFoto] = useState(false);
    const [img, setImg] = useState('');
    const [nomeUser, setNomeUser] = useState('');
    const [componenteParaExibir, setComponenteParaExibir] = useState('meus-dados');
    const handleEscolherComponente = (componente) => {
    setComponenteParaExibir(componente);
    }
  return (
    <div className={styles.container}>
      {modalFoto && <ModalFoto onSetImg={setImg} onFoto={img} onCloseModalFoto={() => setModalFoto(false)}/>}
      <HeaderPerfil componenteAtivo={componenteParaExibir} onNomeUser={nomeUser} onEscolherComponente={handleEscolherComponente} />
      <div className={styles.box}>
        {componenteParaExibir === 'minhas-reservas' && <Reservas/>}
        {componenteParaExibir === 'decoracao' && <DecoracoesEdicao/>}
        {componenteParaExibir === 'meus-dados' && <MeusDados onImg={img} onSetImg={setImg} onSetNomeUser={setNomeUser} onOpenModalFoto={()=> setModalFoto(true)} />}
      </div>
      
    </div>
  )
}

export default Perfil
