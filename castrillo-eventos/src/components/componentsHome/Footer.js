import React from 'react'
import styles from './Footer.module.css'
import imgLogo from '../../assets/Matriz (1).png'
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <div className={styles.container}>
        <div>
        <img src={imgLogo} alt="" />
        <ul className={styles.lista_redes}>
            <li><Link to=''><FaFacebook size={20}/></Link></li>
            <li><Link to=''><FaInstagram size={20}/></Link></li>
            <li><Link to=''><FaWhatsapp size={20}/></Link></li>
        </ul>
        </div>
    </div>
  )
}

export default Footer
