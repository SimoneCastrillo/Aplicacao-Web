import { useEffect, useState } from 'react';
import imgLogo from '../../assets/CastrilloEventos.png';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Header.module.css';
import { Link, useLocation } from 'react-router-dom';
import { BsList } from 'react-icons/bs';

const Header = () => {
    const location = useLocation();
    const [secaoAtiva, setSecaoAtiva] = useState('');
    const [menuAtivo, setMenuAtivo] = useState(false);

    const handleOpenMenu = () => {
        setMenuAtivo(!menuAtivo);
    };

    useEffect(() => {
        const handleScroll = () => {
            const secoes = ['bannerId', 'eventos', 'reservas', 'avaliacoes', 'duvidas']; // Atualize aqui
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
        <header className={styles.header}>
            <div className={styles.container}>
        
                <Link to='/'><img className={styles.imgLogo} src={imgLogo} alt="logo simone castrillo" /></Link>
                <nav className={styles.desktop}>
                    <ul className={styles.nav_links}>
                        <li key="bannerId">
                            <Link 
                                className={obterClasseAtiva('#bannerId')} 
                                to="#bannerId"
                            >
                                Home
                            </Link>
                        </li>
                        <li key="eventos">
                            <Link 
                                className={obterClasseAtiva('#eventos')} 
                                to="#eventos"
                            >
                                Eventos
                            </Link>
                        </li>
                        <li key="reservas">
                            <Link 
                                className={obterClasseAtiva('#reservas')} 
                                to="#reservas"
                            >
                                Reservas
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
                        <li key="contato">
                            <Link 
                                className={obterClasseAtiva('#duvidas')} 
                                to="#duvidas"
                            >
                                Dúvidas
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
                                            className={obterClasseAtiva('#bannerId')} 
                                            to="#bannerId"
                                        >
                                            Home
                                        </Link>
                                    </li>
                                    <li key="mobile-eventos">
                                        <Link 
                                            className={obterClasseAtiva('#eventos')} 
                                            to="#eventos"
                                        >
                                            Eventos
                                        </Link>
                                    </li>
                                    <li key="mobile-reservas">
                                        <Link 
                                            className={obterClasseAtiva('#reservas')} 
                                            to="#reservas"
                                        >
                                            Reservas
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
                                    <li key="mobile-duvidas">
                                        <Link 
                                            className={obterClasseAtiva('#duvidas')} 
                                            to="#duvidas"
                                        >
                                            Dúvidas
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
    );
};

export default Header;