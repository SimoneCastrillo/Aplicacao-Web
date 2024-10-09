import  { useRef } from 'react';
import styles from './Decoracoes.module.css';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import BannerDecoracoes from '../BannerDecoracoes/BannerDecoracoes';
const Decoracoes = () => {
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
    <div className={styles.container}>
      <AnimatePresence>
        <div className={styles.colTituloButton}>
          <motion.div
            key='titulo eventos 1'
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            exit={{ x: 100 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className='titulo-principal'>DECORAÇÕES</h2>
            <div className={styles.hr}></div>
            <p className='descricao'>Eventos únicos para se divertir e conectar com quem você ama!</p>
          </motion.div>
          <motion.div 
            key='botoes eventos 1'
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            exit={{ x: -100 }}
            transition={{ duration: 0.5 }}
            className={styles.containerButtons}
          >
            <button className='btn-default-bgTransparent arrow hoverRosa' onClick={handlePrev}> 
              <MdArrowBack size={20} color="#FFB6C1" />
            </button>
            <button className='btn-default-bgRosa arrow' onClick={handleNext}>
              <MdArrowForward size={20} color="white" />
            </button>
          </motion.div>
        </div>
        <motion.div
            key='botoes eventos 1'
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          exit={{ y: 100 }}
          transition={{ duration: 0.5 }}
        >
          {/* <BannerEventos ref={bannerRef} /> */}
          <BannerDecoracoes ref={bannerRef} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default Decoracoes
