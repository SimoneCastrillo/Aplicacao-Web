import styles from './BotaoVoltarCadastro.module.css'
import img from '../../assets/VectorVoltar.svg';
import { Link } from 'react-router-dom';
const BotaoVoltarOrcmento = () => {
  return (
        <Link to='/' className={styles.btn}><img src={img} alt="" /></Link>
  )
}

export default BotaoVoltarOrcmento
