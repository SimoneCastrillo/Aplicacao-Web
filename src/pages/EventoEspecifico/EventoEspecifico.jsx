import { useParams } from 'react-router-dom';
import styles from './EventoEspecifico.module.css'
import { FaChevronDown } from 'react-icons/fa';
import Decoracoes from '../../components/Decoracoes/Decoracoes';
import Footer from '../../components/Footer/Footer';
import Avaliacoes from '../../components/Avaliacoes/Avaliacoes';
import img1 from '../../assets/imgDecoracaoBanner.jpg';
import img2 from '../../assets/imgDecoracaoBanner.jpg';
import img3 from '../../assets/imgDecoracaoBanner.jpg';
const images = [img1, img2, img3, img1,img2, img2];
const descricaoEvento = {
  infantil: "Evento voltado para crianças, com temática lúdica e atividades recreativas, ideal para festas de aniversário infantil.",
  aniversário: "Celebração de aniversário para todas as idades, com decoração personalizada, música e opções de buffet.",
  debutante: "Festa de 15 anos que marca a transição da infância para a adolescência, com cerimônia e festa sofisticada.",
  alugueldoespaço: "Disponibilização do espaço para eventos diversos, permitindo que os clientes personalizem a decoração e o catering.",
  coffebreak: "Evento corporativo ou social com um menu leve de cafés, salgados e doces, ideal para intervalos de reuniões ou workshops.",
  casamento: "Celebração da união entre casais, com cerimônia e festa personalizada, incluindo buffet, decoração e música."
};

const EventoEspecifico = () => {
    const { nome } = useParams();
    const nomeSemEspaco = nome.replace(/%20/g, '').replace(/\s+/g, '');
    // console.log(nomeSemEspaco);
    
  return (
    <div>
        <div className={styles.banner}>
            <h1>{nome.toUpperCase()}</h1>
            <p>{descricaoEvento[nomeSemEspaco]}</p>
            <FaChevronDown color='#fff' size={40}/>
        </div>
        <div className={styles.container}>
            <Decoracoes />
            <Avaliacoes imagens={images} />
        </div>
        
        <Footer />
    </div>
  )
}

export default EventoEspecifico
