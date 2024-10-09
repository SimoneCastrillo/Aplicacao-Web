import React, { useRef } from 'react'
import styles from './Avaliacoes.module.css'
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import CarrosselAvaliacoes from './CarrosselAvaliacoes/CarrosselAvaliacoes';
const Avaliacoes = () => {
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
    <div id='avaliacoes' className={styles.container}>
        <AnimatePresence>
        <motion.div
         key='titulo avaliacoes 2'
         initial={{ x: 100, opacity: 0 }}
         whileInView={{ x: 0, opacity: 1 }}
         exit={{ x: 100 }}
         transition={{ duration: 0.5 }}
        className={styles.tituloEdescricao}>
            <h2 style={{textAlign: 'center'}} className='titulo-principal'>AVALIAÇÕES</h2>
            <div className={styles.hr}></div>
            <p style={{textAlign: 'center'}} className='descricao'>Fácil e rápido, confira o passo a passo</p>
        </motion.div>
        <motion.div
         key='botoes avaliacoes 1'
         initial={{ y: 100, opacity: 0 }}
         whileInView={{ y: 0, opacity: 1 }}
         exit={{ y: 100 }}
         transition={{ duration: 0.5 }}
        >
        <CarrosselAvaliacoes ref={bannerRef} />
        </motion.div>
        <motion.div 
         key='titulo avaliacoes 1'
         initial={{ x: 100, opacity: 0 }}
         whileInView={{ x: 0, opacity: 1 }}
         exit={{ x: 100 }}
         transition={{ duration: 0.5 }}
        className={styles.containerButtons}>
            <button className='btn-default-bgTransparent arrow hoverRosa' onClick={handlePrev}> 
              <MdArrowBack size={20} color="#FFB6C1" />
            </button>
            <button className='btn-default-bgRosa arrow' onClick={handleNext}>
              <MdArrowForward size={20} color="white" />
            </button>
        </motion.div>
        </AnimatePresence>
    </div>
  )
}

export default Avaliacoes
