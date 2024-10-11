import { useState } from 'react';
import HeaderPerfil from '../../components/headerPerfil/HeaderPerfil'
import styles from './Perfil.module.css'
import Reservas from '../../components/Reservas/Reservas';
import MeusDados from '../../components/MeusDados/MeusDados';

const Perfil = () => {
    const [componenteParaExibir, setComponenteParaExibir] = useState('meus-dados');
    const handleEscolherComponente = (componente) => {
    setComponenteParaExibir(componente);
    }
  return (
    <div className={styles.container}>
      <HeaderPerfil componenteAtivo={componenteParaExibir} onEscolherComponente={handleEscolherComponente} />
      <div className={styles.box}>
        {componenteParaExibir === 'minhas-reservas' && <Reservas/>}
        {componenteParaExibir === 'meus-dados' && <MeusDados/>}
      </div>
      
    </div>
  )
}

export default Perfil
