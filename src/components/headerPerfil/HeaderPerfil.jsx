
import styles from './HeaderPerfil.module.css'
import logo from '../../assets/Matriz (1).png'
import avatar from '../../assets/Avatar.png'
import { BsBellFill } from 'react-icons/bs';
const HeaderPerfil = ({onEscolherComponente}) => {
    const permissionUser = 'normal';
  return (
    <div className={styles.header}>
        <div className={styles.container}>
            <img src={logo} alt='logo png'/>
            <nav>
                <ul>
                    {permissionUser === 'admin' && (<li><button onClick={()=> onEscolherComponente('reservas')}>Reservas</button></li>)}
                    {permissionUser === 'admin' && (<li><button onClick={()=> onEscolherComponente('metricas')}>Métricas</button></li>)}
                    {permissionUser === 'admin' && (<li><button onClick={()=> onEscolherComponente('calendario')}>Calendário</button></li>)}
                    {permissionUser === 'admin' && (<li><button onClick={()=> onEscolherComponente('decoracao')}>Decorações</button></li>)}
                    {permissionUser === 'admin' && (<li><button onClick={()=> onEscolherComponente('avaliacao')}>Avaliações</button></li>)}
                    {permissionUser !== 'admin' && (<li><button onClick={()=> onEscolherComponente('minhas-reservas')}>Minhas Reservas</button></li>)}
                    <li><button onClick={()=> onEscolherComponente('meus-dados')}>Meus dados</button></li>
                </ul>
            </nav>
            <div className={styles.userInfo}>
                    <BsBellFill size={18} color='#fff'/>
                <div className={styles.user}>
                    <img src={avatar} alt="avatar" />
                    <p>Igor Anthony</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HeaderPerfil
