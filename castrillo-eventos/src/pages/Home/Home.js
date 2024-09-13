import React from 'react'
import Header from '../../components/componentsHome/Header'
import BannerHome from '../../components/componentsHome/BannerHome'
import Eventos from '../../components/componentsHome/Eventos'
import ComoReservar from '../../components/componentsHome/ComoReservar'
import Duvidas from '../../components/componentsHome/Duvidas'

const Home = () => {
  return (
    <div>
      <Header />
      <BannerHome />
      <Eventos/>
      <ComoReservar/>
      <Duvidas/>
    </div>
  )
}

export default Home
