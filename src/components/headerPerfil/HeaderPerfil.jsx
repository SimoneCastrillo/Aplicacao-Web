import styles from './HeaderPerfil.module.css';
import logo from '../../assets/Matriz (1).png';
import avatar from '../../assets/Avatar.png';
import { BsBellFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';

const HeaderPerfil = ({ componenteAtivo, onNomeUser, onUserRole }) => {
    const permissionUser = onUserRole;
   const [iUserImg, setIUserImg] = useState(false);
   useEffect(() => {
    
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
                                    <Link to='/perfil/reservas'
                                        className={componenteAtivo === 'reservas' ? styles.active : ''} 
                                        
                                    >
                                        Reservas
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/perfil/metricas'
                                        className={componenteAtivo === 'metricas' ? styles.active : ''} 
                                    
                                    >
                                        Métricas
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/perfil/calendario'
                                        className={componenteAtivo === 'calendario' ? styles.active : ''} 
                                   
                                    >
                                        Calendário
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/perfil/decoracao'
                                        className={componenteAtivo === 'decoracao' ? styles.active : ''} 
                             
                                    >
                                        Decorações
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/perfil/avaliacao'
                                        className={componenteAtivo === 'avaliacao' ? styles.active : ''} 
                                  
                                    >
                                        Avaliações
                                    </Link>
                                </li>
                            </>
                        )}
                        {permissionUser !== 'admin' && (
                            <li>
                                <Link to='/perfil/minhas-reservas'
                                    className={componenteAtivo === 'minhas-reservas' ? styles.active : ''} 
                             
                                >
                                    Minhas Reservas
                                </Link>
                            </li>
                        )}
                        <li>
                            <Link to='/perfil/meus-dados'
                                className={componenteAtivo === 'meus-dados' ? styles.active : ''} 
                        
                            >
                                Meus dados
                            </Link>
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
