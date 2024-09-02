import imgLogo from '../assets/CastrilloEventos.png'
import styles from './Header.module.css'
import { NavLink, Link } from 'react-router-dom'
const Header = () => {
  return (
    <div className={styles.header}>
        <div className={styles.container}>
            <img className={styles.imgLogo} src={imgLogo} alt="logo simone castrillo" />
            <nav>
                <ul className={styles.nav_links}>
                    <li><NavLink className={({isActive})=> (isActive ? styles.active : '')} to="/">Home</NavLink></li>
                    <li><Link className={({isActive})=> (isActive ? styles.active : '')} to="#eventos">Eventos</Link></li>
                    <li><Link className={({isActive})=> (isActive ? styles.active : '')} to="#reservas">Reservas</Link></li>
                    <li><Link className={({isActive})=> (isActive ? styles.active : '')} to="#avaliacoes">Avaliações</Link></li>
                    <li><Link className={({isActive})=> (isActive ? styles.active : '')} to="#contato">Contato</Link></li>
                </ul>
            </nav>
            <div className={styles.container_buttons}>
                <NavLink to="" className='btn-default-bgRosa'>Solicitar Orçamento</NavLink>
                <NavLink to="" className='btn-default-bgTransparent'>Login</NavLink>
            </div>
        </div>
    </div>
  )
}

export default Header
