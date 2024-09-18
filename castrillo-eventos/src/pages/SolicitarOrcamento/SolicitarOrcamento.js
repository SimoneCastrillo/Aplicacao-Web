import BotaoVoltarOrcamento from '../../components/componentsSolicitarOrcamento/BotaoVoltarOrcamento'
import styles from './SolicitarOrcamento.module.css'
import imgLogo from '../../assets/CastrilloEventos.png'
const SolicitarOrcamento = () => {
  return (
    <div>
      <BotaoVoltarOrcamento/>
      <div className={styles.col_img}><img className={styles.imgLogo} src={imgLogo} alt="" /></div>
      <h1 className={styles.titulo}>ORÇAMENTO</h1>
    </div>
  )
}

export default SolicitarOrcamento
