import React from 'react'
import Header from '../../components/Header/Header'
import BannerHome from '../../components/BannerHome/BannerHome'
import Eventos from '../../components/Eventos/Eventos'
import ComoReservar from '../../components/ComoReservar/ComoReservar'
import Duvidas from '../../components/Duvidas/Duvidas'
import Footer from '../../components/Footer/Footer'
import Avaliacoes from '../../components/Avaliacoes/Avaliacoes'
import styles from './Home.module.css'
const Home = () => {
  return (
    <div >
      <Header />
      <BannerHome />
      <div className={styles.container}>
      <Eventos/>
      <ComoReservar/>
      <Avaliacoes/>
      <Duvidas/>
      </div>
      <Footer/>
    </div>
  )
}

export default Home
