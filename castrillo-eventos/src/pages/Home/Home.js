import React from 'react'
import Header from '../../components/componentsHome/Header'
import BannerHome from '../../components/componentsHome/BannerHome'
import Eventos from '../../components/componentsHome/Eventos'
import ComoReservar from '../../components/componentsHome/ComoReservar'
import Duvidas from '../../components/componentsHome/Duvidas'
import Footer from '../../components/componentsHome/Footer'
import Avaliacoes from '../../components/componentsHome/Avaliacoes'
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
