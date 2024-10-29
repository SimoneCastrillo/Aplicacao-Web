import styles from './Gastronomia.module.css'
import imgLogo from '../../assets/CastrilloEventos.png';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BsList } from 'react-icons/bs';
import Footer from '../../components/Footer/Footer';
import avatar from '../../assets/Avatar.png';
import doces from '../../assets/doces.webp';
import lanches from '../../assets/lanches.webp'
import salgados from '../../assets/Salvagos.jpeg'
import bolos from '../../assets/bolos.jpeg'

const Gastronomia = () => {
    const [menuAtivo, setMenuAtivo] = useState(false);
    const [secaoAtiva, setSecaoAtiva] = useState('');
    const location = useLocation();
    const [logado, setLogado] = useState(false)
    if(sessionStorage.getItem('token') && !logado){
        setLogado(true)
      }
      const [iUserImg, setIUserImg] = useState(false);
    useEffect(() => {
        if(sessionStorage.getItem('img') !== null ){
            setIUserImg(true)
    }
    },[])
    const handleOpenMenu = () => {
        setMenuAtivo(!menuAtivo);
    };
    const obterClasseAtiva = (hash) => {
        return secaoAtiva === hash ? styles.active : '';
    };
    useEffect(() => {
        const handleScroll = () => {
            const secoes = ['Lanches', 'Salgados', 'Bolos', 'Doces']; 
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

  return (
    <div>
        <header className={styles.header}>
            <div className={styles.container}>
                <Link to='/'><img className={styles.imgLogo} src={imgLogo} alt="logo simone castrillo" /></Link>
                <nav className={styles.desktop}>
                    <ul className={styles.nav_links}>
                        <li key="bannerId">
                            <Link 
                                className={obterClasseAtiva('#bannerId')} 
                                to="/"
                            >
                                Home
                            </Link>
                        </li>
                        <li key="Lanches">
                            <Link 
                                className={obterClasseAtiva('#Lanches')} 
                                to="#Lanches"
                            >
                                Lanches
                            </Link>
                        </li>
                        <li key="Salgados">
                            <Link 
                                className={obterClasseAtiva('#Salgados')} 
                                to="#Salgados"
                            >
                                Salgados
                            </Link>
                        </li>
                        <li key="Bolos">
                            <Link 
                                className={obterClasseAtiva('#Bolos')} 
                                to="#Bolos"
                            >
                                Bolos
                            </Link>
                        </li>
                        <li key="Doces">
                            <Link 
                                className={obterClasseAtiva('#Doces')} 
                                to="#Doces"
                            >
                                Doces
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className={`${styles.container_buttons} ${styles.desktop}`} >
                    <Link to="/solicitar-orcamento" className='btn-default-bgRosa'>Solicitar Orçamento</Link>
                    {!logado && <Link to="/login" className='btn-default-bgTransparent'>Login</Link>}
                    {logado && 
                        (
                            <Link to='/perfil' style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                            {!iUserImg && <img width={'50px'} src={avatar} alt="avatar" />}
                            {iUserImg && <img style={{borderRadius: '100%'}} width={'30px'} height={'30px'} src={`data:image/jpeg;base64,${sessionStorage.img}`} alt="avatar" />}
                            <p style={{color: 'white', fontWeight: 'bold'}}>{JSON.parse(sessionStorage.usuario).nome}</p>
                            </Link>
                        )
                    }
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
                                    
                                    <li key="mobile-solicitar-orcamento" style={{marginTop: '20px'}}>
                                        <Link 
                                        className='btn-default-bgRosa'
                                            to="/solicitar-orcamento"
                                        >
                                            Solicitar Orçamento
                                        </Link>
                                    </li>
                                    {!logado && <Link to="/login" className='btn-default-bgTransparent'>Login</Link>}
                                    {logado && 
                                        (
                                            <Link to='/perfil' style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                                            {!iUserImg && <img width={'50px'} src={avatar} alt="avatar" />}
                                            {iUserImg && <img style={{borderRadius: '100%'}} width={'30px'} height={'30px'} src={`data:image/jpeg;base64,${sessionStorage.img}`} alt="avatar" />}
                                            <p style={{color: 'white', fontWeight: 'bold'}}>{JSON.parse(sessionStorage.usuario).nome}</p>
                                            </Link>
                                        )
                                    }
                                </ul>
                            </nav>
                        </motion.div>
                    )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
        <AnimatePresence>
    <div className={styles.section}>
        <motion.h2
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: 'center' }}
            className='titulo-principal'
        >
            GASTRONOMIA
        </motion.h2>
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ margin: '0 auto' }}
            className={styles.hr}
        ></motion.div>
        <motion.p
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{ textAlign: 'center' }}
            className='descricao'
        >
            Eventos únicos para se divertir e conectar com quem você ama!
        </motion.p>

        {[{
            titulo: 'Lanches',
            img: lanches,
            items: ['Mini Hot Dog', 'Mini Hamburguer', 'Mini Calabresa', 'Mini Carne louca'],
            reverse: false
        }, {
            titulo: 'Salgados',
            img: salgados,
            items: ['Mini kibe', 'Risole de pizza', 'Coxinha de frango', 'Bolinho de queijo', 'Esfiha de carne', 'Empadinhas de palmito'],
            reverse: true
        }, {
            titulo: 'Bolos',
            img: bolos,
            items: ['Creme Mestre com pêssego', 'Prestígio', 'Abacaxi', 'Doce de leite com coco', 'Doce de leite com ameixa', 'Mousse de morango', 'Bolo Ninho', 'Ninho com morango', 'e Muito Mais!'],
            reverse: false
        }, {
            titulo: 'Doces',
            img: doces,
            items: ['Brigadeiro tradicionais', 'Brigadeiro crocante', 'Brigadeiro de morango', 'Cajuzinho', 'Beijinhos'],
            reverse: true
        }].map((card, index) => (
            <motion.div
            id={card.titulo}
                key={card.titulo}
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                exit={{ x: 100 }}
                transition={{ duration: 0.5 }}
                className={`${styles.card} ${card.reverse ? styles.cardReverse : ''}`}
                
            >
                {card.reverse ? (
                    <>
                        <div  className={styles.detalhes}>
                            <h2 className={styles.tituloCard}>{card.titulo}</h2>
                            {card.items.map((item, idx) => (
                                <p key={idx} className={styles.detalhesItemReverse}>{item}</p>
                            ))}
                        </div>
                        <div className={styles.imgCard}>
                            <img src={card.img} alt="" />
                        </div>
                    </>
                ) : (
                    <>
                        <div className={styles.imgCard}>
                        <img src={card.img} alt="" />
                        </div>
                        <div className={styles.detalhes}>
                            <h2 className={styles.tituloCard}>{card.titulo}</h2>
                            {card.items.map((item, idx) => (
                                <p key={idx} className={styles.detalhesItem}>{item}</p>
                            ))}
                        </div>
                    </>
                )}
            </motion.div>
        ))}
    </div>
</AnimatePresence>
        <Footer/>
    </div>
  )
}

export default Gastronomia
