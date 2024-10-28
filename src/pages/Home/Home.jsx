import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import CarrosselHome from '../../components/CarrosselHome/CarrosselHome'
import Eventos from '../../components/Eventos/Eventos'
import ComoReservar from '../../components/ComoReservar/ComoReservar'
import Duvidas from '../../components/Duvidas/Duvidas'
import Footer from '../../components/Footer/Footer'
import Avaliacoes from '../../components/Avaliacoes/Avaliacoes'
import styles from './Home.module.css'

import {ultimas5avalaicoes} from '../../api/api';



const Home = () => {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
    ultimas5avalaicoes().then((res) => {
      setAvaliacoes(res.data);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
      setLoading(false);
    });
  }, []);
  

  return (
    <div >
      <Header />
      <CarrosselHome />
      <div className={styles.container}>
      <Eventos/>
      <ComoReservar/>
      <Avaliacoes onLoading={loading} imagens={avaliacoes}/>
      <Duvidas/>
      </div>
      <Footer/>
    </div>
  )
}

export default Home
