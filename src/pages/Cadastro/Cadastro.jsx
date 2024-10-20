import React from 'react'
import styles from './Cadastro.module.css'
import { Link } from 'react-router-dom'
// import { useEffect, useState } from 'react'
import BotaoVoltarOrcmento from '../../components/BotaoVoltarCadastro/BotaoVoltarCadastro';
import FormularioCadastro from '../../components/FormularioCadastro/FormularioCadastro';


const Cadastro = () => {




  return (
    <div className={styles.container1}>
      <div className={styles.containerBanner}>
      <BotaoVoltarOrcmento className={styles}/>
          </div>
          <div className={styles.containerGeral}>
      <div className={styles.container}>
      <h1 className={styles.titulo}>CADASTRO</h1>
      <span>Já possuí uma conta? <Link className={styles.link} to="/login">Entre.</Link></span>
        <FormularioCadastro/>
      </div>
    </div>
    </div>
  )
}

export default Cadastro
