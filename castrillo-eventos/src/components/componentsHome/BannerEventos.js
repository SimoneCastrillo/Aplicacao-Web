import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import imgCasamento from '../../assets/casamento.jpg';
import imgDebutante from '../../assets/debutante.jpg'
import imgInfantil from '../../assets/decoracao4.jpg';
import imgCoffeBreak from '../../assets/coffebreak.jpeg';
import imgPiscina from '../../assets/piscina.jpg';
import { Link } from 'react-router-dom';

import styles from './BannerEventos.module.css';

const images = [{img: imgInfantil, tipoEvento: 'Infantil', descricao: 'Prepare-se para um dia cheio de diversão, alegria e muitas brincadeiras no nosso evento especial para as crianças!'}, 
  {img: imgDebutante, tipoEvento: 'Debutante', descricao: 'Uma festa de debutante inesquecível, com muito glamour, sofisticação e momentos emocionantes. Decoração encantadora, música vibrante e uma pista de dança animada fazem dessa celebração uma experiência mágica e cheia de surpresas.'}, 
  {img: imgCasamento, tipoEvento: 'Casamento', descricao: 'Uma celebração de amor inesquecível, com elegância, música envolvente e momentos emocionantes para marcar esse dia especial.'},
  {img: imgCoffeBreak, tipoEvento: 'Coffe Break', descricao: 'Um coffee break perfeito, com delícias variadas, bebidas quentes e um ambiente agradável para relaxar e conversar.'},
  {img: imgPiscina, tipoEvento: 'Aluguel do espaço', descricao: 'Espaço versátil e elegante, ideal para todo tipo de evento, com infraestrutura completa para garantir conforto e praticidade.'}
];

const BannerEventos = forwardRef((props, ref) => {
  const carrossel = useRef();
  const [width, setWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      // setWidth(carrossel.current?.offsetWidth);
    setWidth(280)
    };

    updateWidth(); 

    window.addEventListener('resize', updateWidth);

    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex < images.length - 1) {
        return prevIndex + 1;
      }
      return prevIndex; 
    });
  };
  
  const prevImage = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      }
      return prevIndex;
    });
  };
  

  useImperativeHandle(ref, () => ({
    nextImage,
    prevImage
  }));

  return (
    <div className={styles.container_carrosel}>
      <motion.div ref={carrossel} className={styles.carrossel}>
        <motion.div
          className={styles.inner}
          initial={{ x: 0 }}
          animate={{ x: -currentIndex * width }} 
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {images.map((image, index) => (
            <Link to='/a'>
            
            <motion.div className={styles.item} key={image.tipoEvento} style={{ minWidth: width }}>
            <img src={image.img} alt={image.tipoEvento} />
            <div className={styles.infoEvento}>
              <h3>{image.tipoEvento}</h3>
              <p className='descricao'>{image.descricao}</p>
            </div>
            </motion.div>
          </Link>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
});

export default BannerEventos;
