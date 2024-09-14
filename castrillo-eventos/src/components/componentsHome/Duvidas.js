import React from 'react'
import styles from './Duvidas.module.css'
import Perguntas from './Perguntas'
import { motion, AnimatePresence } from 'framer-motion';

const Duvidas = () => {
  return (
    <div id='duvidas' className={styles.container}>
      <AnimatePresence>
        <motion.h1 
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        exit={{ x: 100 }}
        transition={{ duration: 0.5 }}
        key={`${Math.random()}`}
        style={{textAlign: 'center'}} className='titulo-principal'>DÚVIDAS FREQUENTES</motion.h1>
        <motion.div
        initial={{ x: 50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        exit={{ x: 50 }}
        transition={{ duration: 0.5 }}
        key={`${Math.random()}`}
         className={styles.hr}></motion.div>
        <motion.p 
        initial={{ x: 50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        exit={{ x: 50 }}
        transition={{ duration: 0.5 }}
        key={`${Math.random()}`}
        style={{textAlign: 'center'}} className='descricao'>Ficou com dúvidas? Confira Aqui</motion.p>
        <motion.div initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        exit={{ y: 100 }}
        transition={{ duration: 0.5 }}
        key={`${Math.random()}`}
        >
          <div className={styles.perguntas}>
          <Perguntas key={`${Math.random()}`}  titulo='aaaaaa' resposta='resposta'/>
            <Perguntas key={`${Math.random()}`} titulo='bbbbbb' resposta='resposta'/>
            <Perguntas key={`${Math.random()}`} titulo='cccc' resposta='resposta'/>
            <Perguntas key={`${Math.random()}`} titulo='ddddd' resposta='resposta'/>
            <Perguntas key={`${Math.random()}`} titulo='eeeee' resposta='resposta'/>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default Duvidas
