import BotaoVoltarOrcamento from '../../components/BotaoVoltarOrcamento/BotaoVoltarOrcamento'
import styles from './SolicitarOrcamento.module.css'
import imgLogo from '../../assets/CastrilloEventos.png'
import FormularioReserva from '../../components/FormularioReserva/FormularioReserva'
import { Link } from 'react-router-dom'
import ModalEscolherDecoracao from '../../components/FormularioReserva/modalEscolherDecoracao/ModalEscolherDecoracao';
import { useState } from 'react'

const SolicitarOrcamento = () => {
  const [openModalDecoracao, setOpenModalDecoracao] = useState(false);
  const gerenciarModal = (e)=>{
        e.preventDefault();
        openModalDecoracao ? setOpenModalDecoracao(false) : setOpenModalDecoracao(true)
  }

  return (
    <div className={styles.containerGeral}>
      {openModalDecoracao && <ModalEscolherDecoracao onCloseEscolherDecoracao={gerenciarModal} />}
      <BotaoVoltarOrcamento/>
      <div className={styles.container}>
      <div className={styles.col_img}><Link to="/"><img className={styles.imgLogo} src={imgLogo} alt="" /></Link></div>
      <h1 className={styles.titulo}>ORÇAMENTO</h1>
      
      <FormularioReserva onOpenEscolherDecoracao={gerenciarModal}/>
      </div>
    </div>
  )
}

export default SolicitarOrcamento
