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
        className='titulo-principal'>DÚVIDAS FREQUENTES</motion.h1>
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
         className='descricao'>Ficou com dúvidas? Confira Aqui</motion.p>
        <motion.div initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        exit={{ y: 100 }}
        transition={{ duration: 0.5 }}
        key={`${Math.random()}`}
        >
          <div className={styles.perguntas}>
          <Perguntas key={`${Math.random()}`}  titulo='Quantos convidados o buffet pode acomodar?' resposta='Nosso buffet pode acomodar até 150 convidados com total conforto e elegância.'/>
            <Perguntas key={`${Math.random()}`} titulo='Posso fazer uma visita antes de reservar?' resposta='Sim, você pode agendar uma visita para conhecer nosso espaço antes de fazer a sua reserva. Além disso, oferecemos a opção de marcar uma degustação do nosso cardápio em um dia de evento, para que você possa experimentar a qualidade e variedade dos pratos que servimos.'/>
            <Perguntas key={`${Math.random()}`} titulo='Existe um limite de horário para os eventos?' resposta='Não, não há um limite de horário para os eventos, mas é necessário combinar previamente os horários de início e término.'/>
            <Perguntas key={`${Math.random()}`} titulo='O buffet oferece pacotes promocionais?' resposta='Sim, o buffet oferece pacotes promocionais de tempos em tempos. As promoções são publicadas tanto em nossas redes sociais quanto aqui no site.'/>
            <Perguntas key={`${Math.random()}`} titulo='O buffet oferece serviços de decoração temática?' resposta='Sim, oferecemos serviços de decoração temática baseados no tipo de evento.'/>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default Duvidas
