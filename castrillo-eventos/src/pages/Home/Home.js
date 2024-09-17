import React from 'react'
import Header from '../../components/componentsHome/Header'
import BannerHome from '../../components/componentsHome/BannerHome'
import Eventos from '../../components/componentsHome/Eventos'
import ComoReservar from '../../components/componentsHome/ComoReservar'
import Duvidas from '../../components/componentsHome/Duvidas'
import Footer from '../../components/componentsHome/Footer'
import Avaliacoes from '../../components/componentsHome/Avaliacoes'

const Home = () => {
  return (
    <div>
      <Header />
      <BannerHome />
      <Eventos/>
      <ComoReservar/>
      <Avaliacoes/>
      <Duvidas/>
      <Footer/>
    </div>
  )
}

export default Home
