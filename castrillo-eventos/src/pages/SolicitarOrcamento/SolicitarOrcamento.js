import BotaoVoltarOrcamento from '../../components/componentsSolicitarOrcamento/BotaoVoltarOrcamento'
import styles from './SolicitarOrcamento.module.css'
import imgLogo from '../../assets/CastrilloEventos.png'
import FormularioReserva from '../../components/componentsSolicitarOrcamento/FormularioReserva'
import { Link } from 'react-router-dom'
const SolicitarOrcamento = () => {
  

  return (
    <div className={styles.containerGeral}>
      <BotaoVoltarOrcamento/>
      <div className={styles.container}>
      <div className={styles.col_img}><Link to="/"><img className={styles.imgLogo} src={imgLogo} alt="" /></Link></div>
      <h1 className={styles.titulo}>ORÇAMENTO</h1>
      <p className={styles.descricao}>Selecione o horário e data da sua reserva e a quantidade de pessoas.</p>
      <FormularioReserva/>
      </div>
    </div>
  )
}

export default SolicitarOrcamento
