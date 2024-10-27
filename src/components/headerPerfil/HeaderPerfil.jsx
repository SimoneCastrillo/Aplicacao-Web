import styles from './HeaderPerfil.module.css';
import logo from '../../assets/Matriz (1).png';
import avatar from '../../assets/Avatar.png';
import { BsBellFill } from 'react-icons/bs';

const HeaderPerfil = ({ onEscolherComponente, componenteAtivo, onNomeUser }) => {
    const permissionUser = 'normal';
   
    return (
        <div className={styles.header}>
            <div className={styles.container}>
                <img src={logo} alt='logo png' />
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
                        <img src={avatar} alt="avatar" />
                        <p>{onNomeUser}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderPerfil;
