import { useParams } from 'react-router-dom';
import styles from './EventoEspecifico.module.css'
import { FaChevronDown } from 'react-icons/fa';
import Decoracoes from '../../components/Decoracoes/Decoracoes';
import imgLogo from '../../assets/CastrilloEventos.png';
import Footer from '../../components/Footer/Footer';

import { Link, useLocation } from 'react-router-dom';
import { BsList } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { } from '../../api/api';
import avatar from '../../assets/Avatar.png';

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
    const location = useLocation();
    const [secaoAtiva, setSecaoAtiva] = useState('');
    const [menuAtivo, setMenuAtivo] = useState(false);
    const [logado, setLogado] = useState(false)
    if (sessionStorage.getItem('token') && !logado) {
        setLogado(true)
    }
    const [iUserImg, setIUserImg] = useState(false);
    useEffect(() => {
        if (sessionStorage.getItem('img') !== 'null') {
            setIUserImg(true)
        }
    }, [])
    const handleOpenMenu = () => {
        setMenuAtivo(!menuAtivo);
    };

    useEffect(() => {
        const handleScroll = () => {
            const secoes = ['decoracoes', 'informacoes', 'avaliacoes'];
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
                            {/* <li key="reservas">
                            <Link 
                                className={obterClasseAtiva('#informacoes')} 
                                to="#informacoes"
                            >
                                Informações
                            </Link>
                        </li> */}
                        </ul>
                    </nav>
                    <div className={`${styles.container_buttons} ${styles.desktop}`} >
                        <Link to="/solicitar-orcamento" className='btn-default-bgRosa'>Solicitar Orçamento</Link>
                        {!logado && <Link to="/login" className='btn-default-bgTransparent'>Login</Link>}
                        {logado &&
                            (
                                <Link to='/perfil' style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    {!iUserImg && <img width={'30px'} src={avatar} alt="avatar" />}
                                    {iUserImg && <img style={{ borderRadius: '100%' }} width={'30px'} height={'30px'} src={`data:image/jpeg;base64,${sessionStorage.img}`} alt="avatar" />}
                                    <p style={{ color: 'white', fontWeight: 'bold' }}>{JSON.parse(sessionStorage.usuario).nome}</p>
                                </Link>
                            )
                        }
                    </div>
                    <div className={styles.mobile}>
                        <button onClick={handleOpenMenu}><BsList size={35} color='#fff' /></button>
                        <AnimatePresence>
                            {menuAtivo && (
                                <motion.div
                                    initial={{ x: 300 }}
                                    animate={{ x: 10 }}
                                    exit={{ x: 300 }}
                                    transition={{ duration: 0.3 }}
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
                                            {/* <li key="mobile-reservas">
                                        <Link 
                                            className={obterClasseAtiva('#informacoes')} 
                                            to="#informacoes"
                                        >
                                            Informações
                                        </Link>
                                    </li> */}



                                            <li key="mobile-solicitar-orcamento" style={{ marginTop: '20px' }}>
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
                                                    <Link to='/perfil' style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                        {!iUserImg && <img width={'30px'} src={avatar} alt="avatar" />}
                                                        {iUserImg && <img style={{ borderRadius: '100%' }} width={'30px'} height={'30px'} src={`data:image/jpeg;base64,${sessionStorage.img}`} alt="avatar" />}
                                                        <p style={{ color: 'white', fontWeight: 'bold' }}>{JSON.parse(sessionStorage.usuario).nome}</p>
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
            <div className={styles.banner}>
                <h1>{nome.toUpperCase()}</h1>
                <p>{descricaoEvento[nomeSemEspaco]}</p>
                <FaChevronDown color='#fff' size={40} />
            </div>
            <div className={styles.containerDecora}>
                <Decoracoes />
            </div>
            <Footer />
        </div>
    )
}

export default EventoEspecifico
