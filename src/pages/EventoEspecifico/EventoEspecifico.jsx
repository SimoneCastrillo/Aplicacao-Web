import { useParams } from 'react-router-dom';
import styles from './EventoEspecifico.module.css'
import { FaChevronDown } from 'react-icons/fa';
import Decoracoes from '../../components/Decoracoes/Decoracoes';
const EventoEspecifico = () => {
    const { nome } = useParams();
  return (
    <div>
        <div className={styles.banner}>
            <h1>{nome.toUpperCase()}</h1>
            <p>Deixe seu aniversário brilhar, celebrando 
            ao lado de quem realmente importa!</p>
            <FaChevronDown color='#fff' size={40}/>
        </div>
        <div className={styles.container}>
            <Decoracoes />
        </div>
    </div>
  )
}

export default EventoEspecifico
