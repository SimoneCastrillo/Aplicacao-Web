import { useState } from 'react';
import HeaderPerfil from '../../components/headerPerfil/HeaderPerfil'
import styles from './Perfil.module.css'
import Reservas from '../../components/Reservas/Reservas';

const Perfil = () => {
    const [componenteParaExibir, setComponenteParaExibir] = useState('minhas-reservas');
    const handleEscolherComponente = (componente) => {
    setComponenteParaExibir(componente);
    }
  return (
    <div className={styles.container}>
      <HeaderPerfil onEscolherComponente={handleEscolherComponente} />
      <div className={styles.box}>
        {componenteParaExibir === 'minhas-reservas' && <Reservas/>}
      </div>
      
    </div>
  )
}

export default Perfil
