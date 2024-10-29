import styles from './HeaderPerfil.module.css';
import logo from '../../assets/Matriz (1).png';
import avatar from '../../assets/Avatar.png';
import { BsBellFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';

const HeaderPerfil = ({ onEscolherComponente, componenteAtivo, onNomeUser }) => {
    const permissionUser = 'normal';
   const [iUserImg, setIUserImg] = useState(false);
   useEffect(() => {
    console.log(sessionStorage.getItem('img'))
    if(sessionStorage.getItem('img') !== 'null' ){
        setIUserImg(true)
  }else {
    setIUserImg(false)
  }
   },[])
   const navigate = useNavigate();
    return (
        <div className={styles.header}>
            <div className={styles.container}>
                <Link to="/"><img src={logo} alt='logo png' /></Link>
                <nav>
                    <ul>
                        {permissionUser === 'admin' && (
                            <>
                                <li>
                                    <button 
                                        className={componenteAtivo === 'reservas' ? styles.active : ''} 
                                        onClick={() => onEscolherComponente('reservas')}
                                    >
                                        Reservas
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        className={componenteAtivo === 'metricas' ? styles.active : ''} 
                                        onClick={() => onEscolherComponente('metricas')}
                                    >
                                        Métricas
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        className={componenteAtivo === 'calendario' ? styles.active : ''} 
                                        onClick={() => onEscolherComponente('calendario')}
                                    >
                                        Calendário
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        className={componenteAtivo === 'decoracao' ? styles.active : ''} 
                                        onClick={() => onEscolherComponente('decoracao')}
                                    >
                                        Decorações
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        className={componenteAtivo === 'avaliacao' ? styles.active : ''} 
                                        onClick={() => onEscolherComponente('avaliacao')}
                                    >
                                        Avaliações
                                    </button>
                                </li>
                            </>
                        )}
                        {permissionUser !== 'admin' && (
                            <li>
                                <button 
                                    className={componenteAtivo === 'minhas-reservas' ? styles.active : ''} 
                                    onClick={() => onEscolherComponente('minhas-reservas')}
                                >
                                    Minhas Reservas
                                </button>
                            </li>
                        )}
                        <li>
                            <button 
                                className={componenteAtivo === 'meus-dados' ? styles.active : ''} 
                                onClick={() => onEscolherComponente('meus-dados')}
                            >
                                Meus dados
                            </button>
                        </li>
                    </ul>
                </nav>
                <div className={styles.userInfo}>
                    <BsBellFill size={18} color='#fff' />
                    <div className={styles.user}>
                        
                        {!iUserImg && <img width={'50px'} src={avatar} alt="avatar" />}
                        {iUserImg && <img style={{borderRadius: '100%'}} width={'50px'} src={`data:image/jpeg;base64,${sessionStorage.img}`} alt="avatar" />}
                        <p>{onNomeUser}</p>
                        <button onClick={()=>{
                            sessionStorage.removeItem('token');
                            sessionStorage.removeItem('img');
                            sessionStorage.removeItem('usuario');
                            navigate('/')
                        }}> <FaSignOutAlt size={18} color='#fff' /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderPerfil;
