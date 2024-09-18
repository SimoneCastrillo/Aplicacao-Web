import styles from './BotaoVoltarOrcamento.module.css'
import { FaArrowLeft } from 'react-icons/fa';
const BotaoVoltarOrcmento = () => {
  return (
    <div className={styles.container}>
        <button className={styles.btn}><FaArrowLeft color='C54477' fontSize={20} /></button>
    </div>
  )
}

export default BotaoVoltarOrcmento
