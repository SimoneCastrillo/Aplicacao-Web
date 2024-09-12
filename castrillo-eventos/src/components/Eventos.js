import React, { useRef } from 'react';
import styles from './Eventos.module.css';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import BannerEventos from './BannerEventos';

const Eventos = () => {
  const bannerRef = useRef();

  const handlePrev = () => {
    if (bannerRef.current) {
      bannerRef.current.prevImage();
    }
  };

  const handleNext = () => {
    if (bannerRef.current) {
      bannerRef.current.nextImage();
    }
  };

  return (
    <div id="eventos" className={styles.container}>
      <AnimatePresence>
        <div className={styles.colTituloButton}>
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            exit={{ x: 100 }}
            transition={{ duration: 1 }}
          >
            <h2 className='titulo-principal'>EVENTOS POPULARES</h2>
            <div className={styles.hr}></div>
            <p className='descricao'>Eventos únicos para se divertir e conectar com quem você ama!</p>
          </motion.div>
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            exit={{ x: -100 }}
            transition={{ duration: 1 }}
            className={styles.containerButtons}
          >
            <button className='btn-default-bgTransparent arrow' onClick={handlePrev}> 
              <MdArrowBack size={20} color="#FFB6C1" />
            </button>
            <button className='btn-default-bgRosa arrow' onClick={handleNext}>
              <MdArrowForward size={20} color="white" />
            </button>
          </motion.div>
        </div>
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          exit={{ x: 100 }}
          transition={{ duration: 1 }}
        >
          <BannerEventos ref={bannerRef} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Eventos;


