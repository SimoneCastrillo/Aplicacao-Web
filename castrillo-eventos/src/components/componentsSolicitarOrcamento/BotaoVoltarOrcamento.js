import styles from './BotaoVoltarOrcamento.module.css'
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const BotaoVoltarOrcmento = () => {
  return (
    <div className={styles.container}>
        <Link to='/' className={styles.btn}><FaHome color='FFB6C1' fontSize={20} /></Link>
    </div>
  )
}

export default BotaoVoltarOrcmento
