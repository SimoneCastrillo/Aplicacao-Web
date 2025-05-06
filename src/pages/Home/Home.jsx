import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import CarrosselHome from '../../components/CarrosselHome/CarrosselHome'
import Eventos from '../../components/Eventos/Eventos'
import ComoReservar from '../../components/ComoReservar/ComoReservar'
import Duvidas from '../../components/Duvidas/Duvidas'
import Footer from '../../components/Footer/Footer'
import styles from './Home.module.css'


const Home = () => {
  return (
    <div >
      <Header />
      <div className={styles.contaienrBanner}>
        <CarrosselHome />
      </div>
      <div className={styles.container}>
        <Eventos />
        <ComoReservar />
        <Duvidas />
      </div>
      <Footer />
    </div>
  )
}

export default Home
