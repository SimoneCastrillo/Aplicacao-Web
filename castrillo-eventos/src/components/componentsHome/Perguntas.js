import React from 'react';
import styles from './Perguntas.module.css';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';

const Perguntas = ({ titulo, resposta }) => {
  const [aberto, setAberto] = React.useState(false);
  
  const handleAbrirResposta = () => {
    setAberto(!aberto);
  }

  return (
    <div>
      <div className={`${styles.box} ${aberto ? styles.ativo : styles.naoAtivo}`}>
        <h3 className={styles.titulo}>{titulo}</h3>
        <button onClick={handleAbrirResposta}>
          {!aberto ? (
            <BsChevronDown color={`${aberto ? '#C54477' : '#fff'}`} strokeWidth={1} />
          ) : (
            <BsChevronUp color={`${aberto ? '#C54477' : '#fff'}`} strokeWidth={1} />
          )}
        </button>
      </div>
      
      <AnimatePresence>
        {aberto && 
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -5, opacity: 0 }}
          transition={{ duration: 0.2 }}
          key={titulo} 
          className={`${styles.boxResposta} ${aberto && styles.ativoResposta}`}
        >
          <p>{resposta}</p>
        </motion.div>
        }
      </AnimatePresence>
    </div>
  );
}

export default Perguntas;
