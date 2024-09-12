import React from 'react'
import Header from '../../components/Header'
import BannerHome from '../../components/BannerHome'
import Eventos from '../../components/Eventos'
import ComoReservar from '../../components/ComoReservar'

const Home = () => {
  return (
    <div>
      <Header />
      <BannerHome />
      <Eventos/>
      <ComoReservar/>
    </div>
  )
}

export default Home
