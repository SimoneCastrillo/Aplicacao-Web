import { useParams } from 'react-router-dom';
import styles from './EventoEspecifico.module.css'
import { FaChevronDown } from 'react-icons/fa';
import Decoracoes from '../../components/Decoracoes/Decoracoes';
import imgLogo from '../../assets/CastrilloEventos.png';
import Footer from '../../components/Footer/Footer';
import Avaliacoes from '../../components/Avaliacoes/Avaliacoes';
import img1 from '../../assets/imgDecoracaoBanner.jpg';
import img2 from '../../assets/imgDecoracaoBanner.jpg';
import img3 from '../../assets/imgDecoracaoBanner.jpg';
import { Link, useLocation } from 'react-router-dom';
import { BsList } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
    const location = useLocation();
    const [secaoAtiva, setSecaoAtiva] = useState('');
    const [menuAtivo, setMenuAtivo] = useState(false);

    const handleOpenMenu = () => {
        setMenuAtivo(!menuAtivo);
    };

    useEffect(() => {
        const handleScroll = () => {
            const secoes = [ 'decoracoes', 'informacoes', 'avaliacoes']; 
            let secaoEncontrada = '';
    
            secoes.forEach((secaoId) => {
                const elemento = document.getElementById(secaoId);
                if (elemento) {
                    const rect = elemento.getBoundingClientRect();
                    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                        secaoEncontrada = secaoId;
                    }
                }
            });
    
            setSecaoAtiva(secaoEncontrada ? `#${secaoEncontrada}` : '');
        };
    
        window.addEventListener('scroll', handleScroll);
    
        handleScroll();
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    

    useEffect(() => {
        if (location.hash) {
            const elemento = document.getElementById(location.hash.substring(1));
            if (elemento) {
                elemento.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    const obterClasseAtiva = (hash) => {
        return secaoAtiva === hash ? styles.active : '';
    };
  return (
    <div>
      <header className={styles.header}>
            <div className={styles.container}>
        
                <Link to='/'><img className={styles.imgLogo} src={imgLogo} alt="logo simone castrillo" /></Link>
                <nav className={styles.desktop}>
                    <ul className={styles.nav_links}>
                        <li key="bannerId">
                            <Link 
                                
                                to="/"
                            >
                                Home
                            </Link>
                        </li>
                        <li key="eventos">
                            <Link 
                                className={obterClasseAtiva('#decoracoes')} 
                                to="#decoracoes"
                            >
                                Decorações
                            </Link>
                        </li>
                        <li key="reservas">
                            <Link 
                                className={obterClasseAtiva('#informacoes')} 
                                to="#informacoes"
                            >
                                Informações
                            </Link>
                        </li>
                        <li key="avaliacoes">
                            <Link 
                                className={obterClasseAtiva('#avaliacoes')} 
                                to="#avaliacoes"
                            >
                                Avaliações
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className={`${styles.container_buttons} ${styles.desktop}`} >
                    <Link to="/solicitar-orcamento" className='btn-default-bgRosa'>Solicitar Orçamento</Link>
                    <Link to="/login" className='btn-default-bgTransparent'>Login</Link>
                </div>
                <div className={styles.mobile}>
                    <button onClick={handleOpenMenu}><BsList size={35} color='#fff'/></button>
                    <AnimatePresence>
                    {menuAtivo && (
                        <motion.div 
                            initial={{ x: 300 }}
                            animate={{ x: 10 }}
                            exit={{ x: 300 }}
                            transition={{duration: 0.3}}
                            className={styles.menu_container}>
                            <nav className={styles.mobile_nav}>
                                <ul className={styles.nav_links_mobile}>
                                    <li key="mobile-bannerId">
                                        <Link 
                                           
                                            to="/"
                                        >
                                            Home
                                        </Link>
                                    </li>
                                    <li key="mobile-eventos">
                                        <Link 
                                            className={obterClasseAtiva('#decoracoes')} 
                                            to="#decoracoes"
                                        >
                                            Decorações
                                        </Link>
                                    </li>
                                    <li key="mobile-reservas">
                                        <Link 
                                            className={obterClasseAtiva('#informacoes')} 
                                            to="#informacoes"
                                        >
                                            Informações
                                        </Link>
                                    </li>
                                    <li key="mobile-avaliacoes">
                                        <Link 
                                            className={obterClasseAtiva('#avaliacoes')} 
                                            to="#avaliacoes"
                                        >
                                            Avaliações
                                        </Link>
                                    </li>
                                    
                                    
                                    <li key="mobile-solicitar-orcamento" style={{marginTop: '20px'}}>
                                        <Link 
                                        className='btn-default-bgRosa'
                                            to="/solicitar-orcamento"
                                        >
                                            Solicitar Orçamento
                                        </Link>
                                    </li>
                                    <li key="mobile-login" className='full-width'>
                                        <Link 
                                        style={{width: '100%'}}
                                        className='btn-default-bgTransparent  '
                                            to="/login"
                                        >
                                            Login
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </motion.div>
                    )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
        <div className={styles.banner}>
            <h1>{nome.toUpperCase()}</h1>
            <p>{descricaoEvento[nomeSemEspaco]}</p>
            <FaChevronDown color='#fff' size={40}/>
        </div>
        <div className={styles.containerDecora}>
            <Decoracoes />
            <Avaliacoes imagens={images} />
        </div>
        <Footer />
    </div>
  )
}

export default EventoEspecifico
