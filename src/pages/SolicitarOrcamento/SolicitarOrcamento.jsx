import BotaoVoltarOrcamento from '../../components/BotaoVoltarOrcamento/BotaoVoltarOrcamento'
import styles from './SolicitarOrcamento.module.css'
import imgLogo from '../../assets/CastrilloEventos.png'
import FormularioReserva from '../../components/FormularioReserva/FormularioReserva'
import { Link } from 'react-router-dom'
import ModalEscolherDecoracao from '../../components/FormularioReserva/modalEscolherDecoracao/ModalEscolherDecoracao';
import { useEffect, useState } from 'react'

const SolicitarOrcamento = () => {
  const [openModalDecoracao, setOpenModalDecoracao] = useState(false);
  const [modalTipoEvento, setModalTipoEvento] = useState('');
  const [decoracao, setDecoracao] = useState('');
  const gerenciarModal = (e)=>{
        if (e) {
          e.preventDefault();
        }
        openModalDecoracao ? setOpenModalDecoracao(false) : setOpenModalDecoracao(true)
  }
  useEffect(()=> setDecoracao(''), [modalTipoEvento])
  return (
    <div className={styles.containerGeral}>
      {openModalDecoracao && <ModalEscolherDecoracao onCloseEscolherDecoracao={gerenciarModal} tipoEvento={modalTipoEvento} onSetDecoracao={setDecoracao} />}
      <BotaoVoltarOrcamento/>
      <div className={styles.container}>
      <div className={styles.col_img}><Link to="/"><img className={styles.imgLogo} src={imgLogo} alt="" /></Link></div>
      <h1 className={styles.titulo}>ORÇAMENTO</h1>
      
      <FormularioReserva onOpenEscolherDecoracao={gerenciarModal} onTipoEventoModal={setModalTipoEvento} onDecoracaoEscolhida={decoracao}/>
      </div>
    </div>
  )
}

export default SolicitarOrcamento
