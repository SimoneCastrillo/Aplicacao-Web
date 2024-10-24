import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import CarrosselHome from '../../components/CarrosselHome/CarrosselHome'
import Eventos from '../../components/Eventos/Eventos'
import ComoReservar from '../../components/ComoReservar/ComoReservar'
import Duvidas from '../../components/Duvidas/Duvidas'
import Footer from '../../components/Footer/Footer'
import Avaliacoes from '../../components/Avaliacoes/Avaliacoes'
import styles from './Home.module.css'
import img1 from '../../assets/imgDecoracaoBanner.jpg';
import img2 from '../../assets/imgDecoracaoBanner.jpg';
import img3 from '../../assets/imgDecoracaoBanner.jpg';
const images = [img1, img2, img3, img1,img2, img2];


const Home = () => {
  // console.log('home',images);
  

  return (
    <div >
      <Header />
      <CarrosselHome />
      <div className={styles.container}>
      <Eventos/>
      <ComoReservar/>
      <Avaliacoes imagens={images}/>
      <Duvidas/>
      </div>
      <Footer/>
    </div>
  )
}

export default Home
