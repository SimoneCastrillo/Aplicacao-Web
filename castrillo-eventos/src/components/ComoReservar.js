import React from 'react';
import styles from './ComoReservar.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import StepReserva from './StepReserva';

const ComoReservar = () => {
  return (
    <div className={styles.container} id='reservas'>
      <AnimatePresence>
        <motion.div
          key="titulo-reserva" 
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          exit={{ x: 100 }}
          transition={{ duration: 1 }}
        >
          <h1 className={`titulo-principal ${styles.ajuste_titulo}`}>COMO RESERVAR?</h1>
          <div className={styles.hr}></div>
          <p className={`descricao ${styles.ajuste_descricao}`}>Fácil e rápido, confira o passo a passo</p>
        </motion.div>
        <motion.div
          key="passos-reserva" 
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          exit={{ y: -100 }}
          transition={{ duration: 1 }}
        >
          <StepReserva />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ComoReservar;
